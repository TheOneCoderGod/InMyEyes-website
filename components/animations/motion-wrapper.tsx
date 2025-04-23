"use client"

import { ReactNode } from "react"
import { motion, MotionProps } from "framer-motion"

export type AnimationType = 
  | "fadeIn" 
  | "fadeInUp" 
  | "fadeInDown" 
  | "fadeInLeft" 
  | "fadeInRight" 
  | "zoomIn" 
  | "slideUp"
  | "none"

interface MotionWrapperProps extends MotionProps {
  children: ReactNode
  className?: string
  animation?: AnimationType 
  delay?: number
  duration?: number
  once?: boolean
  viewport?: boolean
  viewportMargin?: string
  custom?: Record<string, any>
}

/**
 * Reusable animation wrapper component with predefined animations
 * that can be easily applied across the application
 */
export function MotionWrapper({
  children,
  className,
  animation = "fadeIn",
  delay = 0,
  duration = 0.8,
  once = true,
  viewport = true,
  viewportMargin = "-100px",
  custom,
  ...motionProps
}: MotionWrapperProps) {
  // Predefined animation variants
  const animations = {
    fadeIn: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 }
    },
    fadeInUp: {
      hidden: { opacity: 0, y: 40 },
      visible: { opacity: 1, y: 0 }
    },
    fadeInDown: {
      hidden: { opacity: 0, y: -40 },
      visible: { opacity: 1, y: 0 }
    },
    fadeInLeft: {
      hidden: { opacity: 0, x: 40 },
      visible: { opacity: 1, x: 0 }
    },
    fadeInRight: {
      hidden: { opacity: 0, x: -40 },
      visible: { opacity: 1, x: 0 }
    },
    zoomIn: {
      hidden: { opacity: 0, scale: 0.95 },
      visible: { opacity: 1, scale: 1 }
    },
    slideUp: {
      hidden: { y: 100 },
      visible: { y: 0 }
    },
    none: {
      hidden: {},
      visible: {}
    }
  }

  // If no animation is desired, just return the children wrapped in a div
  if (animation === "none") {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      animate={!viewport ? "visible" : undefined}
      whileInView={viewport ? "visible" : undefined}
      viewport={viewport ? { once, margin: viewportMargin } : undefined}
      variants={animations[animation]}
      transition={{ 
        duration, 
        delay, 
        ease: "easeOut" 
      }}
      {...motionProps}
    >
      {children}
    </motion.div>
  )
}