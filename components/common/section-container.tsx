"use client"

import { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface SectionContainerProps {
  children: ReactNode
  className?: string
  id?: string
  fullWidth?: boolean
  as?: "section" | "div" | "article"
  background?: "default" | "dark" | "light" | "accent" | "transparent"
  padding?: "default" | "small" | "large" | "none"
}

/**
 * Consistent section container that handles layout, padding, and background styles
 * for different section types across the application
 */
export function SectionContainer({
  children,
  className,
  id,
  fullWidth = false,
  as: Component = "section",
  background = "default",
  padding = "default"
}: SectionContainerProps) {
  // Background styles
  const backgroundStyles = {
    default: "bg-black",
    dark: "bg-zinc-900",
    light: "bg-zinc-100 text-zinc-900",
    accent: "bg-zinc-900/50",
    transparent: "bg-transparent"
  }
  
  // Padding styles
  const paddingStyles = {
    default: "py-24 px-4 md:py-32",
    small: "py-16 px-4",
    large: "py-32 px-4 md:py-40",
    none: ""
  }

  return (
    <Component
      id={id}
      className={cn(
        backgroundStyles[background],
        paddingStyles[padding],
        className
      )}
    >
      <div className={cn(
        "mx-auto",
        fullWidth ? "w-full" : "max-w-6xl"
      )}>
        {children}
      </div>
    </Component>
  )
}