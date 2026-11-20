import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { elapsedMs, useClockStore } from '@/lib/stores/useClockStore';
import { ClockTimer } from './ClockTimer';

describe('ClockTimer (Figma .timer states)', () => {
  it('walks default → clock in → break → continue → stop → clock in', () => {
    render(<ClockTimer />);
    expect(screen.getByRole('timer')).toHaveTextContent('00:00:00');

    fireEvent.click(screen.getByRole('button', { name: 'Clock In' }));
    expect(screen.getByRole('button', { name: 'Stop' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Break' }));
    expect(useClockStore.getState().status).toBe('onBreak');

    fireEvent.click(screen.getByRole('button', { name: 'Continue' }));
    expect(useClockStore.getState().status).toBe('clockedIn');

    fireEvent.click(screen.getByRole('button', { name: 'Stop' }));
    expect(useClockStore.getState().status).toBe('clockedOut');
    expect(
      screen.getByRole('button', { name: 'Clock In' }),
    ).toBeInTheDocument();
  });

  it('only counts worked time, not breaks', () => {
    const clock = useClockStore.getState();
    clock.clockIn(0);
    clock.takeBreak(60_000); // 1 min worked
    clock.resume(10 * 60_000); // 9 min break
    clock.stop(12 * 60_000); // +2 min worked
    expect(elapsedMs(useClockStore.getState(), 99 * 60_000)).toBe(3 * 60_000);
  });
});
