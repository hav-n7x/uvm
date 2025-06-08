"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { googleAuthGAPI } from "@/lib/google-auth-gapi"
import {
  googleDriveService,
  googleSheetsService,
  googleCalendarService,
  googleGmailService,
} from "@/lib/google-services-gapi"
import {
  LogIn,
  LogOut,
  HardDriveIcon as Drive,
  FileSpreadsheet,
  Calendar,
  Mail,
  Upload,
  Plus,
  Eye,
  AlertCircle,
} from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface DriveFile {
  id: string
  name: string
  mimeType: string
  modifiedTime: string
  webViewLink: string
  iconLink?: string
}

interface CalendarEvent {
  id: string
  summary: string
  start?: {
    dateTime?: string
    date?: string
  }
}

interface GmailMessage {
  id: string
  threadId: string
}

export function GoogleWorkspace() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(false)
  const [driveFiles, setDriveFiles] = useState<DriveFile[]>([])
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>([])
  const [gmailMessages, setGmailMessages] = useState<GmailMessage[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    initializeAuth()
  }, [])

  const initializeAuth = async () => {
    try {
      await googleAuthGAPI.initialize()
      setIsAuthenticated(googleAuthGAPI.isSignedIn())

      if (googleAuthGAPI.isSignedIn()) {
        await loadUserData()
      }
    } catch (error) {
      console.error("Error initializing auth:", error)
      setError("Error al inicializar la autenticación con Google")
    }
  }

  const handleSignIn = async () => {
    try {
      setLoading(true)
      setError(null)

      const success = await googleAuthGAPI.signIn()

      if (success) {
        setIsAuthenticated(true)
        toast({
          title: "¡Autenticación exitosa!",
          description: "Conectado con Google Workspace",
        })
        await loadUserData()
      } else {
        setError("No se pudo completar la autenticación")
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error)
      setError("Error al conectar con Google. Verifica que las APIs estén habilitadas.")
      toast({
        title: "Error",
        description: "No se pudo iniciar sesión",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSignOut = async () => {
    try {
      await googleAuthGAPI.signOut()
      setIsAuthenticated(false)
      setDriveFiles([])
      setCalendarEvents([])
      setGmailMessages([])
      setError(null)

      toast({
        title: "Sesión cerrada",
        description: "Desconectado de Google Workspace",
      })
    } catch (error) {
      console.error("Error al cerrar sesión:", error)
    }
  }

  const loadUserData = async () => {
    try {
      setLoading(true)
      setError(null)

      // Cargar archivos de Drive
      try {
        const driveData = await googleDriveService.listFiles(20)
        setDriveFiles(driveData.files || [])
      } catch (error) {
        console.error("Error loading Drive files:", error)
      }

      // Cargar eventos del calendario
      try {
        const calendarData = await googleCalendarService.listEvents("primary", 10)
        setCalendarEvents(calendarData.items || [])
      } catch (error) {
        console.error("Error loading Calendar events:", error)
      }

      // Cargar mensajes de Gmail
      try {
        const gmailData = await googleGmailService.listMessages(10)
        setGmailMessages(gmailData.messages || [])
      } catch (error) {
        console.error("Error loading Gmail messages:", error)
      }
    } catch (error) {
      console.error("Error cargando datos:", error)
      setError("No se pudieron cargar algunos datos. Verifica los permisos.")
    } finally {
      setLoading(false)
    }
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      setLoading(true)
      await googleDriveService.uploadFile(file)

      toast({
        title: "Archivo subido",
        description: `${file.name} se subió correctamente`,
      })

      // Recargar archivos
      const driveData = await googleDriveService.listFiles(20)
      setDriveFiles(driveData.files || [])
    } catch (error) {
      console.error("Error subiendo archivo:", error)
      toast({
        title: "Error",
        description: "No se pudo subir el archivo",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const createSpreadsheet = async () => {
    try {
      setLoading(true)
      const title = `Hoja UVM - ${new Date().toLocaleDateString()}`
      const sheet = await googleSheetsService.createSpreadsheet(title)

      toast({
        title: "Hoja creada",
        description: `${title} creada exitosamente`,
      })

      // Abrir en nueva pestaña
      if (sheet.spreadsheetUrl) {
        window.open(sheet.spreadsheetUrl, "_blank")
      }
    } catch (error) {
      console.error("Error creando hoja:", error)
      toast({
        title: "Error",
        description: "No se pudo crear la hoja de cálculo",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2">
              <Drive className="h-6 w-6" />
              Google Workspace
            </CardTitle>
            <CardDescription>
              Conecta tu cuenta de Google para acceder a Drive, Sheets, Calendar y Gmail
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button onClick={handleSignIn} disabled={loading} className="w-full" size="lg">
              <LogIn className="mr-2 h-4 w-4" />
              {loading ? "Conectando..." : "Conectar con Google"}
            </Button>

            <div className="text-xs text-muted-foreground text-center">
              <p>Nota: Asegúrate de que las APIs de Google estén habilitadas:</p>
              <ul className="mt-2 space-y-1">
                <li>• Google Drive API</li>
                <li>• Google Sheets API</li>
                <li>• Google Calendar API</li>
                <li>• Gmail API</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Google Workspace</h1>
          <p className="text-muted-foreground">Gestiona tus archivos, calendarios y correos desde UVM</p>
        </div>
        <Button onClick={handleSignOut} variant="outline">
          <LogOut className="mr-2 h-4 w-4" />
          Desconectar
        </Button>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="drive" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="drive" className="flex items-center gap-2">
            <Drive className="h-4 w-4" />
            Drive
          </TabsTrigger>
          <TabsTrigger value="sheets" className="flex items-center gap-2">
            <FileSpreadsheet className="h-4 w-4" />
            Sheets
          </TabsTrigger>
          <TabsTrigger value="calendar" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Calendar
          </TabsTrigger>
          <TabsTrigger value="gmail" className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Gmail
          </TabsTrigger>
        </TabsList>

        <TabsContent value="drive" className="space-y-4">
          <div className="flex items-center gap-4">
            <input type="file" onChange={handleFileUpload} className="hidden" id="file-upload" />
            <Button asChild>
              <label htmlFor="file-upload" className="cursor-pointer">
                <Upload className="mr-2 h-4 w-4" />
                Subir Archivo
              </label>
            </Button>
            <Button onClick={() => loadUserData()} variant="outline" disabled={loading}>
              {loading ? "Cargando..." : "Actualizar"}
            </Button>
          </div>

          <div className="grid gap-4">
            {driveFiles.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <p className="text-muted-foreground">No hay archivos para mostrar</p>
                </CardContent>
              </Card>
            ) : (
              driveFiles.map((file) => (
                <Card key={file.id}>
                  <CardContent className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                      <img src={file.iconLink || "/placeholder.svg"} alt="" className="w-6 h-6" />
                      <div>
                        <p className="font-medium">{file.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(file.modifiedTime).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline" onClick={() => window.open(file.webViewLink, "_blank")}>
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="sheets" className="space-y-4">
          <Button onClick={createSpreadsheet} disabled={loading}>
            <Plus className="mr-2 h-4 w-4" />
            Nueva Hoja de Cálculo
          </Button>

          <Card>
            <CardHeader>
              <CardTitle>Hojas de Cálculo Recientes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Las hojas de cálculo aparecerán en la sección Drive</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calendar" className="space-y-4">
          <div className="grid gap-4">
            {calendarEvents.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <p className="text-muted-foreground">No hay eventos próximos</p>
                </CardContent>
              </Card>
            ) : (
              calendarEvents.map((event) => (
                <Card key={event.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{event.summary}</p>
                        <p className="text-sm text-muted-foreground">
                          {event.start?.dateTime
                            ? new Date(event.start.dateTime).toLocaleString()
                            : event.start?.date
                              ? new Date(event.start.date).toLocaleDateString()
                              : "Sin fecha"}
                        </p>
                      </div>
                      <Badge variant="secondary">
                        <Calendar className="mr-1 h-3 w-3" />
                        Evento
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="gmail" className="space-y-4">
          <div className="grid gap-4">
            {gmailMessages.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <p className="text-muted-foreground">No hay mensajes para mostrar</p>
                </CardContent>
              </Card>
            ) : (
              gmailMessages.map((message) => (
                <Card key={message.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Mensaje ID: {message.id}</p>
                        <p className="text-sm text-muted-foreground">Thread ID: {message.threadId}</p>
                      </div>
                      <Badge variant="secondary">
                        <Mail className="mr-1 h-3 w-3" />
                        Email
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
