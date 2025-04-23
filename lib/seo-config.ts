/**
 * Central configuration for SEO settings
 */
export const seoConfig = {
  // Basic site information
  siteName: 'In My Eyes Photography',
  siteDescription: 'Professional photography portfolio showcasing premium photography services and artwork',
  defaultTitle: 'In My Eyes Photography | Professional Photography Portfolio',
  titleTemplate: '%s | In My Eyes Photography',
  canonicalUrl: 'https://inmyeyes.com',
  
  // Contact information
  contact: {
    email: 'contact@inmyeyes.com',
    phone: '+1 (555) 123-4567',
    address: '123 Photography Lane, Creative City, CA 94101',
  },
  
  // Social profiles
  social: {
    instagram: 'https://instagram.com/inmyeyesphoto',
    facebook: 'https://facebook.com/inmyeyesphotography',
    twitter: 'https://twitter.com/inmyeyesphoto',
    pinterest: 'https://pinterest.com/inmyeyesphoto',
    linkedin: 'https://linkedin.com/company/inmyeyesphotography',
  },
  
  // Open Graph default configuration
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://inmyeyes.com',
    siteName: 'In My Eyes Photography',
    images: [
      {
        url: 'https://inmyeyes.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'In My Eyes Photography',
      },
    ],
  },
  
  // Twitter card configuration
  twitter: {
    handle: '@inmyeyesphoto',
    site: '@inmyeyesphoto',
    cardType: 'summary_large_image',
  },
  
  // Page-specific SEO configurations
  pages: {
    home: {
      title: 'In My Eyes Photography | Professional Photography Portfolio',
      description: 'Discover stunning professional photography services specializing in portraits, landscapes, and commercial photography.',
      keywords: ['photography', 'photographer', 'portfolio', 'professional photography', 'photo services'],
      ogImage: '/og/home.jpg',
    },
    gallery: {
      title: 'Gallery | In My Eyes Photography',
      description: 'Explore our curated collection of beautiful photographs showcasing our best work and artistic vision.',
      keywords: ['photo gallery', 'photography collection', 'professional photos', 'portfolio gallery'],
      ogImage: '/og/gallery.jpg',
    },
    contact: {
      title: 'Contact | In My Eyes Photography',
      description: 'Get in touch to discuss your photography needs and book a session with our professional team.',
      keywords: ['photography contact', 'book photographer', 'photography services', 'photo session booking'],
      ogImage: '/og/contact.jpg',
    },
    about: {
      title: 'About | In My Eyes Photography',
      description: 'Learn about our photography journey, our team of professionals, and our creative vision.',
      keywords: ['about photographer', 'photography team', 'photography studio', 'professional photographers'],
      ogImage: '/og/about.jpg',
    },
  },
  
  // Structured data schema templates
  structuredData: {
    organization: {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "In My Eyes Photography",
      url: "https://inmyeyes.com",
      logo: "https://inmyeyes.com/logo.png",
      sameAs: [
        "https://instagram.com/inmyeyesphoto",
        "https://facebook.com/inmyeyesphotography",
        "https://twitter.com/inmyeyesphoto",
        "https://pinterest.com/inmyeyesphoto",
        "https://linkedin.com/company/inmyeyesphotography",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+1 (555) 123-4567",
        contactType: "customer service",
        email: "contact@inmyeyes.com",
      },
    },
    imageGallery: {
      "@context": "https://schema.org",
      "@type": "ImageGallery",
      name: "In My Eyes Photography Gallery",
      description: "A curated collection of professional photographs",
      url: "https://inmyeyes.com/gallery",
    },
    localBusiness: {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: "In My Eyes Photography Studio",
      image: "https://inmyeyes.com/studio.jpg",
      telephone: "+1 (555) 123-4567",
      email: "contact@inmyeyes.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "123 Photography Lane",
        addressLocality: "Creative City",
        addressRegion: "CA",
        postalCode: "94101",
        addressCountry: "US",
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "9:00",
          closes: "18:00",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: "Saturday",
          opens: "10:00",
          closes: "16:00",
        },
      ],
    },
  },
  
  // Additional tracking and verification IDs
  verification: {
    googleSiteVerification: "your-google-site-verification",
    bingSiteVerification: "your-bing-site-verification",
    yandexSiteVerification: "your-yandex-site-verification",
  },
  analytics: {
    googleAnalyticsId: "G-XXXXXXXXXX",
    facebookPixelId: "XXXXXXXXXX",
  },
}

/**
 * Export siteConfig for use in layout.tsx
 * This matches the structure expected by the layout component
 */
export const siteConfig = {
  name: "In My Eyes Photography",
  description: "Professional photography portfolio showcasing premium photography services and artwork",
  url: "https://inmyeyes.com",
  ogImage: "/og/default.jpg",
  keywords: ["photography", "portfolio", "professional photography", "gallery"],
  authors: [
    {
      name: "In My Eyes Photography",
      url: "https://inmyeyes.com",
    },
  ],
  creator: "@inmyeyesphoto",
}