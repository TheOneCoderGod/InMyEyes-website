import Link from "next/link"
import Image from "next/image"
import { Instagram, ExternalLink } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-16 pb-10 px-6 border-t border-zinc-800/50">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center justify-center space-y-12">
          {/* Brand Section */}
          <div className="flex flex-col items-center text-center">
            <div className="relative h-16 w-16 overflow-hidden mb-6">
              <Image 
                src="/material/header/logo.svg" 
                alt="InMyEyes Logo" 
                fill 
                className="object-contain" 
              />
            </div>
            <h3 className="text-3xl font-semibold tracking-tighter text-white mb-4">InMyEyes</h3>
            <p className="text-white/70 text-lg mb-6">
              Dedicated photographer capturing genuine, professional moments you can trust.
            </p>
            <div className="flex space-x-5 mb-12">
              <Link 
                href="https://www.instagram.com/_.inmyeyes/" 
                target="_blank"
                className="bg-zinc-900 hover:bg-zinc-800 transition-colors p-4 rounded-full"
              >
                <Instagram className="h-6 w-6 text-white" />
                <span className="sr-only">Instagram</span>
              </Link>
          
              <Link 
                href="https://linktr.ee/_.inmyeyes"
                target="_blank"
                className="bg-zinc-900 hover:bg-zinc-800 transition-colors p-4 rounded-full"
              >
                <ExternalLink className="h-6 w-6 text-white" />
                <span className="sr-only">Linktree</span>
              </Link>
            </div>
          </div>

          {/* Navigation Section */}
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-6 tracking-wide text-white/90">Navigation</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/" className="text-white/70 hover:text-white transition-colors duration-200 text-lg">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-white/70 hover:text-white transition-colors duration-200 text-lg">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white/70 hover:text-white transition-colors duration-200 text-lg">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-6 tracking-wide text-white/90">Get in Touch</h3>
            <p className="text-white/70 mb-4 text-lg">
              Have a project in mind? Let's create something amazing together.
            </p>
            <Link 
              href="/contact" 
              className="inline-flex items-center justify-center px-8 py-3 border border-white/20 rounded-full text-white hover:bg-white/10 transition-colors text-lg"
            >
              Contact Me
            </Link>
          </div>
        </div>

        {/* Footer Divider and Copyright */}
        <div className="border-t border-zinc-800/50 mt-16 pt-8 flex flex-col items-center justify-center">
          <p className="text-white/60 text-sm md:text-base mb-4">© {new Date().getFullYear()} InMyEyes. All rights reserved.</p>
          <p className="text-white/60 text-xs md:text-sm">Photography Portfolio</p>
        </div>
      </div>
    </footer>
  )
}
