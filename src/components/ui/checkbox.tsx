'use client';

import React from 'react';
import { cn } from '@/lib/utils/cn';
import { Check } from 'lucide-react';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: React.ReactNode;
  error?: boolean;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, checked, onChange, disabled, id, label, error = false, ...props }, ref) => {
    return (
      <label
        htmlFor={id}
        className={cn(
          'inline-flex items-start gap-3 select-none cursor-pointer group text-sm',
          disabled && 'opacity-60 cursor-not-allowed pointer-events-none',
          className
        )}
      >
        <div className="relative flex items-center justify-center shrink-0 mt-0.5">
          <input
            ref={ref}
            id={id}
            type="checkbox"
            checked={checked}
            onChange={onChange}
            disabled={disabled}
            aria-invalid={error ? 'true' : undefined}
            className="peer sr-only"
            {...props}
          />
          <div
            className={cn(
              'w-[18px] h-[18px] rounded-[5px] border transition-colors flex items-center justify-center',
              'peer-focus-visible:ring-2 peer-focus-visible:ring-brand peer-focus-visible:ring-offset-2 ring-offset-surface',
              error ? 'border-status-danger' : 'border-border-strong hover:border-brand',
              'bg-surface peer-checked:bg-brand peer-checked:border-brand'
            )}
            aria-hidden="true"
          >
            <Check
              className={cn(
                'w-3.5 h-3.5 text-white stroke-[2.5] transition-opacity duration-150',
                checked ? 'opacity-100' : 'opacity-0'
              )}
            />
          </div>
        </div>
        {label && (
          <span className="text-text-secondary text-[13px] leading-relaxed select-text">
            {label}
          </span>
        )}
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';
