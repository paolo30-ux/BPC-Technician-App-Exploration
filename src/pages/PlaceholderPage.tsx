import { EmptyState } from '@/components/shared/emptystate/EmptyState';
import { MainHeader } from '@/components/shared/mainheader/MainHeader';

export interface PlaceholderPageProps {
  title: string;
  description?: string;
}

/**
 * Temporary screen used until a route is implemented. Uses the Figma
 * title-only main-header and the DS "main-content type=empty" pattern.
 */
export function PlaceholderPage({
  title,
  description = 'This screen is planned but not built yet.',
}: PlaceholderPageProps) {
  return (
    <>
      <MainHeader title={title} />
      <EmptyState icon="clock" title="Coming soon" description={description} />
    </>
  );
}
