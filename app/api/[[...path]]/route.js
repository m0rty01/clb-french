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
  premium_monthly: {
    amount: 900, // $9.00/month
    name: 'Premium Monthly',
    tier: 'premium',
    interval: 'month'
  },
  premium_yearly: {
    amount: 7000, // $70.00/year (~$5.83/month - 35% savings)
    name: 'Premium Yearly',
    tier: 'premium',
    interval: 'year'
  }
}

// Admin email with full access
const ADMIN_EMAIL = 'ravijha97.01@gmail.com'

// Subscription tier limits
const SUBSCRIPTION_LIMITS = {
  free: {
    maxDays: 7,                    // First 7 days only
    grammarLessonsPerWeek: 3,      // 3 grammar lessons per week
    mockExamsPerSkill: 2,          // 2 mock exams per skill (8 total)
    pathways: ['clb5'],            // Only CLB 5
    canAccessAllTopics: false
  },
  basic: {
    maxDays: 112,                  // Full CLB 5 pathway
    grammarLessonsPerWeek: 999,    // Unlimited
    mockExamsPerSkill: 10,         // 10 per skill (40 total)
    pathways: ['clb5'],            // Only CLB 5
    canAccessAllTopics: true
  },
  premium: {
    maxDays: 999,                  // Both pathways
    grammarLessonsPerWeek: 999,    // Unlimited
    mockExamsPerSkill: 20,         // All 20 per skill (80 total)
    pathways: ['clb5', 'clb7'],    // Both pathways
    canAccessAllTopics: true
  },
  admin: {
    maxDays: 999,
    grammarLessonsPerWeek: 999,
    mockExamsPerSkill: 20,
    pathways: ['clb5', 'clb7'],
    canAccessAllTopics: true
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
                  description: `${priceConfig.tier === 'basic' ? 'Full CLB 5 pathway access' : 'Full access to both CLB 5 & CLB 7 pathways'}`,
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
          success_url: `${baseUrl}/dashboard?payment=success&tier=${priceConfig.tier}`,
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
    
    // Stripe Webhook - POST /api/stripe/webhook
    if (route === '/stripe/webhook' && method === 'POST') {
      try {
        const body = await request.text()
        const signature = request.headers.get('stripe-signature')
        
        // For now, we'll process without signature verification in test mode
        // In production, add STRIPE_WEBHOOK_SECRET and verify signature
        const event = JSON.parse(body)
        
        console.log('Stripe webhook event:', event.type)
        
        if (event.type === 'checkout.session.completed') {
          const session = event.data.object
          const userId = session.metadata?.userId
          const tier = session.metadata?.tier
          
          if (userId && tier) {
            const subscriptionDays = session.metadata?.priceKey?.includes('yearly') ? 365 : 30
            
            await db.collection('users').updateOne(
              { id: userId },
              {
                $set: {
                  subscriptionTier: tier,
                  subscriptionStartDate: new Date(),
                  subscriptionEndDate: new Date(Date.now() + subscriptionDays * 24 * 60 * 60 * 1000),
                  stripeSubscriptionId: session.subscription,
                  stripeCustomerId: session.customer
                }
              }
            )
            
            console.log(`User ${userId} upgraded to ${tier}`)
          }
        }
        
        if (event.type === 'customer.subscription.deleted') {
          const subscription = event.data.object
          const customerId = subscription.customer
          
          // Find user by Stripe customer ID and downgrade to free
          await db.collection('users').updateOne(
            { stripeCustomerId: customerId },
            {
              $set: {
                subscriptionTier: 'free',
                subscriptionEndDate: new Date(),
                stripeSubscriptionId: null
              }
            }
          )
          
          console.log(`Subscription cancelled for customer ${customerId}`)
        }
        
        return handleCORS(NextResponse.json({ received: true }))
      } catch (error) {
        console.error('Webhook error:', error)
        return handleCORS(NextResponse.json(
          { error: 'Webhook processing failed' },
          { status: 400 }
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
      
      if (!tier || !['basic', 'premium'].includes(tier)) {
        return handleCORS(NextResponse.json(
          { error: 'Invalid tier. Must be basic or premium' },
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
      
      if (!userEmail || !tier || !['free', 'basic', 'premium'].includes(tier)) {
        return handleCORS(NextResponse.json(
          { error: 'userEmail and valid tier (free, basic, premium) required' },
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
      
      return handleCORS(NextResponse.json({
        subscriptionTier: getUserTier(user),
        mockExamsPerSkill: tierLimits.mockExamsPerSkill,
        accessibleExams: {
          listening: tierLimits.mockExamsPerSkill,
          reading: tierLimits.mockExamsPerSkill,
          writing: tierLimits.mockExamsPerSkill,
          speaking: tierLimits.mockExamsPerSkill
        },
        totalAccessible: tierLimits.mockExamsPerSkill * 4,
        isAdmin: isAdmin(user.email)
      }))
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
      
      const db = await connectToMongo()
      
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
      if (tier === 'free') {
        return handleCORS(NextResponse.json({
          error: 'Reports not available for free tier',
          upgradeRequired: true
        }, { status: 403 }))
      }
      
      const url = new URL(request.url)
      const testType = url.searchParams.get('testType')
      const limitParam = url.searchParams.get('limit')
      
      // Basic users get 10 results, Premium gets all
      const limit = tier === 'premium' || tier === 'admin' 
        ? (limitParam ? parseInt(limitParam) : 100) 
        : Math.min(parseInt(limitParam) || 10, 10)
      
      const query = { email: decoded.email }
      if (testType && testType !== 'all') {
        query.testType = testType
      }
      
      const results = await db.collection('test_results')
        .find(query)
        .sort({ completedAt: -1 })
        .limit(limit)
        .toArray()
      
      return handleCORS(NextResponse.json({
        results,
        total: results.length,
        tier
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