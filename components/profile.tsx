"use client"

import { DialogFooter } from "@/components/ui/dialog"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import {
  Edit,
  Mail,
  Phone,
  MapPin,
  Calendar,
  GraduationCap,
  BookOpen,
  FileText,
  Bell,
  Download,
  ExternalLink,
  Home,
  Instagram,
} from "lucide-react"
import { OnlineClasses } from "@/components/online-classes"
import { Certificates } from "@/components/certificates"
import { useState, useEffect } from "react"
import type { PdfPayload, PdfContentItem } from "@/types/pdf-types"

const subjects = [
  {
    id: 1,
    name: "Álgebra Lineal",
    professor: "Prof. Dr. García López",
    grade: 8.5,
    syllabus: {
      unit1: "Sistemas de ecuaciones lineales",
      unit2: "Matrices y determinantes",
      unit3: "Espacios vectoriales",
      unit4: "Transformaciones lineales",
    },
    schedule: "Lunes y Miércoles 10:00-12:00",
    classroom: "Aula Virtual A-101",
  },
  {
    id: 2,
    name: "Programación Avanzada",
    professor: "Prof. Ing. Martínez",
    grade: 9.2,
    syllabus: {
      unit1: "Algoritmos de ordenamiento",
      unit2: "Estructuras de datos",
      unit3: "Programación orientada a objetos",
      unit4: "Patrones de diseño",
    },
    schedule: "Martes y Jueves 14:00-16:00",
    classroom: "Lab. Sistemas B-205",
  },
  {
    id: 3,
    name: "Cálculo Diferencial",
    professor: "Prof. M.C. Elena Torres",
    grade: 8.8,
    syllabus: {
      unit1: "Funciones y Límites",
      unit2: "La Derivada",
      unit3: "Aplicaciones de la Derivada",
      unit4: "Optimización",
    },
    schedule: "Lunes y Miércoles 08:00-10:00",
    classroom: "Aula C-203",
  },
  {
    id: 4,
    name: "Comunicación Oral y Escrita",
    professor: "Lic. Sofía Ramírez",
    grade: 9.5,
    syllabus: {
      unit1: "Proceso de Comunicación",
      unit2: "Comunicación Escrita Efectiva",
      unit3: "Presentaciones Orales",
      unit4: "Argumentación",
    },
    schedule: "Martes 10:00-12:00",
    classroom: "Salón de Usos Múltiples",
  },
  {
    id: 5,
    name: "Metodología de la Investigación",
    professor: "Dr. Ricardo Solís",
    grade: 8.3,
    syllabus: {
      unit1: "Fundamentos de la Investigación",
      unit2: "Planteamiento del Problema",
      unit3: "Diseño Metodológico",
      unit4: "Análisis de Resultados",
    },
    schedule: "Jueves 08:00-10:00",
    classroom: "Aula Virtual D-105",
  },
  {
    id: 6,
    name: "Desarrollo Humano y Profesional",
    professor: "Psic. Laura Méndez",
    grade: 9.0,
    syllabus: {
      unit1: "Autoconocimiento y Autoestima",
      unit2: "Inteligencia Emocional",
      unit3: "Ética Profesional",
      unit4: "Liderazgo y Trabajo en Equipo",
    },
    schedule: "Viernes 12:00-14:00",
    classroom: "Aula B-110",
  },
]

const initialNotifications = [
  {
    id: 1,
    title: "Examen de Programación Avanzada",
    message:
      "Recordatorio: Examen final el 31 de mayo a las 2:00 PM en el Laboratorio B. Duración: 3 horas. Temas: Clases, Objetos, Herencia, Polimorfismo.",
    type: "exam",
    date: "2025-05-29",
    read: false,
    enabled: true,
    relatedLink: "/exams#programacion-avanzada",
  },
  {
    id: 2,
    title: "Nueva tarea disponible",
    message:
      "Se ha asignado una nueva tarea de Base de Datos: 'Diseño de Esquema Relacional'. Fecha de entrega: 10 de Junio.",
    type: "assignment",
    date: "2025-05-28",
    read: true,
    enabled: true,
    relatedLink: "/tasks#base-de-datos-tarea-3",
  },
  {
    id: 3,
    title: "Pago de colegiatura",
    message: "Tu pago de junio por $3,500 MXN ha sido procesado exitosamente. Gracias por mantenerte al corriente.",
    type: "payment",
    date: "2025-06-01",
    read: false,
    enabled: true,
  },
  {
    id: 4,
    title: "Calificación disponible",
    message: "Ya está disponible tu calificación de Álgebra Lineal (Examen Integral Mayo 27): 8.4/10.0. ¡Felicidades!",
    type: "grade",
    date: "2025-05-28",
    read: true,
    enabled: true,
    relatedLink: "/exams#algebra-lineal-integral",
  },
  {
    id: 5,
    title: "Cambio de Aula: Examen Cálculo",
    message:
      "Atención: El examen de Cálculo Diferencial del 10 de Junio ha sido cambiado al Aula Magna. La hora permanece igual (10:00 AM).",
    type: "exam",
    date: "2025-06-03",
    read: false,
    enabled: true,
    relatedLink: "/exams#calculo-diferencial-parcial1",
  },
  {
    id: 6,
    title: "Conferencia: IA en la Ingeniería Moderna",
    message:
      "No te pierdas la conferencia sobre Inteligencia Artificial impartida por el Dr. Alan Turing Jr. este viernes a las 5 PM en el Auditorio Principal. ¡Regístrate!",
    type: "general", // Usaremos 'general' para este tipo de evento
    date: "2025-06-04",
    read: false,
    enabled: true,
    relatedLink: "/events#conferencia-ia",
  },
  {
    id: 7,
    title: "Clase Grabada Disponible: Redes Seguras",
    message:
      "La grabación de la clase 'Configuración Avanzada de Firewalls' de Redes de Computadoras ya está disponible en la sección de Clases Online.",
    type: "classUpdate", // Podríamos necesitar añadir 'classUpdate' a los tipos de notificación y settings
    date: "2025-06-05",
    read: true,
    enabled: true,
    relatedLink: "/online-classes#redes-firewalls",
  },
  {
    id: 8,
    title: "Mantenimiento Programado del Portal",
    message:
      "El portal UVM estará en mantenimiento el Sábado 8 de Junio de 2:00 AM a 4:00 AM. El acceso podría verse interrumpido.",
    type: "general",
    date: "2025-06-05",
    read: false,
    enabled: true,
  },
]

export function Profile() {
  const [selectedSubject, setSelectedSubject] = useState<(typeof subjects)[0] | null>(null)
  const [notes, setNotes] = useState("")
  const [notifications, setNotifications] = useState(initialNotifications)
  const [isDownloadingCredential, setIsDownloadingCredential] = useState(false)

  const [notificationSettings, setNotificationSettings] = useState(() => {
    if (typeof window !== "undefined") {
      const savedSettings = localStorage.getItem("uvm-notification-settings")
      return savedSettings
        ? JSON.parse(savedSettings)
        : { exams: true, assignments: true, payments: true, grades: true, general: true, classUpdate: true } // Añadir classUpdate
    }
    return { exams: true, assignments: true, payments: true, grades: true, general: true, classUpdate: true }
  })

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("uvm-notification-settings", JSON.stringify(notificationSettings))
    }
  }, [notificationSettings])

  const handleNotificationSettingChange = (key: keyof typeof notificationSettings, checked: boolean) => {
    setNotificationSettings((prev) => ({ ...prev, [key]: checked }))
  }

  const markNotificationAsRead = (id: number) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const getGradeBadge = (grade: number) => {
    if (grade >= 9) return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
    if (grade >= 8) return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
    if (grade >= 7) return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
    return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "exam":
        return <GraduationCap className="h-5 w-5 text-red-500" />
      case "assignment":
        return <FileText className="h-5 w-5 text-blue-500" />
      case "payment":
        return <Mail className="h-5 w-5 text-green-500" />
      case "grade":
        return <BookOpen className="h-5 w-5 text-purple-500" />
      default:
        return <Bell className="h-5 w-5 text-gray-500" />
    }
  }

  const unreadNotificationsCount = notifications.filter(
    (n) => !n.read && n.enabled && notificationSettings[n.type as keyof typeof notificationSettings] !== false,
  ).length

  const handleDownloadCredentialPdf = async () => {
    setIsDownloadingCredential(true)
    const studentInfo = {
      name: "José Antonio Ríos Rojo",
      id: "21H04156",
      career: "Ingeniería en Sistemas",
      campus: "Campus Hispano",
      semester: "4° Cuatrimestre",
      validUntil: "Jul 2025",
      modality: "Semipresencial",
      photoUrl:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Imagen%20de%20WhatsApp%202025-04-28%20a%20las%2018.59.23_300abc07.jpg-wlyfeMkXPZvzkXiKPUBwk4MqKBbuze.jpeg",
      uvmLogoUrl:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Imagen%20de%20WhatsApp%202025-04-28%20a%20las%2022.34.52_65bb3da3.jpg-ux7xSEqS2Ix7X2nzQPsxQSz4puwtzk.jpeg",
      qrCodePlaceholder: "QR Code Placeholder - UVM-21H04156-2025",
    }

    const content: PdfContentItem[] = [
      { type: "heading", level: 1, text: "Credencial Digital UVM" },
      { type: "divider" },
      {
        type: "keyValue",
        data: [
          { key: "Nombre", value: studentInfo.name },
          { key: "Matrícula", value: studentInfo.id },
          { key: "Carrera", value: studentInfo.career },
          { key: "Campus", value: studentInfo.campus },
          { key: "Cuatrimestre", value: studentInfo.semester },
          { key: "Modalidad", value: studentInfo.modality },
          { key: "Vigencia", value: studentInfo.validUntil },
        ],
      },
      { type: "divider" },
      { type: "paragraph", text: `Foto del Estudiante: (Ver en portal)` },
      { type: "paragraph", text: `Logo UVM: (Ver en portal)` },
      { type: "paragraph", text: `Código QR: ${studentInfo.qrCodePlaceholder}` },
      { type: "divider" },
      {
        type: "paragraph",
        text: "Nota: Esta es una representación PDF de su credencial digital. Para uso oficial, presente su credencial física o la versión digital en la app UVM.",
      },
    ]

    const pdfPayload: PdfPayload = {
      documentTitle: `Credencial_UVM_${studentInfo.id}`,
      content: content,
    }

    try {
      const response = await fetch("/api/generar-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pdfPayload),
      })

      if (!response.ok) throw new Error(`Error del servidor: ${response.status} ${response.statusText}`)

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `Credencial_UVM_${studentInfo.id}.pdf`
      document.body.appendChild(a)
      a.click()
      a.remove()
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Error al descargar PDF de la credencial:", error)
      alert(
        `Hubo un error al generar el PDF de la credencial: ${
          error instanceof Error ? error.message : "Error desconocido"
        }`,
      )
    } finally {
      setIsDownloadingCredential(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-6 rounded-lg">
        <h1 className="text-3xl font-bold mb-2">Mi Perfil</h1>
        <p className="text-red-100">Información personal y académica</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader className="text-center">
            <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-red-600">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Imagen%20de%20WhatsApp%202025-04-28%20a%20las%2018.59.23_300abc07.jpg-wlyfeMkXPZvzkXiKPUBwk4MqKBbuze.jpeg"
                alt="José Antonio Ríos Rojo"
                className="w-full h-full object-cover object-center"
                crossOrigin="anonymous"
                style={{ aspectRatio: "1/1" }}
              />
            </div>
            <CardTitle className="text-red-700 dark:text-red-400">José Antonio Ríos Rojo</CardTitle>
            <CardDescription>Estudiante de Ingeniería en Sistemas</CardDescription>
            <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300 w-fit mx-auto">Activo</Badge>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2 text-sm">
              <Mail className="h-4 w-4 text-gray-500" />
              <a
                href="mailto:jose.rios@uvm.edu.mx"
                className="text-blue-600 hover:text-blue-800 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                jose.rios@uvm.edu.mx
              </a>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Phone className="h-4 w-4 text-gray-500" />
              <span>+52 55 6974 7115</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 text-gray-500" />
              <span>Campus Hispano</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-gray-500" />
              <span>Ingreso: 16 de Agosto 2021</span>
            </div>

            <Separator />

            <div className="space-y-2">
              <Button className="w-full bg-red-600 hover:bg-red-700">
                <Edit className="h-4 w-4 mr-2" />
                Editar Perfil
              </Button>

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full">
                    <FileText className="h-4 w-4 mr-2" />
                    Mis Documentos
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Documentos Personales
                    </DialogTitle>
                    <DialogDescription>Información personal y documentos importantes</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-800 dark:text-gray-200">📋 Información Personal</h4>
                      <div className="grid grid-cols-1 gap-4">
                        <div className="p-4 border rounded-lg dark:border-gray-700">
                          <div className="flex items-center gap-2 mb-2">
                            <Home className="h-4 w-4 text-gray-500" />
                            <span className="font-medium">Dirección</span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Villa Jardin Casa 4A
                            <br />
                            Col. Villas de Cuautitlan
                            <br />
                            CP: 54857
                          </p>
                        </div>
                        <div className="p-4 border rounded-lg dark:border-gray-700">
                          <div className="flex items-center gap-2 mb-2">
                            <Mail className="h-4 w-4 text-gray-500" />
                            <span className="font-medium">Correo Personal</span>
                          </div>
                          <a
                            href="mailto:lundhavock@gmail.com"
                            className="text-sm text-blue-600 hover:text-blue-800 hover:underline dark:text-blue-400 dark:hover:text-blue-300"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            lundhavock@gmail.com
                          </a>
                        </div>
                        <div className="p-4 border rounded-lg dark:border-gray-700">
                          <div className="flex items-center gap-2 mb-2">
                            <Instagram className="h-4 w-4 text-gray-500" />
                            <span className="font-medium">Instagram</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600 dark:text-gray-400">@havn7x</span>
                            <Button
                              variant="link"
                              size="sm"
                              className="p-0 h-auto"
                              onClick={() => window.open("https://instagram.com/havn7x", "_blank")}
                            >
                              <ExternalLink className="h-3 w-3 ml-1" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-800 dark:text-gray-200">🎓 Documentos Académicos</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-3 border rounded-lg dark:border-gray-700">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-gray-500" />
                            <span className="text-sm">Certificado de Bachillerato</span>
                          </div>
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4 mr-2" />
                            Descargar
                          </Button>
                        </div>
                        <div className="flex items-center justify-between p-3 border rounded-lg dark:border-gray-700">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-gray-500" />
                            <span className="text-sm">Kardex Actual</span>
                          </div>
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4 mr-2" />
                            Descargar
                          </Button>
                        </div>
                        <div className="flex items-center justify-between p-3 border rounded-lg dark:border-gray-700">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-gray-500" />
                            <span className="text-sm">Constancia de Estudios</span>
                          </div>
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4 mr-2" />
                            Descargar
                          </Button>
                        </div>
                        <div className="flex items-center justify-between p-3 border rounded-lg dark:border-gray-700">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-gray-500" />
                            <span className="text-sm">Comprobante de Beca</span>
                          </div>
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4 mr-2" />
                            Descargar
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-800 dark:text-gray-200">🆔 Documentos de Identidad</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-3 border rounded-lg dark:border-gray-700">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-gray-500" />
                            <span className="text-sm">Credencial UVM</span>
                          </div>
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4 mr-2" />
                            Descargar
                          </Button>
                        </div>
                        <div className="flex items-center justify-between p-3 border rounded-lg dark:border-gray-700">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-gray-500" />
                            <span className="text-sm">CURP</span>
                          </div>
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4 mr-2" />
                            Descargar
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full">
                    <GraduationCap className="h-4 w-4 mr-2" />
                    Credencial Digital
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <GraduationCap className="h-5 w-5" />
                      Credencial Digital UVM
                    </DialogTitle>
                    <DialogDescription>Tu identificación estudiantil oficial</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-6 rounded-lg">
                      <div className="flex items-start gap-4">
                        <div className="w-20 h-24 bg-white rounded overflow-hidden flex-shrink-0">
                          <img
                            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Imagen%20de%20WhatsApp%202025-04-28%20a%20las%2018.59.23_300abc07.jpg-wlyfeMkXPZvzkXiKPUBwk4MqKBbuze.jpeg"
                            alt="José Antonio Ríos Rojo"
                            className="w-full h-full object-cover"
                            crossOrigin="anonymous"
                          />
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center gap-2 mb-2">
                            <img
                              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Imagen%20de%20WhatsApp%202025-04-28%20a%20las%2022.34.52_65bb3da3.jpg-ux7xSEqS2Ix7X2nzQPsxQSz4puwtzk.jpeg"
                              alt="UVM Logo"
                              className="h-6 w-10 object-contain"
                              crossOrigin="anonymous"
                            />
                            <span className="text-xs font-bold">UNIVERSIDAD DEL VALLE DE MÉXICO</span>
                          </div>
                          <h3 className="font-bold text-lg">José Antonio Ríos Rojo</h3>
                          <p className="text-sm opacity-90">Ingeniería en Sistemas</p>
                          <p className="text-xs opacity-80">Campus Hispano</p>
                          <div className="grid grid-cols-2 gap-2 text-xs mt-3">
                            <div>
                              <span className="opacity-80">Matrícula:</span>
                              <br />
                              <span className="font-bold">21H04156</span>
                            </div>
                            <div>
                              <span className="opacity-80">Cuatrimestre:</span>
                              <br />
                              <span className="font-bold">4°</span>
                            </div>
                            <div>
                              <span className="opacity-80">Vigencia:</span>
                              <br />
                              <span className="font-bold">Jul 2025</span>
                            </div>
                            <div>
                              <span className="opacity-80">Modalidad:</span>
                              <br />
                              <span className="font-bold">Semipresencial</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 border rounded-lg dark:border-gray-700">
                      <div className="w-24 h-24 bg-white border-2 border-gray-300 rounded flex items-center justify-center flex-shrink-0">
                        <div
                          className="w-20 h-20 bg-black"
                          style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='white'/%3E%3Cg fill='black'%3E%3Crect x='0' y='0' width='10' height='10'/%3E%3Crect x='20' y='0' width='10' height='10'/%3E%3Crect x='40' y='0' width='10' height='10'/%3E%3Crect x='60' y='0' width='10' height='10'/%3E%3Crect x='80' y='0' width='10' height='10'/%3E%3Crect x='0' y='20' width='10' height='10'/%3E%3Crect x='40' y='20' width='10' height='10'/%3E%3Crect x='80' y='20' width='10' height='10'/%3E%3Crect x='0' y='40' width='10' height='10'/%3E%3Crect x='20' y='40' width='10' height='10'/%3E%3Crect x='60' y='40' width='10' height='10'/%3E%3Crect x='80' y='40' width='10' height='10'/%3E%3Crect x='0' y='60' width='10' height='10'/%3E%3Crect x='40' y='60' width='10' height='10'/%3E%3Crect x='80' y='60' width='10' height='10'/%3E%3Crect x='0' y='80' width='10' height='10'/%3E%3Crect x='20' y='80' width='10' height='10'/%3E%3Crect x='40' y='80' width='10' height='10'/%3E%3Crect x='60' y='80' width='10' height='10'/%3E%3Crect x='80' y='80' width='10' height='10'/%3E%3C/g%3E%3C/svg%3E")`,
                            backgroundSize: "cover",
                          }}
                        ></div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                          Código QR de Verificación
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          Escanea este código para verificar la autenticidad de tu credencial estudiantil.
                        </p>
                        <p className="text-xs text-gray-500">ID: UVM-21H04156-2025</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="space-y-2">
                        <h4 className="font-semibold text-gray-800 dark:text-gray-200">Información Académica</h4>
                        <div className="space-y-1 text-gray-600 dark:text-gray-400">
                          <p>
                            <strong>Promedio:</strong> 8.7
                          </p>
                          <p>
                            <strong>Créditos:</strong> 180/240
                          </p>
                          <p>
                            <strong>Beca:</strong> 65% Excelencia
                          </p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-semibold text-gray-800 dark:text-gray-200">Contacto</h4>
                        <div className="space-y-1 text-gray-600 dark:text-gray-400">
                          <p>
                            <strong>Email:</strong> jose.rios@uvm.edu.mx
                          </p>
                          <p>
                            <strong>Tel:</strong> +52 55 6974 7115
                          </p>
                          <p>
                            <strong>Emergencia:</strong> 55 5200-4300
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        className="flex-1 bg-red-600 hover:bg-red-700"
                        onClick={handleDownloadCredentialPdf}
                        disabled={isDownloadingCredential}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        {isDownloadingCredential ? "Descargando PDF..." : "Descargar PDF"}
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() => alert("Descarga DOC no implementada")}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Descargar DOC
                      </Button>
                    </div>
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <p className="text-xs text-blue-700 dark:text-blue-400">
                        <strong>Nota:</strong> La descarga DOC es una simulación. La generación de archivos DOC en el
                        navegador es compleja.
                      </p>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full relative">
                    <Bell className="h-4 w-4 mr-2" />
                    Notificaciones
                    {unreadNotificationsCount > 0 && (
                      <Badge className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-1.5 py-0.5">
                        {unreadNotificationsCount}
                      </Badge>
                    )}
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px] max-h-[80vh] flex flex-col">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <Bell className="h-5 w-5" />
                      Centro de Notificaciones
                    </DialogTitle>
                    <DialogDescription>Gestiona tus notificaciones y preferencias</DialogDescription>
                  </DialogHeader>
                  <div className="flex-grow overflow-y-auto space-y-6 pr-2">
                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-800 dark:text-gray-200">
                        ⚙️ Configuración de Notificaciones
                      </h4>
                      {Object.entries(notificationSettings).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor={`notif-${key}`} className="text-sm font-medium capitalize">
                              {key === "exams"
                                ? "Exámenes"
                                : key === "assignments"
                                  ? "Tareas"
                                  : key === "payments"
                                    ? "Pagos"
                                    : key === "grades"
                                      ? "Calificaciones"
                                      : key === "classUpdate" // Añadir etiqueta para classUpdate
                                        ? "Actualización de Clases"
                                        : "Generales"}
                            </Label>
                          </div>
                          <Switch
                            id={`notif-${key}`}
                            checked={value}
                            onCheckedChange={(checked) =>
                              handleNotificationSettingChange(key as keyof typeof notificationSettings, checked)
                            }
                          />
                        </div>
                      ))}
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-800 dark:text-gray-200">📬 Notificaciones Recientes</h4>
                      <div className="space-y-3">
                        {notifications
                          .filter((n) => n.enabled && notificationSettings[n.type as keyof typeof notificationSettings])
                          .map((notification) => (
                            <Dialog key={notification.id}>
                              <DialogTrigger asChild>
                                <button
                                  onClick={() => markNotificationAsRead(notification.id)}
                                  className={`w-full p-3 border rounded-lg text-left transition-all hover:shadow-md ${
                                    !notification.read
                                      ? "border-red-300 bg-red-50 dark:border-red-700 dark:bg-red-900/30 hover:bg-red-100 dark:hover:bg-red-900/50"
                                      : "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                                  }`}
                                >
                                  <div className="flex items-start gap-3">
                                    {getNotificationIcon(notification.type)}
                                    <div className="flex-1">
                                      <h5
                                        className={`font-medium text-sm ${
                                          !notification.read
                                            ? "text-red-800 dark:text-red-300"
                                            : "text-gray-800 dark:text-gray-200"
                                        }`}
                                      >
                                        {notification.title}
                                      </h5>
                                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 truncate">
                                        {notification.message}
                                      </p>
                                      <p className="text-xs text-gray-500 mt-1">
                                        {new Date(notification.date).toLocaleDateString("es-ES", {
                                          day: "numeric",
                                          month: "short",
                                          year: "numeric",
                                        })}
                                      </p>
                                    </div>
                                    {!notification.read && (
                                      <div className="w-2.5 h-2.5 bg-red-500 rounded-full flex-shrink-0 mt-1 animate-pulse"></div>
                                    )}
                                  </div>
                                </button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-md">
                                <DialogHeader>
                                  <DialogTitle className="flex items-center gap-2">
                                    {getNotificationIcon(notification.type)}
                                    {notification.title}
                                  </DialogTitle>
                                  <DialogDescription>
                                    Recibido el:{" "}
                                    {new Date(notification.date).toLocaleDateString("es-ES", {
                                      weekday: "long",
                                      year: "numeric",
                                      month: "long",
                                      day: "numeric",
                                    })}
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="py-4 space-y-3">
                                  <p className="text-sm text-gray-700 dark:text-gray-300">{notification.message}</p>
                                  {notification.relatedLink && (
                                    <Button
                                      variant="link"
                                      size="sm"
                                      className="p-0 h-auto text-red-600"
                                      onClick={() => alert(`Navegando a: ${notification.relatedLink}`)}
                                    >
                                      Ver detalles <ExternalLink className="h-3 w-3 ml-1" />
                                    </Button>
                                  )}
                                </div>
                                <DialogFooter>
                                  <DialogClose asChild>
                                    <Button variant="outline">Cerrar</Button>
                                  </DialogClose>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          ))}
                        {notifications.filter(
                          (n) => n.enabled && notificationSettings[n.type as keyof typeof notificationSettings],
                        ).length === 0 && (
                          <p className="text-sm text-gray-500 text-center py-4">No hay notificaciones para mostrar.</p>
                        )}
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-red-700 dark:text-red-400 flex items-center gap-2">
              <GraduationCap className="h-5 w-5" />
              Información Académica
            </CardTitle>
            <CardDescription>Detalles de tu carrera y progreso académico</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Carrera</Label>
                <Input value="Ingeniería en Sistemas" readOnly className="mt-1" />
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Matrícula</Label>
                <Input value="21H04156" readOnly className="mt-1" />
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Cuatrimestre Actual</Label>
                <Input value="Cuarto Cuatrimestre" readOnly className="mt-1" />
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Promedio General</Label>
                <Input value="8.7" readOnly className="mt-1" />
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Campus</Label>
                <Input value="UVM Campus Hispano" readOnly className="mt-1" />
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Modalidad</Label>
                <Input value="Semipresencial" readOnly className="mt-1" />
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Materias del Cuatrimestre Actual
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {subjects.map((subject) => (
                  <div key={subject.id} className="p-4 border rounded-lg dark:border-gray-700">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-red-700 dark:text-red-400">{subject.name}</h4>
                      <Badge className={getGradeBadge(subject.grade)}>{subject.grade}</Badge>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{subject.professor}</p>
                    <div className="space-y-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" className="w-full">
                            <BookOpen className="h-4 w-4 mr-2" />
                            Ver Temario
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[600px]">
                          <DialogHeader>
                            <DialogTitle>{subject.name} - Temario</DialogTitle>
                            <DialogDescription>Contenido del curso y información de la materia</DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <h4 className="font-semibold">Información General</h4>
                                <div className="text-sm space-y-1">
                                  <p>
                                    <strong>Profesor:</strong> {subject.professor}
                                  </p>
                                  <p>
                                    <strong>Horario:</strong> {subject.schedule}
                                  </p>
                                  <p>
                                    <strong>Aula:</strong> {subject.classroom}
                                  </p>
                                  <p>
                                    <strong>Calificación:</strong> {subject.grade}/10
                                  </p>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <h4 className="font-semibold">Unidades Temáticas</h4>
                                <div className="text-sm space-y-1">
                                  <p>
                                    <strong>1.</strong> {subject.syllabus.unit1}
                                  </p>
                                  <p>
                                    <strong>2.</strong> {subject.syllabus.unit2}
                                  </p>
                                  <p>
                                    <strong>3.</strong> {subject.syllabus.unit3}
                                  </p>
                                  <p>
                                    <strong>4.</strong> {subject.syllabus.unit4}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>

                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" className="w-full">
                            <FileText className="h-4 w-4 mr-2" />
                            Cuaderno de Estudios
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[700px] max-h-[600px]">
                          <DialogHeader>
                            <DialogTitle>Cuaderno de Estudios - {subject.name}</DialogTitle>
                            <DialogDescription>Toma apuntes y organiza tus notas de clase</DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-800">
                              <h4 className="font-semibold mb-2">📝 Mis Apuntes</h4>
                              <Textarea
                                placeholder={`Escribe tus apuntes de ${subject.name} aquí...`}
                                className="min-h-[200px] bg-white dark:bg-gray-900"
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                <h5 className="font-medium text-blue-800 dark:text-blue-300">📚 Recursos</h5>
                                <ul className="text-sm text-blue-700 dark:text-blue-400 mt-1">
                                  <li>• Material de clase</li>
                                  <li>• Ejercicios prácticos</li>
                                  <li>• Videos explicativos</li>
                                </ul>
                              </div>
                              <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                                <h5 className="font-medium text-green-800 dark:text-green-300">✅ Tareas</h5>
                                <ul className="text-sm text-green-700 dark:text-green-400 mt-1">
                                  <li>• Ejercicio 1: Completado</li>
                                  <li>• Proyecto: En progreso</li>
                                  <li>• Examen: Pendiente</li>
                                </ul>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button className="flex-1">Guardar Apuntes</Button>
                              <Button variant="outline" className="flex-1">
                                Exportar PDF
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <OnlineClasses />
      <Certificates />
    </div>
  )
}
