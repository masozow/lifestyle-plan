import { saveToServer } from "@/api";
import { useMutation } from "@tanstack/react-query";

interface UseSubmitProps<T> {
  url: string;
  data: T;
  method: string;
}

export const useSubmit = <T>({ url,method }: UseSubmitProps<T>) =>
  useMutation({
    mutationFn: async (data: T) => {
      const res = await saveToServer(url, method, data);
      return res;
    },
    onSuccess: (data) => {
      console.log("✅ Data saved to server:", data);
    },
    onError: (error) => {
      console.error("❌ Error saving data to server:", error);
    },
  });
