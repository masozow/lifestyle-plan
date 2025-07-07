import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useTranslation } from "react-i18next";

export const DesktopTableHeader = () => {
  const { t } = useTranslation();
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="w-12">✓</TableHead>
        <TableHead>{t("mealPlanForm.mealTable.header.meal")}</TableHead>
        <TableHead>{t("mealPlanForm.mealTable.header.food")}</TableHead>
        <TableHead className="text-right">
          {t("mealPlanForm.mealTable.header.portion")}
        </TableHead>
        <TableHead className="text-right">
          {t("mealPlanForm.mealTable.header.calories")}
        </TableHead>
        <TableHead className="text-right">
          {t("mealPlanForm.mealTable.header.protein")}
        </TableHead>
        <TableHead className="text-right">
          {t("mealPlanForm.mealTable.header.carbs")}
        </TableHead>
        <TableHead className="text-right">
          {t("mealPlanForm.mealTable.header.fats")}
        </TableHead>
        <TableHead className="w-12"></TableHead>
      </TableRow>
    </TableHeader>
  );
};
