import { useSessionStore } from "@/store";

export const getFromServer = async <T>(url: string): Promise<T> => {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (response.status === 401) {
    const { logout } = useSessionStore.getState();
    await logout();
    throw new Error("Session expired. You have been logged out.");
  }

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error?.message || response.statusText);
  }

  return response.json();
};
