"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { BackgroundImage } from "@/components/ui/image/background-image";
import { MotionWrapper } from "@/components/animations/motion-wrapper";

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

export function GalleryHero() {
  // Using Framer Motion's useScroll hook for more optimized scroll tracking
  const { scrollY } = useScroll();
  
  // Create smooth parallax effect with useTransform
  const backgroundY = useTransform(scrollY, [0, 1000], [0, 500]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.3]);
  const scale = useTransform(scrollY, [0, 300], [1, 1.1]);
  
  // Handle smooth scroll to gallery content
  const scrollToCollection = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth"
    });
  };

  return (
    <section className="relative h-screen w-full overflow-hidden" style={{ marginTop: "-5rem" }}>
      {/* Parallax Background with optimized motion values */}
      <BackgroundImage
        src="/material/portfolio/DSC_0848.jpg"
        alt="Gallery hero image"
        objectPosition="center 30%"
        animation="zoom"
        overlayStrength="medium"
        customStyles={{
          y: backgroundY,
          scale: scale,
          opacity: opacity
        }}
      >
        {/* Content with staggered animations */}
        <div className="flex flex-col items-center justify-center h-screen text-center px-4 pt-16">
          <MotionWrapper 
            animation="fadeInUp"
            duration={0.8}
            className="max-w-3xl"
          >
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-6 text-shadow-sm">
              Gallery
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl mb-10 mx-auto text-shadow-sm">
              A curated collection of moments
            </p>
            <button
              className="px-8 py-3 bg-white text-black rounded-full hover:bg-white/90 transition-colors text-lg hover:shadow-xl"
              onClick={scrollToCollection}
            >
              View Collection
            </button>
          </MotionWrapper>
        </div>

        {/* Scroll indicator */}
        <ScrollIndicator />
      </BackgroundImage>
    </section>
  );
}