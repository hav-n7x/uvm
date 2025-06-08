"use client"
import { useState } from "react"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, Calendar, Clock, Download, FileText, LinkIcon } from "lucide-react"
import type { PdfPayload, PdfContentItem } from "@/types/pdf-types"

const recordedClasses = [
  {
    id: "clase001",
    title: "Introducción a Algoritmos con Python",
    subject: "Programación Fundamental",
    professor: "Dr. Alejandro Vargas",
    date: "2025-05-15",
    duration: "1h 45min",
    videoUrl: "https://www.youtube.com/watch?v=example_python_algoritmos",
    summary:
      "Esta clase cubre los fundamentos de los algoritmos utilizando Python, enfocándose en estructuras de control y tipos de datos básicos.",
    keyPoints: [
      "¿Qué es un algoritmo?",
      "Variables, tipos de datos y operadores en Python.",
      "Estructuras de control: if-else, for, while.",
      "Funciones básicas.",
    ],
    tags: ["Python", "Algoritmos", "Principiantes"],
    relatedLinks: [
      { title: "Documentación Oficial de Python", url: "https://docs.python.org/3/" },
      { title: "Python Tutorial for Beginners (YouTube)", url: "https://www.youtube.com/watch?v=rfscVS0vtbw" },
    ],
  },
  {
    id: "clase002",
    title: "Conceptos Básicos de Machine Learning",
    subject: "Inteligencia Artificial Aplicada",
    professor: "Dra. Isabel Herrera",
    date: "2025-05-22",
    duration: "2h 10min",
    videoUrl: "https://www.youtube.com/watch?v=example_ml_conceptos",
    summary:
      "Un vistazo a los conceptos esenciales del Machine Learning, incluyendo tipos de aprendizaje y modelos comunes.",
    keyPoints: [
      "Aprendizaje Supervisado vs. No Supervisado.",
      "Modelos de Regresión y Clasificación (introducción).",
      "¿Qué son los datos de entrenamiento y prueba?",
    ],
    tags: ["Machine Learning", "IA", "Conceptos"],
    relatedLinks: [
      { title: "Machine Learning Glossary by Google", url: "https://developers.google.com/machine-learning/glossary" },
      { title: "Intro to Machine Learning (YouTube)", url: "https://www.youtube.com/watch?v=ukzFI9rgwfU" },
    ],
  },
  {
    id: "clase003",
    title: "Desarrollo Frontend con React",
    subject: "Programación Web Avanzada",
    professor: "Ing. Ricardo Montoya",
    date: "2025-04-10",
    duration: "2h 30min",
    videoUrl: "https://www.youtube.com/watch?v=example_react_frontend",
    summary: "Aprende a construir interfaces de usuario interactivas con la librería React.",
    keyPoints: [
      "Componentes y Props.",
      "Estado y Ciclo de Vida.",
      "Manejo de Eventos.",
      "Hooks básicos (useState, useEffect).",
    ],
    tags: ["React", "Frontend", "JavaScript"],
    relatedLinks: [
      { title: "Documentación Oficial de React", url: "https://react.dev/" },
      { title: "React JS Crash Course (YouTube)", url: "https://www.youtube.com/watch?v=w7ejDZ8SWv8" },
    ],
  },
]

export function OnlineClasses() {
  const [isDownloading, setIsDownloading] = useState(false)

  const handleDownloadClassSummaryPdf = async (clase: (typeof recordedClasses)[0]) => {
    setIsDownloading(true)
    const content: PdfContentItem[] = [
      { type: "heading", level: 2, text: `Clase: ${clase.title}` },
      { type: "divider" },
      {
        type: "keyValue",
        data: [
          { key: "Materia", value: clase.subject },
          { key: "Profesor", value: clase.professor },
          { key: "Fecha", value: new Date(clase.date).toLocaleDateString("es-ES") },
          { key: "Duración", value: clase.duration },
        ],
      },
      { type: "divider" },
      { type: "heading", level: 3, text: "Resumen de la Clase" },
      { type: "paragraph", text: clase.summary },
      { type: "divider" },
      { type: "heading", level: 3, text: "Puntos Clave" },
      { type: "list", items: clase.keyPoints },
      { type: "divider" },
      { type: "heading", level: 3, text: "Enlaces Relacionados" },
    ]
    if (clase.relatedLinks && clase.relatedLinks.length > 0) {
      clase.relatedLinks.forEach((link) => {
        content.push({ type: "paragraph", text: `${link.title}: ${link.url}` })
      })
    } else {
      content.push({ type: "paragraph", text: "No hay enlaces relacionados disponibles." })
    }

    const pdfPayload: PdfPayload = {
      documentTitle: `Resumen - ${clase.title}`,
      content: content,
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
      const safeFileName = `Resumen_${clase.title.replace(/[^a-z0-9_.-]/gi, "_")}.pdf`
      a.download = safeFileName
      document.body.appendChild(a)
      a.click()
      a.remove()
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Error al descargar PDF del resumen de clase:", error)
      alert(`Hubo un error al generar el PDF: ${error instanceof Error ? error.message : "Error desconocido"}`)
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-6 rounded-lg">
        <h2 className="text-2xl font-bold">Clases Grabadas y Recursos</h2>
        <p className="text-red-100">Accede a tus clases anteriores y material complementario.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {recordedClasses.map((clase) => (
          <Card key={clase.id} className="flex flex-col">
            <CardHeader>
              <a
                href={clase.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
                aria-label={`Ver video de ${clase.title} en YouTube`}
              >
                <CardTitle className="text-lg text-red-700 hover:text-red-800 transition-colors">
                  {clase.title}
                </CardTitle>
              </a>
              <CardDescription className="text-sm">{clase.subject}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow space-y-2 text-sm">
              <div className="flex items-center text-gray-600">
                <Users className="h-4 w-4 mr-2 text-red-500" />
                <span>{clase.professor}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Calendar className="h-4 w-4 mr-2 text-red-500" />
                <span>{new Date(clase.date).toLocaleDateString("es-ES")}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Clock className="h-4 w-4 mr-2 text-red-500" />
                <span>{clase.duration}</span>
              </div>
              <p className="text-xs text-gray-500 pt-1">{clase.summary.substring(0, 120)}...</p>
              <div className="pt-2">
                {clase.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="mr-1 mb-1 text-xs bg-red-100 text-red-700">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="w-full">
                    <FileText className="h-4 w-4 mr-2" /> Ver Detalles
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-lg">
                  <DialogHeader>
                    <DialogTitle>{clase.title}</DialogTitle>
                    <DialogDescription>
                      Profesor: {clase.professor} - Fecha: {new Date(clase.date).toLocaleDateString("es-ES")}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="py-4 space-y-4 max-h-[60vh] overflow-y-auto">
                    <div>
                      <h4 className="font-semibold text-md mb-1">Resumen:</h4>
                      <p className="text-sm text-gray-700">{clase.summary}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-md mb-1">Puntos Clave:</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                        {clase.keyPoints.map((point, idx) => (
                          <li key={idx}>{point}</li>
                        ))}
                      </ul>
                    </div>
                    {clase.relatedLinks && clase.relatedLinks.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-md mb-1">Enlaces Relacionados:</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                          {clase.relatedLinks.map((link, idx) => (
                            <li key={idx}>
                              <a
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-red-600 hover:underline hover:text-red-800 flex items-center"
                              >
                                <LinkIcon className="h-3 w-3 mr-1" />
                                {link.title}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  <DialogFooter className="flex-col sm:flex-row gap-2 pt-4">
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => handleDownloadClassSummaryPdf(clase)}
                      disabled={isDownloading}
                      className="bg-red-600 hover:bg-red-700 w-full sm:w-auto"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      {isDownloading ? "Descargando..." : "Resumen PDF"}
                    </Button>
                    <DialogClose asChild>
                      <Button variant="outline" size="sm" className="w-full sm:w-auto">
                        Cerrar
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
