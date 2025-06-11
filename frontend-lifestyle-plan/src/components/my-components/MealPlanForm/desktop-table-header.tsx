import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function DesktopTableHeader() {
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="w-12">✓</TableHead>
        <TableHead>Meal</TableHead>
        <TableHead>Food</TableHead>
        <TableHead className="text-right">Portion</TableHead>
        <TableHead className="text-right">Calories</TableHead>
        <TableHead className="text-right">Protein</TableHead>
        <TableHead className="text-right">Carbs</TableHead>
        <TableHead className="text-right">Fats</TableHead>
        <TableHead className="w-12"></TableHead>
      </TableRow>
    </TableHeader>
  );
}
