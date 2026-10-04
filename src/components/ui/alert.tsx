'use client';

import React from 'react';
import { cn } from '@/lib/utils/cn';
import { AlertCircle, CheckCircle2, Info, AlertTriangle, X } from 'lucide-react';

export interface AlertProps {
  variant?: 'danger' | 'warning' | 'success' | 'info';
  title?: string;
  description: string;
  className?: string;
  onDismiss?: () => void;
}

export function Alert({
  variant = 'danger',
  title,
  description,
  className,
  onDismiss,
}: AlertProps) {
  const variantConfig = {
    danger: {
      bg: 'bg-status-danger-bg',
      border: 'border-status-danger/30',
      iconColor: 'text-status-danger',
      textColor: 'text-status-danger',
      Icon: AlertCircle,
    },
    warning: {
      bg: 'bg-status-warning-bg',
      border: 'border-status-warning/30',
      iconColor: 'text-status-warning',
      textColor: 'text-status-warning',
      Icon: AlertTriangle,
    },
    success: {
      bg: 'bg-status-success-bg',
      border: 'border-status-success/30',
      iconColor: 'text-status-success',
      textColor: 'text-status-success',
      Icon: CheckCircle2,
    },
    info: {
      bg: 'bg-status-info-bg',
      border: 'border-status-info/30',
      iconColor: 'text-status-info',
      textColor: 'text-status-info',
      Icon: Info,
    },
  };

  const config = variantConfig[variant];
  const { Icon } = config;

  return (
    <div
      role="alert"
      aria-live="polite"
      className={cn(
        'flex items-start gap-3 p-3.5 rounded-input border transition-all duration-150 text-sm animate-fade-in',
        config.bg,
        config.border,
        className
      )}
    >
      <Icon className={cn('w-4 h-4 shrink-0 mt-0.5', config.iconColor)} aria-hidden="true" />
      <div className="flex-1 space-y-0.5">
        {title && <p className={cn('font-medium text-xs tracking-wide uppercase', config.textColor)}>{title}</p>}
        <p className="text-text-primary text-[13px] leading-relaxed">{description}</p>
      </div>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          className="text-text-tertiary hover:text-text-primary transition-colors p-1 -mr-1 -mt-1 rounded focus:outline-none focus:ring-1 focus:ring-brand"
          aria-label="Dismiss alert"
        >
          <X className="w-3.5 h-3.5" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
