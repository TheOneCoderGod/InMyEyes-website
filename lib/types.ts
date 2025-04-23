/**
 * Image item interface used across the application
 */
export interface ImageItem {
  /** Unique identifier for the image */
  id: number
  /** URL path to image */
  url: string
  /** Alternative text for accessibility */
  alt?: string
  /** Image title */
  title?: string
  /** Optional description of the image */
  description?: string
  /** Image width in pixels */
  width?: number
  /** Image height in pixels */
  height?: number
  /** Category or tag */
  category?: string
  /** Timestamp when image was created or uploaded */
  timestamp?: string
  /** Optional blur data URL for placeholder */
  blurDataURL?: string
  /** Whether this is a featured image */
  featured?: boolean
  /** Any custom attributes */
  [key: string]: any
}

/**
 * EXIF data extracted from image metadata
 */
export interface ExifData {
  camera?: string
  lens?: string
  focalLength?: string
  aperture?: string
  shutterSpeed?: string
  iso?: number
  takenAt?: string
}

/**
 * Social profile interface
 */
export interface SocialProfile {
  /** Platform name (e.g., Instagram, Twitter) */
  platform: string
  /** User handle or name on the platform */
  username: string
  /** Full URL to the profile */
  url: string
  /** Icon component or path */
  icon?: React.ReactNode | string
}

/**
 * Navigation link data structure
 */
export interface NavLink {
  name: string
  href: string
  isExternal?: boolean
  icon?: string
}

/**
 * Project data structure for portfolio items
 */
export interface Project {
  id: number
  title: string
  description: string
  thumbnail: string
  images?: ImageItem[]
  category: string
  date?: string
  client?: string
  tags?: string[]
  featured?: boolean
  slug?: string
  url?: string
}

/**
 * Testimonial data structure
 */
export interface Testimonial {
  id: number
  name: string
  role?: string
  company?: string
  avatar?: string
  content: string
  rating?: number
}

/**
 * Contact form data interface
 */
export interface ContactFormData {
  /** User's full name */
  name: string
  /** User's email address */
  email: string
  /** Subject of the message */
  subject?: string
  /** Message content */
  message: string
  /** Marketing consent checkbox */
  consent?: boolean
}

/**
 * Theme configuration
 */
export interface ThemeConfig {
  mainColor: string
  accentColor: string
  fontPrimary: string
  fontSecondary: string
  darkMode: boolean
  lightMode: boolean
}

/**
 * API response formats
 */
export interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
  error?: string
}

export interface PaginatedApiResponse<T> extends ApiResponse<T> {
  page: number
  limit: number
  total: number
  hasMore: boolean
}