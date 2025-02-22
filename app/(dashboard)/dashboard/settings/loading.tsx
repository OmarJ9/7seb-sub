import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function SettingsLoading() {
  return (
    <div className="container mx-auto py-10">
      <div className="max-w-3xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-[100px]" />
            <Skeleton className="h-4 w-[250px] mt-2" />
          </CardHeader>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="space-y-8">
              {/* Notification Settings */}
              <div className="space-y-4">
                <Skeleton className="h-6 w-[150px]" />
                <div className="space-y-4">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>

              {/* Currency Settings */}
              <div className="space-y-4">
                <Skeleton className="h-6 w-[150px]" />
                <Skeleton className="h-10 w-full" />
              </div>

              {/* Theme Settings */}
              <div className="space-y-4">
                <Skeleton className="h-6 w-[150px]" />
                <Skeleton className="h-10 w-full" />
              </div>

              {/* Save Button */}
              <div className="flex justify-end">
                <Skeleton className="h-10 w-[100px]" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
