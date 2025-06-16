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

/**
 * Attempts to log in using the provided mutation function.
 * Retrieves the current credentials from the store state.
 * 
 * @param loginMutation - The mutation function used to perform the login operation.
 * 
 * @returns An object indicating the success status and an optional error message.
 * If credentials are not set, returns an error message.
 * If the login operation is successful, updates the state to set `isLoggedIn` to true.
 * If an error occurs during the login operation, returns the error message.
 */

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
