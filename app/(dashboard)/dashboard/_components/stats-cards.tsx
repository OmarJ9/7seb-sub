import { CalendarDays, CreditCard, DollarSign, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SubscriptionStats } from "@/types/subscriptions";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCurrency } from "@/lib/utils";

interface StatsCardsProps {
  stats: SubscriptionStats;
}

export async function StatsCards({ stats }: StatsCardsProps) {
  const { costs } = stats;

  const nextPaymentDate = stats.nextPayment
    ? new Date(stats.nextPayment.next_billing_date)
    : null;

  const daysUntilNextPayment = nextPaymentDate
    ? Math.ceil(
        (nextPaymentDate.getTime() - new Date().getTime()) /
          (1000 * 60 * 60 * 24)
      )
    : 0;

  const statCards = [
    {
      title: "Total Monthly Cost",
      value: formatCurrency(costs.monthlyTotal),
      description: "All active subscriptions",
      icon: DollarSign,
    },
    {
      title: "Yearly Total",
      value: formatCurrency(costs.yearlyTotal),
      description: "Total annual spending",
      icon: TrendingUp,
    },
    {
      title: "Next Payment",
      value: stats.nextPayment
        ? stats.nextPayment.service_name
        : "No upcoming payments",
      description: stats.nextPayment
        ? `Due in ${daysUntilNextPayment} days - ${formatCurrency(
            stats.nextPayment.amount
          )}`
        : "No scheduled payments",
      icon: CalendarDays,
    },
    {
      title: "Active Subscriptions",
      value: stats.totalActive.toString(),
      description: "Across all services",
      icon: CreditCard,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {statCards.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

export async function StatsCardsSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              <Skeleton className="h-4 w-24" />
            </CardTitle>
            <Skeleton className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-4 w-24 mb-2" />
            <Skeleton className="h-4 w-16" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
