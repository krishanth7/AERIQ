'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { forgotPasswordSchema, ForgotPasswordFormData } from '@/lib/validation/auth-schemas';
import { useAuth } from '@/lib/auth/auth-context';
import { FormField } from '@/components/ui/form-field';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert } from '@/components/ui/alert';
import { ArrowLeft, KeyRound } from 'lucide-react';

export function ForgotPasswordForm() {
  const { requestPasswordReset } = useAuth();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: 'onBlur',
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setServerError(null);
    try {
      await requestPasswordReset(data);
      setIsSubmitted(true);
    } catch {
      setServerError("We couldn't connect to AERIQ. Check your connection and try again.");
    }
  };

  if (isSubmitted) {
    return (
      <div className="w-full space-y-6">
        <div className="w-10 h-10 rounded-lg bg-brand-subtle border border-brand/20 flex items-center justify-center text-brand">
          <KeyRound className="w-5 h-5" aria-hidden="true" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-text-primary">
            Check your inbox
          </h1>
          <p className="text-sm text-text-secondary leading-relaxed">
            If an account exists for this email, we&apos;ve sent password reset instructions.
          </p>
        </div>

        <div className="p-3.5 rounded-lg border border-border bg-surface-secondary/40 text-xs text-text-tertiary">
          Didn&apos;t receive an email? Check your spam filter or verify the address submitted.
        </div>

        <div className="pt-2">
          <Link href="/login" className="w-full block">
            <Button variant="secondary" size="md" className="w-full" leftIcon={<ArrowLeft className="w-4 h-4" />}>
              Back to sign in
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      <div className="space-y-1.5">
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-text-primary">
          Forgot password?
        </h1>
        <p className="text-sm sm:text-base text-text-secondary">
          Enter your work email address and we&apos;ll send you instructions to reset your password.
        </p>
      </div>

      {serverError && (
        <Alert
          variant="danger"
          description={serverError}
          onDismiss={() => setServerError(null)}
        />
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        <FormField
          id="email"
          label="Work email"
          required
          error={errors.email?.message}
        >
          {({ id, error, 'aria-describedby': ariaDescribedBy }) => (
            <Input
              id={id}
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="name@company.com"
              error={error}
              aria-describedby={ariaDescribedBy}
              disabled={isSubmitting}
              {...register('email')}
            />
          )}
        </FormField>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full mt-2"
          isLoading={isSubmitting}
          loadingText="Sending instructions…"
        >
          Send reset instructions
        </Button>
      </form>

      <div className="pt-2 text-center text-sm text-text-secondary">
        <Link
          href="/login"
          className="inline-flex items-center gap-1.5 text-brand font-medium hover:underline transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand rounded"
        >
          <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Back to sign in</span>
        </Link>
      </div>
    </div>
  );
}
