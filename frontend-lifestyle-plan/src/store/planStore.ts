import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { PlannerFormValues } from "@/schemas";

interface PlanState {
  plan: PlannerFormValues | null;
  setPlan: (data: PlannerFormValues) => void;
  clearPlan: () => void;
}

export const usePlanStore = create<PlanState>()(
  persist(
    (set) => ({
      plan: null,
      setPlan: (data) => set({ plan: data }),
      clearPlan: () => set({ plan: null }),
    }),
    {
      name: "planner-storage", 
    }
  )
);