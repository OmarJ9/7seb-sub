export interface SubscriptionStats {
  costs: {
    monthlyTotal: number;
    yearlyTotal: number;
  };
  nextPayment: {
    service_name: string;
    next_billing_date: string;
    amount: number;
  } | null;
  totalActive: number;
  categoryBreakdown: Record<string, number>;
}
