import { useState } from "react";
import { Utensils, Calculator, Wifi, WifiOff, Save } from "lucide-react";
import type { Meal, ReplacementMeal, Units } from "@/types/openAIPlan";
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
  calculateDayTotals,
  calculateMacroPercentages,
  groupMealsByDay,
} from "../helpers/meal-plan-form-helper-functions";
import { useMealPlanStore, useSessionStore } from "@/store";
import { useMealPlanSync } from "@/hooks";
import { API_ENDPOINTS } from "@/lib/backendURLS";
import { MealPlanFormSkeleton } from "@/components";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
interface MealPlanFormProps {
  limitDays?: number;
  dateToFilter?: Date;
  showHeader?: boolean;
}
export const MealPlanForm = ({
  limitDays,
  dateToFilter,
  showHeader = true,
}: MealPlanFormProps = {}) => {
  const { user } = useSessionStore();
  const { t } = useTranslation();
  // console.log("user", user);
  const userId = user?.id;
  const apiEndPointGET = `${API_ENDPOINTS.userMealPlan}/${userId}`;
  const mealStatus = useMealPlanStore((state) => state.mealStatus);
  // console.log("mealStatus", mealStatus);
  const updateMealStatus = useMealPlanStore((state) => state.updateMealStatus);
  const setLastTouchedKey = useMealPlanStore(
    (state) => state.setLastTouchedKey
  );
  const [isSyncing, setIsSyncing] = useState(false);
  const [editingMeal, setEditingMeal] = useState<Meal | null>(null);
  const {
    syncToServer,
    hasUnsyncedChanges,
    hasInitialSyncCompleted,
    createOrUpdateIntake,
    isLoading,
    isError,
    error,
    data,
  } = useMealPlanSync(userId, {
    consumedUrl: API_ENDPOINTS.userDailyConsumed,
    intakeUrl: API_ENDPOINTS.userDailyIntake,
    getUrl: apiEndPointGET,
  });

  if (isLoading) return <MealPlanFormSkeleton showHeader />;
  if (isError || !data || !data.macro_ratios || !data.weekly_plan) {
    return (
      <div className="text-red-500">
        Error: {error?.message || "Invalid response structure"}
      </div>
    );
  }
  if (Object.keys(mealStatus).length === 0) {
    return <MealPlanFormSkeleton />;
  }
  const { daily_calorie_target, macro_ratios, units } = data;

  const handleToggleMealStatus = (meal: Meal, completed: boolean) => {
    const updatedStatus = toggleMealStatusHelper(mealStatus, meal, completed);
    updateMealStatus(meal.id, updatedStatus[meal.id]);
    setLastTouchedKey(meal.id);
  };

  const handleOpenEditDialog = (meal: Meal) => {
    setEditingMeal(meal);
  };

  const handleCloseEditDialog = () => {
    setEditingMeal(null);
  };

  const handleSaveReplacementMeal = async (data: ReplacementMeal) => {
    // console.log("Saving replacement meal:", data);
    if (!editingMeal) return;

    try {
      const result = await createOrUpdateIntake(data, editingMeal);
      if (result.success) {
        toast.success(`Replacement meal saved! - ${result.message}`);
      } else {
        toast.error(`Error saving replacement meal. - ${result.message}`);
      }
    } catch (err) {
      toast.error("Unexpected error saving replacement meal.");
      console.error("createOrUpdateIntake failed", err);
    }

    handleCloseEditDialog();
  };

  const handleSyncToServer = async () => {
    setIsSyncing(true);
    await syncToServer();
    setIsSyncing(false);
  };

  const macroPercentages = calculateMacroPercentages(macro_ratios);

  const targetsByDay = Object.fromEntries(
    data.weekly_plan.map((day) => [day.day, day.day_macro_targets])
  );

  return (
    <div className="container mx-auto space-y-6">
      {showHeader && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Utensils className="h-6 w-6" />
                <CardTitle>{t("mealPlanForm.header.title")}</CardTitle>
              </div>
              <div className="flex items-center gap-2">
                {isSyncing ? (
                  <Badge
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    <Wifi className="h-3 w-3 animate-pulse" />
                    {t("mealPlanForm.header.buttonSyncing")}
                  </Badge>
                ) : hasInitialSyncCompleted && hasUnsyncedChanges() ? (
                  <>
                    <Badge
                      variant="destructive"
                      className="flex items-center gap-1"
                    >
                      <WifiOff className="h-3 w-3" />
                      {t("mealPlanForm.header.buttonUnsaved")}
                    </Badge>
                    <Button size="sm" onClick={handleSyncToServer}>
                      <Save className="h-3 w-3 mr-1" />
                      {t("mealPlanForm.header.buttonSync")}
                    </Button>
                  </>
                ) : (
                  <Badge variant="default" className="flex items-center gap-1">
                    <Wifi className="h-3 w-3" />
                    {t("mealPlanForm.header.buttonSynced")}
                  </Badge>
                )}
              </div>
            </div>
            <CardDescription>
              {t("mealPlanForm.description.dailyTarget")}:{" "}
              {daily_calorie_target} {units?.macro.energy} |
              {t("mealPlanForm.description.protein")}:{" "}
              {macroPercentages.protein}% |{" "}
              {t("mealPlanForm.description.carbs")}: {macroPercentages.carbs}% |
              {t("mealPlanForm.description.fat")}: {macroPercentages.fat}%
            </CardDescription>
          </CardHeader>
        </Card>
      )}

      {groupMealsByDay(mealStatus, {
        dateToFilter: dateToFilter,
        limitDays: limitDays,
      }).map((day) => {
        const backendTargets = targetsByDay[day.day];

        const dayTotals = calculateDayTotals(day.meals);

        return (
          <Card key={day.day} className="overflow-hidden">
            <CardHeader className="pb-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <CardTitle className="text-xl">{day.day}</CardTitle>
                <div className="flex flex-col md:flex-row md:items-center gap-4 text-sm">
                  <div className="flex flex-col items-center">
                    <span className="text-xs text-muted-foreground">
                      {t("mealPlanForm.macroCard.target")}
                    </span>
                    <Badge
                      variant="outline"
                      className="flex items-center gap-1"
                    >
                      <Calculator className="h-3 w-3" />
                      {backendTargets?.energy ?? 0} {units?.macro.energy}
                    </Badge>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-xs text-muted-foreground">
                      {t("mealPlanForm.macroCard.actual")}
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
                      {t("mealPlanForm.macroCard.macros")}
                    </span>
                    <div className="flex gap-2">
                      <Badge variant="secondary">
                        P: {dayTotals.totalProtein}/
                        {backendTargets?.protein ?? 0}
                        {units?.macro.protein}
                      </Badge>
                      <Badge variant="secondary">
                        C: {dayTotals.totalCarbs}/{backendTargets?.carbs ?? 0}
                        {units?.macro.carbs}
                      </Badge>
                      <Badge variant="secondary">
                        F: {dayTotals.totalFat}/{backendTargets?.fat ?? 0}
                        {units?.macro.fat}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <DesktopMealTable
                items={day.meals}
                units={units as Units}
                onToggleComplete={(index) =>
                  handleToggleMealStatus(
                    day.meals[index].targetMeal!,
                    !day.meals[index].consumed
                  )
                }
                onEdit={(index) =>
                  handleOpenEditDialog(day.meals[index].targetMeal!)
                }
              />

              <MobileMealList
                items={day.meals}
                units={units as Units}
                onToggleComplete={(index) =>
                  handleToggleMealStatus(
                    day.meals[index].targetMeal!,
                    !day.meals[index].consumed
                  )
                }
                onEdit={(index) =>
                  handleOpenEditDialog(day.meals[index].targetMeal!)
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
        meal={editingMeal}
        units={data.units as Units}
      />
    </div>
  );
};
