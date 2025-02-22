"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "lucide-react";
import {
  availableServices,
  billingCycles,
} from "@/constants/available-services";
import { createSubscription } from "@/actions/subscription";
import { ActionResponse } from "@/types/types";
import { useActionState } from "react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const initialState: ActionResponse = {
  success: false,
  message: "",
};

export function AddSubscriptionForm() {
  const router = useRouter();
  const [state, action, pending] = useActionState(
    createSubscription,
    initialState
  );

  const [selectedService, setSelectedService] = useState(
    availableServices[0].value
  );
  const [selectedBillingCycle, setSelectedBillingCycle] = useState(
    billingCycles[0].value
  );
  const [date, setDate] = useState<Date>(new Date());

  return (
    <form action={action} className="space-y-6">
      {/* Service Selection */}
      <div className="space-y-1">
        <Label htmlFor="service">Service</Label>
        <Select
          name="service"
          value={selectedService}
          onValueChange={setSelectedService}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a service" />
          </SelectTrigger>
          <SelectContent>
            {availableServices.map((service) => (
              <SelectItem key={service.value} value={service.value}>
                {service.value}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Email */}
      <div className="space-y-1">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Email"
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
            max="1000"
            placeholder="0.00"
            required
            className="pl-7"
          />
        </div>
      </div>

      {/* Billing Cycle */}
      <div className="space-y-1">
        <Label htmlFor="billingCycle">Billing Cycle</Label>
        <Select
          name="billingCycle"
          value={selectedBillingCycle}
          onValueChange={setSelectedBillingCycle}
        >
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
              <Calendar className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <CalendarComponent
              mode="single"
              selected={date}
              onSelect={(newDate) => setDate(newDate || new Date())}
              initialFocus
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
          placeholder="https://example.com"
        />
      </div>

      {!state.success && (
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
            onClick={() => router.back()}
            disabled={pending}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={pending}>
            {pending ? "Adding..." : "Add Subscription"}
          </Button>
        </div>
      ) : (
        <div>
          <Button
            variant="outline"
            type="button"
            onClick={() => router.back()}
            disabled={pending}
            className="w-full bg-green-400 text-white"
          >
            Go Back
          </Button>
        </div>
      )}
    </form>
  );
}
