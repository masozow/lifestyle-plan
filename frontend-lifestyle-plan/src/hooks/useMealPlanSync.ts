import { useEffect, useRef } from "react";
import { useMealPlanStore } from "@/store";
import { useApiRequest } from "./useApiRequest";
import type { IntakeReplacementPayload } from "@/types/openAIPlan";


interface ConsumedUpdate {
  userDailyMealId: number;
  userDailyIntakeId?: number;
  consumed: boolean;
  origin: "intake" | "meal";
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

  const intakeMutation = useApiRequest<IntakeReplacementPayload>({
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
        const {
          consumedFood,
          consumedPortion,
          consumedProtein,
          consumedFat,
          consumedCarbs,
          consumedEnergy,
          day,
          date,
          meal,
        } = status.replacement;

        const res = await intakeMutation.mutateAsync({
          userDailyMealId,
          consumedFood,
          consumedPortion,
          consumedProtein,
          consumedFat,
          consumedCarbs,
          consumedEnergy,
          consumed,
          day,
          date,
          meal,
        });

        if (!res.isSuccess) {
          console.log("Intake mutation error:", res, "||", res?.error);
          return false;
        } else {
          console.log("Intake mutation result:", res);
        }
      } else {
        const res = await consumedMutation.mutateAsync({
          userDailyMealId,
          userDailyIntakeId,
          consumed,
          origin: userDailyIntakeId ? "intake" : "meal",
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

  useEffect(() => {
    const hasRealData = Object.keys(mealStatus).length > 0;
    if (hasRealData) {
      syncToServer();
      console.log("Syncing to server from hook...");
    }
  }, [mealStatus]);


  return { syncToServer, hasUnsyncedChanges };
};
