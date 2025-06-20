import { Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { TableCell, TableRow } from "@/components/ui/table";
import type { Meal, ReplacementMeal } from "@/types/openAIPlan";

interface DesktopTableRowProps {
  meal: Meal;
  isCompleted: boolean;
  hasReplacement: boolean;
  replacement?: ReplacementMeal;
  units: {
    macro: {
      protein: string;
      carbs: string;
      fat: string;
      energy: string;
    };
    portion: string;
  };
  onToggleComplete: () => void;
  onEdit: () => void;
}

export const DesktopTableRow = ({
  meal,
  isCompleted,
  hasReplacement,
  replacement,
  units,
  onToggleComplete,
  onEdit,
}: DesktopTableRowProps) => {
  return (
    <TableRow className={isCompleted ? "" : "bg-red-50 dark:bg-red-950/20"}>
      <TableCell>
        <Checkbox checked={isCompleted} onCheckedChange={onToggleComplete} />
      </TableCell>
      <TableCell className="font-medium text-left">{meal.meal}</TableCell>
      <TableCell className="text-left">
        {isCompleted || !hasReplacement
          ? meal.targetFood
          : replacement!.consumedFood}
      </TableCell>
      <TableCell className="text-right">
        {isCompleted || !hasReplacement
          ? meal.targetPortion
          : replacement!.consumedPortion}
        {units.portion}
      </TableCell>
      <TableCell className="text-right">
        {isCompleted || !hasReplacement
          ? meal.macro.energy
          : replacement!.consumedEnergy}{" "}
        {units.macro.energy}
      </TableCell>
      <TableCell className="text-right">
        {isCompleted || !hasReplacement
          ? meal.macro.protein
          : replacement!.consumedProtein}
        {units.macro.protein}
      </TableCell>
      <TableCell className="text-right">
        {isCompleted || !hasReplacement
          ? meal.macro.carbs
          : replacement!.consumedCarbs}
        {units.macro.carbs}
      </TableCell>
      <TableCell className="text-right">
        {isCompleted || !hasReplacement
          ? meal.macro.fat
          : replacement!.consumedFat}
        {units.macro.fat}
      </TableCell>
      <TableCell>
        <Button variant="ghost" size="sm" onClick={onEdit}>
          <Pencil className="h-4 w-4" />
        </Button>
      </TableCell>
    </TableRow>
  );
};
