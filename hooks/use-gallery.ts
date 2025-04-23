"use client";

import { useState, useEffect, useCallback } from "react";
import { ImageItem } from "@/lib/types";

// Gallery view mode type definition
export type GalleryViewMode = "grid" | "masonry" | "carousel";

// Sort order for gallery items
export type SortOrder = "newest" | "oldest" | "featured";

// Gallery hook options
interface UseGalleryOptions {
  initialViewMode?: GalleryViewMode;
  initialCategory?: string | null;
  initialSortOrder?: SortOrder;
  enableCache?: boolean;
  autoFetch?: boolean;
}

// Gallery hook return type
interface UseGalleryReturn {
  // State
  images: ImageItem[];
  filteredImages: ImageItem[];
  categories: string[];
  isLoading: boolean;
  error: string | null;
  selectedImage: ImageItem | null;
  selectedIndex: number;
  
  // View state
  viewMode: GalleryViewMode;
  activeCategory: string | null;
  sortOrder: SortOrder;
  showInfo: boolean;
  
  // Actions
  fetchImages: () => Promise<void>;
  setViewMode: (mode: GalleryViewMode) => void;
  filterByCategory: (category: string | null) => void;
  sortImages: (order: SortOrder) => void;
  selectImage: (image: ImageItem, index: number) => void;
  closeImage: () => void;
  navigateImage: (direction: "next" | "prev") => void;
  toggleInfo: () => void;
  refreshGallery: () => void;
}

/**
 * Enhanced gallery hook with improved performance and features
 */
export function useGallery(options: UseGalleryOptions = {}): UseGalleryReturn {
  const {
    initialViewMode = "masonry",
    initialCategory = null,
    initialSortOrder = "newest",
    enableCache = true,
    autoFetch = true
  } = options;

  // Main state
  const [images, setImages] = useState<ImageItem[]>([]);
  const [filteredImages, setFilteredImages] = useState<ImageItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // View state
  const [viewMode, setViewMode] = useState<GalleryViewMode>(initialViewMode);
  const [activeCategory, setActiveCategory] = useState<string | null>(initialCategory);
  const [sortOrder, setSortOrder] = useState<SortOrder>(initialSortOrder);
  
  // Selection state
  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [showInfo, setShowInfo] = useState<boolean>(false);

  // Fetch images from API
  const fetchImages = useCallback(async () => {
    if (enableCache && images.length > 0) {
      return; // Use cached images if available
    }

    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch("/api/images");
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      const fetchedImages = data.images || [];

      setImages(fetchedImages);
      applyFiltersAndSort(fetchedImages, activeCategory, sortOrder);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch images');
      console.error('Gallery fetch error:', err);
    } finally {
      setIsLoading(false);
    }
  }, [activeCategory, enableCache, images.length, sortOrder]);

  // Apply filters and sorting to images
  const applyFiltersAndSort = useCallback((
    imagesList: ImageItem[], 
    category: string | null, 
    order: SortOrder
  ) => {
    // Apply category filter if selected
    let result = [...imagesList];
    
    if (category) {
      result = result.filter(img => img.category === category);
    }
    
    // Apply sorting
    switch (order) {
      case "newest":
        result.sort((a, b) => {
          // If timestamp exists, use it, otherwise use ID as fallback
          const timeA = a.timestamp ? new Date(a.timestamp).getTime() : a.id;
          const timeB = b.timestamp ? new Date(b.timestamp).getTime() : b.id;
          return timeB - timeA;
        });
        break;
      case "oldest":
        result.sort((a, b) => {
          const timeA = a.timestamp ? new Date(a.timestamp).getTime() : a.id;
          const timeB = b.timestamp ? new Date(b.timestamp).getTime() : b.id;
          return timeA - timeB;
        });
        break;
      case "featured":
        result.sort((a, b) => {
          // Featured images first
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          // Then by ID
          return a.id - b.id;
        });
        break;
    }
    
    setFilteredImages(result);
  }, []);

  // Filter images by category
  const filterByCategory = useCallback((category: string | null) => {
    setActiveCategory(category);
    applyFiltersAndSort(images, category, sortOrder);
  }, [applyFiltersAndSort, images, sortOrder]);

  // Change sorting order
  const sortImages = useCallback((order: SortOrder) => {
    setSortOrder(order);
    applyFiltersAndSort(images, activeCategory, order);
  }, [activeCategory, applyFiltersAndSort, images]);

  // Select an image to view
  const selectImage = useCallback((image: ImageItem, index: number) => {
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
    if (filteredImages.length === 0) return;
    
    let newIndex = selectedIndex;
    
    if (direction === "next") {
      newIndex = selectedIndex < filteredImages.length - 1 ? selectedIndex + 1 : 0;
    } else {
      newIndex = selectedIndex > 0 ? selectedIndex - 1 : filteredImages.length - 1;
    }
    
    setSelectedIndex(newIndex);
    setSelectedImage(filteredImages[newIndex]);
  }, [filteredImages, selectedIndex]);
  
  // Toggle image information display
  const toggleInfo = useCallback(() => {
    setShowInfo(prev => !prev);
  }, []);
  
  // Refresh gallery data
  const refreshGallery = useCallback(() => {
    // Clear cache by resetting images
    setImages([]);
    fetchImages();
  }, [fetchImages]);

  // Effect to fetch images on mount if autoFetch is enabled
  useEffect(() => {
    if (autoFetch) {
      fetchImages();
    }
  }, [autoFetch, fetchImages]);

  // Extract unique categories
  const categories = [...new Set(images.map(img => img.category).filter(Boolean))] as string[];

  return {
    // State
    images,
    filteredImages,
    categories,
    isLoading,
    error,
    selectedImage,
    selectedIndex,
    
    // View state
    viewMode,
    activeCategory,
    sortOrder,
    showInfo,
    
    // Actions
    fetchImages,
    setViewMode,
    filterByCategory,
    sortImages,
    selectImage,
    closeImage,
    navigateImage,
    toggleInfo,
    refreshGallery
  };
}