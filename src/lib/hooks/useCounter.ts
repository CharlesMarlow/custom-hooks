import { useState } from 'react';

export const useCounter = () => {
  const [count, setCount] = useState<number>(0);

  const increment = () => setCount((prev) => prev + 1);
  const decrement = () => setCount((prev) => prev - 1);

  return {
    count,
    increment,
    decrement,
  };
};
