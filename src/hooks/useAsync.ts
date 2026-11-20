import { useEffect, useState } from 'react';

export type AsyncState<T> =
  | { status: 'loading'; data?: undefined; error?: undefined }
  | { status: 'success'; data: T; error?: undefined }
  | { status: 'error'; data?: undefined; error: Error };

/**
 * Minimal data loader for mock services. Re-runs when `deps` change and
 * ignores results from stale requests.
 */
export function useAsync<T>(
  load: () => Promise<T>,
  deps: readonly unknown[],
): AsyncState<T> {
  const [state, setState] = useState<AsyncState<T>>({ status: 'loading' });

  useEffect(() => {
    let cancelled = false;
    setState({ status: 'loading' });
    load().then(
      (data) => {
        if (!cancelled) setState({ status: 'success', data });
      },
      (error: unknown) => {
        if (!cancelled)
          setState({
            status: 'error',
            error: error instanceof Error ? error : new Error(String(error)),
          });
      },
    );
    return () => {
      cancelled = true;
    };
    // `load` is intentionally excluded: callers pass inline closures.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return state;
}
