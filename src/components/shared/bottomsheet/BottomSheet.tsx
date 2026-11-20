import type { ReactNode } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import './BottomSheet.css';

/**
 * Figma: "bottom-sheets" — handle, Title 2 title, subtext, content slot and a
 * button row. Built on react-bootstrap Offcanvas (focus trap, Escape and
 * backdrop close, focus restore).
 */
export interface BottomSheetProps {
  show: boolean;
  onHide: () => void;
  title: string;
  subtitle?: string;
  footer?: ReactNode;
  children: ReactNode;
}

export function BottomSheet({
  show,
  onHide,
  title,
  subtitle,
  footer,
  children,
}: BottomSheetProps) {
  return (
    <Offcanvas
      show={show}
      onHide={onHide}
      placement="bottom"
      className="bottom-sheet"
      backdropClassName="bottom-sheet__backdrop"
      aria-labelledby="bottom-sheet-title"
    >
      <span className="bottom-sheet__handle" aria-hidden="true" />
      <div className="bottom-sheet__header">
        <h2 id="bottom-sheet-title" className="bottom-sheet__title">
          {title}
        </h2>
        {subtitle && <p className="bottom-sheet__subtitle">{subtitle}</p>}
      </div>
      <div className="bottom-sheet__content">{children}</div>
      {footer && <div className="bottom-sheet__footer">{footer}</div>}
    </Offcanvas>
  );
}
