import { create } from 'zustand';

export interface VerificationPhoto {
  /** Object URL created from the local file (never uploaded anywhere). */
  url: string;
  name: string;
}

interface SiteVerificationState {
  photos: Record<string, VerificationPhoto | undefined>;
  setPhoto: (appointmentId: string, file: File) => void;
  clearPhoto: (appointmentId: string) => void;
}

/**
 * Keeps the confirmed site photo per appointment for the session, so the
 * photo survives navigating away and back. Object URLs are revoked when
 * replaced or cleared.
 */
export const useSiteVerificationStore = create<SiteVerificationState>()(
  (set, get) => ({
    photos: {},
    setPhoto: (appointmentId, file) => {
      const previous = get().photos[appointmentId];
      if (previous) URL.revokeObjectURL(previous.url);
      set((state) => ({
        photos: {
          ...state.photos,
          [appointmentId]: { url: URL.createObjectURL(file), name: file.name },
        },
      }));
    },
    clearPhoto: (appointmentId) => {
      const previous = get().photos[appointmentId];
      if (previous) URL.revokeObjectURL(previous.url);
      set((state) => ({
        photos: { ...state.photos, [appointmentId]: undefined },
      }));
    },
  }),
);
