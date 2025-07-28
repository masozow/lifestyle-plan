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
      className={
        isCompleted ? "text-left" : "bg-emerald-50 dark:bg-emerald-950/20"
      }
    >
      <CardHeader className="pb-3">
        <div className="flex flex-col items-end gap-2 justify-end">
          <Checkbox checked={isCompleted} onCheckedChange={onToggleComplete} />
        </div>
        <div className="flex justify-between">
          <CardTitle className="text-3xl">
            {mealTextMapper(meal.meal, t)}
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            className="cursor-pointer text-right"
            onClick={onEdit}
          >
            <Pencil className="h-4 w-4 px-0 " />
          </Button>
        </div>
        <CardDescription className="font-semibold text-foreground mt-1 text-base text-x3">
          {meal.food}
        </CardDescription>
        <ul className="grid grid-cols-[auto_1fr_1fr] gap-x-3 items-center text-lg">
          <li className="contents">
            <IconChartPie />
            <h4 className="font-medium">
              {t("mealPlanForm.mealTable.header.portion")}:
            </h4>
            <p className="text-right">
              {meal.portion} {units.portion}
            </p>
          </li>
          <li className="contents">
            <IconBattery3 />
            <h4 className="font-medium">
              {t("mealPlanForm.mealTable.header.calories")}:
            </h4>
            <p className="text-right">
              {meal.macro.energy} {units.macro.energy}
            </p>
          </li>
        </ul>
      </CardHeader>
      <CardContent className="pt-0">
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
