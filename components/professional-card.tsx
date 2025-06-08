"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface ProfessionalCardProps {
  title?: string
  description?: string
  children: React.ReactNode
  className?: string
  variant?: "default" | "elevated" | "bordered"
}

export function ProfessionalCard({
  title,
  description,
  children,
  className,
  variant = "default",
}: ProfessionalCardProps) {
  return (
    <Card
      className={cn(
        "transition-all duration-200",
        {
          "hover:shadow-md": variant === "elevated",
          "border-2": variant === "bordered",
        },
        className,
      )}
    >
      {(title || description) && (
        <CardHeader className="pb-4">
          {title && <CardTitle className="text-foreground">{title}</CardTitle>}
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
      )}
      <CardContent className={cn(title || description ? "pt-0" : "pt-6")}>{children}</CardContent>
    </Card>
  )
}
