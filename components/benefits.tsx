"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Gift, Link, Filter, TrendingUp } from "lucide-react"
import { useState } from "react"
import Image from "next/image"

const benefitsData = [
  {
    id: 1,
    name: "Discord Nitro",
    description: "Acceso a funciones premium en Discord",
    category: "Software",
    url: "https://discord.com/nitro",
    icon: "/logos/discord-logo.jpeg",
    discount: "Gratis",
    savings: 50,
  },
  {
    id: 2,
    name: "Spotify Premium",
    description: "Música sin anuncios y offline",
    category: "Entretenimiento",
    url: "https://www.spotify.com/premium/",
    icon: "/logos/spotify-logo.jpeg",
    discount: "50% de descuento",
    savings: 69,
  },
  {
    id: 3,
    name: "Sam's Club Membership",
    description: "Membresía con descuentos exclusivos",
    category: "Compras",
    url: "https://www.sams.com.mx/",
    icon: "/logos/samsclub-logo.jpeg",
    discount: "25% de descuento",
    savings: 150,
  },
  {
    id: 4,
    name: "Visual Studio Code",
    description: "Editor de código profesional",
    category: "Software",
    url: "https://code.visualstudio.com/",
    icon: "/logos/vscode-logo.jpeg",
    discount: "Gratis",
    savings: 400,
  },
  {
    id: 5,
    name: "Canva Pro",
    description: "Herramientas de diseño gráfico",
    category: "Diseño",
    url: "https://www.canva.com/",
    icon: "/logos/canva-logo.jpeg",
    discount: "Gratis",
    savings: 129,
  },
  {
    id: 6,
    name: "Coursera Plus",
    description: "Acceso ilimitado a cursos",
    category: "Educación",
    url: "https://www.coursera.org/",
    icon: "/logos/coursera-logo.jpeg",
    discount: "30% de descuento",
    savings: 1000,
  },
  {
    id: 7,
    name: "Microsoft Office 365",
    description: "Herramientas de productividad",
    category: "Software",
    url: "https://www.microsoft.com/microsoft-365",
    icon: "/logos/microsoft365-logo.jpeg",
    discount: "Gratis",
    savings: 200,
  },
  {
    id: 8,
    name: "Amazon Prime Student",
    description: "Envío gratis y streaming",
    category: "Compras",
    url: "https://www.amazon.com/amazonprime",
    icon: "/logos/amazon-logo.jpeg",
    discount: "50% de descuento",
    savings: 500,
  },
  {
    id: 9,
    name: "LinkedIn Learning",
    description: "Cursos de desarrollo profesional",
    category: "Educación",
    url: "https://www.linkedin.com/learning/",
    icon: "/logos/linkedin-logo.jpeg",
    discount: "Gratis",
    savings: 300,
  },
]

export function Benefits() {
  const [filter, setFilter] = useState("all")

  const filteredBenefits =
    filter === "all" ? benefitsData : benefitsData.filter((benefit) => benefit.category === filter)

  const totalSavings = benefitsData.reduce((acc, benefit) => acc + benefit.savings, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-6 rounded-lg">
        <h1 className="text-3xl font-bold mb-2">Beneficios Estudiantiles</h1>
        <p className="text-red-100">Aprovecha al máximo tus beneficios como estudiante UVM</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-l-4 border-l-green-600">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Beneficios Activos</CardTitle>
            <Gift className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-800">{benefitsData.length}</div>
            <p className="text-xs text-gray-600">Servicios disponibles</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-600">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ahorro Estimado</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-800">${totalSavings}</div>
            <p className="text-xs text-gray-600">Anual</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-600">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Categorías</CardTitle>
            <Filter className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-800">5</div>
            <p className="text-xs text-gray-600">Diferentes categorías</p>
          </CardContent>
        </Card>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2">
        <Button variant={filter === "all" ? "default" : "outline"} onClick={() => setFilter("all")}>
          Todos
        </Button>
        <Button variant={filter === "Software" ? "default" : "outline"} onClick={() => setFilter("Software")}>
          Software
        </Button>
        <Button
          variant={filter === "Entretenimiento" ? "default" : "outline"}
          onClick={() => setFilter("Entretenimiento")}
        >
          Entretenimiento
        </Button>
        <Button variant={filter === "Compras" ? "default" : "outline"} onClick={() => setFilter("Compras")}>
          Compras
        </Button>
        <Button variant={filter === "Diseño" ? "default" : "outline"} onClick={() => setFilter("Diseño")}>
          Diseño
        </Button>
        <Button variant={filter === "Educación" ? "default" : "outline"} onClick={() => setFilter("Educación")}>
          Educación
        </Button>
      </div>

      {/* Benefits List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredBenefits.map((benefit) => (
          <Card key={benefit.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-white p-1 shadow-sm border">
                    <Image
                      src={benefit.icon || "/placeholder.svg"}
                      alt={`${benefit.name} logo`}
                      fill
                      className="object-contain"
                      sizes="48px"
                    />
                  </div>
                  <div>
                    <CardTitle className="text-lg text-red-700">{benefit.name}</CardTitle>
                    <CardDescription className="font-medium text-gray-600 text-sm">
                      {benefit.description}
                    </CardDescription>
                  </div>
                </div>
                <Badge className="bg-blue-100 text-blue-800 text-xs">{benefit.category}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Gift className="h-4 w-4" />
                <span className="font-medium">{benefit.discount}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <TrendingUp className="h-4 w-4" />
                <span>
                  Ahorro estimado: <span className="font-bold text-green-600">${benefit.savings}</span> anual
                </span>
              </div>
              <Button
                variant="outline"
                className="w-full hover:bg-red-50 hover:border-red-200 transition-colors"
                onClick={() => window.open(benefit.url, "_blank")}
              >
                <Link className="h-4 w-4 mr-2" />
                Acceder al Beneficio
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Footer Info */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-3">
            <Gift className="h-6 w-6 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-800">¿Cómo acceder a tus beneficios?</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                1
              </div>
              <span>Verifica tu estatus de estudiante UVM</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                2
              </div>
              <span>Haz clic en "Acceder al Beneficio"</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                3
              </div>
              <span>Usa tu email institucional @uvm.edu.mx</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
