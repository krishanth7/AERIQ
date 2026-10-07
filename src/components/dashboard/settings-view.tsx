'use client';

import React, { useState } from 'react';
import { useAuth } from '@/lib/auth/auth-context';
import { AuthUser } from '@/types/auth';
import { saveUserSettingsToFirestore, getUserSettingsFromFirestore } from '@/lib/firebase/user-service';
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
  MapPin,
  Globe,
  Locate,
  Loader2,
  Headphones,
  X,
  ShieldAlert,
} from 'lucide-react';

interface InteractiveMapPreviewProps {
  latitude: string;
  longitude: string;
  onChangeLocation: (lat: string, lng: string) => void;
}

function InteractiveMapPreview({ latitude, longitude, onChangeLocation }: InteractiveMapPreviewProps) {
  const mapContainerRef = React.useRef<HTMLDivElement>(null);
  const mapInstanceRef = React.useRef<any>(null);
  const markerInstanceRef = React.useRef<any>(null);
  const [leafletLoaded, setLeafletLoaded] = useState(false);

  const numLat = parseFloat(latitude) || 16.5449;
  const numLng = parseFloat(longitude) || 81.5212;

  // Dynamically load Leaflet library if not present
  React.useEffect(() => {
    if (typeof window === 'undefined') return;

    if (!document.getElementById('leaflet-css')) {
      const link = document.createElement('link');
      link.id = 'leaflet-css';
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);
    }

    if ((window as any).L) {
      setLeafletLoaded(true);
      return;
    }

    if (!document.getElementById('leaflet-js')) {
      const script = document.createElement('script');
      script.id = 'leaflet-js';
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.onload = () => setLeafletLoaded(true);
      document.body.appendChild(script);
    }
  }, []);

  // Initialize and sync Leaflet map
  React.useEffect(() => {
    if (!leafletLoaded || !mapContainerRef.current) return;
    const L = (window as any).L;
    if (!L) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        zoomControl: true,
        attributionControl: false,
      }).setView([numLat, numLng], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
      }).addTo(map);

      // Custom marker icon with pin design
      const customIcon = L.divIcon({
        className: 'custom-interactive-marker',
        html: `<div style="display:flex;align-items:center;justify-content:center;width:34px;height:34px;background:#10b981;border:3px solid #ffffff;border-radius:50%;box-shadow:0 8px 24px rgba(0,0,0,0.45);cursor:grab;">
                 <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#09090b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
               </div>`,
        iconSize: [34, 34],
        iconAnchor: [17, 17],
      });

      const marker = L.marker([numLat, numLng], {
        draggable: true,
        icon: customIcon,
      }).addTo(map);

      // Drag event handler
      marker.on('drag', (e: any) => {
        const { lat, lng } = e.target.getLatLng();
        onChangeLocation(lat.toFixed(4), lng.toFixed(4));
      });

      marker.on('dragend', (e: any) => {
        const { lat, lng } = e.target.getLatLng();
        onChangeLocation(lat.toFixed(4), lng.toFixed(4));
      });

      // Map click handler
      map.on('click', (e: any) => {
        const { lat, lng } = e.latlng;
        marker.setLatLng([lat, lng]);
        onChangeLocation(lat.toFixed(4), lng.toFixed(4));
      });

      mapInstanceRef.current = map;
      markerInstanceRef.current = marker;
    } else {
      const map = mapInstanceRef.current;
      const marker = markerInstanceRef.current;
      const pos = marker.getLatLng();

      if (Math.abs(pos.lat - numLat) > 0.0001 || Math.abs(pos.lng - numLng) > 0.0001) {
        marker.setLatLng([numLat, numLng]);
        map.panTo([numLat, numLng], { animate: true });
      }
    }
  }, [leafletLoaded, numLat, numLng, onChangeLocation]);

  // Clean up
  React.useEffect(() => {
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div className="relative w-full h-64 rounded-xl overflow-hidden border border-border bg-surface-secondary shadow-inner">
      {!leafletLoaded ? (
        <iframe
          title="Site Location Map Preview"
          className="w-full h-full border-0 filter contrast-[1.05]"
          loading="lazy"
          src={`https://www.openstreetmap.org/export/embed.html?bbox=${numLng - 0.02}%2C${numLat - 0.02}%2C${numLng + 0.02}%2C${numLat + 0.02}&layer=mapnik&marker=${numLat}%2C${numLng}`}
        />
      ) : (
        <div ref={mapContainerRef} className="w-full h-full z-0" />
      )}

      {/* Floating Glassmorphism Coordinate Badge */}
      <div className="absolute bottom-3 left-3 pointer-events-none z-10 px-3 py-1.5 rounded-lg bg-neutral-950/85 backdrop-blur-md border border-white/10 text-[11px] text-white flex items-center gap-2 shadow-elevated">
        <MapPin className="w-3.5 h-3.5 text-brand shrink-0 animate-bounce" />
        <span className="font-mono text-[10.5px] font-semibold tracking-wide">
          {numLat.toFixed(4)}° N, {numLng.toFixed(4)}° E
        </span>
      </div>

      <div className="absolute top-3 right-3 pointer-events-none z-10 px-2.5 py-1 rounded-md bg-neutral-950/70 backdrop-blur-md border border-white/10 text-[10px] text-neutral-300 font-medium">
        Click map or drag pin to adjust
      </div>
    </div>
  );
}

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
          d="M22.0001 5.11V16.47C22.0001 17.92 20.9601 18.53 19.6901 17.83L17.7601 16.75C17.6001 16.66 17.5001 16.49 17.5001 16.31V8.99C17.5001 6.45 15.4301 4.38 12.8901 4.38H8.82008C8.45008 4.38 8.19008 3.99 8.36008 3.67C8.88008 2.68 9.92008 2 11.1101 2H18.8901C20.6001 2 22.0001 3.4 22.0001 5.11Z"
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

  // General profile form state
  const [generalData, setGeneralData] = useState({
    firstName: user?.firstName || (user?.fullName ? user.fullName.split(' ')[0] : 'Aqua'),
    lastName: user?.lastName || (user?.fullName && user.fullName.split(' ').length > 1 ? user.fullName.split(' ').slice(1).join(' ') : 'Operator'),
    companyName: user?.companyName || 'Venigem Advanced Technologies',
    mobileNumber: user?.mobileNumber || '+47 912 34 567',
    email: user?.email || 'operator@aqua-farms.no',
  });

  // Species & Production state
  const [selectedSpecies, setSelectedSpecies] = useState<'Murrel' | 'Vannamei Shrimp' | 'Mud Crab' | 'Other'>('Murrel');
  const [customSpecies, setCustomSpecies] = useState('');
  const [metricTonsPerYear, setMetricTonsPerYear] = useState('500');

  // Location state (Latitude & Longitude)
  const [latitude, setLatitude] = useState('16.5449');
  const [longitude, setLongitude] = useState('81.5212');
  const [isLocating, setIsLocating] = useState(false);

  const handleDetectLocation = () => {
    if (typeof window !== 'undefined' && navigator.geolocation) {
      setIsLocating(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude.toFixed(4));
          setLongitude(position.coords.longitude.toFixed(4));
          setIsSaved(false);
          setIsLocating(false);
        },
        (error) => {
          console.warn('Geolocation error:', error);
          setLatitude('16.5449');
          setLongitude('81.5212');
          setIsSaved(false);
          setIsLocating(false);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    }
  };

  // Single-update restriction state
  const [hasUpdatedOnce, setHasUpdatedOnce] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('aeriq_settings_updated_once') === 'true';
    }
    return false;
  });
  const [showSupportModal, setShowSupportModal] = useState(false);

  const handleGeneralChange = (field: keyof typeof generalData, value: string) => {
    setGeneralData((prev) => ({ ...prev, [field]: value }));
    setIsSaved(false);
  };

  const handleSaveGeneral = (e: React.FormEvent) => {
    e.preventDefault();
    if (hasUpdatedOnce) {
      setShowSupportModal(true);
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSaved(true);
      setHasUpdatedOnce(true);
      if (typeof window !== 'undefined') {
        localStorage.setItem('aeriq_settings_updated_once', 'true');
      }
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
    if (hasUpdatedOnce) {
      setShowSupportModal(true);
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSaved(true);
      setHasUpdatedOnce(true);
      if (typeof window !== 'undefined') {
        localStorage.setItem('aeriq_settings_updated_once', 'true');
      }
    }, 400);
  };

  const settingsMenu = [
    { id: 'general', label: 'General', icon: User },
    { id: 'configuration', label: 'Configuration', icon: Sliders },
    { id: 'security', label: 'Security & Auth', icon: Key },
    { id: 'notifications', label: 'Notifications', icon: Bell },
  ];

  return (
    <div className="space-y-5 animate-fade-in max-w-5xl mx-auto text-xs">
      {/* Ultra-Minimal Header */}
      <div className="pb-3 border-b border-border flex items-center justify-between">
        <h1 className="text-base font-semibold text-text-primary">Settings</h1>
      </div>

      {/* Sub-menu & Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        {/* Left Sub-Menu */}
        <div className="md:col-span-1">
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
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-left font-medium transition-all ${
                    isActive
                      ? 'bg-brand text-neutral-950 font-semibold shadow-subtle'
                      : 'text-text-secondary hover:text-text-primary hover:bg-surface-secondary/70'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Main Content Area */}
        <div className="md:col-span-3 space-y-4">
          {/* General Profile View */}
          {activeSubTab === 'general' && (
            <div className="p-5 rounded-panel bg-surface border border-border shadow-card space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <h2 className="font-semibold text-text-primary flex items-center gap-2">
                  <User className="w-4 h-4 text-brand" />
                  <span>General Profile</span>
                </h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-status-success-bg text-status-success border border-status-success/20 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  <span>Verified</span>
                </span>
              </div>

              {isSaved && (
                <Alert
                  variant="success"
                  description="Saved"
                  onDismiss={() => setIsSaved(false)}
                />
              )}

              <form onSubmit={handleSaveGeneral} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <FormField id="setting-firstName" label="First Name" required>
                    {({ id }) => (
                      <Input
                        id={id}
                        type="text"
                        value={generalData.firstName}
                        onChange={(e) => handleGeneralChange('firstName', e.target.value)}
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
                      />
                    )}
                  </FormField>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <FormField id="setting-email" label="Work Email" required>
                    {({ id }) => (
                      <Input
                        id={id}
                        type="email"
                        value={generalData.email}
                        onChange={(e) => handleGeneralChange('email', e.target.value)}
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
                      />
                    )}
                  </FormField>
                </div>

                <FormField id="setting-companyName" label="Company Name" required>
                  {({ id }) => (
                    <Input
                      id={id}
                      type="text"
                      value={generalData.companyName}
                      onChange={(e) => handleGeneralChange('companyName', e.target.value)}
                    />
                  )}
                </FormField>

                {/* Save Icon Only Button with Liquid Glass Tooltip */}
                <div className="pt-2 flex items-center justify-end">
                  <div className="relative group inline-block">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      aria-label="Save"
                      className="w-10 h-10 rounded-xl bg-brand hover:bg-brand-hover active:scale-95 text-neutral-950 flex items-center justify-center shadow-subtle transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand disabled:opacity-50"
                    >
                      <SaveCustomIcon className="w-5 h-5" />
                    </button>
                    {/* Liquid Glass Style Tooltip */}
                    <div className="opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-200 absolute -top-10 left-1/2 -translate-x-1/2 pointer-events-none z-20 px-3 py-1 rounded-lg text-[11px] font-medium text-text-primary bg-white/30 dark:bg-black/50 backdrop-blur-xl border border-white/40 dark:border-white/20 shadow-elevated whitespace-nowrap">
                      Save
                    </div>
                  </div>
                </div>
              </form>
            </div>
          )}

          {/* Configuration View */}
          {activeSubTab === 'configuration' && (
            <div className="p-5 rounded-panel bg-surface border border-border shadow-card space-y-4">
              <div className="pb-3 border-b border-border">
                <h2 className="font-semibold text-text-primary flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-brand" />
                  <span>Configuration</span>
                </h2>
              </div>

              {isSaved && (
                <Alert
                  variant="success"
                  description="Saved"
                  onDismiss={() => setIsSaved(false)}
                />
              )}

              <form onSubmit={handleSaveConfig} className="space-y-4">
                <div className="space-y-2">
                  <label className="font-semibold text-text-primary block">
                    Fish Species
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'Murrel', label: 'Murrel' },
                      { id: 'Vannamei Shrimp', label: 'Vannamei Shrimp' },
                      { id: 'Mud Crab', label: 'Mud Crab' },
                      { id: 'Other', label: 'Other' },
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
                          className={`p-3 rounded-lg border text-left transition-all flex items-center justify-between ${
                            isSelected
                              ? 'bg-brand-subtle/50 border-brand ring-1 ring-brand/40 font-semibold'
                              : 'bg-surface hover:bg-surface-secondary border-border'
                          }`}
                        >
                          <span>{species.label}</span>
                          <div
                            className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 ${
                              isSelected ? 'border-brand bg-brand text-neutral-950' : 'border-border'
                            }`}
                          >
                            {isSelected && <div className="w-1 h-1 rounded-full bg-neutral-950" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {selectedSpecies === 'Other' && (
                  <div className="p-3 rounded-lg bg-surface-secondary/60 border border-brand/30 animate-fade-in">
                    <FormField id="custom-species-input" label="What species?" required>
                      {({ id }) => (
                        <Input
                          id={id}
                          type="text"
                          value={customSpecies}
                          onChange={(e) => {
                            setCustomSpecies(e.target.value);
                            setIsSaved(false);
                          }}
                          placeholder="Species name"
                        />
                      )}
                    </FormField>
                  </div>
                )}

                <FormField id="metric-tons-input" label="Metric Ton Per Year (MT/year)">
                  {({ id }) => (
                    <Input
                      id={id}
                      type="number"
                      min="0"
                      value={metricTonsPerYear}
                      onChange={(e) => {
                        setMetricTonsPerYear(e.target.value);
                        setIsSaved(false);
                      }}
                      placeholder="e.g. 500"
                    />
                  )}
                </FormField>

                {/* Site Location & Interactive Map Preview */}
                <div className="pt-3 border-t border-border space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="font-semibold text-text-primary flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-brand" />
                      <span>Site Location Confirmation</span>
                    </label>
                    <button
                      type="button"
                      onClick={handleDetectLocation}
                      disabled={isLocating}
                      className="text-[11px] font-medium text-brand hover:text-brand-hover flex items-center gap-1 bg-brand-subtle/40 px-2.5 py-1 rounded-md border border-brand/20 transition-colors disabled:opacity-50"
                    >
                      {isLocating ? (
                        <Loader2 className="w-3 h-3 animate-spin text-brand" />
                      ) : (
                        <Locate className="w-3 h-3" />
                      )}
                      <span>{isLocating ? 'Detecting...' : 'Detect Location'}</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <FormField id="latitude-input" label="Latitude">
                      {({ id }) => (
                        <Input
                          id={id}
                          type="text"
                          value={latitude}
                          onChange={(e) => {
                            setLatitude(e.target.value);
                            setIsSaved(false);
                          }}
                          placeholder="e.g. 16.5449"
                        />
                      )}
                    </FormField>

                    <FormField id="longitude-input" label="Longitude">
                      {({ id }) => (
                        <Input
                          id={id}
                          type="text"
                          value={longitude}
                          onChange={(e) => {
                            setLongitude(e.target.value);
                            setIsSaved(false);
                          }}
                          placeholder="e.g. 81.5212"
                        />
                      )}
                    </FormField>
                  </div>

                  {/* Interactive Map Component */}
                  <div className="space-y-1.5 pt-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-medium text-text-secondary flex items-center gap-1">
                        <Globe className="w-3 h-3 text-brand" />
                        <span>Map Preview</span>
                      </span>
                      <span className="text-[10px] text-text-muted font-mono">
                        {latitude || '0.0000'}°, {longitude || '0.0000'}°
                      </span>
                    </div>

                    <InteractiveMapPreview
                      latitude={latitude}
                      longitude={longitude}
                      onChangeLocation={(newLat, newLng) => {
                        setLatitude(newLat);
                        setLongitude(newLng);
                        setIsSaved(false);
                      }}
                    />
                  </div>
                </div>

                {/* Save Icon Only Button with Liquid Glass Tooltip */}
                <div className="pt-2 flex items-center justify-end">
                  <div className="relative group inline-block">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      aria-label="Save"
                      className="w-10 h-10 rounded-xl bg-brand hover:bg-brand-hover active:scale-95 text-neutral-950 flex items-center justify-center shadow-subtle transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand disabled:opacity-50"
                    >
                      <SaveCustomIcon className="w-5 h-5" />
                    </button>
                    {/* Liquid Glass Style Tooltip */}
                    <div className="opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-200 absolute -top-10 left-1/2 -translate-x-1/2 pointer-events-none z-20 px-3 py-1 rounded-lg text-[11px] font-medium text-text-primary bg-white/30 dark:bg-black/50 backdrop-blur-xl border border-white/40 dark:border-white/20 shadow-elevated whitespace-nowrap">
                      Save
                    </div>
                  </div>
                </div>
              </form>
            </div>
          )}

          {/* Security View */}
          {activeSubTab === 'security' && (
            <div className="p-5 rounded-panel bg-surface border border-border shadow-card space-y-4">
              <div className="pb-3 border-b border-border">
                <h2 className="font-semibold text-text-primary flex items-center gap-2">
                  <Lock className="w-4 h-4 text-brand" />
                  <span>Security</span>
                </h2>
              </div>
              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-surface-secondary/40 border border-border flex items-center justify-between">
                  <span>Password</span>
                  <button type="button" className="px-3 py-1.5 rounded-full border border-border hover:bg-surface-secondary font-medium">
                    Update
                  </button>
                </div>
                <div className="p-3 rounded-lg bg-surface-secondary/40 border border-border flex items-center justify-between">
                  <span>Two-Factor Auth</span>
                  <span className="text-status-success font-medium flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Enabled</span>
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Notifications View */}
          {activeSubTab === 'notifications' && (
            <div className="p-5 rounded-panel bg-surface border border-border shadow-card space-y-4">
              <div className="pb-3 border-b border-border">
                <h2 className="font-semibold text-text-primary flex items-center gap-2">
                  <Bell className="w-4 h-4 text-brand" />
                  <span>Notifications</span>
                </h2>
              </div>
              <div className="space-y-2">
                <label className="flex items-center justify-between p-3 rounded-lg bg-surface-secondary/40 border border-border cursor-pointer">
                  <span>SMS Alerts</span>
                  <input type="checkbox" defaultChecked className="accent-brand w-4 h-4" />
                </label>
                <label className="flex items-center justify-between p-3 rounded-lg bg-surface-secondary/40 border border-border cursor-pointer">
                  <span>Daily Reminders</span>
                  <input type="checkbox" defaultChecked className="accent-brand w-4 h-4" />
                </label>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Floating Glassmorphism Support Modal when Update Limit Reached */}
      {showSupportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-md p-6 rounded-2xl bg-surface/95 border border-white/10 dark:border-white/20 shadow-elevated text-center space-y-4 animate-scale-up">
            <button
              type="button"
              onClick={() => setShowSupportModal(false)}
              className="absolute top-4 right-4 text-text-muted hover:text-text-primary p-1 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-12 h-12 rounded-2xl bg-brand/10 border border-brand/20 text-brand flex items-center justify-center mx-auto shadow-subtle">
              <ShieldAlert className="w-6 h-6" />
            </div>

            <div className="space-y-1.5">
              <h3 className="text-base font-semibold text-text-primary">
                Configuration Locked
              </h3>
              <p className="text-xs text-text-secondary leading-relaxed max-w-sm mx-auto">
                Settings can only be updated <strong>once</strong>. To modify your profile, species selection, or site location again, please contact <strong>AERIQ Support</strong>.
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-2 justify-center">
              <a
                href="mailto:support@aeriq.aero?subject=AERIQ%20Settings%20Update%20Request"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-brand hover:bg-brand-hover text-neutral-950 font-semibold text-xs transition-all shadow-subtle active:scale-95"
              >
                <Headphones className="w-4 h-4" />
                <span>Contact AERIQ Support</span>
              </a>
              <button
                type="button"
                onClick={() => setShowSupportModal(false)}
                className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl border border-border hover:bg-surface-secondary text-text-primary font-medium text-xs transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
