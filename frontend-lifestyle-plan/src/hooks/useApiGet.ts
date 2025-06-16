import { getFromServer } from "@/api";
import {
  useQuery,
  type UseQueryOptions,
  type UseQueryResult
} from "@tanstack/react-query";

interface UseApiRequestProps<T> {
  url: string;
  enabled?: boolean;
  options?: Partial<UseQueryOptions<T, Error>>;
}

export const useApiGet = <T = unknown>({
  url,
  enabled = true,
  options = {},
}: UseApiRequestProps<T>): UseQueryResult<T, Error> => {
  if (!enabled) {
    console.warn(
      `[useApiGet] Query for "${url}" was not executed because 'enabled' is false.`
    );
  }

  const query = useQuery<T, Error>({
    queryKey: [url],
    queryFn: () => getFromServer<T>(url),
    enabled,
    ...options,
  });

  if ((query.status as string) === "idle") {
  console.warn(`[useApiGet] Query is idle for "${url}" — check 'enabled' flag.`);
}

  return query;
};
