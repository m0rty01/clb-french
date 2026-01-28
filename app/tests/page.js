'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Slider } from '@/components/ui/slider'
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
  Lock, Crown, Sparkles, Brain, Loader2, Square, RotateCw,
  BarChart3, Award, TrendingUp
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

// Timer Component with Countdown and Alert Sound
function TestTimer({ duration, onTimeUp, isActive }) {
  const [timeLeft, setTimeLeft] = useState(duration * 60)
  const [hasPlayedAlert, setHasPlayedAlert] = useState(false)
  const audioRef = useRef(null)
  
  // Play alert sound function
  const playAlertSound = useCallback(() => {
    if (hasPlayedAlert) return
    
    // Create audio context for alert sound
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext
      const audioContext = new AudioContext()
      
      // Create a sequence of beeps
      const playBeep = (frequency, startTime, duration) => {
        const oscillator = audioContext.createOscillator()
        const gainNode = audioContext.createGain()
        
        oscillator.connect(gainNode)
        gainNode.connect(audioContext.destination)
        
        oscillator.type = 'sine'
        oscillator.frequency.setValueAtTime(frequency, startTime)
        
        gainNode.gain.setValueAtTime(0.5, startTime)
        gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + duration)
        
        oscillator.start(startTime)
        oscillator.stop(startTime + duration)
      }
      
      const now = audioContext.currentTime
      // Play 3 ascending beeps
      playBeep(440, now, 0.2)        // A4
      playBeep(554, now + 0.25, 0.2) // C#5
      playBeep(659, now + 0.5, 0.3)  // E5
      
      setHasPlayedAlert(true)
    } catch (error) {
      console.log('Could not play alert sound:', error)
    }
  }, [hasPlayedAlert])
  
  useEffect(() => {
    if (!isActive) return
    
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          playAlertSound()
          onTimeUp()
          return 0
        }
        // Play warning sound at 1 minute remaining
        if (prev === 60) {
          try {
            const AudioContext = window.AudioContext || window.webkitAudioContext
            const audioContext = new AudioContext()
            const oscillator = audioContext.createOscillator()
            const gainNode = audioContext.createGain()
            oscillator.connect(gainNode)
            gainNode.connect(audioContext.destination)
            oscillator.type = 'sine'
            oscillator.frequency.setValueAtTime(880, audioContext.currentTime)
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5)
            oscillator.start()
            oscillator.stop(audioContext.currentTime + 0.5)
          } catch (e) {}
        }
        return prev - 1
      })
    }, 1000)
    
    return () => clearInterval(interval)
  }, [isActive, onTimeUp, playAlertSound])
  
  // Reset timer when duration changes
  useEffect(() => {
    setTimeLeft(duration * 60)
    setHasPlayedAlert(false)
  }, [duration])
  
  const progress = (timeLeft / (duration * 60)) * 100 // Progress now shows remaining time
  const isLowTime = timeLeft < 300 // Less than 5 minutes
  const isCriticalTime = timeLeft < 60 // Less than 1 minute
  
  return (
    <div className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all ${
      isCriticalTime ? 'bg-red-500/20 text-red-600 animate-pulse' : 
      isLowTime ? 'bg-orange-500/10 text-orange-600' : 
      'bg-muted'
    }`}>
      <Clock className={`h-5 w-5 ${isCriticalTime ? 'animate-bounce' : isLowTime ? 'animate-pulse' : ''}`} />
      <div className="flex flex-col">
        <span className="font-mono text-lg font-bold">{formatTime(timeLeft)}</span>
        <span className="text-xs opacity-70">remaining</span>
      </div>
      <Progress value={progress} className={`w-24 h-2 ${isLowTime ? '[&>div]:bg-orange-500' : ''} ${isCriticalTime ? '[&>div]:bg-red-500' : ''}`} />
    </div>
  )
}

// Audio Player Component for Listening Tests
function AudioPlayer({ text, description }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [playbackRate, setPlaybackRate] = useState(1)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [audioUrl, setAudioUrl] = useState(null)
  const [error, setError] = useState(null)
  const [currentText, setCurrentText] = useState(text) // Track current text
  const audioRef = useRef(null)
  const intervalRef = useRef(null)
  
  // Reset audio when text changes (new question)
  useEffect(() => {
    if (text !== currentText) {
      // Text has changed - reset everything
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl)
      }
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
      setAudioUrl(null)
      setIsPlaying(false)
      setCurrentTime(0)
      setDuration(0)
      setError(null)
      setCurrentText(text)
    }
  }, [text, currentText, audioUrl])
  
  // Clean up audio URL when component unmounts
  useEffect(() => {
    return () => {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl)
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [audioUrl])
  
  // Update playback rate when audio is loaded
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackRate
    }
  }, [playbackRate])
  
  const handlePlay = async () => {
    // If we already have audio loaded, just play it
    if (audioUrl && audioRef.current) {
      audioRef.current.play()
      setIsPlaying(true)
      startTimeTracking()
      return
    }
    
    // Generate audio from Google Cloud TTS
    setIsLoading(true)
    setError(null)
    
    try {
      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          text,
          languageCode: 'fr-FR',
          speakingRate: playbackRate
        })
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to generate audio')
      }
      
      const data = await response.json()
      
      // Convert base64 audio to blob URL
      const audioBytes = Uint8Array.from(atob(data.audio), c => c.charCodeAt(0))
      const audioBlob = new Blob([audioBytes], { type: 'audio/mpeg' })
      const url = URL.createObjectURL(audioBlob)
      
      setAudioUrl(url)
      
      // Wait for audio element to be ready, then play
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.playbackRate = playbackRate
          audioRef.current.play()
          setIsPlaying(true)
          startTimeTracking()
        }
      }, 100)
      
    } catch (err) {
      console.error('TTS Error:', err)
      setError(err.message || 'Failed to generate audio')
      toast.error(err.message || 'Failed to generate audio')
    } finally {
      setIsLoading(false)
    }
  }
  
  const handlePause = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      setIsPlaying(false)
      stopTimeTracking()
    }
  }
  
  const handleStop = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
      setIsPlaying(false)
      setCurrentTime(0)
      stopTimeTracking()
    }
  }
  
  const handleRestart = () => {
    if (audioRef.current && audioUrl) {
      audioRef.current.currentTime = 0
      audioRef.current.play()
      setIsPlaying(true)
      setCurrentTime(0)
      startTimeTracking()
    } else {
      handlePlay()
    }
  }
  
  const startTimeTracking = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      if (audioRef.current) {
        setCurrentTime(Math.floor(audioRef.current.currentTime))
      }
    }, 500)
  }
  
  const stopTimeTracking = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }
  
  const handleAudioEnded = () => {
    setIsPlaying(false)
    stopTimeTracking()
  }
  
  const handleAudioLoaded = () => {
    if (audioRef.current) {
      setDuration(Math.floor(audioRef.current.duration))
    }
  }
  
  const handleRateChange = (newRate) => {
    setPlaybackRate(newRate)
    if (audioRef.current) {
      audioRef.current.playbackRate = newRate
    }
  }
  
  const formatPlayerTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }
  
  return (
    <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
          <Volume2 className="h-4 w-4 text-purple-600" />
        </div>
        <div>
          <span className="font-medium text-purple-600 dark:text-purple-400">Audio Player</span>
          <p className="text-xs text-muted-foreground">Listen to the French dialogue</p>
        </div>
      </div>
      
      {description && (
        <p className="text-sm italic text-muted-foreground mb-3">{description}</p>
      )}
      
      {/* Hidden audio element */}
      {audioUrl && (
        <audio
          ref={audioRef}
          src={audioUrl}
          onEnded={handleAudioEnded}
          onLoadedMetadata={handleAudioLoaded}
          preload="auto"
        />
      )}
      
      {/* Error message */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 mb-3">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}
      
      {/* Player Controls */}
      <div className="bg-background/80 rounded-lg p-4">
        {/* Progress Bar */}
        <div className="flex items-center gap-3 mb-3">
          <span className="text-xs font-mono text-muted-foreground w-10">{formatPlayerTime(currentTime)}</span>
          <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-300"
              style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
            />
          </div>
          <span className="text-xs font-mono text-muted-foreground w-10">{formatPlayerTime(duration)}</span>
        </div>
        
        {/* Control Buttons */}
        <div className="flex items-center justify-center gap-2">
          <Button 
            variant="outline" 
            size="icon"
            onClick={handleRestart}
            disabled={!audioUrl && !isLoading}
            className="h-9 w-9"
          >
            <RotateCw className="h-4 w-4" />
          </Button>
          
          {isPlaying ? (
            <Button 
              onClick={handlePause}
              className="h-12 w-12 rounded-full bg-purple-600 hover:bg-purple-700"
            >
              <Pause className="h-5 w-5" />
            </Button>
          ) : (
            <Button 
              onClick={handlePlay}
              disabled={isLoading}
              className="h-12 w-12 rounded-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Play className="h-5 w-5 ml-0.5" />
              )}
            </Button>
          )}
          
          <Button 
            variant="outline" 
            size="icon"
            onClick={handleStop}
            disabled={!isPlaying && currentTime === 0}
            className="h-9 w-9"
          >
            <Square className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Speed Control */}
        <div className="flex items-center justify-center gap-2 mt-3">
          <span className="text-xs text-muted-foreground">Speed:</span>
          {[0.75, 1, 1.25, 1.5].map((rate) => (
            <Button
              key={rate}
              variant={playbackRate === rate ? "default" : "outline"}
              size="sm"
              onClick={() => handleRateChange(rate)}
              className={`h-7 text-xs ${playbackRate === rate ? 'bg-purple-600 hover:bg-purple-700' : ''}`}
            >
              {rate}x
            </Button>
          ))}
        </div>
      </div>
      
      {/* Show Transcript Toggle */}
      <details className="mt-3">
        <summary className="text-xs text-muted-foreground cursor-pointer hover:text-foreground transition-colors">
          📄 Show transcript (for practice only)
        </summary>
        <div className="mt-2 p-3 bg-muted/50 rounded text-sm">
          <p className="text-muted-foreground whitespace-pre-wrap">{text}</p>
        </div>
      </details>
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
  
  // Determine how many exams are accessible
  const maxExamsPerSkill = isAdmin ? 20 : accessibleExams
  
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b sticky top-0 bg-background/95 backdrop-blur z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Dashboard</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <h1 className="font-bold text-lg">TEF Practice Tests</h1>
            {/* Subscription Badge */}
            <Badge className={subscriptionTier === 'premium' || isAdmin ? 'bg-purple-100 text-purple-700' : subscriptionTier === 'basic' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}>
              {isAdmin ? (
                <>
                  <Crown className="h-3 w-3 mr-1" />
                  Admin
                </>
              ) : (
                subscriptionTier?.charAt(0).toUpperCase() + subscriptionTier?.slice(1) || 'Free'
              )}
            </Badge>
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
          {!isAdmin && subscriptionTier !== 'premium' && (
            <p className="text-sm text-muted-foreground mt-2">
              <Lock className="inline h-4 w-4 mr-1" />
              You have access to {maxExamsPerSkill} exams per skill. 
              <Link href="/dashboard" className="text-blue-600 hover:underline ml-1">Upgrade to Premium</Link> for all 20.
            </p>
          )}
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
                    <span className="flex items-center gap-1">
                      <CheckCircle2 className="h-4 w-4 text-green-500" /> {maxExamsPerSkill}/{tests.length} accessible
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{structure.description}</p>
                  
                  {/* Available Tests */}
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {tests.map((test, index) => {
                      const isLocked = !isAdmin && index >= maxExamsPerSkill
                      
                      return (
                        <Button
                          key={test.id}
                          variant="outline"
                          className={`w-full justify-between ${isLocked ? 'opacity-60' : ''}`}
                          onClick={() => {
                            if (isLocked) {
                              toast.error(`This exam requires Premium subscription. You have access to ${maxExamsPerSkill} exams per skill.`)
                            } else {
                              onSelectTest(key, test)
                            }
                          }}
                          disabled={isLocked}
                        >
                          <span className="flex items-center gap-2">
                            {isLocked && <Lock className="h-4 w-4 text-muted-foreground" />}
                            {test.title}
                          </span>
                          <div className="flex items-center gap-2">
                            {isLocked && (
                              <Badge variant="outline" className="text-xs">
                                <Crown className="h-3 w-3 mr-1" />
                                Premium
                              </Badge>
                            )}
                            <Badge variant="secondary">{test.level}</Badge>
                          </div>
                        </Button>
                      )
                    })}
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
        examId={test.id}
        examTitle={test.title || structure.name}
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
            {/* Audio Player for Listening */}
            {testType === 'comprehensionOrale' && currentQuestionData.audioText && (
              <div className="mb-4">
                <AudioPlayer 
                  text={currentQuestionData.audioText} 
                  description={currentQuestionData.audioDescription}
                />
              </div>
            )}
            
            {/* Audio Description without audioText (fallback) */}
            {testType === 'comprehensionOrale' && currentQuestionData.audioDescription && !currentQuestionData.audioText && (
              <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Volume2 className="h-5 w-5 text-purple-600" />
                  <span className="font-medium text-purple-600">Audio</span>
                </div>
                <p className="text-sm italic text-muted-foreground">{currentQuestionData.audioDescription}</p>
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
  const [evaluations, setEvaluations] = useState({})
  const [evaluatingTask, setEvaluatingTask] = useState(null)
  
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
  
  const handleEvaluate = async (taskId, prompt, taskIndex) => {
    const response = responses[taskId]
    if (!response || response.trim().length < 10) {
      toast.error('Please write a longer response to evaluate')
      return
    }
    
    const token = Cookies.get('token')
    if (!token) {
      toast.error('Please log in to use AI evaluation')
      return
    }
    
    setEvaluatingTask(taskId)
    
    try {
      const res = await fetch('/api/writing/evaluate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          prompt,
          response,
          taskType: taskIndex === 0 ? 'Section A - Formal Letter' : 'Section B - Opinion Essay',
          wordLimit: taskIndex === 0 ? '80-120 words' : '200-250 words'
        })
      })
      
      const data = await res.json()
      
      if (!res.ok) {
        throw new Error(data.error || 'Evaluation failed')
      }
      
      setEvaluations(prev => ({
        ...prev,
        [taskId]: data.evaluation
      }))
      
      toast.success('AI evaluation complete!')
    } catch (error) {
      console.error('Evaluation error:', error)
      toast.error(error.message || 'Failed to evaluate. Please try again.')
    } finally {
      setEvaluatingTask(null)
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
          
          {allTasks.map((task, idx) => {
            const evaluation = evaluations[task.id]
            const isEvaluating = evaluatingTask === task.id
            
            return (
            <Card key={task.id} className="mb-6">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">Task {idx + 1}</CardTitle>
                    <CardDescription>{test.sections[idx].name}</CardDescription>
                  </div>
                  {evaluation && (
                    <div className="text-right">
                      <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg px-3 py-1">
                        {evaluation.clbLevel}
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-1">TEF: {evaluation.tefScore}/450</p>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-muted/50 rounded-lg p-4 mb-4">
                  <p className="text-sm whitespace-pre-wrap">{task.prompt}</p>
                </div>
                
                <h4 className="font-medium mb-2">Your Response:</h4>
                <div className="bg-muted/30 rounded-lg p-4 mb-4">
                  <p className="whitespace-pre-wrap">{responses[task.id] || '(No response)'}</p>
                </div>
                
                {/* AI Evaluation Button */}
                {!evaluation && responses[task.id] && (
                  <Button 
                    onClick={() => handleEvaluate(task.id, task.prompt, idx)}
                    disabled={isEvaluating}
                    className="w-full mb-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    {isEvaluating ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Analyzing your writing...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4 mr-2" />
                        Get AI Score & Feedback
                      </>
                    )}
                  </Button>
                )}
                
                {/* AI Evaluation Results */}
                {evaluation && (
                  <div className="space-y-4 mb-4">
                    <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Brain className="h-5 w-5 text-blue-600" />
                        <h4 className="font-semibold text-blue-600">AI Evaluation Results</h4>
                      </div>
                      
                      {/* Score Breakdown */}
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-4">
                        <div className="bg-background rounded-lg p-2 text-center">
                          <p className="text-xs text-muted-foreground">Task</p>
                          <p className="text-lg font-bold">{evaluation.scores.taskAchievement}/5</p>
                        </div>
                        <div className="bg-background rounded-lg p-2 text-center">
                          <p className="text-xs text-muted-foreground">Coherence</p>
                          <p className="text-lg font-bold">{evaluation.scores.coherenceCohesion}/5</p>
                        </div>
                        <div className="bg-background rounded-lg p-2 text-center">
                          <p className="text-xs text-muted-foreground">Vocabulary</p>
                          <p className="text-lg font-bold">{evaluation.scores.lexicalRange}/5</p>
                        </div>
                        <div className="bg-background rounded-lg p-2 text-center">
                          <p className="text-xs text-muted-foreground">Grammar</p>
                          <p className="text-lg font-bold">{evaluation.scores.grammaticalAccuracy}/5</p>
                        </div>
                        <div className="bg-background rounded-lg p-2 text-center">
                          <p className="text-xs text-muted-foreground">Register</p>
                          <p className="text-lg font-bold">{evaluation.scores.registerTone}/5</p>
                        </div>
                      </div>
                      
                      {/* Total Score */}
                      <div className="flex items-center justify-center gap-4 mb-4 p-3 bg-background rounded-lg">
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">Total Score</p>
                          <p className="text-2xl font-bold">{evaluation.totalScore}/25</p>
                        </div>
                        <Separator orientation="vertical" className="h-12" />
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">CLB Level</p>
                          <p className="text-2xl font-bold text-blue-600">{evaluation.clbLevel}</p>
                        </div>
                        <Separator orientation="vertical" className="h-12" />
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">TEF Score</p>
                          <p className="text-2xl font-bold text-purple-600">{evaluation.tefScore}</p>
                        </div>
                      </div>
                      
                      {/* Overall Feedback */}
                      <div className="mb-4 p-3 bg-background rounded-lg">
                        <p className="text-sm">{evaluation.overallFeedback}</p>
                      </div>
                      
                      {/* Strengths */}
                      {evaluation.strengths && evaluation.strengths.length > 0 && (
                        <div className="mb-3">
                          <h5 className="text-sm font-semibold text-green-600 mb-2 flex items-center gap-1">
                            <CheckCircle2 className="h-4 w-4" /> Strengths
                          </h5>
                          <ul className="text-sm space-y-1">
                            {evaluation.strengths.map((s, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="text-green-600">✓</span> {s}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {/* Improvements */}
                      {evaluation.improvements && evaluation.improvements.length > 0 && (
                        <div className="mb-3">
                          <h5 className="text-sm font-semibold text-amber-600 mb-2 flex items-center gap-1">
                            <AlertTriangle className="h-4 w-4" /> Areas to Improve
                          </h5>
                          <ul className="text-sm space-y-1">
                            {evaluation.improvements.map((imp, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="text-amber-600">•</span> {imp}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {/* Corrections */}
                      {evaluation.correctedExcerpts && evaluation.correctedExcerpts.length > 0 && (
                        <div>
                          <h5 className="text-sm font-semibold text-red-600 mb-2 flex items-center gap-1">
                            <XCircle className="h-4 w-4" /> Corrections
                          </h5>
                          <div className="space-y-2">
                            {evaluation.correctedExcerpts.map((corr, i) => (
                              <div key={i} className="text-sm bg-background rounded p-2">
                                <p><span className="line-through text-red-500">{corr.original}</span> → <span className="text-green-600 font-medium">{corr.corrected}</span></p>
                                <p className="text-xs text-muted-foreground mt-1">{corr.explanation}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                
                <h4 className="font-medium mb-2">Sample Answer:</h4>
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                  <p className="whitespace-pre-wrap text-sm">{task.sampleAnswer}</p>
                </div>
              </CardContent>
            </Card>
          )})}
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
function ResultsView({ testType, test, answers, onBack, examId, examTitle }) {
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [resultId, setResultId] = useState(null)
  const router = useRouter()
  
  const allQuestions = test.sections.flatMap(s => s.questions)
  const totalQuestions = allQuestions.length
  
  let correct = 0
  const answerDetails = []
  
  allQuestions.forEach(q => {
    const isCorrect = answers[q.id] === q.correctAnswer
    if (isCorrect) correct++
    
    answerDetails.push({
      questionId: q.id,
      userAnswer: answers[q.id],
      correctAnswer: q.correctAnswer,
      isCorrect,
      questionText: q.question?.substring(0, 100),
      questionType: q.questionType || 'multiple_choice'
    })
  })
  
  const score = Math.round((correct / totalQuestions) * 100)
  const clbResult = calculateCLBScore(score)
  
  // Calculate grade
  let grade = 'F'
  if (score >= 90) grade = 'A'
  else if (score >= 80) grade = 'B'
  else if (score >= 70) grade = 'C'
  else if (score >= 60) grade = 'D'
  
  // Save results to database
  useEffect(() => {
    const saveResults = async () => {
      const token = localStorage.getItem('token')
      if (!token || saved) return
      
      setSaving(true)
      try {
        const response = await fetch('/api/tests/results', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            testType,
            examId: examId || test.id,
            examTitle: examTitle || test.title || `${testType} Test`,
            score: correct,
            totalQuestions,
            correctAnswers: correct,
            timeSpent: 0, // TODO: Track actual time
            answers: answerDetails
          })
        })
        
        if (response.ok) {
          const data = await response.json()
          setResultId(data.resultId)
          setSaved(true)
          toast.success('Results saved!')
        }
      } catch (error) {
        console.error('Failed to save results:', error)
      } finally {
        setSaving(false)
      }
    }
    
    saveResults()
  }, [])
  
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Tests
          </Button>
          <div className="flex gap-2">
            {saving && (
              <Badge variant="outline" className="flex items-center gap-1">
                <Loader2 className="h-3 w-3 animate-spin" /> Saving...
              </Badge>
            )}
            <Button variant="outline" onClick={() => router.push('/dashboard/reports')}>
              <BarChart3 className="h-4 w-4 mr-2" /> View Reports
            </Button>
          </div>
        </div>
      </header>
      
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Score Card */}
        <Card className="mb-6 overflow-hidden">
          <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 dark:from-purple-500/20 dark:to-blue-500/20">
            <CardHeader className="text-center pb-2">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                <Award className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl">Test Complete!</CardTitle>
              <CardDescription>{examTitle || test.title}</CardDescription>
            </CardHeader>
            <CardContent className="pb-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="p-4 rounded-lg bg-background/80 backdrop-blur">
                  <p className="text-3xl font-bold">{correct}/{totalQuestions}</p>
                  <p className="text-sm text-muted-foreground">Correct</p>
                </div>
                <div className="p-4 rounded-lg bg-background/80 backdrop-blur">
                  <p className="text-3xl font-bold text-primary">{score}%</p>
                  <p className="text-sm text-muted-foreground">Score</p>
                </div>
                <div className="p-4 rounded-lg bg-background/80 backdrop-blur">
                  <p className="text-3xl font-bold text-green-600">CLB {clbResult.clb}</p>
                  <p className="text-sm text-muted-foreground">{clbResult.cefr} Level</p>
                </div>
                <div className="p-4 rounded-lg bg-background/80 backdrop-blur">
                  <p className={`text-3xl font-bold ${
                    grade === 'A' ? 'text-green-600' :
                    grade === 'B' ? 'text-blue-600' :
                    grade === 'C' ? 'text-yellow-600' :
                    grade === 'D' ? 'text-orange-600' : 'text-red-600'
                  }`}>{grade}</p>
                  <p className="text-sm text-muted-foreground">Grade</p>
                </div>
              </div>
              
              {/* Performance Summary */}
              <div className="mt-6 p-4 rounded-lg bg-background/80 backdrop-blur">
                <h4 className="font-medium mb-3 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" /> Performance Summary
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Questions Answered</span>
                    <span className="font-medium">{Object.keys(answers).length} / {totalQuestions}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Accuracy</span>
                    <span className="font-medium">{score}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Incorrect Answers</span>
                    <span className="font-medium text-red-600">{totalQuestions - correct}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </div>
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
  const [subscriptionInfo, setSubscriptionInfo] = useState(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    fetchSubscriptionInfo()
  }, [])
  
  const fetchSubscriptionInfo = async () => {
    try {
      const token = Cookies.get('token')
      if (!token) {
        // No token, redirect to login
        window.location.href = '/dashboard'
        return
      }
      
      const res = await fetch('/api/tests/access', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      
      if (res.ok) {
        const data = await res.json()
        setSubscriptionInfo(data)
      }
    } catch (error) {
      console.error('Failed to fetch subscription info')
    } finally {
      setLoading(false)
    }
  }
  
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
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    )
  }
  
  if (currentView === 'selection') {
    return (
      <TestSelection 
        onSelectTest={handleSelectTest}
        subscriptionInfo={subscriptionInfo}
        subscriptionTier={subscriptionInfo?.subscriptionTier || 'free'}
        isAdmin={subscriptionInfo?.isAdmin || false}
      />
    )
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
