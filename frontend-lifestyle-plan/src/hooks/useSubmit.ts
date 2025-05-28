import { useMutation } from "@tanstack/react-query";

interface UseSubmitProps<T> {
  url: string;
}

export const useSubmit = <T>({ url }: UseSubmitProps<T>) =>
  useMutation({
    mutationFn: async (data: T) => {
      const res = await fetch(url, {
              method: "POST",
              credentials: "include",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
          });
          if (!res.ok) throw new Error("Error al guardar los datos");
          return await res.json();
    },
    onSuccess: (data) => {
      console.log("✅ Data saved to server:", data);
    },
    onError: (error) => {
      console.error("❌ Error saving data to server:", error);
    },
  });
