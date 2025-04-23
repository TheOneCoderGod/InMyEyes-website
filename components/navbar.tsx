"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"
import dynamic from "next/dynamic"

// Dynamically import framer-motion with no SSR to avoid hydration issues
const motion = dynamic(() => import("framer-motion").then(mod => mod), { ssr: false })

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Create motion components with client-side only rendering
  const MotionDiv = motion.div

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "bg-black/80 backdrop-blur-md py-3 shadow-lg" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="text-white font-bold text-xl flex items-center gap-2 group">
          <div className="relative h-9 w-9 overflow-hidden">
            <Image 
              src="/material/header/logo.svg" 
              alt="InMyEyes Logo" 
              fill 
              className="object-contain transition-transform duration-500 group-hover:scale-110"
            />
          </div>
          <span className="font-bold tracking-tight text-gradient">InMyEyes</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-10">
          {[
            { name: "Home", path: "/" },
            { name: "Gallery", path: "/gallery" },
            { name: "Contact", path: "/contact" }
          ].map((item) => (
            <Link 
              key={item.path}
              href={item.path} 
              className="group relative flex items-center"
            >
              <span className={`text-white text-sm font-medium tracking-wide uppercase transition-colors hover:text-white/90 py-2 ${
                pathname === item.path ? 'opacity-100' : 'opacity-75 hover:opacity-100'
              }`}>
                {item.name}
              </span>
              {pathname === item.path && (
                <div
                  className="absolute bottom-0 left-0 w-full h-[2px] bg-white"
                />
              )}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <Button variant="ghost" size="icon" className="md:hidden text-white" onClick={() => setIsMenuOpen(true)}>
          <Menu className="h-6 w-6" />
          <span className="sr-only">Open menu</span>
        </Button>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div 
            className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex flex-col"
          >
            <div className="flex justify-between items-center p-5">
              <Link href="/" className="text-white font-bold text-xl flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
                <div className="relative h-8 w-8">
                  <Image 
                    src="/material/header/logo.svg" 
                    alt="InMyEyes Logo" 
                    fill 
                    className="object-contain"
                  />
                </div>
                <span className="font-bold tracking-tight text-gradient">InMyEyes</span>
              </Link>
              <Button variant="ghost" size="icon" className="text-white" onClick={() => setIsMenuOpen(false)}>
                <X className="h-6 w-6" />
                <span className="sr-only">Close menu</span>
              </Button>
            </div>
            <nav className="flex flex-col items-center justify-center flex-1 space-y-10">
              {[
                { name: "Home", path: "/" },
                { name: "Gallery", path: "/gallery" },
                { name: "Contact", path: "/contact" }
              ].map((item, index) => (
                <div
                  key={item.path}
                >
                  <Link 
                    href={item.path} 
                    className={`text-white text-2xl tracking-wide ${pathname === item.path ? 'text-white font-medium' : 'text-white/60 hover:text-white'}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </div>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
