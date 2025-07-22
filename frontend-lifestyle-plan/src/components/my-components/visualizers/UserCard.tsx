import { API_ENDPOINTS } from "@/lib/backendURLS";
import { useSessionStore } from "@/store";
import { Card, CardHeader, CardTitle } from "../../ui/card";

import { CardContentBaseVisualizer } from "@/components";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

type User = {
  id: number;
  email: string;
  name: number;
  password: string;
  phone: string;
  birthDate: Date;
  gender: "male" | "female";
  statusId: number;
  roleId: number;
  createdAt: string;
  updatedAt: string;
};

interface Props {
  className?: string;
}
export const UserCard = ({ className }: Props) => {
  const { t } = useTranslation();
  const { user } = useSessionStore();
  const userId = user?.id;
  const url = useMemo(
    () => (userId ? `${API_ENDPOINTS.user}/${userId}` : ""),
    [userId]
  );
  return (
    <Card className={className}>
      <CardHeader className="border-b">
        <CardTitle className="text-2xl">
          {t("visualizers.titles.userData")}
        </CardTitle>
      </CardHeader>
      <CardContentBaseVisualizer<User> url={url} />
    </Card>
  );
};
