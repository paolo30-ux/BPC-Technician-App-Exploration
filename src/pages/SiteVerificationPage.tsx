import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Badge } from '@/components/base/badge/Badge';
import { Button, ButtonAnchor } from '@/components/base/button/Button';
import { IconButton } from '@/components/base/iconbutton/IconButton';
import { Spinner } from '@/components/base/spinner/Spinner';
import { BulletNotes } from '@/components/features/appointment/NotesList';
import { ServicesTable } from '@/components/features/appointment/ServicesTable';
import { LocationRoute } from '@/components/features/map/LocationRoute';
import { RouteMapPreview } from '@/components/features/map/RouteMapPreview';
import { PhotoUploadArea } from '@/components/features/photo/PhotoUploadArea';
import { PhotoVerificationSheet } from '@/components/features/photo/PhotoVerificationSheet';
import { AccordionCard, Card } from '@/components/shared/card/Card';
import { EmptyState } from '@/components/shared/emptystate/EmptyState';
import { InlineAlert } from '@/components/shared/inlinealert/InlineAlert';
import { MainHeader } from '@/components/shared/mainheader/MainHeader';
import { useAsync } from '@/hooks/useAsync';
import { useBackNavigation } from '@/hooks/useBackNavigation';
import { icons } from '@/lib/icons';
import { useSiteVerificationStore } from '@/lib/stores/useSiteVerificationStore';
import { fetchAppointment } from '@/services/appointmentService';
import './pages.css';

/**
 * Figma: "Appointment -> Site Verification" (9001:262696, full content
 * 9001:262768) with the Photo Verification overlay (9001:263117 / 263134)
 * and the uploaded state (9001:263230).
 */
export function SiteVerificationPage() {
  const { appointmentId = '' } = useParams();
  const navigate = useNavigate();
  const goBack = useBackNavigation(`/appointments/${appointmentId}`);
  const [sheetOpen, setSheetOpen] = useState(false);
  const photo = useSiteVerificationStore((s) => s.photos[appointmentId]);
  const setPhoto = useSiteVerificationStore((s) => s.setPhoto);
  const state = useAsync(
    () => fetchAppointment(appointmentId),
    [appointmentId],
  );

  const header = (
    <MainHeader
      title="Site Verification"
      leading={<IconButton icon="back" label="Back" onClick={goBack} />}
    />
  );

  if (state.status === 'loading')
    return (
      <>
        {header}
        <Spinner label="Loading site verification" />
      </>
    );

  if (state.status === 'error' || !state.data)
    return (
      <>
        {header}
        <EmptyState
          title="Appointment not found"
          description="This appointment is no longer available."
        />
      </>
    );

  const { appointment } = state.data;
  const site = appointment.siteVerification;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(site.destination.label)}`;

  return (
    <>
      {header}
      <div className="page-content page-content--loose">
        <Card
          aria-label="Route to the appointment"
          headerContent={
            <ButtonAnchor
              href={directionsUrl}
              intent="secondary"
              icon="directions"
              fullWidth
            >
              Driving Directions
            </ButtonAnchor>
          }
        >
          <RouteMapPreview
            size="detail"
            travelTimeLabel={site.travelTimeLabel}
            arrivalTimeLabel={site.arrivalTimeLabel}
            description={`Route from ${site.currentLocation.label} to ${site.destination.label}, ${site.travelTimeLabel}`}
          />
          <LocationRoute from={site.currentLocation} to={site.destination} />
        </Card>

        <Card title="Upload Location" bodyPadding="sm">
          <PhotoUploadArea
            photoUrl={photo?.url}
            label={photo ? 'Replace site photo' : 'Upload site photo'}
            onActivate={() => setSheetOpen(true)}
          />
        </Card>

        <Card
          title="Customer Services"
          plainHeader
          bodyPadding="md"
          action={
            <Badge variant="status" tone="active">
              Active
            </Badge>
          }
        >
          <ServicesTable
            lines={site.customerServices}
            caption="Customer services"
          />
        </Card>

        <Card
          title="Past Services"
          plainHeader
          bodyPadding="md"
          action={
            // Figma shows an info button with no prototype action (F-08).
            <span className="info-icon" aria-hidden="true">
              <FontAwesomeIcon icon={icons.info} />
            </span>
          }
        >
          <ServicesTable lines={site.pastServices} caption="Past services" />
        </Card>

        <AccordionCard title="Notes" defaultOpen>
          <BulletNotes notes={site.notes} />
        </AccordionCard>

        {appointment.warning && <InlineAlert title={appointment.warning} />}

        <div className="page-actions">
          <Button intent="secondary" onClick={goBack}>
            Cancel
          </Button>
          <Button
            intent="primary"
            disabled={!photo}
            aria-describedby="start-service-hint"
            onClick={() => navigate(`/appointments/${appointment.id}/start`)}
          >
            Start Service
          </Button>
        </div>
        <p id="start-service-hint" className="sr-only">
          {photo
            ? 'Site photo added.'
            : 'Add a site photo to enable Start Service.'}
        </p>
      </div>

      <PhotoVerificationSheet
        show={sheetOpen}
        onCancel={() => setSheetOpen(false)}
        onConfirm={(file) => {
          setPhoto(appointment.id, file);
          setSheetOpen(false);
        }}
      />
    </>
  );
}
