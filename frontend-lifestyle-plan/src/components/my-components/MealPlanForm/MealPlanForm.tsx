import { useState } from "react";
import { Utensils, Calculator, Wifi, WifiOff, Save } from "lucide-react";

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
import mockupData from "./mockupData.json";
import { API_ENDPOINTS } from "@/lib/backendURLS";

const mealPlanData = mockupData;

interface ReplacementMeal {
  title: string;
  portion: number;
  calories: number;
  carbs: number;
  fat: number;
  protein: number;
}

interface Macro {
  protein: number;
  carbs: number;
  fat: number;
  energy: number;
}

interface Meal {
  meal: string;
  food: string;
  portion: number;
  macro: Macro;
}

export const MealPlanForm = () => {
  const { user } = useSessionStore();
  //change this for the actual endpoint
  const apiEndPoint = API_ENDPOINTS.plan;
  const { mealStatus, setMealStatus } = useMealPlanStore();
  const { syncToServer, hasUnsyncedChanges } = useMealPlanSync(
    user?.id,
    apiEndPoint
  );
  const [isSyncing, setIsSyncing] = useState(false);

  const [editingMeal, setEditingMeal] = useState<{
    day: string;
    mealIndex: number;
    meal: Meal;
  } | null>(null);

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

  const macroPercentages = calculateMacroPercentages(mealPlanData.macro_ratios);

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
              ) : hasUnsyncedChanges ? (
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
            Daily Target: {mealPlanData.daily_calorie_target}{" "}
            {mealPlanData.units.macro.energy} | Protein:{" "}
            {macroPercentages.protein}% | Carbohydrates:{" "}
            {macroPercentages.carbs}% | Fats: {macroPercentages.fat}%
          </CardDescription>
        </CardHeader>
      </Card>

      {mealPlanData.weekly_plan.map((day) => {
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
                      {dayTotals.targetCalories}{" "}
                      {mealPlanData.units.macro.energy}
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
                      {dayTotals.totalCalories}{" "}
                      {mealPlanData.units.macro.energy}
                    </Badge>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground">
                      Macros
                    </span>
                    <div className="flex gap-2">
                      <Badge variant="secondary">
                        P: {dayTotals.totalProtein}/{dayTotals.targetProtein}
                        {mealPlanData.units.macro.protein}
                      </Badge>
                      <Badge variant="secondary">
                        C: {dayTotals.totalCarbs}/{dayTotals.targetCarbs}
                        {mealPlanData.units.macro.carbs}
                      </Badge>
                      <Badge variant="secondary">
                        G: {dayTotals.totalFat}/{dayTotals.targetFat}
                        {mealPlanData.units.macro.fat}
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
                units={mealPlanData.units}
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
                units={mealPlanData.units}
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
        units={mealPlanData.units}
      />
    </div>
  );
};
