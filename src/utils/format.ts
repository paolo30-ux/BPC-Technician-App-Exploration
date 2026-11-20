/** "05:53:24" from milliseconds. */
export function formatDuration(ms: number): string {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return [hours, minutes, seconds]
    .map((part) => String(part).padStart(2, '0'))
    .join(':');
}

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

/** "$117" */
export function formatPrice(value: number): string {
  return currency.format(value);
}

/** Digits-only tel: href from a display phone number. */
export function phoneHref(display: string): string {
  return `tel:${display.replace(/[^\d+]/g, '')}`;
}
