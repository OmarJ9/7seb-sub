"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { billingCycles } from "@/data/available-services";
import { ActionResponse, Subscription } from "@/types/types";
import { updateSubscription } from "@/actions/subscription";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const initialState: ActionResponse = {
  success: false,
  message: "",
};

export default function SubscriptionForm({
  subscription,
}: {
  subscription: Subscription;
}) {
  const router = useRouter();
  const [state, setState] = useState<ActionResponse>(initialState);
  const [isPending, setIsPending] = useState(false);
  const [date, setDate] = useState<Date>(
    subscription.start_at ? new Date(subscription.start_at) : new Date()
  );

  async function handleSubmit(formData: FormData) {
    setIsPending(true);
    const result = await updateSubscription(initialState, formData);
    setState(result);
    setIsPending(false);
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      <input type="hidden" name="id" value={subscription.id} />

      {/* Email */}
      <div className="space-y-1">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          defaultValue={subscription.email}
          required
        />
      </div>

      {/* Amount */}
      <div className="space-y-1">
        <Label htmlFor="amount">Amount</Label>
        <div className="relative">
          <span className="absolute left-3 top-2 text-gray-500 mx-auto text-sm">
            $
          </span>
          <Input
            id="amount"
            name="amount"
            type="number"
            step="0.01"
            min="0"
            defaultValue={subscription.amount}
            required
            className="pl-7"
          />
        </div>
      </div>

      {/* Billing Cycle */}
      <div className="space-y-1">
        <Label htmlFor="billingCycle">Billing Cycle</Label>
        <Select name="billingCycle" defaultValue={subscription.billing_cycle}>
          <SelectTrigger>
            <SelectValue placeholder="Select billing cycle" />
          </SelectTrigger>
          <SelectContent>
            {billingCycles.map((cycle) => (
              <SelectItem key={cycle.value} value={cycle.value}>
                {cycle.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {/* Start Date */}
      <div className="space-y-1">
        <Label htmlFor="start_date">Start Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(newDate) => setDate(newDate || new Date())}
              initialFocus
              defaultMonth={date}
            />
          </PopoverContent>
        </Popover>
        <input type="hidden" name="start_date" value={date.toISOString()} />
      </div>

      {/* Website */}
      <div className="space-y-1">
        <Label htmlFor="website">Website (Optional)</Label>
        <Input
          id="website"
          name="website"
          type="url"
          defaultValue={subscription.website || ""}
          placeholder="e.g. https://netflix.com/billing"
        />
      </div>

      {!state.success && state.message && (
        <div className="text-red-600 text-sm font-bold text-center">
          {state.message}
        </div>
      )}

      {state.success && (
        <div className="text-green-600 text-sm font-bold text-center">
          {state.message}
        </div>
      )}

      {/* Form Actions */}
      {!state.success ? (
        <div className="flex justify-end space-x-4 pt-4">
          <Button
            variant="outline"
            type="button"
            onClick={() => router.push("/dashboard/subscriptions")}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isPending}>
            {isPending ? "Updating..." : "Update Subscription"}
          </Button>
        </div>
      ) : (
        <div>
          <Button
            variant="outline"
            type="button"
            onClick={() => router.push("/dashboard/subscriptions")}
            className="w-full bg-green-400 text-white"
          >
            Go Back
          </Button>
        </div>
      )}
    </form>
  );
}
