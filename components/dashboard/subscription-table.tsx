import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SubscriptionActions } from "@/components/dashboard/subscription-actions";
import { SubscriptionAvatar } from "@/components/dashboard/subscription-avatar";
import { Subscription } from "@/types/types";
import { formatCurrency } from "@/lib/utils";

export async function SubscriptionTable({
  subscriptions,
}: {
  subscriptions: Subscription[];
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Next Billing</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {subscriptions?.map((subscription) => {
          return (
            <TableRow key={subscription.id}>
              <TableCell>
                <div className="flex items-center space-x-4">
                  <SubscriptionAvatar serviceName={subscription.service_name} />
                  <div>
                    <div className="font-medium">
                      {subscription.service_name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {subscription.email}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div
                  className={`text-sm ${
                    subscription.is_active ? "text-emerald-500" : "text-red-500"
                  } font-medium`}
                >
                  {subscription.is_active ? "Active" : "Inactive"}
                </div>
              </TableCell>
              <TableCell>{subscription.next_billing_date}</TableCell>
              <TableCell>{formatCurrency(subscription.amount)}</TableCell>
              <TableCell>
                <SubscriptionActions subscription={subscription} />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
