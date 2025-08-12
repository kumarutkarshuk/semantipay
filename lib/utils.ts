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
    case "US":
      return "USD";
    case "CA":
      return "CAD";
    case "GB":
      return "GBP";
    case "AU":
      return "AUD";
    case "DE":
      return "EUR";
    case "FR":
      return "EUR";
    case "SG":
      return "SGD";
    case "NZ":
      return "NZD";
    default:
      return "";
  }
}


export const countries = [
  { code: "IN", name: "India" },
  { code: "AE", name: "United Arab Emirates" },
  { code: "US", name: "United States" },
  // { code: "CA", name: "Canada" },
  // { code: "GB", name: "United Kingdom" },
  // { code: "AU", name: "Australia" },
  // { code: "DE", name: "Germany" },
  // { code: "FR", name: "France" },
  // { code: "SG", name: "Singapore" },
  // { code: "NZ", name: "New Zealand" }
];

const allMonths = [
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

export const months = allMonths.slice(0, new Date().getMonth() + 1);

export function getDateFromSelectedMonthYear(monthIdx: string, year: string){
  const month = Number(monthIdx) + 1
  const twoDigitMonth = month > 9 ? month : `0${month}`
  return `${year}-${twoDigitMonth}-01`
}