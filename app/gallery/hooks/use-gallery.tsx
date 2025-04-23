"use client";

import { useState, useEffect } from "react";
import { ImageItem } from "@/lib/types";
import { favoritesService } from "@/lib/services/favorites-service";

export interface GalleryState {
  images: ImageItem[];
  isLoading: boolean;
  error: string | null;
  viewMode: "grid" | "masonry";
  selectedImage: ImageItem | null;
  selectedIndex: number;
  favorites: number[];
  showInfo: boolean;
}

export function useGallery() {
  const [state, setState] = useState<GalleryState>({
    images: [],
    isLoading: true,
    error: null,
    viewMode: "masonry",
    selectedImage: null,
    selectedIndex: -1,
    favorites: [],
    showInfo: false
  });

  // Load images from API
  useEffect(() => {
    async function fetchImages() {
      try {
        const response = await fetch("/api/images");
        
        if (!response.ok) {
          throw new Error(`Failed to fetch images: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Transform the API response to match our ImageItem type
        const transformedImages = data.images.map((img: any) => ({
          id: parseInt(img.id.replace("img-", "")),
          url: img.src,
          alt: img.alt,
          aspect: img.aspectRatio,
          title: img.fileName.replace(/\.\w+$/, ''),
          width: img.aspectRatio === "landscape" ? 1600 : img.aspectRatio === "portrait" ? 800 : 1000,
          height: img.aspectRatio === "landscape" ? 900 : img.aspectRatio === "portrait" ? 1200 : 1000,
        }));
        
        // Randomly shuffle the images
        const shuffledImages = [...transformedImages].sort(() => Math.random() - 0.5);

        // Get favorites from localStorage
        const savedFavorites = favoritesService.getFavoriteIds();
        
        setState(prev => ({
          ...prev,
          images: shuffledImages,
          isLoading: false,
          favorites: savedFavorites,
        }));
        
      } catch (error) {
        console.error("Error fetching gallery images:", error);
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: error instanceof Error ? error.message : "Failed to load gallery images"
        }));
      }
    }

    fetchImages();
  }, []);

  // Toggle favorite status
  const toggleFavorite = (imageId: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    
    const wasFavorited = favoritesService.toggleFavorite(imageId);
    const updatedFavorites = favoritesService.getFavoriteIds();
    
    setState(prev => ({
      ...prev,
      favorites: updatedFavorites
    }));
    
    return wasFavorited;
  };

  // Set selected image and index
  const selectImage = (image: ImageItem, index: number) => {
    setState(prev => ({
      ...prev,
      selectedImage: image,
      selectedIndex: index
    }));
  };

  // Close image modal
  const closeImageModal = () => {
    setState(prev => ({
      ...prev,
      selectedImage: null,
      selectedIndex: -1,
      showInfo: false
    }));
  };

  // Toggle image info display
  const toggleImageInfo = () => {
    setState(prev => ({
      ...prev,
      showInfo: !prev.showInfo
    }));
  };

  // Navigate between images
  const navigateImage = (direction: 'next' | 'prev') => {
    if (!state.selectedImage || state.images.length === 0) return;
    
    const currentIndex = state.selectedIndex;
    const newIndex = direction === 'next' 
      ? (currentIndex + 1) % state.images.length 
      : (currentIndex - 1 + state.images.length) % state.images.length;
    
    setState(prev => ({
      ...prev,
      selectedImage: state.images[newIndex],
      selectedIndex: newIndex
    }));
  };

  // Switch between grid and masonry view
  const setViewMode = (mode: "grid" | "masonry") => {
    setState(prev => ({
      ...prev,
      viewMode: mode
    }));
  };

  return {
    state,
    toggleFavorite,
    selectImage,
    closeImageModal,
    toggleImageInfo,
    navigateImage,
    setViewMode
  };
}