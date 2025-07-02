import { create } from "zustand";
import { type LoginFormValues } from "@/schemas";
import { useMealPlanStore, usePlanStore, useProfileStore, useSessionStore } from "@/store";

interface Credentials {
  email: string;
  password: string;
}
export interface ServerResponse {
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
    loginMutation: Mutation<LoginFormValues, ServerResponse>
  ) => Promise<{ success: boolean; error?: string }>;
  logout: (
    logoutMutation: { mutateAsync: (data?: any) => Promise<any> }
  ) => Promise<ServerResponse>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  credentials: null,
  isLoggedIn: false,

  setCredentials: (email, password) => set({ credentials: { email, password } }),

  clearCredentials: () => set({ credentials: null }),

  /**
   * Log in using the provided mutation.
   *
   * @param loginMutation The mutation to call with the current credentials.
   * @returns A promise that resolves to an object with a `success` property
   *   indicating whether the login was successful. If the login was not
   *   successful, the object will also contain an `error` property with a
   *   string describing the error.
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

  /**
   * Log out using the provided mutation.
   *
   * @param logoutMutation The mutation to call to log out the user.
   * @returns A promise that resolves to `void` once the logout is complete.
   *
   * This function will call the mutation, and then clear all stores and
   * their persistences. It will also notify the user that the session
   * has ended.
   */
  logout: async (logoutMutation) => {
    let result: ServerResponse = { success: true, message: "Logged out" };
    try {
      // Call the endpoint
      const response = await logoutMutation.mutateAsync();
      result = response as ServerResponse;
    } catch (error) {
      result = { success: false, message: (error as Error)?.message || "Logout failed" };
      console.warn("Logout error", error);
    } finally {
      // Clear this store
      set({ isLoggedIn: false, credentials: null });

      // Clear session store
      const sessionStore = useSessionStore.getState();
      sessionStore.logout(); // if you prefer to also call its logout method
      // or:
      // sessionStore.set({ user: null, isAuthenticated: false });

      // Clear all other stores
      const mealPlanStore = useMealPlanStore.getState();
      mealPlanStore.clearMealPlan();

      const planStore = usePlanStore.getState();
      planStore.clearPlan();

      const profileStore = useProfileStore.getState();
      profileStore.clearProfile();

      // Remove all persistences
      localStorage.removeItem("session-store");
      localStorage.removeItem("meal-plan-storage");
      localStorage.removeItem("planner-storage");
      localStorage.removeItem("profile-storage");

      
    }
    return result;
  },
}));

