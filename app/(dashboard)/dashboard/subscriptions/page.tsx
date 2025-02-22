import { Card } from "@/components/ui/card";
import { SubscriptionTable } from "@/components/dashboard/subscription-table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { getUserSubscriptions } from "@/data/subscriptions/sunscription-queries";

export default async function SubscriptionsPage() {
  const subscriptions = await getUserSubscriptions();
  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Subscriptions
        </h2>
        <Link href="/dashboard/subscriptions/add">
          <Button className="w-full sm:w-auto">
            <Plus className="mr-2 h-4 w-4" />
            Add Subscription
          </Button>
        </Link>
      </div>
      <Card className="overflow-hidden">
        <SubscriptionTable subscriptions={subscriptions ?? []} />
      </Card>
    </div>
  );
}
