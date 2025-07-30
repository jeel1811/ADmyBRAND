'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useThemeContext } from '@/components/ThemeProvider';
import { cn } from '@/lib/utils';
// Remove unused import

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function ThemeToggle({ className, showLabel = false, size = 'md' }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useThemeContext();
  const [isAnimating, setIsAnimating] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Only show the toggle after mounting to prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setIsAnimating(true);
    // Cycle through light -> dark -> system -> light
    if (resolvedTheme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
    setTimeout(() => setIsAnimating(false), 600);
  };

  const sizeClasses = {
    sm: 'w-10 h-5',
    md: 'w-14 h-7',
    lg: 'w-16 h-8',
  };

  const iconSizeClasses = {
    sm: 'w-3.5 h-3.5',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const thumbSizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-7 h-7',
  };

  // Don't render anything until mounted to prevent hydration mismatch
  if (!mounted) return null;
  
  return (
    <div className={cn('flex items-center gap-2', className)}>
      {showLabel && (
        <AnimatePresence mode="wait">
          <motion.span 
            key={resolvedTheme}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="text-sm font-medium text-neutral-800 dark:text-neutral-200"
          >
            {resolvedTheme === 'dark' ? 'Dark' : 'Light'} Mode
          </motion.span>
        </AnimatePresence>
      )}
      <motion.button
        type="button"
        onClick={toggleTheme}
        className={cn(
          'relative rounded-full p-0.5 transition-colors duration-300 border-2',
          resolvedTheme === 'dark' 
            ? 'bg-indigo-900 border-indigo-700 shadow-lg shadow-indigo-900/20' 
            : 'bg-indigo-100 border-indigo-200 shadow-md shadow-indigo-200/30',
          sizeClasses[size]
        )}
        aria-label={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} mode`}
        whileHover={{ scale: 1.05}}
        transition={{ duration: 0.3 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          className={cn(
            'absolute flex items-center justify-center rounded-full bg-white shadow-md',
            thumbSizeClasses[size]
          )}
          initial={false}
          animate={{
            left: resolvedTheme === 'dark' ? 'calc(100% - 4px)' : '4px',
            translateX: resolvedTheme === 'dark' ? '-100%' : '0%',
            boxShadow: resolvedTheme === 'dark' 
              ? '0 0 8px 1px rgba(79, 70, 229, 0.4)' 
              : '0 0 8px 1px rgba(251, 191, 36, 0.4)',
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ 
            type: 'spring', 
            stiffness: 500, 
            damping: 25,
            mass: 0.8
          }}
        >
          <AnimatePresence mode="wait">
            {resolvedTheme === 'dark' ? (
              <motion.svg
                key="moon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className={cn('text-indigo-600', iconSizeClasses[size])}
                initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                animate={{
                  opacity: 1,
                  rotate: isAnimating ? 360 : 0,
                  scale: 1
                }}
                exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                transition={{ duration: 0.5 }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </motion.svg>
            ) : (
              <motion.svg
                key="sun"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className={cn('text-amber-500', iconSizeClasses[size])}
                initial={{ opacity: 0, scale: 0.5, rotate: 90 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  rotate: isAnimating ? 360 : 0,
                }}
                exit={{ opacity: 0, scale: 0.5, rotate: -90 }}
                transition={{ duration: 0.5 }}
              >
                <circle cx="12" cy="12" r="5" strokeWidth={2} />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
                />
              </motion.svg>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.button>
    </div>
  );
}