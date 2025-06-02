import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

interface Props<T> {
  data: T | null;
  translationPrefix: string;
}

const SummaryCard = <T extends Record<string, any>>({
  data,
  translationPrefix,
}: Props<T>) => {
  const { t } = useTranslation();

  if (!data) {
    return <div>{t("summaryCard.noData")}</div>;
  }

  return (
    <Card key="summary" className="flex flex-col gap-4 p-4">
      <CardContent className="grid grid-cols-2 gap-2 overflow-auto text-wrap text-left">
        {Object.entries(data)
          .filter(([_, value]) => value !== undefined && value !== null)
          .map(([key, value]) => {
            const fieldTitle = t(`${translationPrefix}.${key}.title`);
            const fieldValue =
              key.toLowerCase() === "extras"
                ? value
                : t(`${translationPrefix}.${key}.options.${value}`, {
                    defaultValue: value,
                  });

            return (
              <div key={key}>
                <h1 className="font-bold capitalize text-1xl">{fieldTitle}</h1>
                <p
                  className={cn(
                    "overflow-y-scroll max-h-[3rem]",
                    key.toLowerCase() === "extras" &&
                      "text-sm border-1 border-dashed rounded-b-md"
                  )}
                >
                  {fieldValue}
                </p>
              </div>
            );
          })}
      </CardContent>
    </Card>
  );
};

export default SummaryCard;
