import type { IconName } from '@/lib/icons';

export interface NavItem {
  to: string;
  label: string;
  icon: IconName;
}

/** Tabs and order from Figma "Mobile Navigation Bar" (page=home…message). */
export const navItems: readonly NavItem[] = [
  { to: '/home', label: 'Home', icon: 'navHome' },
  { to: '/inventory', label: 'Inventory', icon: 'navInventory' },
  { to: '/schedule', label: 'Schedule', icon: 'navSchedule' },
  { to: '/appointments', label: 'Appointment', icon: 'navAppointment' },
  { to: '/messages', label: 'Message', icon: 'navMessage' },
];
