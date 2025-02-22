import { Suspense } from "react";
import {
  RecentSubscriptions,
  RecentSubscriptionsSkeleton,
} from "@/app/(dashboard)/dashboard/_components/recent-subscriptions";
import {
  getSubscriptionStats,
  getRecentSubscriptions,
} from "@/data/subscriptions/sunscription-queries";
import {
  StatsCards,
  StatsCardsSkeleton,
} from "@/app/(dashboard)/dashboard/_components/stats-cards";
import {
  SubscriptionOverview,
  SubscriptionOverviewSkeleton,
} from "@/app/(dashboard)/dashboard/_components/subscription-overview";

async function StatsSection() {
  const stats = await getSubscriptionStats();
  return <StatsCards stats={stats} />;
}

async function RecentSubscriptionsSection() {
  const subscriptionsResponse = await getRecentSubscriptions();
  return (
    <RecentSubscriptions subscriptions={subscriptionsResponse?.data ?? []} />
  );
}

async function SubscriptionOverviewSection() {
  const stats = await getSubscriptionStats();
  return <SubscriptionOverview categoryData={stats.categoryBreakdown} />;
}

export default function DashboardPage() {
  return (
    <div className="container mx-auto space-y-8">
      <div className="flex flex-col gap-4">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Welcome back! Here&apos;s an overview of your subscriptions.
        </p>
      </div>

      <Suspense fallback={<StatsCardsSkeleton />}>
        <StatsSection />
      </Suspense>

      <div className="grid gap-4 md:grid-cols-2">
        <Suspense fallback={<RecentSubscriptionsSkeleton />}>
          <RecentSubscriptionsSection />
        </Suspense>
        <Suspense fallback={<SubscriptionOverviewSkeleton />}>
          <SubscriptionOverviewSection />
        </Suspense>
      </div>
    </div>
  );
}
