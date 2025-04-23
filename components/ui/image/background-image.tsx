"use client"

import Image from "next/image"
import { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface BackgroundImageProps {
  src: string
  alt: string
  children?: ReactNode
  className?: string
  overlayClassName?: string
  priority?: boolean
  objectPosition?: string
  overlay?: boolean
  overlayStrength?: "light" | "medium" | "dark" | "none"
  animation?: "none" | "zoom" | "pan"
}

/**
 * Background image component with consistent overlay styling and animations
 * Used for hero sections, headers, and background imagery
 */
export function BackgroundImage({
  src,
  alt,
  children,
  className,
  overlayClassName,
  priority = true,
  objectPosition = "center",
  overlay = true,
  overlayStrength = "medium",
  animation = "none"
}: BackgroundImageProps) {
  // Overlay strength variants
  const overlayVariants = {
    light: "bg-black/30",
    medium: "bg-black/50",
    dark: "bg-black/70",
    none: ""
  }

  // Animation styles
  const animationStyles = {
    none: {},
    zoom: {
      transform: "scale(1.02)",
      animation: "subtleZoom 20s infinite alternate ease-in-out"
    },
    pan: {
      animation: "subtlePan 30s infinite alternate ease-in-out"
    }
  }

  return (
    <div className={cn("relative", className)}>
      {/* Image container */}
      <div className="absolute inset-0">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          className="object-cover"
          style={{ 
            objectPosition,
            ...animationStyles[animation]
          }}
        />
      </div>
      
      {/* Optional overlay */}
      {overlay && overlayStrength !== "none" && (
        <div 
          className={cn(
            "absolute inset-0 z-10", 
            overlayVariants[overlayStrength],
            overlayClassName
          )} 
        />
      )}
      
      {/* Content */}
      {children && (
        <div className="relative z-20">{children}</div>
      )}
    </div>
  )
}