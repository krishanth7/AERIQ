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
        type={isVisible ? 'text' : 'password'}
        disabled={disabled}
        rightAddon={
          <button
            type="button"
            onClick={() => setIsVisible(!isVisible)}
            disabled={disabled}
            className="p-1 text-text-tertiary hover:text-text-primary transition-colors focus:outline-none focus:ring-1 focus:ring-brand rounded"
            aria-label={isVisible ? hideToggleLabel : showToggleLabel}
          >
            {isVisible ? (
              <EyeOff className="w-4 h-4" aria-hidden="true" />
            ) : (
              <Eye className="w-4 h-4" aria-hidden="true" />
            )}
          </button>
        }
        {...props}
      />
    );
  }
);

PasswordField.displayName = 'PasswordField';
