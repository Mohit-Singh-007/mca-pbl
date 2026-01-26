import { getConversionStats } from "@/app/data/converter/getConversionStats";
import { ConversionPieChart } from "./ConversionPieChart";

export default async function ConversionAnalytics() {
  const { typeDistribution } = await getConversionStats();

  if (typeDistribution.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-muted-foreground bg-secondary/20 rounded-lg border border-dashed">
        No conversion data yet.
      </div>
    );
  }

  return <ConversionPieChart data={typeDistribution} />;
}
