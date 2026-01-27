'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  BookOpen, Target, Clock, Users, CheckCircle2, 
  ArrowRight, Play, ChevronRight, Menu, X, Zap, 
  Brain, Headphones, Mic, FileText, PenTool, Award,
  Calendar, TrendingUp, Shield, Globe, Sparkles, Mail, Gift
} from 'lucide-react'

// Exit Intent Popup Component
function ExitIntentPopup({ isOpen, onClose, onSubmit }) {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    
    if (!email) {
      setError('Please enter your email')
      return
    }
    
    setIsSubmitting(true)
    
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email, 
          source: 'exit_intent_popup' 
        })
      })
      
      const data = await res.json()
      
      if (res.ok) {
        setSubmitted(true)
        onSubmit && onSubmit(email)
      } else {
        setError(data.error || 'Something went wrong. Please try again.')
      }
    } catch (err) {
      setError('Failed to subscribe. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Popup */}
      <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl shadow-2xl max-w-md w-full border border-gray-700 overflow-hidden animate-in zoom-in-95 duration-300">
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>
        
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl" />
        
        {!submitted ? (
          <div className="relative p-8">
            {/* Icon */}
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <Gift className="w-8 h-8 text-white" />
              </div>
            </div>
            
            {/* Heading */}
            <h2 className="text-2xl font-bold text-white text-center mb-2">
              Wait! Dont Miss Out! 🇫🇷
            </h2>
            <p className="text-gray-300 text-center mb-6">
              Get <span className="text-blue-400 font-semibold">exclusive tips</span> for your TEF/TCF exam and 
              <span className="text-purple-400 font-semibold"> free study resources</span> delivered to your inbox.
            </p>
            
            {/* Benefits */}
            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-2 text-gray-300 text-sm">
                <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
                <span>Weekly French learning tips & tricks</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300 text-sm">
                <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
                <span>Free grammar cheat sheets</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300 text-sm">
                <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
                <span>Early access to new features & discounts</span>
              </div>
            </div>
            
            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-500 focus:border-blue-500 h-12"
                />
              </div>
              
              {error && (
                <p className="text-red-400 text-sm text-center">{error}</p>
              )}
              
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold"
              >
                {isSubmitting ? 'Subscribing...' : 'Get Free Resources →'}
              </Button>
            </form>
            
            <p className="text-gray-500 text-xs text-center mt-4">
              No spam, ever. Unsubscribe anytime.
            </p>
          </div>
        ) : (
          <div className="relative p-8 text-center">
            {/* Success Icon */}
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-white" />
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-white mb-2">
              Youre In! 🎉
            </h2>
            <p className="text-gray-300 mb-6">
              Check your inbox for a welcome email with your first free resource.
            </p>
            
            <Button 
              onClick={onClose}
              className="bg-gray-700 hover:bg-gray-600 text-white"
            >
              Continue Browsing
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

// Pricing plans
const pricingPlans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Get started with basic features",
    features: [
      "Access to CLB 5 pathway (first 7 days)",
      "3 grammar lessons per week",
      "2 TEF mock exams",
      "Basic progress tracking",
      "Sample writing answers",
      "Community support"
    ],
    notIncluded: [
      "Full pathway access",
      "AI Writing Evaluation",
      "Audio listening practice",
      "All 20 mock exams per skill",
      "Priority support"
    ],
    cta: "Start Free",
    popular: false
  },
  {
    name: "Basic",
    price: "$19",
    period: "/month",
    yearlyPrice: "$190/year",
    yearlySavings: "Save $38",
    description: "Perfect for serious learners",
    features: [
      "Full CLB 5 pathway (4 months)",
      "All 20 grammar lessons",
      "10 TEF mock exams per skill",
      "🎧 Audio player for listening practice",
      "📝 Sample answers for all writing tasks",
      "Grammar weak topic tracking",
      "Progress analytics",
      "Email support"
    ],
    notIncluded: [
      "CLB 7 pathway",
      "AI Writing Evaluation",
      "All 20 mock exams",
      "Priority support"
    ],
    cta: "Get Basic",
    popular: false
  },
  {
    name: "Premium",
    price: "$39",
    period: "/month",
    yearlyPrice: "$390/year",
    yearlySavings: "Save $78",
    description: "Complete CLB mastery",
    features: [
      "Both CLB 5 & CLB 7 pathways",
      "All 20 grammar lessons + bonus content",
      "All 80 TEF mock exams (20 per skill)",
      "🤖 AI Writing Evaluation with TEF scores",
      "🎧 Audio player for listening practice",
      "📝 Sample answers for all writing tasks",
      "Advanced weak topic tracking",
      "Detailed performance analytics",
      "Priority email support",
      "Certificate of completion"
    ],
    notIncluded: [],
    cta: "Go Premium",
    popular: true
  }
]

// How it works steps
const howItWorks = [
  {
    step: 1,
    title: "Choose Your Pathway",
    description: "Select CLB 5 (4-month intensive) or CLB 7 (8-12 month comprehensive) based on your target score and timeline.",
    icon: Target
  },
  {
    step: 2,
    title: "Follow Daily Routine",
    description: "Complete structured daily activities: Grammar lessons, Reading, Listening, Writing, and Speaking practice - all timed and tracked.",
    icon: Calendar
  },
  {
    step: 3,
    title: "Master Grammar Progressively",
    description: "Learn one grammar topic per day with in-app explanations and 8-question quizzes. Weak areas are automatically tracked for review.",
    icon: Brain
  },
  {
    step: 4,
    title: "Practice with Mock TEF Exams",
    description: "Take realistic TEF mock exams (20 per skill) that simulate the actual test environment with timers and scoring.",
    icon: FileText
  },
  {
    step: 5,
    title: "Track & Improve",
    description: "Monitor your progress, identify weak points, and focus your practice where it matters most to achieve your target CLB score.",
    icon: TrendingUp
  }
]

// Features
const features = [
  {
    icon: Target,
    title: "Structured CLB Pathways",
    description: "Disciplined 4-month (CLB 5) or 8-12 month (CLB 7) programs designed for serious learners."
  },
  {
    icon: Brain,
    title: "Daily Grammar Mastery",
    description: "Progressive grammar lessons with quizzes, explanations, and automatic weak topic tracking."
  },
  {
    icon: FileText,
    title: "80 Mock TEF Exams",
    description: "20 original mock exams for each skill: Listening, Reading, Writing, and Speaking."
  },
  {
    icon: Clock,
    title: "Time-Tracked Practice",
    description: "Every activity is timed to build exam-ready speed and stamina."
  },
  {
    icon: TrendingUp,
    title: "Progress Analytics",
    description: "Detailed tracking of your daily progress, streaks, and performance trends."
  },
  {
    icon: Award,
    title: "Proven Methodology",
    description: "Based on 'Practice Makes Perfect: Complete French Grammar' textbook structure."
  }
]

export default function HomePage() {
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showExitPopup, setShowExitPopup] = useState(false)
  const [hasShownPopup, setHasShownPopup] = useState(false)
  
  // Exit intent detection
  useEffect(() => {
    // Check if popup was already shown in this session
    const popupShown = sessionStorage.getItem('exitPopupShown')
    if (popupShown) {
      setHasShownPopup(true)
    }
    
    const handleMouseLeave = (e) => {
      // Only trigger when mouse leaves from the top of the page (closing intent)
      if (e.clientY <= 0 && !hasShownPopup && !sessionStorage.getItem('exitPopupShown')) {
        setShowExitPopup(true)
        setHasShownPopup(true)
        sessionStorage.setItem('exitPopupShown', 'true')
      }
    }
    
    // Add event listener
    document.addEventListener('mouseleave', handleMouseLeave)
    
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [hasShownPopup])

  const handleGetStarted = () => {
    router.push('/dashboard')
  }

  const handleLogin = () => {
    router.push('/dashboard')
  }

  const handlePricingClick = (plan) => {
    // Mock Stripe - just redirect to dashboard/signup
    router.push('/dashboard')
  }
  
  const handleCloseExitPopup = () => {
    setShowExitPopup(false)
  }
  
  const handleEmailSubmit = (email) => {
    console.log('Email captured:', email)
    // Optionally close popup after a delay
    setTimeout(() => {
      setShowExitPopup(false)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Exit Intent Popup */}
      <ExitIntentPopup 
        isOpen={showExitPopup} 
        onClose={handleCloseExitPopup}
        onSubmit={handleEmailSubmit}
      />
      
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 via-white to-red-500">
                <span className="text-lg font-bold text-blue-900">🇫🇷</span>
              </div>
              <span className="text-xl font-bold">CLB French Trainer</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Features
              </a>
              <a href="#how-it-works" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                How It Works
              </a>
              <a href="#pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Pricing
              </a>
            </nav>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center gap-3">
              <Button variant="ghost" onClick={handleLogin}>
                Log In
              </Button>
              <Button onClick={handleGetStarted} className="bg-blue-600 hover:bg-blue-700">
                Sign Up Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t">
              <nav className="flex flex-col gap-4">
                <a href="#features" className="text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>Features</a>
                <a href="#how-it-works" className="text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>How It Works</a>
                <a href="#pricing" className="text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>Pricing</a>
                <hr />
                <Button variant="outline" onClick={handleLogin} className="w-full">Log In</Button>
                <Button onClick={handleGetStarted} className="w-full bg-blue-600 hover:bg-blue-700">Sign Up Free</Button>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-red-50 dark:from-blue-950/20 dark:via-background dark:to-red-950/20" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            {/* Main Headline */}
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Master French for{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-500 to-red-500">
                CLB Success
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Disciplined, grammar-heavy training for Canadian Language Benchmark. 
              Achieve CLB 5 in 4 months or CLB 7 in 8-12 months.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" onClick={handleGetStarted} className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-6">
                Start Training Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6" onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}>
                <Play className="mr-2 h-5 w-5" />
                See How It Works
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <span>98% Pass Rate</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <span>80 Mock TEF Exams</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <span>Daily Grammar Lessons</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <span>Progress Tracking</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4">Features</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need to Pass CLB
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A complete, structured system designed specifically for Canadian Language Benchmark preparation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4">How It Works</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Your Path to CLB Success
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Follow our proven 5-step method to achieve your target CLB score efficiently.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {howItWorks.map((item, index) => (
              <div key={index} className="flex gap-6 mb-8 last:mb-0">
                {/* Step Number & Line */}
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
                    {item.step}
                  </div>
                  {index < howItWorks.length - 1 && (
                    <div className="w-0.5 h-full bg-blue-200 dark:bg-blue-800 mt-2" />
                  )}
                </div>

                {/* Content */}
                <Card className="flex-1 border-0 shadow-md">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                        <item.icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          {/* CTA after How It Works */}
          <div className="text-center mt-12">
            <Button size="lg" onClick={handleGetStarted} className="bg-blue-600 hover:bg-blue-700">
              Start Your Journey Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4">Pricing</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose the plan that fits your CLB preparation needs. Start free, upgrade anytime.
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              🎉 No credit card required to start!
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <Card 
                key={index} 
                className={`relative ${plan.popular ? 'border-2 border-blue-500 shadow-xl scale-105' : 'border shadow-lg'}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="bg-blue-600 text-white px-4 py-1">Most Popular</Badge>
                  </div>
                )}
                <CardHeader className="text-center pb-2">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  {/* Price */}
                  <div className="mb-6">
                    <span className="text-5xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                    {plan.yearlyPrice && (
                      <div className="mt-2">
                        <p className="text-sm text-muted-foreground">{plan.yearlyPrice}</p>
                        <Badge variant="secondary" className="mt-1">{plan.yearlySavings}</Badge>
                      </div>
                    )}
                  </div>

                  {/* CTA Button */}
                  <Button 
                    className={`w-full mb-6 ${plan.popular ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
                    variant={plan.popular ? 'default' : 'outline'}
                    onClick={() => handlePricingClick(plan)}
                  >
                    {plan.cta}
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>

                  {/* Features */}
                  <div className="text-left space-y-3">
                    {plan.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                    {plan.notIncluded.map((feature, i) => (
                      <div key={i} className="flex items-start gap-2 opacity-50">
                        <X className="h-5 w-5 text-gray-400 flex-shrink-0 mt-0.5" />
                        <span className="text-sm line-through">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pricing Comparison Note */}
          <div className="text-center mt-12">
            <p className="text-muted-foreground">
              All plans include access to our mobile-friendly platform. Cancel anytime.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Achieve Your CLB Goals?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of successful learners. Start your disciplined French training today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={handleGetStarted} className="bg-white text-blue-700 hover:bg-blue-50 text-lg px-8 py-6">
              Start Free Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
          <div className="flex flex-wrap justify-center gap-6 mt-8 text-blue-200 text-sm">
            <span>✓ No credit card required</span>
            <span>✓ Instant access</span>
            <span>✓ Cancel anytime</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 via-white to-red-500">
                  <span className="text-lg font-bold text-blue-900">🇫🇷</span>
                </div>
                <span className="text-xl font-bold text-white">CLB French Trainer</span>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                The disciplined, grammar-heavy French training platform designed specifically for Canadian Language Benchmark (CLB) success.
              </p>
              <div className="flex gap-4">
                <Button variant="outline" size="sm" onClick={handleLogin} className="border-gray-600 text-gray-300 hover:bg-gray-800">
                  Log In
                </Button>
                <Button size="sm" onClick={handleGetStarted} className="bg-blue-600 hover:bg-blue-700">
                  Sign Up Free
                </Button>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="font-semibold text-white mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="/resources/nclc-guide" className="hover:text-white transition-colors">NCLC Guide</a></li>
                <li><a href="/resources/tef-preparation" className="hover:text-white transition-colors">TEF Preparation Tips</a></li>
                <li><a href="/resources/grammar-reference" className="hover:text-white transition-colors">Grammar Reference</a></li>
                <li><a href="/resources/faq" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © 2025 CLB French Trainer. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-gray-500 hover:text-gray-300 transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-500 hover:text-gray-300 transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-500 hover:text-gray-300 transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
