import { Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import type { Meal, ReplacementMeal } from "@/types/openAIPlan";

interface MobileMealCardProps {
  meal: Meal | ReplacementMeal;
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

export const MobileMealCard = ({
  meal,
  isCompleted,
  units,
  onToggleComplete,
  onEdit,
}: MobileMealCardProps) => {
  return (
    <Card
      className={
        isCompleted ? "text-left" : "bg-red-50 dark:bg-red-950/20 text-left"
      }
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-2xl">{meal.meal}</CardTitle>
            <CardDescription className="font-semibold text-foreground mt-1 text-base">
              {meal.food}
            </CardDescription>
            <div className="mt-2 space-y-1">
              <Badge className="text-md" variant="outline">
                <span className="font-medium">Portion - </span>
                {meal.portion} {units.portion}
              </Badge>
              <Badge className="text-md" variant="outline">
                <span className="font-medium">Calories - </span>{" "}
                {meal.macro.energy} {units.macro.energy}
              </Badge>
            </div>
          </div>
          <div className="flex flex-col items-center gap-2 justify-end">
            <Checkbox
              checked={isCompleted}
              onCheckedChange={onToggleComplete}
            />
            <Button
              variant="ghost"
              size="sm"
              className="cursor-pointer"
              onClick={onEdit}
            >
              <Pencil className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div>
          <p className="text-xl font-semibold mb-2">Macros</p>
          <div className="space-y-1 flex flex-col">
            <Badge variant="secondary" className="text-md">
              Protein: {meal.macro.protein} {units.macro.protein}
            </Badge>
            <Badge variant="secondary" className="text-md">
              Carbs: {meal.macro.carbs} {units.macro.carbs}
            </Badge>
            <Badge variant="secondary" className="text-md">
              Fats: {meal.macro.fat} {units.macro.fat}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
