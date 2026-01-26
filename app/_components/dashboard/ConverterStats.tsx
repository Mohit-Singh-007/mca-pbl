import { getConversionStats } from "@/app/data/converter/getConversionStats";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileStack, HardDrive, Zap } from "lucide-react";

export default async function ConverterStats() {
  const { totalCount, totalBytes, categoryDistribution } = await getConversionStats();
  
  const formattedSize = (totalBytes / (1024 * 1024)).toFixed(2);

  const getCount = (cat: string) => categoryDistribution.find(c => c.category === cat)?.count || 0;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Overall Volume</CardTitle>
            <HardDrive className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formattedSize} MB</div>
            <p className="text-[10px] text-muted-foreground mt-1">Total data processed locally</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Operations</CardTitle>
            <FileStack className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCount}</div>
            <p className="text-[10px] text-muted-foreground mt-1">Conversions and merges</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Storage Drive</CardTitle>
            <Zap className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">D: Drive</div>
            <p className="text-[10px] text-muted-foreground mt-1">State: Active & Healthy</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg border">
          <span className="text-xs font-medium">Images</span>
          <span className="text-sm font-bold">{getCount("IMAGE")}</span>
        </div>
        <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg border">
          <span className="text-xs font-medium">Documents</span>
          <span className="text-sm font-bold">{getCount("DOCUMENT")}</span>
        </div>
        <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg border">
          <span className="text-xs font-medium">PDF Merges</span>
          <span className="text-sm font-bold">{getCount("PDF_MERGE")}</span>
        </div>
      </div>
    </div>
  );
}
