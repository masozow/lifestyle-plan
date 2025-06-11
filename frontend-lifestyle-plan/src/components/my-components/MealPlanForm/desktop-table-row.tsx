import { Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { TableCell, TableRow } from "@/components/ui/table";

interface DesktopTableRowProps {
  meal: {
    meal: string;
    food: string;
    portion: number;
    macro: {
      protein: number;
      carbs: number;
      fat: number;
      energy: number;
    };
  };
  isCompleted: boolean;
  hasReplacement: boolean;
  replacement?: {
    title: string;
    portion: number;
    calories: number;
    carbs: number;
    fat: number;
    protein: number;
  };
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

export function DesktopTableRow({
  meal,
  isCompleted,
  hasReplacement,
  replacement,
  units,
  onToggleComplete,
  onEdit,
}: DesktopTableRowProps) {
  return (
    <TableRow className={isCompleted ? "" : "bg-red-50 dark:bg-red-950/20"}>
      <TableCell>
        <Checkbox checked={isCompleted} onCheckedChange={onToggleComplete} />
      </TableCell>
      <TableCell className="font-medium text-left">{meal.meal}</TableCell>
      <TableCell className="text-left">
        {isCompleted || !hasReplacement ? meal.food : replacement!.title}
      </TableCell>
      <TableCell className="text-right">
        {isCompleted || !hasReplacement ? meal.portion : replacement!.portion}
        {units.portion}
      </TableCell>
      <TableCell className="text-right">
        {isCompleted || !hasReplacement
          ? meal.macro.energy
          : replacement!.calories}{" "}
        {units.macro.energy}
      </TableCell>
      <TableCell className="text-right">
        {isCompleted || !hasReplacement
          ? meal.macro.protein
          : replacement!.protein}
        {units.macro.protein}
      </TableCell>
      <TableCell className="text-right">
        {isCompleted || !hasReplacement ? meal.macro.carbs : replacement!.carbs}
        {units.macro.carbs}
      </TableCell>
      <TableCell className="text-right">
        {isCompleted || !hasReplacement ? meal.macro.fat : replacement!.fat}
        {units.macro.fat}
      </TableCell>
      <TableCell>
        <Button variant="ghost" size="sm" onClick={onEdit}>
          <Pencil className="h-4 w-4" />
        </Button>
      </TableCell>
    </TableRow>
  );
}
