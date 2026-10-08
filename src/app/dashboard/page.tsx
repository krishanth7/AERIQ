'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/auth-context';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Button } from '@/components/ui/button';
import { MandatoryTermsModal } from '@/components/auth/mandatory-terms-modal';
import { SettingsView } from '@/components/dashboard/settings-view';
import {
  Waves,
  Activity,
  CheckCircle2,
  FileCheck,
  ShieldCheck,
  LogOut,
  Fish,
  Thermometer,
  Droplets,
  PlusCircle,
  Building,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  Search,
  Clock,
  Check,
  ClipboardList,
} from 'lucide-react';

function SettingsCustomIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      <g clipPath="url(#clip0_4418_8726)">
        <path
          d="M18.9401 5.41945L13.7701 2.42945C12.7801 1.85945 11.2301 1.85945 10.2401 2.42945L5.02008 5.43945C2.95008 6.83945 2.83008 7.04945 2.83008 9.27945V14.7095C2.83008 16.9395 2.95008 17.1595 5.06008 18.5795L10.2301 21.5695C10.7301 21.8595 11.3701 21.9995 12.0001 21.9995C12.6301 21.9995 13.2701 21.8595 13.7601 21.5695L18.9801 18.5595C21.0501 17.1595 21.1701 16.9495 21.1701 14.7195V9.27945C21.1701 7.04945 21.0501 6.83945 18.9401 5.41945ZM12.0001 15.2495C10.2101 15.2495 8.75008 13.7895 8.75008 11.9995C8.75008 10.2095 10.2101 8.74945 12.0001 8.74945C13.7901 8.74945 15.2501 10.2095 15.2501 11.9995C15.2501 13.7895 13.7901 15.2495 12.0001 15.2495Z"
        />
      </g>
      <defs>
        <clipPath id="clip0_4418_8726">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

export interface LogItem {
  id: string;
  interval: string;
  title: string;
  status: 'completed' | 'in-progress' | 'scheduled';
  time: string;
  operator: string;
  values: string;
  notes?: string;
}

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [selectedFarm] = useState('Nordic Marine RAS');
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'logs' | 'settings'>('dashboard');

  // Log Entry Modal & Dynamic List State
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  const [logSearchQuery, setLogSearchQuery] = useState('');
  const [successToast, setSuccessToast] = useState('');

  const [logs, setLogs] = useState<LogItem[]>([
    {
      id: 'log-1',
      interval: 'Interval 1 (06:00)',
      title: 'Morning Routine & Dissolved Oxygen',
      status: 'completed',
      time: '06:04 AM',
      operator: user?.fullName || 'Senior Technician',
      values: 'DO: 8.7 mg/L · Temp: 14.0°C · TAN: 0.011 mg/L · pH: 7.21',
      notes: 'Morning aeration parameters stable.',
    },
    {
      id: 'log-2',
      interval: 'Interval 2 (09:30)',
      title: 'Post-Feed 1 Water Quality Audit',
      status: 'completed',
      time: '09:32 AM',
      operator: user?.fullName || 'Senior Technician',
      values: 'DO: 8.5 mg/L · Temp: 14.1°C · TAN: 0.012 mg/L · pH: 7.22',
      notes: 'Feed response active. Biofilter flow optimal.',
    },
    {
      id: 'log-3',
      interval: 'Interval 3 (13:00)',
      title: 'Midday Biofilter & MBBR Inspection',
      status: 'completed',
      time: '13:02 PM',
      operator: 'Automated Gateway',
      values: 'DO: 8.6 mg/L · Temp: 14.1°C · TAN: 0.012 mg/L · pH: 7.20',
      notes: 'Automated sensor telemetry validated.',
    },
    {
      id: 'log-4',
      interval: 'Interval 4 (17:00)',
      title: 'Afternoon Feed & Mortality Assessment',
      status: 'in-progress',
      time: 'Due in 35 mins',
      operator: 'Pending Verification',
      values: 'DO: 8.4 mg/L · Temp: 14.2°C · TAN: 0.013 mg/L · pH: 7.19',
      notes: 'Scheduled verification checklist.',
    },
    {
      id: 'log-5',
      interval: 'Interval 5 (21:00)',
      title: 'Night Cycle Oxygenation & Backup Check',
      status: 'scheduled',
      time: 'Scheduled (21:00)',
      operator: 'Night Supervisor',
      values: 'DO: Standby · Temp: 14.0°C · Backup Telemetry OK',
      notes: 'Standby generators and backup telemetry.',
    },
  ]);

  // Form Fields State
  const [formInterval, setFormInterval] = useState('Interval 4 (17:00)');
  const [formTitle, setFormTitle] = useState('Afternoon Feed & Mortality Assessment');
  const [formDo, setFormDo] = useState('8.4');
  const [formTemp, setFormTemp] = useState('14.2');
  const [formTan, setFormTan] = useState('0.013');
  const [formPh, setFormPh] = useState('7.20');
  const [formOperator, setFormOperator] = useState(user?.fullName || 'Senior Technician');
  const [formNotes, setFormNotes] = useState('All parameters verified within standard operating thresholds.');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const accepted = sessionStorage.getItem('aeriq_terms_accepted');
      if (accepted !== 'true') {
        setShowTermsModal(true);
      }
    }
  }, []);

  const handleAcceptTerms = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('aeriq_terms_accepted', 'true');
    }
    setShowTermsModal(false);
  };

  const handleSignOut = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('aeriq_terms_accepted');
    }
    logout();
    router.push('/login');
  };

  const handleSaveLogEntry = (e: React.FormEvent) => {
    e.preventDefault();
    const newLog: LogItem = {
      id: `log-${Date.now()}`,
      interval: formInterval,
      title: formTitle || 'Routine Water Quality & Protocol Audit',
      status: 'completed',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      operator: formOperator || user?.fullName || 'Operator',
      values: `DO: ${formDo} mg/L · Temp: ${formTemp}°C · TAN: ${formTan} mg/L · pH: ${formPh}`,
      notes: formNotes,
    };

    setLogs((prev) => [newLog, ...prev.filter((item) => item.interval !== formInterval)]);
    setIsLogModalOpen(false);
    setSuccessToast(`Log entry recorded for ${formInterval}`);

    setTimeout(() => {
      setSuccessToast('');
    }, 4000);
  };

  const filteredLogs = logs.filter(
    (item) =>
      item.interval.toLowerCase().includes(logSearchQuery.toLowerCase()) ||
      item.title.toLowerCase().includes(logSearchQuery.toLowerCase()) ||
      item.operator.toLowerCase().includes(logSearchQuery.toLowerCase()) ||
      item.values.toLowerCase().includes(logSearchQuery.toLowerCase())
  );

  const completedCount = logs.filter((l) => l.status === 'completed').length;

  return (
    <div className="min-h-screen bg-background text-text-primary flex flex-col text-xs">
      <MandatoryTermsModal
        isOpen={showTermsModal}
        onAccept={handleAcceptTerms}
      />

      {/* Success Notification Toast */}
      {successToast && (
        <div className="fixed top-16 right-6 z-50 px-4 py-2.5 rounded-lg bg-status-success-bg border border-status-success/30 text-status-success shadow-lg flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="w-4 h-4 text-status-success shrink-0" />
          <span className="font-semibold">{successToast}</span>
        </div>
      )}

      {/* Header Bar */}
      <header className="sticky top-0 z-40 bg-surface/90 backdrop-blur-md border-b border-border">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 text-text-secondary hover:text-text-primary focus:outline-none rounded-md"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('dashboard')}
              className="flex items-center gap-2 focus-visible:outline-none rounded-md text-left"
            >
              <div className="w-7 h-7 rounded-lg bg-brand flex items-center justify-center text-white shadow-subtle">
                <Waves className="w-3.5 h-3.5" />
              </div>
              <span className="text-base font-bold tracking-tight text-text-primary">
                AERIQ
              </span>
            </button>

            <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-surface-secondary border border-border text-[11px]">
              <Building className="w-3 h-3 text-text-tertiary" />
              <span className="font-semibold text-text-primary">
                {user?.companyName || 'Venigem'}
              </span>
              <span className="text-border">|</span>
              <span className="text-text-secondary">{selectedFarm}</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="hidden lg:flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-status-success-bg border border-status-success/20 text-status-success text-[11px] font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-status-success animate-pulse" />
              <span>Active</span>
            </div>

            <ThemeToggle />

            <div className="h-5 w-[1px] bg-border mx-0.5" />

            <div className="flex items-center gap-2.5">
              <div className="text-right hidden sm:block">
                <div className="font-semibold text-text-primary">
                  {user?.fullName || (user?.firstName ? `${user.firstName} ${user.lastName || ''}` : 'Operator')}
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSignOut}
                leftIcon={<LogOut className="w-3.5 h-3.5" />}
                className="text-text-secondary hover:text-status-danger px-2 py-1"
              >
                Sign out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex-1 max-w-[1600px] w-full mx-auto flex flex-col lg:flex-row min-h-[calc(100vh-3.5rem)]">
        {/* Left Sidebar Menu */}
        <aside
          className={`border-r border-border bg-surface/60 backdrop-blur-sm p-2 flex flex-col justify-between transition-all duration-200 lg:block ${
            isSidebarOpen ? 'lg:w-56' : 'lg:w-14'
          } ${
            mobileMenuOpen ? 'block fixed inset-x-0 top-14 bottom-0 z-30 bg-surface' : 'hidden'
          }`}
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between px-2 py-1 border-b border-border">
              {isSidebarOpen && (
                <span className="text-[10px] font-semibold uppercase tracking-wider text-text-tertiary">
                  Nav
                </span>
              )}
              <button
                type="button"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-1 text-text-secondary hover:text-text-primary hover:bg-surface-secondary rounded transition-colors ml-auto"
                title={isSidebarOpen ? 'Collapse menu' : 'Expand menu'}
              >
                {isSidebarOpen ? (
                  <ChevronLeft className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </button>
            </div>

            <nav className="space-y-1">
              {/* Dashboard Main Parent & Sub-items */}
              <div className="space-y-1">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('dashboard');
                    setMobileMenuOpen(false);
                  }}
                  title="Dashboard Overview"
                  className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg font-medium transition-all ${
                    activeTab === 'dashboard'
                      ? 'bg-brand text-neutral-950 font-semibold shadow-subtle'
                      : 'text-text-secondary hover:text-text-primary hover:bg-surface-secondary'
                  } ${!isSidebarOpen ? 'justify-center px-0' : 'justify-start'}`}
                >
                  <LayoutDashboard className="w-4 h-4 shrink-0" />
                  {isSidebarOpen && <span>Dashboard</span>}
                </button>

                {/* Sub-menu item under Dashboard */}
                {isSidebarOpen ? (
                  <div className="pl-4 space-y-1 border-l-2 border-border/60 ml-3.5 my-1">
                    <button
                      type="button"
                      onClick={() => {
                        setActiveTab('logs');
                        setMobileMenuOpen(false);
                      }}
                      title="Log Entry Management"
                      className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md text-xs font-medium transition-all ${
                        activeTab === 'logs'
                          ? 'bg-brand/15 text-brand font-semibold border border-brand/30 shadow-subtle'
                          : 'text-text-secondary hover:text-text-primary hover:bg-surface-secondary'
                      }`}
                    >
                      <FileCheck className="w-3.5 h-3.5 shrink-0 text-brand" />
                      <span>Log Entry</span>
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('logs');
                      setMobileMenuOpen(false);
                    }}
                    title="Log Entry Management"
                    className={`w-full flex items-center justify-center py-2 rounded-lg transition-all ${
                      activeTab === 'logs'
                        ? 'bg-brand text-neutral-950 font-semibold shadow-subtle'
                        : 'text-text-secondary hover:text-text-primary hover:bg-surface-secondary'
                    }`}
                  >
                    <FileCheck className="w-4 h-4 shrink-0" />
                  </button>
                )}
              </div>
            </nav>
          </div>

          {/* Bottom Settings Button */}
          <div className="pt-2 border-t border-border">
            <button
              type="button"
              onClick={() => {
                setActiveTab('settings');
                setMobileMenuOpen(false);
              }}
              title="Settings"
              className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg font-medium transition-all ${
                activeTab === 'settings'
                  ? 'bg-brand text-neutral-950 font-semibold shadow-subtle'
                  : 'text-text-secondary hover:text-text-primary hover:bg-surface-secondary'
              } ${!isSidebarOpen ? 'justify-center px-0' : 'justify-start'}`}
            >
              <SettingsCustomIcon className="w-4 h-4 shrink-0" />
              {isSidebarOpen && <span>Settings</span>}
            </button>
          </div>
        </aside>

        {/* Main Content Workspace */}
        <main className="flex-1 px-4 sm:px-6 py-6 space-y-6 min-w-0">
          {activeTab === 'settings' ? (
            <SettingsView user={user} />
          ) : activeTab === 'logs' ? (
            /* Log Entry Tab View */
            <div className="space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border">
                <div>
                  <h2 className="text-lg font-bold tracking-tight text-text-primary">
                    Log Entry Management
                  </h2>
                  <p className="text-text-secondary text-xs">
                    RAS protocol monitoring logs, water quality audits, and operator sign-offs.
                  </p>
                </div>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setIsLogModalOpen(true)}
                  leftIcon={<PlusCircle className="w-3.5 h-3.5" />}
                  className="text-xs px-3.5 py-1.5 self-start sm:self-auto"
                >
                  Record Log Entry
                </Button>
              </div>

              {/* Log Stats Overview */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-panel bg-surface border border-border flex items-center justify-between">
                  <div>
                    <span className="text-text-tertiary text-[11px]">Total Intervals</span>
                    <div className="text-lg font-bold text-text-primary mt-0.5">{logs.length} Logged</div>
                  </div>
                  <ClipboardList className="w-5 h-5 text-brand opacity-80" />
                </div>
                <div className="p-3.5 rounded-panel bg-surface border border-border flex items-center justify-between">
                  <div>
                    <span className="text-text-tertiary text-[11px]">Completed Today</span>
                    <div className="text-lg font-bold text-status-success mt-0.5">{completedCount} / 5 Recorded</div>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-status-success opacity-80" />
                </div>
                <div className="p-3.5 rounded-panel bg-surface border border-border flex items-center justify-between">
                  <div>
                    <span className="text-text-tertiary text-[11px]">Protocol Status</span>
                    <div className="text-lg font-bold text-text-primary mt-0.5">100% Compliant</div>
                  </div>
                  <ShieldCheck className="w-5 h-5 text-brand opacity-80" />
                </div>
              </div>

              {/* Search & Filter */}
              <div className="flex items-center gap-2">
                <div className="relative flex-1 max-w-md">
                  <Search className="w-3.5 h-3.5 text-text-tertiary absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={logSearchQuery}
                    onChange={(e) => setLogSearchQuery(e.target.value)}
                    placeholder="Search logs by interval, operator, parameters..."
                    className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-surface border border-border text-xs focus:outline-none focus:border-brand transition-colors text-text-primary"
                  />
                </div>
              </div>

              {/* Log Table View */}
              <div className="rounded-panel bg-surface border border-border shadow-card overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-border bg-surface-secondary/50 text-text-tertiary font-medium">
                        <th className="py-2.5 px-3">Interval & Routine</th>
                        <th className="py-2.5 px-3">Status</th>
                        <th className="py-2.5 px-3">Parameters Recorded</th>
                        <th className="py-2.5 px-3">Operator</th>
                        <th className="py-2.5 px-3 text-right">Time</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {filteredLogs.length > 0 ? (
                        filteredLogs.map((item) => (
                          <tr key={item.id} className="hover:bg-surface-secondary/30 transition-colors">
                            <td className="py-3 px-3">
                              <div className="font-semibold text-text-primary">{item.interval}</div>
                              <div className="text-text-secondary text-[11px]">{item.title}</div>
                              {item.notes && (
                                <div className="text-text-tertiary text-[10px] mt-0.5 italic">
                                  "{item.notes}"
                                </div>
                              )}
                            </td>
                            <td className="py-3 px-3">
                              {item.status === 'completed' && (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-status-success-bg text-status-success border border-status-success/20">
                                  <Check className="w-3 h-3" /> Recorded
                                </span>
                              )}
                              {item.status === 'in-progress' && (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-status-warning-bg text-status-warning border border-status-warning/20">
                                  <Clock className="w-3 h-3" /> Due
                                </span>
                              )}
                              {item.status === 'scheduled' && (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-surface-secondary text-text-tertiary border border-border">
                                  Scheduled
                                </span>
                              )}
                            </td>
                            <td className="py-3 px-3 font-mono text-[11px] text-text-secondary">
                              {item.values}
                            </td>
                            <td className="py-3 px-3 font-medium text-text-primary">{item.operator}</td>
                            <td className="py-3 px-3 text-right text-text-tertiary font-mono text-[11px]">
                              {item.time}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={5} className="py-6 text-center text-text-tertiary">
                            No log entries match your filter query.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            /* Dashboard View */
            <>
              {/* Active Protocol Status Bar */}
              <div className="p-3 rounded-panel bg-brand-subtle/40 border border-brand/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-brand shrink-0" />
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-text-primary">
                      Digital Protocol
                    </span>
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold uppercase bg-status-success-bg text-status-success border border-status-success/20">
                      Compliant
                    </span>
                  </div>
                </div>

                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setIsLogModalOpen(true)}
                  leftIcon={<PlusCircle className="w-3.5 h-3.5" />}
                  className="text-xs px-3 py-1"
                >
                  Log Entry
                </Button>
              </div>

              {/* Water Quality Telemetry Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="p-4 rounded-panel bg-surface border border-border shadow-card">
                  <div className="flex items-center justify-between text-text-secondary mb-2">
                    <span className="font-medium">Dissolved Oxygen</span>
                    <Droplets className="w-4 h-4 text-brand" />
                  </div>
                  <div className="text-xl font-bold text-text-primary">
                    8.6 <span className="text-xs font-normal text-text-tertiary">mg/L</span>
                  </div>
                  <div className="mt-1.5 flex items-center gap-1 text-[11px] text-status-success font-medium">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>102% Saturation</span>
                  </div>
                </div>

                <div className="p-4 rounded-panel bg-surface border border-border shadow-card">
                  <div className="flex items-center justify-between text-text-secondary mb-2">
                    <span className="font-medium">TAN</span>
                    <Activity className="w-4 h-4 text-status-info" />
                  </div>
                  <div className="text-xl font-bold text-text-primary">
                    0.012 <span className="text-xs font-normal text-text-tertiary">mg/L</span>
                  </div>
                  <div className="mt-1.5 flex items-center gap-1 text-[11px] text-status-success font-medium">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Optimal</span>
                  </div>
                </div>

                <div className="p-4 rounded-panel bg-surface border border-border shadow-card">
                  <div className="flex items-center justify-between text-text-secondary mb-2">
                    <span className="font-medium">Water Temp</span>
                    <Thermometer className="w-4 h-4 text-status-warning" />
                  </div>
                  <div className="text-xl font-bold text-text-primary">
                    14.1 <span className="text-xs font-normal text-text-tertiary">°C</span>
                  </div>
                  <div className="mt-1.5 flex items-center gap-1 text-[11px] text-status-success font-medium">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>In Range</span>
                  </div>
                </div>

                <div className="p-4 rounded-panel bg-surface border border-border shadow-card">
                  <div className="flex items-center justify-between text-text-secondary mb-2">
                    <span className="font-medium">Biomass</span>
                    <Fish className="w-4 h-4 text-brand" />
                  </div>
                  <div className="text-xl font-bold text-text-primary">
                    42,500 <span className="text-xs font-normal text-text-tertiary">kg</span>
                  </div>
                  <div className="mt-1.5 flex items-center gap-1 text-[11px] text-text-secondary">
                    <span>3 Tanks</span>
                  </div>
                </div>
              </div>

              {/* 5-Interval Monitoring Log */}
              <div className="p-5 rounded-panel bg-surface border border-border shadow-card space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-border">
                  <h3 className="font-semibold text-text-primary">
                    5-Interval Monitoring Log
                  </h3>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5 font-mono text-text-tertiary">
                      <FileCheck className="w-3.5 h-3.5 text-brand" />
                      <span>{completedCount} / 5 Logged</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsLogModalOpen(true)}
                      className="text-[11px] h-7 px-2 text-brand hover:text-brand-hover"
                    >
                      + New Entry
                    </Button>
                  </div>
                </div>

                <div className="divide-y divide-border">
                  {logs.map((item) => (
                    <div
                      key={item.id}
                      className="py-2.5 flex items-center justify-between gap-2"
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-text-primary">
                            {item.interval}: {item.title}
                          </span>
                          {item.status === 'completed' && (
                            <span className="px-1.5 py-0.5 rounded text-[9px] font-semibold bg-status-success-bg text-status-success border border-status-success/20">
                              Recorded
                            </span>
                          )}
                          {item.status === 'in-progress' && (
                            <span className="px-1.5 py-0.5 rounded text-[9px] font-semibold bg-status-warning-bg text-status-warning border border-status-warning/20">
                              Due
                            </span>
                          )}
                          {item.status === 'scheduled' && (
                            <span className="px-1.5 py-0.5 rounded text-[9px] font-semibold bg-surface-secondary text-text-tertiary border border-border">
                              Scheduled
                            </span>
                          )}
                        </div>
                        <p className="text-text-secondary font-mono text-[11px]">{item.values}</p>
                      </div>

                      <div className="text-right shrink-0">
                        <div className="text-text-primary font-medium">{item.operator}</div>
                        <div className="text-text-tertiary text-[10px]">{item.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </main>
      </div>

      {/* Interactive Log Entry Modal */}
      {isLogModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/70 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-lg rounded-panel bg-surface border border-border shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-4 border-b border-border flex items-center justify-between bg-surface-secondary/40">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-brand/10 border border-brand/20 flex items-center justify-center text-brand">
                  <FileCheck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-text-primary text-sm">Record Protocol Log Entry</h3>
                  <p className="text-[11px] text-text-secondary">Input RAS monitoring parameters for compliance audit</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsLogModalOpen(false)}
                className="p-1 text-text-secondary hover:text-text-primary rounded-md"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveLogEntry} className="p-5 space-y-4 overflow-y-auto">
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-text-secondary">Monitoring Interval</label>
                <select
                  value={formInterval}
                  onChange={(e) => {
                    setFormInterval(e.target.value);
                    if (e.target.value.includes('Interval 1')) setFormTitle('Morning Routine & Dissolved Oxygen');
                    else if (e.target.value.includes('Interval 2')) setFormTitle('Post-Feed 1 Water Quality Audit');
                    else if (e.target.value.includes('Interval 3')) setFormTitle('Midday Biofilter & MBBR Inspection');
                    else if (e.target.value.includes('Interval 4')) setFormTitle('Afternoon Feed & Mortality Assessment');
                    else if (e.target.value.includes('Interval 5')) setFormTitle('Night Cycle Oxygenation & Backup Check');
                  }}
                  className="w-full px-3 py-1.5 rounded-lg bg-surface border border-border text-xs focus:outline-none focus:border-brand text-text-primary font-medium"
                >
                  <option value="Interval 1 (06:00)">Interval 1 (06:00 AM) - Morning Routine</option>
                  <option value="Interval 2 (09:30)">Interval 2 (09:30 AM) - Post-Feed 1</option>
                  <option value="Interval 3 (13:00)">Interval 3 (01:00 PM) - Midday Biofilter</option>
                  <option value="Interval 4 (17:00)">Interval 4 (05:00 PM) - Afternoon Feed</option>
                  <option value="Interval 5 (21:00)">Interval 5 (09:00 PM) - Night Cycle</option>
                  <option value="Custom Protocol">Custom Operational Routine</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-text-secondary">Routine Title / Activity</label>
                <input
                  type="text"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-surface border border-border text-xs focus:outline-none focus:border-brand text-text-primary font-medium"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-text-secondary">DO (mg/L)</label>
                  <input
                    type="text"
                    value={formDo}
                    onChange={(e) => setFormDo(e.target.value)}
                    placeholder="8.4"
                    className="w-full px-3 py-1.5 rounded-lg bg-surface border border-border text-xs font-mono focus:outline-none focus:border-brand text-text-primary"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-text-secondary">Temp (°C)</label>
                  <input
                    type="text"
                    value={formTemp}
                    onChange={(e) => setFormTemp(e.target.value)}
                    placeholder="14.2"
                    className="w-full px-3 py-1.5 rounded-lg bg-surface border border-border text-xs font-mono focus:outline-none focus:border-brand text-text-primary"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-text-secondary">TAN (mg/L)</label>
                  <input
                    type="text"
                    value={formTan}
                    onChange={(e) => setFormTan(e.target.value)}
                    placeholder="0.013"
                    className="w-full px-3 py-1.5 rounded-lg bg-surface border border-border text-xs font-mono focus:outline-none focus:border-brand text-text-primary"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-text-secondary">pH Level</label>
                  <input
                    type="text"
                    value={formPh}
                    onChange={(e) => setFormPh(e.target.value)}
                    placeholder="7.20"
                    className="w-full px-3 py-1.5 rounded-lg bg-surface border border-border text-xs font-mono focus:outline-none focus:border-brand text-text-primary"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-text-secondary">Operator / Supervisor Name</label>
                <input
                  type="text"
                  value={formOperator}
                  onChange={(e) => setFormOperator(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-surface border border-border text-xs focus:outline-none focus:border-brand text-text-primary font-medium"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-text-secondary">Notes / Remarks</label>
                <textarea
                  value={formNotes}
                  onChange={(e) => setFormNotes(e.target.value)}
                  rows={2}
                  className="w-full px-3 py-1.5 rounded-lg bg-surface border border-border text-xs focus:outline-none focus:border-brand text-text-primary"
                  placeholder="Additional observations, flow rates, biofilter remarks..."
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-border">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsLogModalOpen(false)}
                  className="text-xs"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  leftIcon={<Check className="w-3.5 h-3.5" />}
                  className="text-xs px-4"
                >
                  Save Log Entry
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 py-4 text-[11px] text-text-tertiary flex items-center justify-between gap-2 border-t border-border mt-auto">
        <span>© 2026 Aero Intelli. AERIQ RAS</span>
        <span>Venigem SaaS Platform</span>
      </footer>
    </div>
  );
}

  );
}
