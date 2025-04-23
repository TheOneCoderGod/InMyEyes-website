"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function GalleryLoader() {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: 0.9 }} // Total duration of 900ms before fading
    >
      <div className="flex flex-col items-center">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Image 
            src="\material\header\logo3.svg" 
            alt="InMyEyes" 
            width={200} // Increased size
            height={200} // Increased size
            className="mb-6"
          />
        </motion.div>
        
        {/* Line grow animation */}
        <motion.div 
          className="h-0.5 bg-white"
          initial={{ width: 0 }}
          animate={{ width: 120 }}
          transition={{ 
            duration: 0.6, 
            delay: 0.3,
            ease: [0.65, 0, 0.35, 1]  // easeInOutCubic
          }}
        />
      </div>
    </motion.div>
  );
}
