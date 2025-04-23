"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface FavoriteButtonProps {
  active: boolean
  onChange: (active: boolean) => void
  size?: "sm" | "md" | "lg"
  variant?: "default" | "outline" | "ghost"
  className?: string
}

/**
 * Animated favorite button component with heart icon
 */
export function FavoriteButton({
  active,
  onChange,
  size = "md",
  variant = "ghost",
  className
}: FavoriteButtonProps) {
  const [isHovered, setIsHovered] = useState(false)
  
  // Get button size based on prop
  const getSize = () => {
    switch (size) {
      case "sm": return "h-8 w-8";
      case "lg": return "h-12 w-12";
      default: return "h-10 w-10";
    }
  };
  
  // Get icon size based on button size
  const getIconSize = () => {
    switch (size) {
      case "sm": return "h-4 w-4";
      case "lg": return "h-6 w-6";
      default: return "h-5 w-5";
    }
  };

  return (
    <Button
      type="button"
      variant={variant}
      size="icon"
      className={cn(
        "rounded-full relative overflow-hidden",
        active 
          ? "text-red-500 hover:text-red-600" 
          : "text-white hover:text-red-300",
        getSize(),
        className
      )}
      onClick={() => onChange(!active)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated background burst for when favorite is activated */}
      <AnimatePresence>
        {active && isHovered && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.5, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-red-500/20 rounded-full"
          />
        )}
      </AnimatePresence>
      
      {/* Heart icon with animations */}
      <motion.div
        animate={{
          scale: active && isHovered ? 1.2 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 10 }}
      >
        <Heart className={cn(
          getIconSize(), 
          active ? "fill-current" : ""
        )} />
      </motion.div>
    </Button>
  )
}