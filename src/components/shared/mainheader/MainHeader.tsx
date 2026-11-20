import type { ReactNode } from 'react';
import './MainHeader.css';

/**
 * Figma: "main-header" (BPC DS, Templates Mobile). Sticky white header with
 * 16px bottom radius and shadow. Two compositions are used:
 *   - greeting: avatar + "Hello, Name" + code, bell action, optional timer
 *   - title:    back button + screen title, optional actions
 * Everything is slot-based so screens compose their own content.
 */
export interface MainHeaderProps {
  /** Rendered as the screen's h1. */
  title: ReactNode;
  subtitle?: ReactNode;
  /** Left of the title: avatar link or back button. */
  leading?: ReactNode;
  /** Right side: icon buttons (Figma "button-group"). */
  actions?: ReactNode;
  /** Below the title row, e.g. the ClockTimer. */
  children?: ReactNode;
}

export function MainHeader({
  title,
  subtitle,
  leading,
  actions,
  children,
}: MainHeaderProps) {
  return (
    <header className="main-header">
      <div className="main-header__row">
        <div className="main-header__identity">
          {leading}
          <div className="main-header__titles">
            <h1 className="main-header__title">{title}</h1>
            {subtitle && <p className="main-header__subtitle">{subtitle}</p>}
          </div>
        </div>
        {actions && <div className="main-header__actions">{actions}</div>}
      </div>
      {children}
    </header>
  );
}
