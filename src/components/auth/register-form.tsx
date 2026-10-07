'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, RegisterFormData, checkPasswordRequirements } from '@/lib/validation/auth-schemas';
import { useAuth } from '@/lib/auth/auth-context';
import { FormField } from '@/components/ui/form-field';
import { Input } from '@/components/ui/input';
import { PasswordField } from '@/components/auth/password-field';
import { PasswordRequirementsView } from '@/components/auth/password-requirements';
import { Button } from '@/components/ui/button';
import { Alert } from '@/components/ui/alert';

export function RegisterForm() {
  const router = useRouter();
  const { register: registerAccount } = useAuth();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: 'onBlur',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      companyName: '',
      mobileNumber: '',
      password: '',
      confirmPassword: '',
    },
  });

  // Live password state for instantaneous requirements checklist updates
  const [passwordInput, setPasswordInput] = useState('');
  const passwordRequirements = checkPasswordRequirements(passwordInput);

  const onSubmit = async (data: RegisterFormData) => {
    setServerError(null);
    try {
      const response = await registerAccount(data);
      if (response.success) {
        router.push('/verify-email');
      } else {
        setServerError(response.error || 'An error occurred while creating your account.');
      }
    } catch {
      setServerError("We couldn't connect to AERIQ. Check your connection and try again.");
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="space-y-1.5">
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-text-primary">
          Create your AERIQ account
        </h1>
        <p className="text-sm sm:text-base text-text-secondary">
          Set up your account to start managing your aquaculture operations.
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

      {/* Registration Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        {/* Name Fields: First Name and Last Name */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <FormField
            id="firstName"
            label="First name"
            required
            error={errors.firstName?.message}
          >
            {({ id, error, 'aria-describedby': ariaDescribedBy }) => (
              <Input
                id={id}
                type="text"
                autoComplete="given-name"
                placeholder="First name"
                error={error}
                aria-describedby={ariaDescribedBy}
                disabled={isSubmitting}
                {...register('firstName')}
              />
            )}
          </FormField>

          <FormField
            id="lastName"
            label="Last name"
            required
            error={errors.lastName?.message}
          >
            {({ id, error, 'aria-describedby': ariaDescribedBy }) => (
              <Input
                id={id}
                type="text"
                autoComplete="family-name"
                placeholder="Last name"
                error={error}
                aria-describedby={ariaDescribedBy}
                disabled={isSubmitting}
                {...register('lastName')}
              />
            )}
          </FormField>
        </div>

        {/* Email Address */}
        <FormField
          id="email"
          label="Email address"
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

        {/* Company Name & Mobile Number */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <FormField
            id="companyName"
            label="Company name"
            required
            error={errors.companyName?.message}
          >
            {({ id, error, 'aria-describedby': ariaDescribedBy }) => (
              <Input
                id={id}
                type="text"
                autoComplete="organization"
                placeholder="Company or farm name"
                error={error}
                aria-describedby={ariaDescribedBy}
                disabled={isSubmitting}
                {...register('companyName')}
              />
            )}
          </FormField>

          <FormField
            id="mobileNumber"
            label="Mobile number"
            required
            error={errors.mobileNumber?.message}
          >
            {({ id, error, 'aria-describedby': ariaDescribedBy }) => (
              <Input
                id={id}
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="+1 (555) 000-0000"
                error={error}
                aria-describedby={ariaDescribedBy}
                disabled={isSubmitting}
                {...register('mobileNumber')}
              />
            )}
          </FormField>
        </div>

        {/* Password */}
        <FormField
          id="password"
          label="Password"
          required
          error={errors.password?.message}
        >
          {({ id, error, 'aria-describedby': ariaDescribedBy }) => {
            const pwdProps = register('password');
            return (
              <PasswordField
                id={id}
                autoComplete="new-password"
                placeholder="Create a password"
                error={error}
                aria-describedby={ariaDescribedBy}
                disabled={isSubmitting}
                {...pwdProps}
                onChange={(e) => {
                  pwdProps.onChange(e);
                  setPasswordInput(e.target.value);
                }}
              />
            );
          }}
        </FormField>

        {/* Password Requirements Guide */}
        <PasswordRequirementsView
          requirements={passwordRequirements}
          hasInput={passwordInput.length > 0}
        />

        {/* Confirm Password */}
        <FormField
          id="confirmPassword"
          label="Confirm password"
          required
          error={errors.confirmPassword?.message}
        >
          {({ id, error, 'aria-describedby': ariaDescribedBy }) => (
            <PasswordField
              id={id}
              autoComplete="new-password"
              placeholder="Confirm your password"
              error={error}
              aria-describedby={ariaDescribedBy}
              disabled={isSubmitting}
              {...register('confirmPassword')}
            />
          )}
        </FormField>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full mt-4 rounded-full"
          isLoading={isSubmitting}
          loadingText="Creating account…"
        >
          Create account
        </Button>
      </form>

      {/* Footer */}
      <div className="pt-2 text-center text-sm text-text-secondary">
        <span>Already have an account? </span>
        <Link
          href="/login"
          className="text-neutral-900 dark:text-brand font-semibold hover:underline transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand rounded"
        >
          Sign in
        </Link>
      </div>
    </div>
  );
}
