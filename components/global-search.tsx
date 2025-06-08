"use client"

import { useState, useEffect, useMemo } from "react"
import { Search, FileText, Calendar, BookOpen, ClipboardList, Users, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

interface SearchResult {
  id: string
  title: string
  description: string
  type: "task" | "exam" | "project" | "payment" | "benefit"
  section: string
  date?: string
  status?: string
}

const mockSearchData: SearchResult[] = [
  {
    id: "1",
    title: "Ejercicios de Gauss-Jordan",
    description: "Resolver sistema de ecuaciones usando el método de Gauss-Jordan",
    type: "task",
    section: "Tareas",
    date: "2025-06-01",
    status: "pending",
  },
  {
    id: "2",
    title: "Álgebra Lineal - Examen Integral",
    description: "Examen integral de Álgebra Lineal (60 preguntas)",
    type: "exam",
    section: "Exámenes",
    date: "2025-05-27",
    status: "completed",
  },
  {
    id: "3",
    title: "Sistema de Gestión Universitaria",
    description: "Desarrollo de un sistema web para gestión de estudiantes",
    type: "project",
    section: "Proyectos",
    status: "in-progress",
  },
  {
    id: "4",
    title: "Colegiatura Mayo 2025",
    description: "Pago de colegiatura del mes de mayo",
    type: "payment",
    section: "Pagos",
    date: "2025-05-05",
    status: "paid",
  },
  {
    id: "5",
    title: "Discord Nitro",
    description: "Acceso a funciones premium en Discord",
    type: "benefit",
    section: "Beneficios",
  },
]

interface GlobalSearchProps {
  onNavigate: (section: string) => void
}

export function GlobalSearch({ onNavigate }: GlobalSearchProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])

  const filteredResults = useMemo(() => {
    if (!query.trim()) return []

    return mockSearchData.filter(
      (item) =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase()) ||
        item.section.toLowerCase().includes(query.toLowerCase()),
    )
  }, [query])

  useEffect(() => {
    setResults(filteredResults)
  }, [filteredResults])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setIsOpen(true)
      }
      if (e.key === "Escape") {
        setIsOpen(false)
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [])

  const getIcon = (type: string) => {
    switch (type) {
      case "task":
        return <ClipboardList className="h-4 w-4 text-red-600" />
      case "exam":
        return <BookOpen className="h-4 w-4 text-blue-600" />
      case "project":
        return <FileText className="h-4 w-4 text-purple-600" />
      case "payment":
        return <Calendar className="h-4 w-4 text-green-600" />
      case "benefit":
        return <Users className="h-4 w-4 text-orange-600" />
      default:
        return <Search className="h-4 w-4 text-gray-600" />
    }
  }

  const getStatusBadge = (status?: string) => {
    if (!status) return null

    const statusConfig = {
      pending: "bg-red-100 text-red-800",
      completed: "bg-green-100 text-green-800",
      "in-progress": "bg-yellow-100 text-yellow-800",
      paid: "bg-green-100 text-green-800",
    }

    return (
      <Badge className={statusConfig[status as keyof typeof statusConfig] || "bg-gray-100 text-gray-800"}>
        {status}
      </Badge>
    )
  }

  const handleResultClick = (result: SearchResult) => {
    const sectionMap = {
      Tareas: "tasks",
      Exámenes: "exams",
      Proyectos: "projects",
      Pagos: "payments",
      Beneficios: "benefits",
    }

    onNavigate(sectionMap[result.section as keyof typeof sectionMap] || "dashboard")
    setIsOpen(false)
    setQuery("")
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full sm:w-auto justify-start text-muted-foreground">
          <Search className="h-4 w-4 mr-2" />
          <span className="hidden sm:inline">Buscar...</span>
          <span className="sm:hidden">Buscar</span>
          <kbd className="pointer-events-none hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground ml-auto">
            <span className="text-xs">⌘</span>K
          </kbd>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[95vw] sm:max-w-2xl p-0">
        <DialogHeader className="p-4 pb-0">
          <DialogTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Búsqueda Global
          </DialogTitle>
          <DialogDescription>Busca en todas tus tareas, exámenes, proyectos y más</DialogDescription>
        </DialogHeader>

        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Escribe para buscar..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10 pr-10"
              autoFocus
            />
            {query && (
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                onClick={() => setQuery("")}
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>
        </div>

        <div className="max-h-[60vh] overflow-y-auto px-4 pb-4">
          {query && results.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No se encontraron resultados para "{query}"</p>
            </div>
          )}

          {query && results.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm text-gray-600 mb-3">
                {results.length} resultado{results.length !== 1 ? "s" : ""} encontrado{results.length !== 1 ? "s" : ""}
              </p>
              {results.map((result) => (
                <Card
                  key={result.id}
                  className="cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => handleResultClick(result)}
                >
                  <CardContent className="p-3">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5">{getIcon(result.type)}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <h4 className="font-medium text-gray-900 truncate">{result.title}</h4>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            {getStatusBadge(result.status)}
                            <Badge variant="outline" className="text-xs">
                              {result.section}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 line-clamp-2">{result.description}</p>
                        {result.date && (
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(result.date).toLocaleDateString("es-ES")}
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {!query && (
            <div className="text-center py-8 text-gray-500">
              <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="mb-2">Comienza a escribir para buscar</p>
              <div className="flex flex-wrap justify-center gap-2 text-xs">
                <Badge variant="outline">Tareas</Badge>
                <Badge variant="outline">Exámenes</Badge>
                <Badge variant="outline">Proyectos</Badge>
                <Badge variant="outline">Pagos</Badge>
                <Badge variant="outline">Beneficios</Badge>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
