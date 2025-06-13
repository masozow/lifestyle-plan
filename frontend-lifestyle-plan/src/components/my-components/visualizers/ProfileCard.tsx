import { API_ENDPOINTS } from "@/lib/backendURLS";
import { useSessionStore } from "@/store";
import { Card, CardHeader, CardTitle } from "../../ui/card";

import { CardContentBaseVisualizer } from "@/components";

type Profile = {
  id: number;
  unitSystem: string;
  weight: number;
  height: number;
  age: number;
  waist: number;
  neck: number;
  hip?: number | null;
  userId: number;
  createdAt: string;
  updatedAt: string;
};
interface Props {
  className?: string;
}
export const ProfileCard = ({ className }: Props) => {
  const { user } = useSessionStore();
  const userId = user?.id;

  return (
    <Card className={className}>
      <CardHeader className="border-b">
        <CardTitle className="text-2xl">Profile</CardTitle>
      </CardHeader>
      <CardContentBaseVisualizer<Profile>
        url={`${API_ENDPOINTS.profile}/${userId}`}
      />
    </Card>
  );
};
