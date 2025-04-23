import { join } from 'path';
import { promises as fs } from 'fs';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Path to the portfolio directory
    const portfolioDir = join(process.cwd(), 'public/material/portfolio');
    
    // Read the directory
    const fileNames = await fs.readdir(portfolioDir);
    
    // Filter out non-image files (only include common image extensions)
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.avif'];
    const imageFiles = fileNames.filter(file => 
      imageExtensions.some(ext => file.toLowerCase().endsWith(ext))
    );
    
    // Build the image items array with dimensions
    // Note: In a real app, we would cache this information or store it in a database
    const images = await Promise.all(imageFiles.map(async (fileName, index) => {
      // In a production app, you would use a library like sharp or image-size
      // to get the actual dimensions. For now, we'll use placeholder values.
      const width = 1200; // placeholder
      const height = 800;  // placeholder
      
      return {
        fileName,
        width,
        height
      };
    }));
    
    return NextResponse.json(images);
  } catch (error) {
    console.error('Error fetching portfolio images:', error);
    return NextResponse.json(
      { error: 'Failed to fetch portfolio images' },
      { status: 500 }
    );
  }
}