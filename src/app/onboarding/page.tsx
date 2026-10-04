'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/auth-context';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Building2, Warehouse, Cpu, Waves, LogOut } from 'lucide-react';

export default function OnboardingPage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleSignOut = () => {
    logout();
    router.push('/login');
  };

  const steps = [
    {
      title: '1. Organization Profile',
      desc: 'Set up your enterprise organization, enterprise legal entity, and team seats.',
      icon: Building2,
      active: true,
    },
    {
      title: '2. RAS Facility & Farm',
      desc: 'Configure geographical location, bio-security tier, and primary water source.',
      icon: Warehouse,
      active: false,
    },
    {
      title: '3. RAS Systems & Tanks',
      desc: 'Define tank dimensions, flow rates, biofilter volume, and sensor telemetry gateways.',
      icon: Cpu,
      active: false,
    },
    {
      title: '4. First Production Cycle',
      desc: 'Input fish batch species, initial stocking density, biomass, and feeding protocol.',
      icon: Waves,
      active: false,
    },
  ];

  return (
    <div className="min-h-screen bg-background text-text-primary flex flex-col justify-between">
      {/* Top Header */}
      <header className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5 flex items-center justify-between border-b border-border/60">
        <Link href="/login" className="inline-flex items-center gap-2">
          <span className="text-xl font-bold tracking-tight text-text-primary">AERIQ</span>
          <span className="text-xs text-text-tertiary border-l border-border pl-2.5">
            Onboarding Setup
          </span>
        </Link>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSignOut}
            leftIcon={<LogOut className="w-3.5 h-3.5" />}
          >
            Sign out
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <div className="space-y-8">
          {/* Welcome Banner */}
          <div className="p-6 rounded-panel bg-surface border border-border shadow-card space-y-3">
            <div className="flex items-center gap-2 text-status-success text-sm font-medium">
              <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
              <span>Authentication Successful</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-text-primary">
              Welcome to AERIQ, {user?.fullName || 'Operator'}
            </h1>
            <p className="text-sm text-text-secondary max-w-2xl leading-relaxed">
              Your account is authenticated ({user?.email || 'authenticated user'}). Before accessing the production dashboard, complete the initial facility configuration pipeline below.
            </p>
          </div>

          {/* Architecture Pipeline Stages */}
          <div className="space-y-3">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-text-tertiary">
              Operational Onboarding Pipeline
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {steps.map((step) => {
                const Icon = step.icon;
                return (
                  <div
                    key={step.title}
                    className={`p-5 rounded-lg border transition-all ${
                      step.active
                        ? 'bg-surface border-brand shadow-subtle ring-1 ring-brand/30'
                        : 'bg-surface/50 border-border opacity-75'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div
                        className={`w-8 h-8 rounded-md flex items-center justify-center ${
                          step.active
                            ? 'bg-brand text-white'
                            : 'bg-surface-secondary text-text-tertiary'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-semibold text-text-primary">
                        {step.title}
                      </span>
                    </div>
                    <p className="text-xs text-text-secondary leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Call to action note */}
          <div className="text-center pt-4">
            <p className="text-xs text-text-tertiary">
              Farm configuration modules will be connected in Phase 1B.
            </p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
              <Button
                variant="primary"
                size="md"
                onClick={() => router.push('/dashboard')}
              >
                Go to Production Dashboard
              </Button>
              <Button
                variant="secondary"
                size="md"
                onClick={() => router.push('/login?expired=true')}
              >
                Test Session Expiration Flow
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 text-xs text-text-tertiary text-center border-t border-border/60">
        © 2026 Aero Intelli. AERIQ Intelligent RAS Farm Management.
      </footer>
    </div>
  );
}
