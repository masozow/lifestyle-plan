import type { MealStatus, MealStatusItem } from "@/types/openAIPlan";
import { create } from "zustand";
import { persist } from "zustand/middleware";




interface MealPlanStore {
  mealStatus: MealStatus;
  lastSyncedAt: number | null;
  setMealStatus: (mealStatus: MealStatus) => void;
  updateMealStatus: (key: number, status: MealStatusItem) => void;
  markAsSynced: () => void;
  clearMealPlan: () => void;
  hasUnsyncedChanges: () => boolean;
}

export const useMealPlanStore = create<MealPlanStore>()(
  persist(
    (set, get) => ({
      mealStatus: {},
      lastSyncedAt: null,

      setMealStatus: (mealStatus) => set({ mealStatus }),

      updateMealStatus: (key, status) =>
        set((state) => ({
          mealStatus: {
            ...state.mealStatus,
            [key]: status,
          },
        })),

      markAsSynced: () => set({ lastSyncedAt: Date.now() }),

      clearMealPlan: () => set({ mealStatus: {}, lastSyncedAt: null }),

      hasUnsyncedChanges: () => {
        const state = get();
        return state.lastSyncedAt === null || Object.keys(state.mealStatus).length > 0;
      },
    }),
    {
      name: "meal-plan-storage",
    }
  )
);
