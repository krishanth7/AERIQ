import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { PasswordField } from '@/components/auth/password-field';

describe('PasswordField', () => {
  it('renders password input hidden by default', () => {
    render(<PasswordField id="test-pwd" placeholder="Enter password" />);
    const input = screen.getByPlaceholderText('Enter password');
    expect(input).toHaveAttribute('type', 'password');
  });

  it('toggles password visibility when eye icon button is clicked', () => {
    render(<PasswordField id="test-pwd" placeholder="Enter password" />);
    const toggleBtn = screen.getByRole('button', { name: /show password/i });
    expect(toggleBtn).toBeInTheDocument();

    // Click to show password
    fireEvent.click(toggleBtn);
    const input = screen.getByPlaceholderText('Enter password');
    expect(input).toHaveAttribute('type', 'text');

    // Click again to hide password
    const hideBtn = screen.getByRole('button', { name: /hide password/i });
    fireEvent.click(hideBtn);
    expect(input).toHaveAttribute('type', 'password');
  });
});
