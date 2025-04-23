import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getImageAspectRatio(filename: string): "portrait" | "landscape" | "square" {
  // This is a basic implementation - in reality, you'd want to check the actual dimensions of each image
  // For now, we'll use naming patterns or default to estimations based on common patterns
  const lowerFilename = filename.toLowerCase()
  
  if (lowerFilename.includes("_portrait") || 
      lowerFilename.includes("portrait") || 
      lowerFilename.match(/dsc_0(147|448|588|096|079|064|017|458|405|472|532|616|269|284|374|417|088|115)/)) {
    return "portrait"
  }
  
  if (lowerFilename.includes("_landscape") || 
      lowerFilename.includes("landscape") || 
      lowerFilename.match(/img_0(472|301|390|025|010|441|493|556|848|253|367|391|463|099)/)) {
    return "landscape"
  }
  
  if (lowerFilename.includes("_square") || 
      lowerFilename.includes("square") || 
      lowerFilename.match(/img_0(296|302|303|212|276|445|14)/)) {
    return "square"
  }
  
  // Default based on file extension - real implementation would analyze actual dimensions
  return "landscape"
}

export async function getPortfolioImages() {
  try {
    // In a production environment, you would use something like Node's fs 
    // or a server API to get the actual list of files from the directory
    
    // For now, we'll simulate this with what we know exists in the portfolio directory
    const fileNames = [
      "DSC_0147.jpg", "DSC_0448.jpg", "DSC_0588.jpg", "IMG_0472.jpg", 
      "DSC_0096.jpg", "DSC_0079.jpg", "IMG_0301.jpg", "DSC_0064.jpg", 
      "IMG_0296.jpg", "1.jpg", "2.jpg", "IMG_0390.jpg",
      "DSC_0025.jpg", "DSC_0010.jpg", "DSC_0017.jpg", "IMG_0302.jpg", 
      "IMG_0303.jpg", "DSC_0458.jpg", "DSC_0405.jpg", "DSC_0441.jpg",
      "DSC_0472.jpg", "DSC_0493.jpg", "DSC_0532.jpg", "DSC_0556.jpg", 
      "DSC_0616.jpg", "DSC_0848.jpg", "IMG_0212.jpg", "IMG_0253.jpg",
      "IMG_0269.jpg", "IMG_0276.jpg", "IMG_0284.jpg", "IMG_0367.jpg", 
      "IMG_0374.jpg", "IMG_0391.jpg", "IMG_0417.jpg", "IMG_0445.jpg",
      "IMG_0463.jpg", "3.jpg", "4.jpg", "12.jpg",
      "14.jpg", "DSC_0088.jpg", "DSC_0099.jpg", "DSC_0115.jpg"
    ];
    
    // Map the file names to objects with the properties we need
    return fileNames.map((fileName, index) => ({
      id: index + 1,
      src: `/material/portfolio/${fileName}`,
      alt: "Photography work",
      aspectRatio: getImageAspectRatio(fileName) as "portrait" | "landscape" | "square",
      fileName: fileName
    }));
  } catch (error) {
    console.error("Error loading portfolio images:", error);
    return [];
  }
}

// More accurate aspect ratio detection would require using the Image API or a library like probe-image-size
// This will be used in the future implementation
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  
  return function(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}
