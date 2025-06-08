"use client"

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
} from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

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
  },
  {
    title: "Mi Perfil",
    url: "profile",
    icon: User,
  },
  {
    title: "Tareas",
    url: "tasks",
    icon: ClipboardList,
  },
  {
    title: "Exámenes",
    url: "exams",
    icon: BookOpen,
  },
  {
    title: "Proyectos",
    url: "projects",
    icon: FileText,
  },
]

const academicItems = [
  {
    title: "Calendario Académico",
    url: "calendar",
    icon: Calendar,
  },
  {
    title: "Pagos y Colegiaturas",
    url: "payments",
    icon: CreditCard,
  },
  {
    title: "Beneficios Estudiantiles",
    url: "benefits",
    icon: Gift,
  },
]

interface AppSidebarProps {
  activeSection: string
  setActiveSection: (section: string) => void
}

export function AppSidebar({ activeSection, setActiveSection }: AppSidebarProps) {
  const { setTheme } = useTheme()

  return (
    <Sidebar className="border-r border-gray-200 dark:border-gray-700">
      <SidebarHeader className="bg-red-600 text-white p-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-16 flex items-center justify-center bg-white rounded overflow-hidden">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Imagen%20de%20WhatsApp%202025-04-28%20a%20las%2022.34.52_65bb3da3.jpg-ux7xSEqS2Ix7X2nzQPsxQSz4puwtzk.jpeg"
              alt="UVM Logo"
              className="h-8 w-14 object-contain"
              crossOrigin="anonymous"
            />
          </div>
          <div>
            <h2 className="text-lg font-bold">Portal UVM</h2>
            <p className="text-sm text-red-100">Campus Hispano</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="bg-white dark:bg-gray-800">
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-600 dark:text-gray-300 font-semibold">
            Navegación Principal
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    onClick={() => setActiveSection(item.url)}
                    isActive={activeSection === item.url}
                    className="hover:bg-red-50 hover:text-red-600 data-[active=true]:bg-red-100 data-[active=true]:text-red-700 dark:hover:bg-red-900/20 dark:data-[active=true]:bg-red-900/30"
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-600 dark:text-gray-300 font-semibold">
            Servicios Académicos
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {academicItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    onClick={() => setActiveSection(item.url)}
                    isActive={activeSection === item.url}
                    className="hover:bg-red-50 hover:text-red-600 data-[active=true]:bg-red-100 data-[active=true]:text-red-700 dark:hover:bg-red-900/20 dark:data-[active=true]:bg-red-900/30"
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-600 dark:text-gray-300 font-semibold">
            Configuración
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuButton className="hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20">
                      <Monitor className="h-4 w-4" />
                      <span>Tema</span>
                    </SidebarMenuButton>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
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

      <SidebarFooter className="bg-gray-800 text-white p-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full overflow-hidden flex-shrink-0">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Imagen%20de%20WhatsApp%202025-04-28%20a%20las%2018.59.23_300abc07.jpg-wlyfeMkXPZvzkXiKPUBwk4MqKBbuze.jpeg"
              alt="José Antonio Ríos Rojo"
              className="h-full w-full object-cover object-center"
              crossOrigin="anonymous"
            />
          </div>
          <div>
            <p className="text-sm font-medium">José Antonio Ríos</p>
            <p className="text-xs text-gray-300">Ing. Sistemas</p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
