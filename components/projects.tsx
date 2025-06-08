"use client"

import { DialogClose } from "@/components/ui/dialog"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Calendar,
  Users,
  FileText,
  GitBranch,
  Code,
  Database,
  ExternalLink,
  Download,
  Upload,
  LinkIcon,
  ShieldCheck,
  BarChart3,
} from "lucide-react"

interface PdfContentItem {
  type: "heading" | "subheading" | "paragraph" | "list" | "keyValue" | "divider"
  text?: string
  level?: 1 | 2 | 3
  items?: string[]
  data?: { key: string; value: string }[]
}

interface PdfPayload {
  documentTitle: string
  content: PdfContentItem[]
}

const teamPhotos = {
  joseAntonio:
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Imagen%20de%20WhatsApp%202025-04-28%20a%20las%2018.59.23_300abc07.jpg-wlyfeMkXPZvzkXiKPUBwk4MqKBbuze.jpeg",
  mariaGarcia:
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Imagen%20de%20WhatsApp%202025-05-28%20a%20las%2015.26.03_a2d565a2.jpg-o53Zr5oM4eGUtSPXnuEz661K4D2IY3.jpeg",
  carlosLopez:
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Imagen%20de%20WhatsApp%202025-05-28%20a%20las%2015.26.03_fbdb09f6.jpg-tXvfBV7Zsfd6SCH8ehDzwAcKtnOBrg.jpeg",
  anaMartinez:
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Imagen%20de%20WhatsApp%202025-05-28%20a%20las%2015.49.49_50c788ab.jpg-kX025HzX1Z9ABIg1sHZradqXLHjtyu.jpeg",
}

const projects = [
  {
    id: 1,
    title: "Sistema de Gestión Universitaria",
    description: "Desarrollo de un sistema web para gestión de estudiantes, materias y calificaciones.",
    subject: "Proyecto Integrador",
    status: "in-progress",
    progress: 65,
    startDate: "2025-04-28",
    endDate: "2025-06-15",
    team: [
      { name: "José Antonio", initials: "JA", photo: teamPhotos.joseAntonio },
      { name: "María García", initials: "MG", photo: teamPhotos.mariaGarcia },
      { name: "Carlos López", initials: "CL", photo: teamPhotos.carlosLopez },
    ],
    technologies: ["React", "Node.js", "PostgreSQL", "Express", "Docker"],
    deliverables: [
      { name: "Análisis de Requerimientos", status: "completed" },
      { name: "Diseño de Base de Datos", status: "completed" },
      { name: "Prototipo UI/UX", status: "in-progress" },
      { name: "Backend API", status: "pending" },
    ],
    repository: {
      url: "https://github.com/uvm-team/sistema-gestion",
      commits: 47,
      branches: 3,
      contributors: 3,
      lastUpdate: "2025-05-27",
    },
    documentation: { pages: 25, sections: ["Arquitectura", "API Reference", "User Guide"], lastUpdate: "2025-05-26" },
  },
  {
    id: 2,
    title: "Red de Computadoras - Laboratorio",
    description: "Configuración y documentación de una red empresarial con múltiples VLANs y políticas de seguridad.",
    subject: "Redes de Computadoras Avanzadas",
    status: "completed",
    progress: 100,
    startDate: "2025-04-01",
    endDate: "2025-04-25",
    team: [
      { name: "José Antonio", initials: "JA", photo: teamPhotos.joseAntonio },
      { name: "Ana Martínez", initials: "AM", photo: teamPhotos.anaMartinez },
    ],
    technologies: ["Cisco Packet Tracer", "VLAN", "OSPF", "ACLs", "Firewall (pfSense)"],
    deliverables: [
      { name: "Diseño de Topología Segura", status: "completed" },
      { name: "Configuración de Switches y Routers", status: "completed" },
      { name: "Implementación de Políticas de Firewall", status: "completed" },
      { name: "Documentación Técnica Detallada", status: "completed" },
    ],
    repository: {
      url: "https://github.com/uvm-team/network-lab-advanced",
      commits: 35,
      branches: 2,
      contributors: 2,
      lastUpdate: "2025-04-25",
    },
    documentation: {
      pages: 22,
      sections: ["Diseño de Red", "Configuraciones", "Pruebas de Seguridad", "Troubleshooting"],
      lastUpdate: "2025-04-24",
    },
  },
  {
    id: 3,
    title: "Plataforma de Bienestar Estudiantil UVM",
    description:
      "Desarrollo de una plataforma integral con backend robusto (Node.js, PostgreSQL), API segura para integración con sistemas UVM (Banner, Blackboard) y frontend móvil (React Native). Énfasis en seguridad de datos (normativa GDPR/LFPDPPP), tests unitarios y de integración, y arquitectura escalable en contenedores (Docker).",
    subject: "Ingeniería de Software Aplicada",
    status: "in-progress",
    progress: 30,
    startDate: "2025-06-05",
    endDate: "2025-09-30",
    team: [
      { name: "José Antonio", initials: "JA", photo: teamPhotos.joseAntonio },
      { name: "María García", initials: "MG", photo: teamPhotos.mariaGarcia },
      { name: "Ana Martínez", initials: "AM", photo: teamPhotos.anaMartinez },
    ],
    technologies: ["React Native", "Node.js", "Express", "PostgreSQL", "JWT", "Docker", "Jest", "Swagger/OpenAPI"],
    deliverables: [
      { name: "Diseño de Arquitectura de Microservicios", status: "pending" },
      { name: "Definición de API (OpenAPI)", status: "in-progress" },
      { name: "Implementación de Módulos de Autenticación (OAuth2)", status: "pending" },
      { name: "Desarrollo de Módulo de Recursos de Bienestar", status: "pending" },
      { name: "Configuración de Pipeline CI/CD", status: "pending" },
      { name: "Pruebas de Seguridad y Penetración (Básicas)", status: "pending" },
    ],
    repository: {
      url: "https://github.com/uvm-is/bienestar-plataforma",
      commits: 25,
      branches: 3,
      contributors: 3,
      lastUpdate: "2025-06-01",
    },
    documentation: {
      pages: 15,
      sections: ["Arquitectura del Sistema", "Especificación API", "Modelo de Datos", "Plan de Pruebas"],
      lastUpdate: "2025-06-01",
    },
    icon: ShieldCheck,
  },
  {
    id: 4,
    title: "Sistema BI para Detección Temprana de Deserción",
    description:
      "Desarrollo de un sistema de Business Intelligence utilizando Python y TensorFlow para modelos predictivos avanzados (Redes Neuronales, Gradient Boosting) sobre factores de riesgo de deserción. Incluye un pipeline ETL automatizado (Airflow), Data Warehouse en PostgreSQL y un dashboard interactivo (React con Nivo/Recharts) para visualización de KPIs, tendencias y alertas automatizadas para tutores.",
    subject: "Sistemas Inteligentes y Minería de Datos",
    status: "in-progress",
    progress: 45,
    startDate: "2025-05-10",
    endDate: "2025-08-30",
    team: [
      { name: "Carlos López", initials: "CL", photo: teamPhotos.carlosLopez },
      { name: "José Antonio", initials: "JA", photo: teamPhotos.joseAntonio },
      { name: "María García", initials: "MG", photo: teamPhotos.mariaGarcia },
    ],
    technologies: [
      "Python",
      "Pandas",
      "Scikit-learn",
      "TensorFlow/Keras",
      "PostgreSQL",
      "Apache Airflow",
      "React",
      "Nivo/Recharts",
      "Docker",
    ],
    deliverables: [
      { name: "Diseño de Data Warehouse", status: "completed" },
      { name: "Desarrollo de Pipeline ETL con Airflow", status: "in-progress" },
      { name: "Entrenamiento y Validación de Modelos Predictivos", status: "in-progress" },
      { name: "Desarrollo de API para Dashboard", status: "pending" },
      { name: "Implementación de Dashboard Interactivo", status: "pending" },
      { name: "Documentación de Modelos y Sistema", status: "pending" },
    ],
    repository: {
      url: "https://github.com/uvm-is/desercion-bi",
      commits: 62,
      branches: 4,
      contributors: 3,
      lastUpdate: "2025-05-28",
    },
    documentation: {
      pages: 30,
      sections: ["Modelo de Datos DW", "Pipelines ETL", "Modelos Predictivos", "Guía de Usuario Dashboard"],
      lastUpdate: "2025-05-20",
    },
    icon: BarChart3,
  },
]

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null)
  const [progressData, setProgressData] = useState({
    newProgress: "",
    description: "",
    repositoryUrl: "",
    files: [] as File[],
  })
  const [isDownloading, setIsDownloading] = useState(false)

  const handleDownloadProjectDocumentationPdf = async (project: (typeof projects)[0]) => {
    setIsDownloading(true)
    const pdfPayload: PdfPayload = {
      documentTitle: `Documentación: ${project.title}`,
      content: [
        { type: "heading", text: project.title, level: 1 },
        { type: "subheading", text: `Materia: ${project.subject}` },
        { type: "divider" },
        {
          type: "keyValue",
          text: "Información General del Proyecto",
          data: [
            { key: "Estado", value: project.status },
            { key: "Progreso", value: `${project.progress}%` },
            { key: "Fecha de Inicio", value: new Date(project.startDate).toLocaleDateString("es-ES") },
            { key: "Fecha de Fin", value: new Date(project.endDate).toLocaleDateString("es-ES") },
          ],
        },
        { type: "divider" },
        {
          type: "keyValue",
          text: "Detalles de Documentación",
          data: [
            { key: "Páginas Totales", value: project.documentation.pages.toString() },
            { key: "Número de Secciones", value: project.documentation.sections.length.toString() },
            {
              key: "Última Actualización",
              value: new Date(project.documentation.lastUpdate).toLocaleDateString("es-ES"),
            },
          ],
        },
        { type: "list", text: "Secciones Disponibles", items: project.documentation.sections },
        { type: "divider" },
        { type: "list", text: "Tecnologías Utilizadas", items: project.technologies },
        { type: "divider" },
        { type: "paragraph", text: `Descripción: ${project.description}` },
      ],
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
      const safeFileName = `Documentacion_${project.title.replace(/[^a-z0-9_.-]/gi, "_")}.pdf`
      a.download = safeFileName
      document.body.appendChild(a)
      a.click()
      a.remove()
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Error al descargar PDF de documentación del proyecto:", error)
      alert(
        `Hubo un error al generar el PDF de documentación: ${error instanceof Error ? error.message : "Error desconocido"}`,
      )
    } finally {
      setIsDownloading(false)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800">Completado</Badge>
      case "in-progress":
        return <Badge className="bg-yellow-100 text-yellow-800">En Progreso</Badge>
      case "pending":
        return <Badge className="bg-red-100 text-red-800">Pendiente</Badge>
      default:
        return <Badge>Desconocido</Badge>
    }
  }

  const getDeliverableIcon = (status: string) => {
    switch (status) {
      case "completed":
        return "✅"
      case "in-progress":
        return "🔄"
      case "pending":
        return "⏳"
      default:
        return "❓"
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setProgressData({ ...progressData, files })
  }

  const handleProgressUpdate = () => {
    console.log("Actualizando progreso:", progressData)
    setProgressData({ newProgress: "", description: "", repositoryUrl: "", files: [] })
  }

  const activeProjectsCount = projects.filter((p) => p.status === "in-progress").length
  const completedProjectsCount = projects.filter((p) => p.status === "completed").length
  const totalCollaborators = new Set(projects.flatMap((p) => p.team.map((t) => t.name))).size
  const totalTechnologies = new Set(projects.flatMap((p) => p.technologies)).size

  return (
    <div className="space-y-6 sm:space-y-8 p-4 sm:p-6">
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-4 sm:p-6 rounded-lg shadow-md">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">Mis Proyectos</h1>
        <p className="text-red-100 text-sm sm:text-base">
          Gestiona y da seguimiento a tus proyectos académicos de Ingeniería en Sistemas.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <Card className="border-l-4 border-l-blue-600">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-4 sm:p-6">
            <CardTitle className="text-sm font-medium">Proyectos Activos</CardTitle>
            <Code className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <div className="text-2xl font-bold text-gray-800">{activeProjectsCount}</div>
            <p className="text-xs text-gray-600">En desarrollo</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-600">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-4 sm:p-6">
            <CardTitle className="text-sm font-medium">Completados</CardTitle>
            <FileText className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <div className="text-2xl font-bold text-gray-800">{completedProjectsCount}</div>
            <p className="text-xs text-gray-600">Este cuatrimestre</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-600">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-4 sm:p-6">
            <CardTitle className="text-sm font-medium">Colaboradores Únicos</CardTitle>
            <Users className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <div className="text-2xl font-bold text-gray-800">{totalCollaborators}</div>
            <p className="text-xs text-gray-600">En todos los proyectos</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-600">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-4 sm:p-6">
            <CardTitle className="text-sm font-medium">Tecnologías Únicas</CardTitle>
            <Database className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <div className="text-2xl font-bold text-gray-800">{totalTechnologies}</div>
            <p className="text-xs text-gray-600">Utilizadas en proyectos</p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6 sm:space-y-8">
        {projects.map((project) => (
          <Card key={project.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="p-4 sm:p-6">
              <div className="flex flex-col gap-3 sm:gap-4">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-3 mb-1">
                      {project.icon && (
                        <project.icon className="h-6 w-6 sm:h-7 sm:w-7 text-red-700 flex-shrink-0 mt-0.5" />
                      )}
                      <CardTitle className="text-lg sm:text-xl font-semibold text-red-700 break-words">
                        {project.title}
                      </CardTitle>
                    </div>
                    <CardDescription className="text-sm sm:text-base font-medium text-gray-600">
                      {project.subject}
                    </CardDescription>
                  </div>
                  <div className="flex-shrink-0 self-start">{getStatusBadge(project.status)}</div>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">{project.description}</p>
              </div>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                {/* Columna 1: Info, Progreso, Equipo */}
                <div className="space-y-4 sm:space-y-5">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2.5">Información del Proyecto</h4>
                    <div className="space-y-1.5 text-sm text-gray-700">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-500 flex-shrink-0" />
                        <span>Inicio: {new Date(project.startDate).toLocaleDateString("es-ES")}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-500 flex-shrink-0" />
                        <span>Fin: {new Date(project.endDate).toLocaleDateString("es-ES")}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2.5">Progreso General</h4>
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-sm text-gray-700">
                        <span>Completado</span>
                        <span className="font-medium">{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="h-2.5" />
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2.5">Equipo de Trabajo</h4>
                    <div className="flex -space-x-2 overflow-hidden mb-2">
                      {project.team.map((member, index) => (
                        <div
                          key={index}
                          className="h-8 w-8 sm:h-10 sm:w-10 rounded-full overflow-hidden border-2 border-white shadow"
                        >
                          <img
                            src={member.photo || "/placeholder.svg"}
                            alt={member.name}
                            className="h-full w-full object-cover object-center"
                            crossOrigin="anonymous"
                          />
                        </div>
                      ))}
                    </div>
                    <div className="text-sm text-gray-600">{project.team.map((member) => member.name).join(", ")}</div>
                  </div>
                </div>

                {/* Columna 2: Entregables */}
                <div className="space-y-4 sm:space-y-5">
                  <h4 className="font-semibold text-gray-800">Entregables Clave</h4>
                  <div className="space-y-2.5">
                    {project.deliverables.slice(0, 4).map((deliverable, index) => (
                      <div
                        key={index}
                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-2.5 bg-slate-50 rounded-md border border-slate-200"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span className="text-lg flex-shrink-0">{getDeliverableIcon(deliverable.status)}</span>
                          <span className="text-sm text-gray-700 break-words" title={deliverable.name}>
                            {deliverable.name}
                          </span>
                        </div>
                        <div className="self-start sm:self-center">{getStatusBadge(deliverable.status)}</div>
                      </div>
                    ))}
                    {project.deliverables.length > 4 && (
                      <p className="text-xs text-gray-500 text-center pt-1">
                        ...y {project.deliverables.length - 4} más.
                      </p>
                    )}
                  </div>
                </div>

                {/* Columna 3: Stack y Acciones */}
                <div className="space-y-4 sm:space-y-5">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2.5">Stack Tecnológico</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 5).map((tech, index) => (
                        <Badge key={index} variant="secondary" className="text-xs font-normal">
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies.length > 5 && (
                        <Badge variant="secondary" className="text-xs font-normal">
                          +{project.technologies.length - 5} más
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-800">Acciones</h4>
                    <div className="space-y-2.5">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" className="w-full" size="sm">
                            <GitBranch className="h-4 w-4 mr-2" />
                            Ver Repositorio
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-[95vw] sm:max-w-[600px]">
                          <DialogHeader>
                            <DialogTitle className="flex items-center gap-2 text-base sm:text-lg">
                              <GitBranch className="h-5 w-5" />
                              Repositorio: {project.title}
                            </DialogTitle>
                            <DialogDescription>Información del repositorio de código del proyecto</DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="p-4 bg-gray-50 rounded-lg border">
                                <h4 className="font-semibold text-gray-800 mb-2">Estadísticas</h4>
                                <div className="space-y-1 text-sm">
                                  <div className="flex justify-between">
                                    <span>Commits:</span>
                                    <span className="font-medium">{project.repository.commits}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>Ramas:</span>
                                    <span className="font-medium">{project.repository.branches}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>Colaboradores:</span>
                                    <span className="font-medium">{project.repository.contributors}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                                <h4 className="font-semibold text-gray-800 mb-2">Última Actualización</h4>
                                <p className="text-sm text-gray-600">
                                  {new Date(project.repository.lastUpdate).toLocaleDateString("es-ES")}
                                </p>
                                <Button asChild className="mt-3 w-full" size="sm">
                                  <a href={project.repository.url} target="_blank" rel="noopener noreferrer">
                                    <ExternalLink className="h-4 w-4 mr-2" />
                                    Abrir en GitHub
                                  </a>
                                </Button>
                              </div>
                            </div>
                            <div className="p-4 border rounded-lg">
                              <h4 className="font-semibold text-gray-800 mb-2">URL del Repositorio</h4>
                              <code className="text-xs sm:text-sm bg-gray-100 p-2 rounded block break-all">
                                {project.repository.url}
                              </code>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>

                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" className="w-full" size="sm">
                            <FileText className="h-4 w-4 mr-2" />
                            Documentación
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-[95vw] sm:max-w-[600px]">
                          <DialogHeader>
                            <DialogTitle className="flex items-center gap-2 text-base sm:text-lg">
                              <FileText className="h-5 w-5" />
                              Documentación: {project.title}
                            </DialogTitle>
                            <DialogDescription>Documentación técnica y guías del proyecto</DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 py-4" id={`documentation-content-${project.id}`}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                                <h4 className="font-semibold text-gray-800 mb-2">Información General</h4>
                                <div className="space-y-1 text-sm">
                                  <div className="flex justify-between">
                                    <span>Páginas:</span>
                                    <span className="font-medium">{project.documentation.pages}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>Secciones:</span>
                                    <span className="font-medium">{project.documentation.sections.length}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                                <h4 className="font-semibold text-gray-800 mb-2">Última Actualización</h4>
                                <p className="text-sm text-gray-600">
                                  {new Date(project.documentation.lastUpdate).toLocaleDateString("es-ES")}
                                </p>
                                <Button
                                  className="mt-3 w-full"
                                  size="sm"
                                  onClick={() => handleDownloadProjectDocumentationPdf(project)}
                                  disabled={isDownloading}
                                >
                                  <Download className="h-4 w-4 mr-2" />
                                  {isDownloading ? "Descargando..." : "Descargar Documentación"}
                                </Button>
                              </div>
                            </div>
                            <div className="p-4 border rounded-lg">
                              <h4 className="font-semibold text-gray-800 mb-3">Secciones Disponibles</h4>
                              <div className="grid grid-cols-1 gap-2">
                                {project.documentation.sections.map((section, index) => (
                                  <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded border">
                                    <FileText className="h-4 w-4 text-gray-500 flex-shrink-0" />
                                    <span className="text-sm break-words" title={section}>
                                      {section}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>

                      {project.status === "in-progress" && (
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button className="w-full bg-red-600 hover:bg-red-700" size="sm">
                              <Upload className="h-4 w-4 mr-2" />
                              Actualizar Progreso
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-[95vw] sm:max-w-[600px]">
                            <DialogHeader>
                              <DialogTitle className="flex items-center gap-2 text-base sm:text-lg">
                                <Upload className="h-5 w-5" />
                                Actualizar Progreso: {project.title}
                              </DialogTitle>
                              <DialogDescription>
                                Sube documentos, enlaces de repositorios y actualiza el progreso del proyecto
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-4 max-h-[60vh] overflow-y-auto">
                              <div className="grid gap-4">
                                <div className="grid gap-2">
                                  <Label htmlFor={`progress-${project.id}`}>Nuevo Porcentaje de Progreso (%)</Label>
                                  <Input
                                    id={`progress-${project.id}`}
                                    type="number"
                                    min="0"
                                    max="100"
                                    placeholder="75"
                                    value={progressData.newProgress}
                                    onChange={(e) => setProgressData({ ...progressData, newProgress: e.target.value })}
                                  />
                                </div>

                                <div className="grid gap-2">
                                  <Label htmlFor={`description-${project.id}`}>Descripción de Avances</Label>
                                  <Textarea
                                    id={`description-${project.id}`}
                                    placeholder="Describe los avances realizados, problemas encontrados, próximos pasos..."
                                    value={progressData.description}
                                    onChange={(e) => setProgressData({ ...progressData, description: e.target.value })}
                                    className="min-h-[80px]"
                                  />
                                </div>

                                <div className="grid gap-2">
                                  <Label htmlFor={`repository-${project.id}`}>URL del Repositorio (opcional)</Label>
                                  <div className="flex items-center gap-2">
                                    <LinkIcon className="h-5 w-5 text-gray-500 flex-shrink-0" />
                                    <Input
                                      id={`repository-${project.id}`}
                                      placeholder="https://github.com/usuario/proyecto"
                                      value={progressData.repositoryUrl}
                                      onChange={(e) =>
                                        setProgressData({ ...progressData, repositoryUrl: e.target.value })
                                      }
                                    />
                                  </div>
                                </div>

                                <div className="grid gap-2">
                                  <Label htmlFor={`files-${project.id}`}>Documentos y Archivos</Label>
                                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 sm:p-6 text-center">
                                    <Upload className="h-6 w-6 sm:h-8 sm:w-8 mx-auto text-gray-400 mb-2" />
                                    <Label
                                      htmlFor={`files-${project.id}`}
                                      className="cursor-pointer text-sm text-red-600 hover:text-red-700 font-medium"
                                    >
                                      Haz clic para subir archivos o arrastra aquí
                                      <Input
                                        id={`files-${project.id}`}
                                        type="file"
                                        multiple
                                        className="hidden"
                                        onChange={handleFileChange}
                                        accept=".pdf,.doc,.docx,.txt,.zip,.png,.jpg,.jpeg,.rar,.ppt,.pptx"
                                      />
                                    </Label>
                                    <p className="text-xs text-gray-500 mt-1">Max 10MB/archivo. PDF, DOCX, ZIP, etc.</p>
                                  </div>

                                  {progressData.files.length > 0 && (
                                    <div className="mt-3">
                                      <h5 className="text-sm font-medium mb-2">Archivos seleccionados:</h5>
                                      <div className="space-y-1">
                                        {progressData.files.map((file, index) => (
                                          <div
                                            key={index}
                                            className="flex items-center gap-2 text-sm text-green-700 bg-green-50 p-2 rounded border border-green-200"
                                          >
                                            <FileText className="h-4 w-4 flex-shrink-0" />
                                            <span className="truncate" title={file.name}>
                                              {file.name}
                                            </span>
                                            <span className="text-gray-500 ml-auto text-xs">
                                              ({(file.size / 1024 / 1024).toFixed(2)} MB)
                                            </span>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>

                              <div className="flex flex-col sm:flex-row gap-2 pt-4">
                                <Button className="flex-1 bg-red-600 hover:bg-red-700" onClick={handleProgressUpdate}>
                                  <Upload className="h-4 w-4 mr-2" />
                                  Actualizar Progreso
                                </Button>
                                <DialogClose asChild>
                                  <Button variant="outline" className="flex-1">
                                    Cancelar
                                  </Button>
                                </DialogClose>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="text-lg sm:text-xl font-semibold text-red-700">
            Guías para Proyectos de Ingeniería
          </CardTitle>
          <CardDescription className="text-gray-600">
            Principios clave para el éxito en proyectos de desarrollo de software y sistemas.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <div className="space-y-2">
              <h4 className="font-semibold text-gray-800">Ciclo de Vida del Software</h4>
              <ul className="text-sm text-gray-700 space-y-1.5 list-disc pl-5">
                <li>Requerimientos claros y bien definidos (SRS).</li>
                <li>Diseño de arquitectura robusta y escalable.</li>
                <li>Implementación modular y código limpio (SOLID).</li>
                <li>Pruebas exhaustivas (unitarias, integración, E2E).</li>
                <li>Despliegue continuo (CI/CD) y monitoreo.</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-gray-800">Gestión y Colaboración</h4>
              <ul className="text-sm text-gray-700 space-y-1.5 list-disc pl-5">
                <li>Metodologías ágiles (Scrum, Kanban).</li>
                <li>Control de versiones avanzado (Git Flow).</li>
                <li>Documentación técnica completa y actualizada.</li>
                <li>Comunicación efectiva y revisiones de código.</li>
                <li>Gestión de riesgos y dependencias.</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
