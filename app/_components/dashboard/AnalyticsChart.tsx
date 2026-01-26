"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  clicks: {
    label: "Clicks",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

interface AnalyticsChartProps {
  data: { name: string; clicks: number }[];
}

export function AnalyticsChart({ data }: AnalyticsChartProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>URL Performance</CardTitle>
        <CardDescription>Top performing URLs by click count</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-72 mt-2 w-full">
          <BarChart
            accessibilityLayer
            data={data}
            layout="vertical"
            margin={{ left: 10, right: 30, top: 10, bottom: 10 }}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis type="number" dataKey="clicks" hide />
            <YAxis
              dataKey="name"
              type="category"
              tickLine={false}
              tickMargin={12}
              axisLine={false}
              tickFormatter={(value) => (value.length > 12 ? `${value.slice(0, 10)}..` : value)}
              width={80}
              className="text-[10px] md:text-xs font-semibold"
            />
            <ChartTooltip
              cursor={{ fill: "transparent" }}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="clicks"
              fill="var(--color-clicks)"
              radius={[0, 4, 4, 0]}
              barSize={32}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
