import { create } from "zustand";
import { type LoginFormValues } from "@/schemas";

interface Credentials {
  email: string;
  password: string;
}
interface LoginResponse {
  success: boolean;
  message?: string;
}
type Mutation<TInput, TResult> = {
  mutateAsync: (data: TInput) => Promise<TResult>;
};

interface AuthStore {
  credentials: Credentials | null;
  isLoggedIn: boolean;
  setCredentials: (email: string, password: string) => void;
  clearCredentials: () => void;
  login: (
  loginMutation: Mutation<LoginFormValues, LoginResponse>
) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  credentials: null,
  isLoggedIn: false,

  setCredentials: (email: string, password: string) =>
    set({ credentials: { email, password } }),

  clearCredentials: () => set({ credentials: null }),

  login: async (loginMutation) => {
    const { credentials } = useAuthStore.getState();
    if (!credentials) {
      return { success: false, error: "No credentials set" };
    }

    try {
      await loginMutation.mutateAsync(credentials);
      set({ isLoggedIn: true });
      return { success: true };
    } catch (error: unknown) {
      if (error instanceof Error) {
        return { success: false, error: error.message };
      }
    return { success: false, error: "An unknown error occurred" };
  }
  },

  logout: () => set({ isLoggedIn: false, credentials: null }),
}));
