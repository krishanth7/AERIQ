'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { ThemePreference } from '@/types/auth';

interface ThemeContextType {
  theme: ThemePreference;
  resolvedTheme: 'light' | 'dark';
  setTheme: (theme: ThemePreference) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const STORAGE_KEY = 'aeriq-theme-preference';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemePreference>('system');
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('dark');

  const applyThemeToDOM = (pref: ThemePreference): 'light' | 'dark' => {
    if (typeof window === 'undefined') return 'dark';
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const active = pref === 'system' ? (mediaQuery.matches ? 'dark' : 'light') : pref;

    const root = document.documentElement;
    if (active === 'dark') {
      root.classList.add('dark');
      root.style.colorScheme = 'dark';
      root.setAttribute('data-theme', 'dark');
    } else {
      root.classList.remove('dark');
      root.style.colorScheme = 'light';
      root.setAttribute('data-theme', 'light');
    }
    return active;
  };

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as ThemePreference | null;
      const initialPref: ThemePreference =
        stored === 'light' || stored === 'dark' || stored === 'system' ? stored : 'system';
      setThemeState(initialPref);
      const active = applyThemeToDOM(initialPref);
      setResolvedTheme(active);
    } catch {
      const active = applyThemeToDOM('system');
      setResolvedTheme(active);
    }
  }, []);

  // Listen to OS media query changes when theme is 'system'
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = () => {
      if (theme === 'system') {
        const active = applyThemeToDOM('system');
        setResolvedTheme(active);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  const setTheme = (newTheme: ThemePreference) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem(STORAGE_KEY, newTheme);
    } catch {
      // Ignore
    }
    const active = applyThemeToDOM(newTheme);
    setResolvedTheme(active);
  };

  const toggleTheme = () => {
    const next = resolvedTheme === 'dark' ? 'light' : 'dark';
    setTheme(next);
  };

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
