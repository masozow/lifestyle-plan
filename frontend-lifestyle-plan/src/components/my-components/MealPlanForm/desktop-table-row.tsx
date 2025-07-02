import { memo, useMemo } from "react";
import { Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { TableCell, TableRow } from "@/components/ui/table";
import { useMealPlanStore } from "@/store";
import { getEffectiveMeal } from "../helpers/meal-plan-form-helper-functions";

interface DesktopTableRowProps {
  mealId: number;
  units: {
    macro: { protein: string; carbs: string; fat: string; energy: string };
    portion: string;
  };
  onToggleComplete: () => void;
  onEdit: () => void;
}

export const DesktopTableRow = memo(
  ({ mealId, units, onToggleComplete, onEdit }: DesktopTableRowProps) => {
    const item = useMealPlanStore((state) => state.mealStatus[mealId]);
    const meal = useMemo(() => getEffectiveMeal(item), [item]);

    if (!meal) return null;

    const isCompleted = item.consumed;

    return (
      <TableRow
        className={isCompleted ? "" : "bg-emerald-50 dark:bg-emerald-950/20"}
      >
        <TableCell>
          <Checkbox checked={isCompleted} onCheckedChange={onToggleComplete} />
        </TableCell>
        <TableCell className="font-medium text-left">{meal.meal}</TableCell>
        <TableCell className="text-left">{meal.food}</TableCell>
        <TableCell className="text-right">
          {meal.portion}
          {units.portion}
        </TableCell>
        <TableCell className="text-right">
          {meal.macro.energy} {units.macro.energy}
        </TableCell>
        <TableCell className="text-right">
          {meal.macro.protein} {units.macro.protein}
        </TableCell>
        <TableCell className="text-right">
          {meal.macro.carbs} {units.macro.carbs}
        </TableCell>
        <TableCell className="text-right">
          {meal.macro.fat} {units.macro.fat}
        </TableCell>
        <TableCell>
          <Button variant="ghost" size="sm" onClick={onEdit}>
            <Pencil className="h-4 w-4" />
          </Button>
        </TableCell>
      </TableRow>
    );
  },
  (prevProps, nextProps) => {
    // If the mealId changed, definitely re-render
    if (prevProps.mealId !== nextProps.mealId) return false;

    // If the handlers or units changed, re-render
    if (
      prevProps.onToggleComplete !== nextProps.onToggleComplete ||
      prevProps.onEdit !== nextProps.onEdit ||
      prevProps.units !== nextProps.units
    ) {
      return false;
    }

    // Otherwise, rely on Zustand's selector for fine-grained updates.
    // If the selected item didn't change, the hook won't trigger a re-render,
    // so this memo comparison won't even run.

    return true;
  }
);
