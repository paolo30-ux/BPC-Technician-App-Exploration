import { homeSummary, technician } from '@/mocks/fixtures';
import type { HomeSummary, Technician } from '@/types/domain';
import { withMockLatency } from '@/utils/mockLatency';

/** Mock-backed (DD-06). Replace the bodies when a real API exists. */
export function fetchTechnician(): Promise<Technician> {
  return withMockLatency(technician);
}

export function fetchHomeSummary(): Promise<HomeSummary> {
  return withMockLatency(homeSummary);
}
