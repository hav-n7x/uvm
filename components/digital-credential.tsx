"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Share2, CheckCircle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function DigitalCredential() {
  const [showCredential, setShowCredential] = useState(false)
  const [credentialShared, setCredentialShared] = useState(false)

  const studentInfo = {
    name: "José Antonio Ríos Rojo",
    id: "21H04156",
    career: "Ingeniería en Sistemas Computacionales",
    campus: "Campus Coyoacán",
    semester: "7° Cuatrimestre",
    modality: "Semipresencial",
    validUntil: "31 de Julio de 2025",
    photo: "/placeholder.svg?height=150&width=120",
    qrCode: "/placeholder.svg?height=120&width=120",
    uniqueId: "UVM-21H04156-2025",
  }

  const handleShare = () => {
    setTimeout(() => {
      setCredentialShared(true)
      setTimeout(() => setCredentialShared(false), 3000)
    }, 500)
  }

  return (
    <Dialog open={showCredential} onOpenChange={setShowCredential}>
      <DialogTrigger asChild>
        <Button className="bg-red-600 hover:bg-red-700 w-full">Ver Credencial Digital</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[95vw] sm:max-w-[420px] p-3 sm:p-6">
        <DialogHeader className="pb-2">
          <DialogTitle className="text-lg sm:text-xl">Credencial Digital UVM</DialogTitle>
          <DialogDescription className="text-sm">
            Credencial oficial de estudiante de la Universidad del Valle de México
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-center">
          <Card className="w-full max-w-[340px] sm:max-w-[360px] overflow-hidden border-2 border-red-600">
            {/* Header */}
            <div className="bg-gradient-to-r from-red-600 to-red-700 p-2 sm:p-3 flex justify-between items-center">
              <div className="w-12 sm:w-16">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Imagen%20de%20WhatsApp%202025-04-28%20a%20las%2022.34.52_65bb3da3.jpg-ux7xSEqS2Ix7X2nzQPsxQSz4puwtzk.jpeg"
                  alt="UVM Logo"
                  className="w-full h-auto object-contain"
                  crossOrigin="anonymous"
                />
              </div>
              <div className="text-white text-right">
                <h3 className="font-bold text-xs sm:text-sm leading-tight">UNIVERSIDAD DEL</h3>
                <h3 className="font-bold text-xs sm:text-sm leading-tight">VALLE DE MÉXICO</h3>
              </div>
            </div>

            <CardContent className="p-3 sm:p-4 bg-white">
              <div className="flex gap-2 sm:gap-3">
                {/* Photo */}
                <div className="w-20 sm:w-24 flex-shrink-0">
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Imagen%20de%20WhatsApp%202025-04-28%20a%20las%2018.59.23_300abc07.jpg-wlyfeMkXPZvzkXiKPUBwk4MqKBbuze.jpeg"
                    alt="Foto de estudiante"
                    className="w-full h-auto border border-gray-300 object-cover"
                    crossOrigin="anonymous"
                  />
                </div>

                {/* Student Info */}
                <div className="flex-1 min-w-0 space-y-1">
                  <h4 className="font-bold text-xs sm:text-sm text-red-700 leading-tight break-words">
                    {studentInfo.name}
                  </h4>
                  <p className="text-xs text-gray-700 leading-tight break-words">{studentInfo.career}</p>
                  <p className="text-xs text-gray-700 leading-tight">{studentInfo.campus}</p>

                  <div className="space-y-0.5 pt-1">
                    <div className="flex justify-between text-xs">
                      <span className="font-semibold">Matrícula:</span>
                      <span className="font-mono">{studentInfo.id}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="font-semibold">Cuatrimestre:</span>
                      <span>{studentInfo.semester}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="font-semibold">Modalidad:</span>
                      <span>{studentInfo.modality}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* QR Code and Validity */}
              <div className="mt-3 flex justify-between items-end">
                <div className="flex-1">
                  <p className="font-semibold text-xs text-gray-700">Vigencia:</p>
                  <p className="text-xs text-gray-600">{studentInfo.validUntil}</p>
                  <p className="mt-1 text-[10px] text-gray-500 font-mono break-all">{studentInfo.uniqueId}</p>
                </div>
                <div className="w-16 sm:w-20 flex-shrink-0 ml-2">
                  <img
                    src={studentInfo.qrCode || "/placeholder.svg"}
                    alt="QR Code"
                    className="w-full h-auto border border-gray-200"
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="mt-3 pt-2 border-t border-gray-200 text-center">
                <p className="text-[9px] sm:text-[10px] text-gray-500 leading-tight">
                  Esta credencial es personal e intransferible. Para validar escanea el código QR.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-4">
          <Button variant="outline" size="sm" onClick={() => {}} className="flex-1">
            <Download className="h-4 w-4 mr-2" />
            Descargar
          </Button>
          <Button variant="outline" size="sm" onClick={handleShare} className="flex-1">
            {credentialShared ? (
              <>
                <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                Compartido
              </>
            ) : (
              <>
                <Share2 className="h-4 w-4 mr-2" />
                Compartir
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
