import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ThemeProvider } from '@/lib/auth/theme-context';
import { ThemeToggle } from '@/components/ui/theme-toggle';

describe('ThemeToggle', () => {
  it('renders theme button with accessible name', () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );

    const button = screen.getByRole('button', { name: /switch to (light|dark) mode/i });
    expect(button).toBeInTheDocument();
  });

  it('toggles theme on click between dark and light', () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );

    const button = screen.getByRole('button', { name: /switch to (light|dark) mode/i });
    const initialLabel = button.getAttribute('aria-label');

    fireEvent.click(button);

    const updatedLabel = button.getAttribute('aria-label');
    expect(updatedLabel).not.toBe(initialLabel);
  });
});
