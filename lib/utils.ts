import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getCurrency(countryCode: string): string {
  switch (countryCode) {
    case "IN":
      return "INR"
    case "AE":
      return "AED"
    default:
      return ""
  }
}