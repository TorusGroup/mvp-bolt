import { useEffect, useCallback } from 'react';

export function useTimeout(callback: () => void, delay: number) {
  const memoizedCallback = useCallback(callback, [callback]);

  useEffect(() => {
    const timer = setTimeout(memoizedCallback, delay);
    return () => clearTimeout(timer);
  }, [memoizedCallback, delay]);
}