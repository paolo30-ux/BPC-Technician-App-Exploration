import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Link, type LinkProps } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icons, type IconName } from '@/lib/icons';
import './Button.css';

/**
 * Figma button sets: Primary – Default, Secondary, Success, Tertiary – Default.
 * Sizes follow Figma: base 32px, large 42px (default). The hit area is at
 * least 44px (DD-09). API modelled on the CRM Button (intent / size).
 */
export type ButtonIntent = 'primary' | 'secondary' | 'success' | 'tertiary';
export type ButtonSize = 'base' | 'lg';

interface CommonProps {
  intent?: ButtonIntent;
  size?: ButtonSize;
  icon?: IconName;
  fullWidth?: boolean;
  children: ReactNode;
}

function classes({
  intent = 'primary',
  size = 'lg',
  fullWidth,
  className,
}: CommonProps & { className?: string }) {
  return [
    'bpc-button',
    `bpc-button--${intent}`,
    `bpc-button--${size}`,
    fullWidth ? 'bpc-button--full' : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');
}

function Content({ icon, children }: Pick<CommonProps, 'icon' | 'children'>) {
  return (
    <>
      {icon && (
        <FontAwesomeIcon
          icon={icons[icon]}
          className="bpc-button__icon"
          aria-hidden="true"
        />
      )}
      <span className="bpc-button__label">{children}</span>
    </>
  );
}

export type ButtonProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'>;

export function Button({
  intent,
  size,
  icon,
  fullWidth,
  className,
  children,
  type = 'button',
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={classes({ intent, size, fullWidth, className, children })}
      {...rest}
    >
      <Content icon={icon}>{children}</Content>
    </button>
  );
}

export type ButtonAnchorProps = CommonProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'children'>;

/** Same visuals as Button, for external links (opens in a new tab). */
export function ButtonAnchor({
  intent,
  size,
  icon,
  fullWidth,
  className,
  children,
  ...rest
}: ButtonAnchorProps) {
  return (
    <a
      className={classes({ intent, size, fullWidth, className, children })}
      target="_blank"
      rel="noopener noreferrer"
      {...rest}
    >
      <Content icon={icon}>{children}</Content>
    </a>
  );
}

export type ButtonLinkProps = CommonProps & Omit<LinkProps, 'children'>;

/** Same visuals as Button, for navigation (Figma prototype NAVIGATE). */
export function ButtonLink({
  intent,
  size,
  icon,
  fullWidth,
  className,
  children,
  ...rest
}: ButtonLinkProps) {
  return (
    <Link
      className={classes({ intent, size, fullWidth, className, children })}
      {...rest}
    >
      <Content icon={icon}>{children}</Content>
    </Link>
  );
}
