import { availableServices, brandColors } from "@/constants/available-services";
import { cn } from "@/lib/utils";

interface SubscriptionAvatarProps {
  serviceName: keyof typeof brandColors | string;
  className?: string;
}

export function SubscriptionAvatar({
  serviceName,
  className,
}: SubscriptionAvatarProps) {
  const normalizedServiceName =
    serviceName.toLowerCase() as keyof typeof brandColors;
  const service = availableServices.find(
    (s) => s.value.toLowerCase() === serviceName.toLowerCase()
  );

  return (
    <div
      className={cn(
        "flex h-10 w-10 items-center justify-center rounded-full text-white font-bold",
        brandColors[normalizedServiceName] || "bg-teal-500",
        className
      )}
    >
      {service?.initials || serviceName[0]}
    </div>
  );
}
