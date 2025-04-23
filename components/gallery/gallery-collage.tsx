"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import Image from "next/image";
import { Heart } from "lucide-react";
import { ImageItem } from "@/lib/types";

interface GalleryCollageProps {
  images: ImageItem[];
  onSelect: (image: ImageItem, index: number) => void;
  isFavorite: (id: number) => boolean;
  toggleFavorite: (id: number) => void;
}

export function GalleryCollage({ images, onSelect, isFavorite, toggleFavorite }: GalleryCollageProps) {
  // Reference for scroll-based animations
  const containerRef = useRef(null);
  
  // Setup smooth container reveal animation
  const containerControls = useAnimation();
  const isInView = useInView(containerRef, { once: false, margin: "-100px 0px" });
  
  useEffect(() => {
    if (isInView) {
      containerControls.start("visible");
    }
  }, [isInView, containerControls]);
  
  // Container animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
        delayChildren: 0.1,
      }
    }
  };
  
  // Create smooth scroll-triggered animation variants
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.23, 1, 0.32, 1] // Custom easing for smoother animation
      }
    }
  };
  
  // Function to create rows of images for the collage layout
  const createRows = (imgs: ImageItem[]) => {
    if (!imgs || imgs.length === 0) return [];
    
    const rows = [];
    let currentIndex = 0;
    
    // Pattern for row layouts - this ensures a varied but balanced look
    const rowPatterns = [
      // Row with 3 images (1:2:1 ratio)
      { 
        sizes: [
          { colSpan: "w-1/4", height: "h-64" },
          { colSpan: "w-2/4", height: "h-64" },
          { colSpan: "w-1/4", height: "h-64" }
        ]
      },
      // Row with 2 images (1:1 ratio)
      { 
        sizes: [
          { colSpan: "w-1/2", height: "h-80" },
          { colSpan: "w-1/2", height: "h-80" }
        ]
      },
      // Row with 2 images (2:1 ratio)
      { 
        sizes: [
          { colSpan: "w-2/3", height: "h-96" },
          { colSpan: "w-1/3", height: "h-96" }
        ]
      },
      // Featured single image
      { 
        sizes: [
          { colSpan: "w-full", height: "h-[28rem]" }
        ]
      },
      // Row with 3 images (split evenly)
      { 
        sizes: [
          { colSpan: "w-1/3", height: "h-72" },
          { colSpan: "w-1/3", height: "h-72" },
          { colSpan: "w-1/3", height: "h-72" }
        ]
      }
    ];
    
    // Create rows based on patterns until we run out of images
    while (currentIndex < imgs.length) {
      const patternIndex = Math.floor(currentIndex / 3) % rowPatterns.length;
      const pattern = rowPatterns[patternIndex];
      const imagesNeeded = pattern.sizes.length;
      
      // Get slice of images for this row
      const rowImages = imgs.slice(currentIndex, currentIndex + imagesNeeded);
      
      // Only create complete rows to maintain layout
      if (rowImages.length === imagesNeeded) {
        rows.push({
          pattern,
          images: rowImages
        });
      } else {
        // For incomplete rows at the end, use a flexible pattern
        // This ensures we display all remaining images
        const flexPattern = {
          sizes: rowImages.map(() => ({ 
            colSpan: `w-1/${rowImages.length}`, 
            height: "h-72" 
          }))
        };
        
        rows.push({
          pattern: flexPattern,
          images: rowImages
        });
      }
      
      currentIndex += imagesNeeded;
    }
    
    return rows;
  };
  
  // Create the collage rows
  const collageRows = createRows(images);
  
  // Create an array to store refs for each row - use callback refs instead
  // This fixes the "React has detected a change in the order of Hooks" error
  const [rowRefs, setRowRefs] = useState<(HTMLDivElement | null)[]>(Array(collageRows.length).fill(null));
  const [rowsInView, setRowsInView] = useState(Array(collageRows.length).fill(false));
  
  // Function to set the ref for a specific row
  const setRowRef = (element: HTMLDivElement | null, index: number) => {
    if (element) {
      rowRefs[index] = element;
    }
  };
  
  // Monitor which rows are in view
  useEffect(() => {
    const observers = rowRefs.map((ref, index) => {
      if (!ref) return null;
      
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setRowsInView(prev => {
              const newState = [...prev];
              newState[index] = true;
              return newState;
            });
            observer.disconnect();
          }
        },
        { threshold: 0.2, rootMargin: "0px 0px -100px 0px" }
      );
      
      observer.observe(ref);
      return observer;
    });
    
    return () => {
      observers.forEach(observer => observer?.disconnect());
    };
  }, [rowRefs]);

  return (
    <motion.div
      ref={containerRef}
      variants={containerVariants}
      initial="hidden"
      animate={containerControls}
      className="w-full"
    >
      {collageRows.map((row, rowIndex) => (
        <motion.div 
          key={`row-${rowIndex}`} 
          className="flex flex-wrap w-full mb-1 md:mb-2"
          ref={el => setRowRef(el, rowIndex)}
          initial="hidden"
          animate={rowsInView[rowIndex] ? "visible" : "hidden"}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.08,
              }
            }
          }}
        >
          {row.images.map((image, imageIndex) => {
            const size = row.pattern.sizes[imageIndex];
            
            return (
              <motion.div
                key={`collage-${image.id}-${rowIndex}-${imageIndex}`}
                variants={itemVariants}
                className={`${size.colSpan} px-0.5 md:px-1 pb-1 md:pb-2 relative`}
                whileHover={{ scale: 1.01, transition: { duration: 0.3 } }}
              >
                <div className={`${size.height} relative overflow-hidden rounded-sm md:rounded`}>
                  <Image
                    src={image.url}
                    alt={image.alt || `Gallery image ${image.id}`}
                    fill
                    className="object-cover transition-transform duration-500 ease-in-out hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    priority={rowIndex < 2} // Prioritize loading for first couple of rows
                  />
                  
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
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
                    <motion.div 
                      className="absolute inset-0 cursor-pointer"
                      onClick={() => onSelect(image, image.id)}
                      aria-label={`View ${image.alt || `image ${image.id}`}`}
                      whileTap={{ scale: 0.98 }}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      ))}
    </motion.div>
  );
}