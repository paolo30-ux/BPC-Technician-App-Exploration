import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';
import { useClockStore } from '@/lib/stores/useClockStore';
import { useSiteVerificationStore } from '@/lib/stores/useSiteVerificationStore';

// happy-dom may not implement object URLs; photo selection relies on them.
if (typeof URL.createObjectURL !== 'function') {
  let counter = 0;
  URL.createObjectURL = () => `blob:mock-${++counter}`;
}
if (typeof URL.revokeObjectURL !== 'function') {
  URL.revokeObjectURL = () => undefined;
}

afterEach(() => {
  cleanup();
  useClockStore.getState().reset();
  useSiteVerificationStore.setState({ photos: {} });
});
