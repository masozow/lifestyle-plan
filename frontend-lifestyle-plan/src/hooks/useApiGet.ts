import { getFromServer } from "@/api";
import { useQuery, type UseQueryOptions, type UseQueryResult } from "@tanstack/react-query";

interface UseApiRequestProps<T> {
  url: string;
  enabled?: boolean;
   options?: Partial<UseQueryOptions<T, Error>>;
}


/**
 * Hook to use when making a GET request to the server.
 *
 * @example
 * const { data, error, isLoading } = useApiGet<{ foo: string }>("https://example.com/api/data");
 * if (isLoading) return <div>Loading...</div>
 * if (error) return <div>Error: {error.message}</div>
 * return <div>Data: {data.foo}</div>
 *
 * @param {UseApiRequestProps} props - Properties for the hook.
 * @param {string} props.url - URL of the API endpoint to request.
 * @param {boolean} [props.enabled=true] - Whether to enable the request.
 * @param {Partial<UseQueryOptions<T, Error>>} [props.options] - Options for the underlying `useQuery` hook.
 * @returns {UseQueryResult<T, Error>} - The result of the request.
 */
export const useApiGet = <T = unknown>({
  url,
  enabled = true,
  options = {},
}: UseApiRequestProps<T>): UseQueryResult<T, Error> =>
  useQuery<T, Error>({
    queryKey: [url],
    queryFn: () => getFromServer<T>(url),
    enabled,
    ...options,
  });
