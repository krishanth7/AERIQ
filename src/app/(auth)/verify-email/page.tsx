import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { VerifyEmailView } from '@/components/auth/verify-email-view';

export const metadata: Metadata = {
  title: 'Verify Email',
  description: 'Verify your work email address to complete your AERIQ registration.',
};

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full space-y-6 animate-pulse">
          <div className="w-10 h-10 bg-surface-secondary rounded-lg" />
          <div className="h-8 bg-surface-secondary rounded w-48" />
          <div className="h-4 bg-surface-secondary rounded w-64" />
          <div className="space-y-4 pt-4">
            <div className="h-10 bg-surface-secondary rounded" />
            <div className="h-10 bg-surface-secondary rounded" />
          </div>
        </div>
      }
    >
      <VerifyEmailView />
    </Suspense>
  );
}
