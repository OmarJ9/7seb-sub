import { Card, CardContent } from "@/components/ui/card";
import { createClient } from "@/utils/supabase/server";
import { Subscription } from "@/types/types";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import SubscriptionForm from "@/components/dashboard/subscription-form";
import SubscriptionFormSkeleton from "@/components/dashboard/subscription-form-skeleton";
import { BackButton } from "@/components/back-button";

async function getSubscription(id: string): Promise<Subscription> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) {
    notFound();
  }

  return data as Subscription;
}

export default async function ModifySubscriptionPage({
  params,
}: {
  params: Promise<{ id: string | undefined }>;
}) {
  const { id } = await params;
  if (!id) {
    notFound();
  }

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-full">
        <div className="mb-8 flex items-start justify-start">
          <BackButton title="Modify Subscription" />
        </div>

        <Card className="rounded-xl shadow-lg max-w-xl mx-auto">
          <CardContent className="p-8">
            <Suspense fallback={<SubscriptionFormSkeleton />}>
              <SubscriptionFormContent id={id} />
            </Suspense>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

async function SubscriptionFormContent({ id }: { id: string }) {
  const subscription = await getSubscription(id);
  return <SubscriptionForm subscription={subscription} />;
}
