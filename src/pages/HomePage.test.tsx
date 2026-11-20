import { fireEvent, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { renderRoute } from '@/test/renderRoute';

describe('HomePage', () => {
  it('shows the dashboard cards from mock data', async () => {
    renderRoute('/home');
    await screen.findByRole('heading', { level: 1, name: /Hello, Randy/ });
    expect(
      screen.getByRole('heading', { name: 'Next Schedule' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Recent Messages' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Truck Inventory' }),
    ).toBeInTheDocument();
    expect(screen.getByText('Deltamethrin')).toBeInTheDocument();
  });

  it('opens the appointment from the Next Schedule card', async () => {
    const { router } = renderRoute('/home');
    fireEvent.click(
      await screen.findByRole('link', { name: /Open appointment/ }),
    );
    expect(
      await screen.findByRole('heading', { level: 1, name: 'Appointments' }),
    ).toBeInTheDocument();
    expect(router.state.location.pathname).toBe('/appointments/apt-1042');
    expect(
      await screen.findByText('Springfield Public Library'),
    ).toBeInTheDocument();
  });

  it('links the bell to notifications and the avatar to settings', async () => {
    renderRoute('/home');
    expect(
      await screen.findByRole('link', { name: /Notifications, 2 unread/ }),
    ).toHaveAttribute('href', '/notifications');
    expect(screen.getByRole('link', { name: 'Open settings' })).toHaveAttribute(
      'href',
      '/settings',
    );
  });
});
