import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '@/components/base/button/Button';
import { icons } from '@/lib/icons';
import { elapsedMs, useClockStore } from '@/lib/stores/useClockStore';
import { formatDuration } from '@/utils/format';
import './ClockTimer.css';

/** Figma: ".timer" (state = default | clock in | break | out). */
export function ClockTimer() {
  const status = useClockStore((s) => s.status);
  const accumulatedMs = useClockStore((s) => s.accumulatedMs);
  const segmentStartedAt = useClockStore((s) => s.segmentStartedAt);
  const { clockIn, takeBreak, resume, stop } = useClockStore.getState();

  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    if (status !== 'clockedIn') return;
    setNow(Date.now());
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, [status]);

  const display = formatDuration(
    elapsedMs({ accumulatedMs, segmentStartedAt }, now),
  );
  const active = status === 'clockedIn' || status === 'onBreak';
  const statusLabel = {
    idle: 'Not clocked in',
    clockedIn: 'Clocked in',
    onBreak: 'On break',
    clockedOut: 'Clocked out',
  }[status];

  return (
    <section
      className={`clock-timer${active ? ' clock-timer--active' : ''}`}
      aria-label="Time clock"
    >
      <div className="clock-timer__time">
        {status === 'clockedIn' ? (
          <span className="clock-timer__dot" aria-hidden="true" />
        ) : (
          <FontAwesomeIcon
            icon={icons.clock}
            className="clock-timer__clock"
            aria-hidden="true"
          />
        )}
        <span
          className={`clock-timer__value${status === 'onBreak' ? ' clock-timer__value--paused' : ''}`}
          role="timer"
          aria-label={`${statusLabel}, ${display}`}
        >
          {display}
        </span>
      </div>
      <p className="sr-only" aria-live="polite">
        {statusLabel}
      </p>
      <div className="clock-timer__actions">
        {(status === 'idle' || status === 'clockedOut') && (
          <Button intent="success" icon="play" onClick={() => clockIn()}>
            Clock In
          </Button>
        )}
        {active && (
          <Button intent="secondary" icon="stop" onClick={() => stop()}>
            Stop
          </Button>
        )}
        {status === 'clockedIn' && (
          <Button intent="success" icon="pause" onClick={() => takeBreak()}>
            Break
          </Button>
        )}
        {status === 'onBreak' && (
          <Button intent="success" icon="play" onClick={() => resume()}>
            Continue
          </Button>
        )}
      </div>
    </section>
  );
}
