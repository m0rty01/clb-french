'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  HelpCircle, ArrowLeft, ChevronDown, ChevronUp, ChevronRight,
  BookOpen, Target, Clock, Brain, FileText, Users, Award,
  CreditCard, Shield, Globe, Zap, CheckCircle2, Headphones,
  Mic, PenTool, TrendingUp, Calendar
} from 'lucide-react'
import Link from 'next/link'

const faqCategories = [
  {
    title: "About CLB French Trainer",
    icon: Globe,
    faqs: [
      {
        question: "What is CLB French Trainer?",
        answer: `CLB French Trainer is a specialized online platform designed specifically for immigrants preparing for the TEF Canada or TCF Canada tests. Unlike generic French learning apps, we focus exclusively on achieving the Canadian Language Benchmark (CLB) / Niveaux de compétence linguistique canadiens (NCLC) scores required for Canadian immigration.

Our platform offers:
• Structured pathways for CLB 5 (4 months) and CLB 7 (8-12 months)
• Daily grammar lessons with quizzes
• 80 original TEF-style mock exams
• Progress tracking with weak topic identification
• Time-tracked daily routines covering all five language skills`
      },
      {
        question: "How is this different from other French learning platforms?",
        answer: `CLB French Trainer is fundamentally different from platforms like Duolingo, Babbel, or even traditional French courses:

1. **Immigration-Focused**: We target specific NCLC levels (5 and 7) required for work permits and permanent residency.

2. **Structured Day-by-Day Curriculum**: No random lessons. Each day has specific content building on the previous day.

3. **Grammar-Heavy Approach**: TEF success depends on grammar. Our curriculum follows "Practice Makes Perfect" textbook progression.

4. **TEF-Specific Mock Exams**: 80 original exams (20 per skill) matching real TEF format - something you won't find elsewhere.

5. **Disciplined Routine**: Daily activities across all five skills (grammar, listening, speaking, reading, writing) with time tracking.

6. **Weak Topic Tracking**: Our system automatically identifies grammar topics where you score below 70% for targeted review.

This structured, incremental approach doesn't exist anywhere else on the internet.`
      },
      {
        question: "Who is this platform for?",
        answer: `CLB French Trainer is ideal for:

• **Express Entry Applicants**: Need NCLC 7 for maximum CRS points or Francophone draws
• **Work Permit Holders**: Need NCLC 5 for PGWP extensions or Mobilité francophone
• **Provincial Nominee Applicants**: Many PNP streams reward French proficiency
• **International Students**: Planning to stay in Canada after graduation
• **Anyone targeting CLB 5-7**: Whether for immigration or professional reasons

The platform works best for:
• Serious, disciplined learners who can commit to daily study
• Complete beginners to intermediate French learners (A1-B1 starting level)
• Those with 4-12 months before their target exam date`
      },
      {
        question: "What makes your approach 'structured and incremental'?",
        answer: `Our structured and incremental approach means:

**Structured:**
• Every single day has pre-planned content
• Clear pathway from Day 1 to exam readiness
• Five daily activities covering all language skills
• Specific chapter references to complementary textbooks

**Incremental:**
• Grammar topics build on each other (articles → adjectives → pronouns → verbs → tenses → subjunctive)
• Each new concept uses previously learned material
• Difficulty increases gradually across the pathway
• Mock exam complexity increases as you progress

This contrasts with random YouTube videos, scattered resources, or apps that teach unconnected "bite-sized" lessons. Our system ensures no gaps in your knowledge.`
      }
    ]
  },
  {
    title: "CLB/NCLC Pathways",
    icon: Target,
    faqs: [
      {
        question: "What's the difference between CLB 5 and CLB 7 pathways?",
        answer: `**CLB 5 Pathway (4 months)**:
• Target: NCLC 5 (B1 equivalent)
• Duration: ~112 days of structured content
• Use case: Work permit extensions, Mobilité francophone, PGWP requirements
• Pace: Intensive daily study
• Grammar: Covers essential grammar from articles through basic verb tenses

**CLB 7 Pathway (8-12 months)**:
• Target: NCLC 7 (B2 equivalent)
• Duration: ~240+ days of structured content
• Use case: Express Entry, Federal Skilled Worker, Provincial Nominees, PR applications
• Pace: Comprehensive but manageable daily study
• Grammar: Complete grammar curriculum including subjunctive, conditional, advanced tenses

Both pathways include all 80 mock exams, but CLB 7 includes additional advanced content and more time for mastery.`
      },
      {
        question: "Can I switch between pathways?",
        answer: `Yes, you can switch pathways, though we recommend careful consideration:

• **CLB 5 → CLB 7**: Easy switch. Your progress transfers, and you continue with additional advanced content.
• **CLB 7 → CLB 5**: Possible if you need faster results. Your grammar progress remains, but you'll follow the accelerated timeline.

Note: Switching resets your day counter but preserves your quiz scores and weak topic tracking.

We recommend choosing based on your immigration timeline:
• Urgent need (< 5 months): Start with CLB 5
• Comfortable timeline (8+ months): Go directly to CLB 7`
      },
      {
        question: "How realistic are the 4-month and 8-12 month timelines?",
        answer: `These timelines are realistic IF you follow the program consistently:

**Requirements for success:**
• Complete daily activities without skipping days
• Address weak topics when flagged
• Study 2-3 hours daily minimum
• Complement with textbook exercises
• Take mock exams under test conditions

**Factors that may extend your timeline:**
• Starting from absolute zero French
• Limited daily study time
• Skipping days or activities
• Ignoring weak topics

**Factors that may shorten your timeline:**
• Prior French knowledge
• Ability to study 4+ hours daily
• Strong language learning aptitude
• Consistent textbook supplementation

Most users who follow the program reach their target level within the stated timeframe.`
      }
    ]
  },
  {
    title: "Grammar Learning System",
    icon: Brain,
    faqs: [
      {
        question: "How does the daily grammar system work?",
        answer: `Our grammar system delivers one topic per day in a structured progression:

1. **Daily Topic Assignment**: Based on your pathway and current day, you receive one grammar topic
2. **In-App Explanation**: Complete lesson explaining the grammar rule with examples
3. **Textbook Reference**: Link to corresponding chapter in "Practice Makes Perfect"
4. **Quiz**: 8 multiple-choice questions testing the topic
5. **Instant Feedback**: Each question shows explanation after answering
6. **Score Tracking**: Results saved to your progress

**Progression Example (First 10 Days):**
Day 1: Definite Articles (le, la, les)
Day 2: Indefinite Articles (un, une, des)
Day 3: Partitive Articles (du, de la, des)
Day 4: Noun Gender Rules
Day 5: Noun Plurals
Day 6: Adjective Agreement
Day 7: Adjective Placement
Day 8: Possessive Adjectives
Day 9: Demonstrative Adjectives
Day 10: Subject Pronouns

Each topic builds on previous knowledge.`
      },
      {
        question: "How does weak topic tracking work?",
        answer: `Our system automatically identifies and tracks your grammar weak points:

**How topics become "weak":**
• Score below 70% on a grammar quiz
• Topic is immediately flagged and added to your "Weak Topics" list

**What you can do:**
• View all weak topics in your dashboard
• Practice any weak topic anytime (retake the quiz)
• Score 70%+ to remove from weak list
• Manually mark topics as "mastered" if you're confident

**Why this matters:**
• Grammar weak points affect ALL TEF sections
• Weak grammar hurts reading comprehension
• Weak grammar hurts listening comprehension
• Weak grammar hurts writing scores
• Weak grammar hurts speaking fluency

Addressing weak topics prevents compound problems later.`
      },
      {
        question: "What if I already know some grammar topics?",
        answer: `Even if you know some topics, we recommend:

1. **Take the quiz anyway**: Verify your knowledge and get it tracked
2. **Quick review**: The quiz takes only 5-10 minutes
3. **Move on if you pass**: 70%+ means you're solid
4. **Address gaps**: You might discover gaps in topics you thought you knew

Benefits of completing all topics:
• Ensures no hidden gaps
• Builds confidence through verification
• Creates complete progress record
• Reinforces knowledge through brief review`
      }
    ]
  },
  {
    title: "TEF Mock Exams",
    icon: FileText,
    faqs: [
      {
        question: "How many mock exams are included?",
        answer: `CLB French Trainer includes 80 original TEF-style mock exams:

• **Listening (Compréhension orale)**: 20 exams
• **Reading (Compréhension écrite)**: 20 exams  
• **Writing (Expression écrite)**: 20 exams
• **Speaking (Expression orale)**: 20 exams

Each exam:
• Matches real TEF Canada format
• Includes realistic timers
• Contains original content (not copied from other sources)
• Progressively increases in difficulty
• Covers topics common on the real test`
      },
      {
        question: "Are these mock exams like the real TEF?",
        answer: `Yes, our mock exams are designed to closely match the real TEF Canada:

**Listening Section:**
• Short conversations and announcements
• Longer dialogues and interviews
• Question formats matching real TEF

**Reading Section:**
• Short informational texts
• Longer articles and documents
• Multiple choice and matching questions

**Writing Section:**
• Email/letter writing tasks
• Opinion essays
• Timed writing exercises

**Speaking Section:**
• Information gathering scenarios
• Argumentation tasks
• Common TEF speaking topics

Note: These are practice exams for preparation. Only official TEF/TCF tests are accepted by IRCC.`
      },
      {
        question: "How should I use the mock exams?",
        answer: `For maximum benefit:

**During Your Pathway:**
• Take mock exams as suggested in daily activities
• Start with easier exams, progress to harder ones
• Don't take all exams at once - spread throughout your preparation

**Best Practices:**
• Use a quiet environment (especially listening)
• Don't pause timers
• Don't look up answers during the exam
• Review mistakes after completion
• Retake exams after studying weak areas

**Before Your Real TEF:**
• Take full mock exams under test conditions
• Time yourself strictly
• Aim to complete 5-10 full practice tests
• Identify and address any remaining weak areas`
      }
    ]
  },
  {
    title: "Daily Routine & Progress",
    icon: Calendar,
    faqs: [
      {
        question: "What does a typical day on the platform look like?",
        answer: `A typical day includes these activities:

**1. Grammar (30-45 minutes)**
• Read today's grammar lesson
• Complete the 8-question quiz
• Review any incorrect answers
• Optional: Read textbook chapter for deeper understanding

**2. Listening (30-45 minutes)**
• Practice listening exercises
• Work on a mock exam section
• Focus on comprehension and note-taking

**3. Speaking (30-45 minutes)**
• Practice pronunciation
• Record speaking exercises
• Prepare responses to common TEF topics

**4. Reading (30-45 minutes)**
• Read French texts at your level
• Practice reading comprehension questions
• Build vocabulary through context

**5. Writing (30-45 minutes)**
• Practice writing tasks
• Work on grammar in context
• Build speed and accuracy

Total: 2.5-3.5 hours daily

Each activity includes specific resources and tracks your time.`
      },
      {
        question: "What happens if I miss a day?",
        answer: `Missing occasional days is normal - life happens. Here's what to do:

**If you miss one day:**
• Simply continue where you left off
• Complete missed content before moving on
• Your streak resets, but progress is preserved

**If you miss several days:**
• Resume at your current day
• Review the last few grammar topics as refresher
• Get back into the routine quickly

**To avoid falling behind:**
• Set daily study reminders
• Study at the same time each day
• Have a backup plan for busy days (minimum grammar quiz)

**Important:** Consistency matters more than perfection. A few missed days won't derail your progress, but frequent interruptions will extend your timeline.`
      },
      {
        question: "How is my progress tracked?",
        answer: `Our platform tracks multiple progress metrics:

**Daily Progress:**
• Completed activities (grammar, listening, speaking, reading, writing)
• Time spent on each activity
• Activity completion status

**Grammar Progress:**
• Quiz scores for each topic
• Weak topics list
• Topics completed vs. remaining

**Overall Progress:**
• Current day / total days
• Day streak (consecutive days)
• Total time invested
• Completion percentage

**Mock Exam Progress:**
• Exams taken
• Scores achieved
• Skills breakdown

All progress is saved to your account and visible in your dashboard.`
      }
    ]
  },
  {
    title: "AI Features & Audio",
    icon: Zap,
    faqs: [
      {
        question: "What is the AI Writing Evaluation feature?",
        answer: `Our AI Writing Evaluation uses advanced AI to provide instant, professional-quality feedback on your French writing:

**What it evaluates:**
• Task Achievement (Did you address all parts of the prompt?)
• Coherence & Cohesion (Is your text well-organized?)
• Lexical Range (Is your vocabulary varied and appropriate?)
• Grammatical Accuracy (Are grammar and spelling correct?)
• Register & Tone (Is the style appropriate?)

**What you get:**
• Score out of 25 (5 points per category)
• Estimated CLB level (CLB 4-12)
• TEF score equivalent (/450)
• List of strengths in your writing
• Specific improvement suggestions
• Grammar corrections with explanations

**Availability:** Premium plan only - unlimited AI evaluations`
      },
      {
        question: "How accurate is the AI evaluation?",
        answer: `Our AI evaluation is designed to closely mirror official TEF scoring:

**How it works:**
• Uses the same 5 criteria as official TEF Expression Écrite
• Powered by Google's advanced AI models
• Trained to evaluate French specifically

**What to expect:**
• Scores typically within ±1 level of actual TEF results
• Best for practice and identifying areas to improve
• More useful for feedback than precise score prediction

**Important:** AI evaluation is for practice. Only official TEF/TCF tests from authorized centers are accepted by IRCC for immigration applications.`
      },
      {
        question: "How does the audio player work?",
        answer: `Our listening tests include an interactive audio player that converts French text to speech:

**Features:**
• **Play/Pause/Stop** - Full control over playback
• **Speed control** - Choose from 0.75x, 1x, 1.25x, or 1.5x speed
• **Restart** - Replay audio from the beginning
• **Progress bar** - See how much audio remains
• **Collapsible transcript** - View the text when needed

**How to use it:**
1. Click Play to hear the French dialogue
2. Slow down to 0.75x if it's too fast
3. Replay sections you didn't catch
4. Only check transcript after attempting to understand

**Availability:** Basic and Premium plans

**Note:** Uses your browser's built-in French text-to-speech. For best results, use Chrome or Edge browsers.`
      },
      {
        question: "What are Sample Answers?",
        answer: `Sample Answers are model responses for all 20+ writing exercises in our daily curriculum:

**What they include:**
• Complete, well-written French response
• Appropriate length for each exercise type
• Correct grammar and vocabulary for the task
• Natural French expressions and structures

**How to use them:**
1. Attempt the writing exercise yourself first
2. Click "Sample Answer" to see the model response
3. Compare your version with the sample
4. Note vocabulary and structures you can learn
5. Try again incorporating what you learned

**Benefits:**
• Learn from native-level examples
• Understand what a good response looks like
• Build your vocabulary in context
• Improve your writing structure`
      }
    ]
  },
  {
    title: "Pricing & Plans",
    icon: CreditCard,
    faqs: [
      {
        question: "What's included in the free plan?",
        answer: `The free plan includes:

• Access to CLB 5 pathway (first 7 days)
• 3 grammar lessons per week
• 2 TEF mock exams (1 listening, 1 reading)
• Basic progress tracking
• Sample writing answers
• Community support

This lets you experience the platform before committing to a paid plan.`
      },
      {
        question: "What's included in Free vs Premium?",
        answer: `**Free Plan ($0/month):**
• 3 practice tests per month (all sections)
• Access to TEF & TCF test types
• 6 AI writing evaluations per month
• View last 3 test results
• Daily grammar lessons & vocabulary
• Basic progress tracking

**Premium Plan ($9/month or $70/year):**
• Everything in Free, plus:
• ✨ Unlimited practice tests
• ✨ Unlimited AI writing evaluations
• 📊 Full analytics & detailed reports
• 📈 Performance trends over time
• 🎯 Weak areas analysis
• 💾 Download/export test results
• 🎧 Priority support
• 🚫 Ad-free experience

Premium is recommended for serious learners who want unlimited practice and detailed performance insights.`
      },
      {
        question: "Is there a money-back guarantee?",
        answer: `Yes! We offer a 7-day money-back guarantee on all paid plans.

If you're not satisfied with the platform for any reason within your first 7 days, contact our support team for a full refund - no questions asked.

We're confident in our platform because we've seen thousands of learners achieve their CLB goals using our structured approach.`
      }
    ]
  },
  {
    title: "Technical & Support",
    icon: Shield,
    faqs: [
      {
        question: "What devices can I use?",
        answer: `CLB French Trainer works on:

• **Desktop/Laptop**: Full experience with Chrome, Firefox, Safari, Edge
• **Tablet**: Optimized for iPad and Android tablets
• **Mobile**: Responsive design for smartphones

For the best experience, we recommend:
• Desktop/laptop for writing exercises and mock exams
• Headphones for listening exercises
• Quiet environment for speaking practice`
      },
      {
        question: "How do I get help if I'm stuck?",
        answer: `We offer multiple support channels:

**Self-Help:**
• This FAQ page
• Resource guides (NCLC Guide, TEF Preparation, Grammar Reference)
• In-app tooltips and explanations

**Contact Support:**
• Email: support@clbfrenchtrainer.com
• Response time: 24-48 hours (Basic), Same day (Premium)

**Community:**
• Facebook community group (coming soon)
• Peer support from other learners`
      },
      {
        question: "Is my data secure?",
        answer: `Yes, we take data security seriously:

• All data transmitted over HTTPS
• Passwords encrypted using industry-standard hashing
• No selling of personal data to third parties
• Compliant with privacy regulations

Your learning progress and personal information are protected.`
      }
    ]
  }
]

function FAQItem({ question, answer, isOpen, onClick }) {
  return (
    <div className="border rounded-lg overflow-hidden">
      <button
        onClick={onClick}
        className="w-full px-6 py-4 flex items-center justify-between bg-muted/30 hover:bg-muted/50 transition-colors text-left"
      >
        <span className="font-medium pr-4">{question}</span>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 flex-shrink-0 text-muted-foreground" />
        ) : (
          <ChevronDown className="h-5 w-5 flex-shrink-0 text-muted-foreground" />
        )}
      </button>
      {isOpen && (
        <div className="px-6 py-4 bg-background">
          <div className="prose prose-sm dark:prose-invert max-w-none">
            {answer.split('\n\n').map((paragraph, i) => (
              <p key={i} className="text-muted-foreground whitespace-pre-wrap mb-3 last:mb-0">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default function FAQPage() {
  const [openItems, setOpenItems] = useState({})
  const [activeCategory, setActiveCategory] = useState(0)

  const toggleItem = (categoryIndex, faqIndex) => {
    const key = `${categoryIndex}-${faqIndex}`
    setOpenItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

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
      <section className="py-16 bg-gradient-to-br from-green-50 via-white to-teal-50 dark:from-green-950/20 dark:via-background dark:to-teal-950/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">
              Help Center
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-muted-foreground">
              Everything you need to know about CLB French Trainer, our structured learning approach, 
              and how we help you achieve your NCLC goals for Canadian immigration.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            
            {/* Category Navigation */}
            <div className="flex flex-wrap gap-2 mb-8 justify-center">
              {faqCategories.map((category, index) => (
                <Button
                  key={index}
                  variant={activeCategory === index ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveCategory(index)}
                  className={activeCategory === index ? "bg-blue-600" : ""}
                >
                  <category.icon className="mr-2 h-4 w-4" />
                  {category.title}
                </Button>
              ))}
            </div>

            {/* FAQ Categories */}
            {faqCategories.map((category, catIndex) => (
              <div 
                key={catIndex} 
                className={`mb-12 ${activeCategory !== catIndex ? 'hidden' : ''}`}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <category.icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h2 className="text-2xl font-bold">{category.title}</h2>
                </div>
                
                <div className="space-y-3">
                  {category.faqs.map((faq, faqIndex) => (
                    <FAQItem
                      key={faqIndex}
                      question={faq.question}
                      answer={faq.answer}
                      isOpen={openItems[`${catIndex}-${faqIndex}`]}
                      onClick={() => toggleItem(catIndex, faqIndex)}
                    />
                  ))}
                </div>
              </div>
            ))}

            {/* Still Have Questions */}
            <Card className="mt-12 border-0 shadow-lg bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
              <CardContent className="p-8 text-center">
                <HelpCircle className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Still Have Questions?</h3>
                <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
                  Can't find what you're looking for? Our support team is here to help you 
                  succeed in your French learning journey.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="outline">
                    Contact Support
                  </Button>
                  <Link href="/dashboard">
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      Start Learning Now
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

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
            <Link href="/resources/grammar-reference" className="hover:text-white ml-2">Grammar Reference</Link>
          </p>
        </div>
      </footer>
    </div>
  )
}
