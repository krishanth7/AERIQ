'use client';

import React, { useState } from 'react';
import { useAuth } from '@/lib/auth/auth-context';
import { AuthUser } from '@/types/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FormField } from '@/components/ui/form-field';
import { Alert } from '@/components/ui/alert';
import {
  User,
  Building,
  Phone,
  Mail,
  ShieldCheck,
  Key,
  CheckCircle2,
  Bell,
  Cpu,
  Save,
  Lock,
} from 'lucide-react';

interface SettingsViewProps {
  user: AuthUser | null;
  onUpdateUser?: (updated: Partial<AuthUser>) => void;
}

export function SettingsView({ user, onUpdateUser }: SettingsViewProps) {
  const [activeSubTab, setActiveSubTab] = useState<'general' | 'security' | 'farm' | 'notifications'>('general');
  const [isSaved, setIsSaved] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // General profile form state initialized with registered user data or defaults
  const [formData, setFormData] = useState({
    firstName: user?.firstName || (user?.fullName ? user.fullName.split(' ')[0] : 'Aqua'),
    lastName: user?.lastName || (user?.fullName && user.fullName.split(' ').length > 1 ? user.fullName.split(' ').slice(1).join(' ') : 'Operator'),
    companyName: user?.companyName || 'Venigem Advanced Technologies',
    mobileNumber: user?.mobileNumber || '+47 912 34 567',
    email: user?.email || 'operator@aqua-farms.no',
  });

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setIsSaved(false);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSaved(true);
      if (onUpdateUser) {
        onUpdateUser({
          firstName: formData.firstName,
          lastName: formData.lastName,
          fullName: `${formData.firstName} ${formData.lastName}`.trim(),
          companyName: formData.companyName,
          mobileNumber: formData.mobileNumber,
          email: formData.email,
        });
      }
    }, 400);
  };

  const settingsMenu = [
    { id: 'general', label: 'General', icon: User, desc: 'Personal info, mobile number, & company details' },
    { id: 'security', label: 'Security & Auth', icon: Key, desc: 'Password, two-factor authentication, sessions' },
    { id: 'farm', label: 'RAS & Farm Setup', icon: Cpu, desc: 'Facility specs, tank volume, biofilter telemetry' },
    { id: 'notifications', label: 'Alerts & Alerts', icon: Bell, desc: 'Threshold alerts, SMS & email dispatches' },
  ];

  return (
    <div className="space-y-8 animate-fade-in max-w-6xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-text-primary">
            Facility & Account Settings
          </h1>
          <p className="text-sm text-text-secondary mt-1">
            Manage your user account registration details, enterprise company profile, and RAS parameters.
          </p>
        </div>
      </div>

      {/* Settings Layout: Left Sub-Menu Sidebar + Main Panel */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Settings Left Sub-Menu Navigation */}
        <div className="md:col-span-1 space-y-1">
          <div className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-text-tertiary">
            Settings Navigation
          </div>
          <nav className="space-y-1">
            {settingsMenu.map((item) => {
              const Icon = item.icon;
              const isActive = activeSubTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveSubTab(item.id as typeof activeSubTab)}
                  className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-left text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-brand text-neutral-950 font-semibold shadow-subtle'
                      : 'text-text-secondary hover:text-text-primary hover:bg-surface-secondary/70'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <div className="flex flex-col min-w-0">
                    <span className="truncate">{item.label}</span>
                  </div>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Main Settings Panel */}
        <div className="md:col-span-3 space-y-6">
          {/* General Tab View */}
          {activeSubTab === 'general' && (
            <div className="p-6 rounded-panel bg-surface border border-border shadow-card space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-border">
                <div>
                  <h2 className="text-lg font-bold text-text-primary flex items-center gap-2">
                    <User className="w-5 h-5 text-brand" />
                    <span>General Profile & Registration Details</span>
                  </h2>
                  <p className="text-xs text-text-secondary mt-0.5">
                    Your personal information and company profile provided during account registration.
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-status-success-bg text-status-success border border-status-success/20 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Verified User</span>
                </span>
              </div>

              {/* Success Notification Alert */}
              {isSaved && (
                <Alert
                  variant="success"
                  description="Your profile and registration details have been updated successfully."
                  onDismiss={() => setIsSaved(false)}
                />
              )}

              <form onSubmit={handleSaveProfile} className="space-y-5">
                {/* First Name & Last Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField id="setting-firstName" label="First Name" required>
                    {({ id }) => (
                      <Input
                        id={id}
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        placeholder="First name"
                      />
                    )}
                  </FormField>

                  <FormField id="setting-lastName" label="Last Name" required>
                    {({ id }) => (
                      <Input
                        id={id}
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        placeholder="Last name"
                      />
                    )}
                  </FormField>
                </div>

                {/* Email & Mobile Number */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField id="setting-email" label="Work Email Address" required>
                    {({ id }) => (
                      <Input
                        id={id}
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="name@company.com"
                      />
                    )}
                  </FormField>

                  <FormField id="setting-mobileNumber" label="Mobile Number" required>
                    {({ id }) => (
                      <Input
                        id={id}
                        type="tel"
                        value={formData.mobileNumber}
                        onChange={(e) => handleInputChange('mobileNumber', e.target.value)}
                        placeholder="+1 (555) 000-0000"
                      />
                    )}
                  </FormField>
                </div>

                {/* Company Name */}
                <FormField id="setting-companyName" label="Company / Organization Name" required>
                  {({ id }) => (
                    <Input
                      id={id}
                      type="text"
                      value={formData.companyName}
                      onChange={(e) => handleInputChange('companyName', e.target.value)}
                      placeholder="Company or farm name"
                    />
                  )}
                </FormField>

                {/* System Record Read-Only Metadata */}
                <div className="p-4 rounded-lg bg-surface-secondary/50 border border-border grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div>
                    <span className="text-text-tertiary block">Account ID</span>
                    <span className="font-mono font-medium text-text-primary">{user?.id || 'usr_demo89'}</span>
                  </div>
                  <div>
                    <span className="text-text-tertiary block">Registration Date</span>
                    <span className="font-medium text-text-primary">
                      {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Today'}
                    </span>
                  </div>
                  <div>
                    <span className="text-text-tertiary block">Access Level</span>
                    <span className="font-medium text-brand">Senior RAS Operator</span>
                  </div>
                </div>

                {/* Submit / Save Button */}
                <div className="pt-2 flex items-center justify-end gap-3">
                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    isLoading={isSubmitting}
                    leftIcon={<Save className="w-4 h-4" />}
                    className="rounded-full px-6"
                  >
                    Save Registration Changes
                  </Button>
                </div>
              </form>
            </div>
          )}

          {/* Security Tab View */}
          {activeSubTab === 'security' && (
            <div className="p-6 rounded-panel bg-surface border border-border shadow-card space-y-6">
              <div className="pb-4 border-b border-border">
                <h2 className="text-lg font-bold text-text-primary flex items-center gap-2">
                  <Lock className="w-5 h-5 text-brand" />
                  <span>Security & Credentials</span>
                </h2>
                <p className="text-xs text-text-secondary mt-0.5">
                  Manage login password, active user sessions, and multi-factor authentication.
                </p>
              </div>

              <div className="space-y-4 text-xs">
                <div className="p-4 rounded-lg bg-surface-secondary/40 border border-border flex items-center justify-between gap-4">
                  <div>
                    <div className="font-semibold text-text-primary">Password Protection</div>
                    <div className="text-text-secondary mt-0.5">Last updated 14 days ago</div>
                  </div>
                  <Button variant="secondary" size="sm" className="rounded-full text-xs">
                    Change Password
                  </Button>
                </div>

                <div className="p-4 rounded-lg bg-surface-secondary/40 border border-border flex items-center justify-between gap-4">
                  <div>
                    <div className="font-semibold text-text-primary">Two-Factor Authentication (2FA)</div>
                    <div className="text-status-success mt-0.5 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Enabled via SMS & Authenticator App</span>
                    </div>
                  </div>
                  <Button variant="secondary" size="sm" className="rounded-full text-xs">
                    Configure 2FA
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Farm Setup Tab View */}
          {activeSubTab === 'farm' && (
            <div className="p-6 rounded-panel bg-surface border border-border shadow-card space-y-6">
              <div className="pb-4 border-b border-border">
                <h2 className="text-lg font-bold text-text-primary flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-brand" />
                  <span>RAS & Facility Setup</span>
                </h2>
                <p className="text-xs text-text-secondary mt-0.5">
                  Facility volume parameters, biofilter specifications, and telemetry hardware gateways.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-lg bg-surface-secondary/40 border border-border space-y-1">
                  <span className="text-text-tertiary">Primary Facility</span>
                  <div className="font-bold text-text-primary">Nordic Marine RAS - Facility 01</div>
                </div>
                <div className="p-4 rounded-lg bg-surface-secondary/40 border border-border space-y-1">
                  <span className="text-text-tertiary">Biofilter Volume</span>
                  <div className="font-bold text-text-primary">1,250 m³ MBBR Carrier Bed</div>
                </div>
              </div>
            </div>
          )}

          {/* Notifications Tab View */}
          {activeSubTab === 'notifications' && (
            <div className="p-6 rounded-panel bg-surface border border-border shadow-card space-y-6">
              <div className="pb-4 border-b border-border">
                <h2 className="text-lg font-bold text-text-primary flex items-center gap-2">
                  <Bell className="w-5 h-5 text-brand" />
                  <span>Alerts & Notifications</span>
                </h2>
                <p className="text-xs text-text-secondary mt-0.5">
                  Configure SMS and Email notifications for water quality parameter deviations.
                </p>
              </div>

              <div className="space-y-3 text-xs">
                <label className="flex items-center justify-between p-3.5 rounded-lg bg-surface-secondary/40 border border-border cursor-pointer">
                  <span className="font-medium text-text-primary">SMS Critical Oxygen & TAN Alerts</span>
                  <input type="checkbox" defaultChecked className="accent-brand w-4 h-4" />
                </label>
                <label className="flex items-center justify-between p-3.5 rounded-lg bg-surface-secondary/40 border border-border cursor-pointer">
                  <span className="font-medium text-text-primary">Daily 5-Interval Compliance Reminders</span>
                  <input type="checkbox" defaultChecked className="accent-brand w-4 h-4" />
                </label>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
