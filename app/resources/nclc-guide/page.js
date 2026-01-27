'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  BookOpen, ArrowLeft, CheckCircle2, AlertCircle, Target, 
  FileText, Globe, Award, Users, Clock, TrendingUp,
  Building, Briefcase, Home, Star, ChevronRight
} from 'lucide-react'
import Link from 'next/link'

export default function NCLCGuidePage() {
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
      <section className="py-16 bg-gradient-to-br from-blue-50 via-white to-red-50 dark:from-blue-950/20 dark:via-background dark:to-red-950/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-4 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
              Resource Guide
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Complete NCLC Guide for Canadian Immigration
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Everything you need to know about the Niveaux de compétence linguistique canadiens (NCLC), 
              how French proficiency impacts your immigration journey, and how to achieve NCLC 5 and NCLC 7.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert">
            
            {/* What is NCLC */}
            <Card className="mb-8 border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <Globe className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <CardTitle className="text-2xl">What is NCLC?</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  The <strong>Niveaux de compétence linguistique canadiens (NCLC)</strong> is Canada's official 
                  standard for measuring French language proficiency. It's the French equivalent of the Canadian 
                  Language Benchmarks (CLB) used for English. The NCLC scale ranges from 1 to 12, with each level 
                  representing specific language abilities.
                </p>
                <p className="text-muted-foreground">
                  NCLC is used by Immigration, Refugees and Citizenship Canada (IRCC) to assess the French 
                  language skills of immigration applicants. Your NCLC score can significantly impact your 
                  eligibility for various immigration programs and provide substantial advantages in the 
                  Canadian immigration system.
                </p>
                
                <div className="grid md:grid-cols-2 gap-4 mt-6">
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <h4 className="font-semibold flex items-center gap-2 mb-2">
                      <Target className="h-4 w-4 text-blue-600" />
                      Four Skills Assessed
                    </h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• <strong>Listening</strong> - Compréhension orale</li>
                      <li>• <strong>Reading</strong> - Compréhension écrite</li>
                      <li>• <strong>Writing</strong> - Expression écrite</li>
                      <li>• <strong>Speaking</strong> - Expression orale</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <h4 className="font-semibold flex items-center gap-2 mb-2">
                      <Award className="h-4 w-4 text-green-600" />
                      Recognized Tests
                    </h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• <strong>TEF Canada</strong> - Test d'évaluation de français</li>
                      <li>• <strong>TCF Canada</strong> - Test de connaissance du français</li>
                      <li>• Both tests are accepted by IRCC</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* NCLC 5 Section */}
            <Card className="mb-8 border-2 border-orange-500/30 shadow-lg">
              <CardHeader className="bg-orange-50 dark:bg-orange-900/20">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                    <Briefcase className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">NCLC 5: Work Permit Extension</CardTitle>
                    <CardDescription>Essential for extending your Canadian work authorization</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                <div className="p-4 bg-orange-50 dark:bg-orange-900/10 rounded-lg border border-orange-200 dark:border-orange-800">
                  <h4 className="font-bold text-lg mb-3 flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-orange-600" />
                    Why NCLC 5 Matters for Work Permits
                  </h4>
                  <p className="text-muted-foreground mb-4">
                    As of recent IRCC policy changes, demonstrating French language proficiency at NCLC 5 
                    can provide significant advantages for work permit applications and extensions. This 
                    requirement reflects Canada's commitment to bilingualism and the growing demand for 
                    French-speaking workers across the country.
                  </p>
                </div>

                <h4 className="font-bold text-lg">Key Benefits of NCLC 5:</h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>Post-Graduation Work Permit (PGWP) Eligibility</strong>
                      <p className="text-sm text-muted-foreground">French proficiency at NCLC 5 can help qualify for PGWP extensions, especially for graduates from programs outside major metropolitan areas.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>Francophone Mobility Advantage</strong>
                      <p className="text-sm text-muted-foreground">Access to the Mobilité francophone stream for work permits outside Quebec without requiring a Labour Market Impact Assessment (LMIA).</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>Open Work Permit Extensions</strong>
                      <p className="text-sm text-muted-foreground">French proficiency can support applications for open work permit extensions while waiting for permanent residence processing.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>Provincial Nominee Programs</strong>
                      <p className="text-sm text-muted-foreground">Many PNP streams outside Quebec give preference or additional points for French language skills at NCLC 5 or higher.</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 dark:bg-blue-900/10 rounded-lg">
                  <h4 className="font-semibold mb-2">NCLC 5 Score Requirements (TEF Canada)</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
                    <div className="p-2 bg-white dark:bg-background rounded">
                      <p className="text-xs text-muted-foreground">Listening</p>
                      <p className="font-bold">181-216</p>
                    </div>
                    <div className="p-2 bg-white dark:bg-background rounded">
                      <p className="text-xs text-muted-foreground">Reading</p>
                      <p className="font-bold">151-180</p>
                    </div>
                    <div className="p-2 bg-white dark:bg-background rounded">
                      <p className="text-xs text-muted-foreground">Writing</p>
                      <p className="font-bold">226-270</p>
                    </div>
                    <div className="p-2 bg-white dark:bg-background rounded">
                      <p className="text-xs text-muted-foreground">Speaking</p>
                      <p className="font-bold">226-270</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 border-l-4 border-orange-500 bg-orange-50/50 dark:bg-orange-900/10">
                  <p className="text-sm">
                    <strong>Our CLB 5 Pathway:</strong> Designed as a 4-month intensive program that takes you 
                    from beginner to NCLC 5 proficiency through daily structured lessons, grammar mastery, 
                    and extensive practice with TEF-style questions.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* NCLC 7 Section */}
            <Card className="mb-8 border-2 border-green-500/30 shadow-lg">
              <CardHeader className="bg-green-50 dark:bg-green-900/20">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                    <Home className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">NCLC 7: Permanent Residency</CardTitle>
                    <CardDescription>Your pathway to becoming a Canadian permanent resident</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                <div className="p-4 bg-green-50 dark:bg-green-900/10 rounded-lg border border-green-200 dark:border-green-800">
                  <h4 className="font-bold text-lg mb-3 flex items-center gap-2">
                    <Star className="h-5 w-5 text-green-600" />
                    Why NCLC 7 is Your Key to PR
                  </h4>
                  <p className="text-muted-foreground mb-4">
                    NCLC 7 is the gold standard for French proficiency in Canadian immigration. Achieving this 
                    level not only demonstrates strong bilingual capabilities but unlocks substantial benefits 
                    in the Express Entry system and various provincial programs, making permanent residency 
                    significantly more attainable.
                  </p>
                </div>

                <h4 className="font-bold text-lg">Express Entry CRS Points for French:</h4>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-muted">
                        <th className="border p-3 text-left">NCLC Level</th>
                        <th className="border p-3 text-left">Points (First Official Language)</th>
                        <th className="border p-3 text-left">Bonus Points</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border p-3">NCLC 7</td>
                        <td className="border p-3">Up to 68 points</td>
                        <td className="border p-3">Up to 50 bonus points for bilingualism</td>
                      </tr>
                      <tr className="bg-green-50 dark:bg-green-900/10">
                        <td className="border p-3 font-bold">NCLC 7+ with CLB 5+ English</td>
                        <td className="border p-3">68+ points</td>
                        <td className="border p-3 font-bold text-green-600">+50 additional points!</td>
                      </tr>
                      <tr>
                        <td className="border p-3">NCLC 9+</td>
                        <td className="border p-3">Up to 136 points</td>
                        <td className="border p-3">Maximum language points</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h4 className="font-bold text-lg mt-6">Immigration Programs Favoring NCLC 7:</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h5 className="font-semibold flex items-center gap-2 mb-2">
                      <Building className="h-4 w-4 text-blue-600" />
                      Express Entry - Federal Skilled Worker
                    </h5>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Minimum NCLC 7 required for all abilities</li>
                      <li>• Up to 136 points for first official language</li>
                      <li>• 50 bonus points for French with English CLB 5+</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h5 className="font-semibold flex items-center gap-2 mb-2">
                      <Users className="h-4 w-4 text-purple-600" />
                      Canadian Experience Class (CEC)
                    </h5>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• NCLC 7 for NOC 0/A jobs</li>
                      <li>• NCLC 5 minimum for NOC B jobs</li>
                      <li>• Strong French = higher CRS score</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h5 className="font-semibold flex items-center gap-2 mb-2">
                      <Award className="h-4 w-4 text-green-600" />
                      Francophone Category Draws
                    </h5>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Dedicated Express Entry draws for French speakers</li>
                      <li>• Often have lower CRS cutoffs</li>
                      <li>• Growing number of invitations annually</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h5 className="font-semibold flex items-center gap-2 mb-2">
                      <Globe className="h-4 w-4 text-orange-600" />
                      Provincial Nominee Programs
                    </h5>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Ontario, New Brunswick, Manitoba streams</li>
                      <li>• Extra points or dedicated streams</li>
                      <li>• PNP nomination = +600 CRS points!</li>
                    </ul>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 dark:bg-blue-900/10 rounded-lg">
                  <h4 className="font-semibold mb-2">NCLC 7 Score Requirements (TEF Canada)</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
                    <div className="p-2 bg-white dark:bg-background rounded">
                      <p className="text-xs text-muted-foreground">Listening</p>
                      <p className="font-bold">249-279</p>
                    </div>
                    <div className="p-2 bg-white dark:bg-background rounded">
                      <p className="text-xs text-muted-foreground">Reading</p>
                      <p className="font-bold">207-232</p>
                    </div>
                    <div className="p-2 bg-white dark:bg-background rounded">
                      <p className="text-xs text-muted-foreground">Writing</p>
                      <p className="font-bold">310-348</p>
                    </div>
                    <div className="p-2 bg-white dark:bg-background rounded">
                      <p className="text-xs text-muted-foreground">Speaking</p>
                      <p className="font-bold">310-348</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 border-l-4 border-green-500 bg-green-50/50 dark:bg-green-900/10">
                  <p className="text-sm">
                    <strong>Our CLB 7 Pathway:</strong> A comprehensive 8-12 month program designed for serious 
                    learners targeting permanent residency. Builds systematically on grammar foundations while 
                    preparing you for all four TEF skills through 80 mock exams.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Timeline Comparison */}
            <Card className="mb-8 border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                    <Clock className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <CardTitle className="text-2xl">NCLC 5 vs NCLC 7: Which Pathway?</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-6 bg-orange-50 dark:bg-orange-900/10 rounded-lg">
                    <h4 className="font-bold text-xl mb-4 flex items-center gap-2">
                      <Target className="h-5 w-5 text-orange-600" />
                      Choose NCLC 5 If:
                    </h4>
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                        <span>You need a work permit extension urgently (4 months prep)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                        <span>You're applying for Mobilité francophone</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                        <span>You're a complete beginner to French</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                        <span>You want to qualify for PGWP extension first</span>
                      </li>
                    </ul>
                    <div className="mt-4 p-3 bg-white dark:bg-background rounded">
                      <p className="text-xs text-muted-foreground">Estimated Timeline</p>
                      <p className="font-bold text-lg">4 Months</p>
                    </div>
                  </div>
                  
                  <div className="p-6 bg-green-50 dark:bg-green-900/10 rounded-lg">
                    <h4 className="font-bold text-xl mb-4 flex items-center gap-2">
                      <Home className="h-5 w-5 text-green-600" />
                      Choose NCLC 7 If:
                    </h4>
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Your primary goal is permanent residency</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>You want maximum CRS points for Express Entry</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>You have 8-12 months before your application</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>You want to qualify for Francophone draws</span>
                      </li>
                    </ul>
                    <div className="mt-4 p-3 bg-white dark:bg-background rounded">
                      <p className="text-xs text-muted-foreground">Estimated Timeline</p>
                      <p className="font-bold text-lg">8-12 Months</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* CTA */}
            <div className="text-center py-12 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-2xl">
              <h3 className="text-2xl font-bold mb-4">Ready to Start Your NCLC Journey?</h3>
              <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                Our structured pathways are designed specifically for immigration success. 
                Get AI-powered writing feedback, audio listening practice, and sample answers to accelerate your learning.
              </p>
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                <Badge className="bg-blue-100 text-blue-700">🤖 AI Writing Evaluation</Badge>
                <Badge className="bg-violet-100 text-violet-700">🎧 Audio Listening Practice</Badge>
                <Badge className="bg-green-100 text-green-700">📝 Sample Answers</Badge>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/dashboard">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                    Start NCLC 5 Pathway
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button size="lg" variant="outline">
                    Start NCLC 7 Pathway
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm">
            © 2025 CLB French Trainer. All rights reserved. | 
            <Link href="/resources/faq" className="hover:text-white ml-2">FAQ</Link> | 
            <Link href="/resources/tef-preparation" className="hover:text-white ml-2">TEF Preparation</Link> | 
            <Link href="/resources/grammar-reference" className="hover:text-white ml-2">Grammar Reference</Link>
          </p>
        </div>
      </footer>
    </div>
  )
}
