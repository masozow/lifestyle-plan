import { create } from "zustand";
import { persist } from "zustand/middleware";
import { toast } from "sonner";
import { getFromServer } from "@/api";
import { API_ENDPOINTS } from "@/lib/backendURLS";

type FetchResponse = {
  success: string;
  message: string;
};

interface UserSession {
  id: number;
  name: string;
  gender: string;
  email: string;
  birthDate: Date;
  roleId: number;
}

interface SessionStore {
  user: UserSession | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  hasTriedFetching: boolean;
  fetchSession: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useSessionStore = create<SessionStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      hasTriedFetching: false,

      fetchSession: async () => {
      try {
        set({ isLoading: true });

        const data = await getFromServer(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/session`) as FetchResponse;

        if (typeof data.message !== "string") {
          throw new Error("Expected message to be a JSON string");
        }

    const parsedMessage = JSON.parse(data.message);

    const userData = {
      id: parsedMessage.id,
      name: parsedMessage.name,
      email: parsedMessage.email,
      roleId: parsedMessage.roleId,
      birthDate: parsedMessage.birthDate,
      gender: parsedMessage.gender
    };

      set({
        user: userData,
        isAuthenticated: true,
        isLoading: false,
        hasTriedFetching: true,
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.warn("No session found:", error.message);
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          hasTriedFetching: true,
        });
      }
    }
  },


      logout: async () => {
        try {
          await fetch(
            API_ENDPOINTS.logout,
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
