/**
 * Simulated network latency for mock services, so loading states are visible
 * in the browser. Zero under Vitest to keep tests fast and deterministic.
 */
export const MOCK_LATENCY_MS = import.meta.env.MODE === 'test' ? 0 : 350;

export function withMockLatency<T>(value: T): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(structuredClone(value)), MOCK_LATENCY_MS);
  });
}
