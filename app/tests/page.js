'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { toast } from 'sonner'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import Cookies from 'js-cookie'
import { 
  Headphones, FileText, PenTool, Mic, Clock, 
  ChevronLeft, ChevronRight, Check, X, Play, Pause,
  Home, Trophy, Target, Moon, Sun, Volume2, AlertTriangle,
  BookOpen, ArrowLeft, RotateCcw, Eye, CheckCircle2, XCircle,
  Lock, Crown
} from 'lucide-react'
import { 
  TEF_TEST_STRUCTURE, 
  LISTENING_TESTS, 
  READING_TESTS, 
  WRITING_TESTS, 
  SPEAKING_TESTS,
  calculateCLBScore 
} from '@/lib/tef-tests'

// Icon mapping
const iconMap = {
  Headphones: Headphones,
  FileText: FileText,
  PenTool: PenTool,
  Mic: Mic
}

// Format time display
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

// Timer Component
function TestTimer({ duration, onTimeUp, isActive }) {
  const [timeLeft, setTimeLeft] = useState(duration * 60)
  
  useEffect(() => {
    if (!isActive) return
    
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          onTimeUp()
          return 0
        }
        return prev - 1
      })
    }, 1000)
    
    return () => clearInterval(interval)
  }, [isActive, onTimeUp])
  
  const progress = ((duration * 60 - timeLeft) / (duration * 60)) * 100
  const isLowTime = timeLeft < 300 // Less than 5 minutes
  
  return (
    <div className={`flex items-center gap-3 px-4 py-2 rounded-lg ${isLowTime ? 'bg-red-500/10 text-red-600' : 'bg-muted'}`}>
      <Clock className={`h-5 w-5 ${isLowTime ? 'animate-pulse' : ''}`} />
      <span className="font-mono text-lg font-bold">{formatTime(timeLeft)}</span>
      <Progress value={progress} className="w-24 h-2" />
    </div>
  )
}

// Test Selection Page
function TestSelection({ onSelectTest, accessibleExams, subscriptionTier, isAdmin }) {
  const { theme, setTheme } = useTheme()
  
  const testTypes = [
    { key: 'comprehensionOrale', tests: LISTENING_TESTS, color: 'purple' },
    { key: 'comprehensionEcrite', tests: READING_TESTS, color: 'orange' },
    { key: 'expressionEcrite', tests: WRITING_TESTS, color: 'pink' },
    { key: 'expressionOrale', tests: SPEAKING_TESTS, color: 'green' }
  ]
  
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b sticky top-0 bg-background/95 backdrop-blur z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Dashboard</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <h1 className="font-bold text-lg">TEF Practice Tests</h1>
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
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">TEF Mock Exams</h2>
          <p className="text-muted-foreground">Practice with TEF-style questions to prepare for your exam</p>
        </div>
        
        {/* Test Categories */}
        <div className="grid gap-6 md:grid-cols-2">
          {testTypes.map(({ key, tests, color }) => {
            const structure = TEF_TEST_STRUCTURE[key]
            const Icon = iconMap[structure.icon]
            
            return (
              <Card key={key} className="overflow-hidden">
                <CardHeader className={`bg-${color}-500/10 border-b`}>
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-lg bg-${color}-500/20`}>
                      <Icon className={`h-6 w-6 text-${color}-600`} />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{structure.name}</CardTitle>
                      <CardDescription>{structure.nameEn}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" /> {structure.duration} min
                    </span>
                    <span className="flex items-center gap-1">
                      <Target className="h-4 w-4" /> {structure.totalQuestions} questions
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{structure.description}</p>
                  
                  {/* Available Tests */}
                  <div className="space-y-2">
                    {tests.map(test => (
                      <Button
                        key={test.id}
                        variant="outline"
                        className="w-full justify-between"
                        onClick={() => onSelectTest(key, test)}
                      >
                        <span>{test.title}</span>
                        <Badge variant="secondary">{test.level}</Badge>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
        
        {/* Instructions Card */}
        <Card className="mt-8 border-blue-500/30 bg-blue-500/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Test Instructions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Each test simulates real TEF exam conditions with time limits</li>
              <li>• Complete all questions before the timer runs out</li>
              <li>• Your score will be converted to CLB level at the end</li>
              <li>• You can review your answers after completing the test</li>
              <li>• Practice regularly to improve your scores</li>
            </ul>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

// Listening/Reading Test Component
function MultipleChoiceTest({ testType, test, onComplete, onBack }) {
  const [currentSection, setCurrentSection] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})
  const [isActive, setIsActive] = useState(true)
  const [showResults, setShowResults] = useState(false)
  
  const structure = TEF_TEST_STRUCTURE[testType]
  const allQuestions = test.sections.flatMap(s => s.questions)
  const totalQuestions = allQuestions.length
  
  const currentSectionData = test.sections[currentSection]
  const currentQuestionData = currentSectionData?.questions[currentQuestion]
  
  // Calculate flat question index
  let flatIndex = 0
  for (let i = 0; i < currentSection; i++) {
    flatIndex += test.sections[i].questions.length
  }
  flatIndex += currentQuestion
  
  const handleAnswer = (value) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestionData.id]: parseInt(value)
    }))
  }
  
  const goToNext = () => {
    if (currentQuestion < currentSectionData.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
    } else if (currentSection < test.sections.length - 1) {
      setCurrentSection(prev => prev + 1)
      setCurrentQuestion(0)
    }
  }
  
  const goToPrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1)
    } else if (currentSection > 0) {
      setCurrentSection(prev => prev - 1)
      setCurrentQuestion(test.sections[currentSection - 1].questions.length - 1)
    }
  }
  
  const handleTimeUp = useCallback(() => {
    setIsActive(false)
    toast.error('Time is up!')
    calculateResults()
  }, [])
  
  const calculateResults = () => {
    let correct = 0
    allQuestions.forEach(q => {
      if (answers[q.id] === q.correctAnswer) {
        correct++
      }
    })
    const score = Math.round((correct / totalQuestions) * 100)
    const clbResult = calculateCLBScore(score)
    
    setShowResults(true)
    onComplete({
      answers,
      correct,
      total: totalQuestions,
      score,
      clb: clbResult
    })
  }
  
  const handleSubmit = () => {
    setIsActive(false)
    calculateResults()
  }
  
  if (showResults) {
    return (
      <ResultsView 
        testType={testType}
        test={test}
        answers={answers}
        onBack={onBack}
      />
    )
  }
  
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b sticky top-0 bg-background/95 backdrop-blur z-50">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" size="sm">
                  <X className="h-4 w-4 mr-2" /> Exit Test
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Exit Test?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Your progress will be lost. Are you sure you want to exit?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Continue Test</AlertDialogCancel>
                  <AlertDialogAction onClick={onBack}>Exit</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <Badge variant="outline">{structure.name}</Badge>
          </div>
          
          <TestTimer 
            duration={structure.duration} 
            onTimeUp={handleTimeUp}
            isActive={isActive}
          />
        </div>
      </header>
      
      {/* Progress Bar */}
      <div className="border-b">
        <div className="max-w-4xl mx-auto px-4 py-2">
          <div className="flex items-center justify-between text-sm mb-1">
            <span>Question {flatIndex + 1} of {totalQuestions}</span>
            <span>{Object.keys(answers).length} answered</span>
          </div>
          <Progress value={(flatIndex + 1) / totalQuestions * 100} className="h-2" />
        </div>
      </div>
      
      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-6">
        {/* Section Info */}
        <div className="mb-6">
          <Badge className="mb-2">{currentSectionData.name}</Badge>
          <p className="text-sm text-muted-foreground">{currentSectionData.description}</p>
        </div>
        
        {/* Question Card */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            {/* Audio Description for Listening */}
            {testType === 'comprehensionOrale' && currentQuestionData.audioDescription && (
              <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Volume2 className="h-5 w-5 text-purple-600" />
                  <span className="font-medium text-purple-600">Audio</span>
                </div>
                <p className="text-sm italic text-muted-foreground">{currentQuestionData.audioDescription}</p>
                {currentQuestionData.audioText && (
                  <div className="mt-2 p-3 bg-muted/50 rounded text-sm">
                    <p className="font-medium mb-1">Transcript (for practice):</p>
                    <p className="text-muted-foreground">{currentQuestionData.audioText}</p>
                  </div>
                )}
              </div>
            )}
            
            {/* Text for Reading */}
            {testType === 'comprehensionEcrite' && currentQuestionData.text && (
              <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4 mb-4">
                <pre className="whitespace-pre-wrap font-sans text-sm">{currentQuestionData.text}</pre>
              </div>
            )}
            
            {/* Question */}
            <h3 className="text-lg font-medium mb-4">
              {currentQuestionData.id}. {currentQuestionData.question}
            </h3>
            
            {/* Options */}
            <RadioGroup
              value={answers[currentQuestionData.id]?.toString() || ''}
              onValueChange={handleAnswer}
              className="space-y-3"
            >
              {currentQuestionData.options.map((option, idx) => (
                <div
                  key={idx}
                  className={`flex items-center space-x-3 p-3 rounded-lg border transition-colors ${
                    answers[currentQuestionData.id] === idx
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <RadioGroupItem value={idx.toString()} id={`option-${idx}`} />
                  <Label htmlFor={`option-${idx}`} className="flex-1 cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>
        
        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={goToPrev}
            disabled={flatIndex === 0}
          >
            <ChevronLeft className="h-4 w-4 mr-2" /> Previous
          </Button>
          
          {flatIndex === totalQuestions - 1 ? (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button>
                  Submit Test <Check className="h-4 w-4 ml-2" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Submit Test?</AlertDialogTitle>
                  <AlertDialogDescription>
                    You have answered {Object.keys(answers).length} out of {totalQuestions} questions.
                    Are you sure you want to submit?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Review Answers</AlertDialogCancel>
                  <AlertDialogAction onClick={handleSubmit}>Submit</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          ) : (
            <Button onClick={goToNext}>
              Next <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          )}
        </div>
        
        {/* Question Navigator */}
        <Card className="mt-6">
          <CardHeader className="py-3">
            <CardTitle className="text-sm">Question Navigator</CardTitle>
          </CardHeader>
          <CardContent className="pb-4">
            <div className="flex flex-wrap gap-2">
              {allQuestions.map((q, idx) => {
                const isAnswered = answers[q.id] !== undefined
                const isCurrent = idx === flatIndex
                
                return (
                  <button
                    key={q.id}
                    className={`w-8 h-8 text-sm rounded-md border transition-colors ${
                      isCurrent
                        ? 'bg-primary text-primary-foreground border-primary'
                        : isAnswered
                        ? 'bg-green-500/20 border-green-500 text-green-600'
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => {
                      // Find section and question index
                      let count = 0
                      for (let s = 0; s < test.sections.length; s++) {
                        for (let qi = 0; qi < test.sections[s].questions.length; qi++) {
                          if (count === idx) {
                            setCurrentSection(s)
                            setCurrentQuestion(qi)
                            return
                          }
                          count++
                        }
                      }
                    }}
                  >
                    {idx + 1}
                  </button>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

// Writing Test Component  
function WritingTest({ test, onComplete, onBack }) {
  const [currentTask, setCurrentTask] = useState(0)
  const [responses, setResponses] = useState({})
  const [isActive, setIsActive] = useState(true)
  const [showResults, setShowResults] = useState(false)
  
  const structure = TEF_TEST_STRUCTURE.expressionEcrite
  const allTasks = test.sections.flatMap(s => s.tasks)
  const totalTasks = allTasks.length
  const currentSection = test.sections[currentTask]
  const currentTaskData = currentSection?.tasks[0]
  
  const handleResponseChange = (value) => {
    setResponses(prev => ({
      ...prev,
      [currentTaskData.id]: value
    }))
  }
  
  const wordCount = (responses[currentTaskData?.id] || '').split(/\s+/).filter(w => w.length > 0).length
  
  const handleTimeUp = useCallback(() => {
    setIsActive(false)
    toast.error('Time is up!')
    setShowResults(true)
  }, [])
  
  const handleSubmit = () => {
    setIsActive(false)
    setShowResults(true)
    onComplete({
      responses,
      tasks: allTasks
    })
  }
  
  if (showResults) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b">
          <div className="max-w-4xl mx-auto px-4 h-16 flex items-center">
            <Button variant="ghost" onClick={onBack}>
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Tests
            </Button>
          </div>
        </header>
        
        <main className="max-w-4xl mx-auto px-4 py-8">
          <Card className="mb-6">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Writing Test Complete!</CardTitle>
              <CardDescription>Review your responses below</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-6">
                <p className="text-muted-foreground">
                  Writing tests are evaluated by examiners based on criteria such as:
                </p>
                <ul className="text-sm text-muted-foreground mt-2">
                  <li>• Task completion and relevance</li>
                  <li>• Vocabulary range and accuracy</li>
                  <li>• Grammar and sentence structure</li>
                  <li>• Coherence and cohesion</li>
                </ul>
              </div>
            </CardContent>
          </Card>
          
          {allTasks.map((task, idx) => (
            <Card key={task.id} className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg">Task {idx + 1}</CardTitle>
                <CardDescription>{test.sections[idx].name}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted/50 rounded-lg p-4 mb-4">
                  <p className="text-sm whitespace-pre-wrap">{task.prompt}</p>
                </div>
                
                <h4 className="font-medium mb-2">Your Response:</h4>
                <div className="bg-muted/30 rounded-lg p-4 mb-4">
                  <p className="whitespace-pre-wrap">{responses[task.id] || '(No response)'}</p>
                </div>
                
                <h4 className="font-medium mb-2">Sample Answer:</h4>
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                  <p className="whitespace-pre-wrap text-sm">{task.sampleAnswer}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </main>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b sticky top-0 bg-background/95 backdrop-blur z-50">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" size="sm">
                  <X className="h-4 w-4 mr-2" /> Exit
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Exit Test?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Your progress will be lost.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Continue</AlertDialogCancel>
                  <AlertDialogAction onClick={onBack}>Exit</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <Badge variant="outline">{structure.name}</Badge>
          </div>
          
          <TestTimer 
            duration={structure.duration} 
            onTimeUp={handleTimeUp}
            isActive={isActive}
          />
        </div>
      </header>
      
      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="mb-6">
          <Badge className="mb-2">{currentSection.name}</Badge>
          <p className="text-sm text-muted-foreground">{currentSection.description}</p>
        </div>
        
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="bg-pink-500/10 border border-pink-500/20 rounded-lg p-4 mb-4">
              <pre className="whitespace-pre-wrap font-sans text-sm">{currentTaskData.prompt}</pre>
            </div>
            
            <div className="flex items-center justify-between mb-2">
              <Label>Your Response:</Label>
              <span className={`text-sm ${
                wordCount < currentTaskData.wordLimit.min 
                  ? 'text-orange-500' 
                  : wordCount > currentTaskData.wordLimit.max 
                  ? 'text-red-500' 
                  : 'text-green-500'
              }`}>
                {wordCount} / {currentTaskData.wordLimit.min}-{currentTaskData.wordLimit.max} words
              </span>
            </div>
            
            <Textarea
              value={responses[currentTaskData.id] || ''}
              onChange={(e) => handleResponseChange(e.target.value)}
              placeholder="Write your response here..."
              className="min-h-[300px] font-sans"
            />
            
            <div className="mt-4">
              <p className="text-sm font-medium text-muted-foreground mb-2">Evaluation Criteria:</p>
              <div className="flex flex-wrap gap-2">
                {currentTaskData.criteria.map((c, i) => (
                  <Badge key={i} variant="outline" className="text-xs">{c}</Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={() => setCurrentTask(prev => prev - 1)}
            disabled={currentTask === 0}
          >
            <ChevronLeft className="h-4 w-4 mr-2" /> Previous
          </Button>
          
          {currentTask === totalTasks - 1 ? (
            <Button onClick={handleSubmit}>
              Submit <Check className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Button onClick={() => setCurrentTask(prev => prev + 1)}>
              Next Task <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          )}
        </div>
      </main>
    </div>
  )
}

// Speaking Test Component
function SpeakingTest({ test, onComplete, onBack }) {
  const [currentTask, setCurrentTask] = useState(0)
  const [phase, setPhase] = useState('prep') // prep, speak, done
  const [prepTimeLeft, setPrepTimeLeft] = useState(0)
  const [isRecording, setIsRecording] = useState(false)
  const [showResults, setShowResults] = useState(false)
  
  const structure = TEF_TEST_STRUCTURE.expressionOrale
  const allTasks = test.sections.flatMap(s => s.tasks)
  const currentSection = test.sections[currentTask]
  const currentTaskData = currentSection?.tasks[0]
  
  useEffect(() => {
    if (currentTaskData) {
      setPrepTimeLeft(currentSection.prepTime * 60)
      setPhase('prep')
    }
  }, [currentTask])
  
  useEffect(() => {
    if (phase !== 'prep' || prepTimeLeft <= 0) return
    
    const interval = setInterval(() => {
      setPrepTimeLeft(prev => {
        if (prev <= 1) {
          setPhase('speak')
          return 0
        }
        return prev - 1
      })
    }, 1000)
    
    return () => clearInterval(interval)
  }, [phase, prepTimeLeft])
  
  const startSpeaking = () => {
    setPhase('speak')
    setIsRecording(true)
  }
  
  const stopRecording = () => {
    setIsRecording(false)
    setPhase('done')
  }
  
  const nextTask = () => {
    if (currentTask < allTasks.length - 1) {
      setCurrentTask(prev => prev + 1)
    } else {
      setShowResults(true)
      onComplete({ tasks: allTasks })
    }
  }
  
  if (showResults) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b">
          <div className="max-w-4xl mx-auto px-4 h-16 flex items-center">
            <Button variant="ghost" onClick={onBack}>
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Tests
            </Button>
          </div>
        </header>
        
        <main className="max-w-4xl mx-auto px-4 py-8">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Speaking Test Complete!</CardTitle>
              <CardDescription>
                In a real TEF exam, your speaking would be evaluated by trained examiners
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <p className="text-muted-foreground mb-4">Evaluation criteria include:</p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Pronunciation and fluency</li>
                  <li>• Vocabulary range</li>
                  <li>• Grammar accuracy</li>
                  <li>• Task completion</li>
                  <li>• Interaction skills</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b sticky top-0 bg-background/95 backdrop-blur z-50">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <X className="h-4 w-4 mr-2" /> Exit
            </Button>
            <Badge variant="outline">{structure.name}</Badge>
          </div>
          
          <Badge className={phase === 'prep' ? 'bg-orange-500' : phase === 'speak' ? 'bg-red-500' : 'bg-green-500'}>
            {phase === 'prep' ? `Prep: ${formatTime(prepTimeLeft)}` : phase === 'speak' ? 'Recording...' : 'Done'}
          </Badge>
        </div>
      </header>
      
      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="mb-6">
          <Badge className="mb-2">{currentSection.name}</Badge>
          <p className="text-sm text-muted-foreground">{currentSection.description}</p>
          <p className="text-sm text-muted-foreground mt-1">
            Preparation: {currentSection.prepTime} min | Speaking: {currentSection.speakTime} min
          </p>
        </div>
        
        <Card className="mb-6">
          <CardContent className="pt-6">
            {/* Task Content */}
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 mb-4">
              {currentTaskData.scenario ? (
                <pre className="whitespace-pre-wrap font-sans text-sm">{currentTaskData.scenario}</pre>
              ) : (
                <pre className="whitespace-pre-wrap font-sans text-sm">{currentTaskData.topic}</pre>
              )}
            </div>
            
            {/* Suggested Points */}
            {currentTaskData.suggestedQuestions && (
              <div className="mb-4">
                <p className="font-medium text-sm mb-2">Suggested questions to ask:</p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  {currentTaskData.suggestedQuestions.map((q, i) => (
                    <li key={i}>• {q}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {currentTaskData.suggestedPoints && (
              <div className="mb-4">
                <p className="font-medium text-sm mb-2">Points to cover:</p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  {currentTaskData.suggestedPoints.map((p, i) => (
                    <li key={i}>• {p}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* Recording Controls */}
            <div className="flex items-center justify-center gap-4 mt-6">
              {phase === 'prep' && (
                <Button onClick={startSpeaking}>
                  <Mic className="h-4 w-4 mr-2" /> Start Speaking
                </Button>
              )}
              
              {phase === 'speak' && (
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-red-500 animate-pulse mx-auto mb-4 flex items-center justify-center">
                    <Mic className="h-8 w-8 text-white" />
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">Recording in progress...</p>
                  <Button variant="destructive" onClick={stopRecording}>
                    Stop Recording
                  </Button>
                </div>
              )}
              
              {phase === 'done' && (
                <div className="text-center">
                  <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <p className="text-sm text-muted-foreground mb-4">Recording complete!</p>
                  <Button onClick={nextTask}>
                    {currentTask < allTasks.length - 1 ? 'Next Task' : 'Finish Test'}
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

// Results View Component
function ResultsView({ testType, test, answers, onBack }) {
  const allQuestions = test.sections.flatMap(s => s.questions)
  const totalQuestions = allQuestions.length
  
  let correct = 0
  allQuestions.forEach(q => {
    if (answers[q.id] === q.correctAnswer) {
      correct++
    }
  })
  
  const score = Math.round((correct / totalQuestions) * 100)
  const clbResult = calculateCLBScore(score)
  
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Tests
          </Button>
        </div>
      </header>
      
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Score Card */}
        <Card className="mb-6">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Test Complete!</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 text-center mb-6">
              <div className="p-4 rounded-lg bg-muted">
                <p className="text-3xl font-bold">{correct}/{totalQuestions}</p>
                <p className="text-sm text-muted-foreground">Correct Answers</p>
              </div>
              <div className="p-4 rounded-lg bg-primary/10">
                <p className="text-3xl font-bold text-primary">{score}%</p>
                <p className="text-sm text-muted-foreground">Score</p>
              </div>
              <div className="p-4 rounded-lg bg-green-500/10">
                <p className="text-3xl font-bold text-green-600">CLB {clbResult.clb}</p>
                <p className="text-sm text-muted-foreground">{clbResult.cefr} Level</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Answer Review */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" /> Review Answers
            </CardTitle>
          </CardHeader>
          <CardContent>
            {test.sections.map(section => (
              <div key={section.id} className="mb-6">
                <h4 className="font-medium mb-3">{section.name}</h4>
                <div className="space-y-4">
                  {section.questions.map(q => {
                    const userAnswer = answers[q.id]
                    const isCorrect = userAnswer === q.correctAnswer
                    
                    return (
                      <div 
                        key={q.id} 
                        className={`p-4 rounded-lg border ${
                          isCorrect ? 'border-green-500/30 bg-green-500/5' : 'border-red-500/30 bg-red-500/5'
                        }`}
                      >
                        <div className="flex items-start gap-2 mb-2">
                          {isCorrect ? (
                            <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                          ) : (
                            <XCircle className="h-5 w-5 text-red-500 mt-0.5" />
                          )}
                          <div className="flex-1">
                            <p className="font-medium">{q.id}. {q.question}</p>
                          </div>
                        </div>
                        
                        <div className="ml-7 text-sm">
                          {!isCorrect && userAnswer !== undefined && (
                            <p className="text-red-600 mb-1">
                              Your answer: {q.options[userAnswer]}
                            </p>
                          )}
                          <p className="text-green-600">
                            Correct answer: {q.options[q.correctAnswer]}
                          </p>
                          {q.explanation && (
                            <p className="text-muted-foreground mt-2 italic">
                              💡 {q.explanation}
                            </p>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

// Main Page Component
export default function TestsPage() {
  const [currentView, setCurrentView] = useState('selection')
  const [selectedTestType, setSelectedTestType] = useState(null)
  const [selectedTest, setSelectedTest] = useState(null)
  const [testResults, setTestResults] = useState(null)
  
  const handleSelectTest = (type, test) => {
    setSelectedTestType(type)
    setSelectedTest(test)
    setCurrentView('test')
  }
  
  const handleBack = () => {
    setCurrentView('selection')
    setSelectedTestType(null)
    setSelectedTest(null)
    setTestResults(null)
  }
  
  const handleComplete = (results) => {
    setTestResults(results)
    toast.success('Test completed!')
  }
  
  if (currentView === 'selection') {
    return <TestSelection onSelectTest={handleSelectTest} />
  }
  
  if (currentView === 'test' && selectedTest) {
    if (selectedTestType === 'comprehensionOrale' || selectedTestType === 'comprehensionEcrite') {
      return (
        <MultipleChoiceTest
          testType={selectedTestType}
          test={selectedTest}
          onComplete={handleComplete}
          onBack={handleBack}
        />
      )
    }
    
    if (selectedTestType === 'expressionEcrite') {
      return (
        <WritingTest
          test={selectedTest}
          onComplete={handleComplete}
          onBack={handleBack}
        />
      )
    }
    
    if (selectedTestType === 'expressionOrale') {
      return (
        <SpeakingTest
          test={selectedTest}
          onComplete={handleComplete}
          onBack={handleBack}
        />
      )
    }
  }
  
  return <TestSelection onSelectTest={handleSelectTest} />
}
