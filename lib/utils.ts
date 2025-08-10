import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getCurrency(countryCode: string): string {
  switch (countryCode) {
    case "IN":
      return "INR";
    case "AE":
      return "AED";
    default:
      return "";
  }
}

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function getDateFromSelectedMonthYear(monthIdx: string, year: string){
  const month = Number(monthIdx) + 1
  const twoDigitMonth = month > 9 ? month : `0${month}`
  return `${year}-${twoDigitMonth}-01`
}