import React from 'react'
import { seoConfig } from '@/lib/seo-config'

interface PhotographerStructuredDataProps {
  name?: string
  url?: string
  image?: string
  description?: string
  sameAs?: string[]
}

export function PhotographerStructuredData({
  name = seoConfig.structuredData.business?.name || seoConfig.siteName,
  url = seoConfig.canonicalUrl,
  image = seoConfig.structuredData.business?.logo || '/placeholder-logo.png',
  description = seoConfig.structuredData.business?.description || seoConfig.siteDescription,
  sameAs = seoConfig.structuredData.business?.sameAs || Object.values(seoConfig.social || {})
}: PhotographerStructuredDataProps = {}) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'PhotographyBusiness',
    name,
    url,
    logo: image,
    image,
    description,
    sameAs,
    address: {
      '@type': 'PostalAddress',
      addressLocality: seoConfig.structuredData.business?.address?.city || 'Creative City',
      addressCountry: seoConfig.structuredData.business?.address?.country || 'US'
    },
    founder: {
      '@type': 'Person',
      name: seoConfig.structuredData.business?.founder || seoConfig.siteName
    },
    knowsAbout: seoConfig.structuredData.business?.expertise || ['Photography', 'Professional Photography']
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

interface PhotoGalleryStructuredDataProps {
  name?: string
  url?: string
  description?: string
  thumbnail?: string
  photos?: Array<{
    url: string
    name?: string
    description?: string
  }>
}

export function PhotoGalleryStructuredData({
  name = 'InMyEyes Photography Portfolio',
  url = `${seoConfig.canonicalUrl}/gallery`,
  description = seoConfig.pages.gallery.description,
  thumbnail = seoConfig.pages.gallery.ogImage || '/og/gallery.jpg',
  photos = []
}: PhotoGalleryStructuredDataProps = {}) {
  const absoluteThumbnail = thumbnail.startsWith('http') 
    ? thumbnail 
    : `${seoConfig.canonicalUrl}${thumbnail}`

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    name,
    url,
    description,
    thumbnailUrl: absoluteThumbnail,
    image: absoluteThumbnail,
    contentUrl: url,
    contentLocation: `${seoConfig.structuredData.business?.address?.city || 'Creative City'}, ${seoConfig.structuredData.business?.address?.country || 'US'}`,
    author: {
      '@type': 'Person',
      name: seoConfig.structuredData.business?.founder || seoConfig.siteName
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}