import type { MealStatusItem } from "@/types/openAIPlan";
import { MobileMealCard } from "./mobile-meal-card";
import { getEffectiveMeal } from "../helpers/meal-plan-form-helper-functions";

interface MobileMealListProps {
  items: MealStatusItem[];
  units: {
    macro: {
      protein: string;
      carbs: string;
      fat: string;
      energy: string;
    };
    portion: string;
  };
  onToggleComplete: (index: number) => void;
  onEdit: (index: number) => void;
}

export const MobileMealList = ({
  items,
  units,
  onToggleComplete,
  onEdit,
}: MobileMealListProps) => {
  return (
    <div className="md:hidden space-y-4">
      {items.map((item, index) => {
        const meal = getEffectiveMeal(item);
        if (!meal) return null;

        return (
          <MobileMealCard
            key={item.userDailyMealId}
            meal={meal}
            isCompleted={!!item.consumed}
            hasReplacement={!!item.replacement}
            replacement={item.replacement}
            units={units}
            onToggleComplete={() => onToggleComplete(index)}
            onEdit={() => onEdit(index)}
          />
        );
      })}
    </div>
  );
};
