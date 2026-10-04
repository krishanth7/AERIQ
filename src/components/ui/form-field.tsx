'use client';

import React from 'react';
import { cn } from '@/lib/utils/cn';
import { AlertCircle } from 'lucide-react';

export interface FormFieldProps {
  id: string;
  label?: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: (props: { id: string; error: boolean; 'aria-describedby'?: string }) => React.ReactNode;
  className?: string;
  action?: React.ReactNode;
}

export function FormField({
  id,
  label,
  required,
  error,
  hint,
  children,
  className,
  action,
}: FormFieldProps) {
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;

  const ariaDescribedBy = error ? errorId : hint ? hintId : undefined;

  return (
    <div className={cn('flex flex-col gap-1.5 w-full', className)}>
      {(label || action) && (
        <div className="flex items-center justify-between text-[13px] leading-tight font-medium">
          {label && (
            <label htmlFor={id} className="text-text-primary select-none flex items-center gap-1">
              <span>{label}</span>
              {required && <span className="text-status-danger" aria-hidden="true">*</span>}
            </label>
          )}
          {action && <div className="text-xs">{action}</div>}
        </div>
      )}

      {children({
        id,
        error: Boolean(error),
        'aria-describedby': ariaDescribedBy,
      })}

      {hint && !error && (
        <p id={hintId} className="text-xs text-text-tertiary mt-0.5">
          {hint}
        </p>
      )}

      {error && (
        <div
          id={errorId}
          role="alert"
          aria-live="polite"
          className="flex items-center gap-1.5 text-xs text-status-danger mt-1 animate-slide-down"
        >
          <AlertCircle className="w-3.5 h-3.5 shrink-0 stroke-[2]" aria-hidden="true" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
