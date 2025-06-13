import { API_ENDPOINTS } from "@/lib/backendURLS";
import { useSessionStore } from "@/store";
import { Card, CardHeader, CardTitle } from "../../ui/card";
import { CardContentBaseVisualizer } from "./CardContentBaseVisualizer";

type Plan = {
  id: number;
  objective: string;
  restriction?: string;
  preference?: string;
  extras?: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
};

interface Props {
  className?: string;
}
export const ObjectivesCard = ({ className }: Props) => {
  const { user } = useSessionStore();
  const userId = user?.id;

  return (
    <Card className={className}>
      <CardHeader className="border-b">
        <CardTitle className="text-2xl">Objectives</CardTitle>
      </CardHeader>
      <CardContentBaseVisualizer<Plan>
        url={`${API_ENDPOINTS.plan}/${userId}`}
      />
    </Card>
  );
};
