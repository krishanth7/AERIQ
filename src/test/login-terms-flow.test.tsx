import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { LoginForm } from '@/components/auth/login-form';
import { AuthProvider } from '@/lib/auth/auth-context';

const mockPush = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
  useSearchParams: () => ({
    get: () => null,
  }),
}));

describe('Login Mandatory Terms Message Flow', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    sessionStorage.clear();
  });

  it('displays the mandatory digital record terms modal after every successful login', async () => {
    const { container } = render(
      <AuthProvider>
        <LoginForm />
      </AuthProvider>
    );

    // Enter email & password
    const emailInput = screen.getByLabelText(/email address/i);
    const passwordInput = container.querySelector('#password') as HTMLInputElement;
    const submitBtn = screen.getByRole('button', { name: /^sign in$/i });

    fireEvent.change(emailInput, { target: { value: 'operator@aeriq.com' } });
    fireEvent.change(passwordInput, { target: { value: 'Password123!' } });
    fireEvent.click(submitBtn);

    // Modal should be displayed
    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(
        screen.getByRole('heading', { name: /mandatory digital record requirement/i })
      ).toBeInTheDocument();
    });

    // Accept terms
    const checkbox = screen.getByLabelText(/are you accept the following terms/i);
    fireEvent.click(checkbox);

    const enterDashboardBtn = screen.getByRole('button', { name: /enter into the dashboard/i });
    fireEvent.click(enterDashboardBtn);

    // After accepting terms, redirect to dashboard occurs
    expect(mockPush).toHaveBeenCalledWith('/dashboard');
    expect(sessionStorage.getItem('aeriq_terms_accepted')).toBe('true');
  });
});
