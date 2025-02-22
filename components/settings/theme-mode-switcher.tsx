"use client";

import { Moon, Sun } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTheme } from "next-themes";

export function ThemeModeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <Select onValueChange={setTheme} defaultValue={theme}>
      <SelectTrigger className="w-full ring-offset-transparent focus:ring-transparent">
        <SelectValue placeholder="Select theme" />
      </SelectTrigger>
      <SelectContent className="border-muted">
        <SelectItem value="light">
          <div className="flex items-center space-x-3">
            <Sun className="w-4 h-4" />
            <span className="text-sm">Light</span>
          </div>
        </SelectItem>
        <SelectItem value="dark">
          <div className="flex items-center space-x-3">
            <Moon className="w-4 h-4" />
            <span className="text-sm">Dark</span>
          </div>
        </SelectItem>
        <SelectItem value="system">
          <div className="flex items-center space-x-3">
            <div className="flex w-4 h-4">
              <Sun className="w-[10px] h-[10px]" />
              <Moon className="w-[10px] h-[10px]" />
            </div>
            <span className="text-sm">System</span>
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
