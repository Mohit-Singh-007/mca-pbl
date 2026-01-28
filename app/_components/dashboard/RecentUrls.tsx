import getRecentUrls from "@/app/data/url/getRecentUrls";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function RecentUrls() {
  const urls = await getRecentUrls();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent URLs</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {urls.length === 0 ? (
            <p className="text-sm text-muted-foreground">No URLs found.</p>
          ) : (
            urls.map((url) => (
              <div
                key={url.id}
                className="flex items-center justify-between border-b pb-2 last:border-0"
              >
                <div className="flex flex-col">
                  {/* <span className="">{url.alias || url.code}</span> */}
                  <a
                    href={`/s/${url.alias || url.code}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-sm truncate max-w-50 hover:underline"
                  >
                    {url.alias || url.code}
                  </a>
                  <span className="text-xs text-muted-foreground truncate max-w-50">
                    {url.longUrl}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold bg-secondary px-2 py-0.5 rounded">
                    {url.clicks} clicks
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
