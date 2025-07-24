import { Skeleton } from "@/components/ui/skeleton";

export const DashBoardHomeSkeleton = () => {
  return (
    <div className="grid lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-3 gap-4 px-4 mt-10">
      <Skeleton className="h-[400px] w-full rounded-xl col-span-full" />
      <div className="hidden sm:grid sm:grid-cols-3 sm:gap-4 col-span-full h-[20rem]">
        <Skeleton className="h-full rounded-xl" />
        <Skeleton className="h-full rounded-xl" />
        <Skeleton className="h-full rounded-xl" />
      </div>
    </div>
  );
};
