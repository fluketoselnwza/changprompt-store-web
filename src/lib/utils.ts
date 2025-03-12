import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const removeIndex = (arr: string[], index: number) => {
  return arr.filter((_, idx) => idx !== index);
};
