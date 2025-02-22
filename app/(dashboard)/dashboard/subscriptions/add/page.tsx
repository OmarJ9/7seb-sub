import { Card, CardContent } from "@/components/ui/card";
import { AddSubscriptionForm } from "@/components/dashboard/add-subscription-form";
import { BackButton } from "@/components/back-button";

export default function AddSubscriptionPage() {
  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-full">
        <div className="mb-8 flex items-start justify-start">
          <BackButton title="Add New Subscription" />
        </div>

        <Card className="rounded-xl shadow-lg max-w-xl mx-auto">
          <CardContent className="p-8">
            <AddSubscriptionForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
