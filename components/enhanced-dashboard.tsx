"use client"

import { motion } from "framer-motion"
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ImageSlider } from "@/components/image-slider"
import { BookOpen, ClipboardList, FileText, TrendingUp, Sparkles, Zap, Target, Award } from "lucide-react"
import { MotionWrapper, StaggerContainer, StaggerItem } from "@/components/motion-wrapper"
import { EnhancedCard } from "@/components/enhanced-card"

const statsData = [
  {
    title: "Tareas Pendientes",
    value: "3",
    subtitle: "2 por entregar esta semana",
    icon: ClipboardList,
    color: "from-red-500 to-red-600",
    bgColor: "bg-red-50",
    textColor: "text-red-600",
    trend: "+2 esta semana",
  },
  {
    title: "Promedio General",
    value: "8.7",
    subtitle: "+0.3 vs cuatrimestre anterior",
    icon: TrendingUp,
    color: "from-green-500 to-green-600",
    bgColor: "bg-green-50",
    textColor: "text-green-600",
    trend: "↗ Mejorando",
  },
  {
    title: "Exámenes",
    value: "1",
    subtitle: "Próximo: Álgebra Lineal",
    icon: BookOpen,
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50",
    textColor: "text-blue-600",
    trend: "En 3 días",
  },
  {
    title: "Proyectos",
    value: "2",
    subtitle: "1 en desarrollo",
    icon: FileText,
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-50",
    textColor: "text-purple-600",
    trend: "65% completado",
  },
]

const achievements = [
  { icon: Sparkles, label: "Estudiante Destacado", progress: 100 },
  { icon: Zap, label: "Entrega Perfecta", progress: 85 },
  { icon: Target, label: "Meta Mensual", progress: 70 },
  { icon: Award, label: "Top 10%", progress: 95 },
]

export function EnhancedDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-red-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="space-y-6 p-6">
        {/* Hero Header with Glassmorphism */}
        <MotionWrapper type="slide" delay={0.1}>
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-red-600 via-red-700 to-red-800 p-8 text-white shadow-2xl">
            <div className="absolute inset-0 bg-black/10 backdrop-blur-sm" />
            <div className="relative z-10">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white to-red-100 bg-clip-text text-transparent">
                  ¡Bienvenido, José Antonio! ✨
                </h1>
                <p className="text-red-100 text-lg">Ingeniería en Sistemas - Cuarto Cuatrimestre - Campus Hispano</p>
              </motion.div>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24" />
          </div>
        </MotionWrapper>

        {/* Enhanced Image Slider */}
        <MotionWrapper type="scale" delay={0.2}>
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <ImageSlider />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
          </div>
        </MotionWrapper>

        {/* Stats Cards with Stagger Animation */}
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsData.map((stat, index) => (
            <StaggerItem key={stat.title}>
              <EnhancedCard hover glow gradient>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-700">{stat.title}</CardTitle>
                  <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                    <stat.icon className={`h-5 w-5 ${stat.textColor}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <motion.div
                    className="text-3xl font-bold text-gray-900 mb-1"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.1 + 0.5, type: "spring", stiffness: 200 }}
                  >
                    {stat.value}
                  </motion.div>
                  <p className="text-xs text-gray-600 mb-2">{stat.subtitle}</p>
                  <Badge variant="outline" className={`text-xs ${stat.textColor} border-current`}>
                    {stat.trend}
                  </Badge>
                </CardContent>
              </EnhancedCard>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <MotionWrapper type="slide" delay={0.4}>
              <EnhancedCard glass>
                <CardHeader>
                  <CardTitle className="text-red-700 flex items-center gap-2">
                    <Sparkles className="h-5 w-5" />
                    Actividad Reciente
                  </CardTitle>
                  <CardDescription>Tus últimas actividades académicas</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    {
                      title: "Examen de Álgebra Lineal",
                      subtitle: "Gauss Jordan - Calificación obtenida",
                      badge: "4.5/5.0",
                      color: "bg-green-100 text-green-800",
                    },
                    {
                      title: "Tarea de Programación",
                      subtitle: "Entregada hace 2 días",
                      badge: "Entregada",
                      color: "bg-blue-100 text-blue-800",
                    },
                    {
                      title: "Proyecto Final",
                      subtitle: "Sistema de Gestión",
                      badge: "En Progreso",
                      color: "bg-yellow-100 text-yellow-800",
                    },
                  ].map((activity, index) => (
                    <motion.div
                      key={activity.title}
                      className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-white to-gray-50 border border-gray-100 hover:shadow-md transition-all duration-300"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      whileHover={{ scale: 1.02, x: 4 }}
                    >
                      <div>
                        <p className="font-medium text-gray-900">{activity.title}</p>
                        <p className="text-sm text-gray-600">{activity.subtitle}</p>
                      </div>
                      <Badge className={activity.color}>{activity.badge}</Badge>
                    </motion.div>
                  ))}
                </CardContent>
              </EnhancedCard>
            </MotionWrapper>
          </div>

          {/* Progress & Achievements */}
          <div className="space-y-6">
            {/* Progress Card */}
            <MotionWrapper type="scale" delay={0.5}>
              <EnhancedCard gradient>
                <CardHeader>
                  <CardTitle className="text-red-700">Progreso del Cuatrimestre</CardTitle>
                  <CardDescription>Tu avance académico actual</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { subject: "Álgebra Lineal", progress: 85, color: "bg-red-500" },
                    { subject: "Programación", progress: 92, color: "bg-green-500" },
                    { subject: "Base de Datos", progress: 78, color: "bg-blue-500" },
                    { subject: "Redes", progress: 88, color: "bg-purple-500" },
                  ].map((item, index) => (
                    <motion.div
                      key={item.subject}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                    >
                      <div className="flex justify-between mb-2 text-sm">
                        <span className="font-medium">{item.subject}</span>
                        <span className="text-gray-600">{item.progress}%</span>
                      </div>
                      <div className="relative">
                        <Progress value={item.progress} className="h-3" />
                        <motion.div
                          className={`absolute top-0 left-0 h-3 rounded-full ${item.color}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${item.progress}%` }}
                          transition={{ delay: 0.8 + index * 0.1, duration: 1, ease: "easeOut" }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </EnhancedCard>
            </MotionWrapper>

            {/* Achievements */}
            <MotionWrapper type="bounce" delay={0.6}>
              <EnhancedCard glow>
                <CardHeader>
                  <CardTitle className="text-red-700 flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Logros
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {achievements.map((achievement, index) => (
                      <motion.div
                        key={achievement.label}
                        className="text-center p-3 rounded-xl bg-gradient-to-br from-red-50 to-red-100 hover:from-red-100 hover:to-red-200 transition-all duration-300"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 + index * 0.1 }}
                        whileHover={{ scale: 1.05, y: -2 }}
                      >
                        <achievement.icon className="h-6 w-6 text-red-600 mx-auto mb-2" />
                        <p className="text-xs font-medium text-gray-700">{achievement.label}</p>
                        <div className="mt-2">
                          <div className="w-full bg-red-200 rounded-full h-1.5">
                            <motion.div
                              className="bg-red-600 h-1.5 rounded-full"
                              initial={{ width: 0 }}
                              animate={{ width: `${achievement.progress}%` }}
                              transition={{ delay: 1 + index * 0.1, duration: 1 }}
                            />
                          </div>
                          <span className="text-xs text-red-600 font-medium">{achievement.progress}%</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </EnhancedCard>
            </MotionWrapper>
          </div>
        </div>
      </div>
    </div>
  )
}
