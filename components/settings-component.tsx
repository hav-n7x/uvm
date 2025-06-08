"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Settings, ChevronRight } from "lucide-react"
import { useState } from "react"

export function SettingsComponent() {
  const [showSettings, setShowSettings] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-primary/10">
          <Settings className="h-6 w-6 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">Configuración</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Configuración del Sistema</CardTitle>
          <CardDescription>Personaliza tu experiencia en el Portal UVM</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <Button
              variant="outline"
              className="justify-between h-auto p-4"
              onClick={() => (window.location.href = "/configuracion")}
            >
              <div className="text-left">
                <div className="font-medium">Abrir Configuración Completa</div>
                <div className="text-sm text-muted-foreground">Accede a todas las opciones de configuración</div>
              </div>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
