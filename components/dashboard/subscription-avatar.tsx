import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export const brandColors = {
  netflix: "bg-[#E50914]",
  spotify: "bg-[#1DB954]",
  patreon: "bg-[#FF424D]",
  "amazon-prime": "bg-[#00A8E1]",
  "hbo-max": "bg-[#A615DE]",
  "apple-tv+": "bg-black",
  "youtube-premium": "bg-[#FF0000]",
  "apple-music": "bg-[#FA243C]",
  "youtube-music": "bg-[#FF0000]",
  tidal: "bg-black",
  dropbox: "bg-[#0061FF]",
  "google-one": "bg-[#4285F4]",
  "icloud+": "bg-[#3693F3]",
  "playstation-plus": "bg-[#0070D1]",
  medium: "bg-black",
  substack: "bg-[#FF6719]",
  notion: "bg-black",
  "canva-pro": "bg-[#00C4CC]",
  grammarly: "bg-[#15C39A]",
} as const;

interface SubscriptionAvatarProps {
  serviceName: keyof typeof brandColors | string;
  className?: string;
}

export function SubscriptionAvatar({
  serviceName,
  className,
}: SubscriptionAvatarProps) {
  // Convert service name to a format suitable for file names
  const logoFileName = serviceName.toLowerCase().replace(/\s+/g, "-");
  const normalizedServiceName =
    serviceName.toLowerCase() as keyof typeof brandColors;

  return (
    <Avatar className={cn("relative overflow-hidden", className)}>
      <div
        className={cn(
          "absolute inset-0 w-full h-full",
          brandColors[normalizedServiceName] || "bg-gray-500"
        )}
      />
      <AvatarImage
        src={`/logos/${logoFileName}.svg`}
        alt={serviceName}
        className="relative p-2 invert brightness-0 "
      />
      <AvatarFallback className="font-bold text-white">
        {serviceName[0].toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
}
