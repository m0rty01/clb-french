'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  BookOpen, ArrowLeft, CheckCircle2, Target, FileText, 
  Brain, Headphones, Mic, PenTool, Clock, TrendingUp,
  Zap, Star, Award, Calendar, Users, ChevronRight,
  Lightbulb, Shield, Layers, BarChart3
} from 'lucide-react'
import Link from 'next/link'

export default function TEFPreparationPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 via-white to-red-500">
                <span className="text-lg font-bold text-blue-900">🇫🇷</span>
              </div>
              <span className="text-xl font-bold">CLB French Trainer</span>
            </Link>
            <div className="flex items-center gap-3">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Home
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  Start Training
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-purple-950/20 dark:via-background dark:to-blue-950/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-4 bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300">
              Platform Guide
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              TEF Preparation Tips: How Our Platform Guarantees Your Success
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Discover why CLB French Trainer provides the most structured, incremental, and guided 
              French learning experience for TEF Canada preparation - something that simply doesn't 
              exist anywhere else on the internet.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            
            {/* The Problem */}
            <Card className="mb-8 border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                    <Target className="h-6 w-6 text-red-600 dark:text-red-400" />
                  </div>
                  <CardTitle className="text-2xl">The Problem with Traditional French Learning</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Most French learners preparing for TEF Canada face the same frustrating challenges:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-red-50 dark:bg-red-900/10 rounded-lg border border-red-200 dark:border-red-800">
                    <h4 className="font-semibold text-red-700 dark:text-red-400 mb-2">❌ No Clear Structure</h4>
                    <p className="text-sm text-muted-foreground">Random YouTube videos, scattered resources, no progression path</p>
                  </div>
                  <div className="p-4 bg-red-50 dark:bg-red-900/10 rounded-lg border border-red-200 dark:border-red-800">
                    <h4 className="font-semibold text-red-700 dark:text-red-400 mb-2">❌ No Daily Routine</h4>
                    <p className="text-sm text-muted-foreground">Inconsistent study habits, no accountability, loss of momentum</p>
                  </div>
                  <div className="p-4 bg-red-50 dark:bg-red-900/10 rounded-lg border border-red-200 dark:border-red-800">
                    <h4 className="font-semibold text-red-700 dark:text-red-400 mb-2">❌ Grammar Chaos</h4>
                    <p className="text-sm text-muted-foreground">Topics taught randomly without building on previous knowledge</p>
                  </div>
                  <div className="p-4 bg-red-50 dark:bg-red-900/10 rounded-lg border border-red-200 dark:border-red-800">
                    <h4 className="font-semibold text-red-700 dark:text-red-400 mb-2">❌ No TEF-Specific Practice</h4>
                    <p className="text-sm text-muted-foreground">Generic French content that doesn't prepare you for the actual test</p>
                  </div>
                </div>
                <div className="p-4 bg-yellow-50 dark:bg-yellow-900/10 rounded-lg border border-yellow-200 dark:border-yellow-800 mt-4">
                  <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                    💡 The result? Months of studying with little to show for it. Wasted time, wasted money, 
                    and the stress of an upcoming TEF exam with no confidence in passing.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Our Solution */}
            <Card className="mb-8 border-2 border-green-500/30 shadow-lg">
              <CardHeader className="bg-green-50 dark:bg-green-900/20">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                    <Zap className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">Our Solution: Structured & Incremental Learning</CardTitle>
                    <CardDescription>The only platform built specifically for CLB/NCLC success</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                <p className="text-muted-foreground">
                  CLB French Trainer is fundamentally different. We've built a <strong>disciplined, grammar-heavy 
                  training system</strong> that treats French learning like the serious undertaking it is - 
                  especially when your immigration future depends on it.
                </p>

                <h4 className="font-bold text-lg mt-6">What Makes Us Unique:</h4>
                
                <div className="space-y-4">
                  {/* Feature 1 */}
                  <div className="p-5 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/10 rounded-lg">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">1</div>
                      <div>
                        <h5 className="font-bold text-lg flex items-center gap-2">
                          <Layers className="h-5 w-5 text-blue-600" />
                          Structured CLB Pathways
                        </h5>
                        <p className="text-muted-foreground mt-2">
                          Choose between our <strong>CLB 5 (4-month)</strong> or <strong>CLB 7 (8-12 month)</strong> pathways. 
                          Each pathway is meticulously designed with day-by-day curriculum, ensuring you know exactly 
                          what to study every single day. No more wondering "what should I learn today?"
                        </p>
                        <div className="mt-3 p-3 bg-white dark:bg-background rounded-lg">
                          <p className="text-sm text-green-600 dark:text-green-400 font-medium">
                            ✓ 112+ days of structured content for CLB 5 | 240+ days for CLB 7
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Feature 2 */}
                  <div className="p-5 bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/10 rounded-lg">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold">2</div>
                      <div>
                        <h5 className="font-bold text-lg flex items-center gap-2">
                          <Brain className="h-5 w-5 text-purple-600" />
                          Daily Grammar Mastery System
                        </h5>
                        <p className="text-muted-foreground mt-2">
                          Grammar is the backbone of TEF success. Our system introduces <strong>one grammar topic per day</strong>, 
                          building progressively from basic articles to complex subjunctive. Each lesson includes:
                        </p>
                        <ul className="mt-3 space-y-2 text-sm">
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-purple-600" />
                            In-app explanation with examples (no external resources needed)
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-purple-600" />
                            8-question multiple-choice quiz with instant feedback
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-purple-600" />
                            Reference to "Practice Makes Perfect" textbook chapters
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-purple-600" />
                            Automatic weak topic tracking (score &lt; 70% = flagged for review)
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Feature 3 */}
                  <div className="p-5 bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/10 rounded-lg">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold">3</div>
                      <div>
                        <h5 className="font-bold text-lg flex items-center gap-2">
                          <Calendar className="h-5 w-5 text-orange-600" />
                          Non-Negotiable Daily Routine
                        </h5>
                        <p className="text-muted-foreground mt-2">
                          Every day includes a structured routine covering all five skills. Our system tracks your 
                          completion and time spent, enforcing the discipline that language learning requires:
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mt-3">
                          <div className="p-2 bg-white dark:bg-background rounded text-center">
                            <BookOpen className="h-5 w-5 mx-auto text-blue-600 mb-1" />
                            <p className="text-xs font-medium">Grammar</p>
                          </div>
                          <div className="p-2 bg-white dark:bg-background rounded text-center">
                            <Headphones className="h-5 w-5 mx-auto text-purple-600 mb-1" />
                            <p className="text-xs font-medium">Listening</p>
                          </div>
                          <div className="p-2 bg-white dark:bg-background rounded text-center">
                            <Mic className="h-5 w-5 mx-auto text-green-600 mb-1" />
                            <p className="text-xs font-medium">Speaking</p>
                          </div>
                          <div className="p-2 bg-white dark:bg-background rounded text-center">
                            <FileText className="h-5 w-5 mx-auto text-orange-600 mb-1" />
                            <p className="text-xs font-medium">Reading</p>
                          </div>
                          <div className="p-2 bg-white dark:bg-background rounded text-center">
                            <PenTool className="h-5 w-5 mx-auto text-pink-600 mb-1" />
                            <p className="text-xs font-medium">Writing</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Feature 4 */}
                  <div className="p-5 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/10 rounded-lg">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center font-bold">4</div>
                      <div>
                        <h5 className="font-bold text-lg flex items-center gap-2">
                          <FileText className="h-5 w-5 text-green-600" />
                          80 Original TEF Mock Exams
                        </h5>
                        <p className="text-muted-foreground mt-2">
                          We've created <strong>20 complete mock exams for each of the four skills</strong> - that's 80 
                          full practice tests, all original content designed to match the real TEF Canada format:
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
                          <div className="p-3 bg-white dark:bg-background rounded text-center">
                            <Headphones className="h-6 w-6 mx-auto text-purple-600 mb-1" />
                            <p className="font-bold">20</p>
                            <p className="text-xs text-muted-foreground">Listening Exams</p>
                          </div>
                          <div className="p-3 bg-white dark:bg-background rounded text-center">
                            <FileText className="h-6 w-6 mx-auto text-orange-600 mb-1" />
                            <p className="font-bold">20</p>
                            <p className="text-xs text-muted-foreground">Reading Exams</p>
                          </div>
                          <div className="p-3 bg-white dark:bg-background rounded text-center">
                            <PenTool className="h-6 w-6 mx-auto text-pink-600 mb-1" />
                            <p className="font-bold">20</p>
                            <p className="text-xs text-muted-foreground">Writing Exams</p>
                          </div>
                          <div className="p-3 bg-white dark:bg-background rounded text-center">
                            <Mic className="h-6 w-6 mx-auto text-green-600 mb-1" />
                            <p className="font-bold">20</p>
                            <p className="text-xs text-muted-foreground">Speaking Exams</p>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mt-3">
                          Each exam includes realistic timers, question formats matching the real TEF, and 
                          detailed scoring to help you gauge your readiness.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Feature 5 */}
                  <div className="p-5 bg-gradient-to-r from-pink-50 to-pink-100 dark:from-pink-900/20 dark:to-pink-800/10 rounded-lg">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-pink-600 text-white flex items-center justify-center font-bold">5</div>
                      <div>
                        <h5 className="font-bold text-lg flex items-center gap-2">
                          <BarChart3 className="h-5 w-5 text-pink-600" />
                          Intelligent Progress Tracking
                        </h5>
                        <p className="text-muted-foreground mt-2">
                          Our system doesn't just track what you've done - it identifies where you struggle:
                        </p>
                        <ul className="mt-3 space-y-2 text-sm">
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-pink-600" />
                            <strong>Day streaks</strong> - Build consistency and momentum
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-pink-600" />
                            <strong>Weak topic identification</strong> - Topics where you score below 70% are automatically flagged
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-pink-600" />
                            <strong>User-controlled review</strong> - Practice weak areas whenever you want
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-pink-600" />
                            <strong>Time tracking</strong> - See how much time you spend on each skill
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Why This Doesn't Exist Elsewhere */}
            <Card className="mb-8 border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
                    <Lightbulb className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                  </div>
                  <CardTitle className="text-2xl">Why This Doesn't Exist Elsewhere</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  You might wonder: "Why hasn't anyone else built this?" The truth is, creating a truly 
                  structured TEF preparation system requires:
                </p>
                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-semibold mb-2">🎯 Deep Understanding of CLB Requirements</h4>
                    <p className="text-sm text-muted-foreground">
                      Most French courses teach generic French. We specifically target the CLB/NCLC levels 
                      required for Canadian immigration.
                    </p>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-semibold mb-2">📚 Curated Curriculum Development</h4>
                    <p className="text-sm text-muted-foreground">
                      Our grammar curriculum follows the proven "Practice Makes Perfect" progression, 
                      adapted specifically for TEF success.
                    </p>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-semibold mb-2">✍️ Original Content Creation</h4>
                    <p className="text-sm text-muted-foreground">
                      80 mock exams is an enormous content investment. Most platforms can't or won't 
                      create this much original TEF-style material.
                    </p>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-semibold mb-2">🔄 Integrated Tracking System</h4>
                    <p className="text-sm text-muted-foreground">
                      Building a system that tracks progress, identifies weaknesses, AND maintains a 
                      day-by-day curriculum is complex engineering.
                    </p>
                  </div>
                </div>
                
                <div className="p-4 bg-blue-50 dark:bg-blue-900/10 rounded-lg border border-blue-200 dark:border-blue-800 mt-4">
                  <p className="text-sm">
                    <strong>The Result:</strong> A one-of-a-kind platform where immigrants can confidently 
                    prepare for TEF Canada knowing they have a clear path to their target NCLC score - 
                    whether that's NCLC 5 for work permits or NCLC 7 for permanent residency.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Tips for Success */}
            <Card className="mb-8 border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                    <Star className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <CardTitle className="text-2xl">Tips for Maximum Success</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-muted/30 rounded-lg">
                    <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-bold text-sm">1</div>
                    <div>
                      <h4 className="font-semibold">Follow the Daily Routine Religiously</h4>
                      <p className="text-sm text-muted-foreground">
                        The magic is in consistency. Complete every day's activities before moving on. 
                        Don't skip grammar lessons - they compound over time.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-muted/30 rounded-lg">
                    <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-bold text-sm">2</div>
                    <div>
                      <h4 className="font-semibold">Don't Ignore Weak Topics</h4>
                      <p className="text-sm text-muted-foreground">
                        When the system flags a grammar topic as weak, review it before proceeding. 
                        Grammar gaps will hurt you on every part of the TEF.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-muted/30 rounded-lg">
                    <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-bold text-sm">3</div>
                    <div>
                      <h4 className="font-semibold">Take Mock Exams Under Test Conditions</h4>
                      <p className="text-sm text-muted-foreground">
                        Use the timers. Don't pause. Don't look things up. The more you simulate 
                        real test conditions, the better prepared you'll be.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-muted/30 rounded-lg">
                    <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-bold text-sm">4</div>
                    <div>
                      <h4 className="font-semibold">Complement with the Textbook</h4>
                      <p className="text-sm text-muted-foreground">
                        Our lessons reference "Practice Makes Perfect: Complete French Grammar." 
                        Get the book and do the exercises for extra practice.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-muted/30 rounded-lg">
                    <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-bold text-sm">5</div>
                    <div>
                      <h4 className="font-semibold">Trust the Process</h4>
                      <p className="text-sm text-muted-foreground">
                        You might not see results in week one. By month two, you'll notice significant 
                        improvement. By month four (CLB 5) or month eight (CLB 7), you'll be ready.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* CTA */}
            <div className="text-center py-12 bg-gradient-to-br from-purple-50 to-blue-100 dark:from-purple-900/20 dark:to-blue-800/20 rounded-2xl">
              <h3 className="text-2xl font-bold mb-4">Ready to Experience Structured French Learning?</h3>
              <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                Join thousands of successful learners who have achieved their NCLC goals with our 
                unique, disciplined approach to TEF preparation.
              </p>
              <Link href="/dashboard">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  Start Your Free Training
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <p className="text-sm text-muted-foreground mt-4">No credit card required</p>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm">
            © 2025 CLB French Trainer. All rights reserved. | 
            <Link href="/resources/nclc-guide" className="hover:text-white ml-2">NCLC Guide</Link> | 
            <Link href="/resources/faq" className="hover:text-white ml-2">FAQ</Link> | 
            <Link href="/resources/grammar-reference" className="hover:text-white ml-2">Grammar Reference</Link>
          </p>
        </div>
      </footer>
    </div>
  )
}
