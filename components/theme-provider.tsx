'use client'

import * as React from 'react'
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from 'next-themes'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [mounted, setMounted] = React.useState(false)

  // Only render the theme provider after mounting on the client
  // This prevents hydration mismatches between server and client
  React.useEffect(() => {
    setMounted(true)
  }, [])

  // While not mounted, maintain the same structure but without any theming applied
  // This ensures the HTML structure matches between server and client
  if (!mounted) {
    return <>{children}</>
  }

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
