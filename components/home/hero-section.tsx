"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { BackgroundImage } from "@/components/ui/image/background-image"
import { MotionWrapper } from "@/components/animations/motion-wrapper"
import { AnimationKeyframes } from "./animations"

/**
 * Scroll indicator component for hero section
 */
const ScrollIndicator = () => {
  return (
    <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20">
      <div className="w-6 h-10 rounded-full border-2 border-white/50 flex justify-center">
        <motion.div 
          animate={{ 
            y: [0, 12, 0],
          }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity,
            repeatType: "loop" 
          }}
          className="w-1.5 h-1.5 bg-white rounded-full mt-2" 
        />
      </div>
    </div>
  )
}

/**
 * Hero section component for the home page
 * Uses the BackgroundImage component for cleaner code
 */
export function HeroSection() {
  return (
    <section className="relative h-screen w-full overflow-hidden" style={{ marginTop: "-5rem" }}>
      {/* Include animation keyframes */}
      <AnimationKeyframes />
      
      {/* Hero background with BackgroundImage component */}
      <BackgroundImage
        src="/material/portfolio/DSC_0147.jpg"
        alt="Featured photography work"
        objectPosition="center 30%"
        animation="zoom"
        overlayStrength="medium"
      >
        {/* Content */}
        <div className="flex flex-col items-center justify-center h-screen text-center px-4 pt-16">
          <MotionWrapper 
            animation="fadeInUp"
            duration={0.8}
            className="max-w-3xl"
          >
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-6 text-shadow-sm">
              <span className="block">InMyEyes</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl mb-10 mx-auto text-shadow-sm">
              Dedicated photographer capturing genuine, professional moments you can trust.
            </p>
            <Button 
              asChild 
              size="lg"
              className="bg-white text-black hover:bg-white/90 rounded-full px-8 hover:shadow-xl transition-all"
            >
              <Link href="/gallery">
                View Portfolio <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </MotionWrapper>
        </div>

        {/* Scroll indicator */}
        <ScrollIndicator />
      </BackgroundImage>
    </section>
  )
}