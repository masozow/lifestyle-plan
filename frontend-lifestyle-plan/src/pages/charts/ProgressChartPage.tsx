import { ProgressChart } from "@/components";
import { useApiGet } from "@/hooks";
import { API_ENDPOINTS } from "@/lib/backendURLS";
import { useSessionStore } from "@/store";
import { motion } from "motion/react";
import type { JSX } from "react";

interface MacroRow {
  Date: string;
  Target: number;
  Consumed: number;
}

export const ProgressChartPage = (): JSX.Element => {
  const { user } = useSessionStore();

  const { data, isLoading, isError, error } = useApiGet<{
    success: boolean;
    data: {
      energy: MacroRow[];
      protein: MacroRow[];
      carbs: MacroRow[];
      fat: MacroRow[];
    };
  }>({
    url: `${API_ENDPOINTS.progressChart}`,
    enabled: !!user?.id,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error?.message}</div>;
  if (!data) return <div>No data</div>;
  console.log("data:", data);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="w-full mx-auto pt-10 sm:pt-1 p-4 md:p-6"
    >
      <ProgressChart data={data.data} />
    </motion.div>
  );
};
