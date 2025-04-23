import { ImageItem } from "@/lib/types";
import { imageService } from "./image-service";

/**
 * Service for managing user favorites
 */
export const favoritesService = {
  /**
   * Local storage key for favorites
   */
  STORAGE_KEY: 'inmyeyes-favorites',
  
  /**
   * Maximum number of favorites to store
   */
  MAX_FAVORITES: 50,
  
  /**
   * Get all favorite image IDs from local storage
   */
  getFavoriteIds(): number[] {
    if (typeof window === 'undefined') return [];
    
    try {
      const storedFavorites = localStorage.getItem(this.STORAGE_KEY);
      return storedFavorites ? JSON.parse(storedFavorites) : [];
    } catch (error) {
      console.error('Error getting favorites:', error);
      return [];
    }
  },
  
  /**
   * Save favorite IDs to local storage
   */
  saveFavoriteIds(ids: number[]): void {
    if (typeof window === 'undefined') return;
    
    try {
      // Limit the number of favorites to prevent local storage issues
      const limitedIds = ids.slice(0, this.MAX_FAVORITES);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(limitedIds));
    } catch (error) {
      console.error('Error saving favorites:', error);
    }
  },
  
  /**
   * Add an image ID to favorites
   */
  addFavorite(id: number): void {
    const currentFavorites = this.getFavoriteIds();
    if (!currentFavorites.includes(id)) {
      this.saveFavoriteIds([...currentFavorites, id]);
    }
  },
  
  /**
   * Remove an image ID from favorites
   */
  removeFavorite(id: number): void {
    const currentFavorites = this.getFavoriteIds();
    this.saveFavoriteIds(currentFavorites.filter(favId => favId !== id));
  },
  
  /**
   * Toggle an image ID in favorites
   */
  toggleFavorite(id: number): boolean {
    const currentFavorites = this.getFavoriteIds();
    const isFavorite = currentFavorites.includes(id);
    
    if (isFavorite) {
      this.removeFavorite(id);
      return false;
    } else {
      this.addFavorite(id);
      return true;
    }
  },
  
  /**
   * Check if an image ID is in favorites
   */
  isFavorite(id: number): boolean {
    return this.getFavoriteIds().includes(id);
  },
  
  /**
   * Get all favorite images with full details
   */
  async getFavorites(): Promise<ImageItem[]> {
    const favoriteIds = this.getFavoriteIds();
    if (favoriteIds.length === 0) return [];
    
    try {
      return await imageService.getImagesByIds(favoriteIds);
    } catch (error) {
      console.error('Error fetching favorite images:', error);
      return [];
    }
  },
  
  /**
   * Clear all favorites
   */
  clearFavorites(): void {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.removeItem(this.STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing favorites:', error);
    }
  }
};

/**
 * Service to manage favorite images using localStorage
 */
export const FavoritesService = {
  getFavorites(): string[] {
    if (typeof window === 'undefined') return [];
    
    try {
      const savedFavorites = localStorage.getItem('inmyeyes-favorites');
      return savedFavorites ? JSON.parse(savedFavorites) : [];
    } catch (error) {
      console.error('Error loading favorites:', error);
      return [];
    }
  },
  
  saveFavorite(imageId: string): string[] {
    const currentFavorites = this.getFavorites();
    const newFavorites = [...currentFavorites, imageId];
    localStorage.setItem('inmyeyes-favorites', JSON.stringify(newFavorites));
    return newFavorites;
  },
  
  removeFavorite(imageId: string): string[] {
    const currentFavorites = this.getFavorites();
    const newFavorites = currentFavorites.filter(id => id !== imageId);
    localStorage.setItem('inmyeyes-favorites', JSON.stringify(newFavorites));
    return newFavorites;
  },
  
  toggleFavorite(imageId: string): string[] {
    const currentFavorites = this.getFavorites();
    const isFavorited = currentFavorites.includes(imageId);
    
    return isFavorited 
      ? this.removeFavorite(imageId)
      : this.saveFavorite(imageId);
  }
};