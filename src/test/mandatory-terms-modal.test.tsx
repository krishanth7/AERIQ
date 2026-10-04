import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MandatoryTermsModal } from '@/components/auth/mandatory-terms-modal';

describe('MandatoryTermsModal', () => {
  it('does not render when isOpen is false', () => {
    const handleAccept = vi.fn();
    render(<MandatoryTermsModal isOpen={false} onAccept={handleAccept} />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders modal with required Venigem terms when isOpen is true', () => {
    const handleAccept = vi.fn();
    render(<MandatoryTermsModal isOpen={true} onAccept={handleAccept} />);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /mandatory digital record requirement/i })
    ).toBeInTheDocument();
    expect(
      screen.getAllByText(/Venigem Advanced Technologies SaaS-based Feed & Fish Management System/i).length
    ).toBeGreaterThanOrEqual(1);
    expect(
      screen.getByText(/Five monitoring\/checklist entries shall be completed each day/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/The Customer shall not enter estimated, fabricated, copied, manipulated/i)
    ).toBeInTheDocument();
  });

  it('keeps submit button disabled until terms checkbox is checked', () => {
    const handleAccept = vi.fn();
    render(<MandatoryTermsModal isOpen={true} onAccept={handleAccept} />);

    const submitBtn = screen.getByRole('button', { name: /enter into the dashboard/i });
    expect(submitBtn).toBeDisabled();

    const checkbox = screen.getByLabelText(/are you accept the following terms/i);
    expect(checkbox).not.toBeChecked();

    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    expect(submitBtn).not.toBeDisabled();

    fireEvent.click(submitBtn);
    expect(handleAccept).toHaveBeenCalledTimes(1);
  });
});
