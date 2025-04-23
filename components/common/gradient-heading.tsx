"use client"

import { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface GradientHeadingProps {
  children: ReactNode
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span"
  className?: string
  gradient?: "primary" | "secondary" | "custom"
  customGradient?: string
}

/**
 * Reusable gradient heading component that applies consistent gradient styling
 * across the application. Supports different heading levels and custom gradients.
 */
export function GradientHeading({
  children,
  as: Component = "h2",
  className,
  gradient = "primary",
  customGradient
}: GradientHeadingProps) {
  // Define gradient classes
  const gradientClasses = {
    primary: "bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent", 
    secondary: "bg-gradient-to-r from-white to-white bg-clip-text text-transparent",
    custom: customGradient || ""
  }

  return (
    <Component 
      className={cn(
        gradientClasses[gradient],
        className
      )}
    >
      {children}
    </Component>
  )
}