// hooks/useApiRequest.ts
import { saveToServer } from "@/api";
import { useMutation } from "@tanstack/react-query";

interface UseApiRequestProps {
  url: string;
  method: string;
}

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
