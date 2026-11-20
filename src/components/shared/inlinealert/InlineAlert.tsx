import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icons } from '@/lib/icons';
import './InlineAlert.css';

/** Figma: "Inline Alert" (type = danger, title only). */
export interface InlineAlertProps {
  title: string;
}

export function InlineAlert({ title }: InlineAlertProps) {
  return (
    <div className="inline-alert" role="alert">
      <FontAwesomeIcon
        icon={icons.alert}
        className="inline-alert__icon"
        aria-hidden="true"
      />
      <p className="inline-alert__title">{title}</p>
    </div>
  );
}
