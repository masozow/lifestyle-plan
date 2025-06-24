import { useEffect, useRef, useState } from "react";
import { useApiGet, useApiRequest } from "@/hooks";
import { useMealPlanStore } from "@/store";
import type {
  ConsumedUpdate,
  Meal,
  MealStatus,
  MealStatusItem,
  OpenAIResponseFromServer,
  ReplacementMeal,
} from "@/types/openAIPlan";
import { saveReplacementMeal } from "@/components/my-components/helpers/meal-plan-form-helper-functions";

interface MealPlanSyncConfig {
  consumedUrl: string;
  intakeUrl: string;
  getUrl: string;
}

export const useMealPlanSync = (
  userId: number | undefined,
  { consumedUrl, intakeUrl, getUrl }: MealPlanSyncConfig
) => {
  const {
    mealStatus,
    lastTouchedKey,
    hasUnsyncedChanges,
    markAsSynced,
    updateMealStatus,
    setLastTouchedKey,
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

  const planQuery = useApiGet<{ success: boolean; data: OpenAIResponseFromServer }>({
    url: userId ? getUrl : "",
    enabled: !!userId,
  });
  const [hasInitialSyncCompleted, setHasInitialSyncCompleted] = useState(false);
  useEffect(() => {
    if (planQuery.data?.data?.response?.weekly_plan) {
      console.log("Response from server: ", planQuery.data.data.response);
      const weekly = planQuery.data.data.response.weekly_plan;
      const newState: MealStatus = {};

      for (const day of weekly) {
        for (const meal of day.meals) {
          newState[meal.id] = {
            consumed: meal.intake?.consumed || meal.consumed,
            userDailyMealId: meal.id,
            userDailyIntakeId: meal.intake?.id,
            replacement: meal?.intake
              ? { ...meal?.intake, isIntake: true }
              : undefined,
            targetMeal: meal,
          } satisfies MealStatusItem;
        }
      }

      for (const [key, value] of Object.entries(newState)) {
        updateMealStatus(Number(key), value);
      }
      setHasInitialSyncCompleted(true);
    }
  }, [planQuery.data]);

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

  const createOrUpdateIntake = async (
    replacement: ReplacementMeal,
    editingMeal: Meal
  ) => {
    console.log("Data received from frontend in hook function: ", replacement);

    const payload = {
      ...replacement,
      userDailyMealId: editingMeal.id,
      day: editingMeal.day,
      meal: editingMeal.meal,
      date: editingMeal.date,
      consumed: true,
    } satisfies ReplacementMeal;

    console.log("Data to be sent to backend: ", payload);

    const response = await intakeMutation.mutateAsync(payload);
    console.log("Response from backend while upserting: ", response);

    if (response.isSuccess) {
      const newMealStatus = saveReplacementMeal(
        mealStatus,
        replacement,
        payload
      );
      updateMealStatus(editingMeal.id, newMealStatus[editingMeal.id]);
      setLastTouchedKey(editingMeal.id);
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

  return {
    syncToServer,
    hasUnsyncedChanges,
    createOrUpdateIntake,
    isLoading: planQuery.isLoading,
    isError: planQuery.isError,
    error: planQuery.error,
    data: planQuery.data?.data?.response,
    hasInitialSyncCompleted, 
  };
};
