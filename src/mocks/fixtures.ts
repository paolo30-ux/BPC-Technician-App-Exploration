/**
 * Mock fixtures for the prototype (DD-06).
 * All people, companies, emails and phone numbers are FICTIONAL. Text content
 * mirrors the Figma frames where they show realistic copy; Figma placeholders
 * ("Item name", "subtext") are replaced with plausible values. Emails use the
 * reserved example.com domain.
 */
import technicianAvatar from '@/assets/figma/avatar-technician.jpg';
import contactAvatar from '@/assets/figma/avatar-contact.png';
import type { Appointment, HomeSummary, Technician } from '@/types/domain';

export const technician: Technician = {
  id: 'tech-001',
  firstName: 'Randy',
  lastName: 'Shaw',
  code: '#IH8ANTS',
  avatarUrl: technicianAvatar,
  unreadNotifications: 2,
};

const workflowSteps = (): Appointment['progress']['steps'] => [
  { id: 'site-verification', label: 'Site Verification', status: 'current' },
  { id: 'service-agreement', label: 'Service Agreement', status: 'locked' },
  { id: 'service-list', label: 'Service List', status: 'locked' },
  { id: 'signatures', label: 'Signatures', status: 'locked' },
];

const appointmentNotes: Appointment['notes'] = [
  {
    date: '10/01/2025',
    entries: [
      'Pretty positive they brought the bugs with them from their previous travel.',
    ],
  },
  {
    date: '09/30/2025',
    entries: [
      'Really bad infestation! Especially bad in the smallest bedroom.',
      'The bedroom has cats and is worried they might be spreading the bugs around.',
      'Located behind the Tattoo/Smoke Shop. 8/4 Payment plan $250 down, $110 MT.',
    ],
  },
  { date: '09/29/2025', entries: ['CTR of Prep LMAM.'] },
];

const siteNotes = [
  'It is crucial for the technician to thoroughly inspect for any pests that could have inadvertently been carried over from previous locations during their travels.',
  'This includes examining all equipment, tools, and personal belongings for signs of infestation, as well as checking the surrounding environment for potential pest habitats.',
  'Special attention should be given to areas that are often overlooked, such as under machinery and inside storage compartments.',
];

export const appointments: Appointment[] = [
  {
    id: 'apt-1042',
    locationName: 'Springfield Public Library',
    status: 'scheduled',
    serviceName: 'Premium Bed Bug',
    etaLabel: '7:00 AM',
    contact: {
      name: 'Ryan Johnson',
      email: 'rjohnson@example.com',
      officePhone: '(801) 555-5555',
      personalPhone: '(801) 555-1234',
    },
    address: '7725 S 1520 W, Suite #400, West Jordan, UT 84084',
    progress: {
      title: 'New Appointment',
      subtitle: 'Next Site Verification',
      completed: 1,
      total: 4,
      steps: workflowSteps(),
    },
    warning: 'Your previous appointment has not been closed.',
    notes: appointmentNotes,
    siteVerification: {
      travelTimeLabel: '18 mins',
      arrivalTimeLabel: '12:30 AM',
      currentLocation: {
        label: '123 Oak Lane, Rivertown, TX 75001',
        caption: 'Current Location',
      },
      destination: {
        label: '7725 S 1520 W, Suite #400, West Jordan, UT 84084',
        caption: '0.5 mi • ETA 7:00 AM',
      },
      customerServices: [
        {
          service: 'Mice',
          unit: 'Yard',
          regularPrice: 117,
          discountedPrice: 117,
        },
      ],
      pastServices: [
        {
          service: 'Mice',
          unit: 'Yard',
          regularPrice: 117,
          discountedPrice: 117,
        },
      ],
      notes: siteNotes,
    },
  },
  {
    id: 'apt-1043',
    locationName: 'Maplewood Dental Studio',
    status: 'scheduled',
    serviceName: 'Quarterly Ant Control',
    etaLabel: '9:30 AM',
    contact: {
      name: 'Alicia Moreno',
      email: 'amoreno@example.com',
      officePhone: '(801) 555-0142',
      personalPhone: '(801) 555-0199',
    },
    address: '742 Maplewood Drive, Sandy, UT 84070',
    progress: {
      title: 'New Appointment',
      subtitle: 'Next Site Verification',
      completed: 1,
      total: 4,
      steps: workflowSteps(),
    },
    notes: [
      {
        date: '09/12/2025',
        entries: ['Ant trails along the back patio door. Gate code 4471.'],
      },
    ],
    siteVerification: {
      travelTimeLabel: '22 mins',
      arrivalTimeLabel: '9:30 AM',
      currentLocation: {
        label: '7725 S 1520 W, Suite #400, West Jordan, UT 84084',
        caption: 'Current Location',
      },
      destination: {
        label: '742 Maplewood Drive, Sandy, UT 84070',
        caption: '9.8 mi • ETA 9:30 AM',
      },
      customerServices: [
        {
          service: 'Ants',
          unit: 'Exterior',
          regularPrice: 89,
          discountedPrice: 79,
        },
      ],
      pastServices: [
        {
          service: 'Ants',
          unit: 'Exterior',
          regularPrice: 89,
          discountedPrice: 89,
        },
      ],
      notes: siteNotes.slice(0, 2),
    },
  },
];

export const homeSummary: HomeSummary = {
  nextSchedule: {
    appointmentId: 'apt-1042',
    position: 2,
    total: 10,
    title: 'Springfield Public Library',
    subtitle: 'Premium Bed Bug',
    etaLabel: '7:00 AM',
    statusLabel: 'On going',
    travelTimeLabel: '18 mins',
    arrivalTimeLabel: '12:30 AM',
  },
  recentMessages: [
    {
      id: 'msg-1',
      senderName: 'Marvin McKinney',
      senderAvatarUrl: contactAvatar,
      preview:
        'Your vehicle inspection is due this week. Please schedule an appointment with our maintenance team to ensure your vehicle meets safety standards.',
      sentAgoLabel: '40 mins ago',
    },
    {
      id: 'msg-2',
      senderName: 'Marvin McKinney',
      senderAvatarUrl: contactAvatar,
      preview: 'Reminder: please restock the bed bug kit before Friday.',
      sentAgoLabel: '1 hr ago',
    },
    {
      id: 'msg-3',
      senderName: 'Marvin McKinney',
      senderAvatarUrl: contactAvatar,
      preview: 'Route 4 has been updated with two new stops.',
      sentAgoLabel: '3 hrs ago',
    },
  ],
  truckInventory: [
    {
      id: 'inv-1',
      name: 'Deltamethrin',
      onTruckLabel: '200 oz',
      usageLabel: '20 oz',
    },
    {
      id: 'inv-2',
      name: 'Cypermethrin',
      onTruckLabel: '160 oz',
      usageLabel: '30 oz',
    },
    {
      id: 'inv-3',
      name: 'Lambda-cyhalothrin',
      onTruckLabel: '180 oz',
      usageLabel: '50 oz',
    },
  ],
};
