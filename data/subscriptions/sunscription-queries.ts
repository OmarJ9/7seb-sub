import { Subscription } from "@/types/types";
import { createClient } from "@/utils/supabase/server";


interface CostBreakdown {
  monthlyTotal: number;
  yearlyTotal: number;
}

function calculateCosts(subscriptions: Subscription[]): CostBreakdown {
  return subscriptions.reduce(
    (acc, subscription) => {
      const amount = Number(subscription.amount);

      const cycle = subscription.billing_cycle
        ? subscription.billing_cycle
        : "";

      if (cycle === "Monthly") {
        // For monthly, add full amount each month and multiply by 12 for the year
        acc.monthlyTotal += amount;
        acc.yearlyTotal += acc.monthlyTotal * 12;
      } else if (cycle === "Quarterly") {
        // For quarterly, divide by 3 for the monthly equivalent and multiply by 4 for the yearly total
        acc.monthlyTotal += amount / 3;
        acc.yearlyTotal += acc.monthlyTotal * 4;
      } else if (cycle === "Yearly") {
        acc.monthlyTotal += amount / 12;
        acc.yearlyTotal += amount;
      }
      return acc;
    },
    { monthlyTotal: 0, yearlyTotal: 0 }
  );
}

export const getUserSubscriptions = async () => {
  try {
    const supabase = await createClient();

    const { data: subscriptions } = await supabase
      .from("subscriptions")
      .select("*")
      .order("is_active", { ascending: false })
      .order("created_at", { ascending: false });

    return subscriptions;
  } catch (error) {
    console.error("Error fetching subscriptions:", error);
    return [];
  }
};


export async function getTotalSubscriptionCost() {
  try {
    const supabase = await createClient();

    const { data: subscriptions } = await supabase
      .from("subscriptions")
      .select("amount, billing_cycle")

      .eq("is_active", true);

    if (!subscriptions || subscriptions.length === 0) {
      return { monthlyTotal: 0, yearlyTotal: 0 };
    }

    return calculateCosts(subscriptions as Subscription[]);
  } catch (error) {
    console.error("Error calculating total subscription cost:", error);
    return { monthlyTotal: 0, yearlyTotal: 0 };
  }
}

export async function getSubscriptionStats() {
  try {
    const supabase = await createClient();

    const { data: subscriptions } = await supabase
      .from("subscriptions")
      .select("*")

      .eq("is_active", true);

    if (!subscriptions) {
      return {
        totalActive: 0,
        nextPayment: null,
        categoryBreakdown: {},
        costs: { monthlyTotal: 0, yearlyTotal: 0 },
      };
    }

    // Calculate category breakdown with normalized monthly costs
    const categoryBreakdown = subscriptions.reduce((acc, subscription) => {
      const category = subscription.category || "Other";
      const cycle = subscription.billing_cycle
        ? subscription.billing_cycle.toLowerCase()
        : "";
      const monthlyAmount =
        cycle === "yearly"
          ? Number(subscription.amount) / 12
          : cycle === "quarterly"
          ? Number(subscription.amount) / 3
          : cycle === "monthly"
          ? Number(subscription.amount)
          : 0;

      if (!acc[category]) {
        acc[category] = 0;
      }
      acc[category] += monthlyAmount;
      return acc;
    }, {} as Record<string, number>);

    const nextPayment = subscriptions
      .sort(
        (a, b) =>
          new Date(a.next_billing_date).getTime() -
          new Date(b.next_billing_date).getTime()
      )
      .find((sub) => new Date(sub.next_billing_date) > new Date());

    const costs = calculateCosts(subscriptions as Subscription[]);

    return {
      totalActive: subscriptions.length,
      nextPayment,
      categoryBreakdown,
      costs,
    };
  } catch (error) {
    console.error("Error fetching subscription stats:", error);
    return {
      totalActive: 0,
      nextPayment: null,
      categoryBreakdown: {},
      costs: { monthlyTotal: 0, yearlyTotal: 0 },
    };
  }
}

export async function getRecentSubscriptions() {
  try {
    const supabase = await createClient();

    const subscriptions = await supabase
      .from("subscriptions")
      .select("*")

      .eq("is_active", true)
      .order("created_at", { ascending: false })
      .limit(5);

    return subscriptions;
  } catch (error) {
    console.error("Error fetching recent subscriptions:", error);
    return { data: [] };
  }
}
