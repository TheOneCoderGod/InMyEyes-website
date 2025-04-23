"use client"

import { useEffect, useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { ImageItem } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Heart, 
  Download, 
  Info, 
  Share2,
  ExternalLink
} from "lucide-react"
import { useKeyboard } from "@/hooks/use-keyboard"

interface ImageModalProps {
  image: ImageItem | null
  isOpen: boolean
  onClose: () => void
  onPrevious: () => void
  onNext: () => void
  onToggleFavorite?: (id: number) => void
  isFavorite?: boolean
  showInfo: boolean
  onToggleInfo: () => void
}

export function ImageModal({
  image,
  isOpen,
  onClose,
  onPrevious,
  onNext,
  onToggleFavorite,
  isFavorite = false,
  showInfo,
  onToggleInfo
}: ImageModalProps) {
  const [loadedImage, setLoadedImage] = useState(false)

  // Reset loaded state when image changes
  useEffect(() => {
    setLoadedImage(false)
  }, [image])

  // Handle keyboard navigation
  useKeyboard({
    Escape: onClose,
    ArrowLeft: onPrevious,
    ArrowRight: onNext,
    "i": onToggleInfo
  }, isOpen)

  // Download handler
  const handleDownload = useCallback(async () => {
    if (!image) return
    
    try {
      const response = await fetch(image.url)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      
      const a = document.createElement('a')
      a.href = url
      a.download = image.title || `image-${image.id}`
      document.body.appendChild(a)
      a.click()
      a.remove()
      
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Failed to download image:", error)
    }
  }, [image])

  // Share handler (if Web Share API is available)
  const handleShare = useCallback(() => {
    if (!image) return
    
    if (navigator.share) {
      navigator.share({
        title: image.title || 'Shared Image',
        text: image.description || 'Check out this image',
        url: window.location.href
      }).catch(error => console.error('Error sharing:', error))
    }
  }, [image])

  if (!isOpen || !image) return null

  return (
    <AnimatePresence>
      {isOpen && image && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-lg flex items-center justify-center"
          onClick={onClose}
        >
          {/* Close button */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute top-4 right-4 md:top-6 md:right-6 z-50 text-white bg-black/50 hover:bg-black/70 rounded-full"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </Button>
          
          {/* Navigation buttons */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-2 md:left-6 z-40 text-white bg-black/50 hover:bg-black/70 rounded-full h-10 w-10"
            onClick={(e) => {
              e.stopPropagation()
              onPrevious()
            }}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 md:right-6 z-40 text-white bg-black/50 hover:bg-black/70 rounded-full h-10 w-10"
            onClick={(e) => {
              e.stopPropagation()
              onNext()
            }}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
          
          {/* Main image container */}
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative w-full h-full flex items-center justify-center p-4 md:p-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full max-w-6xl max-h-[80vh] flex items-center justify-center">
              <div className="relative w-full h-full">
                <Image
                  src={image.url}
                  alt={image.alt || image.title || "Gallery Image"}
                  quality={90}
                  fill
                  priority
                  className={cn(
                    "object-contain transition-opacity duration-500",
                    loadedImage ? "opacity-100" : "opacity-0"
                  )}
                  onLoad={() => setLoadedImage(true)}
                />
                
                {!loadedImage && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-10 h-10 border-4 border-t-transparent rounded-full animate-spin" />
                  </div>
                )}
              </div>
            </div>
          </motion.div>
          
          {/* Footer with actions */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent px-4 py-6 md:px-8 flex flex-col">
            {/* Image info section */}
            <AnimatePresence>
              {showInfo && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3 }}
                  className="mb-6"
                >
                  <div className="max-w-4xl mx-auto">
                    {image.title && (
                      <h2 className="text-white text-2xl font-medium mb-2">{image.title}</h2>
                    )}
                    
                    {image.description && (
                      <p className="text-white/80 mb-4">{image.description}</p>
                    )}
                    
                    <div className="flex flex-wrap gap-4 text-sm text-white/60">
                      {image.category && (
                        <div>
                          <span className="font-medium">Category:</span> {image.category}
                        </div>
                      )}
                      
                      {image.timestamp && (
                        <div>
                          <span className="font-medium">Date:</span> {new Date(image.timestamp).toLocaleDateString()}
                        </div>
                      )}
                      
                      <div>
                        <span className="font-medium">Size:</span> {image.width}×{image.height}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Action buttons */}
            <div className="flex items-center justify-between max-w-4xl mx-auto w-full">
              <div>
                {image.title && (
                  <h3 className={cn(
                    "text-white text-lg font-medium transition-opacity duration-300",
                    showInfo ? "opacity-0" : "opacity-100"
                  )}>
                    {image.title}
                  </h3>
                )}
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white bg-black/50 hover:bg-black/70 rounded-full"
                  onClick={(e) => {
                    e.stopPropagation()
                    onToggleInfo()
                  }}
                >
                  <Info className="h-5 w-5" />
                </Button>
                
                {onToggleFavorite && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                      "text-white bg-black/50 hover:bg-black/70 rounded-full",
                      isFavorite ? "text-red-500 hover:text-red-400" : ""
                    )}
                    onClick={(e) => {
                      e.stopPropagation()
                      if (onToggleFavorite && image) onToggleFavorite(image.id)
                    }}
                  >
                    <Heart className={cn("h-5 w-5", isFavorite ? "fill-current" : "")} />
                  </Button>
                )}
                
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white bg-black/50 hover:bg-black/70 rounded-full"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleDownload()
                  }}
                >
                  <Download className="h-5 w-5" />
                </Button>
                
                {navigator.share && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white bg-black/50 hover:bg-black/70 rounded-full"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleShare()
                    }}
                  >
                    <Share2 className="h-5 w-5" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}