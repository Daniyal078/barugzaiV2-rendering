import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// export const api_base_url = 'https://ivory-sparrow-315828.hostingersite.com'
export const api_base_url = 'https://portal.barugzaimotors.com'