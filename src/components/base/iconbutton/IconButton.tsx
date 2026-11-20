import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icons, type IconName } from '@/lib/icons';
import './IconButton.css';

/**
 * Figma: "Tertiary – Base" (ghost, 42px, 28px glyph) and "Icon Button"
 * (outlined, 48px). Always needs an accessible label.
 */
export type IconButtonVariant = 'ghost' | 'outlined';

interface CommonProps {
  icon: IconName;
  label: string;
  variant?: IconButtonVariant;
  /** Optional overlay (e.g. a count Badge). */
  children?: ReactNode;
}

function className(variant: IconButtonVariant, extra?: string) {
  return ['icon-button', `icon-button--${variant}`, extra ?? '']
    .filter(Boolean)
    .join(' ');
}

export type IconButtonProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'>;

export function IconButton({
  icon,
  label,
  variant = 'ghost',
  children,
  className: extra,
  type = 'button',
  ...rest
}: IconButtonProps) {
  return (
    <button
      type={type}
      aria-label={label}
      className={className(variant, extra)}
      {...rest}
    >
      <FontAwesomeIcon icon={icons[icon]} aria-hidden="true" />
      {children}
    </button>
  );
}

export interface IconLinkProps extends CommonProps {
  to: string;
  className?: string;
}

export function IconLink({
  icon,
  label,
  variant = 'ghost',
  children,
  to,
  className: extra,
}: IconLinkProps) {
  return (
    <Link to={to} aria-label={label} className={className(variant, extra)}>
      <FontAwesomeIcon icon={icons[icon]} aria-hidden="true" />
      {children}
    </Link>
  );
}
