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
    lastTouchedKey,
    mealStatus,
    updateMealStatus,
    setLastTouchedKey,
    hasUnsyncedChanges,
    markAsSynced,
    clearMealPlan,
    setMealStatus
  } = useMealPlanStore();

  const lastSyncedConsumedByKey = useRef<Record<number, boolean>>({});

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
      console.log("Response from server:", planQuery.data?.data?.response);      
      clearMealPlan();
      const weekly = planQuery.data.data.response.weekly_plan;
      const newState: MealStatus = {};

      weekly.forEach((day) => {
        day.meals.forEach((meal) => {
          const status: MealStatusItem = {
            consumed: meal.intake?.consumed ?? meal.consumed,
            userDailyMealId: meal.id,
            userDailyIntakeId: meal.intake?.id,
            replacement: meal.intake ? { ...meal.intake, isIntake: true } : undefined,
            targetMeal: meal,
          };
          newState[meal.id] = status;
        });
      });

      setMealStatus(newState);

      markAsSynced();
      setHasInitialSyncCompleted(true);
    }
  }, [planQuery.data]);

  const syncToServer = async () => {
    if (!userId || !hasUnsyncedChanges() || lastTouchedKey === null) return false;

    const status = mealStatus[lastTouchedKey];
    if (!status) return false;

    const { userDailyMealId,  consumed } = status;

    if (lastSyncedConsumedByKey.current[userDailyMealId] === consumed) {
      return false;
    }

    const res = await consumedMutation.mutateAsync({
      userDailyMealId,
      consumed,
    });

    if (!res.success) return false;

    lastSyncedConsumedByKey.current[userDailyMealId] = consumed;

    markAsSynced();
    return true;
  };

  const createOrUpdateIntake = async (
    replacement: ReplacementMeal,
    editingMeal: Meal
  ) => {
    const payload = {
      ...replacement,
      userDailyMealId: editingMeal.id,
      day: editingMeal.day,
      meal: editingMeal.meal,
      date: editingMeal.date,
      consumed: true,
    };

    const response = await intakeMutation.mutateAsync(payload);

    if (response.success) {
      const idFromBackend = Number(response.message.split(":")[1]?.trim());

      const replacementWithId: ReplacementMeal = {
        ...replacement,
        id: idFromBackend,
        isIntake: true,
      };

      const newMealStatus = saveReplacementMeal(
        mealStatus,
        editingMeal,
        replacementWithId
      );

      updateMealStatus(editingMeal.id, newMealStatus[editingMeal.id]);
      markAsSynced();
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
