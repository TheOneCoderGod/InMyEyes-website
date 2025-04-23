"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Heart } from "lucide-react";
import { ImageItem } from "@/lib/types";

interface GalleryGridProps {
  images: ImageItem[];
  onSelect: (image: ImageItem, index: number) => void;
  isFavorite: (id: number) => boolean;
  toggleFavorite: (id: number) => void;
}

export function GalleryGrid({ images, onSelect, isFavorite, toggleFavorite }: GalleryGridProps) {
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
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6"
    >
      {images.map((image, index) => {
        // Calculate image style with natural aspect ratio
        const aspectRatio = image.width && image.height ? image.width / image.height : 1;
        
        return (
          <motion.div
            key={`grid-${image.id}-${index}`}
            variants={itemVariants}
            className="relative overflow-hidden rounded-lg"
            style={{ width: '100%' }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <div style={{ 
              paddingBottom: `${(1 / aspectRatio) * 100}%`, 
              position: 'relative'
            }}>
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