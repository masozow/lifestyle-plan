import { useEffect, useState } from "react";
import { Utensils, Calculator, Wifi, WifiOff, Save } from "lucide-react";
import type {
  DayPlan,
  Meal,
  OpenAIResponseFromServer,
  Units,
} from "@/types/openAIPlan";
import { useApiGet } from "@/hooks";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EditMealDialog } from "./edit-meal-dialog";
import { DesktopMealTable } from "./desktop-meal-table";
import { MobileMealList } from "./mobile-meal-list";
import {
  toggleMealStatus as toggleMealStatusHelper,
  saveReplacementMeal as saveReplacementMealHelper,
  calculateDayTotals,
  getMealStatuses,
  createEditingMeal,
  calculateMacroPercentages,
} from "../helpers/meal-plan-form-helper-functions";
import { useMealPlanStore, useSessionStore } from "@/store";
import { useMealPlanSync } from "@/hooks";
import { API_ENDPOINTS } from "@/lib/backendURLS";
import { CustomSpinner } from "@/components";

interface ReplacementMeal {
  title: string;
  portion: number;
  calories: number;
  carbs: number;
  fat: number;
  protein: number;
}

export const MealPlanForm = () => {
  const { user } = useSessionStore();
  const userId = user?.id;
  const apiEndPoint = `${API_ENDPOINTS.userMealPlan}/${userId}`;
  console.log("API endpoint:", apiEndPoint);
  //for submitting info to server, other endpoint is needed
  const { mealStatus, setMealStatus } = useMealPlanStore();
  const [isSyncing, setIsSyncing] = useState(false);
  const [editingMeal, setEditingMeal] = useState<{
    day: string;
    mealIndex: number;
    meal: Meal;
  } | null>(null);

  useEffect(() => {
    if (!userId) {
      console.warn("⚠️ No userId detected — query is not triggered.");
    }
  }, [userId]);

  const { data, isLoading, isError, error } = useApiGet<{
    success: boolean;
    data: OpenAIResponseFromServer;
  }>({
    url: apiEndPoint,
    enabled: !!userId,
  });
  console.log("Data from server:", data);
  const responseData = data?.data?.response;
  console.log("Response data:", responseData);
  const { syncToServer, hasUnsyncedChanges } = useMealPlanSync(
    userId && responseData ? userId : undefined,
    responseData ? `${API_ENDPOINTS.userMealProgress}/${userId}` : ""
  );

  if (isLoading) return <CustomSpinner />;

  if (
    isError ||
    !responseData ||
    !responseData.macro_ratios ||
    !responseData.weekly_plan
  ) {
    return (
      <div className="text-red-500">
        Error: {error?.message || "Invalid response structure"}
      </div>
    );
  }

  const { daily_calorie_target, macro_ratios, units, weekly_plan } =
    responseData;

  const handleToggleMealStatus = (day: string, mealIndex: number) => {
    const newMealStatus = toggleMealStatusHelper(mealStatus, day, mealIndex);
    setMealStatus(newMealStatus);
  };

  const handleOpenEditDialog = (day: string, mealIndex: number, meal: Meal) => {
    setEditingMeal(createEditingMeal(day, mealIndex, meal));
  };

  const handleCloseEditDialog = () => {
    setEditingMeal(null);
  };

  const handleSaveReplacementMeal = (data: ReplacementMeal) => {
    if (!editingMeal) return;
    const newMealStatus = saveReplacementMealHelper(
      mealStatus,
      editingMeal.day,
      editingMeal.mealIndex,
      data
    );
    setMealStatus(newMealStatus);
    handleCloseEditDialog();
  };

  const handleSyncToServer = async () => {
    setIsSyncing(true);
    await syncToServer();
    setIsSyncing(false);
  };

  const macroPercentages = calculateMacroPercentages(macro_ratios);

  return (
    <div className="container mx-auto p-4 md:p-6 space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Utensils className="h-6 w-6" />
              <CardTitle>Weekly Meal Plan</CardTitle>
            </div>
            <div className="flex items-center gap-2">
              {isSyncing ? (
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Wifi className="h-3 w-3 animate-pulse" />
                  Syncing...
                </Badge>
              ) : hasUnsyncedChanges() ? (
                <>
                  <Badge
                    variant="destructive"
                    className="flex items-center gap-1"
                  >
                    <WifiOff className="h-3 w-3" />
                    Unsaved changes
                  </Badge>
                  <Button size="sm" onClick={handleSyncToServer}>
                    <Save className="h-3 w-3 mr-1" />
                    Sync
                  </Button>
                </>
              ) : (
                <Badge variant="default" className="flex items-center gap-1">
                  <Wifi className="h-3 w-3" />
                  Synced
                </Badge>
              )}
            </div>
          </div>
          <CardDescription>
            Daily Target: {daily_calorie_target} {units?.macro.energy} |
            Protein: {macroPercentages.protein}% | Carbohydrates:{" "}
            {macroPercentages.carbs}% | Fats: {macroPercentages.fat}%
          </CardDescription>
        </CardHeader>
      </Card>

      {weekly_plan.map((day: DayPlan) => {
        const dayTotals = calculateDayTotals(day, mealStatus);
        const mealStatuses = getMealStatuses(day, mealStatus);

        return (
          <Card key={day.day} className="overflow-hidden">
            <CardHeader className="pb-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <CardTitle className="text-xl">{day.day}</CardTitle>
                <div className="flex flex-col md:flex-row md:items-center gap-4 text-sm">
                  <div className="flex flex-col items-center">
                    <span className="text-xs text-muted-foreground">
                      Target
                    </span>
                    <Badge
                      variant="outline"
                      className="flex items-center gap-1"
                    >
                      <Calculator className="h-3 w-3" />
                      {dayTotals.targetCalories} {units?.macro.energy}
                    </Badge>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-xs text-muted-foreground">
                      Actual
                    </span>
                    <Badge
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      <Calculator className="h-3 w-3" />
                      {dayTotals.totalCalories} {units?.macro.energy}
                    </Badge>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground">
                      Macros
                    </span>
                    <div className="flex gap-2">
                      <Badge variant="secondary">
                        P: {dayTotals.totalProtein}/{dayTotals.targetProtein}
                        {units?.macro.protein}
                      </Badge>
                      <Badge variant="secondary">
                        C: {dayTotals.totalCarbs}/{dayTotals.targetCarbs}
                        {units?.macro.carbs}
                      </Badge>
                      <Badge variant="secondary">
                        G: {dayTotals.totalFat}/{dayTotals.targetFat}
                        {units?.macro.fat}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <DesktopMealTable
                meals={day.meals}
                mealStatuses={mealStatuses}
                units={units as Units}
                onToggleComplete={(index) =>
                  handleToggleMealStatus(day.day, index)
                }
                onEdit={(index) =>
                  handleOpenEditDialog(day.day, index, day.meals[index])
                }
              />

              <MobileMealList
                meals={day.meals}
                mealStatuses={mealStatuses}
                units={units as Units}
                onToggleComplete={(index) =>
                  handleToggleMealStatus(day.day, index)
                }
                onEdit={(index) =>
                  handleOpenEditDialog(day.day, index, day.meals[index])
                }
              />
            </CardContent>
          </Card>
        );
      })}

      <EditMealDialog
        isOpen={!!editingMeal}
        onClose={handleCloseEditDialog}
        onSave={handleSaveReplacementMeal}
        meal={editingMeal?.meal || null}
        units={units as Units}
      />
    </div>
  );
};
