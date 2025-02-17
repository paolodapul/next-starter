import { useState, useTransition, useEffect } from "react";

export function useServerQuery<T>(fetcher: () => Promise<T>) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isPending, startTransition] = useTransition();

  const fetchData = () => {
    startTransition(async () => {
      try {
        setError(null);
        const result = await fetcher();
        setData(result);
      } catch (err) {
        setError(err as Error);
      }
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, error, isPending, refetch: fetchData };
}
