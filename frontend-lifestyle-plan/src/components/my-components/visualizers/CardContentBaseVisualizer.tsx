import { useApiGet } from "@/hooks";
import { useSessionStore } from "@/store";
import { CardContent } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { CustomSpinner } from "@/components/my-components/loaders/CustomSpinner";
import { useTranslation } from "react-i18next";
import type { LocaleCode } from "@/locales/localesTypes";
import { useEffect, useRef } from "react";
import { checkTranslation } from "../helpers/checkTranslation";

interface Props<T> {
  url: string;
  onDataLoaded?: (data: T) => void;
}

export const CardContentBaseVisualizer = <T extends Record<string, unknown>>({
  url,
  onDataLoaded,
}: Props<T>) => {
  const { user } = useSessionStore();
  const userId = user?.id;
  const { i18n, t } = useTranslation();
  const locale = i18n.language as LocaleCode;

  const { data, isLoading, isError, error } = useApiGet<{
    success: boolean;
    data: T;
  }>({
    url,
    enabled: !!userId,
  });

  const prevDataRef = useRef<T | null>(null);
  useEffect(() => {
    const newData = data?.data;
    if (newData && onDataLoaded) {
      const isSame =
        JSON.stringify(prevDataRef.current) === JSON.stringify(newData);
      if (!isSame) {
        prevDataRef.current = newData;
        onDataLoaded(newData);
      }
    }
  }, [data, onDataLoaded]);

  if (!userId || !url) return null;
  if (isLoading) return <CustomSpinner />;
  if (isError) return <div>Error: {(error as Error).message}</div>;

  const receivedData = data?.data;
  if (!receivedData || !Object.keys(receivedData).length)
    throw new Error("No data received from server");
  return (
    <CardContent key={locale}>
      {receivedData &&
        Object.entries(receivedData)
          .filter(
            ([key, value]) =>
              ![
                "id",
                "userId",
                "createdAt",
                "updatedAt",
                "statusId",
                "roleId",
                "password",
              ].includes(key) &&
              value !== null &&
              value !== ""
          )
          .map(([key, value]) => (
            <div key={key} className="grid grid-cols-5">
              <p className="col-span-2 font-semibold">
                {checkTranslation(key, { t, i18n, locale })}
              </p>
              <Badge
                variant="outline"
                className="col-span-3 text-sm md:text-md"
              >
                {/* TODO: check for this condition, make it work inside the checkTranslatio function */}
                {checkTranslation(String(value), {
                  t,
                  i18n,
                  locale,
                  replaceCharacterWith: {
                    character: "-",
                    replaceWith: " ",
                  },
                })}
              </Badge>
            </div>
          ))}
    </CardContent>
  );
};
