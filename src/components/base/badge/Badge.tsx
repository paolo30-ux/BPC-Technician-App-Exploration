import type { ReactNode } from 'react';
import './Badge.css';

/**
 * Figma badges:
 *   count  — "Labeled" (blue pill, white Caption Medium) e.g. "2", "2/10"
 *   status — "Status" / "Custom Status" (pill, Body Medium) e.g. "On going", "20 oz"
 *   chip   — "Chip" (4px radius, 24px, Body Semi Bold) e.g. "Scheduled"
 */
export type BadgeVariant = 'count' | 'status' | 'chip';
export type BadgeTone =
  'primary' | 'success' | 'active' | 'neutral' | 'warning';

export interface BadgeProps {
  variant?: BadgeVariant;
  tone?: BadgeTone;
  className?: string;
  children: ReactNode;
}

export function Badge({
  variant = 'status',
  tone = 'primary',
  className,
  children,
}: BadgeProps) {
  return (
    <span
      className={['badge-bpc', `badge-bpc--${variant}`, `badge-bpc--${tone}`]
        .concat(className ?? '')
        .join(' ')
        .trim()}
    >
      {children}
    </span>
  );
}
