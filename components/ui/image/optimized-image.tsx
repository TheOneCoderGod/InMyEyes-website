"use client"

import Image, { ImageProps } from "next/image"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface OptimizedImageProps extends Omit<ImageProps, "onLoadingComplete"> {
  /** Optional class for wrapper div (when using aspect ratio) */
  wrapperClassName?: string
  /** Optional aspect ratio (e.g., "16/9", "4/3", "1/1") */
  aspectRatio?: string
  /** Show image loading animation */
  showLoadingAnimation?: boolean
  /** Show blur effect while loading */
  useBlur?: boolean
  /** Optional blur data URL for better placeholder */
  blurDataUrl?: string
  /** Callback when image loads successfully */
  onLoad?: () => void
  /** Callback when image fails to load */
  onError?: () => void
}

/**
 * Enhanced Image component with optimal loading strategies,
 * aspect ratio support, and consistent loading animation
 */
export function OptimizedImage({
  src,
  alt,
  className,
  wrapperClassName,
  aspectRatio,
  fill = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  priority = false,
  quality = 85,
  showLoadingAnimation = true,
  useBlur = true,
  blurDataUrl,
  onLoad,
  onError,
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  // Default blur placeholder if not provided
  const placeholder = useBlur ? "blur" : "empty"
  const blurDataURL = blurDataUrl || "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFdgIyf4YY4AAAAABJRU5ErkJggg=="
  
  const handleImageLoad = () => {
    setIsLoading(false)
    if (onLoad) onLoad()
  }
  
  const handleImageError = () => {
    setIsLoading(false)
    setHasError(true)
    if (onError) onError()
  }

  // If we're using an aspect ratio, we need to wrap the image
  if (aspectRatio && !fill) {
    return (
      <div 
        className={cn(
          "relative overflow-hidden",
          wrapperClassName
        )}
        style={{ aspectRatio }}
      >
        <Image
          src={hasError ? "/placeholder.jpg" : src}
          alt={alt}
          fill
          sizes={sizes}
          quality={quality}
          priority={priority}
          className={cn(
            "object-cover transition-opacity duration-500",
            isLoading && showLoadingAnimation ? "opacity-0" : "opacity-100",
            className
          )}
          placeholder={placeholder}
          blurDataURL={blurDataURL}
          onLoad={handleImageLoad}
          onError={handleImageError}
          {...props}
        />
        {isLoading && showLoadingAnimation && (
          <div className="absolute inset-0 bg-zinc-900/20 animate-pulse" />
        )}
      </div>
    )
  }

  // Standard image (no aspect ratio wrapper needed)
  return (
    <Image
      src={hasError ? "/placeholder.jpg" : src}
      alt={alt}
      fill={fill}
      sizes={sizes}
      quality={quality}
      priority={priority}
      className={cn(
        "transition-opacity duration-500",
        isLoading && showLoadingAnimation ? "opacity-0" : "opacity-100",
        className
      )}
      placeholder={placeholder}
      blurDataURL={blurDataURL}
      onLoadingComplete={handleImageLoad}
      onError={handleImageError}
      {...props}
    />
  )
}