"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Calendar, Clock, MapPin, Users, BookOpen, GraduationCap, AlertCircle } from "lucide-react"

const academicEvents = [
  {
    id: 1,
    title: "Inicio de Cuatrimestre",
    date: "2025-05-05",
    endDate: "2025-05-05",
    type: "academic",
    description: "Inicio oficial del cuarto cuatrimestre 2025",
    location: "Campus Hispano",
    status: "completed",
  },
  {
    id: 2,
    title: "Examen Parcial - Álgebra Lineal",
    date: "2025-05-28",
    endDate: "2025-05-28",
    type: "exam",
    description: "Examen integral de Álgebra Lineal (60 preguntas)",
    location: "Aula Virtual A-101",
    status: "completed",
    time: "14:00",
  },
  {
    id: 3,
    title: "Entrega Proyecto Final - Programación",
    date: "2025-05-31",
    endDate: "2025-05-31",
    type: "assignment",
    description: "Entrega del proyecto final de Programación Avanzada",
    location: "Plataforma Virtual",
    status: "upcoming",
    time: "23:59",
  },
  {
    id: 4,
    title: "Semana de Exámenes Finales",
    date: "2025-06-02",
    endDate: "2025-06-06",
    type: "exam",
    description: "Período de exámenes finales del cuatrimestre",
    location: "Campus Hispano",
    status: "upcoming",
  },
  {
    id: 5,
    title: "Examen Final - Base de Datos",
    date: "2025-06-10",
    endDate: "2025-06-10",
    type: "exam",
    description: "Examen final de Base de Datos - Normalización y SQL",
    location: "Aula Virtual C-302",
    status: "upcoming",
    time: "09:00",
  },
  {
    id: 6,
    title: "Período de Vacaciones",
    date: "2025-06-16",
    endDate: "2025-07-14",
    type: "holiday",
    description: "Vacaciones entre cuatrimestres",
    location: "N/A",
    status: "upcoming",
  },
  {
    id: 7,
    title: "Inscripciones Quinto Cuatrimestre",
    date: "2025-07-01",
    endDate: "2025-07-10",
    type: "registration",
    description: "Período de inscripciones para el quinto cuatrimestre",
    location: "Portal UVM / Campus",
    status: "upcoming",
  },
  {
    id: 8,
    title: "Inicio Quinto Cuatrimestre",
    date: "2025-07-15",
    endDate: "2025-07-15",
    type: "academic",
    description: "Inicio del quinto cuatrimestre 2025",
    location: "Campus Hispano",
    status: "upcoming",
  },
  {
    id: 9,
    title: "Conferencia de Tecnología",
    date: "2025-06-20",
    endDate: "2025-06-20",
    type: "event",
    description: "Conferencia sobre Inteligencia Artificial y Machine Learning",
    location: "Auditorio Principal",
    status: "upcoming",
    time: "10:00",
  },
  {
    id: 10,
    title: "Feria de Empleo UVM",
    date: "2025-06-25",
    endDate: "2025-06-25",
    type: "event",
    description: "Feria de empleo con empresas tecnológicas",
    location: "Plaza Central Campus",
    status: "upcoming",
    time: "09:00",
  },
]

const eventTypes = {
  academic: { color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300", icon: BookOpen },
  exam: { color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300", icon: GraduationCap },
  assignment: { color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300", icon: AlertCircle },
  holiday: { color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300", icon: Calendar },
  registration: { color: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300", icon: Users },
  event: { color: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300", icon: Calendar },
}

export function AcademicCalendar() {
  const [selectedEvent, setSelectedEvent] = useState<(typeof academicEvents)[0] | null>(null)
  const [filterType, setFilterType] = useState<string>("all")

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">Completado</Badge>
      case "upcoming":
        return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">Próximo</Badge>
      case "in-progress":
        return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">En Curso</Badge>
      default:
        return <Badge>Desconocido</Badge>
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(":").map(Number)
    const period = hours >= 12 ? "PM" : "AM"
    const formattedHours = hours % 12 || 12
    return `${formattedHours}:${minutes.toString().padStart(2, "0")} ${period}`
  }

  const filteredEvents =
    filterType === "all" ? academicEvents : academicEvents.filter((event) => event.type === filterType)

  const upcomingEvents = academicEvents.filter((event) => event.status === "upcoming").slice(0, 3)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-6 rounded-lg">
        <h1 className="text-3xl font-bold mb-2">Calendario Académico</h1>
        <p className="text-red-100">Eventos importantes del cuatrimestre y fechas clave</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-blue-600">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Eventos Próximos</CardTitle>
            <Calendar className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-800 dark:text-gray-200">
              {academicEvents.filter((e) => e.status === "upcoming").length}
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400">En las próximas semanas</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-red-600">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Exámenes</CardTitle>
            <GraduationCap className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-800 dark:text-gray-200">
              {academicEvents.filter((e) => e.type === "exam").length}
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400">Este cuatrimestre</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-600">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Eventos Especiales</CardTitle>
            <Users className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-800 dark:text-gray-200">
              {academicEvents.filter((e) => e.type === "event").length}
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400">Conferencias y ferias</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-600">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Días de Vacaciones</CardTitle>
            <Calendar className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-800 dark:text-gray-200">29</div>
            <p className="text-xs text-gray-600 dark:text-gray-400">Entre cuatrimestres</p>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Events Quick View */}
      <Card>
        <CardHeader>
          <CardTitle className="text-red-700 dark:text-red-400">Próximos Eventos Importantes</CardTitle>
          <CardDescription>Los eventos más cercanos en tu calendario académico</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {upcomingEvents.map((event) => {
              const EventIcon = eventTypes[event.type as keyof typeof eventTypes].icon
              return (
                <div
                  key={event.id}
                  className="flex items-center justify-between p-3 border rounded-lg dark:border-gray-700"
                >
                  <div className="flex items-center gap-3">
                    <EventIcon className="h-5 w-5 text-red-600" />
                    <div>
                      <h4 className="font-medium text-gray-800 dark:text-gray-200">{event.title}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {formatDate(event.date)} {event.time && `- ${formatTime(event.time)}`}
                      </p>
                    </div>
                  </div>
                  <Badge className={eventTypes[event.type as keyof typeof eventTypes].color}>
                    {event.type === "academic" && "Académico"}
                    {event.type === "exam" && "Examen"}
                    {event.type === "assignment" && "Entrega"}
                    {event.type === "holiday" && "Vacaciones"}
                    {event.type === "registration" && "Inscripción"}
                    {event.type === "event" && "Evento"}
                  </Badge>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={filterType === "all" ? "default" : "outline"}
          onClick={() => setFilterType("all")}
          className={filterType === "all" ? "bg-red-600 hover:bg-red-700" : ""}
        >
          Todos
        </Button>
        <Button variant={filterType === "exam" ? "default" : "outline"} onClick={() => setFilterType("exam")}>
          Exámenes
        </Button>
        <Button
          variant={filterType === "assignment" ? "default" : "outline"}
          onClick={() => setFilterType("assignment")}
        >
          Entregas
        </Button>
        <Button variant={filterType === "event" ? "default" : "outline"} onClick={() => setFilterType("event")}>
          Eventos
        </Button>
        <Button variant={filterType === "holiday" ? "default" : "outline"} onClick={() => setFilterType("holiday")}>
          Vacaciones
        </Button>
      </div>

      {/* Events List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredEvents.map((event) => {
          const EventIcon = eventTypes[event.type as keyof typeof eventTypes].icon
          return (
            <Card key={event.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <EventIcon className="h-5 w-5 text-red-600" />
                    <CardTitle className="text-lg text-red-700 dark:text-red-400">{event.title}</CardTitle>
                  </div>
                  {getStatusBadge(event.status)}
                </div>
                <Badge className={eventTypes[event.type as keyof typeof eventTypes].color}>
                  {event.type === "academic" && "Académico"}
                  {event.type === "exam" && "Examen"}
                  {event.type === "assignment" && "Entrega"}
                  {event.type === "holiday" && "Vacaciones"}
                  {event.type === "registration" && "Inscripción"}
                  {event.type === "event" && "Evento"}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-gray-600 dark:text-gray-400">{event.description}</p>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span>
                      {formatDate(event.date)}
                      {event.endDate !== event.date && ` - ${formatDate(event.endDate)}`}
                    </span>
                  </div>
                  {event.time && (
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span>{formatTime(event.time)}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span>{event.location}</span>
                  </div>
                </div>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full" onClick={() => setSelectedEvent(event)}>
                      Ver Detalles
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-2">
                        <EventIcon className="h-5 w-5" />
                        {event.title}
                      </DialogTitle>
                      <DialogDescription>Información detallada del evento académico</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <h4 className="font-semibold text-gray-800 dark:text-gray-200">Fecha</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {formatDate(event.date)}
                            {event.endDate !== event.date && (
                              <>
                                <br />
                                hasta {formatDate(event.endDate)}
                              </>
                            )}
                          </p>
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-semibold text-gray-800 dark:text-gray-200">Ubicación</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{event.location}</p>
                        </div>
                      </div>
                      {event.time && (
                        <div className="space-y-2">
                          <h4 className="font-semibold text-gray-800 dark:text-gray-200">Hora</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{formatTime(event.time)}</p>
                        </div>
                      )}
                      <div className="space-y-2">
                        <h4 className="font-semibold text-gray-800 dark:text-gray-200">Descripción</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{event.description}</p>
                      </div>
                      <div className="flex justify-between items-center">
                        <Badge className={eventTypes[event.type as keyof typeof eventTypes].color}>
                          {event.type === "academic" && "Académico"}
                          {event.type === "exam" && "Examen"}
                          {event.type === "assignment" && "Entrega"}
                          {event.type === "holiday" && "Vacaciones"}
                          {event.type === "registration" && "Inscripción"}
                          {event.type === "event" && "Evento"}
                        </Badge>
                        {getStatusBadge(event.status)}
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
