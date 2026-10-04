'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { resetPasswordSchema, ResetPasswordFormData, checkPasswordRequirements } from '@/lib/validation/auth-schemas';
import { FormField } from '@/components/ui/form-field';
import { PasswordField } from '@/components/auth/password-field';
import { PasswordRequirementsView } from '@/components/auth/password-requirements';
import { Button } from '@/components/ui/button';
import { Alert } from '@/components/ui/alert';
import { CheckCircle2 } from 'lucide-react';

export function ResetPasswordForm() {
  const router = useRouter();
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    mode: 'onBlur',
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const passwordValue = useWatch({ control, name: 'password', defaultValue: '' });
  const requirements = checkPasswordRequirements(passwordValue);

  const onSubmit = async (_data: ResetPasswordFormData) => {
    setServerError(null);
    try {
      await new Promise((resolve) => setTimeout(resolve, 600));
      setIsSuccess(true);
    } catch {
      setServerError('Unable to reset password. The link may have expired.');
    }
  };

  if (isSuccess) {
    return (
      <div className="w-full space-y-6 text-center animate-fade-in">
        <div className="mx-auto w-12 h-12 rounded-full bg-status-success/15 flex items-center justify-center text-status-success">
          <CheckCircle2 className="w-6 h-6 stroke-[2]" aria-hidden="true" />
        </div>

        <div className="space-y-1.5">
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-text-primary">
            Password updated
          </h1>
          <p className="text-sm sm:text-base text-text-secondary">
            Your password has been reset successfully.
          </p>
        </div>

        <Button
          variant="primary"
          size="lg"
          className="w-full"
          onClick={() => router.push('/login')}
        >
          Sign in with new password
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      <div className="space-y-1.5">
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-text-primary">
          Set new password
        </h1>
        <p className="text-sm sm:text-base text-text-secondary">
          Enter a secure password for your AERIQ account.
        </p>
      </div>

      {serverError && (
        <Alert
          variant="danger"
          description={serverError}
          onDismiss={() => setServerError(null)}
        />
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <FormField
          id="password"
          label="New password"
          required
          error={errors.password?.message}
        >
          {({ id, error, 'aria-describedby': ariaDescribedBy }) => (
            <PasswordField
              id={id}
              autoComplete="new-password"
              placeholder="Create a new password"
              error={error}
              aria-describedby={ariaDescribedBy}
              disabled={isSubmitting}
              {...register('password')}
            />
          )}
        </FormField>

        <PasswordRequirementsView
          requirements={requirements}
          hasInput={Boolean(passwordValue)}
        />

        <FormField
          id="confirmPassword"
          label="Confirm new password"
          required
          error={errors.confirmPassword?.message}
        >
          {({ id, error, 'aria-describedby': ariaDescribedBy }) => (
            <PasswordField
              id={id}
              autoComplete="new-password"
              placeholder="Confirm your new password"
              error={error}
              aria-describedby={ariaDescribedBy}
              disabled={isSubmitting}
              {...register('confirmPassword')}
            />
          )}
        </FormField>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full mt-3"
          isLoading={isSubmitting}
          loadingText="Updating password…"
        >
          Reset password
        </Button>
      </form>

      <div className="pt-2 text-center text-sm text-text-secondary">
        <Link
          href="/login"
          className="text-brand font-medium hover:underline transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand rounded"
        >
          Back to sign in
        </Link>
      </div>
    </div>
  );
}
