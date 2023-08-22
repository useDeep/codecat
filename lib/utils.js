import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import encoding from 'encoding';
 
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
