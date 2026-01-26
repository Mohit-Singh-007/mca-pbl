import ImageDialog from "@/app/_components/converter/ImageDialog";
import DocDialog from "@/app/_components/converter/DocDialog";
import MergeDialog from "@/app/_components/converter/MergeDialog";
import RecentConversions from "@/app/_components/converter/RecentConversions";
import ConverterStats from "@/app/_components/dashboard/ConverterStats";
import ConversionAnalytics from "@/app/_components/dashboard/ConversionAnalytics";
import ConversionTrendsSection from "@/app/_components/dashboard/ConversionTrendsSection";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";

export default function ConverterPage() {
  return (
    <div className="p-4 space-y-8 pb-10">
      <Card>
        <CardHeader className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <CardTitle className="text-3xl font-bold">File Converter</CardTitle>
            <CardDescription>
              Your private, local processing powerhouse.
            </CardDescription>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <ImageDialog />
            <DocDialog />
            <MergeDialog />
          </div>
        </CardHeader>
      </Card>

      <Suspense fallback={<StatsSkeleton />}>
        <ConverterStats />
      </Suspense>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Suspense fallback={<ChartSkeleton />}>
          <ConversionAnalytics />
        </Suspense>
        <Suspense fallback={<ChartSkeleton />}>
          <ConversionTrendsSection />
        </Suspense>
      </div>

      <Suspense fallback={<ListSkeleton />}>
        <RecentConversions />
      </Suspense>
    </div>
  );
}

function ListSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-4 w-48" />
      </CardHeader>
      <CardContent className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-16 w-full" />
        ))}
      </CardContent>
    </Card>
  );
}

function StatsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {[...Array(3)].map((_, i) => (
        <Card key={i}>
          <CardHeader>
            <Skeleton className="h-4 w-24" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8 w-16" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function ChartSkeleton() {
  return (
    <Card className="h-full">
      <CardHeader>
        <Skeleton className="h-5 w-32 mb-2" />
        <Skeleton className="h-4 w-64" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-64 w-full" />
      </CardContent>
    </Card>
  );
}
