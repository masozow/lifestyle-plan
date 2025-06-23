import { useEffect, useRef } from "react";
import { useMealPlanStore } from "@/store";
import { useApiRequest } from "./useApiRequest";
import type { ConsumedUpdate, Macro, ReplacementMeal } from "@/types/openAIPlan";

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

    const { userDailyMealId, userDailyIntakeId, consumed } = status;

    const res = await consumedMutation.mutateAsync({
      userDailyMealId,
      userDailyIntakeId,
      consumed,
      origin: userDailyIntakeId ? "intake" : "meal",
    });

    if (!res.isSuccess) return false;

    markAsSynced();
    lastSyncRef.current = lastTouchedKey;
    return true;
  };

  const createOrUpdateIntake = async (data: ReplacementMeal) => {

    const payload = {
      userDailyMealId: data.userDailyMealId,
      id: data.id,
      food: data.food,
      portion: data.portion,
      consumed: data.consumed,
      day: data.day,
      date: data.date,
      meal: data.meal,
      macro:{...data.macro} as Macro
    };

    console.log("Data to be sent to backend: ", payload);

    const response = await intakeMutation.mutateAsync(payload);

    if (response.isSuccess) {
      const { updateMealStatus, mealStatus } = useMealPlanStore.getState();
      const currentStatus = mealStatus[data.userDailyMealId];

      updateMealStatus(data.userDailyMealId, {
        ...currentStatus,
        userDailyIntakeId: response.data,
        consumed: true,
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
