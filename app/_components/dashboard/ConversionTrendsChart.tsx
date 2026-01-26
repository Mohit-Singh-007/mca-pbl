"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
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
  count: {
    label: "Files Converted",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

interface ConversionTrendsChartProps {
  data: { date: string; count: number }[];
}

export function ConversionTrendsChart({ data }: ConversionTrendsChartProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Usage Velocity</CardTitle>
        <CardDescription>Files converted in the last 7 days</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-72 mt-2 w-full">
          <AreaChart
            accessibilityLayer
            data={data}
            margin={{ left: 10, right: 10, top: 10, bottom: 0 }}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={12}
              className="text-[10px] md:text-xs"
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={12}
              className="text-[10px] md:text-xs"
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <defs>
              <linearGradient id="fillConvCount" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-count)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-count)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey="count"
              type="natural"
              fill="url(#fillConvCount)"
              fillOpacity={0.4}
              stroke="var(--color-count)"
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
