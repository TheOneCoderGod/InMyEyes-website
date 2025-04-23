"use client";

import { useEffect, useCallback } from 'react'

interface KeyboardOptions {
  onArrowRight?: () => void;
  onArrowLeft?: () => void;
  onEscape?: () => void;
  onSpace?: () => void;
  onInfo?: () => void;
  enabled?: boolean;
}

/**
 * Custom hook for keyboard navigation
 * 
 * @param options Configuration for keyboard shortcuts
 */
export function useKeyboardNavigation({
  onArrowRight,
  onArrowLeft,
  onEscape,
  onSpace,
  onInfo,
  enabled = true
}: KeyboardOptions) {
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowRight':
          if (onArrowRight) {
            e.preventDefault();
            onArrowRight();
          }
          break;
        case 'ArrowLeft':
          if (onArrowLeft) {
            e.preventDefault();
            onArrowLeft();
          }
          break;
        case 'Escape':
          if (onEscape) {
            e.preventDefault();
            onEscape();
          }
          break;
        case ' ':
          if (onSpace) {
            e.preventDefault();
            onSpace();
          }
          break;
        case 'i':
        case 'I':
          if (onInfo) {
            e.preventDefault();
            onInfo();
          }
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [enabled, onArrowRight, onArrowLeft, onEscape, onSpace, onInfo]);
}

/**
 * Hook for handling keyboard shortcuts throughout the application
 * @param key The key to listen for (e.g., "Escape", "ArrowUp")
 * @param callback The function to call when the key is pressed
 * @param deps Optional dependencies array for the useEffect
 */
export function useKeyboardShortcut(
  key: string | string[], 
  callback: (e: KeyboardEvent) => void,
  deps: any[] = []
) {
  const keys = Array.isArray(key) ? key : [key]
  
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (keys.includes(e.key)) {
        callback(e)
      }
    },
    [keys, callback, ...deps]
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown])
}

/**
 * Hook for handling multiple keyboard shortcuts
 * @param shortcuts An object mapping key names to callback functions
 * @param deps Optional dependencies array for the useEffect
 */
export function useKeyboardShortcuts(
  shortcuts: Record<string, (e: KeyboardEvent) => void>,
  deps: any[] = []
) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const callback = shortcuts[e.key]
      if (callback) {
        callback(e)
      }
    },
    [shortcuts, ...deps]
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown])
}

/**
 * Hook to handle keyboard shortcuts
 * @param handlers Object mapping key names to handler functions
 */
export function useKeyboard(handlers: KeyHandlers) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const handler = handlers[e.key];
      if (handler) {
        handler();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlers]);
}