import { saveToServer } from "@/api";
import { useMutation } from "@tanstack/react-query";

interface UseApiRequestProps {
  url: string;
  method: string;
}

/**
 * Hook to use when making API requests that should be saved to the server.
 *
 * @example
 * const { mutate: saveData } = useApiRequest({ url: "/api/data", method: "POST" });
 * saveData({ foo: "bar" });
 *
 * @param {UseApiRequestProps} props - Properties for the hook.
 * @param {string} props.url - URL of the API endpoint to send the request to.
 * @param {string} props.method - HTTP method to use for the request.
 * @returns {UseMutationResult} - `useMutation` result with the `mutate` function.
 */
export const useApiRequest = <T>({ url, method }: UseApiRequestProps) =>
  useMutation({
    mutationFn: async (data: T) => {
      return await saveToServer(url, method, data);
    },
    onSuccess: (data) => {
      console.log("✅ Data saved to server:", data);
    },
    onError: (error) => {
      console.error("❌ Error saving data to server:", error);
    },
  });
