'use client';

import React from 'react';
import { PasswordRequirements } from '@/types/auth';
import { Check, Circle } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface PasswordRequirementsProps {
  requirements: PasswordRequirements;
  hasInput: boolean;
  className?: string;
}

export function PasswordRequirementsView({
  requirements,
  hasInput,
  className,
}: PasswordRequirementsProps) {
  const criteriaList = [
    {
      key: 'length',
      label: 'At least 12 characters',
      isMet: requirements.hasMinLength,
    },
    {
      key: 'uppercase',
      label: 'Uppercase letter',
      isMet: requirements.hasUppercase,
    },
    {
      key: 'lowercase',
      label: 'Lowercase letter',
      isMet: requirements.hasLowercase,
    },
    {
      key: 'number',
      label: 'Number (0–9)',
      isMet: requirements.hasNumber,
    },
    {
      key: 'special',
      label: 'Special character (!@#$%^&*)',
      isMet: requirements.hasSpecialChar,
    },
  ];

  return (
    <div
      className={cn(
        'p-3 rounded-lg border border-border bg-surface-secondary/40 text-xs transition-colors',
        className
      )}
      aria-label="Password requirements"
    >
      <p className="font-medium text-text-secondary text-[11px] uppercase tracking-wider mb-2">
        Password Requirements
      </p>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 list-none p-0 m-0">
        {criteriaList.map((item) => {
          const met = hasInput && item.isMet;
          return (
            <li
              key={item.key}
              className={cn(
                'flex items-center gap-1.5 transition-colors duration-150',
                met ? 'text-status-success' : 'text-text-tertiary'
              )}
            >
              {met ? (
                <span className="w-3.5 h-3.5 rounded-full bg-status-success/15 flex items-center justify-center shrink-0">
                  <Check className="w-2.5 h-2.5 text-status-success stroke-[3]" aria-hidden="true" />
                </span>
              ) : (
                <Circle className="w-3.5 h-3.5 text-text-tertiary/60 shrink-0" aria-hidden="true" />
              )}
              <span className="sr-only">{met ? 'Requirement met: ' : 'Requirement not met: '}</span>
              <span className={cn('text-[12px]', met ? 'text-text-primary font-medium' : '')}>
                {item.label}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
