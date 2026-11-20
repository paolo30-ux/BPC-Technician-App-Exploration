import { Link } from 'react-router-dom';
import { Badge } from '@/components/base/badge/Badge';
import { ButtonLink } from '@/components/base/button/Button';
import { IconLink } from '@/components/base/iconbutton/IconButton';
import { Spinner } from '@/components/base/spinner/Spinner';
import { RouteMapPreview } from '@/components/features/map/RouteMapPreview';
import { Card } from '@/components/shared/card/Card';
import { ClockTimer } from '@/components/shared/clocktimer/ClockTimer';
import { EmptyState } from '@/components/shared/emptystate/EmptyState';
import {
  ListItem,
  MessageListItem,
} from '@/components/shared/listitem/ListItem';
import { MainHeader } from '@/components/shared/mainheader/MainHeader';
import { useAsync } from '@/hooks/useAsync';
import {
  fetchHomeSummary,
  fetchTechnician,
} from '@/services/technicianService';
import './pages.css';

/** Figma: Home (Default / Clock in / Break / Stop) — 9001:226677 … 226810. */
export function HomePage() {
  const state = useAsync(
    () => Promise.all([fetchTechnician(), fetchHomeSummary()]),
    [],
  );

  if (state.status === 'loading') return <Spinner label="Loading home" />;
  if (state.status === 'error')
    return (
      <EmptyState
        title="Something went wrong"
        description="We couldn't load your dashboard. Pull down or reopen the app to try again."
      />
    );

  const [technician, summary] = state.data;
  const next = summary.nextSchedule;

  return (
    <>
      <MainHeader
        title={
          <>
            Hello, {technician.firstName} <span aria-hidden="true">👋🏻</span>
          </>
        }
        subtitle={technician.code}
        leading={
          <Link
            to="/settings"
            className="main-header__avatar header-avatar-link"
            aria-label="Open settings"
          >
            <img src={technician.avatarUrl} alt="" />
          </Link>
        }
        actions={
          <IconLink
            to="/notifications"
            icon="bell"
            label={`Notifications, ${technician.unreadNotifications} unread`}
            className="header-bell"
          >
            {technician.unreadNotifications > 0 && (
              <Badge variant="count" className="main-header__bell-badge">
                {technician.unreadNotifications}
              </Badge>
            )}
          </IconLink>
        }
      >
        <ClockTimer />
      </MainHeader>

      <div className="page-content">
        <Card
          title="Next Schedule"
          action={
            next && (
              <Badge variant="count">
                <span aria-hidden="true">
                  {next.position}/{next.total}
                </span>
                <span className="sr-only">
                  Stop {next.position} of {next.total}
                </span>
              </Badge>
            )
          }
        >
          {next ? (
            <Link
              to={`/appointments/${next.appointmentId}`}
              className="card-link"
              aria-label={`Open appointment: ${next.title}, ${next.subtitle}, ETA ${next.etaLabel}, ${next.statusLabel}`}
            >
              <ListItem
                title={next.title}
                subtext={next.subtitle}
                trailing={
                  <>
                    <span className="list-item__eta">
                      ETA - {next.etaLabel}
                    </span>
                    <Badge variant="status" tone="success">
                      {next.statusLabel}
                    </Badge>
                  </>
                }
              />
              <RouteMapPreview
                size="preview"
                travelTimeLabel={next.travelTimeLabel}
                arrivalTimeLabel={next.arrivalTimeLabel}
                description={`Route to ${next.title}, ${next.travelTimeLabel}, arriving ${next.arrivalTimeLabel}`}
              />
            </Link>
          ) : (
            <ListItem title="No upcoming appointments" />
          )}
        </Card>

        <Card
          title="Recent Messages"
          action={
            <ButtonLink to="/messages" intent="tertiary">
              View All
            </ButtonLink>
          }
        >
          {summary.recentMessages.map((message) => (
            <MessageListItem
              key={message.id}
              avatarUrl={message.senderAvatarUrl}
              sender={message.senderName}
              preview={message.preview}
              timeLabel={message.sentAgoLabel}
            />
          ))}
        </Card>

        <Card
          title="Truck Inventory"
          action={
            <ButtonLink to="/inventory" intent="tertiary">
              View All
            </ButtonLink>
          }
        >
          {summary.truckInventory.map((item) => (
            <ListItem
              key={item.id}
              title={item.name}
              subtext={item.onTruckLabel}
              trailing={
                <Badge variant="status" tone="neutral">
                  {item.usageLabel}
                </Badge>
              }
            />
          ))}
        </Card>
      </div>
    </>
  );
}
