"use client";

import { useState, useCallback, useEffect } from "react"

const FAVORITES_KEY = "inmyeyes-favorites" // Updated to match the specified key from requirements

/**
 * Hook to manage user favorites across the application with local storage persistence
 */
export function useFavorites() {
  const [favorites, setFavorites] = useState<number[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Load favorites from localStorage on mount
  useEffect(() => {
    const loadFavorites = () => {
      try {
        const savedFavorites = localStorage.getItem(FAVORITES_KEY)
        if (savedFavorites) {
          setFavorites(JSON.parse(savedFavorites))
        }
      } catch (error) {
        console.error("Failed to load favorites:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadFavorites()
  }, [])

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    // Skip initial saving when favorites are empty and still loading
    if (isLoading) return
    
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites))
    } catch (error) {
      console.error("Failed to save favorites:", error)
    }
  }, [favorites, isLoading])

  // Toggle an item in favorites (add if not present, remove if present)
  const toggleFavorite = useCallback((id: number) => {
    setFavorites(prev => {
      if (prev.includes(id)) {
        return prev.filter(itemId => itemId !== id)
      } else {
        return [...prev, id]
      }
    })
  }, [])

  // Add an item to favorites if not already present
  const addFavorite = useCallback((id: number) => {
    setFavorites(prev => {
      if (prev.includes(id)) return prev
      return [...prev, id]
    })
  }, [])

  // Remove an item from favorites
  const removeFavorite = useCallback((id: number) => {
    setFavorites(prev => prev.filter(itemId => itemId !== id))
  }, [])

  // Check if an item is in favorites
  const isFavorite = useCallback((id: number) => {
    return favorites.includes(id)
  }, [favorites])

  // Clear all favorites
  const clearFavorites = useCallback(() => {
    setFavorites([])
  }, [])

  return {
    favorites,
    isLoading,
    toggleFavorite,
    addFavorite,
    removeFavorite,
    isFavorite,
    clearFavorites
  }
}