"use client"

import { motion, AnimatePresence } from "framer-motion"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Moon,
  Sun,
  Monitor,
  User,
  Settings,
  LogOut,
  HelpCircle,
  Search,
  Bell,
  Focus,
  Sparkles,
  Zap,
} from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import { useState } from "react"

interface EnhancedHeaderProps {
  activeSection: string
  setActiveSection: (section: string) => void
}

export function EnhancedHeader({ activeSection, setActiveSection }: EnhancedHeaderProps) {
  const { setTheme } = useTheme()
  const [notifications] = useState(3)

  const getSectionTitle = (section: string) => {
    const titles = {
      dashboard: "Dashboard",
      profile: "Mi Perfil",
      tasks: "Tareas",
      exams: "Exámenes",
      projects: "Proyectos",
      calendar: "Calendario Académico",
      payments: "Pagos y Colegiaturas",
      benefits: "Beneficios Estudiantiles",
    }
    return titles[section as keyof typeof titles] || "Portal UVM"
  }

  const getSectionIcon = (section: string) => {
    switch (section) {
      case "dashboard":
        return <Sparkles className="h-5 w-5 text-blue-600" />
      case "tasks":
        return <Zap className="h-5 w-5 text-red-600" />
      default:
        return null
    }
  }

  return (
    <motion.header
      className="sticky top-0 z-40 w-full border-b border-gray-200/50 bg-white/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60 dark:border-gray-700/50 dark:bg-gray-900/80"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className="flex h-16 items-center gap-4 px-6">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <SidebarTrigger className="-ml-1 hover:bg-red-50 hover:text-red-600 transition-colors" />
        </motion.div>
        <Separator orientation="vertical" className="mr-2 h-4 bg-gradient-to-b from-gray-300 to-gray-400" />

        {/* Section Title with Icon */}
        <motion.div
          className="flex-1 min-w-0 flex items-center gap-3"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          {getSectionIcon(activeSection)}
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent truncate">
              {getSectionTitle(activeSection)}
            </h1>
            <p className="text-xs text-gray-500">Portal Estudiantil UVM</p>
          </div>
        </motion.div>

        {/* Header Actions */}
        <motion.div
          className="flex items-center gap-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          {/* Search Button */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="ghost"
              size="icon"
              className="relative hover:bg-blue-50 hover:text-blue-600 transition-colors"
            >
              <Search className="h-5 w-5" />
              <span className="sr-only">Buscar</span>
            </Button>
          </motion.div>

          {/* Focus Mode Button */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="ghost"
              size="icon"
              className="relative hover:bg-purple-50 hover:text-purple-600 transition-colors"
            >
              <Focus className="h-5 w-5" />
              <span className="sr-only">Modo Focus</span>
            </Button>
          </motion.div>

          {/* Notifications */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="ghost"
              size="icon"
              className="relative hover:bg-red-50 hover:text-red-600 transition-colors"
            >
              <Bell className="h-5 w-5" />
              <AnimatePresence>
                {notifications > 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1 -right-1"
                  >
                    <Badge className="h-5 w-5 flex items-center justify-center p-0 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs">
                      {notifications > 9 ? "9+" : notifications}
                    </Badge>
                  </motion.div>
                )}
              </AnimatePresence>
              <span className="sr-only">Notificaciones</span>
            </Button>
          </motion.div>

          {/* Theme Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-yellow-50 hover:text-yellow-600 transition-colors"
                >
                  <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Cambiar tema</span>
                </Button>
              </motion.div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="backdrop-blur-xl bg-white/90">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                <Sun className="mr-2 h-4 w-4" />
                <span>Claro</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                <Moon className="mr-2 h-4 w-4" />
                <span>Oscuro</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                <Monitor className="mr-2 h-4 w-4" />
                <span>Sistema</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="ghost" size="icon" className="relative">
                  <div className="h-8 w-8 rounded-full overflow-hidden ring-2 ring-red-200 hover:ring-red-400 transition-all">
                    <img
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Imagen%20de%20WhatsApp%202025-04-28%20a%20las%2018.59.23_300abc07.jpg-wlyfeMkXPZvzkXiKPUBwk4MqKBbuze.jpeg"
                      alt="José Antonio Ríos Rojo"
                      className="h-full w-full object-cover"
                      crossOrigin="anonymous"
                    />
                  </div>
                </Button>
              </motion.div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 backdrop-blur-xl bg-white/90">
              <DropdownMenuItem onClick={() => setActiveSection("profile")}>
                <User className="mr-2 h-4 w-4" />
                <span>Mi Perfil</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Configuración</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <HelpCircle className="mr-2 h-4 w-4" />
                <span>Ayuda</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Cerrar Sesión</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </motion.div>
      </div>
    </motion.header>
  )
}
