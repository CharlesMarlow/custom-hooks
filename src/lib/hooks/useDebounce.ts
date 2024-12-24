import { useEffect, useState } from 'react';

export const useDebounce = (
  input: string,
  cb: (value: string) => void,
  wait: number
) => {
  const [debouncedValue, setDebouncedValue] = useState<string>(input);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(input);
    }, wait);

    return () => clearTimeout(handler);
  }, [input, wait]);

  useEffect(() => {
    cb(debouncedValue);
  }, [debouncedValue, cb]);

  return [debouncedValue];
};
