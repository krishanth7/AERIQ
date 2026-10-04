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

    const button = screen.getByRole('button', { name: /current theme/i });
    expect(button).toBeInTheDocument();
  });

  it('opens theme selection menu and allows picking Light, Dark, or System', () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );

    const button = screen.getByRole('button', { name: /current theme/i });
    fireEvent.click(button);

    expect(screen.getByRole('menuitem', { name: /light/i })).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: /dark/i })).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: /system/i })).toBeInTheDocument();
  });
});
