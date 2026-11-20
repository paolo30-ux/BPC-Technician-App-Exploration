import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Badge } from '@/components/base/badge/Badge';
import { icons, type IconName } from '@/lib/icons';
import type { Appointment } from '@/types/domain';
import { phoneHref } from '@/utils/format';
import './AppointmentSummary.css';

const statusLabel: Record<Appointment['status'], string> = {
  scheduled: 'Scheduled',
  ongoing: 'On going',
  completed: 'Completed',
};

function Row({
  icon,
  children,
}: {
  icon: IconName;
  children: React.ReactNode;
}) {
  return (
    <div className="appointment-summary__row">
      <FontAwesomeIcon
        icon={icons[icon]}
        className="appointment-summary__icon"
        aria-hidden="true"
      />
      {children}
    </div>
  );
}

/** Figma Appointment › Container › list-slot (location, contact, address, phones). */
export function AppointmentSummary({
  appointment,
}: {
  appointment: Appointment;
}) {
  const { contact } = appointment;
  return (
    <div className="appointment-summary">
      <div className="appointment-summary__line appointment-summary__line--split">
        <Row icon="building">
          <span className="appointment-summary__text">
            {appointment.locationName}
          </span>
        </Row>
        <Badge variant="chip" tone="warning">
          {statusLabel[appointment.status]}
        </Badge>
      </div>

      <div className="appointment-summary__line appointment-summary__line--split appointment-summary__line--wrap">
        <Row icon="contact">
          <span className="appointment-summary__text">{contact.name}</span>
        </Row>
        <Row icon="email">
          <a
            className="appointment-summary__link"
            href={`mailto:${contact.email}`}
          >
            {contact.email}
          </a>
        </Row>
      </div>

      <Row icon="address">
        <span className="appointment-summary__text">{appointment.address}</span>
      </Row>

      <div className="appointment-summary__phones">
        <div className="appointment-summary__phone">
          <Row icon="phone">
            <a
              className="appointment-summary__link"
              href={phoneHref(contact.officePhone)}
              aria-label={`Call office ${contact.officePhone}`}
            >
              {contact.officePhone}
            </a>
          </Row>
          <span className="appointment-summary__caption">Office</span>
        </div>
        <span className="appointment-summary__divider" aria-hidden="true" />
        <div className="appointment-summary__phone">
          <a
            className="appointment-summary__link appointment-summary__link--block"
            href={phoneHref(contact.personalPhone)}
            aria-label={`Call personal ${contact.personalPhone}`}
          >
            {contact.personalPhone}
          </a>
          <span className="appointment-summary__caption">Personal</span>
        </div>
      </div>
    </div>
  );
}
