import { useEffect, useRef } from "react";
import { useMealPlanStore } from "@/store";
import { useApiRequest } from "./useApiRequest";
import type { ReplacementMeal } from "@/types/openAIPlan";


interface ConsumedUpdate {
  userDailyMealId: number;
  consumed: boolean;
  isIntake: boolean;
}

interface MealPlanSyncConfig {
  intakeUrl: string;
  consumedUrl: string;
}

export const useMealPlanSync = (
  userId: number | undefined,
  { intakeUrl, consumedUrl }: MealPlanSyncConfig
) => {
  const mealStatus = useMealPlanStore((state) => state.mealStatus);
  const hasUnsyncedChanges = useMealPlanStore((state) => state.hasUnsyncedChanges);
  const markAsSynced = useMealPlanStore((state) => state.markAsSynced);
  const lastSyncRef = useRef<string>("");

  const consumedMutation = useApiRequest<ConsumedUpdate>({
    url: consumedUrl,
    method: "POST",
  });

  const intakeMutation = useApiRequest<ReplacementMeal>({
    url: intakeUrl,
    method: "POST",
  });

  const syncToServer = async () => {
    console.log("Starting sync to server...");
    if (!hasUnsyncedChanges() || !userId) return false;

    const currentStateString = JSON.stringify(mealStatus);
    if (currentStateString === lastSyncRef.current) return false;

    const updates = Object.values(mealStatus);
    console.log("Status updates:", updates);
    for (const status of updates) {
      const consumed = status.completed;
      const userDailyMealId = status.userDailyMealId;
      const userDailyIntakeId = status.replacement?.id;

      if (status.replacement) {
        const res = await intakeMutation.mutateAsync({
          ...status.replacement,
          id:userDailyIntakeId??0,
          consumed,
          isIntake: true,
        });

        if (!res.isSuccess){console.log("Intake mutation error:",  res, "||", res?.error); return false;}
        else
        {
          console.log("Intake mutation result:",  res);
        }
      } else {
        const res = await consumedMutation.mutateAsync({
          userDailyMealId,
          consumed,
          isIntake: false,
        });

        if (!res.isSuccess){ console.log("Consumed mutation error:",  res , "||", res?.error); return false;}
        else
        {
          console.log("Consumed mutation result:",  res);
        }
      }
    }

    markAsSynced();
    lastSyncRef.current = currentStateString;
    console.log("Sync to server completed.");
    return true;
  };

  // useEffect(() => {
  //   console.log("Meal status changed:", mealStatus);
  //   syncToServer();
  // }, [mealStatus]);

  return { syncToServer, hasUnsyncedChanges };
};
