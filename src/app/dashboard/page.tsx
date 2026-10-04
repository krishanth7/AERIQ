'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/auth-context';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Button } from '@/components/ui/button';
import {
  Waves,
  Activity,
  CheckCircle2,
  Clock,
  AlertTriangle,
  FileCheck,
  ShieldCheck,
  LogOut,
  ChevronDown,
  Fish,
  Thermometer,
  Droplets,
  PlusCircle,
  Building,
} from 'lucide-react';

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [selectedFarm, setSelectedFarm] = useState('Nordic Marine RAS - Facility 01');

  const handleSignOut = () => {
    logout();
    router.push('/login');
  };

  const checklistIntervals = [
    {
      interval: 'Interval 1 (06:00)',
      title: 'Morning Routine & Dissolved Oxygen',
      status: 'completed',
      time: '06:04 AM',
      operator: user?.fullName || 'Senior Technician',
      values: 'DO: 8.7 mg/L · Temp: 14.0°C · TAN: 0.011 mg/L',
    },
    {
      interval: 'Interval 2 (09:30)',
      title: 'Post-Feed 1 Water Quality Audit',
      status: 'completed',
      time: '09:32 AM',
      operator: user?.fullName || 'Senior Technician',
      values: 'DO: 8.5 mg/L · pH: 7.22 · Flow: 320 m³/h',
    },
    {
      interval: 'Interval 3 (13:00)',
      title: 'Midday Biofilter & MBBR Inspection',
      status: 'completed',
      time: '13:02 PM',
      operator: 'Automated Gateway + Op Audit',
      values: 'TAN: 0.012 mg/L · NO2-N: 0.04 mg/L · Pressure OK',
    },
    {
      interval: 'Interval 4 (17:00)',
      title: 'Afternoon Feed & Mortality Assessment',
      status: 'in-progress',
      time: 'Due in 35 mins',
      operator: 'Pending Assignment',
      values: 'Scheduled verification checklist',
    },
    {
      interval: 'Interval 5 (21:00)',
      title: 'Night Cycle Oxygenation & Backup Check',
      status: 'scheduled',
      time: 'Scheduled (21:00)',
      operator: 'Night Supervisor',
      values: 'Standby generators and backup O2 telemetry',
    },
  ];

  return (
    <div className="min-h-screen bg-background text-text-primary flex flex-col">
      {/* Top Application Bar */}
      <header className="sticky top-0 z-40 bg-surface/90 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link
              href="/dashboard"
              className="flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-md p-1"
            >
              <div className="w-8 h-8 rounded-lg bg-brand flex items-center justify-center text-white shadow-subtle">
                <Waves className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight text-text-primary">
                  AERIQ
                </span>
                <span className="hidden sm:inline-block text-[10px] uppercase font-mono tracking-widest text-brand ml-2 px-1.5 py-0.5 rounded bg-brand-subtle border border-brand/20">
                  RAS OS
                </span>
              </div>
            </Link>

            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-secondary border border-border text-xs">
              <Building className="w-3.5 h-3.5 text-text-tertiary" />
              <span className="font-semibold text-text-primary">
                {user?.companyName || 'Venigem Advanced Technologies'}
              </span>
              <span className="text-border">|</span>
              <span className="text-text-secondary">{selectedFarm}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded-full bg-status-success-bg border border-status-success/20 text-status-success text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-status-success animate-pulse" />
              <span>Telemetry Active</span>
            </div>

            <ThemeToggle />

            <div className="h-6 w-[1px] bg-border mx-1" />

            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <div className="text-xs font-semibold text-text-primary">
                  {user?.fullName || 'Operator'}
                </div>
                <div className="text-[11px] text-text-tertiary">
                  {user?.email || 'operator@aqua-farms.no'}
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSignOut}
                leftIcon={<LogOut className="w-3.5 h-3.5" />}
                className="text-text-secondary hover:text-status-danger"
              >
                Sign out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Dashboard Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Compliance Banner */}
        <div className="p-4 sm:p-5 rounded-panel bg-brand-subtle/40 border border-brand/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-brand/10 border border-brand/20 flex items-center justify-center text-brand shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-bold text-text-primary">
                  Mandatory Digital Record Protocol Active
                </h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold uppercase bg-status-success-bg text-status-success border border-status-success/20">
                  Compliant
                </span>
              </div>
              <p className="text-xs text-text-secondary mt-0.5 max-w-3xl leading-relaxed">
                Venigem Advanced Technologies SaaS-based Feed & Fish Management System requirement: 5 daily monitoring entries mandated. 3 completed, 2 remaining today. All inputs reflect verified real-time measurements.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <Button
              variant="primary"
              size="sm"
              leftIcon={<PlusCircle className="w-3.5 h-3.5" />}
              className="w-full md:w-auto text-xs"
            >
              Log Interval 4 Entry
            </Button>
          </div>
        </div>

        {/* Live Water Quality & RAS Telemetry Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-panel bg-surface border border-border shadow-card">
            <div className="flex items-center justify-between text-text-secondary mb-3">
              <span className="text-xs font-medium">Dissolved Oxygen</span>
              <Droplets className="w-4 h-4 text-brand" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold tracking-tight text-text-primary">
              8.6 <span className="text-sm font-normal text-text-tertiary">mg/L</span>
            </div>
            <div className="mt-2 flex items-center gap-1.5 text-xs text-status-success">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>102% Saturation (Target: 95-105%)</span>
            </div>
          </div>

          <div className="p-5 rounded-panel bg-surface border border-border shadow-card">
            <div className="flex items-center justify-between text-text-secondary mb-3">
              <span className="text-xs font-medium">TAN (Ammonia Nitrogen)</span>
              <Activity className="w-4 h-4 text-status-info" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold tracking-tight text-text-primary">
              0.012 <span className="text-sm font-normal text-text-tertiary">mg/L</span>
            </div>
            <div className="mt-2 flex items-center gap-1.5 text-xs text-status-success">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Optimal (Threshold: &lt;0.05 mg/L)</span>
            </div>
          </div>

          <div className="p-5 rounded-panel bg-surface border border-border shadow-card">
            <div className="flex items-center justify-between text-text-secondary mb-3">
              <span className="text-xs font-medium">Water Temperature</span>
              <Thermometer className="w-4 h-4 text-status-warning" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold tracking-tight text-text-primary">
              14.1 <span className="text-sm font-normal text-text-tertiary">°C</span>
            </div>
            <div className="mt-2 flex items-center gap-1.5 text-xs text-status-success">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Within growth curve range</span>
            </div>
          </div>

          <div className="p-5 rounded-panel bg-surface border border-border shadow-card">
            <div className="flex items-center justify-between text-text-secondary mb-3">
              <span className="text-xs font-medium">Active Fish Biomass</span>
              <Fish className="w-4 h-4 text-brand" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold tracking-tight text-text-primary">
              42,500 <span className="text-sm font-normal text-text-tertiary">kg</span>
            </div>
            <div className="mt-2 flex items-center gap-1.5 text-xs text-text-secondary">
              <span>Avg FCR: 1.08 · 3 Culture Tanks</span>
            </div>
          </div>
        </div>

        {/* 5-Point Mandatory Monitoring Checklist Log */}
        <div className="p-6 rounded-panel bg-surface border border-border shadow-card space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-border">
            <div>
              <h3 className="text-base font-semibold text-text-primary">
                Daily 5-Interval Compliance Checklist
              </h3>
              <p className="text-xs text-text-secondary mt-0.5">
                Venigem Advanced Technologies operational protocol — Actual measurements recorded at prescribed monitoring intervals.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-text-tertiary">
              <FileCheck className="w-4 h-4 text-brand" />
              <span>Today: 3 / 5 Entries Recorded</span>
            </div>
          </div>

          <div className="divide-y divide-border overflow-x-auto">
            {checklistIntervals.map((item, idx) => (
              <div
                key={idx}
                className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-text-primary">
                      {item.interval}: {item.title}
                    </span>
                    {item.status === 'completed' && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-status-success-bg text-status-success border border-status-success/20">
                        Recorded
                      </span>
                    )}
                    {item.status === 'in-progress' && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-status-warning-bg text-status-warning border border-status-warning/20 animate-pulse">
                        Due Now
                      </span>
                    )}
                    {item.status === 'scheduled' && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-surface-secondary text-text-tertiary border border-border">
                        Scheduled
                      </span>
                    )}
                  </div>
                  <p className="text-text-secondary font-mono">{item.values}</p>
                </div>

                <div className="text-left sm:text-right shrink-0">
                  <div className="text-text-primary font-medium">{item.operator}</div>
                  <div className="text-text-tertiary text-[11px]">{item.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 text-xs text-text-tertiary flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-border mt-auto">
        <span>© 2026 Aero Intelli. AERIQ — Intelligent RAS Farm Management.</span>
        <span>Venigem Advanced Technologies SaaS Platform</span>
      </footer>
    </div>
  );
}
