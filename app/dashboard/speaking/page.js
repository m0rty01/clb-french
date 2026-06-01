'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Cookies from 'js-cookie'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { toast } from 'sonner'
import { Mic, Square, ArrowLeft, Crown, Loader2, Sparkles, CheckCircle2, Lightbulb, Volume2 } from 'lucide-react'

function blobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve((reader.result || '').toString().split(',')[1] || '')
    reader.onerror = reject
    reader.readAsDataURL(blob)
  })
}

function ScoreBar({ label, value }) {
  const pct = Math.round((Math.max(0, Math.min(5, value)) / 5) * 100)
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-semibold">{value}/5</span>
      </div>
      <Progress value={pct} className="h-2" />
    </div>
  )
}

export default function SpeakingPracticePage() {
  const router = useRouter()
  const [loadingState, setLoadingState] = useState('init') // init | locked | ready
  const [prompts, setPrompts] = useState([])
  const [selected, setSelected] = useState(null)
  const [isRecording, setIsRecording] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const [audioUrl, setAudioUrl] = useState(null)
  const [audioBlob, setAudioBlob] = useState(null)
  const [evaluating, setEvaluating] = useState(false)
  const [result, setResult] = useState(null)

  const mediaRecorderRef = useRef(null)
  const chunksRef = useRef([])
  const streamRef = useRef(null)
  const timerRef = useRef(null)

  useEffect(() => {
    const token = Cookies.get('token')
    if (!token) {
      router.push('/dashboard')
      return
    }
    fetch('/api/ai/speaking/prompts', { headers: { Authorization: `Bearer ${token}` } })
      .then(async (res) => {
        if (res.status === 403) {
          setLoadingState('locked')
          return null
        }
        const data = await res.json()
        if (data?.prompts) {
          setPrompts(data.prompts)
          setSelected(data.prompts[0])
          setLoadingState('ready')
        } else {
          setLoadingState('locked')
        }
      })
      .catch(() => setLoadingState('locked'))
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
      if (streamRef.current) streamRef.current.getTracks().forEach((t) => t.stop())
    }
  }, [router])

  const startRecording = async () => {
    setResult(null)
    setAudioUrl(null)
    setAudioBlob(null)
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      streamRef.current = stream
      const mimeType = MediaRecorder.isTypeSupported('audio/webm;codecs=opus') ? 'audio/webm;codecs=opus' : 'audio/webm'
      const recorder = new MediaRecorder(stream, { mimeType })
      chunksRef.current = []
      recorder.ondataavailable = (e) => { if (e.data.size > 0) chunksRef.current.push(e.data) }
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' })
        setAudioBlob(blob)
        setAudioUrl(URL.createObjectURL(blob))
        stream.getTracks().forEach((t) => t.stop())
      }
      mediaRecorderRef.current = recorder
      recorder.start()
      setIsRecording(true)
      setElapsed(0)
      timerRef.current = setInterval(() => {
        setElapsed((prev) => {
          const next = prev + 1
          const cap = selected?.durationSec || 180
          if (next >= cap) { stopRecording() }
          return next
        })
      }, 1000)
    } catch (err) {
      toast.error('Could not access microphone. Please allow microphone permission.')
    }
  }

  const stopRecording = () => {
    if (timerRef.current) clearInterval(timerRef.current)
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop()
    }
    setIsRecording(false)
  }

  const submitForEvaluation = async () => {
    if (!audioBlob) return
    setEvaluating(true)
    setResult(null)
    try {
      const base64 = await blobToBase64(audioBlob)
      const token = Cookies.get('token')
      const res = await fetch('/api/ai/speaking/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ audioBase64: base64, mimeType: 'audio/webm', promptId: selected?.id }),
      })
      const data = await res.json()
      if (!res.ok) {
        if (res.status === 429) toast.error('Too many requests. Please wait a moment.')
        else toast.error(data.error || 'Evaluation failed')
        return
      }
      setResult(data.evaluation)
      toast.success('Evaluation ready!')
    } catch (err) {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setEvaluating(false)
    }
  }

  const fmt = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`

  if (loadingState === 'init') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (loadingState === 'locked') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
        <div className="max-w-2xl mx-auto px-4 py-16">
          <Link href="/dashboard" className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8">
            <ArrowLeft className="h-5 w-5" /> Back to Dashboard
          </Link>
          <Card className="border-2 border-orange-400 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20">
            <CardHeader className="text-center">
              <div className="mx-auto w-14 h-14 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mb-2">
                <Mic className="h-7 w-7 text-orange-500" />
              </div>
              <CardTitle className="text-2xl">AI Speaking Practice is a Premium feature</CardTitle>
              <CardDescription>Record TEF/TCF oral responses and get instant AI feedback on fluency, pronunciation, grammar & more.</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white" onClick={() => router.push('/pricing')}>
                <Crown className="mr-2 h-4 w-4" /> Upgrade to Premium
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-3xl mx-auto px-4 py-10">
        <Link href="/dashboard" className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="h-5 w-5" /> Back to Dashboard
        </Link>

        <div className="flex items-center gap-2 mb-6">
          <Mic className="h-6 w-6 text-blue-600" />
          <h1 className="text-2xl font-bold">AI Speaking Practice</h1>
          <Badge className="bg-orange-500 text-white">Premium</Badge>
        </div>

        {/* Prompt selector */}
        <div className="flex flex-wrap gap-2 mb-4">
          {prompts.map((p) => (
            <button
              key={p.id}
              onClick={() => { setSelected(p); setResult(null); setAudioUrl(null); setAudioBlob(null) }}
              className={`text-xs px-3 py-1.5 rounded-full border transition-all ${selected?.id === p.id ? 'bg-blue-600 text-white border-blue-600' : 'border-border hover:bg-muted'}`}
            >
              {p.title}
            </button>
          ))}
        </div>

        {/* Current prompt */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between flex-wrap gap-2">
              <Badge variant="secondary">{selected?.taskType}</Badge>
              <Badge variant="outline">Target: {selected?.targetLevel}</Badge>
            </div>
            <CardTitle className="text-lg mt-2">{selected?.title}</CardTitle>
            <CardDescription className="text-base text-foreground/80">{selected?.prompt}</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Recorder */}
            <div className="flex flex-col items-center gap-4 py-4">
              {!isRecording ? (
                <Button size="lg" onClick={startRecording} disabled={evaluating} className="rounded-full h-16 w-16 p-0 bg-blue-600 hover:bg-blue-700">
                  <Mic className="h-7 w-7" />
                </Button>
              ) : (
                <Button size="lg" onClick={stopRecording} className="rounded-full h-16 w-16 p-0 bg-red-600 hover:bg-red-700 animate-pulse">
                  <Square className="h-6 w-6" />
                </Button>
              )}
              <div className="text-center">
                {isRecording ? (
                  <p className="text-red-600 font-medium">● Recording… {fmt(elapsed)} <span className="text-muted-foreground">/ {fmt(selected?.durationSec || 180)}</span></p>
                ) : audioUrl ? (
                  <p className="text-sm text-muted-foreground">Recorded {fmt(elapsed)}. Review below or re-record.</p>
                ) : (
                  <p className="text-sm text-muted-foreground">Tap the mic and speak your answer in French.</p>
                )}
              </div>

              {audioUrl && !isRecording && (
                <div className="w-full max-w-md space-y-3">
                  <audio controls src={audioUrl} className="w-full" />
                  <Button onClick={submitForEvaluation} disabled={evaluating} className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                    {evaluating ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Evaluating your response…</>) : (<><Sparkles className="mr-2 h-4 w-4" /> Get AI Evaluation</>)}
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        {result && (
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <CardTitle className="text-lg">Your Results</CardTitle>
                  <div className="flex items-center gap-2">
                    {result.clbLevel && <Badge className="bg-blue-600 text-white">CLB: {result.clbLevel}</Badge>}
                    {result.cefrLevel && <Badge variant="secondary">CEFR: {result.cefrLevel}</Badge>}
                    {typeof result.totalScore === 'number' && <Badge variant="outline">{result.totalScore}/25</Badge>}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {result.scores && (
                  <div className="grid sm:grid-cols-2 gap-4">
                    <ScoreBar label="Fluency" value={result.scores.fluency} />
                    <ScoreBar label="Pronunciation" value={result.scores.pronunciation} />
                    <ScoreBar label="Grammar" value={result.scores.grammar} />
                    <ScoreBar label="Vocabulary" value={result.scores.vocabulary} />
                    <ScoreBar label="Task Achievement" value={result.scores.taskAchievement} />
                  </div>
                )}
                {result.overallFeedback && (
                  <p className="text-sm bg-muted rounded-lg p-3">{result.overallFeedback}</p>
                )}
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-2"><CardTitle className="text-base flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500" /> Strengths</CardTitle></CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    {(result.strengths || []).map((s, i) => (
                      <li key={i} className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" /><span>{s}</span></li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2"><CardTitle className="text-base flex items-center gap-2"><Lightbulb className="h-4 w-4 text-amber-500" /> Improvements</CardTitle></CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    {(result.improvements || []).map((s, i) => (
                      <li key={i} className="flex gap-2"><Lightbulb className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" /><span>{s}</span></li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {result.transcript && (
              <Card>
                <CardHeader className="pb-2"><CardTitle className="text-base">What we heard (transcript)</CardTitle></CardHeader>
                <CardContent><p className="text-sm whitespace-pre-wrap text-muted-foreground">{result.transcript}</p></CardContent>
              </Card>
            )}

            {result.modelAnswer && (
              <Card className="border-blue-200 dark:border-blue-900">
                <CardHeader className="pb-2"><CardTitle className="text-base flex items-center gap-2"><Volume2 className="h-4 w-4 text-blue-600" /> Model answer</CardTitle></CardHeader>
                <CardContent><p className="text-sm whitespace-pre-wrap">{result.modelAnswer}</p></CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
