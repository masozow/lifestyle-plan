import { API_ENDPOINTS } from "@/lib/backendURLS";
import { useSessionStore, usePlanStore } from "@/store";
import { Card, CardHeader, CardTitle } from "../../ui/card";
import { CardContentBaseVisualizer } from "./CardContentBaseVisualizer";
import { mapPlanToFormValues } from "./mappers";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ErrorBoundary } from "react-error-boundary";
import ReloadOrRedirectWhenError from "../error-boundaries/ReloadOrRedirectWhenError";

export type Plan = {
  objective: string;
  restriction?: string;
  preference?: string;
  extras?: string;
};

interface Props {
  className?: string;
}

export const ObjectivesCard = ({ className }: Props) => {
  const { t } = useTranslation();
  const { user } = useSessionStore();
  const userId = user?.id;
  const { setPlan } = usePlanStore();
  const setPlanHandler = (data: Plan) => {
    const mappedPlan = mapPlanToFormValues(data);
    setPlan(mappedPlan);
  };
  const url = useMemo(
    () => (userId ? `${API_ENDPOINTS.plan}/${userId}` : ""),
    [userId]
  );

  return (
    <Card className={className}>
      <CardHeader className="border-b">
        <CardTitle className="text-2xl">
          {t("visualizers.titles.objectives")}
        </CardTitle>
      </CardHeader>
      <ErrorBoundary
        fallbackRender={({ error }) => (
          <ReloadOrRedirectWhenError
            url="/app/planner"
            translationKey="objectivesVisualizer"
            message={error.message}
          />
        )}
      >
        <CardContentBaseVisualizer<Plan>
          url={url}
          onDataLoaded={setPlanHandler}
        />
      </ErrorBoundary>
    </Card>
  );
};
