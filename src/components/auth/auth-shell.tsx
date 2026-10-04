'use client';

import React from 'react';
import Link from 'next/link';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { AuthBrandPanel } from './auth-brand-panel';

interface AuthShellProps {
  children: React.ReactNode;
}

export function AuthShell({ children }: AuthShellProps) {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-background text-text-primary">
      {/* Top Header Bar */}
      <header className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5 flex items-center justify-between">
        <Link
          href="/login"
          className="group inline-flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-md p-1 -m-1"
          aria-label="AERIQ Home"
        >
          <span className="text-xl sm:text-2xl font-bold tracking-tight text-text-primary group-hover:text-brand transition-colors">
            AERIQ
          </span>
          <span className="hidden sm:inline-block text-xs text-text-tertiary border-l border-border pl-2.5 ml-0.5">
            Intelligent RAS Farm Management
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <ThemeToggle />
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex items-center justify-center w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <div className="w-full max-w-5xl rounded-panel bg-surface border border-border shadow-card overflow-hidden flex flex-col lg:flex-row">
          {/* Left Technical Brand Panel (Desktop only) */}
          <AuthBrandPanel />

          {/* Right Authentication Form Area */}
          <div className="flex-1 p-6 sm:p-10 lg:p-12 xl:p-14 flex flex-col justify-center">
            <div className="w-full max-w-md mx-auto">{children}</div>
          </div>
        </div>
      </main>
    </div>
  );
}
