/** Domain types for the prototype. Shapes follow what the Figma screens show. */

export interface Technician {
  id: string;
  firstName: string;
  lastName: string;
  /** License / route code shown under the greeting (Figma: "#IH8ANTS"). */
  code: string;
  avatarUrl: string;
  unreadNotifications: number;
}

export type AppointmentStatus = 'scheduled' | 'ongoing' | 'completed';

export type WorkflowStepStatus = 'done' | 'current' | 'locked';

export interface WorkflowStep {
  id: string;
  label: string;
  status: WorkflowStepStatus;
}

export interface AppointmentNote {
  date: string; // display date, e.g. "10/01/2025"
  entries: string[];
}

export interface ServiceLine {
  service: string;
  unit: string;
  regularPrice: number;
  discountedPrice: number;
}

export interface GeoAddress {
  label: string; // one-line address
  caption: string; // e.g. "Current Location" or "0.5 mi • ETA 5:18 AM"
}

export interface Appointment {
  id: string;
  locationName: string;
  status: AppointmentStatus;
  serviceName: string;
  etaLabel: string; // e.g. "7:00 AM"
  contact: {
    name: string;
    email: string;
    officePhone: string;
    personalPhone: string;
  };
  address: string;
  progress: {
    title: string; // e.g. "New Appointment"
    subtitle: string; // e.g. "Next Site Verification"
    completed: number;
    total: number;
    steps: WorkflowStep[];
  };
  /** Shown as the inline alert on Appointment / Site Verification. */
  warning?: string;
  notes: AppointmentNote[];
  siteVerification: {
    travelTimeLabel: string; // "18 mins"
    arrivalTimeLabel: string; // "12:30 AM"
    currentLocation: GeoAddress;
    destination: GeoAddress;
    customerServices: ServiceLine[];
    pastServices: ServiceLine[];
    notes: string[];
  };
}

export interface MessagePreview {
  id: string;
  senderName: string;
  senderAvatarUrl: string;
  preview: string;
  sentAgoLabel: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  onTruckLabel: string; // e.g. "200 oz"
  usageLabel: string; // e.g. "20 oz"
}

export interface NextScheduleSummary {
  appointmentId: string;
  position: number; // e.g. 2 (of 10)
  total: number;
  title: string;
  subtitle: string;
  etaLabel: string;
  /** Route status shown on Home (Figma: "On going"). */
  statusLabel: string;
  travelTimeLabel: string;
  arrivalTimeLabel: string;
}

export interface HomeSummary {
  nextSchedule: NextScheduleSummary | null;
  recentMessages: MessagePreview[];
  truckInventory: InventoryItem[];
}
