"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { ImageItem } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Heart, Info, ExternalLink } from "lucide-react"

interface GalleryItemProps {
  image: ImageItem
  index: number
  isFavorite?: boolean
  onSelect: (image: ImageItem, index: number) => void
  onToggleFavorite?: (id: number) => void
  priority?: boolean
  className?: string
}

export function GalleryItem({
  image,
  index,
  isFavorite = false,
  onSelect,
  onToggleFavorite,
  priority = false,
  className
}: GalleryItemProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  
  // Determine aspect ratio class based on image data
  const getAspectRatioClass = () => {
    if (!image.width || !image.height) return "aspect-video";
    
    const ratio = image.width / image.height;
    
    if (ratio < 0.8) return "aspect-[2/3]"; // Portrait
    if (ratio > 1.2) return "aspect-video"; // Landscape
    return "aspect-square"; // Square
  };

  // Handle favorite toggle
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onToggleFavorite) {
      onToggleFavorite(image.id);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
      transition={{ 
        duration: 0.5, 
        delay: Math.min(index * 0.05, 1.5),
        ease: "easeOut" 
      }}
      className={cn(
        "group relative overflow-hidden rounded-xl bg-black/80 cursor-pointer",
        getAspectRatioClass(),
        className
      )}
      onClick={() => onSelect(image, index)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={image.url}
          alt={image.alt || image.title || "Gallery Image"}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          quality={85}
          priority={priority}
          className={cn(
            "object-cover transition-all duration-500",
            isLoaded ? "opacity-100" : "opacity-0",
            isHovered ? "scale-105 brightness-90" : "scale-100"
          )}
          onLoad={() => setIsLoaded(true)}
        />
      </div>

      {/* Overlay gradient on hover */}
      <div className={cn(
        "absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent",
        "opacity-0 transition-opacity duration-300",
        isHovered ? "opacity-100" : "group-hover:opacity-70"
      )} />

      {/* Favorite button */}
      {onToggleFavorite && (
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "absolute top-3 right-3 z-10 rounded-full bg-black/40 text-white",
            "opacity-0 transition-all duration-200 backdrop-blur-sm",
            isHovered ? "opacity-100 translate-y-0" : "translate-y-2",
            isFavorite ? "text-red-500 hover:text-red-400" : "hover:text-red-300"
          )}
          onClick={handleFavoriteClick}
        >
          <Heart className={cn("w-5 h-5", isFavorite ? "fill-current" : "")} />
        </Button>
      )}

      {/* Image info overlay */}
      <div className={cn(
        "absolute inset-x-0 bottom-0 p-4 flex flex-col",
        "translate-y-10 opacity-0 transition-all duration-300",
        isHovered ? "translate-y-0 opacity-100" : "group-hover:translate-y-5 group-hover:opacity-90"
      )}>
        {image.title && (
          <h3 className="text-white font-medium text-lg leading-tight truncate">
            {image.title}
          </h3>
        )}
        {image.category && (
          <span className="text-white/70 text-sm mt-1">
            {image.category}
          </span>
        )}
      </div>
    </motion.div>
  )
}