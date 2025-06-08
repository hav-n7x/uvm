"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BarChart3, TrendingUp, TrendingDown, Calendar, Clock, Target, Award, Brain, Zap } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const academicStats = {
  currentGPA: 8.7,
  previousGPA: 8.4,
  totalCredits: 180,
  completedCredits: 120,
  tasksCompleted: 45,
  totalTasks: 52,
  examsPassed: 12,
  totalExams: 14,
  projectsFinished: 8,
  totalProjects: 10,
  studyHours: 156,
  focusSessions: 89,
  averageGrade: 8.5,
  attendanceRate: 94,
}

const monthlyProgress = [
  { month: "Ene", gpa: 8.2, tasks: 8, exams: 2 },
  { month: "Feb", gpa: 8.3, tasks: 9, exams: 2 },
  { month: "Mar", gpa: 8.4, tasks: 10, exams: 3 },
  { month: "Abr", gpa: 8.6, tasks: 12, exams: 2 },
  { month: "May", gpa: 8.7, tasks: 11, exams: 3 },
]

const achievements = [
  {
    id: 1,
    title: "Estudiante Destacado",
    description: "Mantén un promedio superior a 8.5 por 3 meses consecutivos",
    icon: Award,
    completed: true,
    progress: 100,
    date: "2025-05-15",
  },
  {
    id: 2,
    title: "Maestro del Focus",
    description: "Completa 100 sesiones de modo focus",
    icon: Brain,
    completed: false,
    progress: 89,
    date: null,
  },
  {
    id: 3,
    title: "Entrega Perfecta",
    description: "Entrega todas las tareas a tiempo durante un mes",
    icon: Target,
    completed: false,
    progress: 75,
    date: null,
  },
  {
    id: 4,
    title: "Maratonista Académico",
    description: "Acumula 200 horas de estudio",
    icon: Zap,
    completed: false,
    progress: 78,
    date: null,
  },
]

export function StatsDashboard() {
  const [isOpen, setIsOpen] = useState(false)

  const gpaChange = academicStats.currentGPA - academicStats.previousGPA
  const completionRate = (academicStats.tasksCompleted / academicStats.totalTasks) * 100
  const examSuccessRate = (academicStats.examsPassed / academicStats.totalExams) * 100
  const projectCompletionRate = (academicStats.projectsFinished / academicStats.totalProjects) * 100
  const creditProgress = (academicStats.completedCredits / academicStats.totalCredits) * 100

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9">
          <BarChart3 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Estadísticas Académicas
          </DialogTitle>
          <DialogDescription>Análisis detallado de tu rendimiento académico y progreso</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Overview Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Promedio Actual</CardTitle>
                <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{academicStats.currentGPA}</div>
                <div className="flex items-center text-xs text-green-600 dark:text-green-400">
                  <TrendingUp className="h-3 w-3 mr-1" />+{gpaChange.toFixed(1)} vs anterior
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tareas Completadas</CardTitle>
                <Target className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {academicStats.tasksCompleted}/{academicStats.totalTasks}
                </div>
                <div className="text-xs text-muted-foreground">{completionRate.toFixed(0)}% completado</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Horas de Estudio</CardTitle>
                <Clock className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{academicStats.studyHours}h</div>
                <div className="text-xs text-muted-foreground">{academicStats.focusSessions} sesiones focus</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Asistencia</CardTitle>
                <Calendar className="h-4 w-4 text-orange-600 dark:text-orange-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{academicStats.attendanceRate}%</div>
                <div className="text-xs text-muted-foreground">Excelente asistencia</div>
              </CardContent>
            </Card>
          </div>

          {/* Progress Bars */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Progreso Académico</CardTitle>
                <CardDescription>Tu avance en diferentes áreas</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Créditos Completados</span>
                    <span>
                      {academicStats.completedCredits}/{academicStats.totalCredits}
                    </span>
                  </div>
                  <Progress value={creditProgress} className="h-2" />
                  <div className="text-xs text-muted-foreground mt-1">{creditProgress.toFixed(0)}% de la carrera</div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Tareas Completadas</span>
                    <span>
                      {academicStats.tasksCompleted}/{academicStats.totalTasks}
                    </span>
                  </div>
                  <Progress value={completionRate} className="h-2" />
                  <div className="text-xs text-muted-foreground mt-1">{completionRate.toFixed(0)}% completado</div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Exámenes Aprobados</span>
                    <span>
                      {academicStats.examsPassed}/{academicStats.totalExams}
                    </span>
                  </div>
                  <Progress value={examSuccessRate} className="h-2" />
                  <div className="text-xs text-muted-foreground mt-1">{examSuccessRate.toFixed(0)}% éxito</div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Proyectos Finalizados</span>
                    <span>
                      {academicStats.projectsFinished}/{academicStats.totalProjects}
                    </span>
                  </div>
                  <Progress value={projectCompletionRate} className="h-2" />
                  <div className="text-xs text-muted-foreground mt-1">
                    {projectCompletionRate.toFixed(0)}% completado
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tendencia Mensual</CardTitle>
                <CardDescription>Evolución de tu rendimiento</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {monthlyProgress.map((month, index) => (
                    <div key={month.month} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 text-sm font-medium">{month.month}</div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            GPA: {month.gpa}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {month.tasks} tareas
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {month.exams} exámenes
                          </Badge>
                        </div>
                      </div>
                      {index > 0 && month.gpa > monthlyProgress[index - 1].gpa ? (
                        <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
                      ) : index > 0 && month.gpa < monthlyProgress[index - 1].gpa ? (
                        <TrendingDown className="h-4 w-4 text-red-600 dark:text-red-400" />
                      ) : null}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Logros y Metas
              </CardTitle>
              <CardDescription>Tu progreso hacia objetivos académicos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((achievement) => {
                  const Icon = achievement.icon
                  return (
                    <div
                      key={achievement.id}
                      className={`p-4 border rounded-lg transition-colors ${
                        achievement.completed
                          ? "bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-800"
                          : "bg-muted/50"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`p-2 rounded-lg ${
                            achievement.completed ? "bg-green-100 dark:bg-green-900/30" : "bg-muted"
                          }`}
                        >
                          <Icon
                            className={`h-5 w-5 ${
                              achievement.completed ? "text-green-600 dark:text-green-400" : "text-muted-foreground"
                            }`}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium text-foreground">{achievement.title}</h4>
                            {achievement.completed && (
                              <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 text-xs">
                                ¡Completado!
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{achievement.description}</p>

                          {!achievement.completed && (
                            <div className="space-y-1">
                              <div className="flex justify-between text-xs">
                                <span>Progreso</span>
                                <span>{achievement.progress}%</span>
                              </div>
                              <Progress value={achievement.progress} className="h-1.5" />
                            </div>
                          )}

                          {achievement.completed && achievement.date && (
                            <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                              Completado el {new Date(achievement.date).toLocaleDateString("es-ES")}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}
