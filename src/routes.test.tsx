import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { renderRoute } from '@/test/renderRoute';

describe('routes', () => {
  it('redirects the root path to the Home dashboard', async () => {
    const { router } = renderRoute('/');
    expect(
      await screen.findByRole('heading', { level: 1, name: /Hello, Randy/ }),
    ).toBeInTheDocument();
    expect(router.state.location.pathname).toBe('/home');
  });

  it('renders the five-tab bottom navigation inside the layout', async () => {
    renderRoute('/schedule');
    const nav = await screen.findByRole('navigation', { name: 'Primary' });
    expect(nav.querySelectorAll('a')).toHaveLength(5);
    expect(screen.getByRole('link', { name: /Schedule/ })).toHaveAttribute(
      'aria-current',
      'page',
    );
  });

  it('keeps the Appointment tab active on appointment sub-routes', async () => {
    renderRoute('/appointments/apt-1042/site');
    await screen.findByRole('heading', { level: 1, name: 'Site Verification' });
    expect(screen.getByRole('link', { name: /^Appointment/ })).toHaveAttribute(
      'aria-current',
      'page',
    );
  });

  it('renders login and settings without the bottom navigation', async () => {
    renderRoute('/login');
    expect(
      await screen.findByRole('heading', { level: 1, name: 'Log In' }),
    ).toBeInTheDocument();
    expect(screen.queryByRole('navigation', { name: 'Primary' })).toBeNull();
  });

  it('sends unknown paths to /home', async () => {
    const { router } = renderRoute('/does-not-exist');
    await screen.findByRole('heading', { level: 1, name: /Hello, Randy/ });
    expect(router.state.location.pathname).toBe('/home');
  });
});
