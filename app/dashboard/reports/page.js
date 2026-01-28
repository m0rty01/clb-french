'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Cookies from 'js-cookie'
import { 
  ArrowLeft, 
  BarChart3, 
  BookOpen, 
  Headphones, 
  PenTool, 
  Mic,
  TrendingUp,
  Clock,
  Target,
  Award,
  Lock,
  ChevronRight,
  Calendar,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Crown,
  Sun,
  Moon,
  Loader2
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useTheme } from 'next-themes'
import { toast } from 'sonner'

// Skill configuration
const SKILLS = {
  comprehensionOrale: {
    key: 'comprehensionOrale',
    name: 'Listening',
    nameFr: 'Compréhension Orale',
    icon: Headphones,
    color: 'purple',
    bgColor: 'bg-purple-500',
    textColor: 'text-purple-600',
    lightBg: 'bg-purple-50 dark:bg-purple-950/30'
  },
  comprehensionEcrite: {
    key: 'comprehensionEcrite',
    name: 'Reading',
    nameFr: 'Compréhension Écrite',
    icon: BookOpen,
    color: 'orange',
    bgColor: 'bg-orange-500',
    textColor: 'text-orange-600',
    lightBg: 'bg-orange-50 dark:bg-orange-950/30'
  },
  expressionEcrite: {
    key: 'expressionEcrite',
    name: 'Writing',
    nameFr: 'Expression Écrite',
    icon: PenTool,
    color: 'pink',
    bgColor: 'bg-pink-500',
    textColor: 'text-pink-600',
    lightBg: 'bg-pink-50 dark:bg-pink-950/30'
  },
  expressionOrale: {
    key: 'expressionOrale',
    name: 'Speaking',
    nameFr: 'Expression Orale',
    icon: Mic,
    color: 'green',
    bgColor: 'bg-green-500',
    textColor: 'text-green-600',
    lightBg: 'bg-green-50 dark:bg-green-950/30'
  }
}

// Simple Line Chart Component
function SimpleLineChart({ data, color }) {
  if (!data || data.length === 0) {
    return (
      <div className="h-48 flex items-center justify-center text-muted-foreground">
        No data yet. Complete some tests to see your progress!
      </div>
    )
  }
  
  const maxValue = Math.max(...data.map(d => d.percentage), 100)
  const minValue = Math.min(...data.map(d => d.percentage), 0)
  const range = maxValue - minValue || 100
  
  const points = data.map((d, i) => {
    const x = (i / (data.length - 1 || 1)) * 100
    const y = 100 - ((d.percentage - minValue) / range) * 80 - 10
    return `${x},${y}`
  }).join(' ')
  
  return (
    <div className="h-48 relative">
      {/* Y-axis labels */}
      <div className="absolute left-0 top-0 bottom-0 w-8 flex flex-col justify-between text-xs text-muted-foreground py-2">
        <span>100%</span>
        <span>50%</span>
        <span>0%</span>
      </div>
      
      {/* Chart area */}
      <div className="ml-10 h-full relative">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Grid lines */}
          <line x1="0" y1="10" x2="100" y2="10" stroke="currentColor" strokeOpacity="0.1" />
          <line x1="0" y1="50" x2="100" y2="50" stroke="currentColor" strokeOpacity="0.1" />
          <line x1="0" y1="90" x2="100" y2="90" stroke="currentColor" strokeOpacity="0.1" />
          
          {/* Area under line */}
          <polygon 
            points={`0,90 ${points} 100,90`}
            fill={`url(#gradient-${color})`}
            opacity="0.3"
          />
          
          {/* Line */}
          <polyline 
            points={points}
            fill="none"
            stroke={color === 'purple' ? '#9333ea' : color === 'orange' ? '#f97316' : color === 'pink' ? '#ec4899' : '#22c55e'}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* Points */}
          {data.map((d, i) => {
            const x = (i / (data.length - 1 || 1)) * 100
            const y = 100 - ((d.percentage - minValue) / range) * 80 - 10
            return (
              <circle 
                key={i}
                cx={x} 
                cy={y} 
                r="2"
                fill={color === 'purple' ? '#9333ea' : color === 'orange' ? '#f97316' : color === 'pink' ? '#ec4899' : '#22c55e'}
              />
            )
          })}
          
          {/* Gradient definition */}
          <defs>
            <linearGradient id={`gradient-${color}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color === 'purple' ? '#9333ea' : color === 'orange' ? '#f97316' : color === 'pink' ? '#ec4899' : '#22c55e'} />
              <stop offset="100%" stopColor={color === 'purple' ? '#9333ea' : color === 'orange' ? '#f97316' : color === 'pink' ? '#ec4899' : '#22c55e'} stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
        
        {/* X-axis labels */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-muted-foreground -mb-5">
          {data.length > 0 && (
            <>
              <span>{new Date(data[0].date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
              {data.length > 1 && (
                <span>{new Date(data[data.length - 1].date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

// Grade Badge Component
function GradeBadge({ grade, size = 'default' }) {
  const colors = {
    'A': 'bg-green-100 text-green-700 border-green-200',
    'B': 'bg-blue-100 text-blue-700 border-blue-200',
    'C': 'bg-yellow-100 text-yellow-700 border-yellow-200',
    'D': 'bg-orange-100 text-orange-700 border-orange-200',
    'F': 'bg-red-100 text-red-700 border-red-200'
  }
  
  const sizeClasses = size === 'large' ? 'text-2xl px-4 py-2' : 'text-sm px-2 py-1'
  
  return (
    <span className={`font-bold rounded-lg border ${colors[grade] || colors['F']} ${sizeClasses}`}>
      {grade}
    </span>
  )
}

// Locked Overlay Component
function LockedOverlay({ message, onUpgrade }) {
  return (
    <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center z-10 rounded-lg">
      <Lock className="h-12 w-12 text-muted-foreground mb-4" />
      <p className="text-muted-foreground text-center mb-4 px-4">{message}</p>
      <Button onClick={onUpgrade} className="bg-purple-600 hover:bg-purple-700">
        <Crown className="h-4 w-4 mr-2" />
        Unlock Reports
      </Button>
    </div>
  )
}

// Main Reports Page Component
export default function ReportsPage() {
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [analytics, setAnalytics] = useState(null)
  const [history, setHistory] = useState([])
  const [activeSkill, setActiveSkill] = useState('comprehensionOrale')
  const [upgradeRequired, setUpgradeRequired] = useState(false)
  
  useEffect(() => {
    const token = Cookies.get('token')
    if (!token) {
      router.push('/dashboard')
      return
    }
    
    fetchUserAndAnalytics(token)
  }, [router])
  
  const fetchUserAndAnalytics = async (token) => {
    try {
      // Fetch user
      const userRes = await fetch('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      })
      
      if (!userRes.ok) {
        Cookies.remove('token')
        router.push('/dashboard')
        return
      }
      
      const userData = await userRes.json()
      setUser(userData)
      
      // Fetch analytics
      const analyticsRes = await fetch('/api/tests/analytics', {
        headers: { Authorization: `Bearer ${token}` }
      })
      
      if (analyticsRes.status === 403) {
        setUpgradeRequired(true)
        setLoading(false)
        return
      }
      
      if (analyticsRes.ok) {
        const analyticsData = await analyticsRes.json()
        setAnalytics(analyticsData)
      }
      
      // Fetch history
      const historyRes = await fetch('/api/tests/history', {
        headers: { Authorization: `Bearer ${token}` }
      })
      
      if (historyRes.ok) {
        const historyData = await historyRes.json()
        setHistory(historyData.results || [])
      }
      
    } catch (error) {
      console.error('Error fetching data:', error)
      toast.error('Failed to load reports')
    } finally {
      setLoading(false)
    }
  }
  
  const handleUpgrade = () => {
    router.push('/dashboard?upgrade=true')
  }
  
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }
  
  const formatTime = (seconds) => {
    if (!seconds) return 'N/A'
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}m ${secs}s`
  }
  
  const isAdmin = user?.email === 'ravijha97.01@gmail.com'
  const tier = isAdmin ? 'admin' : user?.subscriptionTier || 'free'
  
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
      </div>
    )
  }
  
  // Locked state for free users
  if (upgradeRequired || tier === 'free') {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b sticky top-0 bg-background/95 backdrop-blur z-50">
          <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
            <Link href="/dashboard" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Dashboard</span>
            </Link>
            <div className="flex items-center gap-4">
              <h1 className="font-bold text-lg">Test Reports</h1>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              >
                <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              </Button>
            </div>
          </div>
        </header>
        
        <main className="max-w-6xl mx-auto px-4 py-8">
          <Card className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5" />
            <CardContent className="p-12 text-center relative">
              <Lock className="h-16 w-16 mx-auto text-muted-foreground mb-6" />
              <h2 className="text-2xl font-bold mb-4">Unlock Test Reports</h2>
              <p className="text-muted-foreground max-w-md mx-auto mb-8">
                Track your progress across all four skills, identify weak areas, and see detailed analytics 
                with our premium reports feature.
              </p>
              
              <div className="grid md:grid-cols-3 gap-4 mb-8 max-w-2xl mx-auto">
                <div className="p-4 rounded-lg bg-muted/50">
                  <BarChart3 className="h-8 w-8 mx-auto mb-2 text-purple-500" />
                  <p className="font-medium">Progress Charts</p>
                  <p className="text-sm text-muted-foreground">Track improvement over time</p>
                </div>
                <div className="p-4 rounded-lg bg-muted/50">
                  <Target className="h-8 w-8 mx-auto mb-2 text-orange-500" />
                  <p className="font-medium">Weak Areas</p>
                  <p className="text-sm text-muted-foreground">Identify topics to improve</p>
                </div>
                <div className="p-4 rounded-lg bg-muted/50">
                  <Award className="h-8 w-8 mx-auto mb-2 text-green-500" />
                  <p className="font-medium">Performance Metrics</p>
                  <p className="text-sm text-muted-foreground">Detailed score breakdowns</p>
                </div>
              </div>
              
              <Button size="lg" onClick={handleUpgrade} className="bg-purple-600 hover:bg-purple-700">
                <Crown className="h-5 w-5 mr-2" />
                Upgrade to Basic or Premium
              </Button>
            </CardContent>
          </Card>
        </main>
      </div>
    )
  }
  
  const currentSkill = SKILLS[activeSkill]
  const skillData = analytics?.bySkill?.[activeSkill] || { count: 0, avgPercentage: 0 }
  const skillProgress = analytics?.recentProgress?.[activeSkill] || []
  const skillHistory = history.filter(h => h.testType === activeSkill)
  
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b sticky top-0 bg-background/95 backdrop-blur z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Dashboard</span>
          </Link>
          <div className="flex items-center gap-4">
            <h1 className="font-bold text-lg">Test Reports</h1>
            <Badge className={tier === 'premium' || tier === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}>
              {tier === 'admin' ? (
                <>
                  <Crown className="h-3 w-3 mr-1" />
                  Admin
                </>
              ) : (
                tier.charAt(0).toUpperCase() + tier.slice(1)
              )}
            </Badge>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>
          </div>
        </div>
      </header>
      
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Overview Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                  <BarChart3 className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Tests</p>
                  <p className="text-2xl font-bold">{analytics?.totalTests || 0}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Avg Score</p>
                  <p className="text-2xl font-bold">
                    {analytics?.totalTests > 0 
                      ? Math.round(Object.values(analytics?.bySkill || {}).reduce((acc, s) => acc + s.avgPercentage, 0) / 4)
                      : 0}%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                  <Target className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Weak Areas</p>
                  <p className="text-2xl font-bold">{analytics?.weakAreas?.length || 0}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Last Test</p>
                  <p className="text-sm font-medium">
                    {analytics?.lastTestDate 
                      ? formatDate(analytics.lastTestDate)
                      : 'No tests yet'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Skill Tabs */}
        <Tabs value={activeSkill} onValueChange={setActiveSkill} className="mb-8">
          <TabsList className="grid grid-cols-4 mb-6">
            {Object.values(SKILLS).map((skill) => {
              const Icon = skill.icon
              return (
                <TabsTrigger key={skill.key} value={skill.key} className="flex items-center gap-2">
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{skill.name}</span>
                </TabsTrigger>
              )
            })}
          </TabsList>
          
          {Object.values(SKILLS).map((skill) => (
            <TabsContent key={skill.key} value={skill.key}>
              <div className="grid md:grid-cols-3 gap-6">
                {/* Progress Chart */}
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <skill.icon className={`h-5 w-5 ${skill.textColor}`} />
                      {skill.nameFr} Progress
                    </CardTitle>
                    <CardDescription>Your performance over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <SimpleLineChart 
                      data={analytics?.recentProgress?.[skill.key] || []} 
                      color={skill.color}
                    />
                  </CardContent>
                </Card>
                
                {/* Skill Stats */}
                <Card>
                  <CardHeader>
                    <CardTitle>Statistics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Tests Taken</span>
                      <span className="font-bold text-lg">{analytics?.bySkill?.[skill.key]?.count || 0}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Avg Score</span>
                      <span className="font-bold text-lg">{analytics?.bySkill?.[skill.key]?.avgPercentage || 0}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Grade</span>
                      <GradeBadge grade={
                        (analytics?.bySkill?.[skill.key]?.avgPercentage || 0) >= 90 ? 'A' :
                        (analytics?.bySkill?.[skill.key]?.avgPercentage || 0) >= 80 ? 'B' :
                        (analytics?.bySkill?.[skill.key]?.avgPercentage || 0) >= 70 ? 'C' :
                        (analytics?.bySkill?.[skill.key]?.avgPercentage || 0) >= 60 ? 'D' : 'F'
                      } />
                    </div>
                    
                    {(analytics?.bySkill?.[skill.key]?.count || 0) === 0 && (
                      <div className="pt-4 border-t">
                        <p className="text-sm text-muted-foreground text-center">
                          Complete a {skill.name.toLowerCase()} test to see your stats!
                        </p>
                        <Button 
                          variant="outline" 
                          className="w-full mt-2"
                          onClick={() => router.push('/tests')}
                        >
                          Take a Test
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          ))}
        </Tabs>
        
        {/* Recent Tests & Weak Areas */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Recent Tests */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Recent Tests
              </CardTitle>
              <CardDescription>
                {tier === 'basic' ? 'Last 10 tests' : 'Your test history'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {history.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-30" />
                  <p>No tests completed yet</p>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => router.push('/tests')}
                  >
                    Take Your First Test
                  </Button>
                </div>
              ) : (
                <div className="space-y-3 max-h-80 overflow-y-auto">
                  {history.slice(0, 10).map((test) => {
                    const skill = SKILLS[test.testType]
                    const Icon = skill?.icon || BookOpen
                    return (
                      <div 
                        key={test.id}
                        className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                      >
                        <div className={`w-10 h-10 rounded-full ${skill?.lightBg || 'bg-gray-100'} flex items-center justify-center`}>
                          <Icon className={`h-5 w-5 ${skill?.textColor || 'text-gray-600'}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{test.examTitle}</p>
                          <p className="text-sm text-muted-foreground">{formatDate(test.completedAt)}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">{test.percentage}%</p>
                          <GradeBadge grade={test.grade} />
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Weak Areas */}
          <Card className="relative">
            {tier === 'basic' && (
              <LockedOverlay 
                message="Upgrade to Premium to see detailed weak areas analysis"
                onUpgrade={handleUpgrade}
              />
            )}
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-500" />
                Weak Areas
              </CardTitle>
              <CardDescription>Topics that need more practice</CardDescription>
            </CardHeader>
            <CardContent>
              {(!analytics?.weakAreas || analytics.weakAreas.length === 0) ? (
                <div className="text-center py-8 text-muted-foreground">
                  <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-500 opacity-50" />
                  <p>No weak areas identified yet</p>
                  <p className="text-sm">Complete more tests to identify areas for improvement</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {analytics.weakAreas.slice(0, 5).map((area, index) => {
                    const skill = SKILLS[area.skill]
                    return (
                      <div 
                        key={index}
                        className="flex items-center gap-3 p-3 rounded-lg bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800"
                      >
                        <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900/50 flex items-center justify-center">
                          <XCircle className="h-4 w-4 text-orange-600" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium capitalize">{area.type.replace(/_/g, ' ')}</p>
                          <p className="text-sm text-muted-foreground">
                            {skill?.name || 'General'} • {area.count} incorrect
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
