import { Line, LineChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState, type JSX } from "react";
import { useTranslation } from "react-i18next";

export interface MacroRow {
  date: string;
  target: number;
  consumed: number;
}

export interface ProgressChartProps {
  data: {
    energy: MacroRow[];
    protein: MacroRow[];
    carbs: MacroRow[];
    fat: MacroRow[];
  };
}

export const ProgressChart = ({ data }: ProgressChartProps): JSX.Element => {
  const isMobile = useIsMobile();
  const [timeRange, setTimeRange] = useState("90d");
  const [macro, setMacro] = useState<"energy" | "protein" | "carbs" | "fat">(
    "energy"
  );
  const { t } = useTranslation();

  const chartConfig = {
    target: {
      label: t("charts.progressChart.labels.target"),
      color: "var(--primary)",
    },
    consumed: {
      label: t("charts.progressChart.labels.consumed"),
      color: "var(--ring)",
    },
  };
  useEffect(() => {
    if (isMobile) {
      setTimeRange("7d");
    }
  }, [isMobile]);

  const filteredData =
    timeRange === "all"
      ? data[macro]
      : data[macro].filter((item) => {
          const date = new Date(item.date);
          const referenceDate = new Date();
          let daysToSubtract = 90;
          if (timeRange === "30d") {
            daysToSubtract = 30;
          } else if (timeRange === "7d") {
            daysToSubtract = 7;
          }
          const startDate = new Date(referenceDate);
          startDate.setDate(startDate.getDate() - daysToSubtract);
          return date >= startDate;
        });

  return (
    <Card className="@container/card">
      <CardHeader className="flex justify-between">
        <div>
          <CardTitle>{t("charts.progressChart.title")}</CardTitle>
          <CardDescription>
            {t("charts.progressChart.description")}
          </CardDescription>
        </div>
        <CardAction className="flex flex-wrap gap-2">
          {/* Desktop Macro Toggle */}
          <ToggleGroup
            type="single"
            value={macro}
            onValueChange={(value) => {
              if (
                value === "energy" ||
                value === "protein" ||
                value === "carbs" ||
                value === "fat"
              ) {
                setMacro(value);
              }
            }}
            variant="outline"
            className="hidden @[767px]/card:flex"
          >
            <ToggleGroupItem value="energy">
              {t("charts.progressChart.macroItems.energy")}
            </ToggleGroupItem>
            <ToggleGroupItem value="protein">
              <span className="mx-2">
                {t("charts.progressChart.macroItems.protein")}
              </span>
            </ToggleGroupItem>
            <ToggleGroupItem value="carbs">
              {t("charts.progressChart.macroItems.carbs")}
            </ToggleGroupItem>
            <ToggleGroupItem value="fat">
              {t("charts.progressChart.macroItems.fat")}
            </ToggleGroupItem>
          </ToggleGroup>

          {/* Mobile Macro Select */}
          <Select
            value={macro}
            onValueChange={(value) => {
              if (
                value === "energy" ||
                value === "protein" ||
                value === "carbs" ||
                value === "fat"
              ) {
                setMacro(value);
              }
            }}
          >
            <SelectTrigger
              className="flex w-40 @[767px]/card:hidden"
              size="sm"
              aria-label="Select a nutrient"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="energy">
                {t("charts.progressChart.macroItems.energy")}
              </SelectItem>
              <SelectItem value="protein">
                {t("charts.progressChart.macroItems.protein")}
              </SelectItem>
              <SelectItem value="carbs">
                {t("charts.progressChart.macroItems.carbs")}
              </SelectItem>
              <SelectItem value="fat">
                {t("charts.progressChart.macroItems.fat")}
              </SelectItem>
            </SelectContent>
          </Select>

          {/* Desktop Time Toggle */}
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={setTimeRange}
            variant="outline"
            className="hidden @[767px]/card:flex"
          >
            <ToggleGroupItem value="all">
              {t("charts.progressChart.timeItems.all")}
            </ToggleGroupItem>
            <ToggleGroupItem value="30d">
              <span className="mx-4">
                {t("charts.progressChart.timeItems.30d")}
              </span>
            </ToggleGroupItem>
            <ToggleGroupItem value="7d">
              {t("charts.progressChart.timeItems.7d")}
            </ToggleGroupItem>
          </ToggleGroup>

          {/* Mobile Time Select */}
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="flex w-40 @[767px]/card:hidden"
              size="sm"
              aria-label="Select a range"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <LineChart data={filteredData}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              minTickGap={32}
              tickMargin={8}
              tickFormatter={(value) =>
                new Date(value).toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                })
              }
            />
            <YAxis />
            <ChartTooltip
              cursor={{ strokeDasharray: "3 3" }}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) =>
                    new Date(value).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                    })
                  }
                  indicator="line"
                />
              }
            />
            <Line
              type="monotone"
              dataKey="target"
              stroke="var(--color-target)"
              strokeWidth={2}
              dot={{ r: 3 }}
            />
            <Line
              type="monotone"
              dataKey="consumed"
              stroke="var(--color-consumed)"
              strokeWidth={2}
              dot={{ r: 3 }}
            />
            <ChartLegend content={<ChartLegendContent />} />1
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
