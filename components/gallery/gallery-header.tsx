"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { 
  Grid2X2, 
  LayoutGrid, 
  Rows3, 
  Clock, 
  ArrowDownAZ, 
  ChevronDown,
  ImagePlus,
  SlidersHorizontal
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Tabs,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { BackgroundImage } from "@/components/ui/image/background-image"
import { MotionWrapper } from "@/components/animations/motion-wrapper"
import { GradientHeading } from "@/components/common/gradient-heading"
import { GalleryViewMode, SortOrder } from "@/hooks/use-gallery"

interface GalleryHeaderProps {
  title?: string
  description?: string
  backgroundImage?: string
  categories: string[]
  activeCategory: string | null
  viewMode: GalleryViewMode
  onCategoryChange: (category: string | null) => void
  onViewModeChange: (mode: GalleryViewMode) => void
  onSortChange: (order: SortOrder) => void
  className?: string
}

/**
 * Enhanced gallery header component with improved visuals and interaction
 */
export function GalleryHeader({
  title = "Photography Gallery",
  description = "A collection of my best photographic work",
  backgroundImage = "/material/portfolio/DSC_0025.jpg",
  categories = [],
  activeCategory,
  viewMode,
  onCategoryChange,
  onViewModeChange,
  onSortChange,
  className
}: GalleryHeaderProps) {
  // Track dropdown open state
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false)
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false)
  
  // Reference to the header section for parallax effects
  const headerRef = useRef<HTMLDivElement>(null)
  
  // Show max 5 categories in main tabs, rest go to dropdown
  const visibleCategories = categories.slice(0, 5)
  const additionalCategories = categories.length > 5 ? categories.slice(5) : []
  
  // Framer motion scroll animation values
  const { scrollYProgress } = useScroll({
    target: headerRef,
    offset: ["start start", "end start"]
  })
  
  // Scroll-based animations
  const imageScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1])
  const textOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const textY = useTransform(scrollYProgress, [0, 0.7], [0, -50])
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.7], [0.5, 0.85])

  return (
    <div className={cn("relative", className)}>
      {/* Hero section with parallax background */}
      <div ref={headerRef} className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        {/* Parallax background */}
        <motion.div 
          style={{ 
            scale: imageScale,
          }}
          className="absolute inset-0 w-full h-full z-0"
        >
          <BackgroundImage
            src={backgroundImage}
            alt="Gallery Header"
            objectPosition="center center"
            priority
          />
        </motion.div>

        {/* Overlay with dynamic opacity */}
        <motion.div 
          style={{ opacity: overlayOpacity }}
          className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent z-10"
        />

        {/* Text content */}
        <motion.div 
          style={{ 
            opacity: textOpacity,
            y: textY
          }}
          className="relative h-full flex flex-col justify-center items-center text-center px-4 z-20"
        >
          <MotionWrapper animation="fadeInUp" duration={0.8} className="max-w-4xl">
            <GradientHeading
              as="h1"
              gradient="primary"
              className="text-5xl md:text-7xl font-bold tracking-tighter mb-6"
            >
              {title}
            </GradientHeading>
            
            <p className="text-white/80 text-xl md:text-2xl max-w-2xl mx-auto">
              {description}
            </p>
          </MotionWrapper>
        </motion.div>
      </div>

      {/* Filter and controls section */}
      <div className="sticky top-0 z-30 backdrop-blur-md bg-black/70 border-b border-gray-800">
        <div className="container mx-auto py-4 px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            {/* Categories and filters */}
            <div className="flex-1 flex flex-col md:flex-row items-start md:items-center gap-4">
              {/* Main category tabs */}
              <Tabs 
                value={activeCategory || "all"} 
                className="w-auto"
                onValueChange={(val) => onCategoryChange(val === "all" ? null : val)}
              >
                <TabsList className="bg-black/50">
                  <TabsTrigger value="all">All</TabsTrigger>
                  {visibleCategories.map(category => (
                    <TabsTrigger key={category} value={category} className="capitalize">
                      {category}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
              
              {/* More categories dropdown */}
              {additionalCategories.length > 0 && (
                <DropdownMenu open={filterDropdownOpen} onOpenChange={setFilterDropdownOpen}>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-9">
                      More <ChevronDown className="ml-1 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="bg-black/90 backdrop-blur-lg border-gray-800 text-white">
                    <DropdownMenuLabel>More Categories</DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-gray-800" />
                    {additionalCategories.map(category => (
                      <DropdownMenuItem 
                        key={category}
                        className="capitalize cursor-pointer"
                        onClick={() => onCategoryChange(category)}
                      >
                        {category}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>

            {/* View and sort controls */}
            <div className="flex items-center gap-2 self-end md:self-auto">
              {/* View mode switcher */}
              <Tabs 
                value={viewMode} 
                onValueChange={(val) => onViewModeChange(val as GalleryViewMode)}
                className="mr-2"
              >
                <TabsList className="bg-black/50">
                  <TabsTrigger value="grid" title="Grid View">
                    <Grid2X2 className="h-4 w-4" />
                  </TabsTrigger>
                  <TabsTrigger value="masonry" title="Masonry View">
                    <LayoutGrid className="h-4 w-4" />
                  </TabsTrigger>
                  <TabsTrigger value="carousel" title="Carousel View">
                    <Rows3 className="h-4 w-4" />
                  </TabsTrigger>
                </TabsList>
              </Tabs>
              
              {/* Sort dropdown */}
              <DropdownMenu open={sortDropdownOpen} onOpenChange={setSortDropdownOpen}>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon" className="h-9 w-9">
                    <SlidersHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-black/90 backdrop-blur-lg border-gray-800 text-white">
                  <DropdownMenuLabel>Sort By</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-gray-800" />
                  <DropdownMenuItem onClick={() => onSortChange("newest")}>
                    <Clock className="mr-2 h-4 w-4" /> Newest
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onSortChange("oldest")}>
                    <Clock className="mr-2 h-4 w-4" /> Oldest
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onSortChange("featured")}>
                    <ImagePlus className="mr-2 h-4 w-4" /> Featured
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}