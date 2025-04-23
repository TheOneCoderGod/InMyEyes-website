"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { useGallery } from "@/hooks/use-gallery"
import Link from "next/link"

interface SelectedWorkItemProps {
  src: string
  index: number
}

function SelectedWorkItem({ src, index }: SelectedWorkItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative overflow-hidden rounded-xl aspect-square shadow-lg"
    >
      <Image
        src={src}
        alt={`Featured photo ${index + 1}`}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
    </motion.div>
  )
}

export function SelectedWork() {
  const { allImages, isLoading } = useGallery({ autoFetch: true })
  const [randomImages, setRandomImages] = useState<string[]>([])
  
  // Get 4 random images from the gallery when images are loaded
  useEffect(() => {
    if (allImages && allImages.length > 0) {
      // Make a copy of the array to shuffle
      const shuffled = [...allImages]
        .sort(() => 0.5 - Math.random()) // Shuffle array
        .slice(0, 4) // Take first 4 items
        .map(img => img.url) // Extract URLs
      
      setRandomImages(shuffled)
    }
  }, [allImages])

  // Fallback images in case the gallery is empty
  const fallbackImages = [
    "/material/portfolio/DSC_0088.jpg", 
    "/material/portfolio/DSC_0616.jpg", 
    "/material/portfolio/IMG_3684.jpg", 
    "/material/portfolio/moda.png" 
  ]
  
  // Use fallback images if we couldn't load any
  const displayImages = randomImages.length > 0 ? randomImages : fallbackImages

  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      viewport={{ once: true }}
      className="mt-32"
    >
      <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-6 text-center">Selected Work</h2>
      <p className="text-xl text-white/80 text-center max-w-2xl mx-auto mb-16">
        A selection of my latest photography projects. Explore the full collection in the gallery.
      </p>

      {/* Portfolio Grid with Hover Effects */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {displayImages.map((src, index) => (
          <Link href="/gallery" key={src}>
            <SelectedWorkItem src={src} index={index} />
          </Link>
        ))}
      </div>
    </motion.div>
  )
}