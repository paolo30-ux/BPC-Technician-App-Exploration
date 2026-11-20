import { Navigate, type RouteObject } from 'react-router-dom';
import { MobileLayout } from '@/layouts/MobileLayout';
import { AppointmentIndexPage, AppointmentPage } from '@/pages/AppointmentPage';
import { HomePage } from '@/pages/HomePage';
import { PlaceholderPage } from '@/pages/PlaceholderPage';
import { SiteVerificationPage } from '@/pages/SiteVerificationPage';

/**
 * Route model (DD-07): one route per logical screen. Sheets, overlays, toasts
 * and clock states are component state, not routes. Full plan:
 * docs/component-mapping.md §4. Unbuilt screens render PlaceholderPage.
 */
export const routes: RouteObject[] = [
  { index: true, element: <Navigate to="/home" replace /> },
  {
    path: '/login',
    element: (
      <PlaceholderPage
        title="Log In"
        description="Mock sign-in screen. Implemented in a later phase."
      />
    ),
  },
  {
    // Figma: Settings has no bottom navigation.
    path: '/settings',
    element: <PlaceholderPage title="Settings" />,
  },
  {
    element: <MobileLayout />,
    children: [
      { path: '/home', element: <HomePage /> },
      {
        path: '/notifications',
        element: <PlaceholderPage title="Notifications" />,
      },
      { path: '/inventory', element: <PlaceholderPage title="Inventory" /> },
      { path: '/schedule', element: <PlaceholderPage title="Schedule" /> },
      { path: '/appointments', element: <AppointmentIndexPage /> },
      { path: '/appointments/:appointmentId', element: <AppointmentPage /> },
      {
        path: '/appointments/:appointmentId/site',
        element: <SiteVerificationPage />,
      },
      {
        path: '/appointments/:appointmentId/start',
        element: (
          <PlaceholderPage
            title="Start Service"
            description="The service agreement step is planned for the next iteration."
          />
        ),
      },
      { path: '/messages', element: <PlaceholderPage title="Messages" /> },
    ],
  },
  { path: '*', element: <Navigate to="/home" replace /> },
];
