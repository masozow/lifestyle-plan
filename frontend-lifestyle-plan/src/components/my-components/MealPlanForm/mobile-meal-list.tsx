import { MobileMealCard } from "./mobile-meal-card";

interface MobileMealListProps {
  meals: Array<{
    meal: string;
    food: string;
    portion: number;
    macro: {
      protein: number;
      carbs: number;
      fat: number;
      energy: number;
    };
  }>;
  mealStatuses: Array<{
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
  }>;
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

export function MobileMealList({
  meals,
  mealStatuses,
  units,
  onToggleComplete,
  onEdit,
}: MobileMealListProps) {
  return (
    <div className="md:hidden space-y-4">
      {meals.map((meal, index) => (
        <MobileMealCard
          key={index}
          meal={meal}
          isCompleted={mealStatuses[index].isCompleted}
          hasReplacement={mealStatuses[index].hasReplacement}
          replacement={mealStatuses[index].replacement}
          units={units}
          onToggleComplete={() => onToggleComplete(index)}
          onEdit={() => onEdit(index)}
        />
      ))}
    </div>
  );
}
