"use client"

import { useState, useEffect } from "react"

interface UseMobileOptions {
  mobileWidth?: number
}

export function useMobile({ mobileWidth = 768 }: UseMobileOptions = {}) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      setIsMobile(window.innerWidth < mobileWidth)
    }
    
    // Initial check
    handleResize()
    
    // Add event listener
    window.addEventListener("resize", handleResize)
    
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize)
  }, [mobileWidth])

  return isMobile
}
