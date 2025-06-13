import { create } from "zustand"
import { persist } from "zustand/middleware"

interface ReplacementMeal {
  title: string
  portion: number
  calories: number
  carbs: number
  fat: number
  protein: number
}

interface MealStatus {
  [key: string]: {
    completed: boolean
    replacement?: ReplacementMeal
  }
}

interface MealPlanStore {
  mealStatus: MealStatus
  lastSyncedAt: number | null

  // Actions
  setMealStatus: (mealStatus: MealStatus) => void
  updateMealStatus: (key: string, status: { completed: boolean; replacement?: ReplacementMeal }) => void
  markAsSynced: () => void
  clearMealPlan: () => void

  // Computed
  hasUnsyncedChanges: () => boolean
}

export const useMealPlanStore = create<MealPlanStore>()(
  persist(
    (set, get) => ({
      // Initial state
      mealStatus: {},
      lastSyncedAt: null,

      // Actions
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

      // Computed
      hasUnsyncedChanges: () => {
        const state = get()
        return state.lastSyncedAt === null || Object.keys(state.mealStatus).length > 0
      },
    }),
    {
      name: "meal-plan-storage",
    },
  ),
)
