
import { useEffect, useRef } from 'react';

export function useInterval(callback: () => void, delay: number | null) {
  // Added undefined as initial value to satisfy TypeScript and updated type to allow undefined
  const savedCallback = useRef<(() => void) | undefined>(undefined);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      if (savedCallback.current) {
        savedCallback.current();
      }
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
