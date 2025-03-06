import { availableServices } from "@/constants/available-services";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface SubscriptionAvatarProps {
  serviceName: string;
}

export function SubscriptionAvatar({ serviceName }: SubscriptionAvatarProps) {
  const service = availableServices.find(
    (s) => s.value.toLowerCase() === serviceName.toLowerCase()
  );

  return (
    <div
      className={cn(
        "w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-md p-2"
      )}
    >
      <Image
        src={service?.image ?? "/placeholder.svg"}
        alt={service?.value ?? "Unknown service"}
        width={36}
        height={36}
        className="object-contain"
      />
    </div>
  );
}
