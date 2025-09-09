import { useState, useEffect, useCallback } from 'react';

export const useDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      // Check previously saved theme
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'dark') return true;
      if (savedTheme === 'light') return false;

      // Fallback to system preference
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Apply dark or light class to <html>
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  // Listen to system preference changes
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (e: MediaQueryListEvent) => {
      // Only auto-update if user hasn't explicitly chosen a theme
      const savedTheme = localStorage.getItem('theme');
      if (!savedTheme) {
        setIsDarkMode(e.matches);
      }
    };

    // modern browsers
    mediaQuery.addEventListener?.('change', handleChange);
    // fallback for older Safari
    mediaQuery.addListener?.(handleChange);

    return () => {
      mediaQuery.removeEventListener?.('change', handleChange);
      mediaQuery.removeListener?.(handleChange);
    };
  }, []);

  // toggle function
  const toggleDarkMode = useCallback(() => {
    setIsDarkMode((prev) => !prev);
  }, []);

  return { isDarkMode, toggleDarkMode };
};
