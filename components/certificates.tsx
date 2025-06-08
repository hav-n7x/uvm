"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Award, Calendar, Download, ExternalLink, FileText, CheckCircle, Clock } from "lucide-react"

const certificates = [
  {
    id: 1,
    title: "Python",
    provider: "SOA (Skills on Academy)",
    completionDate: "2025-05-03",
    status: "completed",
    hours: 8,
    modules: 2,
    serialNumber: "OA-2025-0503001068813",
    description: "Curso completo de Python con fundamentos de programación y aplicaciones prácticas",
    skills: ["Programación en Python", "Estructuras de datos", "Funciones", "Módulos"],
    certificateUrl: "/certificates/python-certificate.pdf",
  },
  {
    id: 2,
    title: "Internet de las Cosas",
    provider: "SOA / MIT Professional Education",
    completionDate: "2025-05-03",
    status: "completed",
    hours: 8,
    modules: 2,
    serialNumber: "OA-2025-0503001069273",
    description:
      "Fundamentos de IoT, arquitecturas y aplicaciones prácticas desarrollado por MIT Professional Education",
    skills: ["Arquitectura IoT", "Sensores", "Conectividad", "Análisis de datos"],
    certificateUrl: "/certificates/iot-certificate.pdf",
  },
  {
    id: 3,
    title: "Machine Learning",
    provider: "Coursera / Stanford University",
    completionDate: "2025-06-15",
    status: "in-progress",
    progress: 65,
    hours: 40,
    modules: 8,
    description: "Curso completo de Machine Learning impartido por Andrew Ng de Stanford University",
    skills: ["Algoritmos ML", "Redes neuronales", "Aprendizaje supervisado", "Clustering"],
    estimatedCompletion: "2025-06-15",
  },
  {
    id: 4,
    title: "Desarrollo Web Full Stack",
    provider: "Coursera / Meta",
    completionDate: "2025-07-10",
    status: "pending",
    hours: 60,
    modules: 9,
    description: "Programa completo de desarrollo web full stack con React, Node.js y bases de datos",
    skills: ["React", "Node.js", "MongoDB", "Express", "APIs RESTful"],
    enrollmentDate: "2025-06-01",
  },
  {
    id: 5,
    title: "Ciberseguridad",
    provider: "Coursera / IBM",
    completionDate: "2025-08-20",
    status: "pending",
    hours: 30,
    modules: 6,
    description: "Fundamentos de ciberseguridad, análisis de vulnerabilidades y protección de sistemas",
    skills: ["Seguridad de redes", "Criptografía", "Análisis de amenazas", "Seguridad en la nube"],
    enrollmentDate: "2025-06-10",
  },
]

export function Certificates() {
  const [selectedCertificate, setSelectedCertificate] = useState<(typeof certificates)[0] | null>(null)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800">Completado</Badge>
      case "in-progress":
        return <Badge className="bg-yellow-100 text-yellow-800">En Progreso</Badge>
      case "pending":
        return <Badge className="bg-blue-100 text-blue-800">Inscrito</Badge>
      default:
        return <Badge>Desconocido</Badge>
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case "in-progress":
        return <Clock className="h-5 w-5 text-yellow-600" />
      case "pending":
        return <Calendar className="h-5 w-5 text-blue-600" />
      default:
        return null
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-red-700 flex items-center gap-2">
          <Award className="h-5 w-5" />
          Certificaciones
        </CardTitle>
        <CardDescription>Tus certificados y cursos en línea</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-l-4 border-l-green-600">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Certificados Completados</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-800">2</div>
              <p className="text-xs text-gray-600">16 horas de formación</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-yellow-600">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">En Progreso</CardTitle>
              <Clock className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-800">1</div>
              <p className="text-xs text-gray-600">40 horas de formación</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-600">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Próximos Cursos</CardTitle>
              <Calendar className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-800">2</div>
              <p className="text-xs text-gray-600">90 horas de formación</p>
            </CardContent>
          </Card>
        </div>

        {/* Certificates List */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Mis Certificaciones</h3>

          {certificates.map((certificate) => (
            <Card key={certificate.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(certificate.status)}
                    <div>
                      <CardTitle className="text-lg text-red-700">{certificate.title}</CardTitle>
                      <CardDescription className="font-medium">{certificate.provider}</CardDescription>
                    </div>
                  </div>
                  {getStatusBadge(certificate.status)}
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-gray-600">{certificate.description}</p>

                <div className="flex flex-wrap gap-2">
                  {certificate.skills.map((skill, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>

                <div className="text-sm text-gray-600 space-y-1">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>
                      {certificate.hours} horas | {certificate.modules} módulos
                    </span>
                  </div>

                  {certificate.status === "completed" && (
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>Completado: {new Date(certificate.completionDate).toLocaleDateString("es-ES")}</span>
                    </div>
                  )}

                  {certificate.status === "in-progress" && (
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Progreso</span>
                        <span>{certificate.progress}%</span>
                      </div>
                      <Progress value={certificate.progress} className="h-2" />
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>
                          Finalización estimada:{" "}
                          {new Date(certificate.estimatedCompletion!).toLocaleDateString("es-ES")}
                        </span>
                      </div>
                    </div>
                  )}

                  {certificate.status === "pending" && (
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>Inicio: {new Date(certificate.enrollmentDate!).toLocaleDateString("es-ES")}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  {certificate.status === "completed" && (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="w-full bg-red-600 hover:bg-red-700">
                          <FileText className="h-4 w-4 mr-2" />
                          Ver Certificado
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[700px]">
                        <DialogHeader>
                          <DialogTitle>Certificado: {certificate.title}</DialogTitle>
                          <DialogDescription>Emitido por {certificate.provider}</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="bg-gray-100 rounded-lg p-8 text-center">
                            <Award className="h-16 w-16 mx-auto mb-4 text-red-600" />
                            <h3 className="text-xl font-bold text-gray-800">Certificado de Finalización</h3>
                            <p className="text-lg font-medium mt-2">{certificate.title}</p>
                            <p className="text-sm text-gray-600 mt-1">José Antonio Ríos Rojo</p>
                            <div className="mt-4 p-3 bg-white rounded border">
                              <p className="text-sm text-gray-800">Número de serie: {certificate.serialNumber}</p>
                              <p className="text-sm text-gray-800">
                                Curso terminado el {new Date(certificate.completionDate).toLocaleDateString("es-ES")}
                              </p>
                              <p className="text-sm text-gray-800">
                                {certificate.hours} Horas | {certificate.modules} Módulos | Autoevaluación
                              </p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button className="flex-1">
                              <Download className="h-4 w-4 mr-2" />
                              Descargar PDF
                            </Button>
                            <Button variant="outline" className="flex-1">
                              <ExternalLink className="h-4 w-4 mr-2" />
                              Verificar Autenticidad
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  )}

                  {certificate.status === "in-progress" && (
                    <Button className="w-full">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Continuar Curso
                    </Button>
                  )}

                  {certificate.status === "pending" && (
                    <Button className="w-full" variant="outline">
                      <Calendar className="h-4 w-4 mr-2" />
                      Comenzar el {new Date(certificate.enrollmentDate!).toLocaleDateString("es-ES")}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Available Courses */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Cursos Recomendados</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Blockchain y Criptomonedas</CardTitle>
                <CardDescription>Coursera / UC Berkeley</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-gray-600">
                  Aprende sobre tecnología blockchain, criptomonedas y aplicaciones descentralizadas
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="h-4 w-4" />
                  <span>30 horas | 6 módulos</span>
                </div>
                <Button variant="outline" className="w-full">
                  Ver Detalles
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Inteligencia Artificial</CardTitle>
                <CardDescription>Coursera / DeepLearning.AI</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-gray-600">Fundamentos de IA, redes neuronales y aprendizaje profundo</p>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="h-4 w-4" />
                  <span>45 horas | 5 módulos</span>
                </div>
                <Button variant="outline" className="w-full">
                  Ver Detalles
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
