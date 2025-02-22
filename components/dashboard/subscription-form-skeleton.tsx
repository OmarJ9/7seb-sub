import { Skeleton } from "@/components/ui/skeleton";

export default function SubscriptionFormSkeleton() {
  return (
    <div className="space-y-6">
      {/* Email Field Skeleton */}
      <div className="space-y-1">
        <Skeleton className="h-4 w-12" />
        <Skeleton className="h-10 w-full" />
      </div>

      {/* Amount Field Skeleton */}
      <div className="space-y-1">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-10 w-full" />
      </div>

      {/* Billing Cycle Field Skeleton */}
      <div className="space-y-1">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-10 w-full" />
      </div>

      {/* Website Field Skeleton */}
      <div className="space-y-1">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-10 w-full" />
      </div>

      {/* Action Buttons Skeleton */}
      <div className="flex justify-end space-x-4 pt-4">
        <Skeleton className="h-10 w-24" />
        <Skeleton className="h-10 w-40" />
      </div>
    </div>
  );
}
