import { z } from "zod";

export const subscriptionSchema = z.object({
  service_name: z.string().min(1, "Service name is required"),
  email: z.string().email("Invalid email address"),
  amount: z.string().regex(/^\d+(\.\d{1,2})?$/, "Invalid amount format"),
  billing_cycle: z.string().min(1, "Billing cycle is required"),
  website: z.string().optional(),
  start_date: z.string().min(1, "Start date is required"),
});

export const updateSubscriptionSchema = z.object({
  id: z.string(),
  email: z.string().email("Invalid email address"),
  amount: z.coerce.number().min(0, "Amount must be positive"),
  billing_cycle: z.string(),
  website: z.string().url().optional().or(z.literal("")),
  start_date: z.string().min(1, "Start date is required"),
});
