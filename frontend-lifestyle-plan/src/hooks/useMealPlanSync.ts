import { useEffect, useRef } from "react";
import { useMealPlanStore } from "@/store";
import { useApiRequest } from "./useApiRequest";
import type { ConsumedUpdate, ReplacementMeal } from "@/types/openAIPlan";

interface MealPlanSyncConfig {
  consumedUrl: string;
  intakeUrl: string;
}

export const useMealPlanSync = (
  userId: number | undefined,
  { consumedUrl, intakeUrl }: MealPlanSyncConfig
) => {
  const {
    mealStatus,
    lastTouchedKey,
    hasUnsyncedChanges,
    markAsSynced,
  } = useMealPlanStore();

  const lastSyncRef = useRef<number | null>(null);

  const consumedMutation = useApiRequest<ConsumedUpdate>({
    url: consumedUrl,
    method: "POST",
  });

  const intakeMutation = useApiRequest<ReplacementMeal>({
    url: intakeUrl,
    method: "POST",
  });

  const syncToServer = async () => {
    if (!userId || !hasUnsyncedChanges() || lastTouchedKey === null) return false;
    if (lastTouchedKey === lastSyncRef.current) return false;

    const status = mealStatus[lastTouchedKey];
    if (!status) return false;

    const { userDailyMealId, userDailyIntakeId, completed } = status;

    const res = await consumedMutation.mutateAsync({
      userDailyMealId,
      userDailyIntakeId,
      consumed: completed,
      origin: userDailyIntakeId ? "intake" : "meal",
    });

    if (!res.isSuccess) return false;

    markAsSynced();
    lastSyncRef.current = lastTouchedKey;
    return true;
  };

  const createOrUpdateIntake = async (data: ReplacementMeal) => {
    const macroProperties = Object.entries(data.macro).map(([k, v]) => [
      `consumed${k.charAt(0).toUpperCase()}${k.slice(1)}`,
      v,
    ]);

    const response = await intakeMutation.mutateAsync({
      ...data,
      ...macroProperties,
    });

    if (response.isSuccess) {
      const { updateMealStatus, mealStatus } = useMealPlanStore.getState();
      const currentStatus = mealStatus[data.userDailyMealId];

      updateMealStatus(data.userDailyMealId, {
        ...currentStatus,
        userDailyIntakeId: response.data,
      });
    }

    return response;
  };


  useEffect(() => {
    if (!userId) return;
    const hasRealData = Object.keys(mealStatus).length > 0;
    if (hasRealData && lastTouchedKey !== null) {
      syncToServer();
    }
  }, [mealStatus, lastTouchedKey]);

  return { syncToServer, hasUnsyncedChanges, createOrUpdateIntake };
};