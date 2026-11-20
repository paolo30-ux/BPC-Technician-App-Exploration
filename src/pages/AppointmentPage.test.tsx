import { fireEvent, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { renderRoute } from '@/test/renderRoute';

describe('AppointmentPage', () => {
  it('redirects /appointments to the active appointment', async () => {
    const { router } = renderRoute('/appointments');
    await screen.findByText('Springfield Public Library');
    expect(router.state.location.pathname).toBe('/appointments/apt-1042');
  });

  it('shows the designed empty state when there is no active appointment', async () => {
    renderRoute('/appointments?scenario=empty');
    expect(
      await screen.findByRole('heading', { name: 'No Active Appointments' }),
    ).toBeInTheDocument();
  });

  it('shows contact details, warning and expandable sections', async () => {
    renderRoute('/appointments/apt-1042');
    await screen.findByText('Springfield Public Library');
    expect(screen.getByRole('alert')).toHaveTextContent(
      'Your previous appointment has not been closed.',
    );
    expect(
      screen.getByRole('link', { name: 'rjohnson@example.com' }),
    ).toHaveAttribute('href', 'mailto:rjohnson@example.com');

    const notes = screen.getByRole('button', { name: 'Notes' });
    expect(notes).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(notes);
    expect(notes).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText('10/01/2025')).toBeVisible();

    const progress = screen.getByRole('button', { name: /New Appointment/ });
    fireEvent.click(progress);
    expect(progress).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText('Service Agreement')).toBeVisible();
  });

  it('moves between appointments with previous / next', async () => {
    const { router } = renderRoute('/appointments/apt-1042');
    await screen.findByText('Springfield Public Library');
    expect(
      screen.getByRole('button', { name: 'Previous appointment' }),
    ).toBeDisabled();
    fireEvent.click(screen.getByRole('link', { name: 'Next appointment' }));
    expect(await screen.findByText('Maplewood Dental Studio')).toBeVisible();
    expect(router.state.location.pathname).toBe('/appointments/apt-1043');
  });

  it('navigates to Site Verification', async () => {
    const { router } = renderRoute('/appointments/apt-1042');
    fireEvent.click(
      await screen.findByRole('link', { name: 'Site Verification' }),
    );
    expect(
      await screen.findByRole('heading', {
        level: 1,
        name: 'Site Verification',
      }),
    ).toBeInTheDocument();
    expect(router.state.location.pathname).toBe('/appointments/apt-1042/site');
  });

  it('shows not-found for an unknown id', async () => {
    renderRoute('/appointments/nope');
    expect(
      await screen.findByRole('heading', { name: 'Appointment not found' }),
    ).toBeInTheDocument();
  });
});
