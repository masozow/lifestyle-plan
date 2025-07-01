import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { MealStatus, MealStatusItem } from "@/types/openAIPlan";

interface MealPlanStore {
  mealStatus: MealStatus;
  lastSyncedAt: number | null;
  lastTouchedKey: number | null;
  setMealStatus: (mealStatus: MealStatus) => void;
  updateMealStatus: (key: number, status: MealStatusItem) => void;
  setLastTouchedKey: (key: number) => void;
  markAsSynced: () => void;
  clearMealPlan: () => void;
  hasUnsyncedChanges: () => boolean;
}

export const useMealPlanStore = create<MealPlanStore>()(
  persist(
    (set, get) => {
      const emptyMealStatus: MealStatus = {};
      return {
        mealStatus: emptyMealStatus,
        lastSyncedAt: null,
        lastTouchedKey: null,

        setMealStatus: (mealStatus) => set({ mealStatus }),

        updateMealStatus: (key, status) => {
          set((state) => {
            const prevStatus = state.mealStatus[key];
            const isSame = JSON.stringify(prevStatus) === JSON.stringify(status);
            return isSame
              ? { lastTouchedKey: key }
              : {
                  mealStatus: {
                    ...state.mealStatus,
                    [key]: status,
                  },
                  lastTouchedKey: key,
                };
          });
        },

        setLastTouchedKey: (key) => set({ lastTouchedKey: key }),

        markAsSynced: () => {
          set({ lastSyncedAt: Date.now(), lastTouchedKey: null });
        },

        clearMealPlan: () =>
          set({
            mealStatus: emptyMealStatus,
            lastSyncedAt: null,
            lastTouchedKey: null,
          }),

        hasUnsyncedChanges: () => {
          const state = get();
          return state.lastSyncedAt === null || state.lastTouchedKey !== null;
        },
      };
    },
    { name: "meal-plan-storage" }
  )
);
