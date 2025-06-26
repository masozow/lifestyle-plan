import { useSessionStore } from "@/store";

export const saveToServer = async <T>(url: string, method: string, data: T): Promise<any> => {
  const response = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data || {}),
  });

  if (response.status === 401) {
    const { logout } = useSessionStore.getState();
    await logout();
    throw new Error("Session expired. You have been logged out.");
  }

  if (!response.ok) {
    const error = await response.json();
    const errorMessage = error?.message || response.statusText;
    const errorToThrow = new Error(errorMessage);
    if (import.meta.env.ENVIRONMENT === "development") {
      console.error("Error saving data to server:", errorToThrow);
    }
    throw errorToThrow;
  }

  return response.json();
};
