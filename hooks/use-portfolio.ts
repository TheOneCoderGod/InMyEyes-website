"use client";

import { useState, useEffect, useCallback } from "react";
import { useFavorites } from "./use-favorites";
import { useScroll } from "./use-scroll";

// Define the types we need for the portfolio
export type PortfolioViewMode = "grid" | "masonry" | "collage";

// ImageItem interface specific to the portfolio requirements
export interface PortfolioImage {
  fileName: string;
  width: number;
  height: number;
  aspectRatio?: "portrait" | "landscape" | "square";
}

export function usePortfolio() {
  // Image states
  const [images, setImages] = useState<PortfolioImage[]>([]);
  const [displayedImages, setDisplayedImages] = useState<PortfolioImage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Selection state
  const [selectedImage, setSelectedImage] = useState<PortfolioImage | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [showInfo, setShowInfo] = useState<boolean>(false);
  
  // View mode state - updated default to "collage" to match the new design in the image
  const [viewMode, setViewMode] = useState<PortfolioViewMode>("collage");
  
  // Get scroll position
  const { scrollPosition } = useScroll();
  
  // Use existing favorites hook - make sure we get all necessary functions
  const { 
    favorites,
    toggleFavorite, 
    addFavorite,
    removeFavorite,
    isFavorite, 
    clearFavorites 
  } = useFavorites();

  // Function to shuffle images array
  const shuffleImages = useCallback(() => {
    if (!images.length) return;
    
    // Create a copy of the images array and shuffle it
    const shuffled = [...images].sort(() => Math.random() - 0.5);
    setDisplayedImages(shuffled);
    
    // Reset selection when shuffling
    if (selectedImage) {
      setSelectedImage(null);
      setSelectedIndex(-1);
      setShowInfo(false);
    }
  }, [images, selectedImage]);
  
  // Update the setViewMode function to also shuffle images when changing views
  const handleViewModeChange = useCallback((mode: PortfolioViewMode) => {
    if (mode !== viewMode) {
      setViewMode(mode);
      shuffleImages();
    }
  }, [viewMode, shuffleImages]);

  // Fetch images from API
  const fetchImages = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch("/api/portfolio");
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      
      // Process images to add aspect ratio
      const processedImages = data.map((img: PortfolioImage) => {
        const ratio = img.width / img.height;
        let aspectRatio: "portrait" | "landscape" | "square";
        
        if (ratio < 0.9) {
          aspectRatio = "portrait";
        } else if (ratio > 1.1) {
          aspectRatio = "landscape";
        } else {
          aspectRatio = "square";
        }
        
        return {
          ...img,
          aspectRatio
        };
      });
      
      // Shuffle the processed images before setting them
      const shuffled = [...processedImages].sort(() => Math.random() - 0.5);
      
      setImages(processedImages); // Keep original order in main state
      setDisplayedImages(shuffled); // Set shuffled version for display
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch portfolio images');
      console.error('Portfolio fetch error:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Select an image to view
  const selectImage = useCallback((image: PortfolioImage, index: number) => {
    setSelectedImage(image);
    setSelectedIndex(index);
  }, []);

  // Close the selected image
  const closeImage = useCallback(() => {
    setSelectedImage(null);
    setSelectedIndex(-1);
    setShowInfo(false);
  }, []);

  // Navigate between images in gallery
  const navigateImage = useCallback((direction: "next" | "prev") => {
    if (displayedImages.length === 0) return;
    
    // Directly calculate the new index without an unnecessary assignment
    const newIndex = direction === "next"
      ? (selectedIndex < displayedImages.length - 1 ? selectedIndex + 1 : 0)
      : (selectedIndex > 0 ? selectedIndex - 1 : displayedImages.length - 1);
    
    setSelectedIndex(newIndex);
    setSelectedImage(displayedImages[newIndex]);
  }, [displayedImages, selectedIndex]);
  
  // Toggle image information display
  const toggleInfo = useCallback(() => {
    setShowInfo(prev => !prev);
  }, []);

  // Fetch images on mount
  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  return {
    // State
    images: displayedImages, // Use shuffled images for display
    isLoading,
    error,
    selectedImage,
    selectedIndex,
    viewMode,
    showInfo,
    scrollPosition,
    favorites,
    
    // Actions
    fetchImages,
    setViewMode: handleViewModeChange, // Use our enhanced function instead
    shuffleImages, // Expose shuffle function
    selectImage,
    closeImage,
    navigateImage,
    toggleInfo,
    toggleFavorite,
    addFavorite,
    removeFavorite,
    isFavorite,
    clearFavorites
  };
}