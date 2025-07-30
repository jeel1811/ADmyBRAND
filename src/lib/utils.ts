import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines multiple class names and merges Tailwind CSS classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Creates a staggered animation delay for multiple elements
 * @param index Element index in the array
 * @param baseDelay Base delay in seconds
 * @param staggerAmount Amount to stagger each element by in seconds
 * @returns CSS delay value as a string
 */
export function getStaggeredDelay(index: number, baseDelay = 0.1, staggerAmount = 0.1): string {
  return `${baseDelay + index * staggerAmount}s`;
}

/**
 * Formats a number as currency
 * @param amount Number to format
 * @param currency Currency code
 * @returns Formatted currency string
 */
export function formatCurrency(amount: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
}

/**
 * Truncates text to a specified length and adds ellipsis
 * @param text Text to truncate
 * @param maxLength Maximum length before truncation
 * @returns Truncated text
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
}

/**
 * Generates a random ID for elements that need unique identifiers
 * @returns Random ID string
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

/**
 * Debounces a function call
 * @param fn Function to debounce
 * @param delay Delay in milliseconds
 * @returns Debounced function
 */
export function debounce<T extends (...args: unknown[]) => unknown>(fn: T, delay: number): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  return function(...args: Parameters<T>) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

/**
 * Creates a throttled function that only invokes the provided function at most once per specified interval
 * @param fn Function to throttle
 * @param limit Time limit in milliseconds
 * @returns Throttled function
 */
export function throttle<T extends (...args: unknown[]) => unknown>(fn: T, limit: number): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  let lastFunc: NodeJS.Timeout;
  let lastRan: number;
  
  return function(...args: Parameters<T>) {
    if (!inThrottle) {
      fn(...args);
      lastRan = Date.now();
      inThrottle = true;
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(() => {
        if (Date.now() - lastRan >= limit) {
          fn(...args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
}

/**
 * Calculates a value within a range based on a progress value (0-1)
 * Useful for animations and transitions
 * @param progress Progress value between 0 and 1
 * @param min Minimum value in range
 * @param max Maximum value in range
 * @returns Calculated value within range
 */
export function lerp(progress: number, min: number, max: number): number {
  return min + (max - min) * progress;
}

/**
 * Clamps a value between a minimum and maximum
 * @param value Value to clamp
 * @param min Minimum value
 * @param max Maximum value
 * @returns Clamped value
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}