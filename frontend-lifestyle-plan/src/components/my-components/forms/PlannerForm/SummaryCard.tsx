import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
interface Props {
  data: {
    [key: string]: string;
  };
}

const SummaryCard = ({ data }: Props) => {
  const { t } = useTranslation();
  return (
    <Card key="summary" className="flex flex-col gap-4 p-4">
      <CardContent className="grid grid-cols-2 gap-2 overflow-auto text-wrap text-left">
        {Object.entries(data).map(([key, value]) => (
          <div key={key}>
            <h1 className="font-bold capitalize text-1xl">{key}</h1>
            <p
              className={cn(
                "overflow-y-scroll max-h-[3rem]",
                key.toLowerCase() === "extras" &&
                  "text-sm border-1 border-dashed rounded-b-md"
              )}
            >
              {key.toLowerCase() === "extras"
                ? value
                : t(`plannerForm.options.${key}.${value}`)}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default SummaryCard;
