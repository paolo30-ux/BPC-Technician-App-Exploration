import { useId, useState, type ReactNode } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icons } from '@/lib/icons';
import './Card.css';

/**
 * Figma: "container" / "Container" + ".header-container" + Divider + list slot.
 * Border 1, radius 8, header padding 16 with Subtitle 1 Bold title.
 */
export interface CardProps {
  title?: ReactNode;
  /** Figma "header-action-slot" (badge, View All, info button…). */
  action?: ReactNode;
  /** Full-width header content instead of a title (e.g. Driving Directions). */
  headerContent?: ReactNode;
  /** Hide the divider under the header (Customer/Past Services cards). */
  plainHeader?: boolean;
  bodyPadding?: 'none' | 'sm' | 'md';
  className?: string;
  children?: ReactNode;
  'aria-label'?: string;
}

export function Card({
  title,
  action,
  headerContent,
  plainHeader,
  bodyPadding = 'none',
  className,
  children,
  'aria-label': ariaLabel,
}: CardProps) {
  const titleId = useId();
  const hasHeader = Boolean(title || action || headerContent);
  return (
    <section
      className={['bpc-card', className ?? ''].join(' ').trim()}
      aria-labelledby={title ? titleId : undefined}
      aria-label={title ? undefined : ariaLabel}
    >
      {hasHeader && (
        <div
          className={`bpc-card__header${plainHeader ? '' : ' bpc-card__header--divided'}`}
        >
          {headerContent ?? (
            <h2 id={titleId} className="bpc-card__title">
              {title}
            </h2>
          )}
          {action && <div className="bpc-card__action">{action}</div>}
        </div>
      )}
      {children !== undefined && (
        <div className={`bpc-card__body bpc-card__body--${bodyPadding}`}>
          {children}
        </div>
      )}
    </section>
  );
}

export interface AccordionCardProps {
  title: ReactNode;
  defaultOpen?: boolean;
  children: ReactNode;
}

/**
 * Figma: Notes / Details containers with an angle-down "Tertiary – Base"
 * button. The whole header row toggles (prototype CHANGE_TO).
 */
export function AccordionCard({
  title,
  defaultOpen = false,
  children,
}: AccordionCardProps) {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = useId();
  return (
    <section className="bpc-card">
      <h2 className="bpc-card__accordion-heading">
        <button
          type="button"
          className={`bpc-card__header bpc-card__toggle${open ? ' bpc-card__header--divided' : ''}`}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="bpc-card__title">{title}</span>
          <span className="bpc-card__chevron" aria-hidden="true">
            <FontAwesomeIcon icon={icons.chevronDown} />
          </span>
        </button>
      </h2>
      <div
        id={panelId}
        className="bpc-card__collapse"
        data-open={open}
        hidden={!open}
      >
        <div className="bpc-card__body bpc-card__body--md">{children}</div>
      </div>
    </section>
  );
}
