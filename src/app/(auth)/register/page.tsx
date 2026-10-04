import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { RegisterForm } from '@/components/auth/register-form';

export const metadata: Metadata = {
  title: 'Create Account',
  description:
    'Create your AERIQ account to manage, monitor, and optimize your recirculating aquaculture systems.',
};

export default function RegisterPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full space-y-6 animate-pulse">
          <div className="h-8 bg-surface-secondary rounded w-56" />
          <div className="h-4 bg-surface-secondary rounded w-72" />
          <div className="space-y-4 pt-4">
            <div className="h-10 bg-surface-secondary rounded" />
            <div className="h-10 bg-surface-secondary rounded" />
            <div className="h-10 bg-surface-secondary rounded" />
            <div className="h-10 bg-surface-secondary rounded" />
            <div className="h-11 bg-surface-secondary rounded" />
          </div>
        </div>
      }
    >
      <RegisterForm />
    </Suspense>
  );
}
