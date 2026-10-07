'use client';

import React, { useState } from 'react';
import { ShieldAlert, FileText, CheckCircle2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils/cn';

interface MandatoryTermsModalProps {
  isOpen: boolean;
  onAccept: () => void;
  isSubmitting?: boolean;
}

export const MANDATORY_TERMS_TEXT = {
  title: 'Mandatory Digital Record Requirement',
  system: 'Venigem Advanced Technologies SaaS-based Feed & Fish Management System',
  paragraphs: [
    'Mandatory Digital Record Requirement: The Customer shall maintain complete and accurate operational records through the Venigem Advanced Technologies SaaS-based Feed & Fish Management System. Five monitoring/checklist entries shall be completed each day at the prescribed monitoring intervals. All information must represent actual observations, measurements and operational conditions at the time of entry.',
    'The Customer shall not enter estimated, fabricated, copied, manipulated, back-filled or otherwise misleading information as though it were an actual measurement or observation.',
    'Where required monitoring data is missing, materially delayed, inaccurate, fabricated or manipulated, Venigem Advanced Technologies may be unable to reconstruct system conditions, identify the cause of mortality or abnormal behaviour, or provide reliable technical recommendations.',
    'If fish mortality, increased mortality, abnormal fish behaviour, deterioration of water quality, biofilter upset, equipment malfunction or another RAS incident occurs, the Customer must record and report the event promptly through the prescribed system and follow the applicable emergency procedure.',
    "Venigem Advanced Technologies shall not be responsible for losses to the extent caused by or materially contributed to by the Customer's failure to perform required monitoring, failure to maintain accurate records, failure to report an abnormal condition promptly, operation contrary to prescribed procedures, or submission of false, fabricated or materially misleading operational data.",
    'Missing or inaccurate records shall not, by themselves, automatically establish that the Customer caused an incident; responsibility should be determined according to the circumstances, applicable agreement and applicable law.',
  ],
};

export function MandatoryTermsModal({
  isOpen,
  onAccept,
  isSubmitting = false,
}: MandatoryTermsModalProps) {
  const [isAccepted, setIsAccepted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isAccepted && !isSubmitting) {
      onAccept();
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="terms-modal-title"
      aria-describedby="terms-modal-desc"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/70 backdrop-blur-sm animate-fade-in"
    >
      <div className="relative w-full max-w-2xl bg-surface border border-border shadow-elevated rounded-panel overflow-hidden transition-all duration-200">
        {/* Top Header Badge */}
        <div className="p-6 sm:p-7 border-b border-border bg-surface-secondary/40">
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-xl bg-brand/10 border border-brand/20 flex items-center justify-center text-brand shrink-0">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h2
                id="terms-modal-title"
                className="text-xl sm:text-2xl font-bold tracking-tight text-text-primary"
              >
                {MANDATORY_TERMS_TEXT.title}
              </h2>
              <p
                id="terms-modal-desc"
                className="text-xs sm:text-sm text-text-secondary"
              >
                {MANDATORY_TERMS_TEXT.system}
              </p>
            </div>
          </div>
        </div>

        {/* Scrollable Terms Content */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-7 space-y-6">
          <div
            tabIndex={0}
            role="region"
            aria-label="Mandatory Digital Record Requirements Text"
            className="p-4 sm:p-5 rounded-lg bg-surface-secondary/60 border border-border max-h-72 sm:max-h-80 overflow-y-auto space-y-4 text-xs sm:text-sm leading-relaxed text-text-secondary focus:outline-none focus:ring-1 focus:ring-brand"
          >
            {MANDATORY_TERMS_TEXT.paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className={cn(
                  'text-justify',
                  index === 0 && 'font-medium text-text-primary',
                  index === 1 && 'border-l-2 border-status-warning pl-3 text-text-primary/90',
                  index === 4 && 'border-l-2 border-status-danger pl-3 text-text-primary/90'
                )}
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Operational Requirement Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="flex items-center gap-2 p-2.5 rounded-md bg-surface-secondary/40 border border-border text-text-secondary">
              <FileText className="w-4 h-4 text-brand shrink-0" />
              <span>5 daily checklist entries required</span>
            </div>
            <div className="flex items-center gap-2 p-2.5 rounded-md bg-surface-secondary/40 border border-border text-text-secondary">
              <CheckCircle2 className="w-4 h-4 text-status-success shrink-0" />
              <span>Actual real-time observations only</span>
            </div>
          </div>

          {/* Accept Checkbox */}
          <div className="pt-2 border-t border-border">
            <label
              htmlFor="accept-terms-checkbox"
              className={cn(
                'flex items-start gap-3.5 p-3.5 rounded-lg border transition-all cursor-pointer select-none',
                isAccepted
                  ? 'bg-brand-subtle/50 border-brand/50 ring-1 ring-brand/30'
                  : 'bg-surface hover:bg-surface-secondary border-border'
              )}
            >
              <input
                id="accept-terms-checkbox"
                type="checkbox"
                checked={isAccepted}
                onChange={(e) => setIsAccepted(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded border-border text-brand focus:ring-brand accent-brand cursor-pointer shrink-0"
              />
              <div className="space-y-1">
                <span className="text-sm font-semibold text-text-primary block">
                  Are you Accept the Following Terms
                </span>
                <span className="text-xs text-text-secondary block leading-snug">
                  I confirm that all operational observations, water quality parameters, and feeding telemetry entered by my team will represent actual conditions without fabrication, estimation, or back-filling.
                </span>
              </div>
            </label>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-end gap-3">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={!isAccepted || isSubmitting}
              isLoading={isSubmitting}
              rightIcon={<ArrowRight className="w-4 h-4" />}
              className="w-full sm:w-auto"
            >
              Enter into the Dashboard
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
