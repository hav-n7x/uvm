"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Tasks } from "@/components/tasks"

export default function TasksPage() {
  const router = useRouter()

  useEffect(() => {
    // Este efecto redirige a la página principal con la sección de tareas activa
    const event = new CustomEvent("set-active-section", { detail: "tasks" })
    window.dispatchEvent(event)
  }, [])

  return <Tasks />
}
