"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const images = [
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Imagen%20de%20WhatsApp%202025-05-01%20a%20las%2000.35.39_4ab1a266.jpg-OndXQibV7RlHrt97uL8SAECLjuNue3.jpeg",
    alt: "Territorio Lince - Instalaciones Deportivas UVM",
    title: "Territorio Lince",
    description: "Nuestras instalaciones deportivas de clase mundial",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Imagen%20de%20WhatsApp%202025-05-01%20a%20las%2000.35.38_9b75b7fb.jpg-gChGjS9piWjFrHPKitZ84wcWyZh1Vp.jpeg",
    alt: "Equipo Deportivo UVM Linces",
    title: "Linces UVM",
    description: "Orgullosos de representar a nuestra universidad",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Imagen%20de%20WhatsApp%202025-05-01%20a%20las%2000.35.38_2a398605.jpg-v24N1I723qn6czoS06pvhNTwdUaN4J.jpeg",
    alt: "Campus UVM - Entrada Principal",
    title: "Campus UVM",
    description: "Tu hogar académico en el Valle de México",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Imagen%20de%20WhatsApp%202025-05-01%20a%20las%2000.35.39_57e4e161.jpg-kKtZbNPchmwfva7DPfYJu1wC0gzLYr.jpeg",
    alt: "Graduación UVM",
    title: "Graduación",
    description: "El momento que todos esperamos",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Imagen%20de%20WhatsApp%202025-05-01%20a%20las%2000.35.38_40bc270e.jpg-d1chbiYCiOGDNAl3PcXz6cUWfmGcO7.jpeg",
    alt: "Edificio Moderno UVM",
    title: "Instalaciones Modernas",
    description: "Tecnología de vanguardia para tu educación",
  },
]

export function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  return (
    <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden bg-gray-200">
      <div className="relative w-full h-full">
        <img
          src={images[currentIndex].src || "/placeholder.svg"}
          alt={images[currentIndex].alt}
          className="w-full h-full object-cover transition-opacity duration-500"
          crossOrigin="anonymous"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="absolute bottom-4 left-4 text-white">
          <h3 className="text-xl font-bold">{images[currentIndex].title}</h3>
          <p className="text-sm text-gray-200">{images[currentIndex].description}</p>
        </div>
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white hover:bg-opacity-70"
        onClick={goToPrevious}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white hover:bg-opacity-70"
        onClick={goToNext}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>

      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? "bg-white" : "bg-white bg-opacity-50"
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  )
}
