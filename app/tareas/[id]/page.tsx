"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Calendar, Clock, FileText, ArrowLeft, Upload, Check, X } from "lucide-react"
import { initialTasksData } from "@/components/tasks"

export default function TaskDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [task, setTask] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [comments, setComments] = useState("")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  useEffect(() => {
    // Cargar la tarea específica
    const taskId = Number.parseInt(params.id)
    const foundTask = initialTasksData.find((t) => t.id === taskId)

    if (foundTask) {
      setTask(foundTask)
    }

    setIsLoading(false)
  }, [params.id])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  const handleSubmit = () => {
    if (!selectedFile) return

    // Aquí iría la lógica para enviar la tarea
    alert(`Tarea "${task.title}" entregada con éxito`)
    router.back()
  }

  if (isLoading) {
    return (
      <div className="p-6 flex justify-center items-center min-h-[60vh]">
        <div className="animate-pulse space-y-4 w-full max-w-3xl">
          <div className="h-8 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  if (!task) {
    return (
      <div className="p-6 flex flex-col items-center justify-center min-h-[60vh]">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Tarea no encontrada</h2>
        <p className="text-gray-600 mb-6">La tarea que buscas no existe o ha sido eliminada.</p>
        <Button onClick={() => router.push("/")}>Volver al inicio</Button>
      </div>
    )
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800">Completada</Badge>
      case "in-progress":
        return <Badge className="bg-yellow-100 text-yellow-800">En Progreso</Badge>
      case "pending":
        return <Badge className="bg-red-100 text-red-800">Pendiente</Badge>
      case "delivered":
        return <Badge className="bg-blue-100 text-blue-800">Entregada</Badge>
      default:
        return <Badge>Desconocido</Badge>
    }
  }

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <Button variant="ghost" className="mb-4" onClick={() => router.back()}>
        <ArrowLeft className="h-4 w-4 mr-2" />
        Volver a Tareas
      </Button>

      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
            <div>
              <CardTitle className="text-xl sm:text-2xl text-red-700">{task.title}</CardTitle>
              <CardDescription className="text-base font-medium">{task.subject}</CardDescription>
            </div>
            {getStatusBadge(task.status)}
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="prose max-w-none">
            <h3 className="text-lg font-medium text-gray-800">Descripción</h3>
            <p className="text-gray-600">{task.description}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar className="h-4 w-4 text-red-500" />
              <span>Fecha de entrega: {new Date(task.dueDate).toLocaleDateString("es-ES")}</span>
            </div>

            {task.deliveredAt && (
              <div className="flex items-center gap-2 text-sm text-blue-600">
                <Clock className="h-4 w-4" />
                <span>Entregada: {new Date(task.deliveredAt).toLocaleString("es-ES")}</span>
              </div>
            )}

            {task.grade !== null && (
              <div className="flex items-center gap-2 text-sm text-green-600">
                <Check className="h-4 w-4" />
                <span>Calificación: {task.grade}/100</span>
              </div>
            )}
          </div>

          {task.status === "pending" || task.status === "in-progress" ? (
            <div className="space-y-4 pt-4 border-t">
              <h3 className="text-lg font-medium text-gray-800">Entregar Tarea</h3>

              <div className="space-y-3">
                <div>
                  <label htmlFor="comments" className="block text-sm font-medium text-gray-700 mb-1">
                    Comentarios (Opcional)
                  </label>
                  <Textarea
                    id="comments"
                    placeholder="Agrega comentarios sobre tu entrega..."
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>

                <div>
                  <label htmlFor="file-upload" className="block text-sm font-medium text-gray-700 mb-1">
                    Archivo de Entrega
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600 mb-2">
                      Arrastra y suelta tu archivo aquí, o haz clic para seleccionarlo
                    </p>
                    <Input
                      id="file-upload"
                      type="file"
                      className="hidden"
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx,.txt,.zip"
                    />
                    <Button
                      variant="outline"
                      onClick={() => document.getElementById("file-upload")?.click()}
                      className="mx-auto"
                    >
                      Seleccionar Archivo
                    </Button>

                    {selectedFile && (
                      <div className="mt-4 flex items-center gap-2 text-sm text-green-600 justify-center">
                        <FileText className="h-4 w-4" />
                        <span className="truncate max-w-[300px]">{selectedFile.name}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 text-red-500"
                          onClick={() => setSelectedFile(null)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : task.status === "completed" ? (
            <div className="space-y-4 pt-4 border-t">
              <h3 className="text-lg font-medium text-gray-800">Retroalimentación</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 italic">
                  "Buen trabajo en general. La implementación cumple con los requisitos solicitados. Para mejorar,
                  considera optimizar el algoritmo de ordenamiento para manejar casos extremos."
                </p>
                <div className="mt-2 text-sm text-gray-500">
                  - Prof. Martínez, {new Date(task.gradedAt || "").toLocaleDateString("es-ES")}
                </div>
              </div>
            </div>
          ) : null}
        </CardContent>

        <CardFooter className="flex justify-end gap-2 pt-2">
          {(task.status === "pending" || task.status === "in-progress") && (
            <Button onClick={handleSubmit} disabled={!selectedFile} className="bg-red-600 hover:bg-red-700">
              Entregar Tarea
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
