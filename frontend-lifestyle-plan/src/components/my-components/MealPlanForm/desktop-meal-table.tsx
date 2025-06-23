import { Table, TableBody } from "@/components/ui/table";
import { DesktopTableHeader } from "./desktop-table-header";
import { DesktopTableRow } from "./desktop-table-row";
import type { Meal, MealStatus } from "@/types/openAIPlan";

interface DesktopMealTableProps {
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

export const DesktopMealTable = ({
  meals,
  mealStatuses,
  units,
  onToggleComplete,
  onEdit,
}: DesktopMealTableProps) => {
  return (
    <div className="hidden md:block">
      <Table>
        <DesktopTableHeader />
        <TableBody>
          {meals.map((meal, index) => {
            const status = mealStatuses[meal.id] || {};

            return (
              <DesktopTableRow
                key={meal.id}
                meal={meal}
                isCompleted={!!status.consumed}
                hasReplacement={!!status.replacement}
                replacement={status.replacement}
                units={units}
                onToggleComplete={() => onToggleComplete(index)}
                onEdit={() => onEdit(index)}
              />
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
