"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
// Replace LayoutMasonry with Grid3x3 which is a suitable alternative for masonry layout
import { Heart, LayoutGrid, Grid3x3 } from "lucide-react";
import Image from "next/image";

interface StickyNavProps {
  // Mark the props as readonly
  readonly viewMode: "grid" | "masonry";
  readonly setViewMode: (mode: "grid" | "masonry") => void;
  readonly isVisible: boolean;
  // Keep these for API compatibility but mark them as readonly and optional
  readonly categories?: string[]; 
  readonly activeCategory?: string | null;
  readonly filterByCategory?: (category: string | null) => void;
  readonly favoriteCount?: number;
}

/**
 * Sticky navigation component that appears when scrolling in gallery
 */
export function StickyNav({
  viewMode,
  setViewMode,
  isVisible,
  favoriteCount = 0
}: StickyNavProps) {
  // Handle scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -60, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-lg border-b border-gray-800 shadow-sm"
        >
          <div className="container mx-auto py-2">
            <div className="flex items-center justify-between">
              {/* Logo and title */}
              <div className="flex items-center gap-2">
                <button onClick={scrollToTop} className="flex items-center gap-1.5">
                  <Image 
                    src="/placeholder-logo.png" 
                    alt="In My Eyes" 
                    width={28} 
                    height={28} 
                    className="h-7 w-7 rounded-sm"
                  />
                  <span className="text-lg font-medium text-white">Gallery</span>
                </button>
              </div>

              {/* Right controls */}
              <div className="flex items-center gap-4">
                {/* Favorites count */}
                <div className="flex items-center gap-1.5">
                  <Heart className="h-4 w-4 text-red-500" fill={favoriteCount > 0 ? "currentColor" : "none"} />
                  <span className="text-sm">{favoriteCount}</span>
                </div>
                
                {/* View mode toggle */}
                <Tabs 
                  value={viewMode} 
                  onValueChange={(v) => setViewMode(v as "grid" | "masonry")}
                >
                  <TabsList className="h-8 border border-gray-700 bg-black/50">
                    <TabsTrigger value="grid" className="data-[state=active]:bg-white/10">
                      <LayoutGrid className="h-4 w-4 mr-1" />
                      Grid
                    </TabsTrigger>
                    <TabsTrigger value="masonry" className="data-[state=active]:bg-white/10">
                      <Grid3x3 className="h-4 w-4 mr-1" />
                      Masonry
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}