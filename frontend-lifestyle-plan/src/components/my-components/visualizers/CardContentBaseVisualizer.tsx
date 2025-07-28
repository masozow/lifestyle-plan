import { useApiGet } from "@/hooks";
import { useSessionStore } from "@/store";
import { CardContent } from "../../ui/card";
import { CustomSpinner } from "@/components/my-components/loaders/CustomSpinner";
import { useTranslation } from "react-i18next";
import type { LocaleCode } from "@/locales/localesTypes";
import { useEffect, useRef, type JSX } from "react";
import { checkTranslation } from "../helpers/checkTranslation";
import { IconAlignBoxBottomCenterFilled } from "@tabler/icons-react";
import { getUnit } from "../forms/ProfileForm/profileFormHelpers";

interface Props<T> {
  url: string;
  iconsArray?: Partial<Record<keyof T, JSX.Element>>;
  onDataLoaded?: (data: T) => void;
}

export const CardContentBaseVisualizer = <T extends Record<string, unknown>>({
  url,
  onDataLoaded,
  iconsArray,
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
            <ul key={key}>
              <li className="grid grid-cols-[auto_1fr] tracking-wider mb-2">
                <div className="mr-4">
                  {iconsArray?.[key] ?? <IconAlignBoxBottomCenterFilled />}
                </div>
                <div>
                  <h2 className="font-bold text-1xl">
                    {checkTranslation(key, { t, i18n, locale })}
                  </h2>
                  <p className="font-light">
                    {checkTranslation(String(value), {
                      t,
                      i18n,
                      locale,
                      replaceCharacterWith: {
                        character: "-",
                        replaceWith: " ",
                      },
                    })}
                    {"unitSystem" in receivedData &&
                      key !== "unitSystem" &&
                      ` ${getUnit(key, receivedData?.unitSystem as string)}`}
                  </p>
                </div>
              </li>
            </ul>
          ))}
    </CardContent>
  );
};
