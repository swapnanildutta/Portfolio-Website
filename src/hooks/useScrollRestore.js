import { useEffect } from 'react';
import { usePrevious, usePrefersReducedMotion, useRouteTransition } from '.';

function useScrollRestore() {
  const { status } = useRouteTransition();
  const prevStatus = usePrevious(status);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const hasEntered = prevStatus === 'entering' && status === 'entered';
    const hasEnteredReducedMotion = prefersReducedMotion && status === 'entered';

    if (hasEntered || hasEnteredReducedMotion) {
      window.scrollTo(0, 0);
      document.getElementById('MainContent').focus();
    };

  }, [prefersReducedMotion, prevStatus, status]);
}

export default useScrollRestore;
