'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  BookOpen, Target, Clock, Users, CheckCircle2, Star, 
  ArrowRight, Play, ChevronRight, Menu, X, Zap, 
  Brain, Headphones, Mic, FileText, PenTool, Award,
  Calendar, TrendingUp, Shield, Globe, Sparkles
} from 'lucide-react'

// Testimonials data
const testimonials = [
  {
    name: "Marie Dubois",
    role: "Immigration Applicant",
    location: "Toronto, Canada",
    avatar: "MD",
    rating: 5,
    text: "I needed CLB 7 for Express Entry and was struggling with French. This platform's structured approach helped me go from CLB 5 to CLB 7 in just 3 months. The daily grammar lessons were exactly what I needed!",
    improvement: "CLB 5 → CLB 7 in 3 months"
  },
  {
    name: "Jean-Pierre Martin",
    role: "Healthcare Worker",
    location: "Montreal, Canada",
    avatar: "JP",
    rating: 5,
    text: "As a nurse applying for permanent residence, I needed to prove my French proficiency quickly. The TEF mock exams were incredibly realistic and prepared me perfectly for the real test.",
    improvement: "CLB 6 → CLB 8 in 8 weeks"
  },
  {
    name: "Sarah Chen",
    role: "Software Engineer",
    location: "Vancouver, Canada",
    avatar: "SC",
    rating: 5,
    text: "The disciplined daily routine kept me accountable. I loved how the grammar lessons built on each other progressively. Passed my TEF with flying colors!",
    improvement: "CLB 4 → CLB 7 in 4 months"
  },
  {
    name: "Ahmed Hassan",
    role: "Business Professional",
    location: "Ottawa, Canada",
    avatar: "AH",
    rating: 5,
    text: "The weak topic tracking feature is genius. It identified my grammar gaps and helped me focus on what mattered. Best investment in my immigration journey.",
    improvement: "CLB 5 → CLB 9 in 6 months"
  },
  {
    name: "Elena Rodriguez",
    role: "Teacher",
    location: "Calgary, Canada",
    avatar: "ER",
    rating: 5,
    text: "I tried many French learning apps but this is the only one that treats CLB preparation seriously. The 20 mock TEF exams gave me the confidence I needed.",
    improvement: "CLB 6 → CLB 8 in 10 weeks"
  }
]

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
      "Community support"
    ],
    notIncluded: [
      "Full pathway access",
      "All 20 mock exams per skill",
      "Weak topic tracking",
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
      "Grammar weak topic tracking",
      "Progress analytics",
      "Email support"
    ],
    notIncluded: [
      "CLB 7 pathway",
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
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  
  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

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

  return (
    <div className="min-h-screen bg-background">
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
              <a href="#testimonials" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Testimonials
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
                <a href="#testimonials" className="text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>Testimonials</a>
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
            {/* Badge */}
            <Badge className="mb-6 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 px-4 py-1">
              <Sparkles className="w-4 h-4 mr-2" />
              Trusted by 10,000+ CLB Test Takers
            </Badge>

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

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4">Testimonials</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Success Stories from Real Learners
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join thousands who have achieved their CLB goals with our platform.
            </p>
          </div>

          {/* Testimonials Carousel */}
          <div className="max-w-4xl mx-auto">
            <Card className="border-0 shadow-xl">
              <CardContent className="p-8 md:p-12">
                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-6 w-6 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-xl md:text-2xl mb-8 text-foreground leading-relaxed">
                  "{testimonials[currentTestimonial].text}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-red-500 flex items-center justify-center text-white font-bold text-lg">
                      {testimonials[currentTestimonial].avatar}
                    </div>
                    <div>
                      <p className="font-semibold text-lg">{testimonials[currentTestimonial].name}</p>
                      <p className="text-muted-foreground">{testimonials[currentTestimonial].role}</p>
                      <p className="text-sm text-muted-foreground">{testimonials[currentTestimonial].location}</p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 text-sm px-4 py-2">
                    {testimonials[currentTestimonial].improvement}
                  </Badge>
                </div>

                {/* Dots Navigation */}
                <div className="flex justify-center gap-2 mt-8">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentTestimonial(index)}
                      className={`w-3 h-3 rounded-full transition-all ${
                        index === currentTestimonial 
                          ? 'bg-blue-600 w-8' 
                          : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400'
                      }`}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
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
                <li><a href="#testimonials" className="hover:text-white transition-colors">Testimonials</a></li>
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
