"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import {
  Settings,
  Palette,
  Bell,
  Shield,
  User,
  GraduationCap,
  Accessibility,
  Monitor,
  Sun,
  Moon,
  ChevronRight,
  Save,
} from "lucide-react"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"

const configCategories = [
  {
    id: "apariencia",
    title: "Apariencia y Tema",
    description: "Personaliza el tema, colores y diseño de la interfaz",
    icon: Palette,
    color: "from-blue-500 to-purple-600",
    settings: ["theme", "fontSize", "animations"],
  },
  {
    id: "notificaciones",
    title: "Notificaciones",
    description: "Configura alertas, recordatorios y preferencias de comunicación",
    icon: Bell,
    color: "from-green-500 to-teal-600",
    settings: ["email", "push", "reminders"],
  },
  {
    id: "privacidad",
    title: "Privacidad y Seguridad",
    description: "Gestiona tu privacidad, contraseñas y configuración de seguridad",
    icon: Shield,
    color: "from-red-500 to-pink-600",
    settings: ["profile", "data", "security"],
  },
  {
    id: "academico",
    title: "Preferencias Académicas",
    description: "Configura horarios, recordatorios de tareas y calendario académico",
    icon: GraduationCap,
    color: "from-indigo-500 to-blue-600",
    settings: ["schedule", "tasks", "calendar"],
  },
  {
    id: "accesibilidad",
    title: "Accesibilidad",
    description: "Ajustes para mejorar la experiencia de uso y accesibilidad",
    icon: Accessibility,
    color: "from-purple-500 to-pink-600",
    settings: ["motion", "contrast", "text"],
  },
]

export function ConfigurationMain() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
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
    autoSave: true,
    darkMode: false,
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSettingChange = (key: string, value: boolean) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  const saveSettings = () => {
    // Aquí guardarías las configuraciones en localStorage o API
    console.log("Configuraciones guardadas:", settings)
  }

  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Settings className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Configuración</h1>
            <p className="text-muted-foreground">Personaliza tu experiencia en el Portal UVM</p>
          </div>
        </div>
        <Button onClick={saveSettings} className="gap-2">
          <Save className="h-4 w-4" />
          Guardar Cambios
        </Button>
      </div>

      {/* Quick Theme Selector */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Tema Rápido
          </CardTitle>
          <CardDescription>Cambia el tema de la aplicación</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Button
              variant={theme === "light" ? "default" : "outline"}
              onClick={() => setTheme("light")}
              className="h-16 flex-col gap-2"
            >
              <Sun className="h-5 w-5" />
              <span>Claro</span>
            </Button>
            <Button
              variant={theme === "dark" ? "default" : "outline"}
              onClick={() => setTheme("dark")}
              className="h-16 flex-col gap-2"
            >
              <Moon className="h-5 w-5" />
              <span>Oscuro</span>
            </Button>
            <Button
              variant={theme === "system" ? "default" : "outline"}
              onClick={() => setTheme("system")}
              className="h-16 flex-col gap-2"
            >
              <Monitor className="h-5 w-5" />
              <span>Sistema</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Configuration Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {configCategories.map((category, index) => {
          const Icon = category.icon
          const isActive = activeCategory === category.id

          return (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card
                className={`group cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02] border-border/50 hover:border-primary/20 ${
                  isActive ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => setActiveCategory(isActive ? null : category.id)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${category.color} text-white shadow-lg`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">
                        {category.settings.length}
                      </Badge>
                      <ChevronRight
                        className={`h-5 w-5 text-muted-foreground group-hover:text-primary transition-all ${
                          isActive ? "rotate-90" : ""
                        }`}
                      />
                    </div>
                  </div>
                  <CardTitle className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                    {category.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm text-muted-foreground leading-relaxed">
                    {category.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* Expanded Category Settings */}
      {activeCategory && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>{configCategories.find((c) => c.id === activeCategory)?.title}</CardTitle>
              <CardDescription>Configura las opciones específicas de esta categoría</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {activeCategory === "notificaciones" && (
                <>
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
                </>
              )}

              {activeCategory === "privacidad" && (
                <>
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
                </>
              )}

              {activeCategory === "accesibilidad" && (
                <>
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
                </>
              )}

              {activeCategory === "academico" && (
                <div className="text-center py-8">
                  <GraduationCap className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Configuraciones académicas en desarrollo...</p>
                </div>
              )}

              {activeCategory === "apariencia" && (
                <div className="space-y-6">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-4">
                      Usa los botones de tema arriba para cambiar la apariencia
                    </p>
                    <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                      <span>
                        Tema actual: <strong className="text-foreground">{theme}</strong>
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Acciones Rápidas</CardTitle>
          <CardDescription>Configuraciones frecuentes para un acceso más rápido</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center justify-between p-3 rounded-lg border">
              <div className="flex items-center gap-2">
                <Bell className="h-4 w-4 text-primary" />
                <span className="text-sm">Auto-guardar</span>
              </div>
              <Switch
                checked={settings.autoSave}
                onCheckedChange={(checked) => handleSettingChange("autoSave", checked)}
              />
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg border">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-primary" />
                <span className="text-sm">Modo privado</span>
              </div>
              <Switch
                checked={!settings.profilePublic}
                onCheckedChange={(checked) => handleSettingChange("profilePublic", !checked)}
              />
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg border">
              <div className="flex items-center gap-2">
                <Accessibility className="h-4 w-4 text-primary" />
                <span className="text-sm">Reducir movimiento</span>
              </div>
              <Switch
                checked={settings.reducedMotion}
                onCheckedChange={(checked) => handleSettingChange("reducedMotion", checked)}
              />
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg border">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-primary" />
                <span className="text-sm">Estado online</span>
              </div>
              <Switch
                checked={settings.showOnlineStatus}
                onCheckedChange={(checked) => handleSettingChange("showOnlineStatus", checked)}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
