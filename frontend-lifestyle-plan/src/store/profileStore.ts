import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {  ProfileFormValues } from "@/schemas";

interface ProfileState {
  profile: ProfileFormValues | null;
  setProfile: (data: ProfileFormValues) => void;
  clearProfile: () => void;
}

export const useProfileStore = create<ProfileState>()(
  persist(
    (set) => ({
      profile: null,
      setProfile: (data) => set({ profile: data }),
      clearProfile: () => set({ profile: null }),
    }),
    {
      name: "profile-storage", 
    }
  )
);