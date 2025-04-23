"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MotionWrapper } from "@/components/animations/motion-wrapper"
import { SectionContainer } from "@/components/common/section-container"
import { GradientHeading } from "@/components/common/gradient-heading"
import { OptimizedImage } from "@/components/ui/image/optimized-image"
import { ReactNode } from "react"

// Reusable text paragraph component
interface TextParagraphProps {
  children: ReactNode
}

const TextParagraph = ({ children }: TextParagraphProps) => (
  <p className="text-lg leading-relaxed mb-8 text-white/80">
    {children}
  </p>
)

/**
 * About section component with refactored layout
 */
export function AboutSection() {
  return (
    <SectionContainer background="default" padding="large">
      <MotionWrapper 
        animation="fadeInUp"
        duration={0.8}
        viewport={{ once: true, margin: "-100px" }}
      >
        <GradientHeading
          as="h2"
          gradient="secondary"
          className="text-4xl md:text-5xl font-bold mb-12 text-center"
        >
          About My Work
        </GradientHeading>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <TextParagraph>
              I'm a passionate photographer and videographer dedicated to capturing authentic moments that tell
              compelling stories. My approach combines technical precision with artistic vision to create images that
              resonate with viewers.
            </TextParagraph>
            <TextParagraph>
              Whether I'm shooting portraits, events, or creating video content, I strive to find the perfect balance
              between composition, lighting, and emotion.
            </TextParagraph>
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Button 
                asChild 
                variant="outline" 
                size="lg"
                className="border-white/20 hover:bg-white/10 rounded-full"
              >
                <Link href="/gallery">Explore Gallery</Link>
              </Button>
            </div>
          </div>

          <MotionWrapper 
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.5 }}
            className="relative h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl"
          >
            <OptimizedImage
              src="/material/about/ubaldo.png"
              alt="Photographer at work"
              fill
              className="object-cover"
            />
          </MotionWrapper>
        </div>
      </MotionWrapper>
    </SectionContainer>
  )
}