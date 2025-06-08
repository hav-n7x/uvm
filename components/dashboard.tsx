"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ImageSlider } from "@/components/image-slider"
import { BookOpen, ClipboardList, FileText, TrendingUp } from "lucide-react"

export function Dashboard() {
  return (
    <div className="space-y-4 sm:space-y-6 p-4 sm:p-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-4 sm:p-6 rounded-lg">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">¡Bienvenido, José Antonio!</h1>
        <p className="text-red-100 text-sm sm:text-base">
          Ingeniería en Sistemas - Cuarto Cuatrimestre - Campus Hispano
        </p>
      </div>

      {/* Image Slider */}
      <ImageSlider />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <Card className="border-l-4 border-l-red-600">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-4 sm:p-6">
            <CardTitle className="text-sm font-medium">Tareas Pendientes</CardTitle>
            <ClipboardList className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <div className="text-2xl font-bold text-gray-800">3</div>
            <p className="text-xs text-gray-600">2 por entregar esta semana</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-600">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-4 sm:p-6">
            <CardTitle className="text-sm font-medium">Promedio General</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <div className="text-2xl font-bold text-gray-800">8.7</div>
            <p className="text-xs text-gray-600">+0.3 vs cuatrimestre anterior</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-600">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-4 sm:p-6">
            <CardTitle className="text-sm font-medium">Exámenes</CardTitle>
            <BookOpen className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <div className="text-2xl font-bold text-gray-800">1</div>
            <p className="text-xs text-gray-600">Próximo: Álgebra Lineal</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-600">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-4 sm:p-6">
            <CardTitle className="text-sm font-medium">Proyectos</CardTitle>
            <FileText className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <div className="text-2xl font-bold text-gray-800">2</div>
            <p className="text-xs text-gray-600">1 en desarrollo</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <Card>
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-red-700">Actividad Reciente</CardTitle>
            <CardDescription>Tus últimas actividades académicas</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 p-4 sm:p-6 pt-0">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="min-w-0">
                <p className="font-medium text-sm sm:text-base">Examen de Álgebra Lineal</p>
                <p className="text-sm text-gray-600">Gauss Jordan - Calificación obtenida</p>
              </div>
              <Badge className="bg-green-100 text-green-800 self-start sm:self-center">4.5/5.0</Badge>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="min-w-0">
                <p className="font-medium text-sm sm:text-base">Tarea de Programación</p>
                <p className="text-sm text-gray-600">Entregada hace 2 días</p>
              </div>
              <Badge className="bg-blue-100 text-blue-800 self-start sm:self-center">Entregada</Badge>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="min-w-0">
                <p className="font-medium text-sm sm:text-base">Proyecto Final</p>
                <p className="text-sm text-gray-600">Sistema de Gestión</p>
              </div>
              <Badge className="bg-yellow-100 text-yellow-800 self-start sm:self-center">En Progreso</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-red-700">Progreso del Cuatrimestre</CardTitle>
            <CardDescription>Tu avance académico actual</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 p-4 sm:p-6 pt-0">
            <div>
              <div className="flex justify-between mb-2 text-sm">
                <span className="font-medium">Álgebra Lineal</span>
                <span className="text-gray-600">85%</span>
              </div>
              <Progress value={85} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between mb-2 text-sm">
                <span className="font-medium">Programación</span>
                <span className="text-gray-600">92%</span>
              </div>
              <Progress value={92} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between mb-2 text-sm">
                <span className="font-medium">Base de Datos</span>
                <span className="text-gray-600">78%</span>
              </div>
              <Progress value={78} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between mb-2 text-sm">
                <span className="font-medium">Redes</span>
                <span className="text-gray-600">88%</span>
              </div>
              <Progress value={88} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
