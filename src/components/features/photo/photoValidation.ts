/** Figma Image Upload copy: "JPG, PNG, SVG (Max 5 MB)". */
export const ACCEPTED_PHOTO_TYPES = [
  'image/jpeg',
  'image/png',
  'image/svg+xml',
] as const;
export const MAX_PHOTO_BYTES = 5 * 1024 * 1024;

/** Returns an error message, or null when the file is acceptable. */
export function validatePhoto(file: File): string | null {
  if (!(ACCEPTED_PHOTO_TYPES as readonly string[]).includes(file.type)) {
    return 'Choose a JPG, PNG or SVG image.';
  }
  if (file.size > MAX_PHOTO_BYTES) {
    return 'This photo is larger than 5 MB. Choose a smaller one.';
  }
  return null;
}
