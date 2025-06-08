"use client"

import { motion } from "framer-motion"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { EnhancedNotificationCenter } from "@/components/enhanced-notification-center"
import { StatsDashboard } from "@/components/stats-dashboard"
import { GlobalSearch } from "@/components/global-search"
import { Home, User, ClipboardList, BookOpen, FolderOpen, Calendar, CreditCard, Gift, Settings } from "lucide-react"

const sectionConfig = {
  dashboard: { title: "Dashboard", icon: Home },
  profile: { title: "Mi Perfil", icon: User },
  tasks: { title: "Tareas", icon: ClipboardList },
  exams: { title: "Exámenes", icon: BookOpen },
  projects: { title: "Proyectos", icon: FolderOpen },
  calendar: { title: "Calendario Académico", icon: Calendar },
  payments: { title: "Pagos y Colegiaturas", icon: CreditCard },
  benefits: { title: "Beneficios Estudiantiles", icon: Gift },
  settings: { title: "Configuración", icon: Settings },
}

interface ProfessionalHeaderProps {
  activeSection: string
}

export function ProfessionalHeader({ activeSection }: ProfessionalHeaderProps) {
  const currentSection = sectionConfig[activeSection as keyof typeof sectionConfig] || sectionConfig.dashboard
  const Icon = currentSection.icon

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <SidebarTrigger className="md:hidden" />
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Icon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-foreground">{currentSection.title}</h1>
              <p className="text-sm text-muted-foreground hidden sm:block">
                {activeSection === "dashboard" && "Bienvenido de vuelta, José Antonio"}
                {activeSection === "profile" && "Gestiona tu información personal"}
                {activeSection === "tasks" && "Organiza y completa tus tareas"}
                {activeSection === "exams" && "Prepárate para tus exámenes"}
                {activeSection === "projects" && "Desarrolla tus proyectos académicos"}
                {activeSection === "calendar" && "Consulta fechas importantes"}
                {activeSection === "payments" && "Gestiona tus pagos y colegiaturas"}
                {activeSection === "benefits" && "Descubre tus beneficios estudiantiles"}
                {activeSection === "settings" && "Personaliza tu experiencia"}
              </p>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2">
          <GlobalSearch />
          <StatsDashboard />
          <EnhancedNotificationCenter />
        </div>
      </div>
    </motion.header>
  )
}
