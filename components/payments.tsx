"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import {
  CreditCard,
  Calendar,
  CheckCircle,
  Clock,
  DollarSign,
  Download,
  Receipt,
  Smartphone,
  Building2,
  Wallet,
  AlertCircle,
} from "lucide-react"

const payments = [
  {
    id: 1,
    month: "Abril 2025",
    amount: 3152,
    originalAmount: 9006,
    discount: 65,
    dueDate: "2025-04-05",
    paidDate: "2025-04-03",
    status: "paid",
    paymentMethod: "Tarjeta de Crédito",
    reference: "UVM-PAG-2025040301",
    concept: "Colegiatura Abril 2025 - Ing. Sistemas Computacionales",
    cardInfo: "BBVA **** 5678",
    receiptUrl: "/receipts/abril-2025.pdf",
    details: {
      campus: "UVM Campus Coyoacán",
      period: "Cuatrimestre Ene-Abr 2025",
      studentId: "21H04156",
      paymentTime: "15:23:45",
      authCode: "A45B78C12",
    },
  },
  {
    id: 2,
    month: "Mayo 2025",
    amount: 3152,
    originalAmount: 9006,
    discount: 65,
    dueDate: "2025-05-05",
    paidDate: "2025-05-02",
    status: "paid",
    paymentMethod: "Transferencia Bancaria",
    reference: "UVM-PAG-2025050201",
    concept: "Colegiatura Mayo 2025 - Ing. Sistemas Computacionales",
    bankInfo: "SPEI - Santander",
    receiptUrl: "/receipts/mayo-2025.pdf",
    details: {
      campus: "UVM Campus Coyoacán",
      period: "Cuatrimestre May-Ago 2025",
      studentId: "21H04156",
      paymentTime: "10:15:22",
      authCode: "SPEI202505021015",
    },
  },
  {
    id: 3,
    month: "Junio 2025",
    amount: 3152,
    originalAmount: 9006,
    discount: 65,
    dueDate: "2025-06-05",
    paidDate: "2025-06-01",
    status: "paid",
    paymentMethod: "OXXO Pay",
    reference: "UVM-PAG-2025060101",
    concept: "Colegiatura Junio 2025 - Ing. Sistemas Computacionales",
    storeInfo: "OXXO Sucursal #4582",
    receiptUrl: "/receipts/junio-2025.pdf",
    details: {
      campus: "UVM Campus Coyoacán",
      period: "Cuatrimestre May-Ago 2025",
      studentId: "21H04156",
      paymentTime: "18:45:03",
      authCode: "OXX25060118450",
    },
  },
  {
    id: 4,
    month: "Julio 2025",
    amount: 3152,
    originalAmount: 9006,
    discount: 65,
    dueDate: "2025-07-05",
    paidDate: null,
    status: "pending",
    paymentMethod: null,
    reference: "UVM-PAG-2025070001",
    concept: "Colegiatura Julio 2025 - Ing. Sistemas Computacionales",
    details: {
      campus: "UVM Campus Coyoacán",
      period: "Cuatrimestre May-Ago 2025",
      studentId: "21H04156",
    },
  },
  {
    id: 5,
    month: "Agosto 2025",
    amount: 3152,
    originalAmount: 9006,
    discount: 65,
    dueDate: "2025-08-05",
    paidDate: null,
    status: "future",
    paymentMethod: null,
    reference: "UVM-PAG-2025080001",
    concept: "Colegiatura Agosto 2025 - Ing. Sistemas Computacionales",
    details: {
      campus: "UVM Campus Coyoacán",
      period: "Cuatrimestre May-Ago 2025",
      studentId: "21H04156",
    },
  },
]

const paymentMethods = [
  {
    id: "credit-card",
    name: "Tarjeta de Crédito/Débito",
    icon: CreditCard,
    logoUrl:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/858c476a-ebf5-4909-9e1d-09c6e21bdbed-8eEAFws5HzkQPKi20ZnUeWdcR2JgIT.jpeg", // Visa/Mastercard
    description: "Visa, MasterCard, American Express",
    fee: "3.5%",
    processing: "Inmediato",
    acceptedCards: ["Visa", "MasterCard", "American Express", "Carnet"],
    securityInfo: "Transacciones seguras con 3D Secure y cifrado SSL",
    recommended: true,
  },
  {
    id: "bank-transfer",
    name: "Transferencia Bancaria",
    icon: Building2,
    logoUrl: null, // No logo específico para transferencia bancaria
    description: "SPEI, transferencia interbancaria",
    fee: "Gratis",
    processing: "1-2 días hábiles",
    banks: ["BBVA", "Santander", "Banorte", "HSBC", "Scotiabank"],
    accountInfo: {
      name: "Universidad del Valle de México",
      account: "0123456789",
      clabe: "012345678901234567",
    },
  },
  {
    id: "oxxo",
    name: "OXXO Pay",
    icon: Smartphone,
    logoUrl:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5931fee1-7f44-4a1a-ae7b-0a256162ff2e-VNlfnXrQyfQ9kc7xS2IcWYV5VPSUhf.jpeg", // OXXO
    description: "Pago en tiendas OXXO",
    fee: "$12 MXN",
    processing: "1-3 días hábiles",
    expirationTime: "72 horas",
    storeLocations: "Más de 19,000 tiendas en México",
  },
  {
    id: "paypal",
    name: "PayPal",
    icon: Wallet,
    logoUrl:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/New%20logo%20PayPal%20%20PayPal%20%2B%20FuseProject%20%28LA%29-bXMz5djDkWmfZEeioukYoktzdFsbI7.jpeg", // PayPal
    description: "Cuenta PayPal o tarjeta",
    fee: "4.0%",
    processing: "Inmediato",
    protection: "Protección al comprador incluida",
    currencies: ["MXN", "USD"],
  },
  {
    id: "mercado-pago",
    name: "Mercado Pago",
    icon: DollarSign,
    logoUrl:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/e9b87302-39d8-4f00-97be-9cd1a6d7507a-zhIlnOtgMkwDMOdXrNsS3O8847uubv.jpeg", // Mercado Pago
    description: "App o tarjeta Mercado Pago",
    fee: "3.0%",
    processing: "Inmediato",
    installments: "Hasta 12 meses sin intereses",
    qrPayment: true,
  },
]

export function Payments() {
  const [selectedPayment, setSelectedPayment] = useState<(typeof payments)[0] | null>(null)
  const [selectedMethod, setSelectedMethod] = useState<string>("")
  const [cardData, setCardData] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">Pagado</Badge>
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">Pendiente</Badge>
        )
      case "overdue":
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">Vencido</Badge>
      case "future":
        return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">Próximo</Badge>
      default:
        return <Badge>Desconocido</Badge>
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const showReceipt = (payment: (typeof payments)[0]) => {
    setSelectedPayment(payment)
  }

  const totalPaid = payments.filter((p) => p.status === "paid").reduce((sum, p) => sum + p.amount, 0)
  const totalPending = payments.filter((p) => p.status === "pending").reduce((sum, p) => sum + p.amount, 0)
  const totalFuture = payments.filter((p) => p.status === "future").reduce((sum, p) => sum + p.amount, 0)
  const totalSavings = payments.reduce((sum, p) => sum + (p.originalAmount - p.amount), 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-6 rounded-lg">
        <h1 className="text-3xl font-bold mb-2">Pagos y Colegiaturas</h1>
        <p className="text-red-100">Gestiona tus pagos académicos y consulta tu historial</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-green-600">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pagado</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-800 dark:text-gray-200">{formatCurrency(totalPaid)}</div>
            <p className="text-xs text-gray-600 dark:text-gray-400">3 pagos realizados</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-yellow-600">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pendiente</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-800 dark:text-gray-200">{formatCurrency(totalPending)}</div>
            <p className="text-xs text-gray-600 dark:text-gray-400">Próximo vencimiento: 5 Jul</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-600">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Próximos Pagos</CardTitle>
            <Calendar className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-800 dark:text-gray-200">{formatCurrency(totalFuture)}</div>
            <p className="text-xs text-gray-600 dark:text-gray-400">1 pago programado</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-600">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ahorro Total</CardTitle>
            <Receipt className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-800 dark:text-gray-200">{formatCurrency(totalSavings)}</div>
            <p className="text-xs text-gray-600 dark:text-gray-400">Con beca del 65%</p>
          </CardContent>
        </Card>
      </div>

      {/* Scholarship Info */}
      <Card className="border-l-4 border-l-blue-600">
        <CardHeader>
          <CardTitle className="text-blue-700 dark:text-blue-400 flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Información de Beca Académica
          </CardTitle>
          <CardDescription>Detalles de tu beca de excelencia académica</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h4 className="font-semibold text-gray-800 dark:text-gray-200">Tipo de Beca</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Excelencia Académica</p>
              <p className="text-lg font-bold text-blue-600">65% de descuento</p>
            </div>
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <h4 className="font-semibold text-gray-800 dark:text-gray-200">Colegiatura Original</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 line-through">
                {formatCurrency(payments[0].originalAmount)}
              </p>
              <p className="text-lg font-bold text-green-600">{formatCurrency(payments[0].amount)}</p>
            </div>
            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <h4 className="font-semibold text-gray-800 dark:text-gray-200">Ahorro Mensual</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Por mantener promedio</p>
              <p className="text-lg font-bold text-purple-600">
                {formatCurrency(payments[0].originalAmount - payments[0].amount)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payments History */}
      <Card>
        <CardHeader>
          <CardTitle className="text-red-700 dark:text-red-400">Historial de Pagos</CardTitle>
          <CardDescription>Consulta tus pagos realizados y pendientes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {payments.map((payment) => (
              <Card
                key={payment.id}
                className={`hover:shadow-lg transition-shadow ${payment.status === "future" ? "opacity-70" : ""}`}
              >
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{payment.month}</h3>
                        {getStatusBadge(payment.status)}
                      </div>
                      <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4" />
                          <span className="font-medium">{formatCurrency(payment.amount)}</span>
                          <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 px-2 py-1 rounded">
                            65% descuento
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>Vencimiento: {formatDate(payment.dueDate)}</span>
                        </div>
                        {payment.paidDate && (
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span>Pagado: {formatDate(payment.paidDate)}</span>
                          </div>
                        )}
                        {payment.paymentMethod && (
                          <div className="flex items-center gap-2">
                            <CreditCard className="h-4 w-4" />
                            <span>{payment.paymentMethod}</span>
                            {payment.cardInfo && (
                              <span className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                                {payment.cardInfo}
                              </span>
                            )}
                            {payment.bankInfo && (
                              <span className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                                {payment.bankInfo}
                              </span>
                            )}
                            {payment.storeInfo && (
                              <span className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                                {payment.storeInfo}
                              </span>
                            )}
                          </div>
                        )}
                        <div className="flex items-center gap-2">
                          <Receipt className="h-4 w-4" />
                          <span>{payment.reference}</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {payment.status === "paid" ? (
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" onClick={() => showReceipt(payment)}>
                              <Download className="h-4 w-4 mr-2" />
                              Recibo
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[500px]">
                            <DialogHeader>
                              <DialogTitle>Recibo de Pago - {payment.month}</DialogTitle>
                              <DialogDescription>Comprobante de pago de colegiatura</DialogDescription>
                            </DialogHeader>
                            <div className="space-y-6">
                              <div className="flex justify-center">
                                <div className="w-full max-w-md p-6 border rounded-lg bg-white dark:bg-gray-900">
                                  <div className="flex justify-between items-center mb-4">
                                    <div className="w-24">
                                      <img
                                        src="/placeholder.svg?height=50&width=100"
                                        alt="UVM Logo"
                                        className="w-full"
                                      />
                                    </div>
                                    <div className="text-right">
                                      <h3 className="font-bold text-red-600">RECIBO DE PAGO</h3>
                                      <p className="text-xs text-gray-600 dark:text-gray-400">
                                        Folio: {payment.reference}
                                      </p>
                                    </div>
                                  </div>

                                  <div className="border-t border-b py-4 my-4">
                                    <h4 className="font-semibold mb-2">Detalles del Pago</h4>
                                    <div className="grid grid-cols-2 gap-2 text-sm">
                                      <div className="text-gray-600 dark:text-gray-400">Estudiante:</div>
                                      <div>José Antonio Ríos Rojo</div>
                                      <div className="text-gray-600 dark:text-gray-400">Matrícula:</div>
                                      <div>{payment.details.studentId}</div>
                                      <div className="text-gray-600 dark:text-gray-400">Campus:</div>
                                      <div>{payment.details.campus}</div>
                                      <div className="text-gray-600 dark:text-gray-400">Periodo:</div>
                                      <div>{payment.details.period}</div>
                                      <div className="text-gray-600 dark:text-gray-400">Concepto:</div>
                                      <div>{payment.concept}</div>
                                      <div className="text-gray-600 dark:text-gray-400">Fecha de pago:</div>
                                      <div>{formatDate(payment.paidDate!)}</div>
                                      {payment.details.paymentTime && (
                                        <>
                                          <div className="text-gray-600 dark:text-gray-400">Hora:</div>
                                          <div>{payment.details.paymentTime}</div>
                                        </>
                                      )}
                                      <div className="text-gray-600 dark:text-gray-400">Método de pago:</div>
                                      <div>{payment.paymentMethod}</div>
                                      {payment.details.authCode && (
                                        <>
                                          <div className="text-gray-600 dark:text-gray-400">Autorización:</div>
                                          <div>{payment.details.authCode}</div>
                                        </>
                                      )}
                                    </div>
                                  </div>

                                  <div className="border-b pb-4 mb-4">
                                    <h4 className="font-semibold mb-2">Desglose</h4>
                                    <div className="space-y-2 text-sm">
                                      <div className="flex justify-between">
                                        <span>Colegiatura original:</span>
                                        <span>{formatCurrency(payment.originalAmount)}</span>
                                      </div>
                                      <div className="flex justify-between text-blue-600">
                                        <span>Descuento (65%):</span>
                                        <span>-{formatCurrency(payment.originalAmount - payment.amount)}</span>
                                      </div>
                                      <div className="flex justify-between font-semibold">
                                        <span>Total pagado:</span>
                                        <span>{formatCurrency(payment.amount)}</span>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="text-center text-xs text-gray-600 dark:text-gray-400">
                                    <p>Este documento es un comprobante oficial de pago.</p>
                                    <p>Para cualquier aclaración, favor de comunicarse a finanzas@uvm.edu.mx</p>
                                  </div>
                                </div>
                              </div>

                              <div className="flex justify-between">
                                <Button variant="outline" size="sm">
                                  <Download className="h-4 w-4 mr-2" />
                                  Descargar PDF
                                </Button>
                                <Button variant="outline" size="sm">
                                  <span className="mr-2">📧</span>
                                  Enviar por Email
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      ) : payment.status === "pending" ? (
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button className="bg-red-600 hover:bg-red-700" size="sm">
                              <CreditCard className="h-4 w-4 mr-2" />
                              Pagar Ahora
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[600px]">
                            <DialogHeader>
                              <DialogTitle>Pagar Colegiatura - {payment.month}</DialogTitle>
                              <DialogDescription>Selecciona tu método de pago preferido</DialogDescription>
                            </DialogHeader>
                            <div className="space-y-6">
                              {/* Payment Summary */}
                              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                                  Resumen del Pago
                                </h4>
                                <div className="space-y-2 text-sm">
                                  <div className="flex justify-between">
                                    <span>Colegiatura original:</span>
                                    <span className="line-through">{formatCurrency(payment.originalAmount)}</span>
                                  </div>
                                  <div className="flex justify-between text-blue-600">
                                    <span>Descuento (65%):</span>
                                    <span>-{formatCurrency(payment.originalAmount - payment.amount)}</span>
                                  </div>
                                  <Separator />
                                  <div className="flex justify-between font-semibold text-lg">
                                    <span>Total a pagar:</span>
                                    <span>{formatCurrency(payment.amount)}</span>
                                  </div>
                                  <div className="text-xs text-gray-500">
                                    Fecha límite de pago: {formatDate(payment.dueDate)}
                                  </div>
                                </div>
                              </div>

                              {/* Payment Methods */}
                              <div className="space-y-3">
                                <h4 className="font-semibold text-gray-800 dark:text-gray-200">
                                  Métodos de Pago Disponibles
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                  {paymentMethods.map((method) => {
                                    const MethodIcon = method.icon
                                    return (
                                      <div
                                        key={method.id}
                                        className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                                          selectedMethod === method.id
                                            ? "border-red-500 bg-red-50 dark:bg-red-900/20"
                                            : "border-gray-200 dark:border-gray-700 hover:border-gray-300"
                                        } ${method.recommended ? "ring-2 ring-red-500 ring-opacity-50" : ""}`}
                                        onClick={() => setSelectedMethod(method.id)}
                                      >
                                        <div className="flex items-center gap-3">
                                          {method.logoUrl ? (
                                            <div className="w-12 h-12 flex-shrink-0 bg-white rounded-md p-1 shadow-sm flex items-center justify-center border">
                                              <img
                                                src={method.logoUrl || "/placeholder.svg"}
                                                alt={`${method.name} logo`}
                                                className="max-w-full max-h-full object-contain"
                                                onError={(e) => {
                                                  // Fallback al icono si la imagen no carga
                                                  e.currentTarget.style.display = "none"
                                                  const fallback = e.currentTarget.nextElementSibling as HTMLElement
                                                  if (fallback) fallback.style.display = "flex"
                                                }}
                                              />
                                              <div
                                                className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-md items-center justify-center"
                                                style={{ display: "none" }}
                                              >
                                                <MethodIcon className="h-6 w-6 text-red-600" />
                                              </div>
                                            </div>
                                          ) : (
                                            <div className="w-12 h-12 flex-shrink-0 bg-red-100 dark:bg-red-900/30 rounded-md flex items-center justify-center">
                                              <MethodIcon className="h-6 w-6 text-red-600" />
                                            </div>
                                          )}
                                          <div className="flex-1">
                                            <div className="flex items-center">
                                              <h5 className="font-medium text-gray-800 dark:text-gray-200">
                                                {method.name}
                                              </h5>
                                              {method.recommended && (
                                                <span className="ml-2 text-xs bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300 px-2 py-0.5 rounded">
                                                  Recomendado
                                                </span>
                                              )}
                                            </div>
                                            <p className="text-xs text-gray-600 dark:text-gray-400">
                                              {method.description}
                                            </p>
                                            <div className="flex justify-between text-xs text-gray-500 mt-1">
                                              <span>Comisión: {method.fee}</span>
                                              <span>{method.processing}</span>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    )
                                  })}
                                </div>
                              </div>

                              {/* Payment Form */}
                              {selectedMethod === "credit-card" && (
                                <div className="space-y-4">
                                  <h4 className="font-semibold text-gray-800 dark:text-gray-200">
                                    Información de la Tarjeta
                                  </h4>
                                  <div className="grid grid-cols-1 gap-4">
                                    <div>
                                      <Label htmlFor="card-number">Número de Tarjeta</Label>
                                      <Input
                                        id="card-number"
                                        placeholder="1234 5678 9012 3456"
                                        value={cardData.number}
                                        onChange={(e) => setCardData({ ...cardData, number: e.target.value })}
                                      />
                                    </div>
                                    <div>
                                      <Label htmlFor="card-name">Nombre del Titular</Label>
                                      <Input
                                        id="card-name"
                                        placeholder="José Antonio Ríos Rojo"
                                        value={cardData.name}
                                        onChange={(e) => setCardData({ ...cardData, name: e.target.value })}
                                      />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <Label htmlFor="card-expiry">Fecha de Vencimiento</Label>
                                        <Input
                                          id="card-expiry"
                                          placeholder="MM/AA"
                                          value={cardData.expiry}
                                          onChange={(e) => setCardData({ ...cardData, expiry: e.target.value })}
                                        />
                                      </div>
                                      <div>
                                        <Label htmlFor="card-cvv">CVV</Label>
                                        <Input
                                          id="card-cvv"
                                          placeholder="123"
                                          value={cardData.cvv}
                                          onChange={(e) => setCardData({ ...cardData, cvv: e.target.value })}
                                        />
                                      </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <input type="checkbox" id="save-card" className="rounded text-red-600" />
                                      <Label htmlFor="save-card" className="text-sm">
                                        Guardar tarjeta para futuros pagos
                                      </Label>
                                    </div>
                                  </div>
                                </div>
                              )}

                              {selectedMethod === "bank-transfer" && (
                                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                  <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                                    Datos para Transferencia
                                  </h4>
                                  <div className="space-y-2 text-sm">
                                    <div>
                                      <strong>Banco:</strong> BBVA México
                                    </div>
                                    <div>
                                      <strong>Cuenta:</strong> 0123456789
                                    </div>
                                    <div>
                                      <strong>CLABE:</strong> 012345678901234567
                                    </div>
                                    <div>
                                      <strong>Beneficiario:</strong> Universidad del Valle de México
                                    </div>
                                    <div>
                                      <strong>Referencia:</strong> {payment.reference}
                                    </div>
                                    <div className="mt-4 p-2 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded text-xs">
                                      <strong className="text-yellow-800 dark:text-yellow-300">Importante:</strong> Para
                                      que tu pago sea aplicado correctamente, es indispensable que incluyas la
                                      referencia exacta en tu transferencia.
                                    </div>
                                  </div>
                                </div>
                              )}

                              {selectedMethod === "oxxo" && (
                                <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                                  <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Pago en OXXO</h4>
                                  <div className="space-y-4 text-sm">
                                    <div className="flex items-center gap-2">
                                      <AlertCircle className="h-4 w-4 text-orange-600" />
                                      <span>Se generará un código de barras para pagar en cualquier OXXO</span>
                                    </div>
                                    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg flex flex-col items-center">
                                      <div className="w-full h-16 bg-gray-200 dark:bg-gray-700 mb-2 flex items-center justify-center">
                                        <span className="text-xs text-gray-500">Código de barras</span>
                                      </div>
                                      <div className="text-center">
                                        <p className="font-mono text-lg">9876 5432 1098 7654</p>
                                        <p className="text-xs text-gray-500">
                                          Válido hasta:{" "}
                                          {new Date(
                                            new Date(payment.dueDate).getTime() + 3 * 24 * 60 * 60 * 1000,
                                          ).toLocaleDateString()}
                                        </p>
                                      </div>
                                    </div>
                                    <div>
                                      <strong>Comisión:</strong> $12.00 MXN
                                    </div>
                                    <div>
                                      <strong>Total a pagar:</strong> {formatCurrency(payment.amount + 12)}
                                    </div>
                                    <div className="text-xs">
                                      <p>Instrucciones:</p>
                                      <ol className="list-decimal pl-4 space-y-1">
                                        <li>Acude a la tienda OXXO más cercana</li>
                                        <li>Indica en caja que quieres realizar un pago de servicio OXXOPay</li>
                                        <li>Entrega al cajero el código de barras y el monto a pagar</li>
                                        <li>Conserva tu recibo como comprobante de pago</li>
                                      </ol>
                                    </div>
                                  </div>
                                </div>
                              )}

                              {selectedMethod === "paypal" && (
                                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                  <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                                    Pago con PayPal
                                  </h4>
                                  <div className="space-y-2 text-sm">
                                    <div>Serás redirigido a PayPal para completar el pago</div>
                                    <div>
                                      <strong>Comisión:</strong> 4.0% ({formatCurrency(payment.amount * 0.04)})
                                    </div>
                                    <div>
                                      <strong>Total a pagar:</strong> {formatCurrency(payment.amount * 1.04)}
                                    </div>
                                    <div className="flex justify-center my-4">
                                      <img
                                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/New%20logo%20PayPal%20%20PayPal%20%2B%20FuseProject%20%28LA%29-bXMz5djDkWmfZEeioukYoktzdFsbI7.jpeg"
                                        alt="PayPal Logo"
                                        className="h-10 object-contain"
                                      />
                                    </div>
                                  </div>
                                </div>
                              )}

                              {selectedMethod === "mercado-pago" && (
                                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                  <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                                    Pago con Mercado Pago
                                  </h4>
                                  <div className="space-y-2 text-sm">
                                    <div>Puedes pagar con tu saldo o tarjeta en Mercado Pago</div>
                                    <div>
                                      <strong>Comisión:</strong> 3.0% ({formatCurrency(payment.amount * 0.03)})
                                    </div>
                                    <div>
                                      <strong>Total a pagar:</strong> {formatCurrency(payment.amount * 1.03)}
                                    </div>
                                    <div className="flex justify-center my-4">
                                      <img
                                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/e9b87302-39d8-4f00-97be-9cd1a6d7507a-zhIlnOtgMkwDMOdXrNsS3O8847uubv.jpeg"
                                        alt="Mercado Pago Logo"
                                        className="h-10 object-contain"
                                      />
                                    </div>
                                    <div className="bg-green-50 dark:bg-green-900/20 p-2 rounded text-xs">
                                      <strong className="text-green-800 dark:text-green-300">Beneficio:</strong> Paga
                                      hasta en 12 meses sin intereses con tarjetas participantes
                                    </div>
                                  </div>
                                </div>
                              )}

                              {/* Action Buttons */}
                              <div className="flex gap-3">
                                <Button className="flex-1 bg-red-600 hover:bg-red-700" disabled={!selectedMethod}>
                                  <CreditCard className="h-4 w-4 mr-2" />
                                  Proceder al Pago
                                </Button>
                                <Button variant="outline" className="flex-1">
                                  Cancelar
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      ) : (
                        <Button variant="outline" size="sm" disabled>
                          <Calendar className="h-4 w-4 mr-2" />
                          Próximamente
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Payment Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="text-red-700 dark:text-red-400">Información Importante</CardTitle>
          <CardDescription>Consejos y políticas de pago</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                  <span className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300 p-1 rounded">💡</span>
                  Consejos de Pago:
                </h4>
                <ul className="mt-2 text-sm text-gray-600 dark:text-gray-400 space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    <span>Paga antes del día 5 de cada mes para evitar recargos del 10%</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    <span>La transferencia bancaria no tiene comisiones adicionales</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    <span>Guarda tus comprobantes de pago por al menos 6 meses</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    <span>Tu beca se mantiene con promedio ≥ 8.5 y sin materias reprobadas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    <span>Configura recordatorios de pago para evitar cargos por mora</span>
                  </li>
                </ul>
              </div>

              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Calendario de Pagos 2025</h4>
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div className="text-center p-2 bg-green-100 dark:bg-green-900/30 rounded">
                    <div className="font-semibold">Abril</div>
                    <div className="text-xs">Vence: 5</div>
                    <div className="text-xs text-green-700 dark:text-green-400">Pagado ✓</div>
                  </div>
                  <div className="text-center p-2 bg-green-100 dark:bg-green-900/30 rounded">
                    <div className="font-semibold">Mayo</div>
                    <div className="text-xs">Vence: 5</div>
                    <div className="text-xs text-green-700 dark:text-green-400">Pagado ✓</div>
                  </div>
                  <div className="text-center p-2 bg-green-100 dark:bg-green-900/30 rounded">
                    <div className="font-semibold">Junio</div>
                    <div className="text-xs">Vence: 5</div>
                    <div className="text-xs text-green-700 dark:text-green-400">Pagado ✓</div>
                  </div>
                  <div className="text-center p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded">
                    <div className="font-semibold">Julio</div>
                    <div className="text-xs">Vence: 5</div>
                    <div className="text-xs text-yellow-700 dark:text-yellow-400">Pendiente</div>
                  </div>
                  <div className="text-center p-2 bg-blue-100 dark:bg-blue-900/30 rounded">
                    <div className="font-semibold">Agosto</div>
                    <div className="text-xs">Vence: 5</div>
                    <div className="text-xs">Próximo</div>
                  </div>
                  <div className="text-center p-2 bg-gray-100 dark:bg-gray-800 rounded opacity-50">
                    <div className="font-semibold">Septiembre</div>
                    <div className="text-xs">Vence: 5</div>
                    <div className="text-xs">Futuro</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                  <span className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300 p-1 rounded">📋</span>
                  Políticas:
                </h4>
                <ul className="mt-2 text-sm text-gray-600 dark:text-gray-400 space-y-2">
                  <li className="flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 text-red-600 mt-0.5" />
                    <span>Pagos después del día 5: recargo del 10% sobre el monto total</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 text-red-600 mt-0.5" />
                    <span>Reembolsos procesados en 5-10 días hábiles con solicitud previa</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 text-red-600 mt-0.5" />
                    <span>Bloqueo de acceso al sistema con 2 mensualidades vencidas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 text-red-600 mt-0.5" />
                    <span>La beca se cancela con promedio inferior a 8.5 o materias reprobadas</span>
                  </li>
                </ul>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                  Contacto Departamento de Finanzas
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-red-600">📧</span>
                    <span>
                      Email:{" "}
                      <a href="mailto:finanzas@uvm.edu.mx" className="text-red-600 hover:underline">
                        finanzas@uvm.edu.mx
                      </a>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-red-600">📞</span>
                    <span>Teléfono: (55) 5628-8800 ext. 12345</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-red-600">🕒</span>
                    <span>Horario de atención: Lunes a Viernes 8:00-18:00</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-red-600">📍</span>
                    <span>Ubicación: Edificio A, Planta Baja, Ventanilla 3</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <h4 className="font-semibold text-red-800 dark:text-red-300 mb-2">Planes de Financiamiento</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  ¿Necesitas flexibilidad en tus pagos? Consulta nuestros planes de financiamiento personalizados.
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Solicitar Plan de Pagos
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Financial History */}
      <Card>
        <CardHeader>
          <CardTitle className="text-red-700 dark:text-red-400">Historial Financiero</CardTitle>
          <CardDescription>Resumen de tu actividad financiera en UVM</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">Resumen Anual 2025</h4>
              <div className="relative w-full h-64">
                <div className="absolute inset-0 flex items-end justify-around">
                  <div className="w-1/12 bg-red-600 h-[30%] rounded-t-md"></div>
                  <div className="w-1/12 bg-red-600 h-[40%] rounded-t-md"></div>
                  <div className="w-1/12 bg-red-600 h-[35%] rounded-t-md"></div>
                  <div className="w-1/12 bg-red-600 h-[45%] rounded-t-md"></div>
                  <div className="w-1/12 bg-red-600 h-[38%] rounded-t-md"></div>
                  <div className="w-1/12 bg-red-600 h-[42%] rounded-t-md"></div>
                  <div className="w-1/12 bg-red-600 h-[40%] rounded-t-md opacity-50"></div>
                  <div className="w-1/12 bg-red-600 h-[35%] rounded-t-md opacity-30"></div>
                  <div className="w-1/12 bg-gray-300 dark:bg-gray-700 h-[40%] rounded-t-md opacity-30"></div>
                  <div className="w-1/12 bg-gray-300 dark:bg-gray-700 h-[38%] rounded-t-md opacity-30"></div>
                  <div className="w-1/12 bg-gray-300 dark:bg-gray-700 h-[42%] rounded-t-md opacity-30"></div>
                  <div className="w-1/12 bg-gray-300 dark:bg-gray-700 h-[36%] rounded-t-md opacity-30"></div>
                </div>
                <div className="absolute bottom-0 w-full border-t border-gray-300 dark:border-gray-600"></div>
                <div className="absolute bottom-0 w-full flex justify-around text-xs text-gray-500 pt-2">
                  <div>Ene</div>
                  <div>Feb</div>
                  <div>Mar</div>
                  <div>Abr</div>
                  <div>May</div>
                  <div>Jun</div>
                  <div>Jul</div>
                  <div>Ago</div>
                  <div>Sep</div>
                  <div>Oct</div>
                  <div>Nov</div>
                  <div>Dic</div>
                </div>
              </div>
              <div className="flex justify-between mt-4 text-sm">
                <div>
                  <span className="inline-block w-3 h-3 bg-red-600 mr-1"></span>
                  <span className="text-gray-600 dark:text-gray-400">Pagado</span>
                </div>
                <div>
                  <span className="inline-block w-3 h-3 bg-red-600 opacity-50 mr-1"></span>
                  <span className="text-gray-600 dark:text-gray-400">Pendiente</span>
                </div>
                <div>
                  <span className="inline-block w-3 h-3 bg-gray-300 dark:bg-gray-700 opacity-30 mr-1"></span>
                  <span className="text-gray-600 dark:text-gray-400">Proyectado</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Pagos Totales 2025</h4>
                <div className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                  {formatCurrency(payments.reduce((sum, p) => sum + p.amount, 0))}
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400">12 mensualidades</p>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Ahorro Anual</h4>
                <div className="text-2xl font-bold text-green-600">
                  {formatCurrency(payments.reduce((sum, p) => sum + (p.originalAmount - p.amount), 0))}
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400">Con beca del 65%</p>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Costo Original</h4>
                <div className="text-2xl font-bold text-gray-400 line-through">
                  {formatCurrency(payments.reduce((sum, p) => sum + p.originalAmount, 0))}
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400">Sin descuentos</p>
              </div>
            </div>

            <div className="flex justify-center">
              <Button variant="outline" className="text-red-600">
                <Download className="h-4 w-4 mr-2" />
                Descargar Estado de Cuenta Completo
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
