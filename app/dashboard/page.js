'use client'

import { useState, useEffect, Suspense, useCallback } from 'react'
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
  AlertTriangle, Lock, Unlock, ExternalLink, TrendingUp,
  ClipboardList, Brain, CheckCircle2, XCircle, RefreshCw,
  ChevronDown, ChevronUp, Lightbulb, BookMarked, Crown, Sparkles, Shield, Eye, X, BarChart3, User
} from 'lucide-react'
import Cookies from 'js-cookie'
import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'
import { getPathway, getCurrentMonthData, getDailyActivities, calculateProgress, getWeekNumber, getDayOfWeek } from '@/lib/pathways'
import { getDailyResources, getProgressDescription } from '@/lib/daily-resources'

// Subscription tier display info
const tierInfo = {
  free: { name: 'Free', color: 'bg-gray-500', badge: 'bg-gray-100 text-gray-700' },
  basic: { name: 'Basic', color: 'bg-blue-500', badge: 'bg-blue-100 text-blue-700' },
  premium: { name: 'Premium', color: 'bg-purple-500', badge: 'bg-purple-100 text-purple-700' },
  admin: { name: 'Admin', color: 'bg-red-500', badge: 'bg-red-100 text-red-700' }
}

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

// Subscription Banner Component
function SubscriptionBanner({ user, onUpgrade }) {
  const tier = user?.subscriptionTier || 'free'
  const tierLimits = user?.tierLimits || { maxDays: 7 }
  const currentDay = user?.currentDay || 0
  const daysRemaining = Math.max(0, tierLimits.maxDays - currentDay)
  const isLimitReached = currentDay >= tierLimits.maxDays
  
  if (tier === 'admin' || tier === 'premium') {
    return null // Don't show banner for premium/admin
  }
  
  return (
    <Card className={`mb-6 border-2 ${isLimitReached ? 'border-red-500/50 bg-red-500/5' : 'border-yellow-500/50 bg-yellow-500/5'}`}>
      <CardContent className="pt-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            {isLimitReached ? (
              <Lock className="h-6 w-6 text-red-500" />
            ) : (
              <AlertTriangle className="h-6 w-6 text-yellow-500" />
            )}
            <div>
              <p className="font-semibold">
                {isLimitReached 
                  ? `You've reached the ${tierLimits.maxDays}-day limit for the ${tier} plan`
                  : `${tier.charAt(0).toUpperCase() + tier.slice(1)} Plan: ${daysRemaining} days remaining`
                }
              </p>
              <p className="text-sm text-muted-foreground">
                {tier === 'free' 
                  ? 'Upgrade to Basic for full CLB 5 pathway, or Premium for both pathways + all 80 mock exams'
                  : 'Upgrade to Premium for CLB 7 pathway + all 80 mock exams'
                }
              </p>
            </div>
          </div>
          <Button onClick={onUpgrade} className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
            <Crown className="mr-2 h-4 w-4" />
            Upgrade Now
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

// Sample Answer Button Component
function SampleAnswerButton({ sampleAnswer, title }) {
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <>
      <Button 
        variant="outline" 
        size="sm" 
        onClick={() => setIsOpen(true)}
        className="text-xs h-6 bg-green-500/10 border-green-500/30 text-green-700 dark:text-green-400 hover:bg-green-500/20"
      >
        <Eye className="h-3 w-3 mr-1" />
        Sample Answer
      </Button>
      
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setIsOpen(false)}>
          <div className="bg-background rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="p-4 border-b bg-gradient-to-r from-green-500/10 to-emerald-500/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Sample Answer</h3>
                    <p className="text-xs text-muted-foreground">{title}</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="p-4 overflow-y-auto max-h-[60vh]">
              <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-4">
                <p className="whitespace-pre-wrap text-sm leading-relaxed">{sampleAnswer}</p>
              </div>
              <div className="mt-4 p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                <p className="text-xs text-amber-700 dark:text-amber-400 flex items-start gap-2">
                  <Lightbulb className="h-4 w-4 flex-shrink-0 mt-0.5" />
                  <span>This is a model answer. Study the structure, vocabulary, and grammar used. Then try writing your own version!</span>
                </p>
              </div>
            </div>
            <div className="p-4 border-t bg-muted/30">
              <Button onClick={() => setIsOpen(false)} className="w-full">
                Got it, let me try!
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

// Upgrade Modal Component
function UpgradeModal({ isOpen, onClose, token, onUpgradeSuccess }) {
  const [upgrading, setUpgrading] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [billingCycle, setBillingCycle] = useState('monthly') // 'monthly' or 'yearly'
  
  const handleStripeCheckout = async (priceKey) => {
    setUpgrading(true)
    setSelectedPlan(priceKey)
    
    try {
      const res = await fetch('/api/stripe/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ priceKey })
      })
      
      const data = await res.json()
      
      if (res.ok && data.url) {
        // Redirect to Stripe Checkout
        window.location.href = data.url
      } else {
        throw new Error(data.error || 'Failed to create checkout session')
      }
    } catch (error) {
      toast.error(error.message)
      setUpgrading(false)
      setSelectedPlan(null)
    }
  }
  
  if (!isOpen) return null
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <Card className="w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Crown className="h-6 w-6 text-yellow-500" />
            Upgrade Your Plan
          </CardTitle>
          <CardDescription>
            Unlock more content and accelerate your French learning journey
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Billing Cycle Toggle */}
          <div className="flex items-center justify-center gap-4 p-4 bg-muted/50 rounded-lg">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                billingCycle === 'monthly' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'hover:bg-muted'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                billingCycle === 'yearly' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'hover:bg-muted'
              }`}
            >
              Yearly
              <Badge className="ml-2 bg-green-100 text-green-700">Save 17%</Badge>
            </button>
          </div>

          {/* Basic Plan */}
          <div className="p-4 border rounded-lg hover:border-blue-500 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-bold text-lg">Basic Plan</h3>
                {billingCycle === 'monthly' ? (
                  <p className="text-2xl font-bold">$19<span className="text-sm font-normal text-muted-foreground">/month</span></p>
                ) : (
                  <div>
                    <p className="text-2xl font-bold">$190<span className="text-sm font-normal text-muted-foreground">/year</span></p>
                    <p className="text-sm text-green-600">Save $38/year</p>
                  </div>
                )}
              </div>
              <Badge className="bg-blue-100 text-blue-700">Popular</Badge>
            </div>
            <ul className="space-y-2 mb-4 text-sm">
              <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500" />Full CLB 5 pathway (112 days)</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500" />All grammar lessons</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500" />10 mock exams per skill (40 total)</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500" />Weak topic tracking</li>
            </ul>
            <Button 
              className="w-full" 
              variant="outline"
              onClick={() => handleStripeCheckout(billingCycle === 'monthly' ? 'basic_monthly' : 'basic_yearly')}
              disabled={upgrading}
            >
              {upgrading && selectedPlan?.includes('basic') ? (
                <>
                  <span className="animate-spin mr-2">⏳</span>
                  Redirecting to checkout...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Upgrade to Basic
                </>
              )}
            </Button>
          </div>
          
          {/* Premium Plan */}
          <div className="p-4 border-2 border-purple-500 rounded-lg bg-purple-500/5">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-bold text-lg">Premium Plan</h3>
                {billingCycle === 'monthly' ? (
                  <p className="text-2xl font-bold">$39<span className="text-sm font-normal text-muted-foreground">/month</span></p>
                ) : (
                  <div>
                    <p className="text-2xl font-bold">$390<span className="text-sm font-normal text-muted-foreground">/year</span></p>
                    <p className="text-sm text-green-600">Save $78/year</p>
                  </div>
                )}
              </div>
              <Badge className="bg-purple-100 text-purple-700">Best Value</Badge>
            </div>
            <ul className="space-y-2 mb-4 text-sm">
              <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500" />Both CLB 5 & CLB 7 pathways</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500" />All grammar lessons + bonus content</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500" />All 80 mock exams (20 per skill)</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500" />Priority support</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500" />Certificate of completion</li>
            </ul>
            <Button 
              className="w-full bg-purple-600 hover:bg-purple-700" 
              onClick={() => handleStripeCheckout(billingCycle === 'monthly' ? 'premium_monthly' : 'premium_yearly')}
              disabled={upgrading}
            >
              {upgrading && selectedPlan?.includes('premium') ? (
                <>
                  <span className="animate-spin mr-2">⏳</span>
                  Redirecting to checkout...
                </>
              ) : (
                <>
                  <Crown className="mr-2 h-4 w-4" />
                  Upgrade to Premium
                </>
              )}
            </Button>
          </div>
          
          <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Shield className="h-3 w-3" />
              Secure payment via Stripe
            </span>
            <span>•</span>
            <span>Cancel anytime</span>
          </div>
          
          <Button variant="ghost" className="w-full" onClick={onClose}>
            Maybe Later
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

// Auth Component
function AuthPage({ onAuth }) {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
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

  const handleGoogleLogin = () => {
    setGoogleLoading(true)
    // Redirect to Google OAuth - this will redirect the user to Google's login page
    // After authentication, Google will redirect back to /api/auth/google/callback
    window.location.href = '/api/auth/google'
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
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 via-white to-red-500 flex items-center justify-center">
            <span className="text-2xl font-bold text-blue-900">🇫🇷</span>
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
          {/* Google Login Button */}
          <Button
            type="button"
            variant="outline"
            className="w-full mb-4 h-11"
            onClick={handleGoogleLogin}
            disabled={googleLoading}
          >
            {googleLoading ? (
              'Connecting...'
            ) : (
              <>
                <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Continue with Google
              </>
            )}
          </Button>

          {/* Divider */}
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with email
              </span>
            </div>
          </div>

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
            {/* CLB 5 - Available to all */}
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
            
            {/* CLB 7 - Premium only for non-admin */}
            <button
              type="button"
              onClick={() => {
                const tier = user?.subscriptionTier || 'free'
                const isAdminUser = user?.email?.toLowerCase() === 'ravijha97.01@gmail.com'
                if (tier === 'premium' || isAdminUser) {
                  setPathway('clb7')
                } else {
                  toast.error('CLB 7 pathway requires Premium subscription')
                }
              }}
              className={`p-6 rounded-lg border-2 text-left transition-all relative ${
                pathway === 'clb7'
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
              } ${user?.subscriptionTier !== 'premium' && user?.email?.toLowerCase() !== 'ravijha97.01@gmail.com' ? 'opacity-75' : ''}`}
            >
              {user?.subscriptionTier !== 'premium' && user?.email?.toLowerCase() !== 'ravijha97.01@gmail.com' && (
                <div className="absolute top-2 right-2">
                  <Badge className="bg-purple-100 text-purple-700">
                    <Lock className="h-3 w-3 mr-1" />
                    Premium
                  </Badge>
                </div>
              )}
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

// Timer Component - Countdown with Alert Sound
function ActivityTimer({ activity, timeSpent, allocatedTime, onTimeUpdate, isActive, onToggle, onComplete }) {
  const [timeRemaining, setTimeRemaining] = useState(() => {
    // Calculate remaining time: allocated time minus time already spent
    const remaining = (allocatedTime || 60) - timeSpent
    return Math.max(0, remaining)
  })
  const [hasAlerted, setHasAlerted] = useState(false)
  
  // Update remaining time when timeSpent or allocatedTime changes
  useEffect(() => {
    const remaining = (allocatedTime || 60) - timeSpent
    setTimeRemaining(Math.max(0, remaining))
  }, [timeSpent, allocatedTime])
  
  // Play alert sound function
  const playAlertSound = useCallback(() => {
    if (hasAlerted) return
    
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext
      const audioContext = new AudioContext()
      
      // Create a sequence of beeps
      const playBeep = (frequency, startTime, duration) => {
        const oscillator = audioContext.createOscillator()
        const gainNode = audioContext.createGain()
        
        oscillator.connect(gainNode)
        gainNode.connect(audioContext.destination)
        
        oscillator.type = 'sine'
        oscillator.frequency.setValueAtTime(frequency, startTime)
        
        gainNode.gain.setValueAtTime(0.4, startTime)
        gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + duration)
        
        oscillator.start(startTime)
        oscillator.stop(startTime + duration)
      }
      
      const now = audioContext.currentTime
      // Play 3 ascending celebration beeps
      playBeep(523, now, 0.15)        // C5
      playBeep(659, now + 0.2, 0.15)  // E5
      playBeep(784, now + 0.4, 0.25)  // G5
      
      setHasAlerted(true)
      toast.success(`${activity} time complete! Great work! 🎉`, { duration: 4000 })
    } catch (error) {
      console.log('Could not play alert sound:', error)
    }
  }, [hasAlerted, activity])
  
  useEffect(() => {
    let interval
    if (isActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            // Timer complete
            playAlertSound()
            onTimeUpdate(allocatedTime || 60) // Mark as fully spent
            if (onComplete) onComplete()
            return 0
          }
          // Update the timeSpent (increment by 1 minute)
          const newTimeSpent = (allocatedTime || 60) - (prev - 1)
          onTimeUpdate(newTimeSpent)
          return prev - 1
        })
      }, 60000) // Update every minute
    }
    return () => clearInterval(interval)
  }, [isActive, timeRemaining, onTimeUpdate, playAlertSound, allocatedTime, onComplete])
  
  // Reset alert when timer is reset
  useEffect(() => {
    if (timeRemaining > 0 && hasAlerted) {
      setHasAlerted(false)
    }
  }, [timeRemaining])
  
  const hours = Math.floor(timeRemaining / 60)
  const minutes = timeRemaining % 60
  const isLowTime = timeRemaining > 0 && timeRemaining <= 10
  const isComplete = timeRemaining === 0
  
  return (
    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all ${
      isComplete ? 'bg-green-500/10 border border-green-500/30' :
      isLowTime ? 'bg-orange-500/10 border border-orange-500/30' :
      isActive ? 'bg-blue-500/10 border border-blue-500/30' : ''
    }`}>
      <Button
        variant="outline"
        size="sm"
        onClick={onToggle}
        className={`${isActive ? 'bg-green-500/10 border-green-500' : ''} ${isComplete ? 'bg-green-500/20' : ''}`}
        disabled={isComplete}
      >
        {isComplete ? (
          <Check className="h-4 w-4 text-green-600" />
        ) : isActive ? (
          <Pause className="h-4 w-4" />
        ) : (
          <Play className="h-4 w-4" />
        )}
      </Button>
      <div className="flex flex-col">
        <span className={`text-sm font-mono min-w-[60px] ${isLowTime ? 'text-orange-600 font-bold' : ''} ${isComplete ? 'text-green-600' : ''}`}>
          {isComplete ? '✓ Done' : hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`}
        </span>
        {!isComplete && (
          <span className="text-[10px] text-muted-foreground">remaining</span>
        )}
      </div>
    </div>
  )
}

// Grammar Quiz Component
function GrammarQuiz({ topic, token, onComplete, onClose }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})
  const [showResults, setShowResults] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [results, setResults] = useState(null)
  const [showExplanation, setShowExplanation] = useState(false)
  
  const questions = topic.quiz || []
  const totalQuestions = questions.length
  const currentQ = questions[currentQuestion]
  
  const handleAnswer = (optionIndex) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion]: optionIndex
    }))
    setShowExplanation(true)
  }
  
  const nextQuestion = () => {
    setShowExplanation(false)
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(prev => prev + 1)
    } else {
      submitQuiz()
    }
  }
  
  const submitQuiz = async () => {
    setSubmitting(true)
    
    // Calculate score
    let correct = 0
    questions.forEach((q, idx) => {
      if (answers[idx] === q.correctAnswer) {
        correct++
      }
    })
    
    try {
      const res = await fetch('/api/grammar/submit-quiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          topicId: topic.id,
          answers,
          score: correct,
          totalQuestions
        })
      })
      
      const data = await res.json()
      
      if (res.ok) {
        setResults(data.result)
        setShowResults(true)
        toast.success(`Quiz completed! Score: ${correct}/${totalQuestions}`)
      } else {
        throw new Error(data.error)
      }
    } catch (error) {
      toast.error('Failed to submit quiz')
    } finally {
      setSubmitting(false)
    }
  }
  
  if (showResults && results) {
    return (
      <Card className="border-2 border-blue-500/30 bg-blue-500/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {results.percentage >= 70 ? (
              <CheckCircle2 className="h-6 w-6 text-green-500" />
            ) : (
              <XCircle className="h-6 w-6 text-orange-500" />
            )}
            Quiz Results
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center py-4">
            <p className="text-4xl font-bold mb-2">
              {results.score}/{results.totalQuestions}
            </p>
            <p className="text-lg text-muted-foreground">
              {results.percentage}% correct
            </p>
          </div>
          
          <div className={`p-4 rounded-lg ${results.percentage >= 70 ? 'bg-green-500/10 border border-green-500/30' : 'bg-orange-500/10 border border-orange-500/30'}`}>
            {results.percentage >= 70 ? (
              <p className="text-sm text-green-600 dark:text-green-400">
                ✅ Great job! You've mastered this topic. Keep up the excellent work!
              </p>
            ) : (
              <p className="text-sm text-orange-600 dark:text-orange-400">
                ⚠️ This topic has been added to your weak areas for review. Don't worry - practice makes perfect!
              </p>
            )}
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Close
            </Button>
            <Button onClick={() => onComplete(results)} className="flex-1">
              Continue
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }
  
  return (
    <Card className="border-2 border-blue-500/30">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Brain className="h-5 w-5 text-blue-500" />
            {topic.title}
          </CardTitle>
          <Badge variant="secondary">
            Question {currentQuestion + 1}/{totalQuestions}
          </Badge>
        </div>
        <Progress value={((currentQuestion + (showExplanation ? 1 : 0)) / totalQuestions) * 100} className="h-2" />
      </CardHeader>
      <CardContent className="space-y-4">
        {currentQ && (
          <>
            <div className="p-4 bg-muted/50 rounded-lg">
              <p className="text-lg font-medium">{currentQ.question}</p>
            </div>
            
            <div className="space-y-2">
              {currentQ.options.map((option, idx) => {
                const isSelected = answers[currentQuestion] === idx
                const isCorrect = idx === currentQ.correctAnswer
                const showCorrectness = showExplanation && isSelected
                
                return (
                  <button
                    key={idx}
                    onClick={() => !showExplanation && handleAnswer(idx)}
                    disabled={showExplanation}
                    className={`w-full p-3 text-left rounded-lg border transition-all ${
                      showExplanation
                        ? isCorrect
                          ? 'bg-green-500/10 border-green-500 text-green-700 dark:text-green-300'
                          : isSelected
                            ? 'bg-red-500/10 border-red-500 text-red-700 dark:text-red-300'
                            : 'bg-muted/30 border-border opacity-50'
                        : isSelected
                          ? 'bg-primary/10 border-primary'
                          : 'bg-background border-border hover:border-primary/50 hover:bg-muted/50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {showExplanation && isCorrect && <CheckCircle2 className="h-4 w-4 text-green-500" />}
                      {showExplanation && isSelected && !isCorrect && <XCircle className="h-4 w-4 text-red-500" />}
                      <span>{option}</span>
                    </div>
                  </button>
                )
              })}
            </div>
            
            {showExplanation && (
              <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                <div className="flex items-start gap-2">
                  <Lightbulb className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-sm text-blue-600 dark:text-blue-400">Explanation:</p>
                    <p className="text-sm text-muted-foreground">{currentQ.explanation}</p>
                  </div>
                </div>
              </div>
            )}
            
            {showExplanation && (
              <Button onClick={nextQuestion} className="w-full" disabled={submitting}>
                {currentQuestion < totalQuestions - 1 ? 'Next Question' : (submitting ? 'Submitting...' : 'See Results')}
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </>
        )}
      </CardContent>
    </Card>
  )
}

// Daily Grammar Section Component
function DailyGrammarSection({ token, onGrammarComplete }) {
  const [loading, setLoading] = useState(true)
  const [grammarData, setGrammarData] = useState(null)
  const [showQuiz, setShowQuiz] = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)
  
  useEffect(() => {
    fetchGrammarTopic()
  }, [])
  
  const fetchGrammarTopic = async () => {
    try {
      const res = await fetch('/api/grammar/daily-topic', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      const data = await res.json()
      if (res.ok) {
        setGrammarData(data)
      }
    } catch (error) {
      console.error('Failed to fetch grammar topic')
    } finally {
      setLoading(false)
    }
  }
  
  const handleQuizComplete = (results) => {
    setShowQuiz(false)
    setGrammarData(prev => ({ ...prev, completed: true, score: results.percentage }))
    if (onGrammarComplete) onGrammarComplete()
  }
  
  if (loading) {
    return (
      <Card className="border-blue-500/30 bg-blue-500/5">
        <CardContent className="pt-6">
          <div className="animate-pulse flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-blue-500/20 rounded w-1/3"></div>
              <div className="h-3 bg-blue-500/20 rounded w-2/3"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }
  
  if (!grammarData?.topic) {
    return (
      <Card className="border-dashed border-blue-500/30">
        <CardContent className="pt-6">
          <div className="flex items-center gap-4 text-muted-foreground">
            <BookOpen className="h-8 w-8" />
            <div>
              <p className="font-medium">No grammar lesson today</p>
              <p className="text-sm">Review your weak topics instead!</p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }
  
  const { topic, completed, score } = grammarData
  
  if (showQuiz) {
    return (
      <GrammarQuiz
        topic={topic}
        token={token}
        onComplete={handleQuizComplete}
        onClose={() => setShowQuiz(false)}
      />
    )
  }
  
  return (
    <Card className={`border-2 transition-all ${completed ? 'border-green-500/30 bg-green-500/5' : 'border-blue-500/30 bg-blue-500/5'}`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-lg ${completed ? 'bg-green-500/20' : 'bg-blue-500/20'}`}>
              <Brain className={`h-6 w-6 ${completed ? 'text-green-500' : 'text-blue-500'}`} />
            </div>
            <div>
              <CardTitle className="text-lg flex items-center gap-2">
                Today's Grammar: {topic.title}
                {completed && <CheckCircle2 className="h-5 w-5 text-green-500" />}
              </CardTitle>
              <CardDescription className="flex items-center gap-2 mt-1">
                <span>{topic.titleEn}</span>
                <span>•</span>
                <Badge className={`${levelColors[topic.level]} border text-xs`}>{topic.level}</Badge>
                <span>•</span>
                <span className="text-xs">{topic.chapter}</span>
              </CardDescription>
            </div>
          </div>
          {completed && score && (
            <Badge variant="secondary" className="text-lg px-3 py-1">
              {score}%
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Collapsible Explanation */}
        <div className="border rounded-lg overflow-hidden">
          <button
            onClick={() => setShowExplanation(!showExplanation)}
            className="w-full p-4 flex items-center justify-between bg-muted/30 hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <BookMarked className="h-4 w-4 text-blue-500" />
              <span className="font-medium text-sm">View Lesson Explanation</span>
            </div>
            {showExplanation ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
          
          {showExplanation && (
            <div className="p-4 bg-background border-t">
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <div className="whitespace-pre-wrap text-sm text-muted-foreground">
                  {topic.explanation}
                </div>
              </div>
              <div className="mt-4 p-3 bg-orange-500/10 border border-orange-500/30 rounded-lg">
                <p className="text-xs text-orange-600 dark:text-orange-400 flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  📖 For detailed exercises, refer to "{topic.chapter}" in "Practice Makes Perfect: Complete French Grammar"
                </p>
              </div>
            </div>
          )}
        </div>
        
        {/* Quiz Button */}
        {!completed ? (
          <Button onClick={() => setShowQuiz(true)} className="w-full bg-blue-500 hover:bg-blue-600">
            <Brain className="mr-2 h-4 w-4" />
            Start Quiz ({topic.quiz?.length || 8} questions)
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setShowQuiz(true)} className="flex-1">
              <RefreshCw className="mr-2 h-4 w-4" />
              Retake Quiz
            </Button>
            <Button variant="secondary" onClick={() => setShowExplanation(true)} className="flex-1">
              <BookOpen className="mr-2 h-4 w-4" />
              Review Lesson
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// Weak Topics Section Component
function WeakTopicsSection({ token }) {
  const [loading, setLoading] = useState(true)
  const [weakTopics, setWeakTopics] = useState([])
  const [selectedTopic, setSelectedTopic] = useState(null)
  const [showQuiz, setShowQuiz] = useState(false)
  const [expanded, setExpanded] = useState(false)
  
  useEffect(() => {
    fetchWeakTopics()
  }, [])
  
  const fetchWeakTopics = async () => {
    try {
      const res = await fetch('/api/grammar/weak-topics', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      const data = await res.json()
      if (res.ok) {
        setWeakTopics(data.weakTopics || [])
      }
    } catch (error) {
      console.error('Failed to fetch weak topics')
    } finally {
      setLoading(false)
    }
  }
  
  const handleQuizComplete = async (results) => {
    setShowQuiz(false)
    setSelectedTopic(null)
    // Refresh weak topics list
    fetchWeakTopics()
  }
  
  const removeFromWeak = async (topicId) => {
    try {
      const res = await fetch('/api/grammar/remove-weak', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ topicId })
      })
      
      if (res.ok) {
        setWeakTopics(prev => prev.filter(t => t.id !== topicId))
        toast.success('Topic removed from weak areas')
      }
    } catch (error) {
      toast.error('Failed to remove topic')
    }
  }
  
  if (loading) {
    return null
  }
  
  if (weakTopics.length === 0) {
    return null
  }
  
  if (showQuiz && selectedTopic) {
    return (
      <GrammarQuiz
        topic={selectedTopic}
        token={token}
        onComplete={handleQuizComplete}
        onClose={() => {
          setShowQuiz(false)
          setSelectedTopic(null)
        }}
      />
    )
  }
  
  return (
    <Card className="border-orange-500/30 bg-orange-500/5">
      <CardHeader>
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center justify-between w-full"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-orange-500/20">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
            </div>
            <div className="text-left">
              <CardTitle className="text-base">Weak Topics for Review</CardTitle>
              <CardDescription>{weakTopics.length} topic(s) need attention</CardDescription>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-orange-500/20 text-orange-600">
              {weakTopics.length}
            </Badge>
            {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </div>
        </button>
      </CardHeader>
      
      {expanded && (
        <CardContent className="pt-0">
          <div className="space-y-2">
            {weakTopics.map(topic => (
              <div
                key={topic.id}
                className="flex items-center justify-between p-3 bg-background rounded-lg border"
              >
                <div className="flex items-center gap-3">
                  <Badge className={`${levelColors[topic.level]} border text-xs`}>{topic.level}</Badge>
                  <div>
                    <p className="font-medium text-sm">{topic.title}</p>
                    <p className="text-xs text-muted-foreground">{topic.titleEn}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => removeFromWeak(topic.id)}
                  >
                    Mark Mastered
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => {
                      setSelectedTopic(topic)
                      setShowQuiz(true)
                    }}
                  >
                    Practice
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            💡 Topics are added here when you score below 70% on quizzes. Practice them anytime to improve!
          </p>
        </CardContent>
      )}
    </Card>
  )
}

// Dashboard Component
function Dashboard({ user, token, onLogout, onReset }) {
  const [dailyLog, setDailyLog] = useState(null)
  const [progress, setProgress] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTimer, setActiveTimer] = useState(null)
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)
  const [currentUser, setCurrentUser] = useState(user)
  const { theme, setTheme } = useTheme()
  
  const pathwayData = getPathway(currentUser.pathway)
  const currentMonthData = getCurrentMonthData(currentUser.pathway, currentUser.currentDay)
  const dailyActivities = getDailyActivities(currentUser.pathway, currentUser.currentDay)
  const dailyResources = getDailyResources(currentUser.currentDay, currentUser.pathway)
  const levelProgress = getProgressDescription(currentUser.currentDay, currentUser.pathway)
  
  // Get tier info
  const tier = currentUser?.subscriptionTier || 'free'
  const tierLimits = currentUser?.tierLimits || { maxDays: 7, mockExamsPerSkill: 2 }
  const isAdmin = currentUser?.email?.toLowerCase() === 'ravijha97.01@gmail.com'
  
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
  
  const handleUpgradeSuccess = (updatedUser) => {
    setCurrentUser(updatedUser)
    toast.success('Subscription upgraded! Enjoy your new features.')
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
  
  // Check if user has reached their day limit
  const hasReachedLimit = !isAdmin && currentUser.currentDay >= tierLimits.maxDays
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen bg-background">
      {/* Upgrade Modal */}
      <UpgradeModal 
        isOpen={showUpgradeModal} 
        onClose={() => setShowUpgradeModal(false)}
        token={token}
        onUpgradeSuccess={handleUpgradeSuccess}
      />
      
      {/* Header */}
      <header className="border-b sticky top-0 bg-background/95 backdrop-blur z-50">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-sm font-bold text-primary-foreground">🇫🇷</span>
            </div>
            <div>
              <h1 className="font-semibold text-sm">CLB French Trainer</h1>
              <p className="text-xs text-muted-foreground">{pathwayData.name} • Day {currentUser.currentDay}</p>
            </div>
            {/* Subscription Badge */}
            <Badge className={tierInfo[tier]?.badge || tierInfo.free.badge}>
              {isAdmin ? (
                <>
                  <Crown className="h-3 w-3 mr-1" />
                  Admin
                </>
              ) : (
                tierInfo[tier]?.name || 'Free'
              )}
            </Badge>
          </div>
          
          <div className="flex items-center gap-2">
            <Link href="/dashboard/account">
              <Button variant="outline" size="sm" className="gap-2">
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">Account</span>
              </Button>
            </Link>
            
            <Link href="/dashboard/reports">
              <Button variant="outline" size="sm" className="gap-2">
                <BarChart3 className="h-4 w-4" />
                <span className="hidden sm:inline">Reports</span>
              </Button>
            </Link>
            
            <Link href="/tests">
              <Button variant="outline" size="sm" className="gap-2">
                <ClipboardList className="h-4 w-4" />
                <span className="hidden sm:inline">Practice Tests</span>
              </Button>
            </Link>
            
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
        {/* Subscription Banner - Shows for free/basic users */}
        {!isAdmin && tier !== 'premium' && (
          <SubscriptionBanner 
            user={currentUser} 
            onUpgrade={() => setShowUpgradeModal(true)} 
          />
        )}
        
        {/* Limit Reached Block */}
        {hasReachedLimit && (
          <Card className="border-2 border-red-500 bg-red-500/5">
            <CardContent className="pt-6 text-center">
              <Lock className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Day Limit Reached</h3>
              <p className="text-muted-foreground mb-4">
                You've completed {tierLimits.maxDays} days on the {tier} plan. 
                Upgrade to continue your French learning journey!
              </p>
              <Button 
                onClick={() => setShowUpgradeModal(true)} 
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                <Crown className="mr-2 h-4 w-4" />
                Upgrade to Continue
              </Button>
            </CardContent>
          </Card>
        )}
        
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
        
        {/* Daily Grammar Section */}
        <div>
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Brain className="h-5 w-5 text-blue-500" />
            Daily Grammar Lesson
          </h2>
          <DailyGrammarSection token={token} onGrammarComplete={fetchData} />
        </div>
        
        {/* Weak Topics Review */}
        <WeakTopicsSection token={token} />
        
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
                                <div className="flex items-center gap-2 flex-wrap">
                                  <Badge variant="outline" className="text-xs">📝 {resource.wordCount}</Badge>
                                  {resource.sampleAnswer && (
                                    <SampleAnswerButton sampleAnswer={resource.sampleAnswer} title={resource.title} />
                                  )}
                                </div>
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
                          allocatedTime={activity.duration}
                          onTimeUpdate={(time) => updateActivity(key, { timeSpent: time })}
                          isActive={isTimerActive}
                          onToggle={() => setActiveTimer(isTimerActive ? null : key)}
                          onComplete={() => updateActivity(key, { completed: true })}
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
function AppContent() {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(true)
  const searchParams = useSearchParams()
  const router = useRouter()
  
  // Handle payment callback and Google OAuth callback
  useEffect(() => {
    const paymentStatus = searchParams.get('payment')
    const tier = searchParams.get('tier')
    const googleAuth = searchParams.get('google_auth')
    const googleToken = searchParams.get('token')
    const authError = searchParams.get('auth_error')
    
    // Handle Google OAuth success
    if (googleAuth === 'success' && googleToken) {
      Cookies.set('token', googleToken, { expires: 30 })
      toast.success('🎉 Signed in with Google successfully!', {
        duration: 4000
      })
      router.replace('/dashboard', { scroll: false })
      fetchUser(googleToken)
      return
    }
    
    // Handle Google OAuth error
    if (authError) {
      const errorMessages = {
        'access_denied': 'Google sign-in was cancelled',
        'no_code': 'Authentication failed - no authorization code received',
        'no_email': 'Could not retrieve email from Google account',
        'callback_failed': 'Authentication callback failed. Please try again.',
      }
      toast.error(errorMessages[authError] || `Google sign-in failed: ${authError}`, {
        duration: 5000
      })
      router.replace('/dashboard', { scroll: false })
      return
    }
    
    // Handle payment success
    if (paymentStatus === 'success' && tier) {
      toast.success(`🎉 Payment successful! You've been upgraded to ${tier.charAt(0).toUpperCase() + tier.slice(1)}!`, {
        duration: 5000,
        description: 'Your new features are now available.'
      })
      // Clear URL params
      router.replace('/dashboard', { scroll: false })
      // Refresh user data to get new tier
      const savedToken = Cookies.get('token')
      if (savedToken) {
        fetchUser(savedToken)
      }
    } else if (paymentStatus === 'cancelled') {
      toast.info('Payment cancelled. You can upgrade anytime!', {
        duration: 4000
      })
      router.replace('/dashboard', { scroll: false })
    }
  }, [searchParams])
  
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

// Loading fallback component
function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="animate-pulse text-muted-foreground">Loading...</div>
    </div>
  )
}

// Export default with Suspense boundary for useSearchParams
export default function App() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <AppContent />
    </Suspense>
  )
}