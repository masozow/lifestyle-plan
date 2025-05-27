import { Card, CardContent } from "@/components/ui/card";
interface Props {
  data: {
    [key: string]: string;
  };
}

const SummaryCard = ({ data }: Props) => {
  return (
    <Card key="summary" className="flex flex-col gap-4 p-4">
      <CardContent className="grid grid-cols-2 gap-2 overflow-auto text-wrap text-left">
        {Object.entries(data).map(([key, value]) => (
          <div key={key}>
            <h1 className="font-bold capitalize text-1xl">{key}</h1>
            <p className="overflow-y-scroll max-h-[3rem]">
              {value.charAt(0).toUpperCase() + value.slice(1)}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default SummaryCard;
