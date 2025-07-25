import { Skeleton } from "@/components/ui/skeleton";

const ProgressChartSkeleton = () => {
  return (
    <div className="grid lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-3 gap-4 px-4 mt-10">
      <Skeleton className="h-[400px] w-full rounded-xl col-span-full" />
    </div>
  );
};

export default ProgressChartSkeleton;
