"use server";

import { availableServices, billingCycles } from "@/constants/available-services";
import { ActionResponse } from "@/types/types";
import { createClient } from "@/utils/supabase/server";
import {
  subscriptionSchema,
  updateSubscriptionSchema,
} from "@/utils/validations";
import { revalidatePath } from "next/cache";

export async function createSubscription(
  prevState: ActionResponse,
  formData: FormData
) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return {
        success: false,
        message: "Authentication required",
      };
    }

    const rawFormData = {
      service_name: formData.get("service"),
      email: formData.get("email"),
      amount: formData.get("amount"),
      billing_cycle: formData.get("billingCycle"),
      next_billing_date: formData.get("nextBillingDate"),
      website: formData.get("website"),
      start_date: formData.get("start_date"),
    };

    const validatedData = subscriptionSchema.safeParse(rawFormData);

    if (!validatedData.success) {
      console.log(validatedData.error.flatten());
      return {
        success: false,
        message: "Invalid form data",
      };
    }

    const service = availableServices.find(
      (s) => s.value === validatedData.data.service_name
    );

    const bayling = billingCycles.find(
      (b) => b.value === validatedData.data.billing_cycle
    );

    const nextBillingDate = new Date(
      new Date(validatedData.data.start_date).getTime() +
        (bayling?.days || 30) * 24 * 60 * 60 * 1000
    );

    // Insert the subscription
    const { error: insertError } = await supabase.from("subscriptions").insert({
      user_id: user.id,
      service_name: validatedData.data.service_name,
      category: service?.category || "Other",
      email: validatedData.data.email,
      amount: parseFloat(validatedData.data.amount),
      billing_cycle: validatedData.data.billing_cycle,
      start_at: new Date(validatedData.data.start_date),
      next_billing_date: nextBillingDate,
      website: validatedData.data.website,
      is_active: true,
    });

    if (insertError) {
      return {
        success: false,
        message: insertError.message,
      };
    }

    revalidatePath("/dashboard/subscriptions");

    return {
      success: true,
      message: "Subscription created successfully",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "An unexpected error occurred",
    };
  }
}

export async function updateSubscription(
  prevState: ActionResponse,
  formData: FormData
) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return {
        success: false,
        message: "Authentication required",
      };
    }

    const rawFormData = {
      id: formData.get("id"),
      email: formData.get("email"),
      amount: formData.get("amount"),
      billing_cycle: formData.get("billingCycle"),
      website: formData.get("website"),
      start_date: formData.get("start_date"),
    };

    const validatedData = updateSubscriptionSchema.safeParse(rawFormData);

    if (!validatedData.success) {
      console.log(validatedData.error.flatten());
      return {
        success: false,
        message: "Invalid form data",
      };
    }

    const bayling = billingCycles.find(
      (b) => b.value === validatedData.data.billing_cycle
    );

    const startDate = new Date(validatedData.data.start_date);
    const nextBillingDate = new Date(
      startDate.getTime() + (bayling?.days || 30) * 24 * 60 * 60 * 1000
    );

    const { error: updateError } = await supabase
      .from("subscriptions")
      .update({
        email: validatedData.data.email,
        amount: validatedData.data.amount,
        billing_cycle: validatedData.data.billing_cycle,
        start_at: startDate,
        next_billing_date: nextBillingDate,
        website: validatedData.data.website,
      })
      .eq("id", validatedData.data.id);

    if (updateError) {
      return {
        success: false,
        message: updateError.message,
      };
    }

    revalidatePath("/dashboard/subscriptions");

    return {
      success: true,
      message: "Subscription updated successfully",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "An unexpected error occurred",
    };
  }
}

export async function deleteSubscription(id: string) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return {
        success: false,
        message: "Authentication required",
      };
    }

    const { error: deleteError } = await supabase
      .from("subscriptions")
      .delete()
      .eq("id", id);

    if (deleteError) {
      return {
        success: false,
        message: deleteError.message,
      };
    }

    return {
      success: true,
      message: "Subscription deleted successfully",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "An unexpected error occurred",
    };
  }
}

export async function toggleSubscriptionStatus(
  id: string
): Promise<ActionResponse> {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return {
        success: false,
        message: "Authentication required",
      };
    }

    // First, get the current status
    const { data: subscription, error: fetchError } = await supabase
      .from("subscriptions")
      .select("is_active")
      .eq("id", id)
      .single();

    if (fetchError) {
      return {
        success: false,
        message: fetchError.message,
      };
    }

    // Toggle the status
    const { error: updateError } = await supabase
      .from("subscriptions")
      .update({ is_active: !subscription.is_active })
      .eq("id", id);

    if (updateError) {
      return {
        success: false,
        message: updateError.message,
      };
    }

    revalidatePath("/dashboard/subscriptions");
    revalidatePath("/dashboard");

    return {
      success: true,
      message: subscription.is_active
        ? "Subscription deactivated successfully"
        : "Subscription activated successfully",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "An unexpected error occurred",
    };
  }
}
