import { lazy } from "react";
// import { MealPlanForm } from "@/components/my-components/MealPlanForm/MealPlanForm";
import { motion } from "motion/react";
import { API_ENDPOINTS } from "@/lib/backendURLS";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
const MealPlanForm = lazy(
  () => import("@/components/my-components/MealPlanForm/MealPlanForm")
);
const HistoricDataMealPlanPage = () => {
  const paginationBaseURL = API_ENDPOINTS.historicData;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="w-full mx-auto pt-10 sm:pt-1  p-4 md:p-6 "
    >
      <MealPlanForm
        dateToFilter={new Date()}
        paginationURL={`${paginationBaseURL}?page=1&limit=10`}
      />
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious to="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink to="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink to="#" isActive>
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink to="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext to="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </motion.div>
  );
};

export default HistoricDataMealPlanPage;
