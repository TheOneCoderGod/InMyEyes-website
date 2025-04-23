"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Heart } from "lucide-react";
import { ImageItem } from "@/lib/types";

interface GalleryMasonryProps {
  images: ImageItem[];
  onSelect: (image: ImageItem, index: number) => void;
  isFavorite: (id: number) => boolean;
  toggleFavorite: (id: number) => void;
}

export function GalleryMasonry({ images, onSelect, isFavorite, toggleFavorite }: GalleryMasonryProps) {
  // Container animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // Item animation variants
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1.0]
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6"
    >
      {images.map((image, index) => {
        // Calculate aspect ratio using actual image dimensions
        const aspectRatio = image.width && image.height ? image.width / image.height : 1;
        
        return (
          <motion.div
            key={`masonry-${image.id}-${index}`}
            variants={itemVariants}
            className="relative break-inside-avoid overflow-hidden rounded-lg mb-6"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            {/* Natural aspect ratio preserved by using aspect ratio for padding */}
            <div 
              className="w-full relative"
              style={{ 
                paddingTop: `${(1 / aspectRatio) * 100}%`,
              }}
            >
              <Image
                src={image.url}
                alt={image.alt || `Gallery image ${index + 1}`}
                fill
                className="object-cover transition-transform duration-700 ease-in-out hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
              
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                {/* Favorite button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(image.id);
                  }}
                  className="absolute top-3 right-3 p-2 rounded-full bg-black/30 hover:bg-black/50 transition-colors"
                >
                  <Heart 
                    className={`h-5 w-5 transition-colors duration-300 ${isFavorite(image.id) ? 'text-red-500' : 'text-white'}`} 
                    fill={isFavorite(image.id) ? "currentColor" : "none"} 
                  />
                </button>
                
                {/* Image clickable area */}
                <div 
                  className="absolute inset-0 cursor-pointer"
                  onClick={() => onSelect(image, index)}
                  aria-label={`View ${image.alt || `image ${index + 1}`}`}
                />
              </div>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}