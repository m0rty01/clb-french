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
      
      // Create user
      const user = {
        id: uuidv4(),
        email: email.toLowerCase(),
        password: hashedPassword,
        name: name || email.split('@')[0],
        createdAt: new Date(),
        // Pathway fields - null until onboarding
        pathway: null,
        pathwayStartDate: null,
        targetExamDate: null,
        dailyTimeBudget: 210, // Default 3.5 hours in minutes
        currentDay: 0,
        onboardingComplete: false
      }
      
      await db.collection('users').insertOne(user)
      
      // Generate token
      const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '30d' })
      
      const { password: _, ...userWithoutPassword } = user
      
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
      
      let dailyLog = await db.collection('daily_logs').findOne({
        userId: decoded.userId,
        date: today
      })
      
      // If no log exists for today, create one
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
      
      const today = new Date().toISOString().split('T')[0]
      
      // Calculate totals
      let totalTimeSpent = 0
      let allCompleted = true
      
      for (const key of Object.keys(activities)) {
        totalTimeSpent += activities[key].timeSpent || 0
        if (!activities[key].completed) {
          allCompleted = false
        }
      }
      
      await db.collection('daily_logs').updateOne(
        { userId: decoded.userId, date: today },
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
        date: today
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
      
      const today = new Date().toISOString().split('T')[0]
      
      const dailyLog = await db.collection('daily_logs').findOne({
        userId: decoded.userId,
        date: today
      })
      
      if (!dailyLog) {
        return handleCORS(NextResponse.json(
          { error: 'No log found for today' },
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