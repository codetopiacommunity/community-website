"use client";

import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

export interface UseFetchDataOptions {
  errorMessage?: string;
}

export interface UseFetchDataResult<T> {
  data: T | null;
  loading: boolean;
  refetch: () => void;
}

export function useFetchData<T>(
  url: string,
  options?: UseFetchDataOptions,
): UseFetchDataResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(url);
      if (!res.ok) {
        toast.error(options?.errorMessage);
        return;
      }
      setData(await res.json());
    } catch {
      toast.error(options?.errorMessage);
    } finally {
      setLoading(false);
    }
  }, [url, options?.errorMessage]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, refetch: fetchData };
}
