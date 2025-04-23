"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SectionContainer } from "@/components/common/section-container"
import { GradientHeading } from "@/components/common/gradient-heading"
import { MotionWrapper } from "@/components/animations/motion-wrapper"
import { OptimizedImage } from "@/components/ui/image/optimized-image"

interface FeaturedWorkItemProps {
  src: string
  alt: string
  title: string
  category: string
  year: string
  className: string
  delay?: number
}

/**
 * Individual featured work item component
 */
function FeaturedWorkItem({ 
  src, 
  alt, 
  title, 
  category, 
  year, 
  className, 
  delay = 0.1 
}: FeaturedWorkItemProps) {
  return (
    <MotionWrapper 
      animation="fadeInUp"
      delay={delay}
      viewport={{ once: true }}
      className={`${className} group relative overflow-hidden rounded-xl shadow-lg`}
    >
      <OptimizedImage
        src={src}
        alt={alt}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
        <div>
          <h3 className="text-2xl font-semibold text-white mb-2">{title}</h3>
          <p className="text-white/80">{category} / {year}</p>
        </div>
      </div>
    </MotionWrapper>
  )
}

/**
 * Featured work section showcasing selected portfolio items
 */
export function FeaturedWorkSection() {
  return (
    <SectionContainer background="dark" padding="large">
      <MotionWrapper
        animation="fadeInUp"
        duration={0.8}
        viewport={{ once: true, margin: "-100px" }}
      >
        <GradientHeading
          as="h2"
          gradient="secondary"
          className="text-4xl md:text-5xl font-bold mb-16 text-center"
        >
          Featured Work
        </GradientHeading>
      </MotionWrapper>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <FeaturedWorkItem 
          src="/material/portfolio/moda.png"
          alt="Featured work 1"
          title="Urban Photography"
          category="Street"
          year="2024"
          className="md:col-span-8 aspect-[4/3]"
          delay={0.1}
        />

        <FeaturedWorkItem 
          src="/material/portfolio/DSC_0588.jpg"
          alt="Featured work 2"
          title="Portrait Session"
          category="Photography"
          year="2025"
          className="md:col-span-4 aspect-[3/4]"
          delay={0.2}
        />

        <FeaturedWorkItem 
          src="/material/portfolio/IMG_3670.jpg"
          alt="Featured work 3"
          title="Natural Light"
          category="Photography"
          year="2024"
          className="md:col-span-6 aspect-[3/2]"
          delay={0.3}
        />

        <FeaturedWorkItem 
          src="/material/portfolio/DSC_0848.jpg"
          alt="Featured work 4"
          title="Creative Vision"
          category="Portrait"
          year="2025"
          className="md:col-span-6 aspect-[3/2]"
          delay={0.4}
        />
      </div>
      
      <MotionWrapper
        animation="fadeInUp"
        delay={0.5}
        viewport={{ once: true }}
        className="text-center mt-16"
      >
        <Button 
          asChild 
          size="lg" 
          className="bg-white text-black hover:bg-white/90 rounded-full px-8"
        >
          <Link href="/gallery">
            View All Work <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </MotionWrapper>
    </SectionContainer>
  )
}