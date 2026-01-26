import { getConversionStats } from "@/app/data/converter/getConversionStats";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileIcon, CheckCircle2, XCircle, Clock, Download } from "lucide-react";

export default async function RecentConversions() {
  const { recentConversions } = await getConversionStats();

  if (recentConversions.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Conversions</CardTitle>
        <CardDescription>Your latest local file processing tasks.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentConversions.map((conv) => (
            <div key={conv.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded">
                  <FileIcon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium truncate max-w-[200px]">{conv.originalName}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Badge variant="secondary" className="px-1 py-0 text-[10px]">
                      {conv.type.replace('_', ' ')}
                    </Badge>
                    <span>{(conv.fileSize / 1024).toFixed(1)} KB</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col items-end gap-2">
                {conv.status === "COMPLETED" ? (
                  <div className="flex flex-col items-end">
                    <div className="flex items-center gap-1 text-green-500 font-medium text-xs mb-1">
                      <CheckCircle2 className="h-3 w-3" />
                      <span>Done</span>
                    </div>
                    <Button asChild variant="ghost" size="sm" className="h-7 px-2 text-xs">
                      <a href={`/api/convert/download/${conv.id}`} download>
                        <Download className="mr-1 h-3 w-3" />
                        Download
                      </a>
                    </Button>
                  </div>
                ) : conv.status === "FAILED" ? (
                  <div className="flex items-center gap-1 text-destructive font-medium text-xs" title={conv.error || "Error"}>
                    <XCircle className="h-3 w-3" />
                    <span>Failed</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1 text-amber-500 font-medium text-xs">
                    <Clock className="h-3 w-3 animate-spin" />
                    <span>Pending</span>
                  </div>
                )}
                <span className="text-[10px] text-muted-foreground">
                  {new Date(conv.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
