import { useState } from 'react';
import { CounterTracker } from '../types';

export const useCounterTracker = () => {
  const [state, setState] = useState<CounterTracker>({
    count: 0,
    lastClick: null,
  });

  const incrementCountAndSetLastClick = () => {
    setState((prev) => ({
      count: prev.count + 1,
      lastClick: Date.now(),
    }));
  };

  return {
    state,
    incrementCountAndSetLastClick,
  };
};
