'use client';

import React from 'react';

export function AuthBrandPanel() {
  return (
    <aside
      aria-label="AERIQ Platform Overview"
      className="relative hidden lg:flex flex-col justify-between w-[44%] p-10 xl:p-14 bg-surface-secondary/40 border-r border-border overflow-hidden select-none"
    >
      {/* Background Engineering Technical Graphic */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.06] dark:opacity-[0.08]" aria-hidden="true">
        <svg
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 500 700"
          fill="none"
          stroke="currentColor"
        >
          {/* Engineering grid lines */}
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* Abstract RAS Water Loop Schematic */}
          {/* Loop Path */}
          <path
            d="M 120 180 H 380 V 320 H 250 V 440 H 380 V 560 H 120 V 180 Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />

          {/* RAS Unit Nodes */}
          {/* 1. Culture Tank */}
          <rect x="70" y="150" width="100" height="60" rx="4" stroke="currentColor" strokeWidth="1.5" />
          <text x="120" y="185" textAnchor="middle" fontSize="10" fontFamily="monospace" fill="currentColor">
            CULTURE TANK
          </text>

          {/* 2. Mechanical Filtration */}
          <rect x="330" y="150" width="100" height="60" rx="4" stroke="currentColor" strokeWidth="1.5" />
          <text x="380" y="185" textAnchor="middle" fontSize="9" fontFamily="monospace" fill="currentColor">
            MECH. FILTER
          </text>

          {/* 3. Biofiltration (MBBR) */}
          <rect x="200" y="290" width="100" height="60" rx="4" stroke="currentColor" strokeWidth="1.5" />
          <text x="250" y="325" textAnchor="middle" fontSize="10" fontFamily="monospace" fill="currentColor">
            BIOFILTER
          </text>

          {/* 4. Degassing */}
          <rect x="330" y="410" width="100" height="60" rx="4" stroke="currentColor" strokeWidth="1.5" />
          <text x="380" y="445" textAnchor="middle" fontSize="10" fontFamily="monospace" fill="currentColor">
            DEGASSING
          </text>

          {/* 5. Oxygenation */}
          <rect x="70" y="530" width="100" height="60" rx="4" stroke="currentColor" strokeWidth="1.5" />
          <text x="120" y="565" textAnchor="middle" fontSize="9" fontFamily="monospace" fill="currentColor">
            OXYGENATION
          </text>

          {/* Direction arrows */}
          <circle cx="250" cy="180" r="3" fill="currentColor" />
          <circle cx="380" cy="240" r="3" fill="currentColor" />
          <circle cx="315" cy="320" r="3" fill="currentColor" />
          <circle cx="250" cy="440" r="3" fill="currentColor" />
          <circle cx="380" cy="500" r="3" fill="currentColor" />
          <circle cx="250" cy="560" r="3" fill="currentColor" />
          <circle cx="120" cy="360" r="3" fill="currentColor" />
        </svg>
      </div>

      {/* Top Header / Brand Hierarchy */}
      <div className="relative z-10 space-y-4">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="text-2xl font-bold tracking-tight text-text-primary">
              AERIQ
            </span>
            <span className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-brand bg-brand-subtle rounded border border-brand/20">
              RAS OS
            </span>
          </div>
          <p className="text-xs text-text-tertiary mt-1 font-medium">
            by Aero Intelli
          </p>
        </div>

        <div className="pt-8 space-y-2">
          <h2 className="text-xl xl:text-2xl font-semibold tracking-tight text-text-primary leading-snug">
            Intelligent RAS
            <br />
            Farm Management
          </h2>
          <p className="text-sm text-text-secondary leading-relaxed max-w-sm pt-1">
            Monitor production, water quality, feeding and RAS operations from one intelligent platform.
          </p>
        </div>
      </div>

      {/* Mid Statement: Monitor. Manage. Analyze. Optimize. */}
      <div className="relative z-10 py-10 space-y-4">
        <div className="space-y-1.5 border-l-2 border-brand/50 pl-4">
          <p className="text-sm font-semibold tracking-wide text-text-primary">Monitor.</p>
          <p className="text-sm font-semibold tracking-wide text-text-primary">Manage.</p>
          <p className="text-sm font-semibold tracking-wide text-text-primary">Analyze.</p>
          <p className="text-sm font-semibold tracking-wide text-text-primary">Optimize.</p>
        </div>

        {/* Minimal Engineering Metrics Preview */}
        <div className="pt-4 grid grid-cols-2 gap-3 max-w-xs text-xs">
          <div className="p-2.5 rounded-lg border border-border bg-surface/50 backdrop-blur-sm">
            <div className="text-[10px] uppercase font-mono text-text-tertiary">TAN Removal</div>
            <div className="text-sm font-medium text-text-primary mt-0.5">99.4%</div>
          </div>
          <div className="p-2.5 rounded-lg border border-border bg-surface/50 backdrop-blur-sm">
            <div className="text-[10px] uppercase font-mono text-text-tertiary">DO Saturation</div>
            <div className="text-sm font-medium text-text-primary mt-0.5">102%</div>
          </div>
        </div>
      </div>

      {/* Bottom Technical Keywords */}
      <div className="relative z-10 pt-6 border-t border-border/80">
        <div className="flex flex-wrap gap-x-3 gap-y-1.5 text-xs text-text-tertiary font-mono">
          <span>Aquaculture</span>
          <span>·</span>
          <span>RAS Engineering</span>
          <span>·</span>
          <span>IoT</span>
          <span>·</span>
          <span>Analytics</span>
          <span>·</span>
          <span>Intelligence</span>
        </div>
      </div>
    </aside>
  );
}
