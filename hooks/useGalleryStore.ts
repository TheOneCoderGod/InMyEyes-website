"use client";

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { PortfolioImage } from './use-portfolio';

type GalleryViewMode = "grid" | "masonry";

interface GalleryStore {
  // View state
  viewMode: GalleryViewMode;
  setViewMode: (mode: GalleryViewMode) => void;
  
  // Image selection state
  selectedImage: PortfolioImage | null;
  selectedIndex: number;
  selectImage: (image: PortfolioImage, index: number) => void;
  closeImage: () => void;
  navigateImage: (direction: "next" | "prev", images: PortfolioImage[]) => void;
  
  // UI state
  showInfo: boolean;
  toggleInfo: () => void;
  scrollPosition: number;
  setScrollPosition: (position: number) => void;
  
  // Favorites
  favorites: number[];
  toggleFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
  clearFavorites: () => void;
}

export const useGalleryStore = create<GalleryStore>()(
  persist(
    (set, get) => ({
      // View state
      viewMode: "masonry",
      setViewMode: (mode) => set({ viewMode: mode }),
      
      // Image selection state
      selectedImage: null,
      selectedIndex: -1,
      selectImage: (image, index) => set({ selectedImage: image, selectedIndex: index }),
      closeImage: () => set({ selectedImage: null, selectedIndex: -1 }),
      navigateImage: (direction, images) => {
        const { selectedIndex } = get();
        let newIndex = selectedIndex;
        
        if (direction === "next") {
          newIndex = selectedIndex < images.length - 1 ? selectedIndex + 1 : 0;
        } else {
          newIndex = selectedIndex > 0 ? selectedIndex - 1 : images.length - 1;
        }
        
        set({ 
          selectedIndex: newIndex,
          selectedImage: images[newIndex]
        });
      },
      
      // UI state
      showInfo: false,
      toggleInfo: () => set((state) => ({ showInfo: !state.showInfo })),
      scrollPosition: 0,
      setScrollPosition: (position) => set({ scrollPosition: position }),
      
      // Favorites
      favorites: [],
      toggleFavorite: (id) => set((state) => ({ 
        favorites: state.favorites.includes(id) 
          ? state.favorites.filter((itemId) => itemId !== id) 
          : [...state.favorites, id]
      })),
      isFavorite: (id) => get().favorites.includes(id),
      clearFavorites: () => set({ favorites: [] }),
    }),
    {
      name: "inmyeyes-favorites",
      partialize: (state) => ({ favorites: state.favorites }),
    }
  )
);