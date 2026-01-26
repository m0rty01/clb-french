import { MongoClient } from 'mongodb'
import { v4 as uuidv4 } from 'uuid'
import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { getGrammarForDay, getGrammarTopicById, getAllGrammarTopics } from '@/lib/grammar-curriculum'

// JWT Secret - MUST be set in environment for production
const JWT_SECRET = process.env.JWT_SECRET
if (!JWT_SECRET) {
  console.warn('WARNING: JWT_SECRET not set in environment variables')
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
    
    // MOCKED Google Login - POST /api/auth/google-mock
    // NOTE: This is a MOCKED implementation. In production, implement real Google OAuth
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
        grammarLessonsLimit: tierLimits.grammarLessonsPerWeek
      }))
    }
    
    // MOCKED Upgrade subscription - POST /api/subscription/upgrade
    // NOTE: In production, this would integrate with Stripe
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
      
      // MOCKED: In production, verify Stripe payment before upgrading
      await db.collection('users').updateOne(
        { id: decoded.userId },
        {
          $set: {
            subscriptionTier: tier,
            subscriptionStartDate: new Date(),
            subscriptionEndDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days from now
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

    // Root endpoint
    if (route === '/' && method === 'GET') {
      return handleCORS(NextResponse.json({ message: 'CLB French Trainer API', version: '1.0.0' }))
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