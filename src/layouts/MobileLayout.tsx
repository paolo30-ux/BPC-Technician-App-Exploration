import { Outlet } from 'react-router-dom';
import { BottomNav } from '@/components/shared/bottomnav/BottomNav';
import './MobileLayout.css';

/**
 * App shell for authenticated screens (DD-08):
 *   [ page content — scrolls; each page renders its own header ]
 *   [ bottom navigation — fixed to the bottom of the column    ]
 * Phone widths fill the viewport; wider screens get a centred 440px column.
 * No device chrome (status bar / home indicator) is drawn — safe-area insets
 * are applied instead.
 */
export function MobileLayout() {
  return (
    <div className="app-shell">
      <div className="app-shell__column">
        <a className="app-shell__skip" href="#main-content">
          Skip to content
        </a>
        <main id="main-content" className="app-shell__content" tabIndex={-1}>
          <Outlet />
        </main>
        {/* Badge value is mock data; Figma shows "0" on every nav variant. */}
        <BottomNav messageBadgeCount={0} />
      </div>
    </div>
  );
}
