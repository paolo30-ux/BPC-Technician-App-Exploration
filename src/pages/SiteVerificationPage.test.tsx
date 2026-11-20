import { fireEvent, screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { renderRoute } from '@/test/renderRoute';

function selectFile(file: File) {
  const input = screen.getByTestId('photo-input') as HTMLInputElement;
  Object.defineProperty(input, 'files', { value: [file], configurable: true });
  fireEvent.change(input);
}

describe('SiteVerificationPage', () => {
  it('renders route, services and notes from mock data', async () => {
    renderRoute('/appointments/apt-1042/site');
    await screen.findByRole('heading', { name: 'Upload Location' });
    expect(screen.getByText('123 Oak Lane, Rivertown, TX 75001')).toBeVisible();
    expect(
      screen.getByRole('table', { name: 'Customer services' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /Driving Directions/ }),
    ).toHaveAttribute('target', '_blank');
  });

  it('requires a confirmed photo before Start Service is enabled', async () => {
    renderRoute('/appointments/apt-1042/site');
    const start = await screen.findByRole('button', { name: 'Start Service' });
    expect(start).toBeDisabled();

    fireEvent.click(screen.getByRole('button', { name: 'Upload site photo' }));
    const confirm = await screen.findByRole('button', { name: 'Confirm' });
    expect(confirm).toBeDisabled();

    selectFile(new File(['x'], 'front-door.jpg', { type: 'image/jpeg' }));
    expect(
      screen.getByRole('button', { name: 'Change photo (front-door.jpg)' }),
    ).toBeInTheDocument();
    expect(confirm).toBeEnabled();
    fireEvent.click(confirm);

    await waitFor(() =>
      expect(
        screen.getByRole('button', { name: 'Start Service' }),
      ).toBeEnabled(),
    );
    expect(
      screen.getByRole('button', { name: 'Replace site photo' }),
    ).toBeInTheDocument();
  });

  it('rejects unsupported files with a message', async () => {
    renderRoute('/appointments/apt-1042/site');
    fireEvent.click(
      await screen.findByRole('button', { name: 'Upload site photo' }),
    );
    await screen.findByRole('button', { name: 'Confirm' });
    selectFile(new File(['x'], 'notes.pdf', { type: 'application/pdf' }));
    expect(screen.getByText('Choose a JPG, PNG or SVG image.')).toBeVisible();
    expect(screen.getByRole('button', { name: 'Confirm' })).toBeDisabled();
  });
});
