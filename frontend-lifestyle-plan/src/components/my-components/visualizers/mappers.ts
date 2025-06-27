import type { PlannerFormValues, ProfileFormValues } from "@/schemas";
import type { Profile } from "./ProfileCard";
import type { Plan } from "./ObjectivesCard";

export function mapProfileToFormValues(profile: Profile): ProfileFormValues {
  return {
    unitSystem: profile.unitSystem,
    weight: profile.weight,
    height: profile.height,
    age: profile.age,
    waist: profile.waist,
    neck: profile.neck,
    // convert null -> undefined
    hip: profile.hip ?? undefined,
  };
}

export function mapPlanToFormValues(plan: Plan): PlannerFormValues {
  return {
    objective: plan.objective,
    restriction: plan.restriction ?? "", 
    preference: plan.preference ?? "",
    extras: plan.extras ?? "",
  };
}

