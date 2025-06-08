"use client"

import type React from "react"
import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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
import { Upload, Plus, Calendar, FileText, Bitcoin, Clock, Bell } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useRouter } from "next/navigation"

export const initialTasksData = [
  {
    id: 1,
    title: "Ejercicios de Gauss-Jordan",
    subject: "Álgebra Lineal",
    dueDate: "2025-06-01",
    status: "pending",
    description: "Resolver sistema de ecuaciones usando el método de Gauss-Jordan",
    grade: null,
    deliveredAt: null,
    gradedAt: null,
    priority: "normal",
    submittedFile: null,
  },
  {
    id: 2,
    title: "Proyecto Base de Datos",
    subject: "Base de Datos",
    dueDate: "2025-06-08",
    status: "in-progress",
    description: "Diseñar e implementar una base de datos para sistema de inventario",
    grade: null,
    deliveredAt: null,
    gradedAt: null,
    priority: "normal",
    submittedFile: null,
  },
  {
    id: 3,
    title: "Algoritmos de Ordenamiento",
    subject: "Programación Avanzada",
    dueDate: "2025-05-31",
    status: "completed",
    description: "Implementar y comparar diferentes algoritmos de ordenamiento",
    grade: 95,
    deliveredAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    gradedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    priority: "normal",
    submittedFile: null,
  },
  {
    id: 4,
    title: "Página Web de Criptomonedas",
    subject: "Programación Web",
    dueDate: "2025-05-28",
    status: "pending",
    description: "Crear una plataforma web para compra-venta de criptomonedas con React y Node.js",
    priority: "high",
    grade: null,
    deliveredAt: null,
    gradedAt: null,
    submittedFile: null,
  },
  {
    id: 5,
    title: "Análisis de Redes TCP/IP",
    subject: "Redes de Computadoras",
    dueDate: "2025-06-05",
    status: "pending",
    description: "Configurar y analizar protocolos de red usando Wireshark",
    grade: null,
    deliveredAt: null,
    gradedAt: null,
    submittedFile: null,
  },
  {
    id: 6,
    title: "Ensayo sobre Inteligencia Artificial",
    subject: "Ética en Tecnología",
    dueDate: "2025-06-10",
    status: "pending",
    description: "Ensayo de 2000 palabras sobre el impacto ético de la IA en la sociedad",
    grade: null,
    deliveredAt: null,
    gradedAt: null,
    submittedFile: null,
  },
  {
    id: 7,
    title: "Aplicación Móvil React Native",
    subject: "Desarrollo Móvil",
    dueDate: "2025-06-15",
    status: "pending",
    description: "Desarrollar una app móvil para gestión de tareas con React Native",
    priority: "high",
    grade: null,
    deliveredAt: null,
    gradedAt: null,
    submittedFile: null,
  },
  {
    id: 8,
    title: "Modelo Entidad-Relación",
    subject: "Base de Datos",
    dueDate: "2025-06-12",
    status: "pending",
    description: "Diseñar modelo ER para sistema de biblioteca universitaria",
    grade: null,
    deliveredAt: null,
    gradedAt: null,
    submittedFile: null,
  },
  {
    id: 9,
    title: "Práctica de Matrices",
    subject: "Álgebra Lineal",
    dueDate: "2025-06-18",
    status: "pending",
    description: "Ejercicios de multiplicación de matrices y determinantes",
    grade: null,
    deliveredAt: null,
    gradedAt: null,
    submittedFile: null,
  },
  {
    id: 10,
    title: "Configuración de Firewall",
    subject: "Seguridad Informática",
    dueDate: "2025-06-20",
    status: "pending",
    description: "Configurar reglas de firewall para proteger red empresarial",
    grade: null,
    deliveredAt: null,
    gradedAt: null,
    submittedFile: null,
  },
  {
    id: 11,
    title: "API REST con Node.js",
    subject: "Programación Web",
    dueDate: "2025-06-22",
    status: "pending",
    description: "Crear API REST completa con autenticación JWT",
    grade: null,
    deliveredAt: null,
    gradedAt: null,
    submittedFile: null,
  },
  {
    id: 12,
    title: "Presentación Final de Proyecto",
    subject: "Proyecto Integrador",
    dueDate: "2025-06-25",
    status: "pending",
    description: "Presentación de 20 minutos del proyecto final de carrera",
    priority: "high",
    grade: null,
    deliveredAt: null,
    gradedAt: null,
    submittedFile: null,
  },
  {
    id: 13,
    title: "Examen Práctico de Programación",
    subject: "Programación Avanzada",
    dueDate: "2025-06-28",
    status: "pending",
    description: "Resolver problemas de programación en tiempo real",
    grade: null,
    deliveredAt: null,
    gradedAt: null,
    submittedFile: null,
  },
  {
    id: 14,
    title: "Documentación Técnica",
    subject: "Ingeniería de Software",
    dueDate: "2025-07-01",
    status: "pending",
    description: "Crear documentación completa del sistema desarrollado",
    grade: null,
    deliveredAt: null,
    gradedAt: null,
    submittedFile: null,
  },
]

const parseDateSafe = (dateString: string | null | undefined): Date | null => {
  if (!dateString) return null
  const date = new Date(dateString)
  return isNaN(date.getTime()) ? null : date
}

// Dentro del componente Tasks, agregar el router
export function Tasks() {
  const router = useRouter()
  const [isClient, setIsClient] = useState(false)
  const [tasks, setTasks] = useState(initialTasksData)
  const [selectedFiles, setSelectedFiles] = useState<Record<number, File | null>>({})

  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null)
  const [comments, setComments] = useState("")
  const [notifications, setNotifications] = useState<string[]>([])
  const [lastUpdate, setLastUpdate] = useState(() => new Date())

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (isClient) {
      try {
        const savedTasks = localStorage.getItem("uvm-tasks")
        if (savedTasks) {
          const parsedTasks = JSON.parse(savedTasks).map((task: any) => ({
            ...task,
            deliveredAt: task.deliveredAt,
            gradedAt: task.gradedAt,
          }))
          setTasks(parsedTasks)
        }
      } catch (error) {
        console.error("Error al cargar tareas desde localStorage:", error)
      }
    }
  }, [isClient])

  useEffect(() => {
    if (isClient) {
      localStorage.setItem("uvm-tasks", JSON.stringify(tasks))
    }
  }, [tasks, isClient])

  useEffect(() => {
    if (!isClient) return

    const interval = setInterval(() => {
      setLastUpdate(new Date())

      setTasks((prevTasks) =>
        prevTasks.map((task) => {
          const deliveredAtDate = parseDateSafe(task.deliveredAt)
          if (deliveredAtDate && !task.grade && !task.gradedAt) {
            const timeSinceDelivery = Date.now() - deliveredAtDate.getTime()
            const gradeTime = 2 * 60 * 1000

            if (timeSinceDelivery >= gradeTime) {
              const randomGrade = Math.floor(Math.random() * 31) + 70
              setNotifications((prev) => [...prev, `¡Nueva calificación! ${task.title}: ${randomGrade}/100`])
              return {
                ...task,
                grade: randomGrade,
                gradedAt: new Date().toISOString(),
                status: "completed",
              }
            }
          }
          return task
        }),
      )
    }, 60000)

    return () => clearInterval(interval)
  }, [isClient])

  useEffect(() => {
    if (notifications.length > 0) {
      const timer = setTimeout(() => {
        setNotifications([])
      }, 10000)
      return () => clearTimeout(timer)
    }
  }, [notifications])

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>, taskId: number) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFiles((prev) => ({
        ...prev,
        [taskId]: file,
      }))
    }
  }, [])

  const handleDeliverTask = useCallback(
    (taskId: number) => {
      const file = selectedFiles[taskId]
      if (file) {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === taskId
              ? {
                  ...task,
                  status: "delivered",
                  deliveredAt: new Date().toISOString(),
                  submittedFile: file.name,
                }
              : task,
          ),
        )

        // Limpiar el archivo seleccionado
        setSelectedFiles((prev) => ({
          ...prev,
          [taskId]: null,
        }))

        // Mostrar notificación de éxito
        setNotifications((prev) => [
          ...prev,
          `✅ Tarea "${tasks.find((t) => t.id === taskId)?.title}" entregada exitosamente`,
        ])

        // Limpiar el input de archivo
        const fileInput = document.getElementById(`file-${taskId}`) as HTMLInputElement
        if (fileInput) {
          fileInput.value = ""
        }
      }
    },
    [selectedFiles, tasks],
  )

  const getTimeUntilGrade = (deliveredAtISO: string | null) => {
    const deliveredAtDate = parseDateSafe(deliveredAtISO)
    if (!deliveredAtDate) return null

    const gradeTime = 2 * 60 * 1000
    const timeElapsed = Date.now() - deliveredAtDate.getTime()
    const timeRemaining = gradeTime - timeElapsed

    if (timeRemaining <= 0) return "Calificando..."

    const minutes = Math.floor(timeRemaining / 60000)
    const seconds = Math.floor((timeRemaining % 60000) / 1000)

    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  const getStatusBadge = (task: any) => {
    if (task.status === "delivered" && !task.grade) {
      const timeUntilGrade = getTimeUntilGrade(task.deliveredAt)
      return (
        <div className="flex flex-col items-end gap-1">
          <Badge className="bg-blue-100 text-blue-800">Entregada</Badge>
          {timeUntilGrade && (
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Clock className="h-3 w-3" />
              <span>{timeUntilGrade}</span>
            </div>
          )}
        </div>
      )
    }

    switch (task.status) {
      case "completed":
        return (
          <div className="flex flex-col items-end gap-1">
            <Badge className="bg-green-100 text-green-800">Completada</Badge>
            {task.grade && <Badge className="bg-purple-100 text-purple-800">Nota: {task.grade}/100</Badge>}
          </div>
        )
      case "in-progress":
        return <Badge className="bg-yellow-100 text-yellow-800">En Progreso</Badge>
      case "pending":
        return <Badge className="bg-red-100 text-red-800">Pendiente</Badge>
      default:
        return <Badge>Desconocido</Badge>
    }
  }

  const getPriorityIndicator = (priority?: string) => {
    if (priority === "high") {
      return <Badge className="bg-red-600 text-white">Urgente</Badge>
    }
    return null
  }

  if (!isClient) {
    return null
  }

  return (
    <div className="space-y-4 sm:space-y-6 p-4 sm:p-6">
      {/* Notificaciones */}
      {notifications.length > 0 && (
        <div className="space-y-2">
          {notifications.map((notification, index) => (
            <Alert key={index} className="border-green-200 bg-green-50">
              <Bell className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">{notification}</AlertDescription>
            </Alert>
          ))}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100">Mis Tareas</h1>
          <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
            Gestiona y entrega tus tareas académicas
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-red-600 hover:bg-red-700 w-full sm:w-auto">
              <Plus className="h-4 w-4 mr-2" />
              Nueva Tarea
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-[95vw] sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Agregar Nueva Tarea</DialogTitle>
              <DialogDescription>
                Crea una nueva tarea para hacer seguimiento de tus actividades académicas.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Título de la Tarea</Label>
                <Input id="title" placeholder="Ej: Ejercicios de Cálculo" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="subject">Materia</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una materia" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="algebra">Álgebra Lineal</SelectItem>
                    <SelectItem value="programming">Programación Avanzada</SelectItem>
                    <SelectItem value="database">Base de Datos</SelectItem>
                    <SelectItem value="networks">Redes de Computadoras</SelectItem>
                    <SelectItem value="web">Programación Web</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="dueDate">Fecha de Entrega</Label>
                <Input id="dueDate" type="date" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Descripción</Label>
                <Textarea id="description" placeholder="Describe los detalles de la tarea..." />
              </div>
            </div>
            <Button className="bg-red-600 hover:bg-red-700">Crear Tarea</Button>
          </DialogContent>
        </Dialog>
      </div>

      {/* Tasks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
        {tasks.map((task) => {
          const deliveredAtDate = parseDateSafe(task.deliveredAt)
          const gradedAtDate = parseDateSafe(task.gradedAt)
          return (
            <Card
              key={task.id}
              className={`hover:shadow-lg transition-shadow cursor-pointer ${task.priority === "high" ? "border-l-4 border-l-red-600" : ""}`}
              onClick={(e) => e.preventDefault()}
            >
              <CardHeader className="p-4">
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-start gap-2">
                    <CardTitle className="text-base sm:text-lg text-red-700 flex items-center gap-2 break-words">
                      {task.title}
                      {task.id === 4 && <Bitcoin className="h-4 w-4 text-amber-500 flex-shrink-0" />}
                    </CardTitle>
                    {getStatusBadge(task)}
                  </div>
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
                    <CardDescription className="font-medium text-gray-600 text-sm">{task.subject}</CardDescription>
                    {getPriorityIndicator(task.priority)}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 p-4">
                <p className="text-sm text-gray-600 break-words">{task.description}</p>

                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Calendar className="h-4 w-4 flex-shrink-0" />
                  <span>Entrega: {new Date(task.dueDate).toLocaleDateString("es-ES")}</span>
                </div>

                {deliveredAtDate && (
                  <div className="flex items-center gap-2 text-sm text-blue-600">
                    <Clock className="h-4 w-4 flex-shrink-0" />
                    <span className="break-words">Entregada: {deliveredAtDate.toLocaleString("es-ES")}</span>
                  </div>
                )}

                {task.status === "pending" && (
                  <div className="space-y-3">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                      <Upload className="h-6 w-6 sm:h-8 sm:w-8 mx-auto text-gray-400 mb-2" />
                      <Label htmlFor={`file-${task.id}`} className="cursor-pointer">
                        <span className="text-sm text-gray-600">Haz clic para subir archivo o arrastra aquí</span>
                        <Input
                          id={`file-${task.id}`}
                          type="file"
                          className="hidden"
                          onChange={(e) => handleFileChange(e, task.id)}
                          accept=".pdf,.doc,.docx,.txt,.zip"
                        />
                      </Label>
                    </div>

                    {selectedFiles[task.id] && (
                      <div className="flex items-center gap-2 text-sm text-green-600">
                        <FileText className="h-4 w-4 flex-shrink-0" />
                        <span className="break-words">{selectedFiles[task.id]?.name}</span>
                      </div>
                    )}

                    <Button
                      className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50"
                      disabled={!selectedFiles[task.id]}
                      onClick={() => handleDeliverTask(task.id)}
                    >
                      {selectedFiles[task.id] ? "Entregar Tarea" : "Selecciona un archivo primero"}
                    </Button>
                  </div>
                )}

                {task.status === "delivered" && !task.grade && (
                  <div className="text-center py-2 space-y-2">
                    <Badge className="bg-blue-100 text-blue-800">✓ Tarea Entregada</Badge>
                    <div className="text-sm text-gray-500">
                      <div className="flex items-center justify-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>Calificación en: {getTimeUntilGrade(task.deliveredAt)}</span>
                      </div>
                    </div>
                  </div>
                )}

                {task.status === "completed" && task.grade && (
                  <div className="text-center py-2 space-y-2">
                    <Badge className="bg-green-100 text-green-800">✓ Calificada</Badge>
                    <div className="text-lg font-bold text-purple-600">Nota: {task.grade}/100</div>
                    {gradedAtDate && (
                      <div className="text-xs text-gray-500">Calificada: {gradedAtDate.toLocaleString("es-ES")}</div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Upload Section */}
      <Card>
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="text-red-700 flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Centro de Subida de Archivos
          </CardTitle>
          <CardDescription>Sube tus tareas y documentos de forma rápida y segura</CardDescription>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="task-select">Seleccionar Tarea</Label>
                <Select onValueChange={(value) => setSelectedTaskId(Number(value))}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Elige la tarea a entregar" />
                  </SelectTrigger>
                  <SelectContent>
                    {tasks
                      .filter((task) => task.status === "pending")
                      .map((task) => (
                        <SelectItem key={task.id} value={task.id.toString()}>
                          {task.title} - {task.subject}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="comments">Comentarios (Opcional)</Label>
                <Textarea
                  id="comments"
                  placeholder="Agrega comentarios sobre tu entrega..."
                  className="mt-1"
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                />
              </div>
            </div>

            <div className="border-2 border-dashed border-red-300 rounded-lg p-4 sm:p-6 text-center bg-red-50">
              <Upload className="h-8 w-8 sm:h-12 sm:w-12 mx-auto text-red-400 mb-4" />
              <h3 className="text-base sm:text-lg font-medium text-red-700 mb-2">Subir Archivo</h3>
              <p className="text-sm text-red-600 mb-4">Formatos permitidos: PDF, DOC, DOCX, TXT, ZIP</p>
              <Label htmlFor="main-upload" className="cursor-pointer">
                <Button variant="outline" className="border-red-300 text-red-700 hover:bg-red-100">
                  Seleccionar Archivo
                </Button>
                <Input
                  id="main-upload"
                  type="file"
                  className="hidden"
                  accept=".pdf,.doc,.docx,.txt,.zip"
                  onChange={(e) => selectedTaskId && handleFileChange(e, selectedTaskId)}
                />
              </Label>

              {selectedTaskId && selectedFiles[selectedTaskId] && (
                <div className="mt-4">
                  <div className="flex items-center gap-2 text-sm text-green-600 justify-center">
                    <FileText className="h-4 w-4" />
                    <span className="truncate" title={selectedFiles[selectedTaskId]?.name}>
                      {selectedFiles[selectedTaskId]?.name}
                    </span>
                  </div>
                  <Button
                    className="mt-3 bg-red-600 hover:bg-red-700"
                    onClick={() => handleDeliverTask(selectedTaskId)}
                  >
                    Entregar Tarea
                  </Button>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
