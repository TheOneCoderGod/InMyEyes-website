"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { useScroll } from "@/hooks/use-scroll"
import { cn } from "@/lib/utils"

const navigationItems = [
  { name: "Home", href: "/" },
  { name: "Gallery", href: "/gallery" },
  { name: "Contact", href: "/contact" },
]

/**
 * Main navigation bar component with mobile responsiveness
 * and scroll behavior
 */
export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { scrollY } = useScroll()
  const pathname = usePathname()

  // Handle scroll effects
  useEffect(() => {
    if (scrollY > 50) {
      setIsScrolled(true)
    } else {
      setIsScrolled(false)
    }
  }, [scrollY])

  // Close mobile menu when path changes
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-black/90 backdrop-blur-md shadow-md" : "bg-transparent"
      )}
    >
      {/* Desktop Navigation */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="relative h-8 w-8 mr-3">
              <Image 
                src="/material/header/logo.svg" 
                alt="InMyEyes Logo" 
                fill 
                className="object-contain" 
              />
            </div>
            <span className="text-lg font-semibold">InMyEyes</span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "text-sm transition-colors py-1 border-b-2",
                  pathname === item.href
                    ? "border-white text-white"
                    : "border-transparent text-white/70 hover:text-white hover:border-white/40"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md focus:outline-none"
            aria-expanded={isOpen}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          "md:hidden fixed inset-0 z-40 bg-black transform transition-transform duration-300 ease-in-out pt-16",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <nav className="h-full flex flex-col items-center justify-center space-y-8 p-4">
          {navigationItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "text-xl transition-colors py-2 border-b-2 w-full text-center",
                pathname === item.href
                  ? "border-white text-white"
                  : "border-transparent text-white/70 hover:text-white"
              )} 
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}