import { describe, it, expect } from 'vitest';
import {
  loginSchema,
  registerSchema,
  forgotPasswordSchema,
  checkPasswordRequirements,
} from '@/lib/validation/auth-schemas';
import { maskEmail } from '@/lib/auth/email-utils';

describe('Validation Schemas & Utilities', () => {
  describe('checkPasswordRequirements', () => {
    it('should identify unmet requirements for empty password', () => {
      const res = checkPasswordRequirements('');
      expect(res.hasMinLength).toBe(false);
      expect(res.hasUppercase).toBe(false);
      expect(res.hasLowercase).toBe(false);
      expect(res.hasNumber).toBe(false);
      expect(res.hasSpecialChar).toBe(false);
      expect(res.allValid).toBe(false);
    });

    it('should correctly evaluate partial criteria', () => {
      const res = checkPasswordRequirements('Short1!');
      expect(res.hasMinLength).toBe(false); // < 12
      expect(res.hasUppercase).toBe(true);
      expect(res.hasLowercase).toBe(true);
      expect(res.hasNumber).toBe(true);
      expect(res.hasSpecialChar).toBe(true);
      expect(res.allValid).toBe(false);
    });

    it('should identify fully compliant passwords', () => {
      const res = checkPasswordRequirements('AquaCulture2026!RAS');
      expect(res.hasMinLength).toBe(true);
      expect(res.hasUppercase).toBe(true);
      expect(res.hasLowercase).toBe(true);
      expect(res.hasNumber).toBe(true);
      expect(res.hasSpecialChar).toBe(true);
      expect(res.allValid).toBe(true);
    });
  });

  describe('loginSchema', () => {
    it('fails when email is invalid', () => {
      const result = loginSchema.safeParse({
        email: 'invalid-email',
        password: 'password123',
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Enter a valid email address.');
      }
    });

    it('fails when password is empty', () => {
      const result = loginSchema.safeParse({
        email: 'operator@aqua-farms.no',
        password: '',
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Enter your password.');
      }
    });

    it('passes with valid credentials', () => {
      const result = loginSchema.safeParse({
        email: 'operator@aqua-farms.no',
        password: 'SecurePassword123!',
      });
      expect(result.success).toBe(true);
    });
  });

  describe('registerSchema', () => {
    it('fails when passwords do not match', () => {
      const result = registerSchema.safeParse({
        firstName: 'Alex',
        lastName: 'Morgan',
        companyName: 'Aqua Farms',
        mobileNumber: '+1 555 123 4567',
        email: 'alex@aeriq.com',
        password: 'SecurePassword123!',
        confirmPassword: 'DifferentPassword123!',
        agreeToTerms: true,
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues.some((i) => i.message === 'Passwords do not match.')).toBe(true);
      }
    });

    it('fails when terms are not agreed to', () => {
      const result = registerSchema.safeParse({
        firstName: 'Alex',
        lastName: 'Morgan',
        companyName: 'Aqua Farms',
        mobileNumber: '+1 555 123 4567',
        email: 'alex@aeriq.com',
        password: 'SecurePassword123!',
        confirmPassword: 'SecurePassword123!',
        agreeToTerms: false,
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(
          result.error.issues.some((i) =>
            i.message.includes('agree to the Terms of Service')
          )
        ).toBe(true);
      }
    });

    it('fails when password is under 12 characters', () => {
      const result = registerSchema.safeParse({
        firstName: 'Alex',
        lastName: 'Morgan',
        companyName: 'Aqua Farms',
        mobileNumber: '+1 555 123 4567',
        email: 'alex@aeriq.com',
        password: 'Short1!',
        confirmPassword: 'Short1!',
        agreeToTerms: true,
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(
          result.error.issues.some((i) =>
            i.message.includes('at least 12 characters')
          )
        ).toBe(true);
      }
    });

    it('fails when mobile number is missing or invalid', () => {
      const result = registerSchema.safeParse({
        firstName: 'Alex',
        lastName: 'Morgan',
        companyName: 'Aqua Farms',
        mobileNumber: 'invalid-phone',
        email: 'alex@aeriq.com',
        password: 'SecurePassword123!',
        confirmPassword: 'SecurePassword123!',
        agreeToTerms: true,
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(
          result.error.issues.some((i) =>
            i.message.includes('valid mobile phone number')
          )
        ).toBe(true);
      }
    });

    it('passes when all registration requirements are satisfied', () => {
      const result = registerSchema.safeParse({
        firstName: 'Alex',
        lastName: 'Morgan',
        companyName: 'Aqua Farms',
        mobileNumber: '+1 555 123 4567',
        email: 'alex@aeriq.com',
        password: 'SecurePassword123!',
        confirmPassword: 'SecurePassword123!',
        agreeToTerms: true,
      });
      expect(result.success).toBe(true);
    });
  });

  describe('forgotPasswordSchema', () => {
    it('validates email format', () => {
      expect(forgotPasswordSchema.safeParse({ email: 'bad' }).success).toBe(false);
      expect(forgotPasswordSchema.safeParse({ email: 'test@domain.com' }).success).toBe(true);
    });
  });

  describe('maskEmail', () => {
    it('masks emails preserving privacy', () => {
      expect(maskEmail('alex.morgan@aqua.com')).toBe('a••••••@aqua.com');
      expect(maskEmail('krish@example.com')).toBe('k••••@example.com');
      expect(maskEmail('ab@test.com')).toBe('a•@test.com');
      expect(maskEmail('')).toBe('••••@••••.•••');
    });
  });
});
