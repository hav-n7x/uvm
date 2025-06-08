"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Home,
  User,
  ClipboardList,
  BookOpen,
  FolderOpen,
  Calendar,
  CreditCard,
  Gift,
  Settings,
  ChevronRight,
  HardDriveIcon as Drive,
} from "lucide-react"

const menuItems = [
  {
    id: "dashboard",
    title: "Dashboard",
    icon: Home,
    badge: null,
  },
  {
    id: "profile",
    title: "Perfil",
    icon: User,
    badge: null,
  },
  {
    id: "tasks",
    title: "Tareas",
    icon: ClipboardList,
    badge: 3,
  },
  {
    id: "exams",
    title: "Exámenes",
    icon: BookOpen,
    badge: 1,
  },
  {
    id: "projects",
    title: "Proyectos",
    icon: FolderOpen,
    badge: null,
  },
  {
    id: "calendar",
    title: "Calendario",
    icon: Calendar,
    badge: null,
  },
  {
    id: "workspace",
    title: "Google Workspace",
    icon: Drive,
    badge: null,
  },
  {
    id: "payments",
    title: "Pagos",
    icon: CreditCard,
    badge: null,
  },
  {
    id: "benefits",
    title: "Beneficios",
    icon: Gift,
    badge: 2,
  },
  {
    id: "settings",
    title: "Configuración",
    icon: Settings,
    badge: null,
  },
]

interface ProfessionalSidebarProps {
  activeSection: string
  setActiveSection: (section: string) => void
}

export function ProfessionalSidebar({ activeSection, setActiveSection }: ProfessionalSidebarProps) {
  return (
    <Sidebar variant="inset" className="border-r border-border/40">
      <SidebarHeader className="border-b border-border/40 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <span className="text-sm font-bold">UVM</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-foreground">Portal UVM</span>
            <span className="text-xs text-muted-foreground">Campus Hispano</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-2">
        <SidebarMenu>
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = activeSection === item.id

            return (
              <SidebarMenuItem key={item.id}>
                <SidebarMenuButton
                  onClick={() => setActiveSection(item.id)}
                  isActive={isActive}
                  className="group relative w-full justify-start gap-3 px-3 py-2.5 text-sm font-medium transition-all duration-200 hover:bg-accent/50"
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span className="truncate">{item.title}</span>
                  {item.badge && (
                    <Badge variant="secondary" className="ml-auto h-5 px-1.5 text-xs">
                      {item.badge}
                    </Badge>
                  )}
                  {isActive && <ChevronRight className="ml-auto h-4 w-4 shrink-0 text-primary" />}
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="border-t border-border/40 p-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="José Antonio" />
            <AvatarFallback className="bg-primary text-primary-foreground text-xs">JA</AvatarFallback>
          </Avatar>
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-medium text-foreground truncate">José Antonio</span>
            <span className="text-xs text-muted-foreground truncate">Ingeniería en Sistemas</span>
          </div>
        </div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
