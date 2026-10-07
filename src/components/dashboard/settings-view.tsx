'use client';

import React, { useState } from 'react';
import { useAuth } from '@/lib/auth/auth-context';
import { AuthUser } from '@/types/auth';
import { Input } from '@/components/ui/input';
import { FormField } from '@/components/ui/form-field';
import { Alert } from '@/components/ui/alert';
import {
  User,
  ShieldCheck,
  Key,
  CheckCircle2,
  Bell,
  Sliders,
  Lock,
} from 'lucide-react';

interface SettingsViewProps {
  user: AuthUser | null;
  onUpdateUser?: (updated: Partial<AuthUser>) => void;
}

function SaveCustomIcon({ className = 'w-6 h-6' }: { className?: string }) {
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
          d="M12.89 5.88086H5.11C3.4 5.88086 2 7.28086 2 8.99086V20.3509C2 21.8009 3.04 22.4209 4.31 21.7109L8.24 19.5209C8.66 19.2909 9.34 19.2909 9.75 19.5209L13.68 21.7109C14.96 22.4109 16 21.8009 16 20.3509V8.99086C16 7.28086 14.6 5.88086 12.89 5.88086Z"
        />
        <path
          d="M22.0001 5.11V16.47C22.0001 17.92 20.9601 18.53 19.6901 17.83L17.7601 16.75C17.6001 16.66 17.5001 16.31 17.5001 16.31V8.99C17.5001 6.45 15.4301 4.38 12.8901 4.38H8.82008C8.45008 4.38 8.19008 3.99 8.36008 3.67C8.88008 2.68 9.92008 2 11.1101 2H18.8901C20.6001 2 22.0001 3.4 22.0001 5.11Z"
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

export function SettingsView({ user, onUpdateUser }: SettingsViewProps) {
  const [activeSubTab, setActiveSubTab] = useState<'general' | 'configuration' | 'security' | 'notifications'>('general');
  const [isSaved, setIsSaved] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // General profile form state initialized with registered user data or defaults
  const [generalData, setGeneralData] = useState({
    firstName: user?.firstName || (user?.fullName ? user.fullName.split(' ')[0] : 'Aqua'),
    lastName: user?.lastName || (user?.fullName && user.fullName.split(' ').length > 1 ? user.fullName.split(' ').slice(1).join(' ') : 'Operator'),
    companyName: user?.companyName || 'Venigem Advanced Technologies',
    mobileNumber: user?.mobileNumber || '+47 912 34 567',
    email: user?.email || 'operator@aqua-farms.no',
  });

  // Fish Species & Configuration state
  const [selectedSpecies, setSelectedSpecies] = useState<'Murrel' | 'Vannamei Shrimp' | 'Mud Crab' | 'Other'>('Murrel');
  const [customSpecies, setCustomSpecies] = useState('');
  const [targetBiomass, setTargetBiomass] = useState('45,000');
  const [waterTemperature, setWaterTemperature] = useState('14.5');

  const handleGeneralChange = (field: keyof typeof generalData, value: string) => {
    setGeneralData((prev) => ({ ...prev, [field]: value }));
    setIsSaved(false);
  };

  const handleSaveGeneral = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSaved(true);
      if (onUpdateUser) {
        onUpdateUser({
          firstName: generalData.firstName,
          lastName: generalData.lastName,
          fullName: `${generalData.firstName} ${generalData.lastName}`.trim(),
          companyName: generalData.companyName,
          mobileNumber: generalData.mobileNumber,
          email: generalData.email,
        });
      }
    }, 400);
  };

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSaved(true);
    }, 400);
  };

  const settingsMenu = [
    { id: 'general', label: 'General', icon: User, desc: 'Personal info, mobile number, & company details' },
    { id: 'configuration', label: 'Configuration', icon: Sliders, desc: 'Fish species selection, custom species, RAS specs' },
    { id: 'security', label: 'Security & Auth', icon: Key, desc: 'Password, two-factor authentication, sessions' },
    { id: 'notifications', label: 'Alerts & Notifications', icon: Bell, desc: 'Threshold alerts, SMS & email dispatches' },
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
            Manage your user account registration details, species configuration, and RAS operational parameters.
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
                  onClick={() => {
                    setActiveSubTab(item.id as typeof activeSubTab);
                    setIsSaved(false);
                  }}
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

        {/* Main Settings Content Panel */}
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

              {/* Success Alert */}
              {isSaved && (
                <Alert
                  variant="success"
                  description="Your profile and registration details have been updated successfully."
                  onDismiss={() => setIsSaved(false)}
                />
              )}

              <form onSubmit={handleSaveGeneral} className="space-y-5">
                {/* First Name & Last Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField id="setting-firstName" label="First Name" required>
                    {({ id }) => (
                      <Input
                        id={id}
                        type="text"
                        value={generalData.firstName}
                        onChange={(e) => handleGeneralChange('firstName', e.target.value)}
                        placeholder="First name"
                      />
                    )}
                  </FormField>

                  <FormField id="setting-lastName" label="Last Name" required>
                    {({ id }) => (
                      <Input
                        id={id}
                        type="text"
                        value={generalData.lastName}
                        onChange={(e) => handleGeneralChange('lastName', e.target.value)}
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
                        value={generalData.email}
                        onChange={(e) => handleGeneralChange('email', e.target.value)}
                        placeholder="name@company.com"
                      />
                    )}
                  </FormField>

                  <FormField id="setting-mobileNumber" label="Mobile Number" required>
                    {({ id }) => (
                      <Input
                        id={id}
                        type="tel"
                        value={generalData.mobileNumber}
                        onChange={(e) => handleGeneralChange('mobileNumber', e.target.value)}
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
                      value={generalData.companyName}
                      onChange={(e) => handleGeneralChange('companyName', e.target.value)}
                      placeholder="Company or farm name"
                    />
                  )}
                </FormField>

                {/* Read-Only System Metadata */}
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

                {/* Save Icon Only Button with Liquid Glass Tooltip */}
                <div className="pt-4 flex items-center justify-end">
                  <div className="relative group inline-block">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      aria-label="Save"
                      className="w-12 h-12 rounded-2xl bg-brand hover:bg-brand-hover active:scale-95 text-neutral-950 flex items-center justify-center shadow-subtle transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand disabled:opacity-50"
                    >
                      <SaveCustomIcon className="w-6 h-6" />
                    </button>
                    {/* Liquid Glass Style Tooltip */}
                    <div className="opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-200 absolute -top-11 left-1/2 -translate-x-1/2 pointer-events-none z-20 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-text-primary bg-white/30 dark:bg-black/40 backdrop-blur-xl border border-white/40 dark:border-white/20 shadow-elevated whitespace-nowrap">
                      Save
                    </div>
                  </div>
                </div>
              </form>
            </div>
          )}

          {/* Configuration Tab View */}
          {activeSubTab === 'configuration' && (
            <div className="p-6 rounded-panel bg-surface border border-border shadow-card space-y-6">
              <div className="pb-4 border-b border-border">
                <h2 className="text-lg font-bold text-text-primary flex items-center gap-2">
                  <Sliders className="w-5 h-5 text-brand" />
                  <span>Species & Operational Configuration</span>
                </h2>
                <p className="text-xs text-text-secondary mt-0.5">
                  Select the primary aquaculture species cultivated in your RAS facilities and configure biomass limits.
                </p>
              </div>

              {/* Success Alert */}
              {isSaved && (
                <Alert
                  variant="success"
                  description="Configuration parameters saved successfully."
                  onDismiss={() => setIsSaved(false)}
                />
              )}

              <form onSubmit={handleSaveConfig} className="space-y-6">
                {/* Species Selection */}
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-text-primary block">
                    Select Fish / Aquaculture Species
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { id: 'Murrel', label: 'Murrel (Snakehead Fish)', desc: 'Channa striata / Marulius' },
                      { id: 'Vannamei Shrimp', label: 'Vannamei Shrimp', desc: 'Litopenaeus vannamei' },
                      { id: 'Mud Crab', label: 'Mud Crab', desc: 'Scylla serrata' },
                      { id: 'Other', label: 'Other Species', desc: 'Specify custom species below' },
                    ].map((species) => {
                      const isSelected = selectedSpecies === species.id;
                      return (
                        <button
                          key={species.id}
                          type="button"
                          onClick={() => {
                            setSelectedSpecies(species.id as typeof selectedSpecies);
                            setIsSaved(false);
                          }}
                          className={`p-4 rounded-xl border text-left transition-all flex items-start justify-between gap-3 ${
                            isSelected
                              ? 'bg-brand-subtle/50 border-brand ring-1 ring-brand/40 shadow-subtle'
                              : 'bg-surface hover:bg-surface-secondary border-border'
                          }`}
                        >
                          <div className="space-y-1">
                            <div className="text-sm font-bold text-text-primary">{species.label}</div>
                            <div className="text-xs text-text-secondary">{species.desc}</div>
                          </div>
                          <div
                            className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                              isSelected ? 'border-brand bg-brand text-neutral-950' : 'border-border'
                            }`}
                          >
                            {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-neutral-950" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Conditional Custom Species Input when "Other" is Selected */}
                {selectedSpecies === 'Other' && (
                  <div className="p-4 rounded-xl bg-surface-secondary/60 border border-brand/30 space-y-3 animate-fade-in">
                    <FormField id="custom-species-input" label="Specify Custom Species Name" required>
                      {({ id }) => (
                        <Input
                          id={id}
                          type="text"
                          value={customSpecies}
                          onChange={(e) => {
                            setCustomSpecies(e.target.value);
                            setIsSaved(false);
                          }}
                          placeholder="e.g. Atlantic Salmon, Tilapia, Barramundi..."
                        />
                      )}
                    </FormField>
                  </div>
                )}

                {/* Additional RAS Parameters */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField id="target-biomass" label="Target Stocking Biomass (kg)">
                    {({ id }) => (
                      <Input
                        id={id}
                        type="text"
                        value={targetBiomass}
                        onChange={(e) => setTargetBiomass(e.target.value)}
                        placeholder="45,000"
                      />
                    )}
                  </FormField>

                  <FormField id="target-temp" label="Target Water Temperature (°C)">
                    {({ id }) => (
                      <Input
                        id={id}
                        type="text"
                        value={waterTemperature}
                        onChange={(e) => setWaterTemperature(e.target.value)}
                        placeholder="14.5"
                      />
                    )}
                  </FormField>
                </div>

                {/* Save Icon Only Button with Liquid Glass Tooltip */}
                <div className="pt-4 flex items-center justify-end">
                  <div className="relative group inline-block">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      aria-label="Save"
                      className="w-12 h-12 rounded-2xl bg-brand hover:bg-brand-hover active:scale-95 text-neutral-950 flex items-center justify-center shadow-subtle transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand disabled:opacity-50"
                    >
                      <SaveCustomIcon className="w-6 h-6" />
                    </button>
                    {/* Liquid Glass Style Tooltip */}
                    <div className="opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-200 absolute -top-11 left-1/2 -translate-x-1/2 pointer-events-none z-20 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-text-primary bg-white/30 dark:bg-black/40 backdrop-blur-xl border border-white/40 dark:border-white/20 shadow-elevated whitespace-nowrap">
                      Save
                    </div>
                  </div>
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
                  <button type="button" className="px-4 py-2 rounded-full border border-border hover:bg-surface-secondary font-semibold">
                    Change Password
                  </button>
                </div>

                <div className="p-4 rounded-lg bg-surface-secondary/40 border border-border flex items-center justify-between gap-4">
                  <div>
                    <div className="font-semibold text-text-primary">Two-Factor Authentication (2FA)</div>
                    <div className="text-status-success mt-0.5 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Enabled via SMS & Authenticator App</span>
                    </div>
                  </div>
                  <button type="button" className="px-4 py-2 rounded-full border border-border hover:bg-surface-secondary font-semibold">
                    Configure 2FA
                  </button>
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
