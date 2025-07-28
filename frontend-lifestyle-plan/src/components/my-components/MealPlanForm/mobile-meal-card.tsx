import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import type { Meal, ReplacementMeal } from "@/types/openAIPlan";
import { useTranslation } from "react-i18next";
import { mealTextMapper } from "./mappers";
import { Pencil } from "lucide-react";
import {
  IconBattery3,
  IconBread,
  IconChartPie,
  IconEggFried,
  IconMeat,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";

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
  const { t } = useTranslation();
  return (
    <Card
      onClick={onToggleComplete}
      className={cn(
        "text-left  hover:cursor-pointer py-1",
        !isCompleted && "bg-emerald-50 dark:bg-emerald-950/20"
      )}
    >
      <CardHeader className="pb-3">
        <div
          className={cn(
            "text-green-600 min-h-[2.6rem] text-center pb-1 ",
            isCompleted && "border-b border-green-600"
          )}
        >
          {isCompleted && <span className="text-3xl font-bold">✓</span>}
        </div>
        <Checkbox
          checked={isCompleted}
          onCheckedChange={onToggleComplete}
          className="sr-only"
          aria-label="Mark as completed"
        />

        <div className="flex justify-between items-center">
          <CardTitle
            className={cn("text-3xl", isCompleted && "text-green-600")}
          >
            {mealTextMapper(meal.meal, t)}
          </CardTitle>
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-foreground"
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
          >
            <Pencil className="h-4 w-4" />
          </Button>
        </div>

        <CardDescription className="font-medium text-foreground my-4 text-base text-xl tracking-tight">
          {meal.food}
        </CardDescription>

        <ul className="grid grid-cols-[auto_1fr_1fr] gap-x-3 items-center text-lg">
          <li className="contents">
            <IconChartPie />
            <h4 className="font-light">
              {t("mealPlanForm.mealTable.header.portion")}:
            </h4>
            <p className="text-right">
              {meal.portion} {units.portion}
            </p>
          </li>
          <li className="contents">
            <IconBattery3 />
            <h4 className="font-light">
              {t("mealPlanForm.mealTable.header.calories")}:
            </h4>
            <p className="text-right">
              {meal.macro.energy} {units.macro.energy}
            </p>
          </li>
        </ul>
      </CardHeader>

      <CardContent className="pt-0 pb-4">
        <div>
          <p className="text-2xl font-semibold mb-2">
            {t("mealPlanForm.macroCard.macros")}
          </p>
          <ul className="grid grid-cols-[auto_1fr_1fr] gap-x-3 items-center text-lg">
            <li className="contents">
              <IconMeat />
              <h4>{t("mealPlanForm.mealTable.header.protein")}: </h4>
              <p className="text-right">
                {meal.macro.protein} {units.macro.protein}
              </p>
            </li>
            <li className="contents">
              <IconBread />
              <h4>{t("mealPlanForm.mealTable.header.carbs")}: </h4>
              <p className="text-right">
                {meal.macro.carbs} {units.macro.carbs}
              </p>
            </li>
            <li className="contents">
              <IconEggFried />
              <h4>{t("mealPlanForm.mealTable.header.fats")}: </h4>
              <p className="text-right">
                {meal.macro.fat} {units.macro.fat}
              </p>
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};
