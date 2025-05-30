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

  const getFieldLabel = (key: string) => {
    // Try to get from field.title first
    const nestedTitle = t(`${translationPrefix}.${key}.title`);
    if (nestedTitle !== `${translationPrefix}.${key}.title`) {
      return nestedTitle;
    }
    // Fallback to direct translation
    return t(`${translationPrefix}.${key}`, { defaultValue: key });
  };

  const getFieldValue = (key: string, value: any) => {
    // Special handling for extras field
    if (key.toLowerCase() === "extras") return value;

    // Try to get from field.options.value
    const optionValue = t(`${translationPrefix}.${key}.options.${value}`);
    if (optionValue !== `${translationPrefix}.${key}.options.${value}`) {
      return optionValue;
    }

    // Try alternative option path (for backward compatibility)
    const altOptionValue = t(`${translationPrefix}.options.${key}.${value}`);
    if (altOptionValue !== `${translationPrefix}.options.${key}.${value}`) {
      return altOptionValue;
    }

    // Fallback to raw value
    return value;
  };

  return (
    <Card key="summary" className="flex flex-col gap-4 p-4">
      <CardContent className="grid grid-cols-2 gap-2 overflow-auto text-wrap text-left">
        {Object.entries(data)
          .filter(([_, value]) => value !== undefined && value !== null)
          .map(([key, value]) => (
            <div key={key}>
              <h1 className="font-bold capitalize text-1xl">
                {getFieldLabel(key)}
              </h1>
              <p
                className={cn(
                  "overflow-y-scroll max-h-[3rem]",
                  key.toLowerCase() === "extras" &&
                    "text-sm border-1 border-dashed rounded-b-md"
                )}
              >
                {getFieldValue(key, value)}
              </p>
            </div>
          ))}
      </CardContent>
    </Card>
  );
};

export default SummaryCard;
