'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import { 
  Check, 
  X, 
  Crown, 
  Sparkles, 
  Shield, 
  ArrowLeft,
  MessageCircle,
  Zap,
  BarChart3,
  Download,
  TrendingUp,
  Target,
  HeadphonesIcon,
  BookOpen,
  FileText,
  Mic,
  PenTool
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'

export default function PricingPage() {
  const router = useRouter()
  const [billingCycle, setBillingCycle] = useState('monthly')
  const [loading, setLoading] = useState(false)

  const handleUpgrade = async () => {
    const token = Cookies.get('token')
    
    if (!token) {
      toast.error('Please sign in to upgrade')
      router.push('/dashboard')
      return
    }

    setLoading(true)
    
    try {
      const priceKey = billingCycle === 'monthly' ? 'premium_monthly' : 'premium_yearly'
      
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
        window.location.href = data.url
      } else {
        throw new Error(data.error || 'Failed to create checkout session')
      }
    } catch (error) {
      toast.error(error.message)
      setLoading(false)
    }
  }

  const monthlyPrice = 9
  const yearlyPrice = 70
  const yearlyMonthlyEquivalent = (yearlyPrice / 12).toFixed(2)
  const savingsPercent = Math.round((1 - (yearlyPrice / (monthlyPrice * 12))) * 100)

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-5 w-5" />
            <span className="hidden sm:inline">Back to Dashboard</span>
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <span className="text-white text-lg">🇫🇷</span>
            </div>
            <span className="font-bold">CLB French Trainer</span>
          </div>
          <div className="w-20" />
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Pricing Plans
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Start practicing for free, then upgrade to Premium for unlimited access. Cancel anytime.
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex items-center bg-muted p-1.5 rounded-full">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Monthly billing
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                billingCycle === 'yearly'
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Yearly billing
              {billingCycle !== 'yearly' && (
                <Badge className="bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400">
                  Save {savingsPercent}%
                </Badge>
              )}
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-16">
          {/* Free Tier */}
          <Card className="relative overflow-hidden border-2 hover:border-muted-foreground/30 transition-colors">
            <CardContent className="p-8">
              <div className="mb-6">
                <h2 className="text-2xl font-semibold text-muted-foreground mb-2">Free</h2>
                <p className="text-muted-foreground text-sm">Perfect for getting started.</p>
              </div>
              
              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-bold">$0</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </div>

              <Button 
                variant="outline" 
                className="w-full mb-8 h-12"
                onClick={() => router.push('/dashboard')}
              >
                Get Started Free
              </Button>

              <div className="space-y-4">
                <p className="font-medium text-sm">What's included</p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-sm">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>3 practice tests per month (all sections)</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Access to TEF & TCF test types</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>3 AI writing evaluations per week</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>View last 3 test results</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Daily grammar lessons & vocabulary</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Basic progress tracking</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Premium Tier */}
          <Card className="relative overflow-hidden border-2 border-orange-400 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20">
            {/* Popular Badge */}
            <div className="absolute top-4 right-4">
              <Badge className="bg-orange-500 text-white">Most Popular</Badge>
            </div>
            
            <CardContent className="p-8">
              <div className="mb-6">
                <h2 className="text-2xl font-semibold text-orange-600 dark:text-orange-400 mb-2">Premium</h2>
                <p className="text-muted-foreground text-sm">Practice as much as you want.</p>
              </div>
              
              <div className="mb-6">
                {billingCycle === 'monthly' ? (
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-bold">${monthlyPrice}</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-5xl font-bold">${yearlyPrice}</span>
                      <span className="text-muted-foreground">/year</span>
                    </div>
                    <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                      ${yearlyMonthlyEquivalent}/month · Save ${(monthlyPrice * 12) - yearlyPrice}/year
                    </p>
                  </div>
                )}
              </div>

              <Button 
                className="w-full mb-8 h-12 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white"
                onClick={handleUpgrade}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="animate-spin mr-2">⏳</span>
                    Redirecting...
                  </>
                ) : (
                  <>
                    <Crown className="mr-2 h-5 w-5" />
                    Upgrade to Premium
                  </>
                )}
              </Button>

              <div className="space-y-4">
                <p className="font-medium text-sm">Everything in Free, plus</p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-sm">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span><strong>Unlimited</strong> practice tests</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span><strong>Unlimited</strong> AI writing evaluations</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Full analytics & detailed reports</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Performance trends over time</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Weak areas analysis</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Download/export test results</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Priority support</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Ad-free experience</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enterprise Section */}
        <Card className="max-w-4xl mx-auto mb-16 bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-950/50 dark:to-gray-950/50">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h2 className="text-2xl font-semibold mb-2">Large Groups</h2>
                <p className="text-muted-foreground">
                  CLB French Trainer for organizations with 50+ users. Custom pricing available.
                </p>
              </div>
              <Button 
                variant="outline" 
                size="lg" 
                className="whitespace-nowrap"
                onClick={() => window.open('https://m.me/ravijha01', '_blank')}
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                Contact Us
              </Button>
            </div>
            <div className="mt-6 pt-6 border-t">
              <p className="font-medium text-sm mb-3">What's included</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Everything in Premium</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Team management</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Priority support</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Feature Comparison */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">Compare Plans</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-4 px-4 font-medium">Feature</th>
                  <th className="text-center py-4 px-4 font-medium">Free</th>
                  <th className="text-center py-4 px-4 font-medium text-orange-600">Premium</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-b">
                  <td className="py-4 px-4 flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    Practice Tests
                  </td>
                  <td className="py-4 px-4 text-center">3/month</td>
                  <td className="py-4 px-4 text-center font-medium text-orange-600">Unlimited</td>
                </tr>
                <tr className="border-b">
                  <td className="py-4 px-4 flex items-center gap-2">
                    <PenTool className="h-4 w-4 text-muted-foreground" />
                    AI Writing Evaluation
                  </td>
                  <td className="py-4 px-4 text-center">3/week</td>
                  <td className="py-4 px-4 text-center font-medium text-orange-600">Unlimited</td>
                </tr>
                <tr className="border-b">
                  <td className="py-4 px-4 flex items-center gap-2">
                    <BarChart3 className="h-4 w-4 text-muted-foreground" />
                    Test History
                  </td>
                  <td className="py-4 px-4 text-center">Last 3</td>
                  <td className="py-4 px-4 text-center font-medium text-orange-600">Unlimited</td>
                </tr>
                <tr className="border-b">
                  <td className="py-4 px-4 flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                    Daily Grammar & Vocabulary
                  </td>
                  <td className="py-4 px-4 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                  <td className="py-4 px-4 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                </tr>
                <tr className="border-b">
                  <td className="py-4 px-4 flex items-center gap-2">
                    <Target className="h-4 w-4 text-muted-foreground" />
                    Full Analytics & Reports
                  </td>
                  <td className="py-4 px-4 text-center"><X className="h-5 w-5 text-muted-foreground/40 mx-auto" /></td>
                  <td className="py-4 px-4 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                </tr>
                <tr className="border-b">
                  <td className="py-4 px-4 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    Performance Trends
                  </td>
                  <td className="py-4 px-4 text-center"><X className="h-5 w-5 text-muted-foreground/40 mx-auto" /></td>
                  <td className="py-4 px-4 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                </tr>
                <tr className="border-b">
                  <td className="py-4 px-4 flex items-center gap-2">
                    <Download className="h-4 w-4 text-muted-foreground" />
                    Download Results
                  </td>
                  <td className="py-4 px-4 text-center"><X className="h-5 w-5 text-muted-foreground/40 mx-auto" /></td>
                  <td className="py-4 px-4 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                </tr>
                <tr className="border-b">
                  <td className="py-4 px-4 flex items-center gap-2">
                    <HeadphonesIcon className="h-4 w-4 text-muted-foreground" />
                    Priority Support
                  </td>
                  <td className="py-4 px-4 text-center"><X className="h-5 w-5 text-muted-foreground/40 mx-auto" /></td>
                  <td className="py-4 px-4 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                </tr>
                <tr>
                  <td className="py-4 px-4 flex items-center gap-2">
                    <Zap className="h-4 w-4 text-muted-foreground" />
                    Ad-free Experience
                  </td>
                  <td className="py-4 px-4 text-center"><X className="h-5 w-5 text-muted-foreground/40 mx-auto" /></td>
                  <td className="py-4 px-4 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="text-center text-sm text-muted-foreground">
          <div className="flex items-center justify-center gap-6 flex-wrap">
            <span className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Secure payment via Stripe
            </span>
            <span>•</span>
            <span>Cancel anytime</span>
            <span>•</span>
            <span>No hidden fees</span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t mt-16 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2025 CLB French Trainer. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
