import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { ResetPasswordForm } from '@/components/auth/reset-password-form';

export const metadata: Metadata = {
  title: 'Reset Password',
  description: 'Set a new secure password for your AERIQ account.',
};

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full space-y-6 animate-pulse">
          <div className="h-8 bg-surface-secondary rounded w-48" />
          <div className="h-4 bg-surface-secondary rounded w-64" />
          <div className="space-y-4 pt-4">
            <div className="h-10 bg-surface-secondary rounded" />
            <div className="h-10 bg-surface-secondary rounded" />
            <div className="h-11 bg-surface-secondary rounded" />
          </div>
        </div>
      }
    >
      <ResetPasswordForm />
    </Suspense>
  );
}
