'use client';

import React from 'react';
import { useTheme } from '@/lib/auth/theme-context';
import { Sun, Moon } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { resolvedTheme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={cn(
        'relative inline-flex items-center justify-center w-9 h-9 rounded-btn transition-all duration-200',
        'border border-border bg-surface hover:bg-surface-secondary text-text-secondary hover:text-text-primary',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-1 ring-offset-surface',
        'cursor-pointer select-none active:scale-95 shadow-subtle',
        className
      )}
      aria-label={resolvedTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      title={resolvedTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {resolvedTheme === 'dark' ? (
        <Sun className="w-4 h-4 text-brand transition-transform hover:rotate-45" aria-hidden="true" />
      ) : (
        <Moon className="w-4 h-4 text-brand transition-transform hover:-rotate-12" aria-hidden="true" />
      )}
      <span className="sr-only">
        {resolvedTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      </span>
    </button>
  );
}
