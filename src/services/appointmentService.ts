import { appointments } from '@/mocks/fixtures';
import type { Appointment } from '@/types/domain';
import { withMockLatency } from '@/utils/mockLatency';

/**
 * Mock scenarios let a presenter (or a test) show the designed empty state
 * via `?scenario=empty` without changing code.
 */
export type MockScenario = 'default' | 'empty';

export function parseScenario(value: string | null): MockScenario {
  return value === 'empty' ? 'empty' : 'default';
}

function activeAppointments(scenario: MockScenario): Appointment[] {
  return scenario === 'empty' ? [] : appointments;
}

/** Id of the technician's current appointment, or null when there is none. */
export function fetchActiveAppointmentId(
  scenario: MockScenario = 'default',
): Promise<string | null> {
  return withMockLatency(activeAppointments(scenario)[0]?.id ?? null);
}

export interface AppointmentWithNeighbours {
  appointment: Appointment;
  previousId: string | null;
  nextId: string | null;
}

/** Resolves to null when the id is unknown (rendered as "not found"). */
export function fetchAppointment(
  id: string,
  scenario: MockScenario = 'default',
): Promise<AppointmentWithNeighbours | null> {
  const list = activeAppointments(scenario);
  const index = list.findIndex((item) => item.id === id);
  if (index === -1) return withMockLatency(null);
  return withMockLatency({
    appointment: list[index],
    previousId: list[index - 1]?.id ?? null,
    nextId: list[index + 1]?.id ?? null,
  });
}
