import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';
import { icons } from '@/lib/icons';
import { navItems } from './navItems';
import './BottomNav.css';

export interface BottomNavProps {
  /** Unread count on the Message tab. Omit to hide the badge. */
  messageBadgeCount?: number;
}

/** Figma: "Mobile Navigation Bar" (.mobile-nav-tab state=on/off). */
export function BottomNav({ messageBadgeCount }: BottomNavProps) {
  return (
    <nav className="bottom-nav" aria-label="Primary">
      <ul className="bottom-nav__list">
        {navItems.map((item) => {
          const showBadge =
            item.to === '/messages' && messageBadgeCount !== undefined;
          return (
            <li key={item.to} className="bottom-nav__item">
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `bottom-nav__link${isActive ? ' bottom-nav__link--active' : ''}`
                }
              >
                <span className="bottom-nav__icon" aria-hidden="true">
                  <FontAwesomeIcon icon={icons[item.icon]} />
                  {showBadge && (
                    <span className="bottom-nav__badge">
                      {messageBadgeCount}
                    </span>
                  )}
                </span>
                <span className="bottom-nav__label">{item.label}</span>
                {showBadge && (
                  <span className="sr-only">, {messageBadgeCount} unread</span>
                )}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
