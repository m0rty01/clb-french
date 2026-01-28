'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  BookOpen, ArrowLeft, ExternalLink, Star, CheckCircle2,
  Globe, BookMarked, GraduationCap, Library, Link as LinkIcon,
  ShoppingCart, Award, ChevronRight
} from 'lucide-react'
import Link from 'next/link'

const grammarResources = [
  {
    category: "Essential Textbook",
    featured: true,
    items: [
      {
        title: "Practice Makes Perfect: Complete French Grammar",
        author: "Annie Heminway",
        description: "The cornerstone textbook our curriculum is built upon. This comprehensive grammar guide covers everything from basic articles to advanced subjunctive, with hundreds of exercises for practice.",
        why: "Our platform's grammar curriculum follows this book's proven progression. Each daily lesson references specific chapters, allowing you to dive deeper with additional exercises.",
        buyLinks: [
          { name: "Amazon", url: "https://www.amazon.com/Practice-Makes-Perfect-Complete-Grammar/dp/1260463176/" },
          { name: "Barnes & Noble", url: "https://www.barnesandnoble.com/w/practice-makes-perfect-complete-french-grammar-annie-heminway/1100026890" },
          { name: "Indigo (Canada)", url: "https://www.chapters.indigo.ca/en-ca/books/practice-makes-perfect-complete-french/9781260463170-item.html" }
        ],
        level: "A1-B2",
        rating: 5
      }
    ]
  },
  {
    category: "Official Grammar References",
    items: [
      {
        title: "Bescherelle La Conjugaison",
        author: "Bescherelle",
        description: "The definitive French verb conjugation reference used by native French speakers. Contains complete conjugation tables for over 12,000 verbs.",
        why: "Essential for mastering French verb conjugations. Complements our grammar lessons by providing complete conjugation patterns.",
        url: "https://www.bescherelle.com/",
        buyLinks: [
          { name: "Amazon", url: "https://www.amazon.com/Bescherelle-Complete-Guide-Conjugating-000/dp/2218951983/" }
        ],
        level: "All Levels",
        rating: 5
      },
      {
        title: "Le Bon Usage (Grevisse)",
        author: "Maurice Grevisse",
        description: "The ultimate French grammar authority, often called the 'Bible of French Grammar'. Comprehensive reference covering every grammatical rule with literary examples.",
        why: "For advanced learners seeking authoritative answers to complex grammar questions. Perfect for resolving grammar debates.",
        url: "https://www.deboecksuperieur.com/ouvrage/9782807320710-le-bon-usage",
        level: "B2-C2",
        rating: 5
      }
    ]
  },
  {
    category: "Online Grammar Resources",
    items: [
      {
        title: "Lawless French",
        author: "Laura K. Lawless",
        description: "Comprehensive free online French grammar lessons with clear explanations, examples, and quizzes. Covers all levels from beginner to advanced.",
        why: "Excellent supplementary resource for when you want additional explanations or examples beyond our in-app lessons.",
        url: "https://www.lawlessfrench.com/",
        level: "A1-C1",
        rating: 5,
        free: true
      },
      {
        title: "Kwiziq French",
        author: "Kwiziq",
        description: "AI-powered French learning platform with grammar lessons organized by CEFR level. Adaptive testing identifies your weak points.",
        why: "Great for additional grammar practice with instant feedback. Their progress tracking complements our system.",
        url: "https://french.kwiziq.com/",
        level: "A1-C1",
        rating: 4
      },
      {
        title: "Français Facile",
        author: "Various Contributors",
        description: "Comprehensive French learning website with thousands of free exercises covering grammar, vocabulary, and conjugation.",
        why: "Massive library of practice exercises organized by topic. Useful for extra practice on specific grammar points.",
        url: "https://www.francaisfacile.com/",
        level: "A1-B2",
        rating: 4,
        free: true
      },
      {
        title: "Lingolia French Grammar",
        author: "Lingolia",
        description: "Well-organized grammar explanations with clear examples and free exercises. Available in multiple interface languages.",
        why: "Excellent visual explanations and clean interface. Good for quick grammar reviews.",
        url: "https://francais.lingolia.com/en/grammar",
        level: "A1-B2",
        rating: 4,
        free: true
      }
    ]
  },
  {
    category: "Academic & University Resources",
    items: [
      {
        title: "University of Texas - Tex's French Grammar",
        author: "University of Texas at Austin",
        description: "Free, comprehensive online French grammar with audio examples, exercises, and cultural notes. Created by language educators.",
        why: "High-quality academic resource with systematic grammar coverage. Trusted by language learners worldwide.",
        url: "https://www.laits.utexas.edu/tex/",
        level: "A1-B2",
        rating: 5,
        free: true
      },
      {
        title: "About French - ThoughtCo",
        author: "ThoughtCo",
        description: "Extensive collection of French grammar articles with detailed explanations and examples covering hundreds of topics.",
        why: "Easy-to-understand explanations perfect for quick reference when you encounter unfamiliar grammar.",
        url: "https://www.thoughtco.com/french-grammar-4133463",
        level: "A1-B2",
        rating: 4,
        free: true
      }
    ]
  },
  {
    category: "Verb Conjugation Tools",
    items: [
      {
        title: "Conjugaison - Le Monde",
        author: "Le Monde",
        description: "Official conjugation tool from Le Monde newspaper. Complete conjugation tables for all French verbs.",
        why: "Authoritative source from a major French publication. Quick and accurate conjugation lookups.",
        url: "https://conjugaison.lemonde.fr/",
        level: "All Levels",
        rating: 5,
        free: true
      },
      {
        title: "Reverso Conjugation",
        author: "Reverso",
        description: "Popular conjugation tool with pronunciation audio, example sentences, and synonym suggestions.",
        why: "Includes real-world example sentences showing how verbs are used in context. Audio helps with pronunciation.",
        url: "https://conjugator.reverso.net/conjugation-french.html",
        level: "All Levels",
        rating: 4,
        free: true
      },
      {
        title: "Verb2Verbe",
        author: "Verb2Verbe",
        description: "Simple, fast conjugation reference with English translations and verb groups categorization.",
        why: "Clean, distraction-free interface for quick conjugation lookups.",
        url: "https://www.verb2verbe.com/",
        level: "All Levels",
        rating: 4,
        free: true
      }
    ]
  },
  {
    category: "Additional Textbooks",
    items: [
      {
        title: "Easy French Step-by-Step",
        author: "Myrna Bell Rochester",
        description: "Progressive grammar instruction building from fundamentals to advanced topics. Great for self-study beginners.",
        why: "Alternative approach to grammar with step-by-step progression. Good for learners who want extra beginner support.",
        buyLinks: [
          { name: "Amazon", url: "https://www.amazon.com/French-Step-Step-Myrna-Rochester/dp/0071453873/" }
        ],
        level: "A1-B1",
        rating: 4
      },
      {
        title: "Schaum's Outline of French Grammar",
        author: "Mary Crocker",
        description: "Classic grammar reference with 400+ practice exercises and clear explanations of French grammar rules.",
        why: "Exercise-heavy approach perfect for learners who learn best through practice problems.",
        buyLinks: [
          { name: "Amazon", url: "https://www.amazon.com/Schaums-Outline-French-Grammar-Crocker/dp/0071828982/" }
        ],
        level: "A1-B2",
        rating: 4
      },
      {
        title: "Assimil - French With Ease",
        author: "Assimil",
        description: "Unique passive then active learning method. Daily lessons with dialogues, grammar notes, and exercises.",
        why: "Different methodology that complements structured grammar study with immersive dialogue-based learning.",
        buyLinks: [
          { name: "Amazon", url: "https://www.amazon.com/Assimil-French-Ease-day/dp/2700570022/" }
        ],
        level: "A1-B2",
        rating: 5
      }
    ]
  }
]

export default function GrammarReferencePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <Link href="https://clbfrench.ravijha.co/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
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
      <section className="py-16 bg-gradient-to-br from-amber-50 via-white to-orange-50 dark:from-amber-950/20 dark:via-background dark:to-orange-950/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-4 bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300">
              Resource Library
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              French Grammar Reference Library
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              A curated collection of the best French grammar resources, textbooks, and online tools 
              to complement your CLB French Trainer studies. From essential textbooks to authoritative 
              online references.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">

            {/* Featured Book */}
            <div className="mb-12">
              <Card className="border-2 border-amber-500/50 shadow-xl overflow-hidden">
                <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white py-3 px-6">
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 fill-white" />
                    <span className="font-bold">OUR RECOMMENDED TEXTBOOK</span>
                  </div>
                </div>
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="flex-shrink-0">
                      <div className="w-40 h-52 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg shadow-lg flex items-center justify-center p-4">
                        <div className="text-center text-white">
                          <BookOpen className="h-12 w-12 mx-auto mb-2" />
                          <p className="text-xs font-bold leading-tight">Practice Makes Perfect</p>
                          <p className="text-[10px] mt-1 opacity-80">Complete French Grammar</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-2">Practice Makes Perfect: Complete French Grammar</h3>
                      <p className="text-muted-foreground mb-1">by Annie Heminway</p>
                      <div className="flex items-center gap-2 mb-4">
                        <div className="flex">
                          {[1,2,3,4,5].map(i => (
                            <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                        <Badge variant="outline">A1-B2</Badge>
                        <Badge className="bg-green-100 text-green-700">Essential</Badge>
                      </div>
                      <p className="text-muted-foreground mb-4">
                        This is the cornerstone textbook our entire curriculum is built upon. Our platform's 
                        grammar lessons follow this book's proven progression from basic articles through complex 
                        subjunctive. Each daily lesson references specific chapters, allowing you to dive deeper 
                        with additional exercises.
                      </p>
                      <div className="p-4 bg-amber-50 dark:bg-amber-900/10 rounded-lg mb-4">
                        <p className="text-sm font-medium text-amber-800 dark:text-amber-200">
                          💡 <strong>How to use with our platform:</strong> When completing daily grammar lessons, 
                          note the chapter reference. Read that chapter in the book and complete the exercises 
                          for reinforced learning.
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-3">
                        <a href="https://www.amazon.com/Practice-Makes-Perfect-Complete-Grammar/dp/1260463176/" target="_blank" rel="noopener noreferrer">
                          <Button className="bg-amber-600 hover:bg-amber-700">
                            <ShoppingCart className="mr-2 h-4 w-4" />
                            Buy on Amazon
                            <ExternalLink className="ml-2 h-3 w-3" />
                          </Button>
                        </a>
                        <a href="https://www.barnesandnoble.com/w/practice-makes-perfect-complete-french-grammar-annie-heminway/1100026890" target="_blank" rel="noopener noreferrer">
                          <Button variant="outline">
                            Barnes & Noble
                            <ExternalLink className="ml-2 h-3 w-3" />
                          </Button>
                        </a>
                        <a href="https://www.chapters.indigo.ca/en-ca/books/practice-makes-perfect-complete-french/9781260463170-item.html" target="_blank" rel="noopener noreferrer">
                          <Button variant="outline">
                            Indigo (Canada)
                            <ExternalLink className="ml-2 h-3 w-3" />
                          </Button>
                        </a>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Resource Categories */}
            {grammarResources.slice(1).map((category, catIndex) => (
              <div key={catIndex} className="mb-12">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  {category.category === "Official Grammar References" && <BookMarked className="h-6 w-6 text-blue-600" />}
                  {category.category === "Online Grammar Resources" && <Globe className="h-6 w-6 text-green-600" />}
                  {category.category === "Academic & University Resources" && <GraduationCap className="h-6 w-6 text-purple-600" />}
                  {category.category === "Verb Conjugation Tools" && <Library className="h-6 w-6 text-orange-600" />}
                  {category.category === "Additional Textbooks" && <BookOpen className="h-6 w-6 text-pink-600" />}
                  {category.category}
                </h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {category.items.map((resource, resIndex) => (
                    <Card key={resIndex} className="border shadow-md hover:shadow-lg transition-shadow">
                      <CardHeader className="pb-2">
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-lg">{resource.title}</CardTitle>
                            <CardDescription>{resource.author}</CardDescription>
                          </div>
                          {resource.free && (
                            <Badge className="bg-green-100 text-green-700">Free</Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`h-3 w-3 ${i < resource.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`} 
                              />
                            ))}
                          </div>
                          <Badge variant="outline" className="text-xs">{resource.level}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <p className="text-sm text-muted-foreground">{resource.description}</p>
                        <div className="p-3 bg-muted/50 rounded-lg">
                          <p className="text-xs">
                            <strong className="text-primary">Why we recommend:</strong> {resource.why}
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {resource.url && (
                            <a href={resource.url} target="_blank" rel="noopener noreferrer">
                              <Button variant="outline" size="sm">
                                <LinkIcon className="mr-1 h-3 w-3" />
                                Visit Site
                                <ExternalLink className="ml-1 h-3 w-3" />
                              </Button>
                            </a>
                          )}
                          {resource.buyLinks?.map((link, linkIndex) => (
                            <a key={linkIndex} href={link.url} target="_blank" rel="noopener noreferrer">
                              <Button variant="outline" size="sm">
                                <ShoppingCart className="mr-1 h-3 w-3" />
                                {link.name}
                                <ExternalLink className="ml-1 h-3 w-3" />
                              </Button>
                            </a>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}

            {/* How to Use These Resources */}
            <Card className="mb-12 border-0 shadow-lg bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Award className="h-5 w-5 text-blue-600" />
                  How to Use These Resources with CLB French Trainer
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">1</div>
                      <div>
                        <h4 className="font-semibold">Primary Learning: Our Platform</h4>
                        <p className="text-sm text-muted-foreground">Complete daily lessons and quizzes on CLB French Trainer first</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">2</div>
                      <div>
                        <h4 className="font-semibold">Deep Dive: Textbook</h4>
                        <p className="text-sm text-muted-foreground">Read the corresponding chapter in Practice Makes Perfect for extra exercises</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">3</div>
                      <div>
                        <h4 className="font-semibold">Quick Reference: Online Tools</h4>
                        <p className="text-sm text-muted-foreground">Use Lawless French or Lingolia when you need extra explanations</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">4</div>
                      <div>
                        <h4 className="font-semibold">Conjugation Help: Bescherelle</h4>
                        <p className="text-sm text-muted-foreground">Keep a conjugation reference handy for verb practice</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* CTA */}
            <div className="text-center py-12 bg-gradient-to-br from-amber-50 to-orange-100 dark:from-amber-900/20 dark:to-orange-800/20 rounded-2xl">
              <h3 className="text-2xl font-bold mb-4">Ready to Master French Grammar?</h3>
              <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                Combine our structured platform with these resources for the most effective 
                TEF Canada preparation possible. Get AI-powered writing feedback and interactive audio practice!
              </p>
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                <Badge className="bg-blue-100 text-blue-700">🤖 AI Writing Evaluation</Badge>
                <Badge className="bg-violet-100 text-violet-700">🎧 Audio Listening Practice</Badge>
                <Badge className="bg-green-100 text-green-700">📝 Sample Answers</Badge>
              </div>
              <Link href="/dashboard">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  Start Your Grammar Journey
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
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
            <Link href="/resources/tef-preparation" className="hover:text-white ml-2">TEF Preparation</Link> | 
            <Link href="/resources/faq" className="hover:text-white ml-2">FAQ</Link>
          </p>
        </div>
      </footer>
    </div>
  )
}
