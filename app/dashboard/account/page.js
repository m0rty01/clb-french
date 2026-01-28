'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Cookies from 'js-cookie'
import { 
  ArrowLeft,
  Crown,
  FileText,
  Moon,
  Bell,
  Shield,
  ClipboardList,
  LogOut,
  ChevronRight,
  Loader2
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { useTheme } from 'next-themes'
import { toast } from 'sonner'

// Tier info for display
const tierInfo = {
  free: { 
    name: 'Free', 
    color: 'bg-gray-100 text-gray-700',
    description: 'Basic access with limited features'
  },
  basic: { 
    name: 'Basic', 
    color: 'bg-blue-100 text-blue-700',
    description: 'Full access to practice tests'
  },
  premium: { 
    name: 'Premium', 
    color: 'bg-purple-100 text-purple-700',
    description: 'All features including AI evaluation'
  },
  admin: { 
    name: 'Admin', 
    color: 'bg-red-100 text-red-700',
    description: 'Full administrative access'
  }
}

// Avatar component with initials
function UserAvatar({ name, email, size = 'large' }) {
  const initials = name 
    ? name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : email?.slice(0, 2).toUpperCase() || 'U'
  
  const sizeClasses = size === 'large' 
    ? 'w-20 h-20 text-2xl' 
    : 'w-12 h-12 text-lg'
  
  return (
    <div className={`${sizeClasses} rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold`}>
      {initials}
    </div>
  )
}

// Menu Item component
function MenuItem({ icon: Icon, label, value, onClick, showArrow = true, variant = 'default', badge, children }) {
  const content = (
    <div 
      className={`flex items-center justify-between p-4 hover:bg-muted/50 transition-colors cursor-pointer rounded-lg ${
        variant === 'danger' ? 'text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20' : ''
      }`}
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
          variant === 'danger' ? 'bg-red-100 dark:bg-red-900/30' : 'bg-muted'
        }`}>
          <Icon className={`h-5 w-5 ${variant === 'danger' ? 'text-red-600' : ''}`} />
        </div>
        <span className="font-medium">{label}</span>
      </div>
      <div className="flex items-center gap-2">
        {badge && (
          <Badge variant="secondary" className="text-xs">
            {badge}
          </Badge>
        )}
        {value && (
          <span className="text-sm text-muted-foreground">{value}</span>
        )}
        {children}
        {showArrow && !children && (
          <ChevronRight className="h-5 w-5 text-muted-foreground" />
        )}
      </div>
    </div>
  )
  
  return content
}

export default function AccountPage() {
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [currentLanguage, setCurrentLanguage] = useState('en')
  const [languageDialogOpen, setLanguageDialogOpen] = useState(false)
  
  useEffect(() => {
    const token = Cookies.get('token')
    if (!token) {
      router.push('/dashboard')
      return
    }
    
    // Load saved language preference
    const savedLanguage = localStorage.getItem('preferredLanguage') || 'en'
    setCurrentLanguage(savedLanguage)
    
    fetchUser(token)
  }, [router])
  
  const fetchUser = async (token) => {
    try {
      const response = await fetch('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      })
      
      if (!response.ok) {
        Cookies.remove('token')
        router.push('/dashboard')
        return
      }
      
      const data = await response.json()
      setUser(data.user)
    } catch (error) {
      console.error('Error fetching user:', error)
      toast.error('Failed to load account')
    } finally {
      setLoading(false)
    }
  }
  
  const handleLogout = () => {
    Cookies.remove('token')
    toast.success('Logged out successfully')
    router.push('/dashboard')
  }
  
  const handleUpgrade = () => {
    router.push('/dashboard?upgrade=true')
  }
  
  const handleLanguageChange = (langCode) => {
    setCurrentLanguage(langCode)
    localStorage.setItem('preferredLanguage', langCode)
    setLanguageDialogOpen(false)
    const langName = LANGUAGES.find(l => l.code === langCode)?.name || langCode
    toast.success(`Language changed to ${langName}`)
  }
  
  const isAdmin = user?.email === 'ravijha97.01@gmail.com'
  const tier = isAdmin ? 'admin' : user?.subscriptionTier || 'free'
  const tierData = tierInfo[tier]
  const currentLangData = LANGUAGES.find(l => l.code === currentLanguage) || LANGUAGES[0]
  
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
      </div>
    )
  }
  
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b sticky top-0 bg-background/95 backdrop-blur z-50">
        <div className="max-w-2xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="font-bold text-lg">Account</h1>
          <div className="w-5" /> {/* Spacer for centering */}
        </div>
      </header>
      
      <main className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Profile Section */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center">
              <UserAvatar name={user?.name} email={user?.email} size="large" />
              <h2 className="mt-4 text-xl font-bold">{user?.name || 'User'}</h2>
              <p className="text-muted-foreground">{user?.email}</p>
              <div className="mt-3 flex items-center gap-2">
                <Badge className={tierData?.color}>
                  {tier === 'admin' && <Crown className="h-3 w-3 mr-1" />}
                  {tierData?.name}
                </Badge>
              </div>
            </div>
            
            {/* Stats */}
            <div className="mt-6 grid grid-cols-3 gap-4 pt-4 border-t">
              <div className="text-center">
                <p className="text-2xl font-bold">{user?.currentDay || 1}</p>
                <p className="text-xs text-muted-foreground">Day</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">{user?.streak || 0}</p>
                <p className="text-xs text-muted-foreground">Streak</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">{user?.totalTestsTaken || 0}</p>
                <p className="text-xs text-muted-foreground">Tests</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Account Settings */}
        <div className="space-y-1">
          <h3 className="text-sm font-medium text-muted-foreground px-2 mb-2">ACCOUNT SETTINGS</h3>
          <Card>
            <CardContent className="p-0">
              {/* Subscription */}
              <MenuItem 
                icon={Crown}
                label="Subscription"
                onClick={handleUpgrade}
              >
                <Badge className={tierData?.color + ' mr-2'}>
                  {tierData?.name}
                </Badge>
                {tier === 'free' && (
                  <Button size="sm" variant="outline" className="bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100">
                    Upgrade
                  </Button>
                )}
              </MenuItem>
              
              <Separator />
              
              {/* Pathway/Exam Type */}
              <MenuItem 
                icon={FileText}
                label="Exam Type"
                badge={user?.pathway === 'clb7' ? 'CLB 7' : 'CLB 5'}
                onClick={() => toast.info('Exam type can be changed in pathway settings')}
              />
            </CardContent>
          </Card>
        </div>
        
        {/* Preferences */}
        <div className="space-y-1">
          <h3 className="text-sm font-medium text-muted-foreground px-2 mb-2">PREFERENCES</h3>
          <Card>
            <CardContent className="p-0">
              {/* Dark Mode */}
              <MenuItem 
                icon={Moon}
                label="Dark Mode"
                showArrow={false}
                onClick={() => {}}
              >
                <Switch
                  checked={theme === 'dark'}
                  onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
                />
              </MenuItem>
              
              <Separator />
              
              {/* Notifications */}
              <MenuItem 
                icon={Bell}
                label="Notifications"
                showArrow={false}
                onClick={() => {}}
              >
                <Switch
                  checked={notificationsEnabled}
                  onCheckedChange={(checked) => {
                    setNotificationsEnabled(checked)
                    toast.success(checked ? 'Notifications enabled' : 'Notifications disabled')
                  }}
                />
              </MenuItem>
            </CardContent>
          </Card>
        </div>
        
        {/* Legal */}
        <div className="space-y-1">
          <h3 className="text-sm font-medium text-muted-foreground px-2 mb-2">LEGAL</h3>
          <Card>
            <CardContent className="p-0">
              {/* Privacy Policy */}
              <Link href="/privacy">
                <MenuItem 
                  icon={Shield}
                  label="Privacy Policy"
                  onClick={() => {}}
                />
              </Link>
              
              <Separator />
              
              {/* Terms & Conditions */}
              <Link href="/terms">
                <MenuItem 
                  icon={ClipboardList}
                  label="Terms & Conditions"
                  onClick={() => {}}
                />
              </Link>
              
              <Separator />
              
              {/* Log Out */}
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <div>
                    <MenuItem 
                      icon={LogOut}
                      label="Log Out"
                      showArrow={false}
                      variant="danger"
                      onClick={() => {}}
                    />
                  </div>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Log Out?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to log out of your account? You'll need to sign in again to access your progress.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleLogout} className="bg-red-600 hover:bg-red-700">
                      Log Out
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardContent>
          </Card>
        </div>
        
        {/* App Info */}
        <div className="text-center py-4 text-sm text-muted-foreground">
          <p>CLB French Trainer</p>
          <p className="text-xs">Version 1.0.0</p>
        </div>
      </main>
    </div>
  )
}
