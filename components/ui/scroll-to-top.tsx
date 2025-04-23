"use client"

import { useState, useEffect } from "react"
import { ArrowUp } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useScroll } from "@/hooks/use-scroll"

interface ScrollToTopProps {
  threshold?: number
  right?: number
  bottom?: number
  size?: "small" | "medium" | "large"
}

export function ScrollToTop({
  threshold = 500,
  right = 20,
  bottom = 20,
  size = "medium"
}: ScrollToTopProps) {
  const [visible, setVisible] = useState(false)
  const scrollPosition = useScroll()
  
  // Update visibility based on scroll position
  useEffect(() => {
    setVisible(scrollPosition > threshold)
  }, [scrollPosition, threshold])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }
  
  // Size variants
  const sizeClasses = {
    small: "p-2",
    medium: "p-3",
    large: "p-4"
  }
  
  const iconSizes = {
    small: "w-4 h-4",
    medium: "w-5 h-5",
    large: "w-6 h-6"
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          onClick={scrollToTop}
          className={`fixed bg-white text-black rounded-full shadow-lg ${sizeClasses[size]} hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white/20 z-50`}
          style={{ right: `${right}px`, bottom: `${bottom}px` }}
          aria-label="Scroll to top"
        >
          <ArrowUp className={iconSizes[size]} />
        </motion.button>
      )}
    </AnimatePresence>
  )
}