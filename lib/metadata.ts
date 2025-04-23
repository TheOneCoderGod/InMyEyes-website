import { Metadata } from 'next'
import { seoConfig } from './seo-config'

type MetadataProps = {
  title?: string
  description?: string
  keywords?: string[]
  image?: string
  pathname?: string
  pageName?: keyof typeof seoConfig.pages
}

/**
 * Constructs metadata for Next.js pages using the centralized SEO configuration
 */
export function constructMetadata({
  title,
  description,
  keywords,
  image,
  pathname = '',
  pageName
}: MetadataProps = {}): Metadata {
  // Use page-specific SEO config if pageName is provided
  const pageConfig = pageName ? seoConfig.pages[pageName] : null
  
  // Use provided values or fall back to page config or default config
  const metaTitle = title || (pageConfig?.title) || seoConfig.defaultTitle
  const metaDescription = description || (pageConfig?.description) || seoConfig.siteDescription
  const metaKeywords = keywords || (pageConfig?.keywords) || []
  const metaImage = image || (pageConfig?.ogImage) || seoConfig.openGraph.images[0].url
  
  const siteUrl = seoConfig.canonicalUrl
  const metaUrl = `${siteUrl}${pathname}`
  const absoluteImageUrl = metaImage.startsWith('http') ? metaImage : `${siteUrl}${metaImage}`

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: metaKeywords,
    authors: [{ name: seoConfig.siteName, url: siteUrl }],
    creator: seoConfig.twitter.handle,
    publisher: seoConfig.siteName,
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: metaUrl,
      siteName: seoConfig.siteName,
      images: [
        {
          url: absoluteImageUrl,
          width: 1200,
          height: 630,
          alt: seoConfig.siteName,
        },
      ],
      locale: seoConfig.openGraph.locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDescription,
      images: [absoluteImageUrl],
      creator: seoConfig.twitter.handle,
    },
    viewport: {
      width: 'device-width',
      initialScale: 1,
    },
    metadataBase: new URL(siteUrl),
  }
}