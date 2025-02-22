import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ThemeColorSwitcher } from "./theme-color-switcher";

import { ThemeModeSwitcher } from "./theme-mode-switcher";

export function SettingsForm() {
  return (
    <>
      {/* Theme Settings */}
      <Card className="mb-4">
        <CardHeader>
          <CardTitle className="text-xl">Appearance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Theme Mode</Label>
            <ThemeModeSwitcher />
            <p className="text-sm text-muted-foreground">
              Choose your preferred theme mode
            </p>
          </div>
          <div className="space-y-2">
            <Label>Theme Color</Label>
            <ThemeColorSwitcher />
            <p className="text-sm text-muted-foreground">
              Choose your preferred accent color
            </p>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
