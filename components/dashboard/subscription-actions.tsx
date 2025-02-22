"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Loader2, MoreHorizontal } from "lucide-react";
import { Subscription } from "@/types/types";
import { useRouter } from "next/navigation";
import {
  deleteSubscription,
  toggleSubscriptionStatus,
} from "@/actions/subscription";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

// You can later add proper types for subscription if available
interface SubscriptionActionsProps {
  subscription: Subscription;
}

export function SubscriptionActions({
  subscription,
}: SubscriptionActionsProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleAction = async (
    action: () => Promise<{ success: boolean; message: string }>,
    errorMessage: string
  ) => {
    try {
      setIsLoading(true);
      const response = await action();

      toast({
        title: response.success ? "Success" : "Error",
        description: response.message,
        variant: response.success ? "default" : "destructive",
      });

      if (response.success) {
        router.refresh();
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
      setIsOpen(false);
    }
  };

  const handleManage = () => {
    if (!subscription.website) {
      toast({
        title: "Error",
        description: "Billing Website is not set for this subscription",
        variant: "destructive",
      });
      return;
    }
    router.push(subscription.website);
    setIsOpen(false);
  };

  if (isLoading) {
    return (
      <Button variant="ghost" size="icon" disabled>
        <Loader2 className="h-4 w-4 animate-spin" />
      </Button>
    );
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen} modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleManage}>Manage</DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            router.push(`/dashboard/subscriptions/${subscription.id}`);
            setIsOpen(false);
          }}
        >
          Modify
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() =>
            handleAction(
              () => toggleSubscriptionStatus(subscription.id),
              "Failed to update subscription status"
            )
          }
        >
          {subscription.is_active ? "Deactivate" : "Activate"}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-red-500"
          onClick={() =>
            handleAction(
              () => deleteSubscription(subscription.id),
              "Failed to delete subscription"
            )
          }
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
