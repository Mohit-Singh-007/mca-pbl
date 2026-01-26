import ConversionHistory from "@/app/_components/converter/ConversionHistory";
import MergeDialog from "@/app/_components/converter/MergeDialog";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function MergedPdfsPage() {
  return (
    <div className="p-4 space-y-8 pb-10">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Merged PDFs</h1>
          <p className="text-muted-foreground">
            View and download all your multi-file PDF merge operations.
          </p>
        </div>

        <MergeDialog />
      </div>

      <Suspense fallback={<HistorySkeleton />}>
        <ConversionHistory category="PDF_MERGE" />
      </Suspense>
    </div>
  );
}

function HistorySkeleton() {
  return (
    <div className="rounded-md border bg-card">
      <div className="h-10 border-b bg-muted/50" />
      {[...Array(5)].map((_, i) => (
        <div key={i} className="h-12 border-b flex items-center px-4 gap-4">
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-24 ml-auto" />
        </div>
      ))}
    </div>
  );
}
