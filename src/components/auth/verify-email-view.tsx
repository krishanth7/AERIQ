'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/auth-context';
import { maskEmail } from '@/lib/auth/email-utils';
import { Button } from '@/components/ui/button';
import { Alert } from '@/components/ui/alert';
import { Mail, CheckCircle2, RefreshCw, ArrowLeft } from 'lucide-react';

export function VerifyEmailView() {
  const router = useRouter();
  const {
    pendingVerificationEmail,
    resendCooldown,
    resendVerificationEmail,
    verifyEmailToken,
  } = useAuth();

  const [notification, setNotification] = useState<{
    variant: 'success' | 'danger' | 'info';
    message: string;
  } | null>(null);

  const [isResending, setIsResending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  // Email to display (fallback to example domain if navigated directly)
  const displayEmail = pendingVerificationEmail || 'operator@aqua-farms.no';
  const maskedEmail = maskEmail(displayEmail);

  const handleResend = async () => {
    if (resendCooldown > 0 || isResending) return;
    setIsResending(true);
    setNotification(null);

    try {
      const response = await resendVerificationEmail();
      if (response.success) {
        setNotification({
          variant: 'success',
          message: 'A fresh verification link has been sent to your inbox.',
        });
      } else {
        setNotification({
          variant: 'danger',
          message: response.error || 'Failed to resend verification email.',
        });
      }
    } catch {
      setNotification({
        variant: 'danger',
        message: 'Could not connect to service. Please try again.',
      });
    } finally {
      setIsResending(false);
    }
  };

  // Simulated verification action for demonstration / QA
  const handleSimulateVerification = async () => {
    setIsVerifying(true);
    setNotification(null);
    try {
      const response = await verifyEmailToken('demo_token');
      if (response.success) {
        setIsVerified(true);
      }
    } finally {
      setIsVerifying(false);
    }
  };

  // Render Verification Success State
  if (isVerified) {
    return (
      <div className="w-full space-y-6 text-center animate-fade-in">
        <div className="mx-auto w-12 h-12 rounded-full bg-status-success/15 flex items-center justify-center text-status-success">
          <CheckCircle2 className="w-6 h-6 stroke-[2]" aria-hidden="true" />
        </div>

        <div className="space-y-1.5">
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-text-primary">
            Email verified
          </h1>
          <p className="text-sm sm:text-base text-text-secondary">
            Your AERIQ account is ready.
          </p>
        </div>

        <Button
          variant="primary"
          size="lg"
          className="w-full"
          onClick={() => router.push('/onboarding')}
        >
          Continue
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      {/* Icon and Header */}
      <div className="space-y-3">
        <div className="w-10 h-10 rounded-lg bg-brand-subtle border border-brand/20 flex items-center justify-center text-brand">
          <Mail className="w-5 h-5" aria-hidden="true" />
        </div>

        <div className="space-y-1.5">
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-text-primary">
            Verify your email
          </h1>
          <p className="text-sm text-text-secondary">
            We&apos;ve sent a verification link to:
          </p>
          <div className="font-mono text-sm font-medium text-text-primary bg-surface-secondary/70 border border-border px-3 py-2 rounded-md inline-block select-all">
            {maskedEmail}
          </div>
          <p className="text-xs sm:text-sm text-text-secondary pt-1 leading-relaxed">
            Open the email and follow the link to verify your AERIQ account and start managing your aquaculture operations.
          </p>
        </div>
      </div>

      {/* Notifications */}
      {notification && (
        <Alert
          variant={notification.variant}
          description={notification.message}
          onDismiss={() => setNotification(null)}
        />
      )}

      {/* Action Buttons */}
      <div className="space-y-3 pt-2">
        {/* Resend Action with Cooldown */}
        <Button
          variant="secondary"
          size="md"
          className="w-full"
          disabled={resendCooldown > 0 || isResending}
          isLoading={isResending}
          loadingText="Resending verification email…"
          onClick={handleResend}
          leftIcon={<RefreshCw className="w-4 h-4" aria-hidden="true" />}
        >
          {resendCooldown > 0
            ? `Resend available in ${resendCooldown}s`
            : 'Resend verification email'}
        </Button>

        {/* Demo trigger: Simulate Link Click */}
        <Button
          variant="outline"
          size="sm"
          className="w-full text-xs text-text-secondary border-dashed"
          onClick={handleSimulateVerification}
          isLoading={isVerifying}
          loadingText="Verifying…"
        >
          (Demo: Simulate Clicking Email Link)
        </Button>
      </div>

      {/* Footnote Actions */}
      <div className="pt-4 border-t border-border flex items-center justify-between text-xs text-text-secondary">
        <Link
          href="/register"
          className="hover:text-brand hover:underline transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand rounded"
        >
          Change email
        </Link>
        <Link
          href="/login"
          className="flex items-center gap-1 hover:text-brand hover:underline transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand rounded"
        >
          <ArrowLeft className="w-3 h-3" aria-hidden="true" />
          <span>Back to sign in</span>
        </Link>
      </div>
    </div>
  );
}
