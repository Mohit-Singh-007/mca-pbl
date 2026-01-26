import getUrlDataForDashboard from "@/app/data/url/getUrlDataForDashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function DashboardStats() {
  const { totalUrl, totalClicks, activeUrlCount } = await getUrlDataForDashboard();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Total URLs</CardTitle>
        </CardHeader>
        <CardContent className="text-2xl font-bold">{totalUrl}</CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Active URLs</CardTitle>
        </CardHeader>
        <CardContent className="text-2xl font-bold">{activeUrlCount}</CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Clicks</CardTitle>
        </CardHeader>
        <CardContent className="text-2xl font-bold">{totalClicks}</CardContent>
      </Card>
    </div>
  );
}