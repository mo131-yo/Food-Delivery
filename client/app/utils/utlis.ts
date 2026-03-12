  import { clsx, type ClassValue } from "clsx"
  import { twMerge } from "tailwind-merge"

  export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
  }

  // lib/cloudinary.ts
export const getCloudinaryUrl = (publicId: string) => {
  if (!publicId) return "https://via.placeholder.com/500?text=No+ID";
  if (publicId.startsWith('http')) return publicId;

  const cloudName = "dzljgphud"; // Чиний өгсөн нэр
  return `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto,c_fill,w_600,h_400/${publicId}`;
};