import { ImageItem, ExifData, ApiResponse } from "@/lib/types"
import { imageUtils } from "@/lib/utils/image-utils"

interface ImageTransformOptions {
  width?: number
  height?: number
  quality?: number
  format?: 'webp' | 'jpeg' | 'png' | 'avif'
  blur?: number
}

/**
 * Service for handling image operations across the application
 */
export class ImageService {
  private baseUrl: string

  constructor(baseUrl: string = '') {
    this.baseUrl = baseUrl
  }

  /**
   * Gets a transformed image URL based on options
   */
  getTransformedUrl(src: string, options: ImageTransformOptions): string {
    // Skip transformation for external URLs
    if (src.startsWith('http') && !src.startsWith(this.baseUrl)) {
      return src
    }

    // Start building the query parameters
    const params: string[] = []
    
    if (options.width) params.push(`w=${options.width}`)
    if (options.height) params.push(`h=${options.height}`)
    if (options.quality) params.push(`q=${options.quality}`)
    if (options.format) params.push(`fm=${options.format}`)
    if (options.blur) params.push(`blur=${options.blur}`)
    
    // Append the query parameters to the source URL
    const separator = src.includes('?') ? '&' : '?'
    return params.length ? `${src}${separator}${params.join('&')}` : src
  }

  /**
   * Gets a placeholder URL for an image
   */
  getPlaceholderUrl(src: string): string {
    return imageUtils.getPlaceholderUrl(src)
  }

  /**
   * Gets a responsive image object with srcset for different screen sizes
   */
  getResponsiveImage(image: ImageItem): {
    src: string
    srcSet: string
    sizes: string
    placeholder: string
  } {
    const { src, width = 1200 } = image
    
    // Create srcset for different screen sizes
    const breakpoints = [640, 768, 1024, 1280, 1536, 1920]
    const srcSet = breakpoints
      .filter(bp => bp <= width)
      .map(bp => {
        const url = this.getTransformedUrl(src, {
          width: bp,
          quality: imageUtils.getOptimizedQuality()
        })
        return `${url} ${bp}w`
      })
      .join(', ')
    
    // Define sizes attribute based on container width
    const sizes = '(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw'
    
    // Get low-quality placeholder
    const placeholder = this.getPlaceholderUrl(src)
    
    return {
      src,
      srcSet,
      sizes,
      placeholder
    }
  }

  /**
   * Preload critical images
   */
  preloadCriticalImages(images: string[]): void {
    if (typeof window === 'undefined') return
    
    images.forEach(src => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'image'
      link.href = src
      document.head.appendChild(link)
    })
  }
  
  /**
   * Determines the best image format based on browser support
   */
  getBestImageFormat(): 'webp' | 'avif' | 'jpeg' {
    if (typeof window === 'undefined') return 'webp' // Default for SSR
    
    // Check for AVIF support
    const canUseAvif = (() => {
      const canvas = document.createElement('canvas')
      return canvas.toDataURL('image/avif').includes('image/avif')
    })()
    
    if (canUseAvif) return 'avif'
    
    // Check for WebP support
    const canUseWebP = (() => {
      const elem = document.createElement('canvas')
      return elem.toDataURL('image/webp').includes('image/webp')
    })()
    
    if (canUseWebP) return 'webp'
    
    // Fall back to JPEG
    return 'jpeg'
  }
}

/**
 * Service for managing and fetching images
 */
export const imageService = {
  /**
   * Cache for image data to prevent redundant API calls
   */
  imageCache: new Map<number, ImageItem>(),
  
  /**
   * Base API URL for image endpoints
   */
  API_BASE_URL: '/api/images',
  
  /**
   * Clear the image cache
   */
  clearCache(): void {
    this.imageCache.clear();
  },
  
  /**
   * Get all images from the API
   */
  async getAllImages(): Promise<ImageItem[]> {
    try {
      const response = await fetch(this.API_BASE_URL);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch images: ${response.statusText}`);
      }
      
      const images: ImageItem[] = await response.json();
      
      // Cache images for faster access later
      images.forEach(image => {
        this.imageCache.set(image.id, image);
      });
      
      return images;
    } catch (error) {
      console.error('Error fetching all images:', error);
      return [];
    }
  },
  
  /**
   * Get a single image by ID
   */
  async getImageById(id: number): Promise<ImageItem | null> {
    // Check cache first
    if (this.imageCache.has(id)) {
      return this.imageCache.get(id) || null;
    }
    
    try {
      const response = await fetch(`${this.API_BASE_URL}/${id}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch image ${id}: ${response.statusText}`);
      }
      
      const image: ImageItem = await response.json();
      
      // Cache image
      this.imageCache.set(id, image);
      
      return image;
    } catch (error) {
      console.error(`Error fetching image ${id}:`, error);
      return null;
    }
  },
  
  /**
   * Get multiple images by their IDs
   */
  async getImagesByIds(ids: number[]): Promise<ImageItem[]> {
    if (ids.length === 0) return [];
    
    // Check cache first for all images
    const cachedImages = ids
      .map(id => this.imageCache.get(id))
      .filter((image): image is ImageItem => image !== undefined);
    
    // If all images are cached, return them
    if (cachedImages.length === ids.length) {
      return cachedImages;
    }
    
    // Otherwise fetch missing images
    try {
      // Create query params with all IDs
      const queryParams = new URLSearchParams();
      ids.forEach(id => queryParams.append('ids', id.toString()));
      
      const response = await fetch(`${this.API_BASE_URL}?${queryParams}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch images: ${response.statusText}`);
      }
      
      const images: ImageItem[] = await response.json();
      
      // Cache all fetched images
      images.forEach(image => {
        this.imageCache.set(image.id, image);
      });
      
      return images;
    } catch (error) {
      console.error('Error fetching images by IDs:', error);
      // Return whatever we have from cache as fallback
      return cachedImages;
    }
  },
  
  /**
   * Get optimized image URL with proper dimensions
   */
  getOptimizedImageUrl(src: string, width?: number, height?: number): string {
    return imageUtils.getOptimizedImageUrl(src, { width, height, quality: imageUtils.getOptimizedQuality() });
  },
  
  /**
   * Get placeholder image URL for lazy loading
   */
  getPlaceholderUrl(src: string): string {
    return imageUtils.getPlaceholderUrl(src);
  },
  
  /**
   * Calculate dimensions maintaining aspect ratio
   */
  calculateImageDimensions(width: number, height: number, targetWidth?: number): { width: number, height: number } {
    return imageUtils.calculateDimensions(width, height, targetWidth);
  },
  
  /**
   * Get images filtered by category
   */
  async getImagesByCategory(category: string): Promise<ImageItem[]> {
    try {
      const response = await fetch(`${this.API_BASE_URL}?category=${encodeURIComponent(category)}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch ${category} images: ${response.statusText}`);
      }
      
      const images: ImageItem[] = await response.json();
      
      // Cache images
      images.forEach(image => {
        this.imageCache.set(image.id, image);
      });
      
      return images;
    } catch (error) {
      console.error(`Error fetching ${category} images:`, error);
      return [];
    }
  }
};