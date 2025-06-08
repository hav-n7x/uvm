"use client"

import { useState } from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { ProfessionalSidebar } from "@/components/professional-sidebar"
import { ProfessionalHeader } from "@/components/professional-header"
import { Dashboard } from "@/components/dashboard"
import { Profile } from "@/components/profile"
// import { Tasks } from "@/components/tasks" // Removed Tasks import
import { Exams } from "@/components/exams"
import { Projects } from "@/components/projects"
import { AcademicCalendar } from "@/components/academic-calendar"
import { Payments } from "@/components/payments"
import { Benefits } from "@/components/benefits"
import { ConfigurationMain } from "@/components/configuration-main"
import { GoogleWorkspace } from "@/components/google-workspace"

export default function HomePage() {
  const [activeSection, setActiveSection] = useState("dashboard")

  const renderActiveSection = () => {
    switch (activeSection) {
      case "dashboard":
        return <Dashboard />
      case "profile":
        return <Profile />
      // case "tasks": // Removed Tasks case
      //   return <Tasks />
      case "exams":
        return <Exams />
      case "projects":
        return <Projects />
      case "calendar":
        return <AcademicCalendar />
      case "payments":
        return <Payments />
      case "benefits":
        return <Benefits />
      case "settings":
        return <ConfigurationMain />
      case "workspace":
        return <GoogleWorkspace />
      default:
        return <Dashboard />
    }
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <ProfessionalSidebar activeSection={activeSection} setActiveSection={setActiveSection} />

        <div className="flex-1 flex flex-col overflow-hidden">
          <ProfessionalHeader activeSection={activeSection} />

          <main className="flex-1 overflow-y-auto bg-background">
            <div className="container mx-auto p-4 md:p-6 lg:p-8 max-w-7xl">{renderActiveSection()}</div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
