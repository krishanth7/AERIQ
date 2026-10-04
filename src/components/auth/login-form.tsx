'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginFormData } from '@/lib/validation/auth-schemas';
import { useAuth } from '@/lib/auth/auth-context';
import { FormField } from '@/components/ui/form-field';
import { Input } from '@/components/ui/input';
import { PasswordField } from '@/components/auth/password-field';
import { Button } from '@/components/ui/button';
import { Alert } from '@/components/ui/alert';

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isExpired = searchParams?.get('expired') === 'true';

  const { login } = useAuth();
  const [serverError, setServerError] = useState<string | null>(
    isExpired ? 'Your session has expired. Sign in again to continue.' : null
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setServerError(null);
    try {
      const response = await login(data);
      if (response.success) {
        // Redirect to onboarding or return URL
        const returnUrl = searchParams?.get('from') || '/onboarding';
        router.push(returnUrl);
      } else {
        setServerError(response.error || 'The email or password is incorrect.');
      }
    } catch {
      setServerError("We couldn't connect to AERIQ. Check your connection and try again.");
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Form Header */}
      <div className="space-y-1.5">
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-text-primary">
          Welcome back
        </h1>
        <p className="text-sm sm:text-base text-text-secondary">
          Sign in to continue to AERIQ.
        </p>
      </div>

      {/* Server Error Alert */}
      {serverError && (
        <Alert
          variant="danger"
          description={serverError}
          onDismiss={() => setServerError(null)}
        />
      )}

      {/* Main Login Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        {/* Email Field */}
        <FormField
          id="email"
          label="Email address"
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

        {/* Password Field */}
        <FormField
          id="password"
          label="Password"
          error={errors.password?.message}
          action={
            <Link
              href="/forgot-password"
              className="text-text-secondary hover:text-brand hover:underline font-normal transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand rounded"
            >
              Forgot password?
            </Link>
          }
        >
          {({ id, error, 'aria-describedby': ariaDescribedBy }) => (
            <PasswordField
              id={id}
              autoComplete="current-password"
              placeholder="Enter your password"
              error={error}
              aria-describedby={ariaDescribedBy}
              disabled={isSubmitting}
              {...register('password')}
            />
          )}
        </FormField>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full mt-2"
          isLoading={isSubmitting}
          loadingText="Signing in…"
        >
          Sign in
        </Button>
      </form>

      {/* Navigation Footer */}
      <div className="pt-2 text-center text-sm text-text-secondary">
        <span>New to AERIQ? </span>
        <Link
          href="/register"
          className="text-brand font-medium hover:underline transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand rounded"
        >
          Create an account
        </Link>
      </div>

      {/* Operational Hint for Evaluation / Testing */}
      <div className="pt-4 border-t border-border/40 text-[11px] text-text-tertiary">
        <p className="font-mono">Demo Accounts:</p>
        <p className="mt-0.5">Standard: <span className="text-text-secondary">operator@aqua-farms.no</span></p>
        <p>Test simulation: type <span className="text-text-secondary">wrong@aeriq.com</span> (invalid) or <span className="text-text-secondary">network-error@aeriq.com</span></p>
      </div>
    </div>
  );
}
