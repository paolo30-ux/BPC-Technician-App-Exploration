import { create } from 'zustand';

/**
 * Technician time clock (Figma `.timer`: default / clock in / break / out).
 *   idle       → "00:00:00" + Clock In
 *   clockedIn  → blue dot, running time + Stop / Break
 *   onBreak    → frozen time + Stop / Continue
 *   clockedOut → frozen time + Clock In
 * Clocking in again after "out" starts a new shift from zero (open question,
 * docs/known-issues.md F-07).
 */
export type ClockStatus = 'idle' | 'clockedIn' | 'onBreak' | 'clockedOut';

interface ClockState {
  status: ClockStatus;
  /** Worked time from completed segments. */
  accumulatedMs: number;
  /** Start of the running segment, when clocked in. */
  segmentStartedAt: number | null;
  clockIn: (now?: number) => void;
  takeBreak: (now?: number) => void;
  resume: (now?: number) => void;
  stop: (now?: number) => void;
  reset: () => void;
}

const initial = {
  status: 'idle' as ClockStatus,
  accumulatedMs: 0,
  segmentStartedAt: null as number | null,
};

export const useClockStore = create<ClockState>()((set, get) => {
  const closeSegment = (now: number) => {
    const { segmentStartedAt, accumulatedMs } = get();
    return segmentStartedAt === null
      ? accumulatedMs
      : accumulatedMs + (now - segmentStartedAt);
  };

  return {
    ...initial,
    clockIn: (now = Date.now()) =>
      set({ status: 'clockedIn', accumulatedMs: 0, segmentStartedAt: now }),
    takeBreak: (now = Date.now()) => {
      if (get().status !== 'clockedIn') return;
      set({
        status: 'onBreak',
        accumulatedMs: closeSegment(now),
        segmentStartedAt: null,
      });
    },
    resume: (now = Date.now()) => {
      if (get().status !== 'onBreak') return;
      set({ status: 'clockedIn', segmentStartedAt: now });
    },
    stop: (now = Date.now()) => {
      const { status } = get();
      if (status !== 'clockedIn' && status !== 'onBreak') return;
      set({
        status: 'clockedOut',
        accumulatedMs: closeSegment(now),
        segmentStartedAt: null,
      });
    },
    reset: () => set(initial),
  };
});

/** Worked time at `now`. */
export function elapsedMs(
  state: Pick<ClockState, 'accumulatedMs' | 'segmentStartedAt'>,
  now: number,
): number {
  return state.segmentStartedAt === null
    ? state.accumulatedMs
    : state.accumulatedMs + (now - state.segmentStartedAt);
}
