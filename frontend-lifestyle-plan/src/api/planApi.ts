import type { PlannerFormValues } from "@/schemas";

export const savePlanToServer = async (plan: PlannerFormValues) => {
  const response = await fetch("/api/plan", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(plan),
  });

  if (!response.ok) throw new Error("Error al guardar el plan en el servidor");
  return response.json();
};