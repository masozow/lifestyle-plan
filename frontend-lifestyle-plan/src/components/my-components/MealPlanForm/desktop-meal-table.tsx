import { Table, TableBody } from "@/components/ui/table";
import { DesktopTableHeader } from "./desktop-table-header";
import { DesktopTableRow } from "./desktop-table-row";

interface DesktopMealTableProps {
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

export function DesktopMealTable({
  meals,
  mealStatuses,
  units,
  onToggleComplete,
  onEdit,
}: DesktopMealTableProps) {
  return (
    <div className="hidden md:block">
      <Table>
        <DesktopTableHeader />
        <TableBody>
          {meals.map((meal, index) => (
            <DesktopTableRow
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
        </TableBody>
      </Table>
    </div>
  );
}
