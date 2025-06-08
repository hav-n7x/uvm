"use client"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { Calendar, Clock, Users, FileText, BookOpen, Download, Bell, Settings2 } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import type { PdfPayload, PdfContentItem } from "@/types/pdf-types"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const exams = [
  {
    id: 4,
    title: "Álgebra Lineal - Examen Integral",
    subject: "Álgebra Lineal",
    type: "Integral",
    date: "2025-05-27",
    time: "02:00 PM",
    duration: "3 horas",
    classroom: "Aula Magna",
    status: "completed",
    grade: 8.4,
    maxGrade: 10.0,
    topics: [
      "Sistemas de ecuaciones lineales",
      "Método de Gauss-Jordan",
      "Matrices y determinantes",
      "Espacios vectoriales",
      "Transformaciones lineales",
    ],
    results: { totalQuestions: 60, correctAnswers: 50, incorrectAnswers: 10 },
    studyMaterial: [{ type: "link", title: "Libro: Álgebra Lineal", url: "https://example.com/algebra-libro" }],
    syllabusContent: `**Unidad 1: Sistemas de Ecuaciones**\n- Gauss-Jordan.\n\n**Unidad 2: Matrices**\n- Determinantes.`,
    reminderSet: true,
    examFormat: "Teórico-práctico.",
    allowedMaterials: "Calculadora, formulario UVM.",
  },
  {
    id: 2,
    subject: "Programación Orientada a Objetos",
    title: "POO - Examen Final",
    type: "Final",
    date: "2025-06-25",
    time: "02:00 PM",
    duration: "3 horas",
    classroom: "Laboratorio B",
    status: "scheduled",
    topics: ["Clases y Objetos", "Herencia", "Polimorfismo", "Encapsulamiento"],
    studyMaterial: [{ type: "link", title: "Presentación - Polimorfismo", url: "https://example.com/polimorfismo" }],
    syllabusContent: `**Módulo 1: POO**\n- Conceptos.\n\n**Módulo 2: Herencia**\n- Tipos.`,
    reminderSet: false,
    examFormat: "Proyecto (60%), Teórico (40%).",
    allowedMaterials: "IDE, documentación.",
  },
  {
    id: 3,
    subject: "Física General",
    title: "Física - Examen Ordinario",
    type: "Ordinario",
    date: "2025-05-31",
    time: "03:00 PM",
    duration: "2 horas",
    classroom: "Auditorio Principal",
    status: "completed",
    grade: 7.5,
    maxGrade: 10.0,
    results: { totalQuestions: 40, correctAnswers: 30, incorrectAnswers: 10 },
    topics: ["Cinemática", "Dinámica", "Leyes de Newton", "Trabajo y Energía"],
    studyMaterial: [{ type: "link", title: "Fórmulas Cinemática", url: "https://example.com/cinematica" }],
    syllabusContent: `**Tema 1: Cinemática**\n- Movimientos.\n\n**Tema 2: Dinámica**\n- Leyes de Newton.`,
    reminderSet: true,
    examFormat: "Desarrollo (50%), Problemas (50%).",
    allowedMaterials: "Calculadora, formulario.",
  },
  {
    id: 5,
    subject: "Cálculo Diferencial",
    title: "Cálculo - Primer Parcial",
    type: "Parcial",
    date: "2025-06-10",
    time: "10:00 AM",
    duration: "2 horas",
    classroom: "Aula C-203",
    status: "scheduled",
    topics: ["Funciones y Límites", "Reglas de Derivación", "Razón de Cambio"],
    studyMaterial: [{ type: "link", title: "Ejercicios de Derivadas", url: "https://example.com/derivadas" }],
    syllabusContent: `**Unidad 1: Funciones**\n- Dominio, rango, gráficas.\n\n**Unidad 2: Límites**\n- Concepto, propiedades, continuidad.`,
    reminderSet: false,
    examFormat: "Opción múltiple (40%), Problemas (60%).",
    allowedMaterials: "Calculadora científica.",
  },
  {
    id: 6,
    subject: "Metodología de la Investigación",
    title: "Investigación - Avance Proyecto",
    type: "Entrega Parcial",
    date: "2025-06-18",
    time: "N/A (Entrega en línea)",
    duration: "N/A",
    classroom: "Plataforma Virtual",
    status: "scheduled",
    topics: ["Planteamiento del Problema", "Justificación", "Marco Teórico (Borrador)"],
    studyMaterial: [{ type: "link", title: "Guía de Proyecto UVM", url: "https://example.com/guia-proyecto" }],
    syllabusContent: `**Fase 1: Definición**\n- Selección de tema.\n- Preguntas de investigación.\n\n**Fase 2: Fundamentación**\n- Revisión de literatura.`,
    reminderSet: true,
    examFormat: "Documento escrito (formato APA).",
    allowedMaterials: "Acceso a biblioteca digital, procesador de texto.",
  },
]

export function Exams() {
  const [isDownloading, setIsDownloading] = useState(false)

  const parseSyllabusContent = (syllabus: string): PdfContentItem[] => {
    const items: PdfContentItem[] = []
    const lines = syllabus.trim().split("\n")
    let currentListItems: string[] | null = null

    lines.forEach((line) => {
      line = line.trim()
      if (line.startsWith("**") && line.endsWith("**")) {
        if (currentListItems) {
          items.push({ type: "list", items: currentListItems })
          currentListItems = null
        }
        items.push({ type: "heading", level: 2, text: line.substring(2, line.length - 2) })
      } else if (line.startsWith("- ") || line.startsWith("* ")) {
        if (!currentListItems) {
          currentListItems = []
        }
        currentListItems.push(line.substring(2))
      } else if (line) {
        if (currentListItems) {
          items.push({ type: "list", items: currentListItems })
          currentListItems = null
        }
        items.push({ type: "paragraph", text: line })
      }
    })
    if (currentListItems) {
      items.push({ type: "list", items: currentListItems })
    }
    return items
  }

  const handleDownloadPdf = async (title: string, contentItems: PdfContentItem[]) => {
    setIsDownloading(true)
    const pdfPayload: PdfPayload = {
      documentTitle: title,
      content: contentItems,
    }

    try {
      const response = await fetch("/api/generar-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pdfPayload),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(`Error del servidor: ${response.status} ${response.statusText}. ${errorData.message || ""}`)
      }

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      const safeFileName = `${title.replace(/[^a-z0-9_.-]/gi, "_")}.pdf`
      a.download = safeFileName
      document.body.appendChild(a)
      a.click()
      a.remove()
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error(`Error al descargar PDF para "${title}":`, error)
      alert(`Hubo un error al generar el PDF: ${error instanceof Error ? error.message : "Error desconocido"}`)
    } finally {
      setIsDownloading(false)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "scheduled":
        return <Badge className="bg-blue-100 text-blue-800 px-2 py-0.5">Programado</Badge>
      case "completed":
        return <Badge className="bg-green-100 text-green-800 px-2 py-0.5">Completado</Badge>
      case "graded":
        return <Badge className="bg-purple-100 text-purple-800 px-2 py-0.5">Calificado</Badge>
      default:
        return <Badge className="px-2 py-0.5">Desconocido</Badge>
    }
  }

  const getGradeColor = (grade: number, maxGrade: number) => {
    const percentage = (grade / maxGrade) * 100
    if (percentage >= 90) return "text-green-600"
    if (percentage >= 70) return "text-blue-600"
    if (percentage >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const toggleReminder = (examId: number) => {
    const exam = exams.find((e) => e.id === examId)
    if (exam) {
      const newReminderSet = !exam.reminderSet
      alert(`Recordatorio para ${exam.title} ${newReminderSet ? "activado" : "desactivado"}. (Simulación)`)
    }
  }

  return (
    <div className="space-y-6 sm:space-y-8 p-4 sm:p-6">
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-4 sm:p-6 rounded-lg shadow-md">
        <h1 className="text-2xl sm:text-3xl font-bold mb-1">Mis Exámenes</h1>
        <p className="text-red-100 text-sm">Consulta fechas, temarios y material de estudio.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {exams.map((exam) => (
          <Card key={exam.id} className="flex flex-col shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="p-4">
              <div className="flex flex-col sm:flex-row justify-between items-start gap-2 mb-1">
                <CardTitle className="text-base sm:text-lg text-red-700 leading-tight break-words">
                  {exam.title || exam.subject}
                </CardTitle>
                {getStatusBadge(exam.status)}
              </div>
              <CardDescription className="text-sm font-medium text-gray-500">{exam.type}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow p-4 space-y-4">
              <div className="text-xs text-gray-600 space-y-1.5">
                <div className="flex items-center">
                  <Calendar className="h-3.5 w-3.5 mr-1.5 text-red-500 flex-shrink-0" />
                  <span className="break-words">
                    {new Date(exam.date).toLocaleDateString("es-ES", {
                      weekday: "short",
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-3.5 w-3.5 mr-1.5 text-red-500 flex-shrink-0" />
                  <span className="break-words">
                    {exam.time} ({exam.duration})
                  </span>
                </div>
                <div className="flex items-center">
                  <Users className="h-3.5 w-3.5 mr-1.5 text-red-500 flex-shrink-0" />
                  <span className="break-words">{exam.classroom}</span>
                </div>
              </div>

              {exam.status === "completed" &&
                exam.grade !== undefined &&
                exam.maxGrade !== undefined &&
                exam.results && (
                  <div className="pt-1 space-y-0.5">
                    <h4 className="font-semibold text-xs text-gray-700 mb-1">Calificación:</h4>
                    <div className={`text-xl font-bold ${getGradeColor(exam.grade, exam.maxGrade)}`}>
                      {exam.grade.toFixed(1)}
                      <span className="text-xs font-normal text-gray-500"> / {exam.maxGrade.toFixed(1)}</span>
                    </div>
                    <Progress
                      value={(exam.grade / exam.maxGrade) * 100}
                      className="mt-0.5 h-1.5"
                      indicatorClassName={
                        getGradeColor(exam.grade, exam.maxGrade).replace("text-", "bg-") + " opacity-75"
                      }
                    />
                  </div>
                )}

              <div>
                <h4 className="font-semibold text-xs text-gray-700 mb-1.5 mt-1.5">Temas Principales:</h4>
                <div className="flex flex-wrap gap-1">
                  {exam.topics.slice(0, 3).map((topic, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="text-xs bg-red-50 text-red-700 border-red-200 px-1.5 py-0.5 font-normal"
                    >
                      {topic}
                    </Badge>
                  ))}
                  {exam.topics.length > 3 && (
                    <Badge
                      variant="outline"
                      className="text-xs bg-gray-100 text-gray-600 border-gray-200 px-1.5 py-0.5 font-normal"
                    >
                      +{exam.topics.length - 3} más
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end p-3 border-t bg-gray-50/50">
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                  >
                    Detalles
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-[95vw] sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="text-base sm:text-lg">Detalles del Examen: {exam.subject}</DialogTitle>
                    <DialogDescription>Información completa sobre este examen.</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-3 py-4 max-h-[60vh] overflow-y-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <h4 className="text-sm font-semibold">Asignatura</h4>
                        <p className="text-sm">{exam.subject}</p>
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-sm font-semibold">Tipo</h4>
                        <p className="text-sm">{exam.type}</p>
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-sm font-semibold">Fecha</h4>
                        <p className="text-sm">{new Date(exam.date).toLocaleDateString("es-ES")}</p>
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-sm font-semibold">Hora</h4>
                        <p className="text-sm">{exam.time}</p>
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-sm font-semibold">Duración</h4>
                        <p className="text-sm">{exam.duration}</p>
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-sm font-semibold">Aula</h4>
                        <p className="text-sm">{exam.classroom}</p>
                      </div>
                    </div>

                    <div className="space-y-2 pt-2">
                      <h4 className="text-sm font-semibold">Temas</h4>
                      <div className="flex flex-wrap gap-1">
                        {exam.topics.map((topic, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="text-xs bg-red-50 text-red-700 border-red-200"
                          >
                            {topic}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-3 pt-3">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => {
                          const dialogTriggers = document.querySelectorAll('[data-dialog-trigger="study-material"]')
                          if (dialogTriggers.length > 0) {
                            ;(dialogTriggers[0] as HTMLElement).click()
                          }
                        }}
                      >
                        <BookOpen className="h-4 w-4 mr-2" />
                        Material de Estudio
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => {
                          const dialogTriggers = document.querySelectorAll('[data-dialog-trigger="syllabus"]')
                          if (dialogTriggers.length > 0) {
                            ;(dialogTriggers[0] as HTMLElement).click()
                          }
                        }}
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        Ver Temario
                      </Button>
                    </div>

                    <Button
                      variant={exam.reminderSet ? "destructive" : "default"}
                      size="sm"
                      className="w-full mt-2"
                      onClick={() => toggleReminder(exam.id)}
                    >
                      <Bell className="h-4 w-4 mr-2" />
                      {exam.reminderSet ? "Desactivar Recordatorio" : "Activar Recordatorio"}
                    </Button>
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="ghost" size="sm">
                        Cerrar
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 ml-2 text-gray-600 hover:text-gray-800">
                    <span className="sr-only">Abrir menú de opciones</span>
                    <Settings2 className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="min-w-[200px]">
                  <Dialog>
                    <DialogTrigger asChild data-dialog-trigger="study-material">
                      <DropdownMenuItem onSelect={(e) => e.preventDefault()} data-dialog-trigger="study-material">
                        <BookOpen className="h-4 w-4 mr-2 text-gray-500" />
                        <span>Ver Material de Estudio</span>
                      </DropdownMenuItem>
                    </DialogTrigger>
                    <DialogContent className="max-w-[95vw] sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle className="text-base sm:text-lg">Material de Estudio: {exam.subject}</DialogTitle>
                        <DialogDescription>Recursos para prepararte para tu examen.</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-3 py-4 max-h-[60vh] overflow-y-auto">
                        {exam.studyMaterial.length > 0 ? (
                          exam.studyMaterial.map((material, index) => (
                            <div key={index} className="p-3 border rounded-md bg-gray-50">
                              <p className="font-medium text-sm text-gray-800 break-words">{material.title}</p>
                              {material.type === "link" && (
                                <a
                                  href={material.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-xs text-red-600 hover:underline break-all"
                                >
                                  Abrir enlace
                                </a>
                              )}
                              {material.type === "file" && (
                                <span className="text-xs text-gray-600">
                                  Archivo: {material.fileName} (Descarga no implementada)
                                </span>
                              )}
                              {material.type === "video" && (
                                <a
                                  href={material.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-xs text-red-600 hover:underline break-all"
                                >
                                  Ver video
                                </a>
                              )}
                            </div>
                          ))
                        ) : (
                          <p className="text-sm text-gray-500">
                            No hay material de estudio disponible para este examen.
                          </p>
                        )}
                      </div>
                      <DialogFooter className="mt-4 flex-col sm:flex-row gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const content: PdfContentItem[] = [
                              { type: "heading", level: 1, text: `Material de Estudio: ${exam.subject}` },
                              { type: "divider" },
                            ]
                            exam.studyMaterial.forEach((material) => {
                              content.push({ type: "subheading", text: material.title })
                              if (material.type === "link" || material.type === "video") {
                                content.push({ type: "paragraph", text: `Recurso: ${material.url}` })
                              } else if (material.type === "file") {
                                content.push({ type: "paragraph", text: `Archivo: ${material.fileName}` })
                              }
                            })
                            if (exam.studyMaterial.length === 0) {
                              content.push({ type: "paragraph", text: "No hay material de estudio disponible." })
                            }
                            handleDownloadPdf(`Material_Estudio_${exam.subject}`, content)
                          }}
                          disabled={isDownloading}
                          className="w-full sm:w-auto"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          {isDownloading ? "Descargando..." : "Descargar Lista"}
                        </Button>
                        <DialogClose asChild>
                          <Button variant="ghost" size="sm" className="w-full sm:w-auto">
                            Cerrar
                          </Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  <Dialog>
                    <DialogTrigger asChild data-dialog-trigger="syllabus">
                      <DropdownMenuItem onSelect={(e) => e.preventDefault()} data-dialog-trigger="syllabus">
                        <FileText className="h-4 w-4 mr-2 text-gray-500" />
                        <span>Ver Temario</span>
                      </DropdownMenuItem>
                    </DialogTrigger>
                    <DialogContent className="max-w-[95vw] sm:max-w-lg">
                      <DialogHeader>
                        <DialogTitle className="text-base sm:text-lg">
                          Temario: {exam.subject} - {exam.type}
                        </DialogTitle>
                      </DialogHeader>
                      <div className="prose prose-sm max-w-none py-4 max-h-[60vh] overflow-y-auto">
                        {exam.syllabusContent
                          .trim()
                          .split("\n\n")
                          .map((paragraph, pIdx) => (
                            <div key={pIdx} className="mb-2">
                              {paragraph
                                .trim()
                                .split("\n")
                                .map((line, lIdx) => {
                                  line = line.trim()
                                  if (line.startsWith("**") && line.endsWith("**")) {
                                    return (
                                      <h3 key={lIdx} className="font-semibold text-md mt-2 mb-1">
                                        {line.substring(2, line.length - 2)}
                                      </h3>
                                    )
                                  } else if (line.startsWith("- ") || line.startsWith("* ")) {
                                    return (
                                      <li key={lIdx} className="ml-4 text-sm list-disc">
                                        {line.substring(2)}
                                      </li>
                                    )
                                  }
                                  return (
                                    <p key={lIdx} className="text-sm">
                                      {line}
                                    </p>
                                  )
                                })}
                            </div>
                          ))}
                      </div>
                      <DialogFooter className="mt-4 flex-col sm:flex-row gap-2">
                        <Button
                          size="sm"
                          onClick={() => {
                            const content: PdfContentItem[] = [
                              { type: "heading", level: 1, text: `Temario: ${exam.subject} - ${exam.type}` },
                              { type: "divider" },
                              ...parseSyllabusContent(exam.syllabusContent),
                              { type: "divider" },
                              { type: "heading", level: 2, text: "Formato del Examen" },
                              { type: "paragraph", text: exam.examFormat || "No especificado." },
                              { type: "divider" },
                              { type: "heading", level: 2, text: "Materiales Permitidos" },
                              { type: "paragraph", text: exam.allowedMaterials || "Consultar con el profesor." },
                            ]
                            handleDownloadPdf(`Temario_${exam.subject}_${exam.type}`, content)
                          }}
                          disabled={isDownloading}
                          className="w-full sm:w-auto"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          {isDownloading ? "Descargando..." : "Descargar Temario"}
                        </Button>
                        <DialogClose asChild>
                          <Button variant="ghost" size="sm" className="w-full sm:w-auto">
                            Cerrar
                          </Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => toggleReminder(exam.id)}>
                    <Bell className={`h-4 w-4 mr-2 ${exam.reminderSet ? "text-red-500" : "text-gray-500"}`} />
                    <span>{exam.reminderSet ? "Desactivar Recordatorio" : "Activar Recordatorio"}</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
