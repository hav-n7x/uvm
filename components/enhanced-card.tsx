"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import type { ReactNode } from "react"

interface EnhancedCardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  glow?: boolean
  gradient?: boolean
  glass?: boolean
  onClick?: () => void
}

export function EnhancedCard({
  children,
  className = "",
  hover = true,
  glow = false,
  gradient = false,
  glass = false,
  onClick,
}: EnhancedCardProps) {
  const baseClasses = `
    relative overflow-hidden transition-all duration-300 ease-out
    ${hover ? "hover:scale-[1.02] hover:shadow-xl hover:-translate-y-1" : ""}
    ${glow ? "hover:shadow-2xl hover:shadow-red-500/20" : ""}
    ${gradient ? "bg-gradient-to-br from-white via-red-50/30 to-red-100/20" : ""}
    ${glass ? "backdrop-blur-md bg-white/80 border border-white/20" : ""}
    ${onClick ? "cursor-pointer" : ""}
    ${className}
  `

  return (
    <motion.div
      className={baseClasses}
      whileHover={hover ? { scale: 1.02, y: -4 } : {}}
      whileTap={onClick ? { scale: 0.98 } : {}}
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {glow && (
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 via-transparent to-red-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300" />
      )}
      <Card className="border-0 shadow-none bg-transparent h-full">{children}</Card>
    </motion.div>
  )
}
