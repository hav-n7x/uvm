import Link from "next/link"
import { Palette, Bell, Shield, Accessibility, User, GraduationCap, ChevronRight } from "lucide-react"

export default function Configuracion() {
  // Categorías de configuración
  const categorias = [
    {
      id: "tema",
      nombre: "Tema y Apariencia",
      descripcion: "Personaliza el aspecto visual de la plataforma",
      icono: <Palette className="h-6 w-6" />,
      color: "bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-300",
    },
    {
      id: "notificaciones",
      nombre: "Notificaciones",
      descripcion: "Configura cómo y cuándo recibir notificaciones",
      icono: <Bell className="h-6 w-6" />,
      color: "bg-amber-100 dark:bg-amber-900/20 text-amber-600 dark:text-amber-300",
    },
    {
      id: "privacidad",
      nombre: "Privacidad y Seguridad",
      descripcion: "Gestiona la privacidad y seguridad de tu cuenta",
      icono: <Shield className="h-6 w-6" />,
      color: "bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-300",
    },
    {
      id: "accesibilidad",
      nombre: "Accesibilidad",
      descripcion: "Ajusta la plataforma para mejorar la accesibilidad",
      icono: <Accessibility className="h-6 w-6" />,
      color: "bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-300",
    },
    {
      id: "cuenta",
      nombre: "Cuenta y Perfil",
      descripcion: "Administra tu información personal y académica",
      icono: <User className="h-6 w-6" />,
      color: "bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-300",
    },
    {
      id: "academico",
      nombre: "Preferencias Académicas",
      descripcion: "Personaliza tus preferencias de estudio",
      icono: <GraduationCap className="h-6 w-6" />,
      color: "bg-teal-100 dark:bg-teal-900/20 text-teal-600 dark:text-teal-300",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Configuración</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categorias.map((categoria) => (
          <Link
            key={categoria.id}
            href={`/configuracion/${categoria.id}`}
            className="bg-card hover:bg-accent/50 border rounded-lg p-6 transition-colors group"
          >
            <div className="flex justify-between items-start">
              <div className={`p-3 rounded-full ${categoria.color} mb-4`}>{categoria.icono}</div>
              <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
            </div>
            <h2 className="text-xl font-semibold mb-2">{categoria.nombre}</h2>
            <p className="text-muted-foreground text-sm">{categoria.descripcion}</p>
          </Link>
        ))}
      </div>

      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-4">Acciones rápidas</h2>
        <div className="bg-card border rounded-lg divide-y">
          <button className="w-full text-left px-6 py-4 hover:bg-accent/50 transition-colors flex justify-between items-center">
            <span>Cambiar contraseña</span>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </button>
          <button className="w-full text-left px-6 py-4 hover:bg-accent/50 transition-colors flex justify-between items-center">
            <span>Cerrar sesiones activas</span>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </button>
          <button className="w-full text-left px-6 py-4 hover:bg-accent/50 transition-colors flex justify-between items-center text-destructive">
            <span>Cerrar sesión</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
