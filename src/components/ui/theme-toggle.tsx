'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '@/lib/auth/theme-context';
import { Sun, Moon, Laptop } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { ThemePreference } from '@/types/auth';

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const options: { value: ThemePreference; label: string; icon: React.ReactNode }[] = [
    { value: 'light', label: 'Light', icon: <Sun className="w-4 h-4" aria-hidden="true" /> },
    { value: 'dark', label: 'Dark', icon: <Moon className="w-4 h-4" aria-hidden="true" /> },
    { value: 'system', label: 'System', icon: <Laptop className="w-4 h-4" aria-hidden="true" /> },
  ];

  return (
    <div className={cn('relative inline-block text-left', className)} ref={menuRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center justify-center w-9 h-9 rounded-btn transition-colors duration-150',
          'border border-border bg-surface hover:bg-surface-secondary text-text-secondary hover:text-text-primary',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-1 ring-offset-surface'
        )}
        aria-label={`Current theme: ${theme}. Click to change theme.`}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {resolvedTheme === 'dark' ? (
          <Moon className="w-4 h-4 transition-transform text-brand" aria-hidden="true" />
        ) : (
          <Sun className="w-4 h-4 transition-transform text-brand" aria-hidden="true" />
        )}
      </button>

      {isOpen && (
        <div
          role="menu"
          aria-orientation="vertical"
          className="absolute right-0 mt-2 w-36 py-1 rounded-lg bg-surface border border-border shadow-elevated z-50 animate-fade-in"
        >
          {options.map((option) => {
            const isSelected = theme === option.value;
            return (
              <button
                key={option.value}
                role="menuitem"
                onClick={() => {
                  setTheme(option.value);
                  setIsOpen(false);
                }}
                className={cn(
                  'flex items-center gap-2.5 w-full px-3 py-2 text-xs font-medium transition-colors text-left',
                  isSelected
                    ? 'text-brand bg-brand-subtle font-semibold'
                    : 'text-text-secondary hover:text-text-primary hover:bg-surface-secondary'
                )}
                aria-current={isSelected ? 'true' : undefined}
              >
                {option.icon}
                <span>{option.label}</span>
                {isSelected && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-brand" aria-hidden="true" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
