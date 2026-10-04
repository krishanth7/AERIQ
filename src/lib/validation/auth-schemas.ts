import { z } from 'zod';
import { PasswordRequirements } from '@/types/auth';

export const passwordCriteria = {
  minLength: 12,
  hasUppercase: /[A-Z]/,
  hasLowercase: /[a-z]/,
  hasNumber: /[0-9]/,
  hasSpecialChar: /[^A-Za-z0-9]/,
};

export function checkPasswordRequirements(password: string = ''): PasswordRequirements {
  const hasMinLength = password.length >= passwordCriteria.minLength;
  const hasUppercase = passwordCriteria.hasUppercase.test(password);
  const hasLowercase = passwordCriteria.hasLowercase.test(password);
  const hasNumber = passwordCriteria.hasNumber.test(password);
  const hasSpecialChar = passwordCriteria.hasSpecialChar.test(password);

  const allValid =
    hasMinLength &&
    hasUppercase &&
    hasLowercase &&
    hasNumber &&
    hasSpecialChar;

  return {
    hasMinLength,
    hasUppercase,
    hasLowercase,
    hasNumber,
    hasSpecialChar,
    allValid,
  };
}

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, 'Enter your email address.')
    .email('Enter a valid email address.'),
  password: z
    .string()
    .min(1, 'Enter your password.'),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    firstName: z
      .string()
      .trim()
      .min(1, 'Enter your first name.')
      .max(50, 'First name cannot exceed 50 characters.'),
    lastName: z
      .string()
      .trim()
      .min(1, 'Enter your last name.')
      .max(50, 'Last name cannot exceed 50 characters.'),
    email: z
      .string()
      .trim()
      .min(1, 'Enter your email address.')
      .email('Enter a valid email address.')
      .max(255, 'Email cannot exceed 255 characters.'),
    companyName: z
      .string()
      .trim()
      .min(1, 'Enter your company or farm name.')
      .max(100, 'Company name cannot exceed 100 characters.'),
    mobileNumber: z
      .string()
      .trim()
      .min(1, 'Enter your mobile number.')
      .regex(
        /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{6,16}$/,
        'Enter a valid mobile phone number.'
      ),
    password: z
      .string()
      .min(1, 'Enter a password.')
      .refine(
        (val) => val.length >= passwordCriteria.minLength,
        'Password must be at least 12 characters.'
      )
      .refine(
        (val) => passwordCriteria.hasUppercase.test(val),
        'Password must contain an uppercase letter.'
      )
      .refine(
        (val) => passwordCriteria.hasLowercase.test(val),
        'Password must contain a lowercase letter.'
      )
      .refine(
        (val) => passwordCriteria.hasNumber.test(val),
        'Password must contain a number.'
      )
      .refine(
        (val) => passwordCriteria.hasSpecialChar.test(val),
        'Password must contain a special character.'
      ),
    confirmPassword: z
      .string()
      .min(1, 'Confirm your password.'),
    agreeToTerms: z
      .boolean()
      .refine((val) => val === true, {
        message: 'You must agree to the Terms of Service and Privacy Policy.',
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match.',
    path: ['confirmPassword'],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, 'Enter your email address.')
    .email('Enter a valid email address.'),
});

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(1, 'Enter a new password.')
      .refine(
        (val) => val.length >= passwordCriteria.minLength,
        'Password must be at least 12 characters.'
      )
      .refine(
        (val) => passwordCriteria.hasUppercase.test(val),
        'Password must contain an uppercase letter.'
      )
      .refine(
        (val) => passwordCriteria.hasLowercase.test(val),
        'Password must contain a lowercase letter.'
      )
      .refine(
        (val) => passwordCriteria.hasNumber.test(val),
        'Password must contain a number.'
      )
      .refine(
        (val) => passwordCriteria.hasSpecialChar.test(val),
        'Password must contain a special character.'
      ),
    confirmPassword: z
      .string()
      .min(1, 'Confirm your new password.'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match.',
    path: ['confirmPassword'],
  });

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
