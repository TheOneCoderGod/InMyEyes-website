import { ImageItem, ExifData } from "@/lib/types"

/**
 * Utility functions for image processing and optimization
 */

/**
 * Image utilities for common image operations
 */
export const imageUtils = {
  /**
   * Calculate aspect ratio from width and height
   */
  calculateAspectRatio(width: number, height: number): number {
    return width / height
  },
  
  /**
   * Generate a low quality placeholder URL for an image
   */
  getPlaceholderUrl(src: string): string {
    // If src already has query parameters, add to them, otherwise create new query
    const separator = src.includes('?') ? '&' : '?'
    return `${src}${separator}w=40&q=20&blur=10`
  },
  
  /**
   * Get an appropriate quality setting based on connection speed
   */
  getOptimizedQuality(): number {
    if (typeof navigator === 'undefined') return 80 // Default for SSR
    
    const connection = (navigator as any).connection
    
    if (!connection) return 80 // Default quality
    
    // Adjust quality based on connection type
    switch (connection.effectiveType) {
      case '4g':
        return 85
      case '3g':
        return 75
      case '2g':
        return 65
      case 'slow-2g':
        return 50
      default:
        return 80
    }
  },
  
  /**
   * Calculate image dimensions to maintain aspect ratio
   */
  calculateDimensions(originalWidth: number, originalHeight: number, targetWidth?: number, targetHeight?: number): { width: number, height: number } {
    if (!targetWidth && !targetHeight) {
      return { width: originalWidth, height: originalHeight }
    }
    
    const aspectRatio = originalWidth / originalHeight
    
    if (targetWidth && !targetHeight) {
      return {
        width: targetWidth,
        height: Math.round(targetWidth / aspectRatio)
      }
    }
    
    if (targetHeight && !targetWidth) {
      return {
        width: Math.round(targetHeight * aspectRatio),
        height: targetHeight
      }
    }
    
    // Both target dimensions provided - respect both and ignore aspect ratio
    return {
      width: targetWidth || 0,
      height: targetHeight || 0
    }
  },
  
  /**
   * Check if an image URL is external
   */
  isExternalUrl(url: string): boolean {
    if (!url) return false
    
    try {
      // If URL doesn't have a protocol, it's not external
      if (!url.includes('://')) return false
      
      // Check if URL is from a different origin
      const currentOrigin = typeof window !== 'undefined' ? window.location.origin : null
      if (!currentOrigin) return true // In SSR, consider URLs with protocols external
      
      return !url.startsWith(currentOrigin)
    } catch (e) {
      return false
    }
  },
  
  /**
   * Convert image URL to use Content Delivery Network (CDN) for optimization
   * This example uses Cloudinary, but could be adapted for other CDNs
   */
  getOptimizedImageUrl(url: string, options: { width?: number, height?: number, quality?: number, format?: string } = {}): string {
    // Skip for external URLs or URLs that are already on a CDN
    if (this.isExternalUrl(url) || url.includes('cloudinary.com')) return url
    
    // Basic image transformations
    const transformations: string[] = []
    
    if (options.width) transformations.push(`w_${options.width}`)
    if (options.height) transformations.push(`h_${options.height}`)
    if (options.quality) transformations.push(`q_${options.quality}`)
    if (options.format) transformations.push(`f_${options.format}`)
    
    // Example cloudinary URL structure: 
    // https://res.cloudinary.com/your-cloud-name/image/upload/c_limit,w_1080,q_auto/v1/your-folder/image.jpg
    
    // In a real application, you'd want to have your cloud name and other details in environment variables
    const cloudName = 'inmyeyes-portfolio'
    const folder = 'photos'
    
    // Extract just the filename from the URL
    const filename = url.split('/').pop()
    
    if (!filename) return url
    
    // Build the Cloudinary URL
    return `https://res.cloudinary.com/${cloudName}/image/upload/${transformations.join(',')}/v1/${folder}/${filename}`
  },
  
  /**
   * Generate a blurhash placeholder for an image
   * This is just a stub - actual blurhash generation requires a library
   */
  getBlurhashPlaceholder(blurhash: string, width: number = 32, height: number = 32): string {
    // In a real implementation, you would decode the blurhash to an image
    // This is just a placeholder for the concept
    return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${width}' height='${height}' viewBox='0 0 ${width} ${height}'%3E%3Crect width='${width}' height='${height}' fill='%23ccc'/%3E%3C/svg%3E`
  }
}

/**
 * Create a loading placeholder blur data URL
 * This generates a tiny SVG that looks like a blurred version of a loading image
 */
export function createBlurPlaceholder(color = "#262626"): string {
  // Create a simple SVG with a rect in the specified color
  const svg = `
    <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${color}" />
    </svg>
  `;
  
  // Convert SVG to a base64 data URL
  const encoded = btoa(svg);
  return `data:image/svg+xml;base64,${encoded}`;
}

/**
 * Calculate optimal Image width and height based on aspect ratio and container size
 */
export function calculateImageDimensions(
  containerWidth: number,
  containerHeight: number,
  aspectRatio: number
): { width: number; height: number } {
  let width = containerWidth;
  let height = containerWidth / aspectRatio;

  if (height > containerHeight) {
    height = containerHeight;
    width = containerHeight * aspectRatio;
  }

  return { width, height };
}

/**
 * Detects the appropriate aspect ratio string based on image dimensions
 * 
 * @param width - Image width in pixels
 * @param height - Image height in pixels
 * @returns A string representing the aspect ratio (e.g., "1/1", "16/9", "4/3")
 */
export function detectAspectRatio(width: number, height: number): string {
  if (!width || !height) return "1/1" // Default to square if no dimensions

  // Calculate ratio and round to the nearest standard ratio
  const ratio = width / height

  if (ratio > 0.9 && ratio < 1.1) {
    return "1/1" // Square (1:1)
  } else if (ratio > 1.7 && ratio < 1.9) {
    return "16/9" // Widescreen (16:9)
  } else if (ratio > 1.3 && ratio < 1.4) {
    return "4/3" // Standard (4:3)
  } else if (ratio < 0.8) {
    return "3/4" // Portrait (3:4)
  } else if (ratio > 2) {
    return "21/9" // Ultra-wide (21:9)
  } else {
    // For non-standard ratios, return the actual ratio
    const gcd = getGCD(width, height)
    return `${width / gcd}/${height / gcd}`
  }
}

/**
 * Calculate greatest common divisor to simplify aspect ratio
 */
function getGCD(a: number, b: number): number {
  return b === 0 ? a : getGCD(b, a % b)
}

/**
 * Determine if an image should use priority loading
 * 
 * @param index - Image index in a list
 * @param isHero - Whether the image is a hero image
 * @returns Boolean indicating if image should use priority loading
 */
export function shouldUsePriority(index: number, isHero = false): boolean {
  if (isHero) return true
  return index < 4 // Load first 4 images with priority
}

/**
 * Generates an appropriate sizes attribute for responsive images
 * 
 * @param isFull - Whether the image takes full viewport width
 * @param columns - Number of columns in the grid
 * @returns A sizes attribute string for the image
 */
export function getResponsiveSizes(isFull = false, columns = 3): string {
  if (isFull) {
    return "100vw"
  }
  
  // Calculate sizes based on columns
  return `(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) ${100 / Math.min(columns, 2)}vw, ${100 / columns}vw`
}