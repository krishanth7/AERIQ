export type SessionState =
  | 'unauthenticated'
  | 'authenticated'
  | 'email_unverified'
  | 'session_expired'
  | 'account_disabled'
  | 'loading';

export interface AuthUser {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  fullName: string;
  companyName?: string;
  mobileNumber?: string;
  isEmailVerified: boolean;
  createdAt: string;
}

export interface PasswordRequirements {
  hasMinLength: boolean; // >= 12 chars
  hasUppercase: boolean;
  hasLowercase: boolean;
  hasNumber: boolean;
  hasSpecialChar: boolean;
  allValid: boolean;
}

export interface AuthResponse<T = unknown> {
  success: boolean;
  message?: string;
  error?: string;
  code?: 'INVALID_CREDENTIALS' | 'ACCOUNT_EXISTS' | 'RATE_LIMITED' | 'SESSION_EXPIRED' | 'NETWORK_ERROR' | 'UNKNOWN';
  data?: T;
}

export type ThemePreference = 'system' | 'light' | 'dark';
