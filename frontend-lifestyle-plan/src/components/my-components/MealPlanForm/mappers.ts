export const mealTextMapper = (text: string,t:(param:string)=>string) =>
((
    {
        breakfast: t("mealPlanForm.mealTable.row.breakfast"),
        desayuno: t("mealPlanForm.mealTable.row.breakfast"),
        lunch: t("mealPlanForm.mealTable.row.lunch"),
        almuerzo: t("mealPlanForm.mealTable.row.lunch"),
        dinner: t("mealPlanForm.mealTable.row.dinner"),
        cena: t("mealPlanForm.mealTable.row.dinner"),
        "mid-morning snack": t("mealPlanForm.mealTable.row.snack1"),
        merienda: t("mealPlanForm.mealTable.row.snack1"),
        "mid-afternoon snack": t("mealPlanForm.mealTable.row.snack2"),
        "merienda nocturna": t("mealPlanForm.mealTable.row.snack2"),
    } as const
)[text.toLowerCase().trim()] || text);