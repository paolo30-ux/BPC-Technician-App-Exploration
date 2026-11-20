import type { ReactNode } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icons, type IconName } from '@/lib/icons';
import './EmptyState.css';

/**
 * Figma: "main-content type=empty" — grey circle with icon, Subtitle 1 title,
 * Caption subtext. Used for "No Active Appointments" and placeholders.
 */
export interface EmptyStateProps {
  icon?: IconName;
  title: string;
  description?: ReactNode;
  /** Optional action below the text (not in Figma; used for recovery links). */
  action?: ReactNode;
}

export function EmptyState({
  icon = 'alert',
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="empty-state">
      <span className="empty-state__icon" aria-hidden="true">
        <FontAwesomeIcon icon={icons[icon]} />
      </span>
      <h2 className="empty-state__title">{title}</h2>
      {description && <p className="empty-state__description">{description}</p>}
      {action}
    </div>
  );
}
