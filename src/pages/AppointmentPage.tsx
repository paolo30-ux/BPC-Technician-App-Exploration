import { Navigate, useParams, useSearchParams } from 'react-router-dom';
import { ButtonLink } from '@/components/base/button/Button';
import { IconButton, IconLink } from '@/components/base/iconbutton/IconButton';
import { Spinner } from '@/components/base/spinner/Spinner';
import { AppointmentProgress } from '@/components/features/appointment/AppointmentProgress';
import { AppointmentSummary } from '@/components/features/appointment/AppointmentSummary';
import { DatedNotes } from '@/components/features/appointment/NotesList';
import { AccordionCard } from '@/components/shared/card/Card';
import { EmptyState } from '@/components/shared/emptystate/EmptyState';
import { InlineAlert } from '@/components/shared/inlinealert/InlineAlert';
import { MainHeader } from '@/components/shared/mainheader/MainHeader';
import { useAsync } from '@/hooks/useAsync';
import { useBackNavigation } from '@/hooks/useBackNavigation';
import {
  fetchActiveAppointmentId,
  fetchAppointment,
  parseScenario,
} from '@/services/appointmentService';
import './pages.css';

function AppointmentsHeader({
  previousTo,
  nextTo,
}: {
  previousTo?: string | null;
  nextTo?: string | null;
}) {
  const goBack = useBackNavigation('/home');
  const nav = (to: string | null | undefined, dir: 'previous' | 'next') =>
    to ? (
      <IconLink
        to={to}
        icon={dir}
        variant="outlined"
        label={`${dir === 'next' ? 'Next' : 'Previous'} appointment`}
      />
    ) : (
      <IconButton
        icon={dir}
        variant="outlined"
        label={`${dir === 'next' ? 'Next' : 'Previous'} appointment`}
        disabled
      />
    );
  return (
    <MainHeader
      title="Appointments"
      leading={<IconButton icon="back" label="Back" onClick={goBack} />}
      actions={
        <>
          {nav(previousTo, 'previous')}
          {nav(nextTo, 'next')}
        </>
      }
    />
  );
}

function NoActiveAppointments() {
  return (
    <>
      <AppointmentsHeader />
      <EmptyState
        icon="alert"
        title="No Active Appointments"
        description="You have no upcoming appointments scheduled at this time."
      />
    </>
  );
}

/** /appointments — opens the technician's current appointment (Figma 9001:262664 when none). */
export function AppointmentIndexPage() {
  const [params] = useSearchParams();
  const scenario = parseScenario(params.get('scenario'));
  const state = useAsync(() => fetchActiveAppointmentId(scenario), [scenario]);

  if (state.status === 'loading')
    return <Spinner label="Loading appointment" />;
  if (state.status === 'success' && state.data)
    return (
      <Navigate
        to={{
          pathname: `/appointments/${state.data}`,
          search: params.toString(),
        }}
        replace
      />
    );
  return <NoActiveAppointments />;
}

/** Figma: Appointment (9001:262230) with Notes / progress states. */
export function AppointmentPage() {
  const { appointmentId = '' } = useParams();
  const [params] = useSearchParams();
  const scenario = parseScenario(params.get('scenario'));
  const state = useAsync(
    () => fetchAppointment(appointmentId, scenario),
    [appointmentId, scenario],
  );

  if (state.status === 'loading')
    return (
      <>
        <AppointmentsHeader />
        <Spinner label="Loading appointment" />
      </>
    );

  if (state.status === 'error' || !state.data)
    return (
      <>
        <AppointmentsHeader />
        <EmptyState
          title="Appointment not found"
          description="This appointment is no longer available."
          action={
            <ButtonLink to="/appointments" intent="secondary">
              Go to current appointment
            </ButtonLink>
          }
        />
      </>
    );

  const { appointment, previousId, nextId } = state.data;
  const suffix = params.toString() ? `?${params.toString()}` : '';

  return (
    <>
      <AppointmentsHeader
        previousTo={previousId && `/appointments/${previousId}${suffix}`}
        nextTo={nextId && `/appointments/${nextId}${suffix}`}
      />
      <div className="page-content page-content--tight-top">
        {appointment.warning && <InlineAlert title={appointment.warning} />}
        <section
          className="appointment-panel"
          aria-label={`Appointment at ${appointment.locationName}`}
        >
          <AppointmentSummary appointment={appointment} />
          <AppointmentProgress progress={appointment.progress} />
          <AccordionCard title="Notes">
            <DatedNotes notes={appointment.notes} />
          </AccordionCard>
          <AccordionCard title="Details">
            {/* Expanded "Details" content is not designed in Figma (F-08). */}
            <p className="notes-list__empty">
              Appointment details are not designed yet.
            </p>
          </AccordionCard>
          <ButtonLink to="site" intent="primary" fullWidth>
            Site Verification
          </ButtonLink>
        </section>
      </div>
    </>
  );
}
