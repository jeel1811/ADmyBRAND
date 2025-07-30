'use client';

import { useState, useEffect } from 'react';

type Theme = 'light' | 'dark' | 'system';

function getSystemTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>('dark'); // Default to dark mode
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('dark'); // Default to dark

  // Initialize theme from localStorage or default to dark mode
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') as Theme | null;
    if (storedTheme) {
      setThemeState(storedTheme);
    } else {
      // Set default to dark mode if no stored preference
      setThemeState('dark');
      localStorage.setItem('theme', 'dark');
    }
  }, []);

  // Update resolvedTheme when theme changes or system preference changes
  useEffect(() => {
    const updateResolvedTheme = () => {
      const resolved = theme === 'system' ? getSystemTheme() : theme;
      setResolvedTheme(resolved);
      
      // Apply theme to document
      if (resolved === 'dark') {
        document.documentElement.classList.add('dark');
        document.documentElement.setAttribute('data-theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.setAttribute('data-theme', 'light');
      }
    };

    updateResolvedTheme();

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (theme === 'system') {
        updateResolvedTheme();
      }
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } else {
      // For older browsers
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, [theme]);

  // Function to set theme and save to localStorage
  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return {
    theme,
    resolvedTheme,
    setTheme,
    isSystemTheme: theme === 'system',
    isDarkTheme: resolvedTheme === 'dark',
    isLightTheme: resolvedTheme === 'light',
  };
}