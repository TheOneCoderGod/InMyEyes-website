"use client";

import { useState, useEffect } from "react";

/**
 * Hook to track scroll position
 */
export function useScroll() {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    // Add event listener
    window.addEventListener("scroll", handleScroll);

    // Call handler right away to get initial position
    handleScroll();

    // Remove event listener on cleanup
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return { scrollPosition };
}

/**
 * Hook that triggers callback when scrolling to specific element
 * @param elementId - The ID of the element to track
 * @param offset - Optional offset in pixels, defaults to 0
 * @param callback - Function to call when element is reached
 */
export function useScrollToElement(
  elementId: string,
  offset: number = 0,
  callback: (isVisible: boolean) => void
): void {
  useEffect(() => {
    const element = document.getElementById(elementId);
    if (!element) return;

    const handleScroll = () => {
      const rect = element.getBoundingClientRect();
      const isVisible = rect.top <= window.innerHeight - offset;
      callback(isVisible);
    };

    // Check initial state
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [elementId, offset, callback]);
}

/**
 * Hook that provides scroll direction information
 * @returns Object containing isScrollingUp, isScrollingDown, and scrollDelta
 */
export function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState({
    isScrollingUp: false,
    isScrollingDown: false,
    scrollDelta: 0
  });

  const [lastScrollTop, setLastScrollTop] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const delta = scrollTop - lastScrollTop;

      setScrollDirection({
        isScrollingUp: delta < 0,
        isScrollingDown: delta > 0,
        scrollDelta: delta
      });

      setLastScrollTop(scrollTop);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollTop]);

  return scrollDirection;
}