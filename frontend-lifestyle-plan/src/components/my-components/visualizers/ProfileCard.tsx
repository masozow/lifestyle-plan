import { API_ENDPOINTS } from "@/lib/backendURLS";
import { useSessionStore, useProfileStore } from "@/store";
import { Card, CardHeader, CardTitle } from "../../ui/card";
import { CardContentBaseVisualizer } from "./CardContentBaseVisualizer";
import { mapProfileToFormValues } from "./mappers";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ErrorBoundary } from "react-error-boundary";
import ReloadOrRedirectWhenError from "../error-boundaries/ReloadOrRedirectWhenError";

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
      <ErrorBoundary
        fallbackRender={({ error }) => (
          <ReloadOrRedirectWhenError
            url="/app/profile"
            translationKey="objectivesVisualizer"
            message={error.message}
          />
        )}
      >
        <CardContentBaseVisualizer<Profile>
          url={url}
          onDataLoaded={setProfileHandler}
        />
      </ErrorBoundary>
    </Card>
  );
};
