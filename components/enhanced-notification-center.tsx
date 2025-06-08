"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Bell, Check, AlertCircle, CheckCircle, Info, Calendar, FileText, CreditCard, Trash2 } from "lucide-react"

interface Notification {
  id: string
  type: "info" | "success" | "warning" | "error" | "task" | "exam" | "payment"
  title: string
  message: string
  timestamp: Date
  read: boolean
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "task",
    title: "Nueva tarea asignada",
    message: "Tarea de Álgebra Lineal - Sistemas de ecuaciones",
    timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 min ago
    read: false,
  },
  {
    id: "2",
    type: "exam",
    title: "Recordatorio de examen",
    message: "Examen de Programación mañana a las 10:00 AM",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    read: false,
  },
  {
    id: "3",
    type: "payment",
    title: "Pago procesado",
    message: "Tu pago de colegiatura ha sido procesado exitosamente",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    read: true,
  },
  {
    id: "4",
    type: "success",
    title: "Calificación disponible",
    message: "Tu calificación del proyecto final ya está disponible",
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    read: true,
  },
]

const getNotificationIcon = (type: Notification["type"]) => {
  switch (type) {
    case "task":
      return FileText
    case "exam":
      return Calendar
    case "payment":
      return CreditCard
    case "success":
      return CheckCircle
    case "warning":
      return AlertCircle
    case "error":
      return AlertCircle
    default:
      return Info
  }
}

const getNotificationColor = (type: Notification["type"]) => {
  switch (type) {
    case "task":
      return "text-blue-600 dark:text-blue-400"
    case "exam":
      return "text-purple-600 dark:text-purple-400"
    case "payment":
      return "text-green-600 dark:text-green-400"
    case "success":
      return "text-green-600 dark:text-green-400"
    case "warning":
      return "text-yellow-600 dark:text-yellow-400"
    case "error":
      return "text-red-600 dark:text-red-400"
    default:
      return "text-blue-600 dark:text-blue-400"
  }
}

const formatTimestamp = (timestamp: Date) => {
  const now = new Date()
  const diff = now.getTime() - timestamp.getTime()
  const minutes = Math.floor(diff / (1000 * 60))
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))

  if (minutes < 60) {
    return `hace ${minutes}m`
  } else if (hours < 24) {
    return `hace ${hours}h`
  } else {
    return `hace ${days}d`
  }
}

export function EnhancedNotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)
  const [isOpen, setIsOpen] = useState(false)

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })))
  }

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative h-9 w-9">
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center"
            >
              {unreadCount > 9 ? "9+" : unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h3 className="font-semibold text-foreground">Notificaciones</h3>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllAsRead} className="text-xs">
              Marcar todas como leídas
            </Button>
          )}
        </div>

        <ScrollArea className="h-80">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-8 text-center">
              <Bell className="h-8 w-8 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">No hay notificaciones</p>
            </div>
          ) : (
            <div className="space-y-1 p-1">
              {notifications.map((notification, index) => {
                const Icon = getNotificationIcon(notification.type)
                const iconColor = getNotificationColor(notification.type)

                return (
                  <div key={notification.id}>
                    <div
                      className={`group relative flex items-start gap-3 p-3 rounded-lg transition-colors hover:bg-accent/50 ${
                        !notification.read ? "bg-accent/30" : ""
                      }`}
                    >
                      <div className={`mt-0.5 ${iconColor}`}>
                        <Icon className="h-4 w-4" />
                      </div>

                      <div className="flex-1 min-w-0 space-y-1">
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-sm font-medium text-foreground leading-tight">{notification.title}</p>
                          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            {!notification.read && (
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6"
                                onClick={() => markAsRead(notification.id)}
                              >
                                <Check className="h-3 w-3" />
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 text-destructive hover:text-destructive"
                              onClick={() => deleteNotification(notification.id)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed">{notification.message}</p>
                        <p className="text-xs text-muted-foreground">{formatTimestamp(notification.timestamp)}</p>
                      </div>

                      {!notification.read && <div className="absolute top-3 right-3 h-2 w-2 bg-primary rounded-full" />}
                    </div>
                    {index < notifications.length - 1 && <Separator className="mx-3" />}
                  </div>
                )
              })}
            </div>
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  )
}
