import './Spinner.css';

export interface SpinnerProps {
  /** Announced to screen readers. */
  label?: string;
}

/** Provisional loading indicator (DD-11) — the Figma file has no loading state. */
export function Spinner({ label = 'Loading' }: SpinnerProps) {
  return (
    <div className="bpc-spinner" role="status">
      <span className="bpc-spinner__circle" aria-hidden="true" />
      <span className="sr-only">{label}</span>
    </div>
  );
}
