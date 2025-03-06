import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SubscriptionAvatar } from "@/components/dashboard/subscription-avatar";
import { Subscription } from "@/types/types";
import { Skeleton } from "@/components/ui/skeleton";

interface RecentSubscriptionsProps {
  subscriptions: Subscription[];
}

export async function RecentSubscriptions({
  subscriptions,
}: RecentSubscriptionsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Subscriptions</CardTitle>
        <CardDescription>Your latest 5 active subscriptions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {!subscriptions || subscriptions.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No subscriptions found. Add your first subscription to get
              started.
            </p>
          ) : (
            subscriptions.map((subscription) => (
              <div
                key={subscription.id}
                className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
              >
                <div className="flex items-center space-x-3">
                  <SubscriptionAvatar serviceName={subscription.service_name} />
                  <div className="space-y-1">
                    <p className="font-medium">{subscription.service_name}</p>
                    <p className="text-sm text-muted-foreground">
                      Next billing:{" "}
                      {new Date(
                        subscription.next_billing_date
                      ).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">${subscription.amount}</p>
                  <p className="text-sm text-muted-foreground">
                    {subscription.billing_cycle}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export async function RecentSubscriptionsSkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Subscriptions</CardTitle>
        <CardDescription>Your latest 5 active subscriptions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
              >
                <div className="flex items-center space-x-3">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <div className="space-y-1">
                    <Skeleton className="h-5 w-32" />
                    <div className="flex items-center space-x-1">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                  </div>
                </div>
                <div className="text-right space-y-1">
                  <Skeleton className="h-5 w-16 ml-auto" />
                  <Skeleton className="h-4 w-20 ml-auto" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
