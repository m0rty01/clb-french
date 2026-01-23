'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { toast } from 'sonner'
import { useTheme } from 'next-themes'
import { 
  BookOpen, Headphones, Mic, FileText, PenTool, 
  Trophy, Flame, Clock, Calendar, Target, ChevronRight,
  Moon, Sun, LogOut, RotateCcw, Check, Play, Pause,
  AlertTriangle, Lock, Unlock, ExternalLink, TrendingUp
} from 'lucide-react'
import Cookies from 'js-cookie'
import { getPathway, getCurrentMonthData, getDailyActivities, calculateProgress, getWeekNumber, getDayOfWeek } from '@/lib/pathways'
import { getDailyResources, getProgressDescription } from '@/lib/daily-resources'

// Activity Icons Map
const activityIcons = {
  grammar: BookOpen,
  listening: Headphones,
  speaking: Mic,
  reading: FileText,
  writing: PenTool
}

const activityColors = {
  grammar: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
  listening: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
  speaking: 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20',
  reading: 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20',
  writing: 'bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/20'
}

const levelColors = {
  'A1': 'bg-emerald-500/10 text-emerald-600 border-emerald-500/30',
  'A2': 'bg-blue-500/10 text-blue-600 border-blue-500/30',
  'B1': 'bg-purple-500/10 text-purple-600 border-purple-500/30',
  'B2': 'bg-orange-500/10 text-orange-600 border-orange-500/30'
}

// Auth Component
function AuthPage({ onAuth }) {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const { theme, setTheme } = useTheme()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register'
      const body = isLogin ? { email, password } : { email, password, name }
      
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
      
      const data = await res.json()
      
      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed')
      }
      
      Cookies.set('token', data.token, { expires: 30 })
      onAuth(data.user, data.token)
      toast.success(isLogin ? 'Welcome back!' : 'Account created successfully!')
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-background to-muted/30">
      <div className="absolute top-4 right-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>
      </div>
      
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
            <span className="text-2xl font-bold text-primary-foreground">🇫🇷</span>
          </div>
        </div>
        <h1 className="text-3xl font-bold tracking-tight">CLB French Trainer</h1>
        <p className="text-muted-foreground mt-2">Discipline-focused training for CLB certification</p>
      </div>
      
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{isLogin ? 'Welcome Back' : 'Create Account'}</CardTitle>
          <CardDescription>
            {isLogin ? 'Sign in to continue your training' : 'Start your French learning journey'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Create Account')}
            </Button>
          </form>
          
          <div className="mt-4 text-center">
            <button
              type="button"
              className="text-sm text-muted-foreground hover:text-primary"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
            </button>
          </div>
        </CardContent>
      </Card>
      
      <p className="mt-8 text-sm text-muted-foreground text-center max-w-md">
        Training software for serious learners. Based on "Practice Makes Perfect: Complete French Grammar"
      </p>
    </div>
  )
}

// Onboarding Component
function OnboardingPage({ user, token, onComplete }) {
  const [pathway, setPathway] = useState(null)
  const [targetExamDate, setTargetExamDate] = useState('')
  const [dailyTimeBudget, setDailyTimeBudget] = useState(210)
  const [loading, setLoading] = useState(false)
  const { theme, setTheme } = useTheme()

  const handleSubmit = async () => {
    if (!pathway) {
      toast.error('Please select a pathway')
      return
    }
    
    setLoading(true)
    try {
      const res = await fetch('/api/onboarding', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ pathway, targetExamDate, dailyTimeBudget })
      })
      
      const data = await res.json()
      
      if (!res.ok) {
        throw new Error(data.error || 'Failed to complete onboarding')
      }
      
      onComplete(data.user)
      toast.success('Pathway activated! Your training begins now.')
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen p-4 bg-gradient-to-b from-background to-muted/30">
      <div className="absolute top-4 right-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>
      </div>
      
      <div className="max-w-2xl mx-auto pt-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Welcome, {user.name}!</h1>
          <p className="text-muted-foreground mt-2">Let's set up your training pathway</p>
        </div>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Choose Your Target
            </CardTitle>
            <CardDescription>
              Select the CLB level you're training for. This cannot be changed without resetting all progress.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <button
              type="button"
              onClick={() => setPathway('clb5')}
              className={`p-6 rounded-lg border-2 text-left transition-all ${
                pathway === 'clb5'
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <Badge variant="secondary">CLB 5</Badge>
                <span className="text-sm text-muted-foreground">4 months</span>
              </div>
              <h3 className="font-semibold text-lg mb-1">CLB 5 Pathway</h3>
              <p className="text-sm text-muted-foreground">
                Foundation to functional French. 112 days of structured training.
              </p>
              <div className="mt-4 flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4" />
                <span>3-4 hours daily</span>
              </div>
            </button>
            
            <button
              type="button"
              onClick={() => setPathway('clb7')}
              className={`p-6 rounded-lg border-2 text-left transition-all ${
                pathway === 'clb7'
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <Badge variant="secondary">CLB 7</Badge>
                <span className="text-sm text-muted-foreground">8-12 months</span>
              </div>
              <h3 className="font-semibold text-lg mb-1">CLB 7 Pathway</h3>
              <p className="text-sm text-muted-foreground">
                Comprehensive B2- level training. 336 days of intensive work.
              </p>
              <div className="mt-4 flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4" />
                <span>3-4 hours daily</span>
              </div>
            </button>
          </CardContent>
        </Card>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Optional Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="examDate">Target Exam Date (Optional)</Label>
              <Input
                id="examDate"
                type="date"
                value={targetExamDate}
                onChange={(e) => setTargetExamDate(e.target.value)}
              />
              <p className="text-sm text-muted-foreground">
                Setting an exam date helps track your countdown
              </p>
            </div>
            
            <div className="space-y-2">
              <Label>Daily Time Budget: {Math.floor(dailyTimeBudget / 60)}h {dailyTimeBudget % 60}m</Label>
              <input
                type="range"
                min="120"
                max="300"
                step="15"
                value={dailyTimeBudget}
                onChange={(e) => setDailyTimeBudget(Number(e.target.value))}
                className="w-full"
              />
              <p className="text-sm text-muted-foreground">
                Recommended: 3-4 hours daily for optimal progress
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-orange-500/50 bg-orange-500/5 mb-6">
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <AlertTriangle className="h-6 w-6 text-orange-500 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-orange-600 dark:text-orange-400">Important: You Need the Book</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  This training references "Practice Makes Perfect: Complete French Grammar". 
                  You must own this book to follow the grammar exercises. The app will guide you 
                  through chapters but does not contain the book content.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Button
          onClick={handleSubmit}
          className="w-full"
          size="lg"
          disabled={!pathway || loading}
        >
          {loading ? 'Setting up...' : 'Begin Training'}
          <ChevronRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}

// Timer Component
function ActivityTimer({ activity, timeSpent, onTimeUpdate, isActive, onToggle }) {
  const [localTime, setLocalTime] = useState(timeSpent)
  
  useEffect(() => {
    setLocalTime(timeSpent)
  }, [timeSpent])
  
  useEffect(() => {
    let interval
    if (isActive) {
      interval = setInterval(() => {
        setLocalTime(t => {
          const newTime = t + 1
          onTimeUpdate(newTime)
          return newTime
        })
      }, 60000) // Update every minute
    }
    return () => clearInterval(interval)
  }, [isActive, onTimeUpdate])
  
  const hours = Math.floor(localTime / 60)
  const minutes = localTime % 60
  
  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={onToggle}
        className={isActive ? 'bg-green-500/10 border-green-500' : ''}
      >
        {isActive ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
      </Button>
      <span className="text-sm font-mono min-w-[60px]">
        {hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`}
      </span>
    </div>
  )
}

// Dashboard Component
function Dashboard({ user, token, onLogout, onReset }) {
  const [dailyLog, setDailyLog] = useState(null)
  const [progress, setProgress] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTimer, setActiveTimer] = useState(null)
  const { theme, setTheme } = useTheme()
  
  const pathwayData = getPathway(user.pathway)
  const currentMonthData = getCurrentMonthData(user.pathway, user.currentDay)
  const dailyActivities = getDailyActivities(user.pathway, user.currentDay)
  const dailyResources = getDailyResources(user.currentDay, user.pathway)
  const levelProgress = getProgressDescription(user.currentDay, user.pathway)
  
  useEffect(() => {
    fetchData()
  }, [])
  
  const fetchData = async () => {
    try {
      const [logRes, progressRes] = await Promise.all([
        fetch('/api/daily-log/today', {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch('/api/progress', {
          headers: { 'Authorization': `Bearer ${token}` }
        })
      ])
      
      const logData = await logRes.json()
      const progressData = await progressRes.json()
      
      if (logRes.ok) setDailyLog(logData.dailyLog)
      if (progressRes.ok) setProgress(progressData)
    } catch (error) {
      toast.error('Failed to load data')
    } finally {
      setLoading(false)
    }
  }
  
  const updateActivity = async (activityKey, updates) => {
    if (!dailyLog) return
    
    const newActivities = {
      ...dailyLog.activities,
      [activityKey]: {
        ...dailyLog.activities[activityKey],
        ...updates
      }
    }
    
    setDailyLog({ ...dailyLog, activities: newActivities })
    
    try {
      await fetch('/api/daily-log', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ activities: newActivities })
      })
    } catch (error) {
      toast.error('Failed to save progress')
    }
  }
  
  const completeDay = async () => {
    try {
      const res = await fetch('/api/daily-log/complete', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      })
      
      const data = await res.json()
      
      if (res.ok) {
        toast.success('Day completed! Keep up the discipline.')
        window.location.reload()
      } else {
        throw new Error(data.error)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
  
  const allActivitiesCompleted = dailyLog && Object.values(dailyLog.activities).every(a => a.completed)
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b sticky top-0 bg-background/95 backdrop-blur z-50">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-sm font-bold text-primary-foreground">🇫🇷</span>
            </div>
            <div>
              <h1 className="font-semibold text-sm">CLB French Trainer</h1>
              <p className="text-xs text-muted-foreground">{pathwayData.name} • Day {user.currentDay}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>
            
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" size="icon">
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Reset Pathway?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will delete ALL your progress and daily logs. You'll need to select a new pathway. This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={onReset} className="bg-destructive text-destructive-foreground">
                    Reset Everything
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            
            <Button variant="ghost" size="icon" onClick={onLogout}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>
      
      <main className="max-w-5xl mx-auto px-4 py-6 space-y-6">
        {/* Progress Overview */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-orange-500/10">
                  <Flame className="h-6 w-6 text-orange-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{progress?.streak || 0}</p>
                  <p className="text-sm text-muted-foreground">Day Streak</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-green-500/10">
                  <Trophy className="h-6 w-6 text-green-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{progress?.totalDaysCompleted || 0}</p>
                  <p className="text-sm text-muted-foreground">Days Done</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-blue-500/10">
                  <Clock className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {Math.floor((progress?.totalTimeSpent || 0) / 60)}h
                  </p>
                  <p className="text-sm text-muted-foreground">Total Time</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-purple-500/10">
                  <Target className="h-6 w-6 text-purple-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{progress?.progressPercent || 0}%</p>
                  <p className="text-sm text-muted-foreground">Complete</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Overall Progress Bar */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Pathway Progress</span>
              <span className="text-sm text-muted-foreground">
                Day {user.currentDay} of {pathwayData.totalDays}
              </span>
            </div>
            <Progress value={progress?.progressPercent || 0} className="h-2" />
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs text-muted-foreground">Week {getWeekNumber(user.currentDay)}</span>
              <span className="text-xs text-muted-foreground">
                {currentMonthData.name}
              </span>
            </div>
          </CardContent>
        </Card>
        
        {/* Current Phase Info */}
        <Card className="border-primary/30 bg-primary/5">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">Month {currentMonthData.month}: {currentMonthData.name}</CardTitle>
                <CardDescription className="mt-1">{currentMonthData.goal}</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Badge className={`${levelColors[dailyResources.level]} border`}>
                  Level {dailyResources.level}
                </Badge>
                <Badge variant="outline" className="border-primary text-primary">
                  Week {getWeekNumber(user.currentDay)}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <TrendingUp className="h-4 w-4" />
              <span>{levelProgress.description}</span>
              <span className="ml-auto">Target: {levelProgress.targetLevel}</span>
            </div>
          </CardContent>
        </Card>
        
        {/* Daily Activities */}
        <div>
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Today's Non-Negotiable Routine
          </h2>
          
          <div className="space-y-4">
            {Object.entries(dailyActivities).map(([key, activity]) => {
              const Icon = activityIcons[key]
              const logActivity = dailyLog?.activities?.[key] || { completed: false, timeSpent: 0, notes: '' }
              const isTimerActive = activeTimer === key
              const resource = dailyResources[key]
              
              return (
                <Card key={key} className={`transition-all ${logActivity.completed ? 'bg-green-500/5 border-green-500/30' : ''}`}>
                  <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row md:items-start gap-4">
                      {/* Activity Header */}
                      <div className="flex items-start gap-4 flex-1">
                        <div className={`p-3 rounded-lg border ${activityColors[key]}`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <h3 className="font-semibold capitalize">{key}</h3>
                            <Badge variant="secondary" className="text-xs">
                              {activity.duration} min
                            </Badge>
                            <Badge className={`${levelColors[resource?.level || 'A1']} border text-xs`}>
                              {resource?.level || 'A1'}
                            </Badge>
                            {logActivity.completed && (
                              <Badge className="bg-green-500 text-white text-xs">
                                <Check className="h-3 w-3 mr-1" /> Done
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{activity.focus || activity.instructions}</p>
                          
                          {/* Book Chapters for Grammar */}
                          {key === 'grammar' && activity.bookChapters && (
                            <div className="bg-muted/50 rounded-lg p-3 mt-2">
                              <p className="text-xs font-medium text-muted-foreground mb-1">📖 Practice Makes Perfect Reference:</p>
                              <ul className="text-sm space-y-1">
                                {activity.bookChapters.map((chapter, i) => (
                                  <li key={i} className="text-muted-foreground">• {chapter}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                          
                          {/* Daily Resource - Listening */}
                          {key === 'listening' && resource && (
                            <div className="bg-purple-500/5 border border-purple-500/20 rounded-lg p-3 mt-2">
                              <p className="text-xs font-medium text-purple-600 dark:text-purple-400 mb-2">🎧 Today's Listening Exercise:</p>
                              <div className="space-y-2">
                                <div className="flex items-start justify-between gap-2">
                                  <div>
                                    <p className="font-medium text-sm">{resource.title}</p>
                                    <p className="text-xs text-muted-foreground">{resource.description}</p>
                                  </div>
                                  <a 
                                    href={resource.url} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1 text-xs bg-purple-500 text-white px-3 py-1.5 rounded-md hover:bg-purple-600 transition-colors whitespace-nowrap"
                                  >
                                    Open <ExternalLink className="h-3 w-3" />
                                  </a>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                  <Badge variant="outline" className="text-xs">{resource.type}</Badge>
                                  {resource.duration && <span>⏱️ {resource.duration}</span>}
                                </div>
                              </div>
                            </div>
                          )}
                          
                          {/* Daily Resource - Reading */}
                          {key === 'reading' && resource && (
                            <div className="bg-orange-500/5 border border-orange-500/20 rounded-lg p-3 mt-2">
                              <p className="text-xs font-medium text-orange-600 dark:text-orange-400 mb-2">📚 Today's Reading Material:</p>
                              <div className="space-y-2">
                                <div className="flex items-start justify-between gap-2">
                                  <div>
                                    <p className="font-medium text-sm">{resource.title}</p>
                                    <p className="text-xs text-muted-foreground">{resource.description}</p>
                                  </div>
                                  <a 
                                    href={resource.url} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1 text-xs bg-orange-500 text-white px-3 py-1.5 rounded-md hover:bg-orange-600 transition-colors whitespace-nowrap"
                                  >
                                    Open <ExternalLink className="h-3 w-3" />
                                  </a>
                                </div>
                                <Badge variant="outline" className="text-xs">{resource.type}</Badge>
                              </div>
                            </div>
                          )}
                          
                          {/* Daily Resource - Writing */}
                          {key === 'writing' && resource && (
                            <div className="bg-pink-500/5 border border-pink-500/20 rounded-lg p-3 mt-2">
                              <p className="text-xs font-medium text-pink-600 dark:text-pink-400 mb-2">✍️ Today's Writing Exercise:</p>
                              <div className="space-y-2">
                                <p className="font-medium text-sm">{resource.title}</p>
                                <p className="text-sm text-muted-foreground">{resource.prompt}</p>
                                {resource.example && (
                                  <div className="bg-muted/50 rounded p-2 mt-1">
                                    <p className="text-xs text-muted-foreground">💡 Example start: <em>{resource.example}</em></p>
                                  </div>
                                )}
                                <Badge variant="outline" className="text-xs">📝 {resource.wordCount}</Badge>
                              </div>
                            </div>
                          )}
                          
                          {/* Daily Resource - Speaking */}
                          {key === 'speaking' && resource && (
                            <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-3 mt-2">
                              <p className="text-xs font-medium text-green-600 dark:text-green-400 mb-2">🎤 Today's Speaking Exercise:</p>
                              <div className="space-y-2">
                                <p className="font-medium text-sm">{resource.title}</p>
                                <p className="text-sm text-muted-foreground">{resource.prompt}</p>
                                {resource.tips && (
                                  <div className="bg-muted/50 rounded p-2 mt-1">
                                    <p className="text-xs text-muted-foreground">💡 Tips: {resource.tips}</p>
                                  </div>
                                )}
                                <Badge variant="outline" className="text-xs">⏱️ {resource.duration}</Badge>
                              </div>
                            </div>
                          )}
                          
                          {/* Topics/Activities */}
                          {(activity.topics || activity.activities) && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {(activity.topics || activity.activities || []).slice(0, 4).map((item, i) => (
                                <Badge key={i} variant="outline" className="text-xs font-normal">
                                  {item}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* Controls */}
                      <div className="flex items-center gap-4 md:flex-col md:items-end">
                        <ActivityTimer
                          activity={key}
                          timeSpent={logActivity.timeSpent}
                          onTimeUpdate={(time) => updateActivity(key, { timeSpent: time })}
                          isActive={isTimerActive}
                          onToggle={() => setActiveTimer(isTimerActive ? null : key)}
                        />
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">Complete</span>
                          <Switch
                            checked={logActivity.completed}
                            onCheckedChange={(checked) => updateActivity(key, { completed: checked })}
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
        
        {/* Complete Day Button */}
        <Card className={allActivitiesCompleted ? 'border-green-500 bg-green-500/5' : 'border-dashed'}>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-center md:text-left">
                <h3 className="font-semibold">
                  {allActivitiesCompleted ? '🎉 All activities completed!' : 'Complete all activities to finish the day'}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {allActivitiesCompleted 
                    ? 'Click the button to advance to the next day'
                    : `${Object.values(dailyLog?.activities || {}).filter(a => a.completed).length}/5 activities done`
                  }
                </p>
              </div>
              <Button
                size="lg"
                onClick={completeDay}
                disabled={!allActivitiesCompleted}
                className={allActivitiesCompleted ? 'bg-green-500 hover:bg-green-600' : ''}
              >
                {allActivitiesCompleted ? (
                  <><Check className="mr-2 h-5 w-5" /> Complete Day {user.currentDay}</>
                ) : (
                  <><Lock className="mr-2 h-5 w-5" /> Locked</>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Discipline Reminder */}
        <Card className="bg-muted/30">
          <CardContent className="pt-6">
            <blockquote className="text-center italic text-muted-foreground">
              "{currentMonthData.activities?.grammar?.instructions || 'Discipline beats talent. Show up every day.'}"
            </blockquote>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

// Main App Component
export default function App() {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const savedToken = Cookies.get('token')
    if (savedToken) {
      fetchUser(savedToken)
    } else {
      setLoading(false)
    }
  }, [])
  
  const fetchUser = async (authToken) => {
    try {
      const res = await fetch('/api/auth/me', {
        headers: { 'Authorization': `Bearer ${authToken}` }
      })
      
      if (res.ok) {
        const data = await res.json()
        setUser(data.user)
        setToken(authToken)
      } else {
        Cookies.remove('token')
      }
    } catch (error) {
      Cookies.remove('token')
    } finally {
      setLoading(false)
    }
  }
  
  const handleAuth = (userData, authToken) => {
    setUser(userData)
    setToken(authToken)
  }
  
  const handleLogout = () => {
    Cookies.remove('token')
    setUser(null)
    setToken(null)
  }
  
  const handleReset = async () => {
    try {
      const res = await fetch('/api/pathway/reset', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      })
      
      if (res.ok) {
        const data = await res.json()
        setUser(data.user)
        toast.success('Pathway reset. Select a new pathway to begin.')
      }
    } catch (error) {
      toast.error('Failed to reset pathway')
    }
  }
  
  const handleOnboardingComplete = (userData) => {
    setUser(userData)
  }
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    )
  }
  
  // Not logged in
  if (!user) {
    return <AuthPage onAuth={handleAuth} />
  }
  
  // Logged in but needs onboarding
  if (!user.onboardingComplete) {
    return (
      <OnboardingPage 
        user={user} 
        token={token} 
        onComplete={handleOnboardingComplete}
      />
    )
  }
  
  // Full dashboard
  return (
    <Dashboard 
      user={user} 
      token={token} 
      onLogout={handleLogout}
      onReset={handleReset}
    />
  )
}