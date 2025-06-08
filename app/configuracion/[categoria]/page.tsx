"use client"

import { motion } from "framer-motion"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Palette, Bell, Shield, User, GraduationCap, Accessibility } from "lucide-react"
import { useTheme } from "next-themes"
import { useState } from "react"

interface ConfiguracionCategoriaProps {
  params: {
    categoria: string
  }
}

const categoryConfig = {
  apariencia: {
    title: "Apariencia y Tema",
    icon: Palette,
    color: "from-blue-500 to-purple-600",
  },
  notificaciones: {
    title: "Notificaciones",
    icon: Bell,
    color: "from-green-500 to-teal-600",
  },
  privacidad: {
    title: "Privacidad y Seguridad",
    icon: Shield,
    color: "from-red-500 to-pink-600",
  },
  perfil: {
    title: "Perfil y Cuenta",
    icon: User,
    color: "from-orange-500 to-yellow-600",
  },
  academico: {
    title: "Preferencias Académicas",
    icon: GraduationCap,
    color: "from-indigo-500 to-blue-600",
  },
  accesibilidad: {
    title: "Accesibilidad",
    icon: Accessibility,
    color: "from-purple-500 to-pink-600",
  },
}

export default function CategoriaConfigPage() {
  const params = useParams()
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    taskReminders: true,
    examAlerts: true,
    profilePublic: false,
    showOnlineStatus: true,
    reducedMotion: false,
    highContrast: false,
    largeText: false,
  })

  const categoria = params.categoria as string
  const config = categoryConfig[categoria as keyof typeof categoryConfig]

  if (!config) {
    return <div>Categoría no encontrada</div>
  }

  const Icon = config.icon

  const handleSettingChange = (key: string, value: boolean) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  const renderAparienciaSettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Tema de la Aplicación</CardTitle>
          <CardDescription>Elige el tema que prefieras para la interfaz</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Button
              variant={theme === "light" ? "default" : "outline"}
              onClick={() => setTheme("light")}
              className="h-20 flex-col gap-2"
            >
              <div className="w-8 h-8 rounded-full bg-white border-2 border-gray-300"></div>
              <span>Claro</span>
            </Button>
            <Button
              variant={theme === "dark" ? "default" : "outline"}
              onClick={() => setTheme("dark")}
              className="h-20 flex-col gap-2"
            >
              <div className="w-8 h-8 rounded-full bg-gray-900 border-2 border-gray-600"></div>
              <span>Oscuro</span>
            </Button>
            <Button
              variant={theme === "system" ? "default" : "outline"}
              onClick={() => setTheme("system")}
              className="h-20 flex-col gap-2"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-white to-gray-900 border-2 border-gray-400"></div>
              <span>Sistema</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderNotificacionesSettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Preferencias de Notificaciones</CardTitle>
          <CardDescription>Configura cómo y cuándo recibir notificaciones</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="email-notifications">Notificaciones por Email</Label>
              <p className="text-sm text-muted-foreground">Recibe actualizaciones importantes por correo</p>
            </div>
            <Switch
              id="email-notifications"
              checked={settings.emailNotifications}
              onCheckedChange={(checked) => handleSettingChange("emailNotifications", checked)}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="push-notifications">Notificaciones Push</Label>
              <p className="text-sm text-muted-foreground">Recibe notificaciones en tiempo real</p>
            </div>
            <Switch
              id="push-notifications"
              checked={settings.pushNotifications}
              onCheckedChange={(checked) => handleSettingChange("pushNotifications", checked)}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="task-reminders">Recordatorios de Tareas</Label>
              <p className="text-sm text-muted-foreground">Alertas antes de fechas de entrega</p>
            </div>
            <Switch
              id="task-reminders"
              checked={settings.taskReminders}
              onCheckedChange={(checked) => handleSettingChange("taskReminders", checked)}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="exam-alerts">Alertas de Exámenes</Label>
              <p className="text-sm text-muted-foreground">Notificaciones sobre próximos exámenes</p>
            </div>
            <Switch
              id="exam-alerts"
              checked={settings.examAlerts}
              onCheckedChange={(checked) => handleSettingChange("examAlerts", checked)}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderPrivacidadSettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Configuración de Privacidad</CardTitle>
          <CardDescription>Controla la visibilidad de tu información</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="profile-public">Perfil Público</Label>
              <p className="text-sm text-muted-foreground">Permite que otros estudiantes vean tu perfil</p>
            </div>
            <Switch
              id="profile-public"
              checked={settings.profilePublic}
              onCheckedChange={(checked) => handleSettingChange("profilePublic", checked)}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="online-status">Mostrar Estado en Línea</Label>
              <p className="text-sm text-muted-foreground">Indica cuando estás activo en la plataforma</p>
            </div>
            <Switch
              id="online-status"
              checked={settings.showOnlineStatus}
              onCheckedChange={(checked) => handleSettingChange("showOnlineStatus", checked)}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderAccesibilidadSettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Opciones de Accesibilidad</CardTitle>
          <CardDescription>Ajustes para mejorar tu experiencia de uso</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="reduced-motion">Reducir Animaciones</Label>
              <p className="text-sm text-muted-foreground">Minimiza las animaciones y transiciones</p>
            </div>
            <Switch
              id="reduced-motion"
              checked={settings.reducedMotion}
              onCheckedChange={(checked) => handleSettingChange("reducedMotion", checked)}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="high-contrast">Alto Contraste</Label>
              <p className="text-sm text-muted-foreground">Aumenta el contraste para mejor legibilidad</p>
            </div>
            <Switch
              id="high-contrast"
              checked={settings.highContrast}
              onCheckedChange={(checked) => handleSettingChange("highContrast", checked)}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="large-text">Texto Grande</Label>
              <p className="text-sm text-muted-foreground">Aumenta el tamaño del texto en toda la aplicación</p>
            </div>
            <Switch
              id="large-text"
              checked={settings.largeText}
              onCheckedChange={(checked) => handleSettingChange("largeText", checked)}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderSettings = () => {
    switch (categoria) {
      case "apariencia":
        return renderAparienciaSettings()
      case "notificaciones":
        return renderNotificacionesSettings()
      case "privacidad":
        return renderPrivacidadSettings()
      case "accesibilidad":
        return renderAccesibilidadSettings()
      default:
        return (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">Configuración en desarrollo...</p>
            </CardContent>
          </Card>
        )
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Button variant="ghost" onClick={() => router.back()} className="mb-4 -ml-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver
          </Button>

          <div className="flex items-center gap-3 mb-2">
            <div className={`p-2 rounded-lg bg-gradient-to-br ${config.color} text-white`}>
              <Icon className="h-6 w-6" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">{config.title}</h1>
          </div>
        </motion.div>

        {/* Settings Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {renderSettings()}
        </motion.div>

        {/* Save Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 flex justify-end"
        >
          <Button size="lg" className="px-8">
            Guardar Cambios
          </Button>
        </motion.div>
      </div>
    </div>
  )
}
