/**
 * Central configuration for theme settings
 */
export const themeConfig = {
  name: 'InMyEyes',
  logo: {
    src: '/material/header/logo.svg',
    alt: 'InMyEyes Photography Logo'
  },
  // Color palette
  colors: {
    primary: {
      light: "#d1fae5",
      DEFAULT: "#10b981",
      dark: "#065f46"
    },
    secondary: {
      light: "#bae6fd",
      DEFAULT: "#0284c7",
      dark: "#075985"
    },
    accent: {
      light: "#e9d5ff", 
      DEFAULT: "#a855f7",
      dark: "#7e22ce"
    },
    background: {
      light: "#ffffff",
      DEFAULT: "#f8fafc",
      dark: "#0f172a"
    },
    text: {
      light: "#64748b",
      DEFAULT: "#334155",
      dark: "#f8fafc"
    }
  },
  
  // Typography
  fonts: {
    sans: 'Inter, system-ui, sans-serif',
    serif: 'Merriweather, Georgia, serif',
    mono: 'JetBrains Mono, monospace',
    heading: 'Montserrat, sans-serif',
    body: 'Inter, sans-serif',
  },
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
    '6xl': '3.75rem',
  },
  
  // Layout
  container: {
    padding: {
      DEFAULT: '1rem',
      sm: '2rem',
      lg: '4rem',
      xl: '5rem',
      '2xl': '6rem',
    },
    maxWidth: {
      DEFAULT: '1280px',
      narrow: '768px',
      wide: '1536px',
    },
  },
  
  // Breakpoints
  breakpoints: {
    mobile: 640,
    tablet: 768,
    laptop: 1024,
    desktop: 1280,
    widescreen: 1536,
  },
  
  // Animation
  animation: {
    duration: {
      fast: '150ms',
      DEFAULT: '300ms',
      slow: '500ms',
      slower: '700ms',
      slowest: '1000ms',
    },
    easing: {
      DEFAULT: 'cubic-bezier(0.4, 0, 0.2, 1)',
      linear: 'linear',
      in: 'cubic-bezier(0.4, 0, 1, 1)',
      out: 'cubic-bezier(0, 0, 0.2, 1)',
      inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },
  
  // Gallery specific settings
  galleries: {
    grid: {
      gap: 'gap-4',
      padding: 'p-4',
      columns: {
        mobile: 2,
        tablet: 3,
        desktop: 4
      },
      aspectRatio: {
        DEFAULT: '4/3',
        landscape: '16/9',
        portrait: '3/4',
        square: '1/1',
      },
    },
    masonry: {
      gap: 'gap-4',
      padding: 'p-4',
      columns: {
        mobile: 2,
        tablet: 3,
        desktop: 4
      },
    },
    modal: {
      backdropBlur: 'backdrop-blur-md',
      padding: 'p-4 md:p-8',
      background: 'bg-black/90',
      textColor: 'text-white',
    }
  },
  
  // Spacing
  spacing: {
    px: '1px',
    0: '0px',
    0.5: '0.125rem',
    1: '0.25rem',
    1.5: '0.375rem',
    2: '0.5rem',
    2.5: '0.625rem',
    3: '0.75rem',
    3.5: '0.875rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    7: '1.75rem',
    8: '2rem',
    9: '2.25rem',
    10: '2.5rem',
    11: '2.75rem',
    12: '3rem',
    14: '3.5rem',
    16: '4rem',
    20: '5rem',
    24: '6rem',
    28: '7rem',
    32: '8rem',
    36: '9rem',
    40: '10rem',
    44: '11rem',
    48: '12rem',
    52: '13rem',
    56: '14rem',
    60: '15rem',
    64: '16rem',
    72: '18rem',
    80: '20rem',
    96: '24rem',
  },
  
  // Shadows
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
    none: 'none',
  },
  
  // Border radius
  radii: {
    none: '0px',
    sm: '0.125rem',
    DEFAULT: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    '3xl': '1.5rem',
    full: '9999px',
  },
  
  // Z-index
  zIndex: {
    0: '0',
    10: '10',
    20: '20',
    30: '30',
    40: '40',
    50: '50',
    auto: 'auto',
  },
  socialMedia: {
    instagram: 'https://www.instagram.com/_.inmyeyes/',
    linkTree: 'https://linktr.ee/_.inmyeyes',
  }
}