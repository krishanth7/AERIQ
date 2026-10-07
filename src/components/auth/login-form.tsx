'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  loginSchema,
  LoginFormData,
  forgotPasswordSchema,
  ForgotPasswordFormData,
} from '@/lib/validation/auth-schemas';
import { useAuth } from '@/lib/auth/auth-context';
import { FormField } from '@/components/ui/form-field';
import { Input } from '@/components/ui/input';
import { PasswordField } from '@/components/auth/password-field';
import { Button } from '@/components/ui/button';
import { Alert } from '@/components/ui/alert';
import { ArrowLeft, KeyRound, CheckCircle2 } from 'lucide-react';

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isExpired = searchParams?.get('expired') === 'true';

  const { login, requestPasswordReset } = useAuth();
  const [view, setView] = useState<'login' | 'forgot-password'>('login');
  
  // Login State
  const [loginError, setLoginError] = useState<string | null>(
    isExpired ? 'Your session has expired. Sign in again to continue.' : null
  );

  // Forgot Password State
  const [resetError, setResetError] = useState<string | null>(null);
  const [resetSuccess, setResetSuccess] = useState(false);
  const [resetSubmitting, setResetSubmitting] = useState(false);

  // Login Form Hook
  const {
    register: registerLogin,
    handleSubmit: handleSubmitLogin,
    watch: watchLogin,
    formState: { errors: loginErrors, isSubmitting: isLoginSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // Forgot Password Form Hook
  const {
    register: registerForgot,
    handleSubmit: handleSubmitForgot,
    setValue: setForgotValue,
    formState: { errors: forgotErrors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: 'onBlur',
    defaultValues: {
      email: '',
    },
  });

  // Handle Login Submit
  const onLoginSubmit = async (data: LoginFormData) => {
    setLoginError(null);
    try {
      const response = await login(data);
      if (response.success) {
        if (typeof window !== 'undefined') {
          sessionStorage.setItem('aeriq_terms_accepted', 'true');
        }
        router.push('/dashboard');
      } else {
        setLoginError(response.error || 'The email or password is incorrect.');
      }
    } catch {
      setLoginError("We couldn't connect to AERIQ. Check your connection and try again.");
    }
  };

  // Switch to Forgot Password view pre-populating whatever email user typed
  const handleOpenForgotPassword = () => {
    const currentEmail = watchLogin('email');
    if (currentEmail) {
      setForgotValue('email', currentEmail);
    }
    setResetError(null);
    setResetSuccess(false);
    setView('forgot-password');
  };

  // Handle Forgot Password Submit
  const onForgotSubmit = async (data: ForgotPasswordFormData) => {
    setResetError(null);
    setResetSubmitting(true);
    try {
      await requestPasswordReset(data);
      setResetSuccess(true);
    } catch {
      setResetError("We couldn't connect to AERIQ. Check your connection and try again.");
    } finally {
      setResetSubmitting(false);
    }
  };

  // RENDER: Forgot Password View within Login Card
  if (view === 'forgot-password') {
    return (
      <div className="w-full space-y-6 animate-fade-in">
        {/* Header Badge & Title */}
        <div className="space-y-3">
          <div className="w-11 h-11 rounded-full bg-brand/10 border border-brand/20 flex items-center justify-center text-brand">
            <KeyRound className="w-5 h-5" aria-hidden="true" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-text-primary">
              Reset password
            </h1>
            <p className="mt-1 text-sm text-text-secondary">
              Enter your work email and we&apos;ll send you instructions to reset your password.
            </p>
          </div>
        </div>

        {/* Error Alert */}
        {resetError && (
          <Alert
            variant="danger"
            description={resetError}
            onDismiss={() => setResetError(null)}
          />
        )}

        {/* Success Message or Form */}
        {resetSuccess ? (
          <div className="space-y-5">
            <div className="p-4 rounded-2xl bg-brand-subtle border border-brand/25 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-brand shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="text-sm font-semibold text-text-primary">
                  Check your inbox
                </p>
                <p className="text-xs text-text-secondary leading-relaxed">
                  If an account exists for that email, we&apos;ve dispatched password reset instructions.
                </p>
              </div>
            </div>

            <Button
              type="button"
              variant="primary"
              size="lg"
              className="w-full rounded-full"
              onClick={() => {
                setView('login');
                setResetSuccess(false);
              }}
              leftIcon={<ArrowLeft className="w-4 h-4" />}
            >
              Back to sign in
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmitForgot(onForgotSubmit)} className="space-y-5" noValidate>
            <FormField
              id="reset-email"
              label="Work email address"
              required
              error={forgotErrors.email?.message}
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
                  disabled={resetSubmitting}
                  {...registerForgot('email')}
                />
              )}
            </FormField>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full mt-2 rounded-full"
              isLoading={resetSubmitting}
              loadingText="Sending instructions…"
            >
              Send reset instructions
            </Button>

            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={() => setView('login')}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-neutral-900 dark:text-brand hover:underline transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand rounded-full py-1 px-3"
              >
                <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Back to sign in</span>
              </button>
            </div>
          </form>
        )}
      </div>
    );
  }

  // RENDER: Main Login View
  return (
    <div className="w-full space-y-6 animate-fade-in">
      {/* Form Header */}
      <div className="space-y-1.5">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-text-primary">
          Sign in
        </h1>
        <p className="text-sm text-text-secondary">
          Welcome back! Access your AERIQ farm management workspace.
        </p>
      </div>

      {/* Server Error Alert */}
      {loginError && (
        <Alert
          variant="danger"
          description={loginError}
          onDismiss={() => setLoginError(null)}
        />
      )}

      {/* Main Login Form */}
      <form onSubmit={handleSubmitLogin(onLoginSubmit)} className="space-y-5" noValidate>
        {/* Email Field */}
        <FormField
          id="email"
          label="Email address"
          error={loginErrors.email?.message}
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
              disabled={isLoginSubmitting}
              {...registerLogin('email')}
            />
          )}
        </FormField>

        {/* Password Field */}
        <FormField
          id="password"
          label="Password"
          error={loginErrors.password?.message}
          action={
            <button
              type="button"
              onClick={handleOpenForgotPassword}
              className="text-xs sm:text-sm text-neutral-800 dark:text-brand hover:underline font-semibold transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand rounded"
            >
              Forgot password?
            </button>
          }
        >
          {({ id, error, 'aria-describedby': ariaDescribedBy }) => (
            <PasswordField
              id={id}
              autoComplete="current-password"
              placeholder="Enter your password"
              error={error}
              aria-describedby={ariaDescribedBy}
              disabled={isLoginSubmitting}
              {...registerLogin('password')}
            />
          )}
        </FormField>

        {/* Submit Button (Rounded-full professional style) */}
        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full mt-2 rounded-full"
          isLoading={isLoginSubmitting}
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
          className="text-neutral-900 dark:text-brand font-semibold hover:underline transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand rounded"
        >
          Create an account
        </Link>
      </div>
    </div>
  );
}
