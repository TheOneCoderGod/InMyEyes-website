"use client"

import Link from "next/link"
import Image from "next/image"
import { Instagram, ExternalLink } from "lucide-react"
import { MotionWrapper } from "@/components/animations/motion-wrapper"

interface FooterLinkProps {
  href: string
  label: string
  isExternal?: boolean
}

const FooterLink = ({ href, label, isExternal = false }: FooterLinkProps) => (
  <Link 
    href={href} 
    className="text-lg text-white/70 hover:text-white transition-colors duration-300 group relative"
    {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
  >
    <span>{label}</span>
    {/* Underline animation on hover */}
    <span className="absolute bottom-0 left-0 w-0 h-px bg-white/50 transition-all duration-300 group-hover:w-full"></span>
    {isExternal && <ExternalLink size={14} className="opacity-70 ml-1 inline-block" />}
  </Link>
)

interface SocialLinkProps {
  href: string
  label: string
  icon: React.ReactNode
}

const SocialLink = ({ href, label, icon }: SocialLinkProps) => (
  <Link
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="flex items-center justify-center h-11 w-11 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-105 shadow-sm"
  >
    {icon}
  </Link>
)

/**
 * Refined footer component with enhanced centered layout and premium styling
 */
export function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-gradient-to-b from-black via-gray-950/70 to-black border-t border-white/5">
      <div className="container mx-auto px-4 py-20">
        {/* Centered Content */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          {/* Logo & Tagline */}
          <MotionWrapper
            animation="fadeInUp"
            duration={0.6}
            delay={0.1}
          >
            <div className="flex flex-col items-center mb-10">
              <div className="relative h-16 w-16 mb-4">
                <Image 
                  src="/material/header/logo.svg" 
                  alt="InMyEyes Logo" 
                  fill 
                  className="object-contain filter drop-shadow-sm" 
                />
              </div>
              <h2 className="text-4xl font-bold tracking-tighter mb-1">InMyEyes</h2>
              <p className="text-sm text-white/50 tracking-wide">Photography Portfolio</p>
              <div className="w-20 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mt-5"></div>
            </div>
          </MotionWrapper>

          {/* Description */}
          <MotionWrapper
            animation="fadeInUp"
            duration={0.6}
            delay={0.2}
            className="mb-12"
          >
            <p className="text-white/80 text-xl max-w-xl mx-auto leading-relaxed">
              Capturing authentic moments with a creative perspective.
            </p>
          </MotionWrapper>
          
          {/* Navigation Links */}
          <MotionWrapper
            animation="fadeInUp"
            duration={0.6}
            delay={0.3}
            className="mb-12"
          >
            <nav className="flex flex-wrap justify-center gap-x-12 gap-y-5">
              <FooterLink href="/" label="Home" />
              <FooterLink href="/gallery" label="Gallery" />
              <FooterLink href="/contact" label="Contact" />
            </nav>
          </MotionWrapper>
          
          {/* Social Links */}
          <MotionWrapper
            animation="fadeInUp"
            duration={0.6}
            delay={0.4}
            className="mb-16"
          >
            <div className="flex flex-col items-center">
              <p className="text-sm text-white/60 mb-5 tracking-wide">Follow Me</p>
              <div className="flex items-center gap-5">
                <SocialLink 
                  href="https://www.instagram.com/_.inmyeyes/" 
                  label="Instagram"
                  icon={<Instagram size={20} className="text-white/80"/>}
                />
                <SocialLink 
                  href="https://linktr.ee/_.inmyeyes" 
                  label="Linktree"
                  icon={
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-white/80">
                      <path d="M7.953 15.066c-.08.163-.08.324-.08.486.243.486.809.89 1.457.89.809 0 1.457-.404 1.457-.89 0-.162 0-.323-.081-.485-.242-.486-.809-.89-1.376-.89-.809 0-1.457.404-1.457.89zm10.804-3.718c-.324-.567-.89-.89-1.538-.89-.486 0-.97.162-1.376.486-.324.242-.728.647-1.214 1.133l-.81.89c-.404.486-.809.89-.97.971-.162.161-.324.161-.485.161-.162 0-.324 0-.486-.081-.647-.242-1.78-.728-1.78-2.753v-7.24c0-.647-.486-1.133-1.053-1.133-.566 0-1.052.486-1.052 1.133v7.32c0 3.237 1.942 4.371 3.642 4.857.243.08.485.08.728.08.728 0 1.376-.242 1.862-.647.323-.242.728-.647 1.052-1.133l.89-.97c.323-.404.728-.89.97-.97.162-.162.324-.162.486-.162.161 0 .323 0 .485.08.647.243 1.7.728 1.7 2.672v.162c0 .647.485 1.133 1.052 1.133.566 0 1.052-.486 1.052-1.133v-.162c0-3.156-1.861-4.29-3.48-4.776zM13.035 7.742c-.728.728-.728 1.942.08 2.67.243.243.567.324.89.324.404 0 .729-.162.971-.405.728-.647.728-1.78-.08-2.589-.729-.728-1.862-.728-2.59-.081z" />
                    </svg>
                  }
                />
              </div>
            </div>
          </MotionWrapper>
        </div>
        
        {/* Divider */}
        <div className="max-w-xs mx-auto">
          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        </div>
        
        {/* Copyright */}
        <MotionWrapper
          animation="fadeInUp"
          duration={0.6}
          delay={0.5}
        >
          <div className="mt-10 text-center">
            <p className="text-white/50 text-sm">
              © {currentYear} InMyEyes Photography. All rights reserved.
            </p>
            <p className="text-white/30 text-xs mt-2 tracking-wide">
              Capturing moments through my eyes
            </p>
          </div>
        </MotionWrapper>
      </div>
    </footer>
  )
}