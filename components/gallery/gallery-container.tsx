"use client"

import { useState, useEffect } from "react"
import { ImageItem } from "@/lib/types"
import { useGallery } from "@/hooks/use-gallery"
import { useFavorites } from "@/hooks/use-favorites"
import { GalleryHeader } from "./gallery-header"
import { GalleryGrid } from "./gallery-grid"
import { GalleryLoader } from "./gallery-loader"
import { ImageModal } from "./image-modal"
import { SectionContainer } from "@/components/common/section-container"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"

interface GalleryContainerProps {
  initialImages?: ImageItem[]
  title?: string
  description?: string
  backgroundImage?: string
  className?: string
}

/**
 * Main gallery container component that combines all gallery features
 * Includes header, filtering, view modes, image grid, and modal viewer
 */
export function GalleryContainer({
  initialImages,
  title,
  description,
  backgroundImage,
  className
}: GalleryContainerProps) {
  // Use the gallery hook for state management
  const {
    images,
    filteredImages,
    categories,
    isLoading, 
    error,
    viewMode,
    activeCategory,
    sortOrder,
    selectedImage,
    selectedIndex,
    showInfo,
    setViewMode,
    filterByCategory,
    sortImages,
    selectImage,
    closeImage,
    navigateImage,
    toggleInfo,
    fetchImages,
    refreshGallery
  } = useGallery({
    autoFetch: !initialImages,
    initialViewMode: "masonry"
  })
  
  // Use favorites hook
  const { favorites, toggleFavorite } = useFavorites()
  
  // Set initial images if provided
  useEffect(() => {
    if (initialImages && initialImages.length > 0) {
      // TODO: Update gallery with initial images
    }
  }, [initialImages])

  // Show error state if there's an issue
  if (error) {
    return (
      <div className="py-16 text-center">
        <p className="text-red-500 mb-4">Error: {error}</p>
        <Button 
          onClick={refreshGallery}
          variant="outline"
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Retry
        </Button>
      </div>
    )
  }
  
  return (
    <div className={className}>
      {/* Gallery Header with Filters */}
      <GalleryHeader
        title={title}
        description={description}
        backgroundImage={backgroundImage}
        categories={categories}
        activeCategory={activeCategory}
        viewMode={viewMode}
        onCategoryChange={filterByCategory}
        onViewModeChange={setViewMode}
        onSortChange={sortImages}
      />
      
      {/* Main Gallery Content */}
      <SectionContainer className="py-10">
        {isLoading ? (
          <GalleryLoader viewMode={viewMode} />
        ) : (
          <GalleryGrid
            images={filteredImages}
            favorites={favorites}
            viewMode={viewMode}
            onSelectImage={selectImage}
            onToggleFavorite={toggleFavorite}
          />
        )}
        
        {!isLoading && filteredImages.length === 0 && (
          <div className="py-16 text-center">
            <p className="text-gray-500 dark:text-gray-400">
              No images found{activeCategory ? ` in ${activeCategory}` : ''}
            </p>
            {activeCategory && (
              <Button 
                onClick={() => filterByCategory(null)}
                variant="outline"
                className="mt-4"
              >
                View All Images
              </Button>
            )}
          </div>
        )}
      </SectionContainer>
      
      {/* Image Modal */}
      <ImageModal
        image={selectedImage}
        isOpen={!!selectedImage}
        onClose={closeImage}
        onNext={() => navigateImage("next")}
        onPrevious={() => navigateImage("prev")}
        onToggleFavorite={toggleFavorite}
        isFavorite={selectedImage ? favorites.includes(selectedImage.id) : false}
        showInfo={showInfo}
        onToggleInfo={toggleInfo}
      />
    </div>
  )
}