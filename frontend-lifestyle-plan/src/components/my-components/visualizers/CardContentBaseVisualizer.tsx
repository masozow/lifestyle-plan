import { useApiGet } from "@/hooks";
import { useSessionStore } from "@/store";
import { CardContent } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { format } from "@formkit/tempo";
import { CustomSpinner } from "@/components";
import { useTranslation } from "react-i18next";
import type { LocaleCode } from "@/locales/localesTypes";
import { useEffect, useRef } from "react";

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

  const checkTranslation = (data: string, type: string) => {
    const key = `visualizers.${data}`;
    const hasTranslation = i18n.exists(key);

    if (type.toLowerCase().includes("date")) {
      return locale ? format(String(data), { date: "long" }, locale) : data;
    } else if (type === "key") {
      return hasTranslation
        ? t(key)
        : data.charAt(0).toUpperCase() + data.slice(1);
    } else {
      return hasTranslation
        ? t(key)
        : data.replace("-", " ").replace(/^\w/, (c) => c.toUpperCase());
    }
  };

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
                {checkTranslation(key, "key")}
              </p>
              <Badge
                variant="outline"
                className="col-span-3 text-sm md:text-md"
              >
                {/* TODO: check for this condition, make it work inside the checkTranslatio function */}
                {key.toLowerCase().includes("date")
                  ? format(String(value), { date: "long" }, locale)
                  : checkTranslation(String(value), "value")}
              </Badge>
            </div>
          ))}
    </CardContent>
  );
};
