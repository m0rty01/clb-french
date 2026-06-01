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
  Mic,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'

const PLANS = [
  {
    tier: 'free',
    name: 'Free',
    monthly: 0,
    yearly: 0,
    description: 'Build a study habit',
    cta: 'Start Free',
    popular: false,
    features: [
      { text: '1 mock test per 30 days', included: true },
      { text: '2 AI writing evaluations / 30 days', included: true },
      { text: 'Daily grammar (current day)', included: true },
      { text: 'TEF & TCF test types', included: true },
      { text: 'Unlimited mock tests', included: false },
      { text: 'AI Speaking Practice', included: false },
      { text: 'Deep diagnostics', included: false },
    ],
  },
  {
    tier: 'standard',
    name: 'Standard',
    monthly: 9,
    yearly: 79,
    description: 'Best for consistent progress',
    cta: 'Choose Standard',
    popular: false,
    features: [
      { text: 'Unlimited mock tests (Read/Listen)', included: true },
      { text: '15 AI writing evaluations / month', included: true },
      { text: 'Full performance trends', included: true },
      { text: 'Grammar & vocab archives', included: true },
      { text: 'Ad-free experience', included: true },
      { text: 'AI Speaking Practice', included: false },
      { text: 'Deep diagnostics + custom drills', included: false },
    ],
  },
  {
    tier: 'premium',
    name: 'Premium',
    monthly: 34,
    yearly: 249,
    description: 'For aggressive, condensed timelines',
    cta: 'Choose Premium',
    popular: true,
    features: [
      { text: 'Everything in Standard', included: true },
      { text: 'Unlimited AI writing evaluations', included: true },
      { text: 'AI Speaking Practice (Coming Soon)', included: true },
      { text: 'Deep diagnostics + custom AI drills', included: true },
      { text: 'Priority fast LLM queue', included: true },
      { text: 'Priority support', included: true },
    ],
  },
]

export default function PricingPage() {
  const router = useRouter()
  const [billingCycle, setBillingCycle] = useState('monthly')
  const [loading, setLoading] = useState(null) // tier being processed

  const handleSelect = async (plan) => {
    if (plan.tier === 'free') {
      router.push('/dashboard')
      return
    }

    const token = Cookies.get('token')
    if (!token) {
      toast.error('Please sign in to upgrade')
      router.push('/dashboard')
      return
    }

    setLoading(plan.tier)
    try {
      const priceKey = `${plan.tier}_${billingCycle === 'monthly' ? 'monthly' : 'yearly'}`
      const res = await fetch('/api/stripe/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ priceKey }),
      })
      const data = await res.json()
      if (res.ok && data.url) {
        window.location.href = data.url
      } else {
        throw new Error(data.error || 'Failed to create checkout session')
      }
    } catch (error) {
      toast.error(error.message)
      setLoading(null)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-5 w-5" />
            <span className="hidden sm:inline">Back to Dashboard</span>
          </Link>
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <span className="text-white text-lg">🇫🇷</span>
            </div>
            <span className="font-bold">CLB French Trainer</span>
          </Link>
          <div className="w-20" />
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-12">
        {/* Hero */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Pricing Plans</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Start free, then choose the plan that fits your timeline. Cancel anytime.
          </p>
        </div>

        {/* Billing toggle */}
        <div className="flex items-center justify-center mb-10">
          <div className="inline-flex items-center bg-muted p-1 rounded-full">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                billingCycle === 'monthly' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                billingCycle === 'yearly' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Annual
              <Badge className="bg-green-100 text-green-700 text-xs">Save 25%+</Badge>
            </button>
          </div>
        </div>

        {/* Plans */}
        <div className="grid md:grid-cols-3 gap-6 items-start">
          {PLANS.map((plan) => {
            const price = billingCycle === 'monthly' ? plan.monthly : plan.yearly
            const period = plan.monthly === 0 ? '/forever' : (billingCycle === 'monthly' ? '/mo' : '/yr')
            const isProcessing = loading === plan.tier
            return (
              <Card
                key={plan.tier}
                className={`relative flex flex-col ${
                  plan.popular
                    ? 'border-2 border-orange-400 shadow-xl bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20'
                    : 'border shadow-lg'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="bg-orange-500 text-white px-4 py-1">Recommended</Badge>
                  </div>
                )}
                <CardContent className="p-6 flex flex-col flex-1">
                  <div className="text-center mb-4">
                    <h2 className={`text-2xl font-bold ${plan.popular ? 'text-orange-600 dark:text-orange-400' : ''}`}>{plan.name}</h2>
                    <p className="text-sm text-muted-foreground mt-1">{plan.description}</p>
                  </div>

                  <div className="text-center mb-6">
                    <span className="text-5xl font-bold">${price}</span>
                    <span className="text-muted-foreground">{period}</span>
                    {billingCycle === 'yearly' && plan.monthly > 0 && (
                      <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                        ≈ ${(plan.yearly / 12).toFixed(2)}/month
                      </p>
                    )}
                  </div>

                  <Button
                    className={`w-full mb-6 ${plan.popular ? 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white' : ''}`}
                    variant={plan.popular ? 'default' : 'outline'}
                    onClick={() => handleSelect(plan)}
                    disabled={!!loading}
                  >
                    {isProcessing ? (
                      <><span className="animate-spin mr-2">⏳</span>Redirecting...</>
                    ) : (
                      <>
                        {plan.popular && <Crown className="mr-2 h-4 w-4" />}
                        {plan.cta}
                      </>
                    )}
                  </Button>

                  <ul className="space-y-3 text-left flex-1">
                    {plan.features.map((f, i) => (
                      <li key={i} className={`flex items-start gap-2 text-sm ${f.included ? '' : 'opacity-50'}`}>
                        {f.included ? (
                          <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        ) : (
                          <X className="h-5 w-5 text-gray-400 flex-shrink-0 mt-0.5" />
                        )}
                        <span className={f.included ? '' : 'line-through'}>{f.text}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Trust row */}
        <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground mt-12 flex-wrap">
          <span className="flex items-center gap-2"><Shield className="h-4 w-4" /> Secure payment via Stripe</span>
          <span className="flex items-center gap-2"><Sparkles className="h-4 w-4" /> Cancel anytime</span>
          <span className="flex items-center gap-2"><Mic className="h-4 w-4" /> AI Speaking launching soon (Premium)</span>
        </div>

        <p className="text-center text-muted-foreground mt-8 text-sm">
          All plans include access to our mobile-friendly platform.
        </p>
      </main>
    </div>
  )
}
