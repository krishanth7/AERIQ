'use client';

import React, { useState } from 'react';
import { Input, InputProps } from '@/components/ui/input';
import { Eye, EyeOff } from 'lucide-react';

export interface PasswordFieldProps extends Omit<InputProps, 'type' | 'rightAddon'> {
  showToggleLabel?: string;
  hideToggleLabel?: string;
}

export const PasswordField = React.forwardRef<HTMLInputElement, PasswordFieldProps>(
  (
    {
      showToggleLabel = 'Show password',
      hideToggleLabel = 'Hide password',
      disabled,
      ...props
    },
    ref
  ) => {
    const [isVisible, setIsVisible] = useState(false);

    return (
      <Input
        ref={ref}
        disabled={disabled}
        {...props}
        type={isVisible ? 'text' : 'password'}
        rightAddon={
          <button
            type="button"
            tabIndex={-1}
            onMouseDown={(e) => {
              // Prevent focus loss from the input field
              e.preventDefault();
            }}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsVisible((prev) => !prev);
            }}
            disabled={disabled}
            className="p-1.5 text-text-tertiary hover:text-text-primary transition-colors focus:outline-none focus:ring-1 focus:ring-brand rounded cursor-pointer select-none"
            aria-label={isVisible ? hideToggleLabel : showToggleLabel}
          >
            {isVisible ? (
              <EyeOff className="w-4 h-4" aria-hidden="true" />
            ) : (
              <Eye className="w-4 h-4" aria-hidden="true" />
            )}
          </button>
        }
      />
    );
  }
);

PasswordField.displayName = 'PasswordField';
