"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { usePortfolio } from "@/hooks/use-portfolio"
import { ChevronUp, Heart, LayoutGrid, Grid3x3, Layout } from "lucide-react"
import { GalleryHero } from "@/components/gallery/GalleryHero"
import { GalleryGrid } from "@/components/gallery/gallery-grid"
import { GalleryMasonry } from "@/components/gallery/gallery-masonry"
import { GalleryCollage } from "@/components/gallery/gallery-collage"
import { GalleryLoader } from "@/components/gallery/gallery-loader"
import { Lightbox } from "@/components/gallery/lightbox"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PageContainer } from "@/components/layout/page-container"

export default function GalleryPage() {
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [isViewChanging, setIsViewChanging] = useState(false)
  
  const {
    images,
    isLoading,
    error,
    selectedImage,
    selectedIndex,
    viewMode,
    showInfo,
    scrollPosition,
    favorites,
    setViewMode,
    selectImage,
    closeImage,
    navigateImage,
    toggleInfo,
    toggleFavorite,
    isFavorite,
    shuffleImages
  } = usePortfolio()

  // Handle scroll effects - only for back to top button
  useEffect(() => {
    setShowBackToTop(scrollPosition > 1000)
  }, [scrollPosition])
  
  // Add an effect to shuffle images on page load/navigation
  useEffect(() => {
    // This will run whenever the page loads or is navigated to
    shuffleImages();
    
    // After images are loaded, ensure they're displayed properly in the current view mode
    const timer = setTimeout(() => {
      if (viewMode === "collage") {
        // Force a re-render of the current view by temporarily switching and reverting back
        setViewMode("grid");
        setTimeout(() => setViewMode("collage"), 50);
      }
    }, 300);
    
    return () => clearTimeout(timer);
    // We're not including shuffleImages in the dependency array to avoid infinite loops
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Scroll to top handler with smooth animation
  const scrollToTop = () => {
    window.scrollTo({ 
      top: 0, 
      behavior: 'smooth' 
    })
  }
  
  // Enhanced view mode change handler with transition state
  const handleViewModeChange = (mode: "grid" | "masonry" | "collage") => {
    if (mode !== viewMode) {
      setIsViewChanging(true)
      // Small delay to allow exit animation to complete
      setTimeout(() => {
        setViewMode(mode)
        setTimeout(() => {
          setIsViewChanging(false)
        }, 300)
      }, 200)
    }
  }

  // Animation variants for content transitions
  const contentVariants = {
    hidden: { 
      opacity: 0,
      y: 20,
      transition: { duration: 0.3, ease: "easeInOut" }
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    },
    exit: { 
      opacity: 0,
      y: -20,
      transition: { duration: 0.3, ease: "easeInOut" }
    }
  }
  
  return (
    <PageContainer showScrollToTop={true} scrollThreshold={800}>
      {/* Pre-loader - 900ms splash */}
      <AnimatePresence>
        {isLoading && (
          <GalleryLoader />
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <GalleryHero />

      {/* Gallery Controls and Content */}
      <section className="w-full bg-black py-16">
        <div className="container mx-auto px-4">
          {/* Gallery Header with Controls - Add animation */}
          <motion.div 
            className="mb-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-2">My Portfolio</h2>
              <p className="text-xl text-gray-400">Browse through my photography collection</p>
            </div>
            
            <div className="flex items-center gap-6">
              {/* Favorites counter */}
              <div className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-red-500" fill={favorites.length > 0 ? "currentColor" : "none"} />
                <span className="text-sm">{favorites.length} favorites</span>
              </div>
              
              {/* View mode toggle */}
              <Tabs 
                value={viewMode} 
                onValueChange={(v) => handleViewModeChange(v as "grid" | "masonry" | "collage")}
                className="border-gray-800 bg-gray-900/50 rounded-lg"
              >
                <TabsList className="h-10 bg-transparent">
                  <TabsTrigger value="grid" className="data-[state=active]:bg-white/10 px-4">
                    <LayoutGrid className="h-5 w-5 mr-2" />
                    Grid
                  </TabsTrigger>
                  <TabsTrigger value="masonry" className="data-[state=active]:bg-white/10 px-4">
                    <Grid3x3 className="h-5 w-5 mr-2" />
                    Masonry
                  </TabsTrigger>
                  <TabsTrigger value="collage" className="data-[state=active]:bg-white/10 px-4">
                    <Layout className="h-5 w-5 mr-2" />
                    Collage
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </motion.div>

          {/* Gallery Content with enhanced transitions */}
          {error ? (
            <div className="text-center py-20">
              <p className="text-red-400">Failed to load gallery images. Please try again.</p>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              {isViewChanging ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full min-h-[300px] flex items-center justify-center"
                >
                  <div className="w-10 h-10 border-2 border-white/20 border-t-white/80 rounded-full animate-spin"></div>
                </motion.div>
              ) : viewMode === "grid" ? (
                <motion.div
                  key="grid"
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <GalleryGrid
                    images={images.map((img, index) => ({
                      ...img,
                      id: index,
                      url: `/material/portfolio/${img.fileName}`
                    }))}
                    onSelect={(image, index) => selectImage(images[index], index)}
                    isFavorite={(id) => isFavorite(id)}
                    toggleFavorite={toggleFavorite}
                  />
                </motion.div>
              ) : viewMode === "masonry" ? (
                <motion.div
                  key="masonry"
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <GalleryMasonry
                    images={images.map((img, index) => ({
                      ...img,
                      id: index,
                      url: `/material/portfolio/${img.fileName}`
                    }))}
                    onSelect={(image, index) => selectImage(images[index], index)}
                    isFavorite={(id) => isFavorite(id)}
                    toggleFavorite={toggleFavorite}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="collage"
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <GalleryCollage
                    images={images.map((img, index) => ({
                      ...img,
                      id: index,
                      url: `/material/portfolio/${img.fileName}`
                    }))}
                    onSelect={(image, index) => selectImage(images[index], index)}
                    isFavorite={(id) => isFavorite(id)}
                    toggleFavorite={toggleFavorite}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>
      </section>

      {/* Lightbox Dialog */}
      {selectedImage && (
        <Lightbox
          image={{
            ...selectedImage,
            id: selectedIndex,
            url: `/material/portfolio/${selectedImage.fileName}`
          }}
          showInfo={showInfo}
          toggleInfo={toggleInfo}
          onClose={closeImage}
          onNavigate={navigateImage}
          isFavorite={isFavorite(selectedIndex)}
          toggleFavorite={() => toggleFavorite(selectedIndex)}
        />
      )}
    </PageContainer>
  )
}
