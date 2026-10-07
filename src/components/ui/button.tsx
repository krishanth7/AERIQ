'use client';

import React from 'react';
import { cn } from '@/lib/utils/cn';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  loadingText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      children,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      loadingText,
      disabled,
      type = 'button',
      leftIcon,
      rightIcon,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium transition-all duration-200 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 ring-offset-surface disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none rounded-full active:scale-[0.98] shadow-sm';

    const sizeStyles = {
      sm: 'h-9 px-3 text-xs tracking-normal gap-1.5',
      md: 'h-11 sm:h-10 px-4 text-sm gap-2',
      lg: 'h-[50px] sm:h-11 px-5 text-sm sm:text-base font-medium gap-2.5',
    };

    const variantStyles = {
      primary:
        'bg-brand hover:bg-brand-hover active:bg-brand-active text-neutral-950 font-semibold shadow-subtle',
      secondary:
        'bg-surface-secondary text-text-primary hover:bg-border/60 active:bg-border',
      outline:
        'border border-border text-text-primary hover:bg-surface-secondary active:bg-surface-secondary/80',
      ghost:
        'text-text-secondary hover:text-text-primary hover:bg-surface-secondary active:bg-border/50',
      link:
        'text-brand hover:underline p-0 h-auto font-normal focus-visible:ring-offset-0',
    };

    return (
      <button
        ref={ref}
        type={type}
        className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
        disabled={disabled || isLoading}
        aria-busy={isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin text-current shrink-0" aria-hidden="true" />
            <span>{loadingText || children}</span>
          </>
        ) : (
          <>
            {leftIcon && <span className="shrink-0">{leftIcon}</span>}
            <span>{children}</span>
            {rightIcon && <span className="shrink-0">{rightIcon}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
