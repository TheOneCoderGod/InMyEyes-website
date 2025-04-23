import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { ImageItem } from '@/lib/types';

/**
 * API route to dynamically fetch portfolio images
 */
export async function GET() {
  try {
    // Define the path to portfolio images
    const portfolioDir = path.join(process.cwd(), 'public', 'material', 'portfolio');
    
    // Read the directory
    const files = fs.readdirSync(portfolioDir);
    
    // Filter for image files only
    const imageFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ['.jpg', '.jpeg', '.png', '.webp', '.gif'].includes(ext);
    });

    // Determine aspect ratio based on filename or other logic
    function getAspectRatio(filename: string): string {
      const lowerName = filename.toLowerCase();
      if (
        lowerName.includes("dsc_0147") || 
        lowerName.includes("dsc_0448") ||
        lowerName.includes("img_3505") ||
        lowerName.includes("img_3670") ||
        lowerName.includes("img_7547") ||
        lowerName.includes("img_1650")
      ) {
        return "portrait";
      } else if (
        lowerName.includes("img_0302") ||
        lowerName.includes("img_0303") ||
        lowerName.includes("dsc_0096")
      ) {
        return "square";
      } else {
        return "landscape";
      }
    }

    // Map files to ImageItem objects
    const images: ImageItem[] = imageFiles.map((file, index) => {
      const aspectRatio = getAspectRatio(file);
      
      // Default dimensions based on aspect ratio
      let width = 1600, height = 900;
      if (aspectRatio === 'portrait') {
        width = 800;
        height = 1200;
      } else if (aspectRatio === 'square') {
        width = 1000;
        height = 1000;
      }
      
      return {
        id: index + 1,
        url: `/material/portfolio/${file}`,
        alt: `Photography work - ${file.replace(/\.\w+$/, '')}`,
        title: file.replace(/\.\w+$/, ''),
        width,
        height,
        category: 'photography',
        featured: index < 5
      };
    });

    // Return the image data
    return NextResponse.json({ images });
  } catch (error) {
    console.error('Error fetching portfolio images:', error);
    return NextResponse.json({ error: 'Failed to fetch images' }, { status: 500 });
  }
}