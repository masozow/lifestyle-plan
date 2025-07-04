import { ProgressChart } from "@/components";
import { useApiGet } from "@/hooks";
import { API_ENDPOINTS } from "@/lib/backendURLS";
import { useSessionStore } from "@/store";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { type ProgressChartProps } from "@/components";
export const ProgressChartPage = () => {
  const { user } = useSessionStore();
  const [transformedData, setTransformedData] = useState<
    ProgressChartProps["data"]
  >([]);
  const { data, isLoading, isError, error } = useApiGet<{
    success: boolean;
    data: Record<
      string,
      {
        target: number;
        consumed: number;
        protein: number;
        carbs: number;
        fat: number;
      }
    >;
  }>({
    url: `${API_ENDPOINTS.progressChart}`,
    enabled: !!user?.id,
  });
  useEffect(() => {
    if (!data) return;
    const obtainedData = Object.entries(data?.data ?? {}).map(
      ([date, values]) => ({
        date,
        energyTarget: values.target,
        energyConsumed: values.consumed,
        proteinTarget: values.protein,
        proteinConsumed: values.protein,
        carbsTarget: values.carbs,
        carbsConsumed: values.carbs,
        fatTarget: values.fat,
        fatConsumed: values.fat,
      })
    );

    setTransformedData(obtainedData);
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="w-full mx-auto pt-10 sm:pt-1  p-4 md:p-6 "
    >
      <ProgressChart data={transformedData} />
    </motion.div>
  );
};
