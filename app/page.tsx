"use client"

import { useState, useEffect } from "react"
import { HeroSection } from "@/components/home/hero-section"
import { AboutSection } from "@/components/home/about-section"
import { FeaturedWorkSection } from "@/components/home/featured-work-section"
import { ConnectSection } from "@/components/home/connect-section"
import { AnimationKeyframes } from "@/components/home/animations"
import { PageContainer } from "@/components/layout/page-container"

export default function Home() {
  // State to track whether client-side rendering is complete
  const [isClient, setIsClient] = useState(false)
  
  // Set isClient to true once the component mounts on the client
  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <PageContainer showScrollToTop={true} scrollThreshold={800}>
      {/* Only render once client-side hydration is complete to avoid animation issues */}
      {isClient && (
        <>
          {/* Global animation keyframes */}
          <AnimationKeyframes />
          
          {/* Main sections */}
          <HeroSection />
          <AboutSection />
          <FeaturedWorkSection />
          <ConnectSection />
        </>
      )}
    </PageContainer>
  )
}
