import getAnalyticsData from "@/app/data/url/getAnalyticsData";
import { AnalyticsChart } from "./AnalyticsChart";

export default async function AnalyticsSection() {
  const data = await getAnalyticsData();

  if (data.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-muted-foreground bg-secondary/20 rounded-lg border border-dashed">
        No click data available yet.
      </div>
    );
  }

  return <AnalyticsChart data={data} />;
}
