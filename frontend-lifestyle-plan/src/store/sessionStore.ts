import { create } from "zustand";
import { persist } from "zustand/middleware";
import { toast } from "sonner";

interface UserSession {
  ID: number;
  NOMBRE: string;
  NOMBRE_ROL: string;
  ID_ROL: number;
}

interface SessionStore {
  user: UserSession | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  fetchSession: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useSessionStore = create<SessionStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: true,

      fetchSession: async () => {
        try {
          set({ isLoading: true });
          const res = await fetch(
            `${import.meta.env.VITE_BACKEND_BASE_URL}/api/usuarios/datos-token`,
            {
              credentials: "include",
            }
          );

          if (!res.ok) throw new Error("Unauthorized");

          const data = await res.json();
          const userData = data?.data;

          set({
            user: userData,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error: any) {
          console.warn("No session found:", error.message);
          set({ user: null, isAuthenticated: false, isLoading: false });
        }
      },

      logout: async () => {
        try {
          await fetch(
            `${import.meta.env.VITE_BACKEND_BASE_URL}/api/usuarios/logout`,
            {
              method: "POST",
              credentials: "include",
            }
          );
        } catch (error) {
          console.warn("Logout error", error);
        } finally {
          set({ user: null, isAuthenticated: false });
          toast.info("Session ended");
        }
      },
    }),
    {
      name: "session-store", 
    }
  )
);
