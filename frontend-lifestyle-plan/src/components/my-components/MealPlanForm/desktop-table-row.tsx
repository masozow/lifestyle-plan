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

export const DesktopTableRow = ({
  mealId,
  units,
  onToggleComplete,
  onEdit,
}: DesktopTableRowProps) => {
  const item = useMealPlanStore((state) => state.mealStatus[mealId]);
  const meal = getEffectiveMeal(item);
  if (!meal) return null;

  const isCompleted = item.consumed;

  return (
    <TableRow className={isCompleted ? "" : "bg-red-50 dark:bg-red-950/20"}>
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
};
