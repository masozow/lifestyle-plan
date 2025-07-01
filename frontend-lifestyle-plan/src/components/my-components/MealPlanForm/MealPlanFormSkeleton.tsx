import { Skeleton } from "@/components/ui/skeleton";

export const MealPlanFormSkeleton = () => {
  return (
    <div className="container mx-auto p-4 md:p-6 space-y-6 pt-10">
      <Skeleton className="h-[20vh] w-full rounded-xl" />
      <Skeleton className="h-[100vh] w-full rounded-xl" />
    </div>
  );
};
