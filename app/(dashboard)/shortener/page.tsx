import UrlDialogForm from "@/app/_components/url/UrlDialogForm";
import DashboardStats from "@/app/_components/dashboard/DashboardStats";
import RecentUrls from "@/app/_components/dashboard/RecentUrls";
import RecommendedUrls from "@/app/_components/dashboard/RecommendedUrls";
import AnalyticsSection from "@/app/_components/dashboard/AnalyticsSection";
import TrendsSection from "@/app/_components/dashboard/TrendsSection";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function UrlDashboardPage() {
  return (
    <div className="space-y-8 p-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>URL Shortener</CardTitle>
            <CardDescription>
              Manage your URLs in a central repository
            </CardDescription>
          </div>

          <UrlDialogForm />
        </CardHeader>
      </Card>

      <Suspense fallback={<StatsSkeleton />}>
        <DashboardStats />
      </Suspense>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Suspense fallback={<ChartSkeleton />}>
          <AnalyticsSection />
        </Suspense>
        <Suspense fallback={<ChartSkeleton />}>
          <TrendsSection />
        </Suspense>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Suspense fallback={<ListSkeleton />}>
          <RecommendedUrls />
        </Suspense>

        <Suspense fallback={<ListSkeleton />}>
          <RecentUrls />
        </Suspense>
      </div>
    </div>
  );
}

function ChartSkeleton() {
  return (
    <Card>
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

function ListSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-5 w-32" />
      </CardHeader>
      <CardContent className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-12 w-full" />
        ))}
      </CardContent>
    </Card>
  );
}
