import { useApiGet, useLocale } from "@/hooks";
import { useSessionStore } from "@/store";
import { CardContent } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { format } from "@formkit/tempo";
import { CustomSpinner } from "@/components";

interface Props {
  url: string;
}
export const CardContentBaseVisualizer = <T extends Record<string, unknown>>({
  url,
}: Props) => {
  const { user } = useSessionStore();
  const userId = user?.id;
  const { locale } = useLocale();
  const { data, isLoading, isError, error } = useApiGet<{
    success: boolean;
    data: T;
  }>({
    url: url,
    enabled: !!userId,
  });

  if (isLoading) return <CustomSpinner />;
  if (isError) return <div>Error: {(error as Error).message}</div>;

  const receivedData = data?.data;

  return (
    <CardContent>
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
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </p>
              <Badge variant="outline" className="col-span-3 text-md">
                {key.toLowerCase().includes("date")
                  ? format(String(value), { date: "long" }, locale)
                  : String(value)
                      .replace("-", " ")
                      .replace(/^\w/, (c) => c.toUpperCase())}
              </Badge>
            </div>
          ))}
    </CardContent>
  );
};
