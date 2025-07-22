import { API_ENDPOINTS } from "@/lib/backendURLS";
import { useSessionStore, useProfileStore } from "@/store";
import { Card, CardHeader, CardTitle } from "../../ui/card";
import { CardContentBaseVisualizer } from "./CardContentBaseVisualizer";
import { mapProfileToFormValues } from "./mappers";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

export type Profile = {
  unitSystem: string;
  weight: number;
  height: number;
  age: number;
  waist: number;
  neck: number;
  hip?: number | null;
};

interface Props {
  className?: string;
}

export const ProfileCard = ({ className }: Props) => {
  const { t } = useTranslation();
  const { user } = useSessionStore();
  const userId = user?.id;
  const { setProfile } = useProfileStore();
  const setProfileHandler = (data: Profile) => {
    const mappedProfile = mapProfileToFormValues(data);
    setProfile(mappedProfile);
  };
  const url = useMemo(
    () => (userId ? `${API_ENDPOINTS.profile}/${userId}` : ""),
    [userId]
  );
  return (
    <Card className={className}>
      <CardHeader className="border-b">
        <CardTitle className="text-2xl">
          {t("visualizers.titles.profile")}
        </CardTitle>
      </CardHeader>
      <CardContentBaseVisualizer<Profile>
        url={url}
        onDataLoaded={setProfileHandler}
      />
    </Card>
  );
};
