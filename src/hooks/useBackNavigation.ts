import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Prototype "BACK": go back in history when there is an in-app entry,
 * otherwise go to `fallback` (e.g. deep link or reload).
 */
export function useBackNavigation(fallback: string) {
  const navigate = useNavigate();
  return useCallback(() => {
    const index = (window.history.state as { idx?: number } | null)?.idx ?? 0;
    if (index > 0) navigate(-1);
    else navigate(fallback, { replace: true });
  }, [navigate, fallback]);
}
