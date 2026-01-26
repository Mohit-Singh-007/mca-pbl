import getRecommendedUrls from "@/app/data/url/getRecommendedUrls";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

export default async function RecommendedUrls() {
  const urls = await getRecommendedUrls();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="size-4 text-primary" />
          Recommended
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {urls.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Perform better to get recommendations.
            </p>
          ) : (
            urls.map((url) => (
              <div
                key={url.id}
                className="flex items-center justify-between border-b pb-2 last:border-0"
              >
                <div className="flex flex-col">
                  <span className="font-medium text-sm">
                    {url.alias || url.code}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Created: {new Date(url.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="text-xs font-bold text-primary">Popular</div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
