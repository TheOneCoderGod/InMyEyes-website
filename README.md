# InMyEyes Photography Portfolio

![InMyEyes Logo](/public/material/header/logo.svg)

**InMyEyes** is a modern, visually stunning photography portfolio website built with Next.js, TypeScript, and Tailwind CSS. It showcases professional photography work with smooth animations, multiple gallery layouts, and a clean user interface.

**Live Demo:** [Link to deployed site - if available]

---

## Table of Contents

1.  [Project Overview](#project-overview)
2.  [Features](#features)
3.  [Tech Stack](#tech-stack)
4.  [Project Structure](#project-structure)
5.  [Getting Started](#getting-started)
    *   [Prerequisites](#prerequisites)
    *   [Installation](#installation)
    *   [Running Locally](#running-locally)
6.  [Available Scripts](#available-scripts)
7.  [Key Components & Hooks](#key-components--hooks)
8.  [API Routes](#api-routes)
9.  [Styling](#styling)
10. [Deployment](#deployment)
11. [License](#license)

---

## Project Overview

This project serves as a digital portfolio for a photographer, providing an elegant platform to display their work. It includes a dynamic gallery with multiple viewing options (Grid, Masonry, Collage), a contact section, and smooth page transitions and animations powered by Framer Motion. The design is responsive and optimized for various screen sizes.

---

## Features

*   **Responsive Design:** Adapts seamlessly to desktop, tablet, and mobile devices.
*   **Next.js App Router:** Utilizes the latest Next.js features for routing and server components.
*   **Multiple Gallery Layouts:** Users can switch between Grid, Masonry, and Collage views.
*   **Image Lightbox:** Full-screen image viewer with navigation and information display.
*   **Favorite System:** Users can mark images as favorites (persisted in local storage).
*   **Smooth Animations:** Engaging animations and transitions using Framer Motion.
*   **Parallax Effects:** Subtle parallax scrolling effects on hero sections.
*   **Dynamic Image Loading:** Images are fetched dynamically from an API route.
*   **Component-Based Architecture:** Built with reusable React components.
*   **TypeScript:** Strong typing for improved code quality and maintainability.
*   **Tailwind CSS:** Utility-first CSS framework for rapid UI development.
*   **Shadcn/ui:** Beautifully designed components built using Radix UI and Tailwind CSS.
*   **SEO Optimized:** Basic metadata and structured data implementation (`lib/metadata.ts`, `lib/seo-config.ts`, `components/structured-data.tsx`).

---

## Tech Stack

*   **Framework:** [Next.js](https://nextjs.org/) (^15.2.4)
*   **Language:** [TypeScript](https://www.typescriptlang.org/) (^5)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/) (^3.4.17) & CSS Modules
*   **UI Components:** [Shadcn/ui](https://ui.shadcn.com/) (built on Radix UI)
*   **Animation:** [Framer Motion](https://www.framer.com/motion/) (^12.7.4)
*   **State Management:** React Context API, `useState`, `useCallback`, potentially Zustand (`hooks/useGalleryStore.ts`)
*   **Linting/Formatting:** ESLint (via Next.js defaults), Prettier (assumed standard)
*   **Package Manager:** pnpm (based on `pnpm-lock.yaml`)

---

## Project Structure

```
InMyEyes/
├── app/                  # Next.js App Router directory
│   ├── api/              # API routes (e.g., /api/portfolio)
│   ├── contact/          # Contact page route group
│   ├── gallery/          # Gallery page route group
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── components/           # Reusable UI components
│   ├── animations/       # Animation related components (e.g., MotionWrapper)
│   ├── common/           # General common components
│   ├── contact/          # Components specific to the Contact page
│   ├── gallery/          # Components specific to the Gallery page
│   ├── home/             # Components specific to the Home page
│   ├── layout/           # Layout components (Navbar, Footer, PageContainer)
│   └── ui/               # Shadcn/ui components
├── hooks/                # Custom React hooks (e.g., usePortfolio, useFavorites)
├── lib/                  # Utility functions, types, configs (SEO, theme)
├── public/               # Static assets (images, fonts, svgs)
│   └── material/         # Project-specific assets (logo, portfolio images)
├── styles/               # Additional global styles (if any beyond app/globals.css)
├── components.json       # Shadcn/ui configuration
├── next-env.d.ts         # Next.js environment types
├── next.config.mjs       # Next.js configuration
├── package.json          # Project dependencies and scripts
├── pnpm-lock.yaml        # PNPM lock file
├── postcss.config.mjs    # PostCSS configuration
├── README.md             # This file
├── tailwind.config.ts    # Tailwind CSS configuration
└── tsconfig.json         # TypeScript configuration
```

*(Note: Some directories like `styles/` might not exist or be empty based on project needs)*

---

## Getting Started

### Prerequisites

*   [Node.js](https://nodejs.org/) (Version >= 18 recommended)
*   [pnpm](https://pnpm.io/) (or npm/yarn, but pnpm is used based on lock file)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd InMyEyes
    ```
2.  **Install dependencies:**
    ```bash
    pnpm install
    ```
    *(If using npm or yarn: `npm install` or `yarn install`)*

### Running Locally

1.  **Start the development server:**
    ```bash
    pnpm dev
    ```
2.  Open your browser and navigate to [http://localhost:3000](http://localhost:3000).

---

## Available Scripts

Based on `package.json`:

*   `pnpm dev`: Starts the Next.js development server.
*   `pnpm build`: Builds the application for production.
*   `pnpm start`: Starts the production server (requires `build` first).
*   `pnpm lint`: Runs the Next.js linter.

---

## Key Components & Hooks

*   **`components/layout/PageContainer.tsx`:** Wraps page content, providing consistent layout and features like the scroll-to-top button.
*   **`components/layout/Navbar.tsx`:** The main navigation bar.
*   **`components/layout/Footer.tsx`:** The site footer.
*   **`components/gallery/GalleryCollage.tsx` / `GalleryGrid.tsx` / `GalleryMasonry.tsx`:** Components rendering the different gallery layouts.
*   **`components/gallery/Lightbox.tsx`:** Modal component for viewing images in full screen.
*   **`components/ui/`:** Various reusable UI elements provided by Shadcn/ui.
*   **`hooks/usePortfolio.ts`:** Custom hook managing gallery state (images, view mode, selection, favorites).
*   **`hooks/useFavorites.ts`:** Custom hook specifically for managing favorite images using localStorage.
*   **`hooks/useScroll.ts`:** Custom hook for tracking scroll position.
*   **`hooks/useGallery.ts`:** Another hook potentially related to gallery state or fetching.
*   **`hooks/useGalleryStore.ts`:** Suggests Zustand might be used for global gallery state.

---

## API Routes

*   **`app/api/portfolio/route.ts`:**
    *   `GET`: Fetches the list of portfolio images from the `public/material/portfolio` directory, potentially including metadata like dimensions.
*   **`app/api/images/route.ts`:**
    *   `GET`: Likely another endpoint for fetching images, possibly with different transformations or filtering.

---

## Styling

*   **Tailwind CSS:** The primary styling method, configured in `tailwind.config.ts`. Utility classes are used directly in components.
*   **Global Styles:** Base styles and resets are defined in `app/globals.css`.
*   **CSS Modules:** Can be used for component-specific styles if needed (though Tailwind is dominant).
*   **`tailwindcss-animate`:** Plugin for integrating Tailwind with animation libraries.

---

## Deployment

This Next.js application is ready for deployment on platforms supporting Node.js.

*   **Vercel:** The recommended platform for deploying Next.js applications. Connect your Git repository for seamless CI/CD.
*   **Other Platforms:** Netlify, AWS Amplify, Docker, Node servers, etc.

Ensure environment variables (if any) are configured correctly on the deployment platform.

---

## License

This project is currently private (`"private": true` in `package.json`). If you intend to make it open source, choose an appropriate license (e.g., MIT, Apache 2.0) and add a `LICENSE` file.

---

*This README was generated on April 23, 2025.*
