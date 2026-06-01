import { MongoClient } from 'mongodb'
import { v4 as uuidv4 } from 'uuid'
import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import Stripe from 'stripe'
import { getGrammarForDay, getGrammarTopicById, getAllGrammarTopics } from '@/lib/grammar-curriculum'
import { GoogleAuth } from 'google-auth-library'

// JWT Secret - MUST be set in environment for production
const JWT_SECRET = process.env.JWT_SECRET
if (!JWT_SECRET) {
  console.warn('WARNING: JWT_SECRET not set in environment variables')
}

// Initialize Stripe lazily to avoid build-time errors when env vars are not set
let stripe = null
function getStripe() {
  if (!stripe && process.env.STRIPE_SECRET_KEY) {
    stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2024-12-18.acacia'
    })
  }
  return stripe
}

// Shared helper: apply a paid subscription to a user (idempotent)
async function applyPaidSubscription(database, { userId, tier, priceKey, stripeSubscriptionId, stripeCustomerId }) {
  if (!userId || !tier) return false
  const subscriptionDays = priceKey && priceKey.includes('yearly') ? 365 : 30
  const setFields = {
    subscriptionTier: tier,
    subscriptionStartDate: new Date(),
    subscriptionEndDate: new Date(Date.now() + subscriptionDays * 24 * 60 * 60 * 1000),
  }
  if (stripeSubscriptionId) setFields.stripeSubscriptionId = stripeSubscriptionId
  if (stripeCustomerId) setFields.stripeCustomerId = stripeCustomerId

  const result = await database.collection('users').updateOne(
    { id: userId },
    { $set: setFields }
  )
  return result.matchedCount > 0
}

// Hardened Stripe webhook handler.
// CRITICAL: returns HTTP 400 ONLY on signature-verification failure.
// For everything else (unhandled types, internal/db errors) it returns HTTP 200
// so Stripe never disables the endpoint. Runs BEFORE the main Mongo connection.
async function handleStripeWebhook(request) {
  let event = null
  try {
    const rawBody = await request.text()
    const signature = request.headers.get('stripe-signature')
    const stripeInstance = getStripe()
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

    if (webhookSecret) {
      // Secret is configured -> ONLY process cryptographically verified events.
      if (!stripeInstance || !signature) {
        console.warn('Stripe webhook: secret configured but missing stripe-signature; acknowledging without processing')
        return handleCORS(NextResponse.json({ received: true }, { status: 200 }))
      }
      try {
        event = stripeInstance.webhooks.constructEvent(rawBody, signature, webhookSecret)
      } catch (err) {
        // Signature verification failure is the ONLY case that returns 400.
        console.error('Stripe webhook signature verification failed:', err.message)
        return handleCORS(NextResponse.json(
          { error: `Webhook signature verification failed: ${err.message}` },
          { status: 400 }
        ))
      }
    } else {
      // No secret configured (transition/dev) -> parse without verification.
      // Still acknowledge with 200 so Stripe does not disable the endpoint.
      try {
        event = JSON.parse(rawBody)
      } catch (parseErr) {
        console.error('Stripe webhook: unable to parse body:', parseErr.message)
        return handleCORS(NextResponse.json({ received: true }, { status: 200 }))
      }
      console.warn('Stripe webhook processed WITHOUT signature verification (STRIPE_WEBHOOK_SECRET not set)')
    }
  } catch (outerErr) {
    // Reading body failed - acknowledge anyway to avoid endpoint disablement.
    console.error('Stripe webhook: failed reading request:', outerErr?.message)
    return handleCORS(NextResponse.json({ received: true }, { status: 200 }))
  }

  // Process the verified event. ANY error here is swallowed; we still return 200.
  try {
    const database = await connectToMongo()
    console.log('Stripe webhook event received:', event?.type)

    if (event?.type === 'checkout.session.completed') {
      const session = event.data.object
      const upgraded = await applyPaidSubscription(database, {
        userId: session.metadata?.userId,
        tier: session.metadata?.tier,
        priceKey: session.metadata?.priceKey,
        stripeSubscriptionId: session.subscription,
        stripeCustomerId: session.customer,
      })
      console.log(`Webhook checkout.session.completed: user ${session.metadata?.userId} upgraded=${upgraded}`)
    } else if (event?.type === 'invoice.payment_succeeded') {
      // Subscription renewal - extend the subscription period.
      const invoice = event.data.object
      const customerId = invoice.customer
      const billingReason = invoice.billing_reason
      if (customerId) {
        const user = await database.collection('users').findOne({ stripeCustomerId: customerId })
        if (user && user.subscriptionTier && user.subscriptionTier !== 'free') {
          const days = (invoice.lines?.data?.[0]?.plan?.interval === 'year') ? 365 : 30
          await database.collection('users').updateOne(
            { id: user.id },
            { $set: { subscriptionEndDate: new Date(Date.now() + days * 24 * 60 * 60 * 1000) } }
          )
          console.log(`Webhook invoice.payment_succeeded (${billingReason}): extended subscription for ${user.id}`)
        }
      }
    } else if (event?.type === 'customer.subscription.deleted') {
      const subscription = event.data.object
      const customerId = subscription.customer
      await database.collection('users').updateOne(
        { stripeCustomerId: customerId },
        { $set: { subscriptionTier: 'free', subscriptionEndDate: new Date(), stripeSubscriptionId: null } }
      )
      console.log(`Webhook customer.subscription.deleted: downgraded customer ${customerId}`)
    } else {
      console.log(`Webhook unhandled event type: ${event?.type}`)
    }
  } catch (processErr) {
    // Swallow processing errors - reconciliation endpoint is the safety net.
    console.error('Stripe webhook processing error (acknowledged anyway):', processErr?.message)
  }

  return handleCORS(NextResponse.json({ received: true }, { status: 200 }))
}

// Google Cloud TTS REST API helper (works better with serverless than gRPC)
let ttsCredentials = null
let ttsAuthClient = null

async function getTTSAccessToken() {
  if (!ttsCredentials) {
    if (process.env.GOOGLE_TTS_CREDENTIALS) {
      const credentialsJson = Buffer.from(process.env.GOOGLE_TTS_CREDENTIALS, 'base64').toString('utf-8')
      ttsCredentials = JSON.parse(credentialsJson)
    } else if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
      // For local development with file
      const fs = await import('fs')
      const content = fs.readFileSync(process.env.GOOGLE_APPLICATION_CREDENTIALS, 'utf-8')
      ttsCredentials = JSON.parse(content)
    } else {
      throw new Error('No Google TTS credentials configured')
    }
  }
  
  if (!ttsAuthClient) {
    ttsAuthClient = new GoogleAuth({
      credentials: ttsCredentials,
      scopes: ['https://www.googleapis.com/auth/cloud-platform']
    })
  }
  
  const client = await ttsAuthClient.getClient()
  const accessToken = await client.getAccessToken()
  return accessToken.token
}

async function synthesizeSpeechREST(text, languageCode = 'fr-FR', speakingRate = 1.0) {
  const accessToken = await getTTSAccessToken()
  
  const requestBody = {
    input: { text },
    voice: {
      languageCode,
      name: 'fr-FR-Standard-A',
      ssmlGender: 'FEMALE'
    },
    audioConfig: {
      audioEncoding: 'MP3',
      speakingRate: Math.max(0.5, Math.min(2.0, speakingRate))
    }
  }
  
  const response = await fetch('https://texttospeech.googleapis.com/v1/text:synthesize', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody)
  })
  
  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.error?.message || 'TTS API request failed')
  }
  
  const data = await response.json()
  return data.audioContent
}

// Stripe Price Configuration (in cents) - Freemium Model
const STRIPE_PRICES = {
  // Standard tier - $9/mo or $79/yr
  standard_monthly: {
    amount: 900, // $9.00/month
    name: 'Standard Monthly',
    tier: 'standard',
    interval: 'month'
  },
  standard_yearly: {
    amount: 7900, // $79.00/year
    name: 'Standard Yearly',
    tier: 'standard',
    interval: 'year'
  },
  // Premium tier - $34/mo or $249/yr
  premium_monthly: {
    amount: 3400, // $34.00/month
    name: 'Premium Monthly',
    tier: 'premium',
    interval: 'month'
  },
  premium_yearly: {
    amount: 24900, // $249.00/year
    name: 'Premium Yearly',
    tier: 'premium',
    interval: 'year'
  }
}

// Admin email with full access
const ADMIN_EMAIL = 'ravijha97.01@gmail.com'

// TEF/TCF Canada style speaking prompts (Expression Orale)
const SPEAKING_PROMPTS = [
  {
    id: 'tef_a_logement',
    taskType: 'TEF Section A - Obtenir des renseignements',
    title: 'Appel pour une location',
    prompt: "Vous voyez une annonce pour un appartement à louer. Appelez le propriétaire pour obtenir des informations (loyer, disponibilité, charges, visite). Posez au moins 5 questions pertinentes.",
    durationSec: 120,
    targetLevel: 'B1'
  },
  {
    id: 'tef_b_teletravail',
    taskType: 'TEF Section B - Donner son opinion',
    title: 'Le télétravail',
    prompt: "Selon vous, le télétravail est-il bénéfique pour les employés et les entreprises ? Présentez votre opinion en la justifiant avec des arguments et des exemples concrets.",
    durationSec: 180,
    targetLevel: 'B2'
  },
  {
    id: 'tcf_environnement',
    taskType: 'TCF - Tâche 3 (Exprimer un point de vue)',
    title: 'Protéger l\'environnement',
    prompt: "Que peut-on faire au quotidien pour protéger l'environnement ? Donnez votre point de vue et proposez des solutions concrètes.",
    durationSec: 180,
    targetLevel: 'B2'
  },
  {
    id: 'tcf_technologie',
    taskType: 'TCF - Tâche 2 (Interaction)',
    title: 'Les réseaux sociaux',
    prompt: "Un ami pense que les réseaux sociaux sont mauvais pour les jeunes. Réagissez : donnez votre avis, nuancez, et proposez un usage équilibré.",
    durationSec: 150,
    targetLevel: 'B1'
  }
]


// Subscription tier limits - 3-Tier Model (Free / Standard / Premium)
// NOTE: 999 is the "unlimited" sentinel used throughout the codebase.
const UNLIMITED = 999
const SUBSCRIPTION_LIMITS = {
  free: {
    // Legacy / backward-compat properties
    maxDays: 999,
    pathways: ['clb5', 'clb7'],
    canAccessAllTopics: true,
    maxTestsPerMonth: 1,               // 1 mock test per 30 days
    testsHistoryLimit: 3,
    aiWritingEvaluationsPerMonth: 2,   // 2 AI writing evaluations per 30 days
    canAccessAllSections: true,
    canAccessDailyGrammar: true,
    canAccessProgressTracking: true,
    canAccessFullAnalytics: false,
    canDownloadResults: false,
    canAccessPerformanceTrends: false,
    canAccessWeakAreas: false,
    adFree: false,
    prioritySupport: false,
    // 3-tier properties
    aiSpeakingEnabled: false,
    canAccessDailyArchives: false,     // current day only
    analyticsLevel: 'day',
    fastQueue: false,
    rateLimitPerMin: 1
  },
  standard: {
    maxDays: 999,
    pathways: ['clb5', 'clb7'],
    canAccessAllTopics: true,
    maxTestsPerMonth: UNLIMITED,       // Unlimited mock tests
    testsHistoryLimit: UNLIMITED,
    aiWritingEvaluationsPerMonth: 15,  // 15 AI writing evaluations per 30 days
    canAccessAllSections: true,
    canAccessDailyGrammar: true,
    canAccessProgressTracking: true,
    canAccessFullAnalytics: true,      // Full performance trends
    canDownloadResults: false,
    canAccessPerformanceTrends: true,
    canAccessWeakAreas: false,
    adFree: true,
    prioritySupport: false,
    aiSpeakingEnabled: false,
    canAccessDailyArchives: true,
    analyticsLevel: 'trends',
    fastQueue: false,
    rateLimitPerMin: 5
  },
  premium: {
    maxDays: 999,
    pathways: ['clb5', 'clb7'],
    canAccessAllTopics: true,
    maxTestsPerMonth: UNLIMITED,
    testsHistoryLimit: UNLIMITED,
    aiWritingEvaluationsPerMonth: UNLIMITED,
    canAccessAllSections: true,
    canAccessDailyGrammar: true,
    canAccessProgressTracking: true,
    canAccessFullAnalytics: true,
    canDownloadResults: true,
    canAccessPerformanceTrends: true,
    canAccessWeakAreas: true,
    adFree: true,
    prioritySupport: true,
    aiSpeakingEnabled: true,           // Unlimited AI speaking practice
    canAccessDailyArchives: true,
    analyticsLevel: 'deep',
    fastQueue: true,
    rateLimitPerMin: 20
  },
  admin: {
    maxDays: 999,
    pathways: ['clb5', 'clb7'],
    canAccessAllTopics: true,
    maxTestsPerMonth: UNLIMITED,
    testsHistoryLimit: UNLIMITED,
    aiWritingEvaluationsPerMonth: UNLIMITED,
    canAccessAllSections: true,
    canAccessDailyGrammar: true,
    canAccessProgressTracking: true,
    canAccessFullAnalytics: true,
    canDownloadResults: true,
    canAccessPerformanceTrends: true,
    canAccessWeakAreas: true,
    adFree: true,
    prioritySupport: true,
    aiSpeakingEnabled: true,
    canAccessDailyArchives: true,
    analyticsLevel: 'deep',
    fastQueue: true,
    rateLimitPerMin: 60
  }
}

// Helper to check if user is admin
function isAdmin(email) {
  return email?.toLowerCase() === ADMIN_EMAIL.toLowerCase()
}

// Helper to get user's effective subscription tier
function getUserTier(user) {
  if (isAdmin(user.email)) {
    return 'admin'
  }
  return user.subscriptionTier || 'free'
}

// Helper to get tier limits for a user
function getTierLimits(user) {
  const tier = getUserTier(user)
  return SUBSCRIPTION_LIMITS[tier] || SUBSCRIPTION_LIMITS.free
}

// ===== 3-Tier usage helpers =====
const LAUNCH_DATE = new Date('2026-06-01T00:00:00Z')
const CYCLE_MS = 30 * 24 * 60 * 60 * 1000
const LEGACY_GRANDFATHER_MS = 180 * 24 * 60 * 60 * 1000

// Returns the start Date of the user's current 30-day usage cycle.
// Anchored at subscriptionStartDate (paid) or createdAt (free); falls back to a rolling 30-day window.
function getCycleStart(user) {
  const anchorRaw = user?.subscriptionStartDate || user?.createdAt
  const anchor = anchorRaw ? new Date(anchorRaw) : null
  const now = Date.now()
  if (!anchor || isNaN(anchor.getTime()) || anchor.getTime() > now) {
    return new Date(now - CYCLE_MS)
  }
  const cyclesPassed = Math.floor((now - anchor.getTime()) / CYCLE_MS)
  return new Date(anchor.getTime() + cyclesPassed * CYCLE_MS)
}

// Legacy early-adopter: an active paid subscriber whose subscription started before launch,
// within 180 days of launch. They keep unlimited writing during this window.
function isLegacyUser(user) {
  if (!user?.subscriptionStartDate) return false
  const tier = user.subscriptionTier
  if (!tier || tier === 'free') return false
  const start = new Date(user.subscriptionStartDate)
  if (isNaN(start.getTime()) || start.getTime() >= LAUNCH_DATE.getTime()) return false
  return Date.now() < (LAUNCH_DATE.getTime() + LEGACY_GRANDFATHER_MS)
}

// Compute a full usage summary (remaining counts) for the current cycle.
async function getUsageSummary(db, user) {
  const tier = getUserTier(user)
  const limits = getTierLimits(user)
  const cycleStart = getCycleStart(user)
  const cycleEnd = new Date(cycleStart.getTime() + CYCLE_MS)
  const legacy = isLegacyUser(user)

  const [writingUsed, mockTestsUsed] = await Promise.all([
    db.collection('writing_evaluations').countDocuments({ userId: user.id, createdAt: { $gte: cycleStart } }),
    db.collection('test_results').countDocuments({ email: user.email, completedAt: { $gte: cycleStart } }),
  ])

  // Legacy users get unlimited writing during the grandfather window.
  const writingLimit = legacy ? UNLIMITED : limits.aiWritingEvaluationsPerMonth
  const mockLimit = limits.maxTestsPerMonth

  const remaining = (limit, used) => (limit >= UNLIMITED ? UNLIMITED : Math.max(0, limit - used))

  return {
    tier,
    isLegacy: legacy,
    cycleStart: cycleStart.toISOString(),
    cycleEnd: cycleEnd.toISOString(),
    writing: {
      limit: writingLimit,
      used: writingUsed,
      remaining: remaining(writingLimit, writingUsed),
      unlimited: writingLimit >= UNLIMITED,
    },
    mockTests: {
      limit: mockLimit,
      used: mockTestsUsed,
      remaining: remaining(mockLimit, mockTestsUsed),
      unlimited: mockLimit >= UNLIMITED,
    },
    speaking: {
      enabled: limits.aiSpeakingEnabled,
      unlimited: limits.aiSpeakingEnabled,
    },
    analyticsLevel: limits.analyticsLevel,
    fastQueue: limits.fastQueue,
    canAccessDailyArchives: limits.canAccessDailyArchives,
  }
}

// MongoDB-backed per-minute rate limiter for AI endpoints. Returns { allowed, retryAfter, limit }.
async function checkRateLimit(db, user, bucket = 'ai') {
  try {
    const limits = getTierLimits(user)
    const perMin = limits.rateLimitPerMin || 1
    const windowStart = new Date(Date.now() - 60 * 1000)
    const count = await db.collection('rate_limit_log').countDocuments({
      userId: user.id,
      bucket,
      ts: { $gte: windowStart },
    })
    if (count >= perMin) {
      return { allowed: false, retryAfter: 60, limit: perMin }
    }
    await db.collection('rate_limit_log').insertOne({ userId: user.id, bucket, ts: new Date() })
    return { allowed: true, limit: perMin }
  } catch (e) {
    // Fail open - never block a legitimate request due to rate-limiter errors.
    console.error('Rate limiter error (failing open):', e?.message)
    return { allowed: true, limit: 0 }
  }
}

// MongoDB connection with better error handling
let client = null
let db = null
let clientPromise = null

async function connectToMongo() {
  if (db) {
    return db
  }
  
  if (!clientPromise) {
    client = new MongoClient(process.env.MONGO_URL, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
    })
    clientPromise = client.connect()
  }
  
  await clientPromise
  db = client.db(process.env.DB_NAME)
  if (!process.env.DB_NAME) {
    console.warn('WARNING: DB_NAME not set in environment variables')
  }
  return db
}

// Helper function to handle CORS
function handleCORS(response) {
  response.headers.set('Access-Control-Allow-Origin', process.env.CORS_ORIGINS || '*')
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  response.headers.set('Access-Control-Allow-Credentials', 'true')
  return response
}

// Verify JWT token
function verifyToken(request) {
  const authHeader = request.headers.get('Authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null
  }
  
  const token = authHeader.split(' ')[1]
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch (error) {
    return null
  }
}

// OPTIONS handler for CORS
export async function OPTIONS() {
  return handleCORS(new NextResponse(null, { status: 200 }))
}

// Route handler function
async function handleRoute(request, { params }) {
  const { path = [] } = params
  const route = `/${path.join('/')}`
  const method = request.method

  // Stripe webhook MUST be handled before anything else (including the Mongo
  // connection) so a transient DB issue can never cause a non-2xx response that
  // would make Stripe disable the endpoint. It manages its own error handling.
  if (route === '/stripe/webhook' && method === 'POST') {
    return await handleStripeWebhook(request)
  }

  try {
    const db = await connectToMongo()

    // ============ AUTH ROUTES ============
    
    // Register - POST /api/auth/register
    if (route === '/auth/register' && method === 'POST') {
      const body = await request.json()
      const { email, password, name } = body
      
      if (!email || !password) {
        return handleCORS(NextResponse.json(
          { error: 'Email and password are required' },
          { status: 400 }
        ))
      }
      
      // Check if user exists
      const existingUser = await db.collection('users').findOne({ email: email.toLowerCase() })
      if (existingUser) {
        return handleCORS(NextResponse.json(
          { error: 'User already exists' },
          { status: 400 }
        ))
      }
      
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10)
      
      // Determine subscription tier (admin gets admin tier, others get free)
      const subscriptionTier = isAdmin(email) ? 'admin' : 'free'
      
      // Create user
      const user = {
        id: uuidv4(),
        email: email.toLowerCase(),
        password: hashedPassword,
        name: name || email.split('@')[0],
        createdAt: new Date(),
        // Subscription fields
        subscriptionTier: subscriptionTier,
        subscriptionStartDate: new Date(),
        subscriptionEndDate: null, // null for free/admin, set for paid tiers
        // Pathway fields - null until onboarding
        pathway: null,
        pathwayStartDate: null,
        targetExamDate: null,
        dailyTimeBudget: 210, // Default 3.5 hours in minutes
        currentDay: 0,
        onboardingComplete: false,
        // Grammar tracking
        grammarLessonsThisWeek: 0,
        grammarWeekStart: new Date()
      }
      
      await db.collection('users').insertOne(user)
      
      // Generate token
      const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '30d' })
      
      const { password: _, ...userWithoutPassword } = user
      
      // Add tier info to response
      userWithoutPassword.tierLimits = getTierLimits(user)
      
      return handleCORS(NextResponse.json({
        user: userWithoutPassword,
        token
      }))
    }
    
    // Login - POST /api/auth/login
    if (route === '/auth/login' && method === 'POST') {
      const body = await request.json()
      const { email, password } = body
      
      if (!email || !password) {
        return handleCORS(NextResponse.json(
          { error: 'Email and password are required' },
          { status: 400 }
        ))
      }
      
      const user = await db.collection('users').findOne({ email: email.toLowerCase() })
      if (!user) {
        return handleCORS(NextResponse.json(
          { error: 'Invalid credentials' },
          { status: 401 }
        ))
      }
      
      const isValidPassword = await bcrypt.compare(password, user.password)
      if (!isValidPassword) {
        return handleCORS(NextResponse.json(
          { error: 'Invalid credentials' },
          { status: 401 }
        ))
      }
      
      const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '30d' })
      
      const { password: _, ...userWithoutPassword } = user
      
      // Add tier info to response
      userWithoutPassword.tierLimits = getTierLimits(user)
      
      return handleCORS(NextResponse.json({
        user: userWithoutPassword,
        token
      }))
    }
    
    // Google OAuth - Initiate login - GET /api/auth/google
    if (route === '/auth/google' && method === 'GET') {
      const clientId = process.env.GOOGLE_CLIENT_ID
      const redirectUri = `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/callback/google`
      
      const googleAuthUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth')
      googleAuthUrl.searchParams.set('client_id', clientId)
      googleAuthUrl.searchParams.set('redirect_uri', redirectUri)
      googleAuthUrl.searchParams.set('response_type', 'code')
      googleAuthUrl.searchParams.set('scope', 'openid email profile')
      googleAuthUrl.searchParams.set('access_type', 'offline')
      googleAuthUrl.searchParams.set('prompt', 'consent')
      
      // Generate state for CSRF protection
      const state = uuidv4()
      googleAuthUrl.searchParams.set('state', state)
      
      return NextResponse.redirect(googleAuthUrl.toString())
    }
    
    // Google OAuth Callback - GET /api/auth/callback/google
    if (route === '/auth/callback/google' && method === 'GET') {
      const { searchParams } = new URL(request.url)
      const code = searchParams.get('code')
      const error = searchParams.get('error')
      
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
      
      if (error) {
        console.error('Google OAuth error:', error)
        return NextResponse.redirect(`${baseUrl}/dashboard?auth_error=${encodeURIComponent(error)}`)
      }
      
      if (!code) {
        return NextResponse.redirect(`${baseUrl}/dashboard?auth_error=no_code`)
      }
      
      try {
        // Exchange code for tokens
        const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            code,
            client_id: process.env.GOOGLE_CLIENT_ID,
            client_secret: process.env.GOOGLE_CLIENT_SECRET,
            redirect_uri: `${baseUrl}/api/auth/callback/google`,
            grant_type: 'authorization_code',
          }),
        })
        
        const tokenData = await tokenResponse.json()
        
        if (tokenData.error) {
          console.error('Token exchange error:', tokenData)
          return NextResponse.redirect(`${baseUrl}/dashboard?auth_error=${encodeURIComponent(tokenData.error)}`)
        }
        
        // Get user info from Google
        const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
          headers: {
            Authorization: `Bearer ${tokenData.access_token}`,
          },
        })
        
        const googleUser = await userInfoResponse.json()
        
        if (!googleUser.email) {
          return NextResponse.redirect(`${baseUrl}/dashboard?auth_error=no_email`)
        }
        
        // Check if user exists
        let user = await db.collection('users').findOne({ email: googleUser.email.toLowerCase() })
        
        if (!user) {
          // Determine subscription tier (admin gets admin tier, others get free)
          const subscriptionTier = isAdmin(googleUser.email) ? 'admin' : 'free'
          
          // Create new user
          user = {
            id: uuidv4(),
            email: googleUser.email.toLowerCase(),
            password: await bcrypt.hash(uuidv4(), 10), // Random password for OAuth users
            name: googleUser.name || googleUser.email.split('@')[0],
            picture: googleUser.picture || null,
            authProvider: 'google',
            googleId: googleUser.id,
            createdAt: new Date(),
            subscriptionTier: subscriptionTier,
            subscriptionStartDate: new Date(),
            subscriptionEndDate: null,
            pathway: null,
            pathwayStartDate: null,
            targetExamDate: null,
            dailyTimeBudget: 210,
            currentDay: 0,
            onboardingComplete: false,
            grammarLessonsThisWeek: 0,
            grammarWeekStart: new Date()
          }
          
          await db.collection('users').insertOne(user)
          console.log('Created new Google user:', user.email)
        } else {
          // Update existing user with Google info if not already set
          if (!user.googleId) {
            await db.collection('users').updateOne(
              { id: user.id },
              { 
                $set: { 
                  googleId: googleUser.id,
                  picture: googleUser.picture || user.picture,
                  authProvider: user.authProvider || 'google'
                } 
              }
            )
          }
          console.log('Existing user logged in via Google:', user.email)
        }
        
        // Generate JWT token
        const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '30d' })
        
        // Redirect to dashboard with token in URL (will be stored in cookie by frontend)
        return NextResponse.redirect(`${baseUrl}/dashboard?google_auth=success&token=${token}`)
        
      } catch (err) {
        console.error('Google OAuth callback error:', err)
        return NextResponse.redirect(`${baseUrl}/dashboard?auth_error=callback_failed`)
      }
    }
    
    // LEGACY: Mocked Google Login - POST /api/auth/google-mock (kept for backwards compatibility)
    if (route === '/auth/google-mock' && method === 'POST') {
      const body = await request.json()
      const { mockEmail, mockName } = body
      
      const email = mockEmail || `google_user_${Date.now()}@gmail.com`
      const name = mockName || 'Google User'
      
      // Check if user exists with this email
      let user = await db.collection('users').findOne({ email: email.toLowerCase() })
      
      if (!user) {
        // Determine subscription tier (admin gets admin tier, others get free)
        const subscriptionTier = isAdmin(email) ? 'admin' : 'free'
        
        // Create new user for Google login
        user = {
          id: uuidv4(),
          email: email.toLowerCase(),
          password: await bcrypt.hash(uuidv4(), 10), // Random password for OAuth users
          name: name,
          authProvider: 'google', // Track that this user signed up via Google
          createdAt: new Date(),
          // Subscription fields
          subscriptionTier: subscriptionTier,
          subscriptionStartDate: new Date(),
          subscriptionEndDate: null,
          pathway: null,
          pathwayStartDate: null,
          targetExamDate: null,
          dailyTimeBudget: 210,
          currentDay: 0,
          onboardingComplete: false,
          grammarLessonsThisWeek: 0,
          grammarWeekStart: new Date()
        }
        
        await db.collection('users').insertOne(user)
      }
      
      const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '30d' })
      
      const { password: _, ...userWithoutPassword } = user
      
      // Add tier info to response
      userWithoutPassword.tierLimits = getTierLimits(user)
      
      return handleCORS(NextResponse.json({
        user: userWithoutPassword,
        token
      }))
    }
    
    // Get current user - GET /api/auth/me
    if (route === '/auth/me' && method === 'GET') {
      const decoded = verifyToken(request)
      if (!decoded) {
        return handleCORS(NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 }
        ))
      }
      
      const user = await db.collection('users').findOne({ id: decoded.userId })
      if (!user) {
        return handleCORS(NextResponse.json(
          { error: 'User not found' },
          { status: 404 }
        ))
      }
      
      const { password: _, ...userWithoutPassword } = user
      
      // Add tier info to response
      userWithoutPassword.tierLimits = getTierLimits(user)
      userWithoutPassword.isAdmin = isAdmin(user.email)
      
      return handleCORS(NextResponse.json({ user: userWithoutPassword }))
    }
    
    // ============ ONBOARDING ROUTES ============
    
    // Complete onboarding - POST /api/onboarding
    if (route === '/onboarding' && method === 'POST') {
      const decoded = verifyToken(request)
      if (!decoded) {
        return handleCORS(NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 }
        ))
      }
      
      const body = await request.json()
      const { pathway, targetExamDate, dailyTimeBudget } = body
      
      if (!pathway || !['clb5', 'clb7'].includes(pathway)) {
        return handleCORS(NextResponse.json(
          { error: 'Invalid pathway. Must be clb5 or clb7' },
          { status: 400 }
        ))
      }
      
      // Check if user's tier allows this pathway
      const user = await db.collection('users').findOne({ id: decoded.userId })
      const tierLimits = getTierLimits(user)
      
      if (!tierLimits.pathways.includes(pathway)) {
        return handleCORS(NextResponse.json(
          { error: `Your subscription (${user.subscriptionTier || 'free'}) does not include the ${pathway.toUpperCase()} pathway. Please upgrade to Premium.` },
          { status: 403 }
        ))
      }
      
      const updateData = {
        pathway,
        pathwayStartDate: new Date(),
        targetExamDate: targetExamDate ? new Date(targetExamDate) : null,
        dailyTimeBudget: dailyTimeBudget || 210,
        currentDay: 1,
        onboardingComplete: true
      }
      
      await db.collection('users').updateOne(
        { id: decoded.userId },
        { $set: updateData }
      )
      
      const updatedUser = await db.collection('users').findOne({ id: decoded.userId })
      const { password: _, ...userWithoutPassword } = updatedUser
      
      // Add tier info
      userWithoutPassword.tierLimits = getTierLimits(updatedUser)
      
      return handleCORS(NextResponse.json({ user: userWithoutPassword }))
    }
    
    // Reset pathway - POST /api/pathway/reset
    if (route === '/pathway/reset' && method === 'POST') {
      const decoded = verifyToken(request)
      if (!decoded) {
        return handleCORS(NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 }
        ))
      }
      
      // Reset user pathway data
      await db.collection('users').updateOne(
        { id: decoded.userId },
        {
          $set: {
            pathway: null,
            pathwayStartDate: null,
            targetExamDate: null,
            currentDay: 0,
            onboardingComplete: false
          }
        }
      )
      
      // Delete all daily logs for this user
      await db.collection('daily_logs').deleteMany({ userId: decoded.userId })
      
      const updatedUser = await db.collection('users').findOne({ id: decoded.userId })
      const { password: _, ...userWithoutPassword } = updatedUser
      
      return handleCORS(NextResponse.json({
        message: 'Pathway reset successfully',
        user: userWithoutPassword
      }))
    }
    
    // ============ ACCOUNT SETTINGS ROUTES ============
    
    // Get account settings - GET /api/account/settings
    if (route === '/account/settings' && method === 'GET') {
      const decoded = verifyToken(request)
      if (!decoded) {
        return handleCORS(NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 }
        ))
      }
      
      const user = await db.collection('users').findOne({ id: decoded.userId })
      if (!user) {
        return handleCORS(NextResponse.json(
          { error: 'User not found' },
          { status: 404 }
        ))
      }
      
      // Return account settings (with defaults if not set)
      const settings = {
        examType: user.examType || user.pathway || 'clb7', // Default to pathway or clb7
        notificationsEnabled: user.notificationsEnabled !== false, // Default true
        dailyReminderTime: user.dailyReminderTime || '09:00',
        emailNotifications: user.emailNotifications !== false, // Default true
        practiceReminders: user.practiceReminders !== false, // Default true
        progressUpdates: user.progressUpdates !== false, // Default true
      }
      
      return handleCORS(NextResponse.json({ settings }))
    }
    
    // Update account settings - PUT /api/account/settings
    if (route === '/account/settings' && method === 'PUT') {
      const decoded = verifyToken(request)
      if (!decoded) {
        return handleCORS(NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 }
        ))
      }
      
      const body = await request.json()
      const { 
        examType,
        notificationsEnabled,
        dailyReminderTime,
        emailNotifications,
        practiceReminders,
        progressUpdates
      } = body
      
      const user = await db.collection('users').findOne({ id: decoded.userId })
      if (!user) {
        return handleCORS(NextResponse.json(
          { error: 'User not found' },
          { status: 404 }
        ))
      }
      
      // Build update object with only provided fields
      const updateFields = {}
      
      // Exam Type validation
      if (examType !== undefined) {
        if (!['clb5', 'clb7', 'tef', 'tcf'].includes(examType)) {
          return handleCORS(NextResponse.json(
            { error: 'Invalid exam type. Must be clb5, clb7, tef, or tcf' },
            { status: 400 }
          ))
        }
        updateFields.examType = examType
      }
      
      // Notification settings
      if (notificationsEnabled !== undefined) {
        updateFields.notificationsEnabled = Boolean(notificationsEnabled)
      }
      
      if (dailyReminderTime !== undefined) {
        // Validate time format (HH:MM)
        if (!/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(dailyReminderTime)) {
          return handleCORS(NextResponse.json(
            { error: 'Invalid time format. Use HH:MM (24-hour format)' },
            { status: 400 }
          ))
        }
        updateFields.dailyReminderTime = dailyReminderTime
      }
      
      if (emailNotifications !== undefined) {
        updateFields.emailNotifications = Boolean(emailNotifications)
      }
      
      if (practiceReminders !== undefined) {
        updateFields.practiceReminders = Boolean(practiceReminders)
      }
      
      if (progressUpdates !== undefined) {
        updateFields.progressUpdates = Boolean(progressUpdates)
      }
      
      // Add updated timestamp
      updateFields.settingsUpdatedAt = new Date()
      
      // Update the user
      await db.collection('users').updateOne(
        { id: decoded.userId },
        { $set: updateFields }
      )
      
      // Return updated settings
      const updatedUser = await db.collection('users').findOne({ id: decoded.userId })
      const settings = {
        examType: updatedUser.examType || updatedUser.pathway || 'clb7',
        notificationsEnabled: updatedUser.notificationsEnabled !== false,
        dailyReminderTime: updatedUser.dailyReminderTime || '09:00',
        emailNotifications: updatedUser.emailNotifications !== false,
        practiceReminders: updatedUser.practiceReminders !== false,
        progressUpdates: updatedUser.progressUpdates !== false,
      }
      
      return handleCORS(NextResponse.json({ 
        message: 'Settings updated successfully',
        settings 
      }))
    }
    
    // Change exam type (with pathway reset option) - POST /api/account/change-exam-type
    if (route === '/account/change-exam-type' && method === 'POST') {
      const decoded = verifyToken(request)
      if (!decoded) {
        return handleCORS(NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 }
        ))
      }
      
      const body = await request.json()
      const { examType, resetProgress } = body
      
      if (!examType || !['clb5', 'clb7', 'tef', 'tcf'].includes(examType)) {
        return handleCORS(NextResponse.json(
          { error: 'Invalid exam type. Must be clb5, clb7, tef, or tcf' },
          { status: 400 }
        ))
      }
      
      const user = await db.collection('users').findOne({ id: decoded.userId })
      if (!user) {
        return handleCORS(NextResponse.json(
          { error: 'User not found' },
          { status: 404 }
        ))
      }
      
      // Check tier permissions for pathway changes
      const tierLimits = getTierLimits(user)
      if (['clb5', 'clb7'].includes(examType) && !tierLimits.pathways.includes(examType)) {
        return handleCORS(NextResponse.json(
          { error: `Your subscription (${user.subscriptionTier || 'free'}) does not include the ${examType.toUpperCase()} pathway. Please upgrade to Premium.` },
          { status: 403 }
        ))
      }
      
      const updateFields = {
        examType,
        settingsUpdatedAt: new Date()
      }
      
      // If resetProgress is true, reset the pathway and progress
      if (resetProgress) {
        if (['clb5', 'clb7'].includes(examType)) {
          updateFields.pathway = examType
          updateFields.pathwayStartDate = new Date()
          updateFields.currentDay = 1
          updateFields.onboardingComplete = true
        } else {
          // For TEF/TCF, just store the exam type preference
          updateFields.pathway = null
          updateFields.pathwayStartDate = null
          updateFields.currentDay = 0
          updateFields.onboardingComplete = false
        }
        
        // Delete existing daily logs if resetting
        await db.collection('daily_logs').deleteMany({ userId: decoded.userId })
      }
      
      await db.collection('users').updateOne(
        { id: decoded.userId },
        { $set: updateFields }
      )
      
      const updatedUser = await db.collection('users').findOne({ id: decoded.userId })
      const { password: _, ...userWithoutPassword } = updatedUser
      
      return handleCORS(NextResponse.json({ 
        message: resetProgress 
          ? `Exam type changed to ${examType.toUpperCase()} and progress reset` 
          : `Exam type preference updated to ${examType.toUpperCase()}`,
        user: userWithoutPassword
      }))
    }
    
    // ============ DAILY LOG ROUTES ============
    
    // Get today's log - GET /api/daily-log/today
    if (route === '/daily-log/today' && method === 'GET') {
      const decoded = verifyToken(request)
      if (!decoded) {
        return handleCORS(NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 }
        ))
      }
      
      const user = await db.collection('users').findOne({ id: decoded.userId })
      if (!user || !user.onboardingComplete) {
        return handleCORS(NextResponse.json(
          { error: 'Please complete onboarding first' },
          { status: 400 }
        ))
      }
      
      const today = new Date().toISOString().split('T')[0]
      
      // Find log for current day number (not just by date)
      // This ensures each training day gets its own fresh log
      let dailyLog = await db.collection('daily_logs').findOne({
        userId: decoded.userId,
        dayNumber: user.currentDay
      })
      
      // If no log exists for this training day, create one
      if (!dailyLog) {
        dailyLog = {
          id: uuidv4(),
          userId: decoded.userId,
          date: today,
          dayNumber: user.currentDay,
          activities: {
            grammar: { completed: false, timeSpent: 0, notes: '' },
            listening: { completed: false, timeSpent: 0, notes: '' },
            speaking: { completed: false, timeSpent: 0, notes: '' },
            reading: { completed: false, timeSpent: 0, notes: '' },
            writing: { completed: false, timeSpent: 0, notes: '' }
          },
          totalTimeSpent: 0,
          allCompleted: false,
          createdAt: new Date()
        }
        
        await db.collection('daily_logs').insertOne(dailyLog)
      }
      
      return handleCORS(NextResponse.json({ dailyLog, user: { currentDay: user.currentDay, pathway: user.pathway } }))
    }
    
    // Update daily log - PUT /api/daily-log
    if (route === '/daily-log' && method === 'PUT') {
      const decoded = verifyToken(request)
      if (!decoded) {
        return handleCORS(NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 }
        ))
      }
      
      const body = await request.json()
      const { activities } = body
      
      // Get user's current day number
      const user = await db.collection('users').findOne({ id: decoded.userId })
      if (!user) {
        return handleCORS(NextResponse.json(
          { error: 'User not found' },
          { status: 404 }
        ))
      }
      
      // Calculate totals
      let totalTimeSpent = 0
      let allCompleted = true
      
      for (const key of Object.keys(activities)) {
        totalTimeSpent += activities[key].timeSpent || 0
        if (!activities[key].completed) {
          allCompleted = false
        }
      }
      
      // Update by dayNumber to ensure we're updating the correct day's log
      await db.collection('daily_logs').updateOne(
        { userId: decoded.userId, dayNumber: user.currentDay },
        {
          $set: {
            activities,
            totalTimeSpent,
            allCompleted,
            updatedAt: new Date()
          }
        }
      )
      
      const updatedLog = await db.collection('daily_logs').findOne({
        userId: decoded.userId,
        dayNumber: user.currentDay
      })
      
      return handleCORS(NextResponse.json({ dailyLog: updatedLog }))
    }
    
    // Complete day and advance - POST /api/daily-log/complete
    if (route === '/daily-log/complete' && method === 'POST') {
      const decoded = verifyToken(request)
      if (!decoded) {
        return handleCORS(NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 }
        ))
      }
      
      // Get user to find their current day
      const user = await db.collection('users').findOne({ id: decoded.userId })
      if (!user) {
        return handleCORS(NextResponse.json(
          { error: 'User not found' },
          { status: 404 }
        ))
      }
      
      // Check subscription tier limits
      const tierLimits = getTierLimits(user)
      if (user.currentDay >= tierLimits.maxDays) {
        return handleCORS(NextResponse.json(
          { 
            error: `You've reached the limit of ${tierLimits.maxDays} days for your ${user.subscriptionTier || 'free'} subscription. Please upgrade to continue.`,
            limitReached: true,
            currentTier: user.subscriptionTier || 'free',
            maxDays: tierLimits.maxDays
          },
          { status: 403 }
        ))
      }
      
      // Find log by dayNumber instead of date
      const dailyLog = await db.collection('daily_logs').findOne({
        userId: decoded.userId,
        dayNumber: user.currentDay
      })
      
      if (!dailyLog) {
        return handleCORS(NextResponse.json(
          { error: 'No log found for current day' },
          { status: 404 }
        ))
      }
      
      // Mark as completed
      await db.collection('daily_logs').updateOne(
        { id: dailyLog.id },
        { $set: { allCompleted: true, completedAt: new Date() } }
      )
      
      // Advance user's current day
      await db.collection('users').updateOne(
        { id: decoded.userId },
        { $inc: { currentDay: 1 } }
      )
      
      const updatedUser = await db.collection('users').findOne({ id: decoded.userId })
      const { password: _, ...userWithoutPassword } = updatedUser
      
      // Add tier info
      userWithoutPassword.tierLimits = getTierLimits(updatedUser)
      
      return handleCORS(NextResponse.json({
        message: 'Day completed! Moving to next day.',
        user: userWithoutPassword
      }))
    }
    
    // Get progress stats - GET /api/progress
    if (route === '/progress' && method === 'GET') {
      const decoded = verifyToken(request)
      if (!decoded) {
        return handleCORS(NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 }
        ))
      }
      
      const user = await db.collection('users').findOne({ id: decoded.userId })
      if (!user || !user.onboardingComplete) {
        return handleCORS(NextResponse.json(
          { error: 'Please complete onboarding first' },
          { status: 400 }
        ))
      }
      
      // Get all completed logs
      const completedLogs = await db.collection('daily_logs')
        .find({ userId: decoded.userId, allCompleted: true })
        .sort({ date: -1 })
        .toArray()
      
      // Calculate streak
      let streak = 0
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      
      for (let i = 0; i < completedLogs.length; i++) {
        const logDate = new Date(completedLogs[i].date)
        logDate.setHours(0, 0, 0, 0)
        
        const expectedDate = new Date(today)
        expectedDate.setDate(expectedDate.getDate() - i)
        
        if (logDate.getTime() === expectedDate.getTime()) {
          streak++
        } else {
          break
        }
      }
      
      // Calculate total time spent
      const allLogs = await db.collection('daily_logs')
        .find({ userId: decoded.userId })
        .toArray()
      
      const totalTimeSpent = allLogs.reduce((sum, log) => sum + (log.totalTimeSpent || 0), 0)
      
      // Calculate pathway progress
      const totalDays = user.pathway === 'clb5' ? 112 : 336
      const progressPercent = Math.min(100, Math.round((user.currentDay / totalDays) * 100))
      
      // Get recent logs
      const recentLogs = await db.collection('daily_logs')
        .find({ userId: decoded.userId })
        .sort({ date: -1 })
        .limit(7)
        .toArray()
      
      return handleCORS(NextResponse.json({
        streak,
        totalDaysCompleted: completedLogs.length,
        totalTimeSpent,
        progressPercent,
        currentDay: user.currentDay,
        totalDays,
        recentLogs
      }))
    }
    
    // Get all daily logs - GET /api/daily-logs
    if (route === '/daily-logs' && method === 'GET') {
      const decoded = verifyToken(request)
      if (!decoded) {
        return handleCORS(NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 }
        ))
      }
      
      const logs = await db.collection('daily_logs')
        .find({ userId: decoded.userId })
        .sort({ date: -1 })
        .limit(30)
        .toArray()
      
      return handleCORS(NextResponse.json({ logs }))
    }

    // ============ GRAMMAR ROUTES ============
    
    // Get daily grammar topic - GET /api/grammar/daily-topic
    if (route === '/grammar/daily-topic' && method === 'GET') {
      const decoded = verifyToken(request)
      if (!decoded) {
        return handleCORS(NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 }
        ))
      }
      
      const user = await db.collection('users').findOne({ id: decoded.userId })
      if (!user || !user.onboardingComplete) {
        return handleCORS(NextResponse.json(
          { error: 'Please complete onboarding first' },
          { status: 400 }
        ))
      }
      
      const topic = getGrammarForDay(user.pathway, user.currentDay)
      
      if (!topic) {
        return handleCORS(NextResponse.json({
          topic: null,
          message: 'No grammar topic for today'
        }))
      }
      
      // Check if user has already completed this topic today
      const existingProgress = (user.grammarProgress || []).find(
        p => p.topicId === topic.id && p.day === user.currentDay
      )
      
      return handleCORS(NextResponse.json({
        topic,
        completed: !!existingProgress,
        score: existingProgress?.score || null,
        userProgress: {
          currentDay: user.currentDay,
          pathway: user.pathway,
          weakTopics: user.weakGrammarTopics || []
        }
      }))
    }
    
    // Submit grammar quiz - POST /api/grammar/submit-quiz
    if (route === '/grammar/submit-quiz' && method === 'POST') {
      const decoded = verifyToken(request)
      if (!decoded) {
        return handleCORS(NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 }
        ))
      }
      
      const body = await request.json()
      const { topicId, answers, score, totalQuestions } = body
      
      if (!topicId || answers === undefined || score === undefined) {
        return handleCORS(NextResponse.json(
          { error: 'topicId, answers, and score are required' },
          { status: 400 }
        ))
      }
      
      const user = await db.collection('users').findOne({ id: decoded.userId })
      if (!user) {
        return handleCORS(NextResponse.json(
          { error: 'User not found' },
          { status: 404 }
        ))
      }
      
      const topic = getGrammarTopicById(topicId)
      if (!topic) {
        return handleCORS(NextResponse.json(
          { error: 'Topic not found' },
          { status: 404 }
        ))
      }
      
      // Calculate percentage
      const percentage = Math.round((score / totalQuestions) * 100)
      const isWeak = percentage < 70 // Below 70% is considered weak
      
      // Update grammar progress
      const progressEntry = {
        topicId,
        score,
        totalQuestions,
        percentage,
        day: user.currentDay,
        completedAt: new Date()
      }
      
      // Get current progress and weak topics
      const currentProgress = user.grammarProgress || []
      const currentWeakTopics = user.weakGrammarTopics || []
      
      // Update or add progress entry
      const existingIndex = currentProgress.findIndex(
        p => p.topicId === topicId && p.day === user.currentDay
      )
      
      if (existingIndex >= 0) {
        currentProgress[existingIndex] = progressEntry
      } else {
        currentProgress.push(progressEntry)
      }
      
      // Update weak topics
      let newWeakTopics = [...currentWeakTopics]
      if (isWeak && !newWeakTopics.includes(topicId)) {
        newWeakTopics.push(topicId)
      } else if (!isWeak && newWeakTopics.includes(topicId)) {
        // Remove from weak topics if score improved
        newWeakTopics = newWeakTopics.filter(t => t !== topicId)
      }
      
      await db.collection('users').updateOne(
        { id: decoded.userId },
        {
          $set: {
            grammarProgress: currentProgress,
            weakGrammarTopics: newWeakTopics
          }
        }
      )
      
      return handleCORS(NextResponse.json({
        success: true,
        result: {
          score,
          totalQuestions,
          percentage,
          isWeak,
          topicTitle: topic.title
        },
        weakTopics: newWeakTopics
      }))
    }
    
    // Get weak grammar topics - GET /api/grammar/weak-topics
    if (route === '/grammar/weak-topics' && method === 'GET') {
      const decoded = verifyToken(request)
      if (!decoded) {
        return handleCORS(NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 }
        ))
      }
      
      const user = await db.collection('users').findOne({ id: decoded.userId })
      if (!user) {
        return handleCORS(NextResponse.json(
          { error: 'User not found' },
          { status: 404 }
        ))
      }
      
      const weakTopicIds = user.weakGrammarTopics || []
      const weakTopics = weakTopicIds.map(id => getGrammarTopicById(id)).filter(Boolean)
      
      return handleCORS(NextResponse.json({
        weakTopics,
        count: weakTopics.length
      }))
    }
    
    // Get topic by ID (for review) - GET /api/grammar/topic/:id
    if (route.startsWith('/grammar/topic/') && method === 'GET') {
      const decoded = verifyToken(request)
      if (!decoded) {
        return handleCORS(NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 }
        ))
      }
      
      const topicId = route.split('/grammar/topic/')[1]
      const topic = getGrammarTopicById(topicId)
      
      if (!topic) {
        return handleCORS(NextResponse.json(
          { error: 'Topic not found' },
          { status: 404 }
        ))
      }
      
      const user = await db.collection('users').findOne({ id: decoded.userId })
      const progress = (user?.grammarProgress || []).filter(p => p.topicId === topicId)
      
      return handleCORS(NextResponse.json({
        topic,
        userProgress: progress,
        isWeak: (user?.weakGrammarTopics || []).includes(topicId)
      }))
    }
    
    // Get all grammar topics - GET /api/grammar/all-topics
    if (route === '/grammar/all-topics' && method === 'GET') {
      const decoded = verifyToken(request)
      if (!decoded) {
        return handleCORS(NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 }
        ))
      }
      
      const user = await db.collection('users').findOne({ id: decoded.userId })
      if (!user) {
        return handleCORS(NextResponse.json(
          { error: 'User not found' },
          { status: 404 }
        ))
      }
      
      const allTopics = getAllGrammarTopics()
      const dayField = user.pathway === 'clb5' ? 'clb5Day' : 'clb7Day'
      
      // Filter topics relevant to user's pathway and mark completion status
      const topicsWithStatus = allTopics
        .filter(t => t[dayField])
        .map(topic => {
          const progress = (user.grammarProgress || []).find(p => p.topicId === topic.id)
          const isWeak = (user.weakGrammarTopics || []).includes(topic.id)
          const isAvailable = topic[dayField] <= user.currentDay
          
          return {
            id: topic.id,
            title: topic.title,
            titleEn: topic.titleEn,
            chapter: topic.chapter,
            level: topic.level,
            day: topic[dayField],
            completed: !!progress,
            score: progress?.percentage || null,
            isWeak,
            isAvailable,
            isCurrent: topic[dayField] === user.currentDay
          }
        })
        .sort((a, b) => a.day - b.day)
      
      return handleCORS(NextResponse.json({
        topics: topicsWithStatus,
        currentDay: user.currentDay,
        pathway: user.pathway
      }))
    }
    
    // Remove topic from weak list - POST /api/grammar/remove-weak
    if (route === '/grammar/remove-weak' && method === 'POST') {
      const decoded = verifyToken(request)
      if (!decoded) {
        return handleCORS(NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 }
        ))
      }
      
      const body = await request.json()
      const { topicId } = body
      
      if (!topicId) {
        return handleCORS(NextResponse.json(
          { error: 'topicId is required' },
          { status: 400 }
        ))
      }
      
      const user = await db.collection('users').findOne({ id: decoded.userId })
      if (!user) {
        return handleCORS(NextResponse.json(
          { error: 'User not found' },
          { status: 404 }
        ))
      }
      
      const newWeakTopics = (user.weakGrammarTopics || []).filter(t => t !== topicId)
      
      await db.collection('users').updateOne(
        { id: decoded.userId },
        { $set: { weakGrammarTopics: newWeakTopics } }
      )
      
      return handleCORS(NextResponse.json({
        success: true,
        weakTopics: newWeakTopics
      }))
    }

    // ============ SUBSCRIPTION ROUTES ============
    
    // Get user's subscription info - GET /api/subscription
    if (route === '/subscription' && method === 'GET') {
      const decoded = verifyToken(request)
      if (!decoded) {
        return handleCORS(NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 }
        ))
      }
      
      const user = await db.collection('users').findOne({ id: decoded.userId })
      if (!user) {
        return handleCORS(NextResponse.json(
          { error: 'User not found' },
          { status: 404 }
        ))
      }
      
      const tierLimits = getTierLimits(user)
      const tier = getUserTier(user)
      
      return handleCORS(NextResponse.json({
        subscriptionTier: tier,
        isAdmin: isAdmin(user.email),
        tierLimits,
        subscriptionStartDate: user.subscriptionStartDate,
        subscriptionEndDate: user.subscriptionEndDate,
        currentDay: user.currentDay,
        daysRemaining: Math.max(0, tierLimits.maxDays - user.currentDay),
        grammarLessonsThisWeek: user.grammarLessonsThisWeek || 0,
        grammarLessonsLimit: tierLimits.grammarLessonsPerWeek,
        stripeCustomerId: user.stripeCustomerId || null
      }))
    }
    
    // Create Stripe Checkout Session - POST /api/stripe/create-checkout
    if (route === '/stripe/create-checkout' && method === 'POST') {
      const decoded = verifyToken(request)
      if (!decoded) {
        return handleCORS(NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 }
        ))
      }
      
      const user = await db.collection('users').findOne({ id: decoded.userId })
      if (!user) {
        return handleCORS(NextResponse.json(
          { error: 'User not found' },
          { status: 404 }
        ))
      }
      
      const body = await request.json()
      const { priceKey } = body // e.g., 'basic_monthly', 'premium_yearly'
      
      if (!priceKey || !STRIPE_PRICES[priceKey]) {
        return handleCORS(NextResponse.json(
          { error: 'Invalid price key' },
          { status: 400 }
        ))
      }
      
      const priceConfig = STRIPE_PRICES[priceKey]
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
      
      // Get Stripe instance
      const stripeInstance = getStripe()
      if (!stripeInstance) {
        return handleCORS(NextResponse.json(
          { error: 'Stripe is not configured. Please set STRIPE_SECRET_KEY environment variable.' },
          { status: 500 }
        ))
      }
      
      try {
        // Create or retrieve Stripe customer
        let customerId = user.stripeCustomerId
        
        // Verify customer exists in current Stripe mode (test vs live)
        // If customer was created in test mode but we're now in live mode, create a new customer
        if (customerId) {
          try {
            await stripeInstance.customers.retrieve(customerId)
          } catch (err) {
            // Customer doesn't exist in current mode, clear it
            console.log('Stripe customer not found in current mode, creating new customer')
            customerId = null
          }
        }
        
        if (!customerId) {
          const customer = await stripeInstance.customers.create({
            email: user.email,
            name: user.name,
            metadata: {
              userId: user.id
            }
          })
          customerId = customer.id
          
          // Save customer ID to user
          await db.collection('users').updateOne(
            { id: user.id },
            { $set: { stripeCustomerId: customerId } }
          )
        }
        
        // Create checkout session
        const session = await stripeInstance.checkout.sessions.create({
          customer: customerId,
          payment_method_types: ['card'],
          line_items: [
            {
              price_data: {
                currency: 'usd',
                product_data: {
                  name: `CLB French Trainer - ${priceConfig.name}`,
                  description: `${priceConfig.tier === 'standard' ? 'Unlimited mock tests + 15 AI writing evaluations/month' : 'Unlimited mock tests, AI writing & speaking practice'}`,
                },
                unit_amount: priceConfig.amount,
                recurring: {
                  interval: priceConfig.interval
                }
              },
              quantity: 1,
            },
          ],
          mode: 'subscription',
          success_url: `${baseUrl}/dashboard?payment=success&tier=${priceConfig.tier}&session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${baseUrl}/dashboard?payment=cancelled`,
          metadata: {
            userId: user.id,
            tier: priceConfig.tier,
            priceKey: priceKey
          }
        })
        
        return handleCORS(NextResponse.json({
          sessionId: session.id,
          url: session.url
        }))
      } catch (error) {
        console.error('Stripe error:', error.message, error.type, error.code)
        return handleCORS(NextResponse.json(
          { error: 'Failed to create checkout session', details: error.message },
          { status: 500 }
        ))
      }
    }
    
    // NOTE: Stripe Webhook (POST /api/stripe/webhook) is intercepted at the very
    // top of handleRoute via handleStripeWebhook() - before the Mongo connection.

    // Stripe Checkout reconciliation fallback - POST /api/stripe/reconcile
    // Called by the frontend after redirect to success_url. Retrieves the
    // Checkout Session from Stripe and upgrades the user if payment succeeded,
    // so fulfillment does NOT depend solely on webhook delivery.
    if (route === '/stripe/reconcile' && method === 'POST') {
      const decoded = verifyToken(request)
      if (!decoded) {
        return handleCORS(NextResponse.json({ error: 'Unauthorized' }, { status: 401 }))
      }

      const stripeInstance = getStripe()
      if (!stripeInstance) {
        return handleCORS(NextResponse.json(
          { error: 'Stripe is not configured' },
          { status: 500 }
        ))
      }

      try {
        const body = await request.json()
        const { sessionId } = body
        if (!sessionId) {
          return handleCORS(NextResponse.json({ error: 'Missing sessionId' }, { status: 400 }))
        }

        const session = await stripeInstance.checkout.sessions.retrieve(sessionId)

        // Security: ensure the session belongs to the requesting user.
        if (session.metadata?.userId && session.metadata.userId !== decoded.userId) {
          return handleCORS(NextResponse.json({ error: 'Session does not belong to user' }, { status: 403 }))
        }

        if (session.payment_status !== 'paid') {
          return handleCORS(NextResponse.json(
            { status: 'pending', payment_status: session.payment_status },
            { status: 200 }
          ))
        }

        const upgraded = await applyPaidSubscription(db, {
          userId: decoded.userId,
          tier: session.metadata?.tier,
          priceKey: session.metadata?.priceKey,
          stripeSubscriptionId: session.subscription,
          stripeCustomerId: session.customer,
        })

        const updatedUser = await db.collection('users').findOne({ id: decoded.userId })
        const { password: _, ...userWithoutPassword } = updatedUser
        userWithoutPassword.tierLimits = getTierLimits(updatedUser)

        return handleCORS(NextResponse.json({
          status: upgraded ? 'upgraded' : 'no_change',
          subscriptionTier: updatedUser.subscriptionTier,
          user: userWithoutPassword
        }))
      } catch (error) {
        console.error('Reconcile error:', error.message)
        return handleCORS(NextResponse.json(
          { error: 'Failed to reconcile payment', details: error.message },
          { status: 500 }
        ))
      }
    }
    
    // Manual upgrade (for testing/admin) - POST /api/subscription/upgrade
    if (route === '/subscription/upgrade' && method === 'POST') {
      const decoded = verifyToken(request)
      if (!decoded) {
        return handleCORS(NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 }
        ))
      }
      
      const body = await request.json()
      const { tier } = body
      
      if (!tier || !['standard', 'premium'].includes(tier)) {
        return handleCORS(NextResponse.json(
          { error: 'Invalid tier. Must be standard or premium' },
          { status: 400 }
        ))
      }
      
      // This endpoint is now mainly for demo/testing purposes
      // Real upgrades go through Stripe checkout
      await db.collection('users').updateOne(
        { id: decoded.userId },
        {
          $set: {
            subscriptionTier: tier,
            subscriptionStartDate: new Date(),
            subscriptionEndDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
          }
        }
      )
      
      const updatedUser = await db.collection('users').findOne({ id: decoded.userId })
      const { password: _, ...userWithoutPassword } = updatedUser
      userWithoutPassword.tierLimits = getTierLimits(updatedUser)
      
      return handleCORS(NextResponse.json({
        success: true,
        message: `Successfully upgraded to ${tier} plan`,
        user: userWithoutPassword
      }))
    }
    
    // Admin: Upgrade any user - POST /api/admin/upgrade-user
    if (route === '/admin/upgrade-user' && method === 'POST') {
      const decoded = verifyToken(request)
      if (!decoded) {
        return handleCORS(NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 }
        ))
      }
      
      // Check if requester is admin
      const adminUser = await db.collection('users').findOne({ id: decoded.userId })
      if (!isAdmin(adminUser.email)) {
        return handleCORS(NextResponse.json(
          { error: 'Admin access required' },
          { status: 403 }
        ))
      }
      
      const body = await request.json()
      const { userEmail, tier } = body
      
      if (!userEmail || !tier || !['free', 'standard', 'premium'].includes(tier)) {
        return handleCORS(NextResponse.json(
          { error: 'userEmail and valid tier (free, standard, premium) required' },
          { status: 400 }
        ))
      }
      
      const targetUser = await db.collection('users').findOne({ email: userEmail.toLowerCase() })
      if (!targetUser) {
        return handleCORS(NextResponse.json(
          { error: 'User not found' },
          { status: 404 }
        ))
      }
      
      await db.collection('users').updateOne(
        { email: userEmail.toLowerCase() },
        {
          $set: {
            subscriptionTier: tier,
            subscriptionStartDate: new Date(),
            subscriptionEndDate: tier === 'free' ? null : new Date(Date.now() + 365 * 24 * 60 * 60 * 1000) // 1 year for paid
          }
        }
      )
      
      return handleCORS(NextResponse.json({
        success: true,
        message: `User ${userEmail} upgraded to ${tier}`
      }))
    }
    
    // Get mock exam access info - GET /api/tests/access
    if (route === '/tests/access' && method === 'GET') {
      const decoded = verifyToken(request)
      if (!decoded) {
        return handleCORS(NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 }
        ))
      }
      
      const user = await db.collection('users').findOne({ id: decoded.userId })
      if (!user) {
        return handleCORS(NextResponse.json(
          { error: 'User not found' },
          { status: 404 }
        ))
      }
      
      const tierLimits = getTierLimits(user)
      const usage = await getUsageSummary(db, user)

      const testsThisMonth = usage.mockTests.used
      const aiEvaluationsThisMonth = usage.writing.used
      const testsRemaining = usage.mockTests.unlimited ? 999 : usage.mockTests.remaining
      const aiEvaluationsRemaining = usage.writing.unlimited ? 999 : usage.writing.remaining

      return handleCORS(NextResponse.json({
        subscriptionTier: getUserTier(user),
        isAdmin: isAdmin(user.email),
        isLegacy: usage.isLegacy,
        cycleStart: usage.cycleStart,
        cycleEnd: usage.cycleEnd,
        // Usage model
        maxTestsPerMonth: tierLimits.maxTestsPerMonth,
        testsThisMonth: testsThisMonth,
        testsRemaining: testsRemaining,
        aiWritingEvaluationsPerMonth: usage.writing.limit,
        aiEvaluationsThisMonth: aiEvaluationsThisMonth,
        aiEvaluationsRemaining: aiEvaluationsRemaining,
        aiSpeakingEnabled: tierLimits.aiSpeakingEnabled,
        canAccessFullAnalytics: tierLimits.canAccessFullAnalytics,
        canDownloadResults: tierLimits.canDownloadResults,
        canAccessDailyArchives: tierLimits.canAccessDailyArchives,
        analyticsLevel: tierLimits.analyticsLevel,
        // For backward compatibility - show all tests as accessible
        mockExamsPerSkill: 20,
        accessibleExams: {
          listening: 20,
          reading: 20,
          writing: 20,
          speaking: 20
        },
        totalAccessible: 80
      }))
    }

    // Usage summary for dashboard counters - GET /api/usage
    if (route === '/usage' && method === 'GET') {
      const decoded = verifyToken(request)
      if (!decoded) {
        return handleCORS(NextResponse.json({ error: 'Unauthorized' }, { status: 401 }))
      }
      const user = await db.collection('users').findOne({ id: decoded.userId })
      if (!user) {
        return handleCORS(NextResponse.json({ error: 'User not found' }, { status: 404 }))
      }
      const usage = await getUsageSummary(db, user)
      return handleCORS(NextResponse.json(usage))
    }

    // AI Speaking Practice - prompts list - GET /api/ai/speaking/prompts (Premium only)
    if (route === '/ai/speaking/prompts' && method === 'GET') {
      const decoded = verifyToken(request)
      if (!decoded) {
        return handleCORS(NextResponse.json({ error: 'Unauthorized' }, { status: 401 }))
      }
      const user = await db.collection('users').findOne({ id: decoded.userId })
      if (!user) {
        return handleCORS(NextResponse.json({ error: 'User not found' }, { status: 404 }))
      }
      const tierLimits = getTierLimits(user)
      if (!tierLimits.aiSpeakingEnabled) {
        return handleCORS(NextResponse.json({
          error: 'AI Speaking Practice is a Premium feature',
          code: 'FEATURE_LOCKED',
          upgradeRequired: true,
          requiredTier: 'premium'
        }, { status: 403 }))
      }
      return handleCORS(NextResponse.json({ prompts: SPEAKING_PROMPTS }))
    }

    // AI Speaking Practice - gate check - POST /api/ai/speaking (Premium only)
    if (route === '/ai/speaking' && method === 'POST') {
      const decoded = verifyToken(request)
      if (!decoded) {
        return handleCORS(NextResponse.json({ error: 'Unauthorized' }, { status: 401 }))
      }
      const user = await db.collection('users').findOne({ id: decoded.userId })
      if (!user) {
        return handleCORS(NextResponse.json({ error: 'User not found' }, { status: 404 }))
      }
      const tierLimits = getTierLimits(user)
      if (!tierLimits.aiSpeakingEnabled) {
        return handleCORS(NextResponse.json({
          error: 'AI Speaking Practice is a Premium feature',
          code: 'FEATURE_LOCKED',
          message: 'Upgrade to Premium to unlock AI Speaking Practice.',
          upgradeRequired: true,
          requiredTier: 'premium'
        }, { status: 403 }))
      }
      return handleCORS(NextResponse.json({ status: 'ok', enabled: true }))
    }

    // AI Speaking Practice - evaluate recording - POST /api/ai/speaking/evaluate (Premium only)
    if (route === '/ai/speaking/evaluate' && method === 'POST') {
      const decoded = verifyToken(request)
      if (!decoded) {
        return handleCORS(NextResponse.json({ error: 'Unauthorized' }, { status: 401 }))
      }
      const user = await db.collection('users').findOne({ id: decoded.userId })
      if (!user) {
        return handleCORS(NextResponse.json({ error: 'User not found' }, { status: 404 }))
      }
      const tierLimits = getTierLimits(user)
      if (!tierLimits.aiSpeakingEnabled) {
        return handleCORS(NextResponse.json({
          error: 'AI Speaking Practice is a Premium feature',
          code: 'FEATURE_LOCKED',
          message: 'Upgrade to Premium to unlock AI Speaking Practice.',
          upgradeRequired: true,
          requiredTier: 'premium'
        }, { status: 403 }))
      }

      // Rate limit to protect the LLM endpoint
      const rl = await checkRateLimit(db, user, 'speaking')
      if (!rl.allowed) {
        return handleCORS(NextResponse.json({
          error: 'Rate limit exceeded',
          message: `You're sending requests too quickly. Please wait a moment and try again.`,
          retryAfter: rl.retryAfter
        }, { status: 429 }))
      }

      const geminiKey = process.env.GEMINI_API_KEY
      if (!geminiKey) {
        return handleCORS(NextResponse.json({ error: 'AI service not configured' }, { status: 500 }))
      }

      const body = await request.json()
      const { audioBase64, mimeType, promptId } = body
      if (!audioBase64 || !mimeType) {
        return handleCORS(NextResponse.json({ error: 'audioBase64 and mimeType are required' }, { status: 400 }))
      }
      // Guard against oversized payloads (~12MB base64)
      if (audioBase64.length > 12 * 1024 * 1024) {
        return handleCORS(NextResponse.json({ error: 'Recording too long. Please keep it under ~4 minutes.' }, { status: 413 }))
      }

      const promptObj = SPEAKING_PROMPTS.find(p => p.id === promptId) || SPEAKING_PROMPTS[0]

      try {
        const instruction = `You are an expert TEF/TCF Canada examiner for Expression Orale.
The attached audio is a candidate's spoken response in French to this task:

TASK (${promptObj.taskType}): ${promptObj.title}
PROMPT: ${promptObj.prompt}

Step 1: Transcribe the French audio verbatim (preserve diacritics; do not translate).
Step 2: Evaluate the response against official TEF/TCF criteria. Score each 0-5.
Be strict but fair: reward developed, coherent answers; penalize very short/off-topic ones; tolerate minor slips.

Return ONLY JSON matching the provided schema. Feedback fields should be in clear English with concrete, actionable advice. The modelAnswer must be a strong sample response in French at the target level.`

        const schema = {
          type: 'object',
          properties: {
            transcript: { type: 'string' },
            scores: {
              type: 'object',
              properties: {
                fluency: { type: 'number' },
                pronunciation: { type: 'number' },
                grammar: { type: 'number' },
                vocabulary: { type: 'number' },
                taskAchievement: { type: 'number' }
              },
              required: ['fluency', 'pronunciation', 'grammar', 'vocabulary', 'taskAchievement']
            },
            totalScore: { type: 'number' },
            clbLevel: { type: 'string' },
            cefrLevel: { type: 'string' },
            strengths: { type: 'array', items: { type: 'string' } },
            improvements: { type: 'array', items: { type: 'string' } },
            overallFeedback: { type: 'string' },
            modelAnswer: { type: 'string' }
          },
          required: ['transcript', 'scores', 'totalScore', 'clbLevel', 'strengths', 'improvements', 'overallFeedback', 'modelAnswer']
        }

        const geminiResponse = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-001:generateContent?key=${geminiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [
                { parts: [ { text: instruction }, { inlineData: { mimeType, data: audioBase64 } } ] }
              ],
              generationConfig: {
                temperature: 0.3,
                maxOutputTokens: 4000,
                responseMimeType: 'application/json',
                responseSchema: schema
              }
            })
          }
        )

        if (!geminiResponse.ok) {
          const errText = await geminiResponse.text()
          console.error('Gemini speaking API error:', errText)
          return handleCORS(NextResponse.json({ error: 'AI evaluation service error' }, { status: 502 }))
        }

        const geminiData = await geminiResponse.json()
        const aiText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text
        if (!aiText) {
          console.error('No response from Gemini speaking:', JSON.stringify(geminiData).slice(0, 500))
          return handleCORS(NextResponse.json({ error: 'No response from AI service' }, { status: 502 }))
        }

        let evaluation
        try {
          const cleaned = aiText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
          const match = cleaned.match(/\{[\s\S]*\}/)
          evaluation = JSON.parse(match ? match[0] : cleaned)
        } catch (parseErr) {
          console.error('Failed to parse speaking evaluation:', aiText.slice(0, 300))
          return handleCORS(NextResponse.json({ error: 'Failed to parse AI evaluation' }, { status: 502 }))
        }

        // Persist (success only) - counts as usage for analytics
        await db.collection('speaking_evaluations').insertOne({
          id: uuidv4(),
          userId: decoded.userId,
          promptId: promptObj.id,
          taskType: promptObj.taskType,
          transcript: evaluation.transcript,
          evaluation,
          createdAt: new Date()
        })

        return handleCORS(NextResponse.json({ success: true, evaluation }))
      } catch (error) {
        console.error('Speaking evaluation error:', error)
        return handleCORS(NextResponse.json({ error: 'Failed to evaluate speaking' }, { status: 500 }))
      }
    }

    // Email subscription for marketing - POST /api/subscribe
    if (route === '/subscribe' && method === 'POST') {
      try {
        const body = await request.json()
        const { email, source } = body
        
        if (!email) {
          return handleCORS(NextResponse.json(
            { error: 'Email is required' },
            { status: 400 }
          ))
        }
        
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
          return handleCORS(NextResponse.json(
            { error: 'Invalid email format' },
            { status: 400 }
          ))
        }
        
        // Check if email already exists
        const existingSubscriber = await db.collection('email_subscribers').findOne({ 
          email: email.toLowerCase() 
        })
        
        if (existingSubscriber) {
          return handleCORS(NextResponse.json({
            success: true,
            message: 'You are already subscribed!',
            alreadySubscribed: true
          }))
        }
        
        // Save new subscriber
        const subscriber = {
          id: uuidv4(),
          email: email.toLowerCase(),
          source: source || 'exit_intent_popup',
          subscribedAt: new Date(),
          isActive: true,
          metadata: {
            userAgent: request.headers.get('user-agent'),
            referrer: request.headers.get('referer')
          }
        }
        
        await db.collection('email_subscribers').insertOne(subscriber)
        
        return handleCORS(NextResponse.json({
          success: true,
          message: 'Successfully subscribed! Check your inbox for updates.',
          alreadySubscribed: false
        }))
        
      } catch (error) {
        console.error('Subscribe error:', error)
        return handleCORS(NextResponse.json(
          { error: 'Failed to subscribe. Please try again.' },
          { status: 500 }
        ))
      }
    }
    
    // Get all subscribers (admin only) - GET /api/admin/subscribers
    if (route === '/admin/subscribers' && method === 'GET') {
      const decoded = verifyToken(request)
      if (!decoded) {
        return handleCORS(NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 }
        ))
      }
      
      const user = await db.collection('users').findOne({ id: decoded.userId })
      if (!user || !isAdmin(user.email)) {
        return handleCORS(NextResponse.json(
          { error: 'Admin access required' },
          { status: 403 }
        ))
      }
      
      const subscribers = await db.collection('email_subscribers')
        .find({ isActive: true })
        .sort({ subscribedAt: -1 })
        .toArray()
      
      return handleCORS(NextResponse.json({
        total: subscribers.length,
        subscribers: subscribers.map(s => ({
          email: s.email,
          source: s.source,
          subscribedAt: s.subscribedAt
        }))
      }))
    }

    // AI Writing Evaluation - POST /api/writing/evaluate
    if (route === '/writing/evaluate' && method === 'POST') {
      const decoded = verifyToken(request)
      if (!decoded) {
        return handleCORS(NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 }
        ))
      }
      
      const db = await connectToMongo()
      
      // Get user to check subscription tier and AI evaluation limits
      const user = await db.collection('users').findOne({ email: decoded.email })
      if (!user) {
        return handleCORS(NextResponse.json({ error: 'User not found' }, { status: 404 }))
      }
      
      const tierLimits = getTierLimits(user)
      const writingLimit = isLegacyUser(user) ? UNLIMITED : tierLimits.aiWritingEvaluationsPerMonth

      // Rate limit (per-minute) to protect LLM endpoint from script-botting
      const rl = await checkRateLimit(db, user, 'writing')
      if (!rl.allowed) {
        return handleCORS(NextResponse.json({
          error: 'Rate limit exceeded',
          message: `You're sending requests too quickly. Please wait a moment and try again.`,
          retryAfter: rl.retryAfter
        }, { status: 429 }))
      }

      // Enforce 30-day cycle usage limit (unlimited tiers skip this)
      if (writingLimit < UNLIMITED) {
        const cycleStart = getCycleStart(user)
        const aiEvaluationsThisCycle = await db.collection('writing_evaluations').countDocuments({
          userId: decoded.userId,
          createdAt: { $gte: cycleStart }
        })

        if (aiEvaluationsThisCycle >= writingLimit) {
          const upgradeTarget = getUserTier(user) === 'free' ? 'Standard or Premium' : 'Premium'
          return handleCORS(NextResponse.json({
            error: 'AI evaluation limit reached',
            code: 'LIMIT_REACHED',
            message: `You've used all ${writingLimit} AI writing evaluations in your current cycle. Upgrade to ${upgradeTarget} for more.`,
            aiEvaluationsThisMonth: aiEvaluationsThisCycle,
            maxPerMonth: writingLimit,
            upgradeRequired: true
          }, { status: 403 }))
        }
      }
      
      const body = await request.json()
      const { prompt, response, taskType, wordLimit } = body
      
      if (!prompt || !response) {
        return handleCORS(NextResponse.json(
          { error: 'Prompt and response are required' },
          { status: 400 }
        ))
      }
      
      const geminiKey = process.env.GEMINI_API_KEY
      if (!geminiKey) {
        return handleCORS(NextResponse.json(
          { error: 'AI evaluation service not configured' },
          { status: 500 }
        ))
      }
      
      try {
        const evaluationPrompt = `You are an expert TEF (Test d'Évaluation de Français) examiner. Evaluate the following French writing response according to official TEF Expression Écrite criteria.

TASK TYPE: ${taskType || 'Section A - Formal Letter / Section B - Opinion Essay'}
WORD LIMIT: ${wordLimit || '80-200 words'}

ORIGINAL PROMPT:
${prompt}

STUDENT'S RESPONSE:
${response}

Evaluate the response on these TEF criteria (score each 0-5):
1. Task Achievement (Réalisation de la tâche) - Did the student address all parts of the prompt?
2. Coherence & Cohesion (Cohérence et cohésion) - Is the text well-organized with proper transitions?
3. Lexical Range (Étendue du vocabulaire) - Is vocabulary varied and appropriate?
4. Grammatical Accuracy (Correction grammaticale) - Are grammar and spelling correct?
5. Register & Tone (Registre et ton) - Is the style appropriate for the task type?

Provide your response in this EXACT JSON format (no markdown, just pure JSON):
{
  "scores": {
    "taskAchievement": <0-5>,
    "coherenceCohesion": <0-5>,
    "lexicalRange": <0-5>,
    "grammaticalAccuracy": <0-5>,
    "registerTone": <0-5>
  },
  "totalScore": <0-25>,
  "clbLevel": "<CLB 4-12 equivalent>",
  "tefScore": "<TEF score equivalent out of 450>",
  "strengths": ["<strength 1>", "<strength 2>"],
  "improvements": ["<improvement 1>", "<improvement 2>", "<improvement 3>"],
  "correctedExcerpts": [
    {"original": "<incorrect phrase>", "corrected": "<corrected phrase>", "explanation": "<brief explanation in English>"}
  ],
  "overallFeedback": "<2-3 sentence overall assessment in English>"
}

Be strict but fair. TEF is a standardized test - evaluate accordingly. Return ONLY the JSON object, no other text.`

        // Use Google Gemini API
        const geminiResponse = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-001:generateContent?key=${geminiKey}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              contents: [
                {
                  parts: [
                    { text: evaluationPrompt }
                  ]
                }
              ],
              generationConfig: {
                temperature: 0.3,
                maxOutputTokens: 4000,
              },
              safetySettings: [
                { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
                { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
                { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" },
                { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" }
              ]
            })
          }
        )
        
        if (!geminiResponse.ok) {
          const errorData = await geminiResponse.text()
          console.error('Gemini API Error:', errorData)
          return handleCORS(NextResponse.json(
            { error: 'AI evaluation service error' },
            { status: 500 }
          ))
        }
        
        const geminiData = await geminiResponse.json()
        const aiResponse = geminiData.candidates?.[0]?.content?.parts?.[0]?.text
        
        if (!aiResponse) {
          console.error('No response from Gemini:', geminiData)
          return handleCORS(NextResponse.json(
            { error: 'No response from AI service' },
            { status: 500 }
          ))
        }
        
        // Parse the JSON response
        let evaluation
        try {
          // Extract JSON from response (in case there's extra text or markdown)
          const cleanedResponse = aiResponse.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
          const jsonMatch = cleanedResponse.match(/\{[\s\S]*\}/)
          if (jsonMatch) {
            evaluation = JSON.parse(jsonMatch[0])
          } else {
            throw new Error('No JSON found in response')
          }
        } catch (parseError) {
          console.error('Failed to parse AI response:', aiResponse)
          return handleCORS(NextResponse.json(
            { error: 'Failed to parse AI evaluation' },
            { status: 500 }
          ))
        }
        
        // Save evaluation to database for tracking
        await db.collection('writing_evaluations').insertOne({
          id: uuidv4(),
          userId: decoded.userId,
          prompt,
          response,
          evaluation,
          createdAt: new Date()
        })
        
        return handleCORS(NextResponse.json({
          success: true,
          evaluation
        }))
        
      } catch (error) {
        console.error('Writing evaluation error:', error)
        return handleCORS(NextResponse.json(
          { error: 'Failed to evaluate writing' },
          { status: 500 }
        ))
      }
    }

    // ============================================
    // TEST RESULTS & REPORTS API
    // ============================================

    // Save Test Result - POST /api/tests/results
    if (route === '/tests/results' && method === 'POST') {
      const authHeader = request.headers.get('authorization')
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return handleCORS(NextResponse.json({ error: 'Unauthorized' }, { status: 401 }))
      }
      
      const token = authHeader.split(' ')[1]
      let decoded
      try {
        decoded = jwt.verify(token, JWT_SECRET)
      } catch (error) {
        return handleCORS(NextResponse.json({ error: 'Invalid token' }, { status: 401 }))
      }
      
      const db = await connectToMongo()
      
      // Get user to check subscription tier
      const user = await db.collection('users').findOne({ email: decoded.email })
      if (!user) {
        return handleCORS(NextResponse.json({ error: 'User not found' }, { status: 404 }))
      }
      
      const tierLimits = getTierLimits(user)

      // Enforce 30-day cycle mock-test limit (unlimited tiers skip this)
      if (tierLimits.maxTestsPerMonth < UNLIMITED) {
        const cycleStart = getCycleStart(user)
        const testsThisCycle = await db.collection('test_results').countDocuments({
          email: decoded.email,
          completedAt: { $gte: cycleStart }
        })

        if (testsThisCycle >= tierLimits.maxTestsPerMonth) {
          return handleCORS(NextResponse.json({
            error: 'Mock test limit reached',
            code: 'LIMIT_REACHED',
            message: `You've used all ${tierLimits.maxTestsPerMonth} mock test(s) in your current cycle. Upgrade to Standard or Premium for unlimited tests.`,
            testsThisMonth: testsThisCycle,
            maxTestsPerMonth: tierLimits.maxTestsPerMonth,
            upgradeRequired: true
          }, { status: 403 }))
        }
      }
      
      const body = await request.json()
      const { 
        testType, // comprehensionOrale, comprehensionEcrite, expressionEcrite, expressionOrale
        examId,
        examTitle,
        score,
        totalQuestions,
        correctAnswers,
        timeSpent, // in seconds
        answers // array of { questionId, userAnswer, correctAnswer, isCorrect, questionText, questionType }
      } = body
      
      if (!testType || !examId || score === undefined || !totalQuestions) {
        return handleCORS(NextResponse.json(
          { error: 'Missing required fields' },
          { status: 400 }
        ))
      }
      
      // Calculate percentage and grade
      const percentage = Math.round((score / totalQuestions) * 100)
      let grade = 'F'
      if (percentage >= 90) grade = 'A'
      else if (percentage >= 80) grade = 'B'
      else if (percentage >= 70) grade = 'C'
      else if (percentage >= 60) grade = 'D'
      
      // Identify weak areas from wrong answers
      const weakAreas = answers
        ?.filter(a => !a.isCorrect)
        .map(a => ({
          questionText: a.questionText?.substring(0, 100),
          questionType: a.questionType || 'general'
        })) || []
      
      const testResult = {
        id: uuidv4(),
        email: decoded.email,
        testType,
        examId,
        examTitle: examTitle || `${testType} - Exam`,
        score,
        totalQuestions,
        correctAnswers: correctAnswers || score,
        percentage,
        grade,
        timeSpent: timeSpent || 0,
        answers: answers || [],
        weakAreas,
        completedAt: new Date()
      }
      
      await db.collection('test_results').insertOne(testResult)
      
      // Update user's test statistics
      await db.collection('users').updateOne(
        { email: decoded.email },
        { 
          $inc: { 
            totalTestsTaken: 1,
            [`testsCompleted.${testType}`]: 1
          },
          $set: { lastTestDate: new Date() }
        }
      )
      
      return handleCORS(NextResponse.json({
        success: true,
        resultId: testResult.id,
        summary: {
          score,
          totalQuestions,
          percentage,
          grade,
          timeSpent,
          weakAreasCount: weakAreas.length
        }
      }))
    }

    // Get Test Result by ID - GET /api/tests/results/:resultId
    if (route.startsWith('/tests/results/') && method === 'GET') {
      const resultId = route.replace('/tests/results/', '')
      
      const authHeader = request.headers.get('authorization')
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return handleCORS(NextResponse.json({ error: 'Unauthorized' }, { status: 401 }))
      }
      
      const token = authHeader.split(' ')[1]
      let decoded
      try {
        decoded = jwt.verify(token, JWT_SECRET)
      } catch (error) {
        return handleCORS(NextResponse.json({ error: 'Invalid token' }, { status: 401 }))
      }
      
      const db = await connectToMongo()
      const result = await db.collection('test_results').findOne({ 
        id: resultId,
        email: decoded.email 
      })
      
      if (!result) {
        return handleCORS(NextResponse.json(
          { error: 'Result not found' },
          { status: 404 }
        ))
      }
      
      return handleCORS(NextResponse.json(result))
    }

    // Get Test History - GET /api/tests/history?testType=&limit=
    if (route === '/tests/history' && method === 'GET') {
      const authHeader = request.headers.get('authorization')
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return handleCORS(NextResponse.json({ error: 'Unauthorized' }, { status: 401 }))
      }
      
      const token = authHeader.split(' ')[1]
      let decoded
      try {
        decoded = jwt.verify(token, JWT_SECRET)
      } catch (error) {
        return handleCORS(NextResponse.json({ error: 'Invalid token' }, { status: 401 }))
      }
      
      const db = await connectToMongo()
      const user = await db.collection('users').findOne({ email: decoded.email })
      
      // Check subscription tier
      const tier = getUserTier(user)
      const tierLimits = getTierLimits(user)
      const isPremiumOrAdmin = tier === 'premium' || tier === 'admin'
      
      const url = new URL(request.url)
      const testType = url.searchParams.get('testType')
      const limitParam = url.searchParams.get('limit')
      
      // Free users get testsHistoryLimit (3), Premium gets unlimited
      const maxLimit = isPremiumOrAdmin ? 100 : tierLimits.testsHistoryLimit
      const limit = limitParam ? Math.min(parseInt(limitParam), maxLimit) : maxLimit
      
      const query = { email: decoded.email }
      if (testType && testType !== 'all') {
        query.testType = testType
      }
      
      const results = await db.collection('test_results')
        .find(query)
        .sort({ completedAt: -1 })
        .limit(limit)
        .toArray()
      
      // Count total tests for free users to show how many they can't see
      const totalTests = await db.collection('test_results').countDocuments({ email: decoded.email })
      const hiddenTests = !isPremiumOrAdmin && totalTests > tierLimits.testsHistoryLimit 
        ? totalTests - tierLimits.testsHistoryLimit 
        : 0
      
      return handleCORS(NextResponse.json({
        results,
        total: results.length,
        totalTestsTaken: totalTests,
        hiddenTests,
        historyLimit: isPremiumOrAdmin ? null : tierLimits.testsHistoryLimit,
        tier,
        upgradeRequired: !isPremiumOrAdmin && hiddenTests > 0
      }))
    }

    // Get Performance Analytics - GET /api/tests/analytics
    if (route === '/tests/analytics' && method === 'GET') {
      const authHeader = request.headers.get('authorization')
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return handleCORS(NextResponse.json({ error: 'Unauthorized' }, { status: 401 }))
      }
      
      const token = authHeader.split(' ')[1]
      let decoded
      try {
        decoded = jwt.verify(token, JWT_SECRET)
      } catch (error) {
        return handleCORS(NextResponse.json({ error: 'Invalid token' }, { status: 401 }))
      }
      
      const db = await connectToMongo()
      const user = await db.collection('users').findOne({ email: decoded.email })
      
      // Check subscription tier
      const tier = getUserTier(user)
      if (tier === 'free') {
        return handleCORS(NextResponse.json({
          error: 'Analytics not available for free tier',
          upgradeRequired: true
        }, { status: 403 }))
      }
      
      // Get all results for analytics
      const allResults = await db.collection('test_results')
        .find({ email: decoded.email })
        .sort({ completedAt: -1 })
        .toArray()
      
      if (allResults.length === 0) {
        return handleCORS(NextResponse.json({
          totalTests: 0,
          bySkill: {},
          recentProgress: [],
          weakAreas: [],
          tier
        }))
      }
      
      // Group by skill
      const bySkill = {
        comprehensionOrale: { count: 0, totalScore: 0, avgPercentage: 0 },
        comprehensionEcrite: { count: 0, totalScore: 0, avgPercentage: 0 },
        expressionEcrite: { count: 0, totalScore: 0, avgPercentage: 0 },
        expressionOrale: { count: 0, totalScore: 0, avgPercentage: 0 }
      }
      
      const weakAreasMap = {}
      
      allResults.forEach(result => {
        if (bySkill[result.testType]) {
          bySkill[result.testType].count++
          bySkill[result.testType].totalScore += result.percentage
        }
        
        // Collect weak areas (only for premium)
        if (tier === 'premium' || tier === 'admin') {
          result.weakAreas?.forEach(wa => {
            const key = wa.questionType || 'general'
            if (!weakAreasMap[key]) {
              weakAreasMap[key] = { type: key, count: 0, skill: result.testType }
            }
            weakAreasMap[key].count++
          })
        }
      })
      
      // Calculate averages
      Object.keys(bySkill).forEach(skill => {
        if (bySkill[skill].count > 0) {
          bySkill[skill].avgPercentage = Math.round(bySkill[skill].totalScore / bySkill[skill].count)
        }
      })
      
      // Get recent progress (last 10 tests per skill)
      const recentProgress = {}
      Object.keys(bySkill).forEach(skill => {
        recentProgress[skill] = allResults
          .filter(r => r.testType === skill)
          .slice(0, 10)
          .map(r => ({
            date: r.completedAt,
            percentage: r.percentage,
            examTitle: r.examTitle
          }))
          .reverse() // Oldest to newest for chart
      })
      
      // Sort weak areas by count
      const weakAreas = Object.values(weakAreasMap)
        .sort((a, b) => b.count - a.count)
        .slice(0, 10)
      
      return handleCORS(NextResponse.json({
        totalTests: allResults.length,
        bySkill,
        recentProgress,
        weakAreas,
        lastTestDate: allResults[0]?.completedAt,
        tier
      }))
    }

    // Root endpoint
    if (route === '/' && method === 'GET') {
      return handleCORS(NextResponse.json({ message: 'CLB French Trainer API', version: '1.0.0' }))
    }

    // Text-to-Speech - POST /api/tts
    if (route === '/tts' && method === 'POST') {
      const body = await request.json()
      const { text, languageCode = 'fr-FR', speakingRate = 1.0 } = body
      
      if (!text) {
        return handleCORS(NextResponse.json(
          { error: 'Text is required' },
          { status: 400 }
        ))
      }
      
      // Limit text length to prevent abuse (5000 chars max)
      if (text.length > 5000) {
        return handleCORS(NextResponse.json(
          { error: 'Text exceeds maximum length of 5000 characters' },
          { status: 400 }
        ))
      }
      
      try {
        // Use REST API for better serverless compatibility
        const audioContent = await synthesizeSpeechREST(text, languageCode, speakingRate)
        
        if (!audioContent) {
          throw new Error('No audio content received from TTS API')
        }
        
        // Return audio as base64 for easy frontend handling
        return handleCORS(NextResponse.json({
          audio: audioContent,
          contentType: 'audio/mpeg'
        }))
        
      } catch (error) {
        console.error('TTS Error:', error)
        return handleCORS(NextResponse.json(
          { error: 'Failed to generate audio', details: error.message },
          { status: 500 }
        ))
      }
    }

    // Route not found
    return handleCORS(NextResponse.json(
      { error: `Route ${route} not found` },
      { status: 404 }
    ))

  } catch (error) {
    console.error('API Error:', error)
    return handleCORS(NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    ))
  }
}

// Export all HTTP methods
export const GET = handleRoute
export const POST = handleRoute
export const PUT = handleRoute
export const DELETE = handleRoute
export const PATCH = handleRoute