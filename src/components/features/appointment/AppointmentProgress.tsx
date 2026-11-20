import { useId, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icons } from '@/lib/icons';
import type { Appointment, WorkflowStepStatus } from '@/types/domain';
import './AppointmentProgress.css';

const stepIcon = {
  done: icons.stepDone,
  current: icons.stepCurrent,
  locked: icons.stepLocked,
} as const;

const stepStatusText: Record<WorkflowStepStatus, string> = {
  done: 'completed',
  current: 'in progress',
  locked: 'locked',
};

/** Ring: 56px, 6px stroke, Primary arc over a neutral track. */
function ProgressRing({
  completed,
  total,
}: {
  completed: number;
  total: number;
}) {
  const radius = 25;
  const circumference = 2 * Math.PI * radius;
  const fraction = total > 0 ? completed / total : 0;
  return (
    <span className="progress-ring" aria-hidden="true">
      <svg viewBox="0 0 56 56" className="progress-ring__svg">
        <circle className="progress-ring__track" cx="28" cy="28" r={radius} />
        <circle
          className="progress-ring__value"
          cx="28"
          cy="28"
          r={radius}
          strokeDasharray={`${circumference * fraction} ${circumference}`}
          transform="rotate(-90 28 28)"
        />
      </svg>
      <span className="progress-ring__label">
        {completed} of {total}
      </span>
    </span>
  );
}

/**
 * Figma: Appointment › "Dropdown" (1 of 4 · New Appointment · Next Site
 * Verification). Expands to the workflow step list (frame 9001:262365).
 */
export function AppointmentProgress({
  progress,
}: {
  progress: Appointment['progress'];
}) {
  const [open, setOpen] = useState(false);
  const listId = useId();
  return (
    <div className="appointment-progress">
      <button
        type="button"
        className="appointment-progress__toggle"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((value) => !value)}
      >
        <ProgressRing completed={progress.completed} total={progress.total} />
        <span className="appointment-progress__text">
          <span className="appointment-progress__title">{progress.title}</span>
          <span className="appointment-progress__subtitle">
            {progress.subtitle}
          </span>
        </span>
        <span className="sr-only">
          , step {progress.completed} of {progress.total}
        </span>
        <span className="appointment-progress__chevron" aria-hidden="true">
          <FontAwesomeIcon icon={icons.chevronDown} />
        </span>
      </button>
      <ol id={listId} className="appointment-progress__steps" hidden={!open}>
        {progress.steps.map((step) => (
          <li
            key={step.id}
            className={`appointment-progress__step appointment-progress__step--${step.status}`}
          >
            <span>{step.label}</span>
            <FontAwesomeIcon
              icon={stepIcon[step.status]}
              className="appointment-progress__step-icon"
              aria-hidden="true"
            />
            <span className="sr-only">, {stepStatusText[step.status]}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
