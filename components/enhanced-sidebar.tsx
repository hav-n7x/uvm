"use client"

import { motion, AnimatePresence } from "framer-motion"
import {
  BookOpen,
  ClipboardList,
  FileText,
  Home,
  User,
  Calendar,
  CreditCard,
  Moon,
  Sun,
  Monitor,
  Gift,
  ChevronRight,
  Sparkles,
} from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar"

const menuItems = [
  {
    title: "Dashboard",
    url: "dashboard",
    icon: Home,
    badge: null,
    gradient: "from-blue-500 to-blue-600",
  },
  {
    title: "Mi Perfil",
    url: "profile",
    icon: User,
    badge: null,
    gradient: "from-green-500 to-green-600",
  },
  {
    title: "Tareas",
    url: "tasks",
    icon: ClipboardList,
    badge: "3",
    gradient: "from-red-500 to-red-600",
  },
  {
    title: "Exámenes",
    url: "exams",
    icon: BookOpen,
    badge: "1",
    gradient: "from-purple-500 to-purple-600",
  },
  {
    title: "Proyectos",
    url: "projects",
    icon: FileText,
    badge: null,
    gradient: "from-orange-500 to-orange-600",
  },
]

const academicItems = [
  {
    title: "Calendario Académico",
    url: "calendar",
    icon: Calendar,
    gradient: "from-indigo-500 to-indigo-600",
  },
  {
    title: "Pagos y Colegiaturas",
    url: "payments",
    icon: CreditCard,
    gradient: "from-emerald-500 to-emerald-600",
  },
  {
    title: "Beneficios Estudiantiles",
    url: "benefits",
    icon: Gift,
    gradient: "from-pink-500 to-pink-600",
  },
]

interface EnhancedSidebarProps {
  activeSection: string
  setActiveSection: (section: string) => void
}

export function EnhancedSidebar({ activeSection, setActiveSection }: EnhancedSidebarProps) {
  const { setTheme } = useTheme()

  return (
    <Sidebar className="border-r border-gray-200/50 dark:border-gray-700/50 backdrop-blur-xl">
      {/* Header with Glassmorphism */}
      <SidebarHeader className="relative overflow-hidden bg-gradient-to-br from-red-600 via-red-700 to-red-800 text-white p-6">
        <div className="absolute inset-0 bg-black/10 backdrop-blur-sm" />
        <motion.div
          className="relative z-10 flex items-center gap-3"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="h-12 w-20 flex items-center justify-center bg-white/90 rounded-xl overflow-hidden shadow-lg"
            whileHover={{ scale: 1.05, rotate: 2 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Imagen%20de%20WhatsApp%202025-04-28%20a%20las%2022.34.52_65bb3da3.jpg-ux7xSEqS2Ix7X2nzQPsxQSz4puwtzk.jpeg"
              alt="UVM Logo"
              className="h-10 w-16 object-contain"
              crossOrigin="anonymous"
            />
          </motion.div>
          <div>
            <motion.h2
              className="text-xl font-bold bg-gradient-to-r from-white to-red-100 bg-clip-text text-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Portal UVM
            </motion.h2>
            <motion.p
              className="text-sm text-red-100 flex items-center gap-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Sparkles className="h-3 w-3" />
              Campus Hispano
            </motion.p>
          </div>
        </motion.div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16" />
      </SidebarHeader>

      <SidebarContent className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl">
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-600 dark:text-gray-300 font-semibold flex items-center gap-2">
            <div className="w-2 h-2 bg-gradient-to-r from-red-500 to-red-600 rounded-full" />
            Navegación Principal
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <AnimatePresence>
                {menuItems.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        onClick={() => setActiveSection(item.url)}
                        isActive={activeSection === item.url}
                        className={`
                          group relative overflow-hidden transition-all duration-300 ease-out
                          hover:bg-gradient-to-r hover:from-red-50 hover:to-red-100 hover:text-red-700
                          data-[active=true]:bg-gradient-to-r data-[active=true]:from-red-100 data-[active=true]:to-red-200 
                          data-[active=true]:text-red-800 data-[active=true]:shadow-lg
                          dark:hover:from-red-900/20 dark:hover:to-red-800/20
                          dark:data-[active=true]:from-red-900/30 dark:data-[active=true]:to-red-800/30
                        `}
                      >
                        <motion.div
                          className={`p-2 rounded-lg bg-gradient-to-r ${item.gradient} text-white shadow-lg`}
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <item.icon className="h-4 w-4" />
                        </motion.div>
                        <span className="font-medium">{item.title}</span>
                        {item.badge && (
                          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="ml-auto">
                            <Badge className="bg-red-600 text-white text-xs px-2 py-0.5">{item.badge}</Badge>
                          </motion.div>
                        )}
                        {activeSection === item.url && (
                          <motion.div
                            className="absolute right-2 text-red-600"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <ChevronRight className="h-4 w-4" />
                          </motion.div>
                        )}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </motion.div>
                ))}
              </AnimatePresence>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator className="bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

        {/* Academic Services */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-600 dark:text-gray-300 font-semibold flex items-center gap-2">
            <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full" />
            Servicios Académicos
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {academicItems.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      onClick={() => setActiveSection(item.url)}
                      isActive={activeSection === item.url}
                      className={`
                        group relative overflow-hidden transition-all duration-300 ease-out
                        hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 hover:text-blue-700
                        data-[active=true]:bg-gradient-to-r data-[active=true]:from-blue-100 data-[active=true]:to-blue-200 
                        data-[active=true]:text-blue-800 data-[active=true]:shadow-lg
                      `}
                    >
                      <motion.div
                        className={`p-2 rounded-lg bg-gradient-to-r ${item.gradient} text-white shadow-lg`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <item.icon className="h-4 w-4" />
                      </motion.div>
                      <span className="font-medium">{item.title}</span>
                      {activeSection === item.url && (
                        <motion.div
                          className="absolute right-2 text-blue-600"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <ChevronRight className="h-4 w-4" />
                        </motion.div>
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </motion.div>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator className="bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

        {/* Theme Selector */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-600 dark:text-gray-300 font-semibold flex items-center gap-2">
            <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full" />
            Configuración
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuButton className="hover:bg-gradient-to-r hover:from-purple-50 hover:to-purple-100 hover:text-purple-700">
                      <motion.div
                        className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        <Monitor className="h-4 w-4" />
                      </motion.div>
                      <span className="font-medium">Tema</span>
                    </SidebarMenuButton>
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
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Enhanced Footer */}
      <SidebarFooter className="relative overflow-hidden bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white p-4">
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 to-transparent" />
        <motion.div
          className="relative z-10 flex items-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <motion.div
            className="h-12 w-12 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-white/20 shadow-xl"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Imagen%20de%20WhatsApp%202025-04-28%20a%20las%2018.59.23_300abc07.jpg-wlyfeMkXPZvzkXiKPUBwk4MqKBbuze.jpeg"
              alt="José Antonio Ríos Rojo"
              className="h-full w-full object-cover object-center"
              crossOrigin="anonymous"
            />
          </motion.div>
          <div>
            <p className="text-sm font-medium bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              José Antonio Ríos
            </p>
            <p className="text-xs text-gray-400 flex items-center gap-1">
              <Sparkles className="h-3 w-3" />
              Ing. Sistemas
            </p>
          </div>
        </motion.div>
        <div className="absolute bottom-0 right-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 translate-x-12" />
      </SidebarFooter>
    </Sidebar>
  )
}
