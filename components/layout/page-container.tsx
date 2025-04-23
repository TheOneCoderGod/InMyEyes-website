"use client"

import { ReactNode, useState, useEffect } from "react"
import { ArrowUp } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useScroll } from "@/hooks/use-scroll"
import { cn } from "@/lib/utils"

interface PageContainerProps {
  children: ReactNode
  className?: string
  showScrollToTop?: boolean
  scrollThreshold?: number
  withNavOffset?: boolean
  withTransition?: boolean
}

/**
 * Container component for all pages providing consistent structure and behaviors
 * including scroll-to-top functionality and page transitions
 */
export function PageContainer({
  children,
  className,
  showScrollToTop = false,
  scrollThreshold = 400,
  withNavOffset = true,
  withTransition = true
}: PageContainerProps) {
  const { scrollY } = useScroll()
  const [showButton, setShowButton] = useState(false)

  // Handle scroll-to-top button visibility
  useEffect(() => {
    if (!showScrollToTop) return
    
    if (scrollY > scrollThreshold) {
      setShowButton(true)
    } else {
      setShowButton(false)
    }
  }, [scrollY, scrollThreshold, showScrollToTop])

  // Scroll to top helper function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }

  return (
    <main 
      className={cn(
        "min-h-screen w-full flex flex-col",
        withNavOffset && "pt-16", // Add padding for fixed navbar
        className
      )}
    >
      {/* Page content */}
      {withTransition ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="flex-1"
        >
          {children}
        </motion.div>
      ) : (
        children
      )}
      
      {/* Scroll to top button */}
      <AnimatePresence>
        {showButton && showScrollToTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 p-3 bg-black border border-white/10 text-white rounded-full shadow-lg hover:bg-zinc-900 transition-colors z-50"
            aria-label="Scroll to top"
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </main>
  )
}