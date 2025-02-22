"use server";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCurrency } from "@/lib/utils";

interface SubscriptionOverviewProps {
  categoryData: Record<string, number>;
}

export async function SubscriptionOverview({
  categoryData,
}: SubscriptionOverviewProps) {
  const total = Object.values(categoryData).reduce(
    (sum, amount) => sum + amount,
    0
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Subscription Overview</CardTitle>
        <CardDescription>
          Breakdown of your subscription categories
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {Object.entries(categoryData).map(([category, amount]) => (
            <div key={category} className="flex items-center">
              <div className="w-full">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">{category}</span>
                  <span className="text-sm text-muted-foreground">
                    {formatCurrency(amount)}
                  </span>
                </div>
                <div className="h-2 rounded-full bg-secondary">
                  <div
                    className="h-2 rounded-full bg-primary"
                    style={{
                      width: `${((amount / total) * 100).toFixed(1)}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export async function SubscriptionOverviewSkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Subscription Overview</CardTitle>
        <CardDescription>
          Breakdown of your subscription categories
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="flex items-center">
              <div className="w-full">
                <div className="flex items-center justify-between mb-1">
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
