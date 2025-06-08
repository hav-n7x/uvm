import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, Download, Share2 } from "lucide-react"

interface CertificacionDetalleProps {
  params: {
    id: string
  }
}

export default function CertificacionDetalle({ params }: CertificacionDetalleProps) {
  const { id } = params

  // Datos de ejemplo para certificaciones
  const certificaciones = {
    python: {
      titulo: "Certificación en Python",
      fecha: "15 de marzo de 2023",
      emisor: "UVM Campus Hispano",
      descripcion:
        "Certificación que acredita conocimientos avanzados en Python, incluyendo desarrollo web con Django y Flask, análisis de datos con Pandas y NumPy, y automatización de tareas.",
      imagen: "/certificates/python-certificate.pdf",
      creditos: 4,
    },
    iot: {
      titulo: "Certificación en Internet de las Cosas (IoT)",
      fecha: "22 de junio de 2023",
      emisor: "UVM Campus Hispano",
      descripcion:
        "Certificación que acredita conocimientos en diseño e implementación de soluciones IoT, incluyendo programación de dispositivos Arduino y Raspberry Pi, protocolos de comunicación y análisis de datos en tiempo real.",
      imagen: "/certificates/iot-certificate.pdf",
      creditos: 5,
    },
  }

  // Obtener datos del certificado o usar valores predeterminados
  const certificado = certificaciones[id as keyof typeof certificaciones] || {
    titulo: "Certificación",
    fecha: "Sin fecha",
    emisor: "UVM",
    descripcion: "Información no disponible",
    imagen: "/placeholder.svg?height=400&width=600",
    creditos: 0,
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center">
        <Link href="/" className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Volver al Dashboard
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-card rounded-lg border shadow-sm p-6">
            <h1 className="text-3xl font-bold mb-2">{certificado.titulo}</h1>
            <p className="text-muted-foreground mb-6">
              Emitido el {certificado.fecha} por {certificado.emisor}
            </p>

            <div className="aspect-[4/3] relative mb-6 bg-muted rounded-lg overflow-hidden">
              <Image
                src={certificado.imagen || "/placeholder.svg"}
                alt={certificado.titulo}
                fill
                className="object-contain"
              />
            </div>

            <div className="flex flex-wrap gap-4">
              <button className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors">
                <Download className="h-4 w-4" />
                Descargar PDF
              </button>
              <button className="flex items-center gap-2 bg-secondary text-secondary-foreground px-4 py-2 rounded-md hover:bg-secondary/80 transition-colors">
                <Share2 className="h-4 w-4" />
                Compartir
              </button>
            </div>
          </div>
        </div>

        <div>
          <div className="bg-card rounded-lg border shadow-sm p-6 sticky top-6">
            <h2 className="text-xl font-semibold mb-4">Detalles del certificado</h2>

            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Fecha de emisión</h3>
                <p>{certificado.fecha}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Emisor</h3>
                <p>{certificado.emisor}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Créditos académicos</h3>
                <p>{certificado.creditos}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Descripción</h3>
                <p className="text-sm">{certificado.descripcion}</p>
              </div>

              <div className="pt-4 border-t">
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Validez</h3>
                <div className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 text-sm p-2 rounded-md">
                  Certificado válido y verificado
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
