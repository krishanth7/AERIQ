'use client';

import React from 'react';
import Link from 'next/link';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Waves } from 'lucide-react';

interface AuthShellProps {
  children: React.ReactNode;
}

export function AuthShell({ children }: AuthShellProps) {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-background text-text-primary relative selection:bg-brand/20 selection:text-brand">
      {/* Ambient background glow */}
      <div 
        className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[680px] h-[440px] bg-brand/8 dark:bg-brand/12 blur-[130px] rounded-full"
        aria-hidden="true" 
      />

      {/* Top Header Bar */}
      <header className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between">
        <Link
          href="/login"
          className="group inline-flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-lg p-1 -m-1"
          aria-label="AERIQ Home"
        >
          <div className="w-8 h-8 rounded-full bg-brand/20 dark:bg-brand/15 border border-brand/40 flex items-center justify-center text-neutral-950 dark:text-brand group-hover:bg-brand group-hover:text-neutral-950 transition-all shadow-subtle">
            <Waves className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-text-primary group-hover:text-brand transition-colors">
              AERIQ
            </span>
          </div>
          <span className="hidden sm:inline-block text-xs text-text-tertiary border-l border-border pl-2.5 ml-1">
            Intelligent RAS Farm Management
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <ThemeToggle />
        </div>
      </header>

      {/* Main Focused Form Area (No side panel, purely the form) */}
      <main className="relative z-10 flex-1 flex items-center justify-center w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="w-full max-w-[490px] rounded-3xl bg-surface border border-border shadow-card p-6 sm:p-9 md:p-10 transition-all">
          {children}
        </div>
      </main>

      {/* Subtle Footer */}
      <footer className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center text-xs text-text-tertiary">
        <p>AERIQ Aquaculture Automation · Secure Cloud Platform</p>
      </footer>
    </div>
  );
}
