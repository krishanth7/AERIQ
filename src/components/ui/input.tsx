'use client';

import React from 'react';
import { cn } from '@/lib/utils/cn';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  leftAddon?: React.ReactNode;
  rightAddon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', error = false, leftAddon, rightAddon, disabled, ...props }, ref) => {
    return (
      <div className="relative flex items-center w-full">
        {leftAddon && (
          <div className="absolute left-3.5 flex items-center pointer-events-none text-text-tertiary">
            {leftAddon}
          </div>
        )}
        <input
          ref={ref}
          type={type}
          disabled={disabled}
          aria-invalid={error ? 'true' : undefined}
          className={cn(
            'w-full h-[48px] sm:h-[42px] px-3.5 text-sm sm:text-[15px] rounded-input transition-colors duration-150',
            'bg-surface text-text-primary placeholder:text-text-tertiary',
            'border focus:outline-none focus:ring-2 focus:ring-offset-1 ring-offset-surface',
            error
              ? 'border-status-danger focus:border-status-danger focus:ring-status-danger/40'
              : 'border-border hover:border-border-strong focus:border-brand focus:ring-brand/40',
            disabled && 'opacity-60 cursor-not-allowed bg-surface-secondary',
            leftAddon ? 'pl-10' : 'pl-3.5',
            rightAddon ? 'pr-11' : 'pr-3.5',
            className
          )}
          {...props}
        />
        {rightAddon && (
          <div className="absolute right-3.5 flex items-center text-text-secondary">
            {rightAddon}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
