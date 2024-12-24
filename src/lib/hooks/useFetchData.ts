import { useState, useEffect } from 'react';
import { ApiError } from '../types';

export const useFetchData = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`HTTP Error. Status: ${response.status}`);
        }

        const data = (await response.json()) as T;
        setData(data);
      } catch (error) {
        console.error(error);
        const apiError = error as ApiError;
        setError(`Error: ${apiError.message}. Status: ${apiError.status}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};
