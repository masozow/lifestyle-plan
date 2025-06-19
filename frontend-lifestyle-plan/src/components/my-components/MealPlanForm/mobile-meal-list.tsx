import type { Meal, MealStatus } from "@/types/openAIPlan";
import { MobileMealCard } from "./mobile-meal-card";

interface MobileMealListProps {
  meals: Meal[];
  mealStatuses: MealStatus;
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
  meals,
  mealStatuses,
  units,
  onToggleComplete,
  onEdit,
}: MobileMealListProps) => {
  return (
    <div className="md:hidden space-y-4">
      {meals.map((meal, index) => {
        const status = mealStatuses[meal.id] || {};

        return (
          <MobileMealCard
            key={meal.id}
            meal={meal}
            isCompleted={!!status.completed}
            hasReplacement={!!status.replacement}
            replacement={status.replacement}
            units={units}
            onToggleComplete={() => onToggleComplete(index)}
            onEdit={() => onEdit(index)}
          />
        );
      })}
    </div>
  );
};
