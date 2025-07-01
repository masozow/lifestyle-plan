import { Table, TableBody } from "@/components/ui/table";
import { DesktopTableHeader } from "./desktop-table-header";
import { DesktopTableRow } from "./desktop-table-row";
import type { MealStatusItem } from "@/types/openAIPlan";
import { getEffectiveMeal } from "../helpers/meal-plan-form-helper-functions";

interface DesktopMealTableProps {
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

export const DesktopMealTable = ({
  items,
  units,
  onToggleComplete,
  onEdit,
}: DesktopMealTableProps) => {
  return (
    <div className="hidden md:block">
      <Table>
        <DesktopTableHeader />
        <TableBody>
          {items.map((item, index) => {
            const meal = getEffectiveMeal(item);
            if (!meal) return null;

            // const isCompleted = item.consumed;
            // const hasReplacement = !!item.replacement;
            // const replacement = item.replacement;

            return (
              <DesktopTableRow
                mealId={item.userDailyMealId}
                key={item.userDailyMealId}
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
