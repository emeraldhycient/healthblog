import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * A utility function to merge Tailwind classes with clsx.
 * @param inputs - The Tailwind classes to merge.
 * @returns The merged classes.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatPrice = (number: number) => {
  return new Intl.NumberFormat("en-NG", {
      style: 'currency',
      currency: "NGN"
  }).format(number)
}

export const formatDate = (date?: string) => {
  return date ? new Date(date).toLocaleDateString() : "";
};
