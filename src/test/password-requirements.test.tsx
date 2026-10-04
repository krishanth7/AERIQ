import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { PasswordRequirementsView } from '@/components/auth/password-requirements';

describe('PasswordRequirementsView', () => {
  it('displays neutral indicators when no input has been entered', () => {
    const requirements = {
      hasMinLength: false,
      hasUppercase: false,
      hasLowercase: false,
      hasNumber: false,
      hasSpecialChar: false,
      allValid: false,
    };

    render(
      <PasswordRequirementsView
        requirements={requirements}
        hasInput={false}
      />
    );

    expect(screen.getByText('At least 12 characters')).toBeInTheDocument();
    expect(screen.getByText('Uppercase letter')).toBeInTheDocument();
    expect(screen.getByText('Number (0–9)')).toBeInTheDocument();

    const unmet = screen.getAllByText(/requirement not met/i);
    expect(unmet.length).toBe(5);
  });

  it('updates indicators to met when criteria are satisfied', () => {
    const requirements = {
      hasMinLength: true,
      hasUppercase: true,
      hasLowercase: true,
      hasNumber: false,
      hasSpecialChar: false,
      allValid: false,
    };

    render(
      <PasswordRequirementsView
        requirements={requirements}
        hasInput={true}
      />
    );

    const met = screen.getAllByText(/requirement met:/i);
    expect(met.length).toBe(3); // minLength, uppercase, lowercase
  });
});
