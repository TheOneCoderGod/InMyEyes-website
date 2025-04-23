"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { createBlurPlaceholder, detectAspectRatio, getResponsiveSizes } from "@/lib/utils/image-utils"

interface OptimizedImageProps {
  src: string
  alt: string
  fill?: boolean
  width?: number
  height?: number
  sizes?: string
  priority?: boolean
  quality?: number
  className?: string
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down"
  objectPosition?: string
  aspectRatio?: "portrait" | "landscape" | "square"
  onLoad?: () => void
  loadingTimeout?: number
  lowQualitySrc?: string
}

export function OptimizedImage({
  src,
  alt,
  fill = false,
  width,
  height,
  sizes,
  priority = false,
  quality = 85,
  className,
  objectFit = "cover",
  objectPosition = "center",
  aspectRatio,
  onLoad,
  loadingTimeout = 3000,
  lowQualitySrc,
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const [showLoadingIndicator, setShowLoadingIndicator] = useState(false)
  const [blurDataUrl, setBlurDataUrl] = useState<string | undefined>(undefined)
  const [imgSizes, setImgSizes] = useState<string | undefined>(sizes)

  // Show loading indicator after a timeout if image takes too long to load
  useEffect(() => {
    if (isLoading) {
      const timeoutId = setTimeout(() => {
        setShowLoadingIndicator(true)
      }, 500)
      
      return () => clearTimeout(timeoutId)
    }
  }, [isLoading])
  
  // Add timeout for fallback in case image never loads
  useEffect(() => {
    if (isLoading && !priority) {
      const timeoutId = setTimeout(() => {
        if (isLoading) {
          setIsError(true)
          setIsLoading(false)
          console.warn(`Image load timed out: ${src}`)
        }
      }, loadingTimeout)
      
      return () => clearTimeout(timeoutId)
    }
  }, [isLoading, src, loadingTimeout, priority])

  // Generate placeholder and determine image sizes on mount
  useEffect(() => {
    // Generate a blur placeholder if not provided
    if (!props.placeholder) {
      setBlurDataUrl(createBlurPlaceholder())
    }
    
    // Determine responsive sizes if width and height are provided
    if (width && height && !sizes) {
      const detectedAspect = aspectRatio || detectAspectRatio(width, height)
      setImgSizes(getResponsiveSizes(detectedAspect))
    }
  }, [width, height, sizes, aspectRatio, props.placeholder])

  return (
    <div className={cn(
      "overflow-hidden relative",
      isLoading && "bg-zinc-900/20",
      className
    )}>
      {isLoading && showLoadingIndicator && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="w-8 h-8 border-2 border-white/20 border-t-white/80 rounded-full animate-spin" />
        </div>
      )}
      
      {/* Low quality placeholder image */}
      {lowQualitySrc && isLoading && (
        <Image
          src={lowQualitySrc}
          alt=""
          fill={fill}
          width={!fill ? width : undefined}
          height={!fill ? height : undefined}
          className={cn(
            "transition-opacity duration-300 blur-sm",
            objectFit === "cover" && "object-cover",
            objectFit === "contain" && "object-contain",
            objectFit === "fill" && "object-fill",
            objectFit === "none" && "object-none",
            objectFit === "scale-down" && "object-scale-down"
          )}
          style={{ objectPosition }}
        />
      )}
      
      {/* Main image */}
      <Image
        src={isError ? '/placeholder.jpg' : src}
        alt={alt}
        fill={fill}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        sizes={imgSizes || sizes}
        priority={priority}
        quality={quality}
        placeholder={blurDataUrl ? "blur" : undefined}
        blurDataURL={blurDataUrl}
        className={cn(
          "transition-opacity duration-500",
          isLoading ? "opacity-0" : "opacity-100",
          objectFit === "cover" && "object-cover",
          objectFit === "contain" && "object-contain",
          objectFit === "fill" && "object-fill",
          objectFit === "none" && "object-none",
          objectFit === "scale-down" && "object-scale-down"
        )}
        style={{ objectPosition }}
        onLoad={() => {
          setIsLoading(false)
          if (onLoad) {
            onLoad()
          }
        }}
        onError={() => {
          setIsError(true)
          setIsLoading(false)
        }}
        {...props}
      />
    </div>
  )
}