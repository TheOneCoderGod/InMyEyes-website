"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { 
  Dialog, 
  DialogContent,
  DialogOverlay
} from "@/components/ui/dialog";
import { Heart, ChevronLeft, ChevronRight, X, Info } from "lucide-react";
import { useKeyboard } from "@/hooks/use-keyboard";
import { ImageItem } from "@/lib/types";

interface LightboxProps {
  image: ImageItem;
  showInfo: boolean;
  toggleInfo: () => void;
  onClose: () => void;
  onNavigate: (direction: "next" | "prev") => void;
  isFavorite: boolean;
  toggleFavorite: () => void;
}

export function Lightbox({
  image,
  showInfo,
  toggleInfo,
  onClose,
  onNavigate,
  isFavorite,
  toggleFavorite
}: LightboxProps) {
  // Register keyboard shortcuts
  useKeyboard({
    Escape: onClose,
    ArrowLeft: () => onNavigate("prev"),
    ArrowRight: () => onNavigate("next"),
    i: toggleInfo
  });

  // Handle click events and prevent propagation
  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  // Calculate the aspect ratio class
  const getAspectRatioClass = () => {
    if (!image.width || !image.height) return "aspect-video";
    
    const ratio = image.width / image.height;
    if (ratio < 0.9) return "aspect-[2/3]";
    if (ratio > 1.1) return "aspect-[16/9]";
    return "aspect-square";
  };

  return (
    <Dialog open={true} onOpenChange={() => onClose()}>
      <DialogOverlay className="bg-black/95 backdrop-blur-md" />
      <DialogContent 
        className="max-w-[95vw] max-h-[95vh] border-none bg-transparent p-0 shadow-none"
        onPointerDown={handleContentClick}
      >
        <div className="relative flex flex-col h-[95vh] w-full">
          {/* Close button */}
          <button 
            className="absolute top-4 right-4 z-50 p-2 bg-black/50 rounded-full hover:bg-black/80 transition-colors"
            onClick={onClose}
          >
            <X className="h-6 w-6 text-white" />
          </button>

          {/* Previous button */}
          <button 
            className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-2 bg-black/50 rounded-full hover:bg-black/80 transition-colors"
            onClick={() => onNavigate("prev")}
          >
            <ChevronLeft className="h-6 w-6 text-white" />
          </button>

          {/* Next button */}
          <button 
            className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-2 bg-black/50 rounded-full hover:bg-black/80 transition-colors"
            onClick={() => onNavigate("next")}
          >
            <ChevronRight className="h-6 w-6 text-white" />
          </button>

          {/* Favorite toggle */}
          <button 
            className="absolute top-4 left-4 z-50 p-2 bg-black/50 rounded-full hover:bg-black/80 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite();
            }}
          >
            <Heart 
              className="h-6 w-6 text-white" 
              fill={isFavorite ? "red" : "none"} 
              stroke={isFavorite ? "none" : "currentColor"}
            />
          </button>

          {/* Info button */}
          <button 
            className="absolute top-4 left-16 z-50 p-2 bg-black/50 rounded-full hover:bg-black/80 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              toggleInfo();
            }}
          >
            <Info className="h-6 w-6 text-white" />
          </button>

          {/* Main image */}
          <div className="flex-1 flex items-center justify-center overflow-hidden">
            <div className="relative w-full h-full flex items-center justify-center">
              <Image
                src={image.url}
                alt={image.alt || "Gallery image"}
                width={image.width || 1200}
                height={image.height || 800}
                className="object-contain max-h-full"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
              />
            </div>
          </div>

          {/* Info drawer */}
          <AnimatePresence>
            {showInfo && (
              <motion.div 
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm p-4 text-white"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-medium">
                    {image.fileName || "Image details"}
                  </h3>
                  <button 
                    onClick={toggleInfo}
                    className="p-1 hover:bg-white/10 rounded-full"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                
                <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
                  <div>
                    <span className="text-gray-400">Filename:</span> {image.fileName}
                  </div>
                  <div>
                    <span className="text-gray-400">Dimensions:</span> {image.width}×{image.height}
                  </div>
                  <div>
                    <span className="text-gray-400">Aspect Ratio:</span> {image.aspectRatio || "Unknown"}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
}