"use client"

import { useState, useEffect } from "react"
import { Play, Pause, RotateCcw, Coffee, Brain, Target } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface FocusSession {
  id: string
  duration: number // in minutes
  type: "study" | "break"
  completed: boolean
  startTime?: Date
}

const focusPresets = [
  { name: "Pomodoro Clásico", study: 25, break: 5, cycles: 4 },
  { name: "Sesión Larga", study: 50, break: 10, cycles: 3 },
  { name: "Estudio Intensivo", study: 90, break: 20, cycles: 2 },
  { name: "Repaso Rápido", study: 15, break: 5, cycles: 6 },
]

export function FocusMode() {
  const [isActive, setIsActive] = useState(false)
  const [currentSession, setCurrentSession] = useState<FocusSession | null>(null)
  const [timeLeft, setTimeLeft] = useState(0)
  const [selectedPreset, setSelectedPreset] = useState(focusPresets[0])
  const [currentCycle, setCurrentCycle] = useState(1)
  const [completedSessions, setCompletedSessions] = useState(0)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            // Session completed
            handleSessionComplete()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [isActive, timeLeft])

  const handleSessionComplete = () => {
    if (!currentSession) return

    setCompletedSessions((prev) => prev + 1)

    // Play notification sound (if available)
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification(currentSession.type === "study" ? "¡Tiempo de descanso!" : "¡Hora de estudiar!", {
        body:
          currentSession.type === "study"
            ? "Has completado una sesión de estudio. Toma un descanso."
            : "Tu descanso ha terminado. ¡Vamos a estudiar!",
        icon: "/favicon.ico",
      })
    }

    // Auto-start next session
    if (currentCycle < selectedPreset.cycles) {
      const nextType = currentSession.type === "study" ? "break" : "study"
      const nextDuration = nextType === "study" ? selectedPreset.study : selectedPreset.break

      if (nextType === "study") {
        setCurrentCycle((prev) => prev + 1)
      }

      startSession(nextType, nextDuration)
    } else {
      // All cycles completed
      setIsActive(false)
      setCurrentSession(null)
      setCurrentCycle(1)
    }
  }

  const startSession = (type: "study" | "break", duration: number) => {
    const session: FocusSession = {
      id: Date.now().toString(),
      duration,
      type,
      completed: false,
      startTime: new Date(),
    }

    setCurrentSession(session)
    setTimeLeft(duration * 60) // Convert to seconds
    setIsActive(true)
  }

  const startFocusSession = () => {
    startSession("study", selectedPreset.study)
  }

  const pauseSession = () => {
    setIsActive(false)
  }

  const resumeSession = () => {
    setIsActive(true)
  }

  const resetSession = () => {
    setIsActive(false)
    setCurrentSession(null)
    setTimeLeft(0)
    setCurrentCycle(1)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const getProgress = () => {
    if (!currentSession) return 0
    const totalSeconds = currentSession.duration * 60
    return ((totalSeconds - timeLeft) / totalSeconds) * 100
  }

  // Request notification permission
  useEffect(() => {
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission()
    }
  }, [])

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Brain className="h-4 w-4" />
          <span className="hidden sm:inline">Modo Focus</span>
          <span className="sm:hidden">Focus</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[95vw] sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Modo Focus
          </DialogTitle>
          <DialogDescription>Usa la técnica Pomodoro para mejorar tu concentración y productividad</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {!currentSession ? (
            // Setup screen
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Selecciona un preset:</label>
                <Select
                  value={selectedPreset.name}
                  onValueChange={(value) => {
                    const preset = focusPresets.find((p) => p.name === value)
                    if (preset) setSelectedPreset(preset)
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {focusPresets.map((preset) => (
                      <SelectItem key={preset.name} value={preset.name}>
                        {preset.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Card>
                <CardContent className="p-4">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-red-600">{selectedPreset.study}</div>
                      <div className="text-xs text-gray-600">min estudio</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-600">{selectedPreset.break}</div>
                      <div className="text-xs text-gray-600">min descanso</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-600">{selectedPreset.cycles}</div>
                      <div className="text-xs text-gray-600">ciclos</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Button onClick={startFocusSession} className="w-full bg-red-600 hover:bg-red-700">
                <Play className="h-4 w-4 mr-2" />
                Comenzar Sesión de Estudio
              </Button>
            </div>
          ) : (
            // Active session screen
            <div className="space-y-6">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  {currentSession.type === "study" ? (
                    <Brain className="h-5 w-5 text-red-600" />
                  ) : (
                    <Coffee className="h-5 w-5 text-green-600" />
                  )}
                  <Badge
                    className={
                      currentSession.type === "study" ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"
                    }
                  >
                    {currentSession.type === "study" ? "Estudiando" : "Descansando"}
                  </Badge>
                </div>

                <div className="text-4xl font-mono font-bold mb-2">{formatTime(timeLeft)}</div>

                <div className="text-sm text-gray-600 mb-4">
                  Ciclo {currentCycle} de {selectedPreset.cycles}
                </div>

                <Progress value={getProgress()} className="h-2 mb-4" />
              </div>

              <div className="flex gap-2">
                {isActive ? (
                  <Button onClick={pauseSession} variant="outline" className="flex-1">
                    <Pause className="h-4 w-4 mr-2" />
                    Pausar
                  </Button>
                ) : (
                  <Button onClick={resumeSession} className="flex-1 bg-red-600 hover:bg-red-700">
                    <Play className="h-4 w-4 mr-2" />
                    Reanudar
                  </Button>
                )}

                <Button onClick={resetSession} variant="outline">
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>

              <div className="text-center text-sm text-gray-600">Sesiones completadas hoy: {completedSessions}</div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
