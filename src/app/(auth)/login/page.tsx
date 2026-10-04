import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { LoginForm } from '@/components/auth/login-form';

export const metadata: Metadata = {
  title: 'Sign In',
  description: 'Sign in to AERIQ — intelligent RAS farm management by Aero Intelli.',
};

export default function LoginPage() {
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
      <LoginForm />
    </Suspense>
  );
}
