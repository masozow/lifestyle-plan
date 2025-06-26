import { useSessionStore } from "@/store";

export const handle401Logout = async (res: Response) => {
  if (res.status === 401) {
    const { logout } = useSessionStore.getState();
    await logout();
    throw new Error("Session expired. You have been logged out.");
  }
};