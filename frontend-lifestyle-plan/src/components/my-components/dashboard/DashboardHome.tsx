// import { ChartAreaInteractive } from "@/components/chart-area-interactive";
// import { DataTable } from "@/components/data-table";
// import data from "./data.json";
import { SectionCards } from "@/components/section-cards";
import { lazy, Suspense } from "react";
import { MealPlanFormSkeleton } from "../MealPlanForm/MealPlanFormSkeleton";

const MealPlanForm = lazy(() =>
  import("@/components/my-components/MealPlanForm/MealPlanForm").then((m) => ({
    default: m.MealPlanForm,
  }))
);
// import { lazy } from "react";
// const ChartAreaInteractive = lazy(
//   () => import("@/components/chart-area-interactive")
// );
const DashboardHome = () => {
  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <div className="px-4 lg:px-6">
        <Suspense fallback={<MealPlanFormSkeleton showHeader={false} />}>
          <MealPlanForm
            limitDays={1}
            dateToFilter={new Date()}
            showHeader={false}
          />
        </Suspense>
        {/* add this later */}
        {/* <ChartAreaInteractive /> */}
      </div>
      <div className="hidden sm:block">
        <SectionCards />
      </div>
      {/* <DataTable data={data} /> */}
    </div>
  );
};

export default DashboardHome;
