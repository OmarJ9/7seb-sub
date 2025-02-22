import { Database } from "./supabase";

export interface ActionResponse {
  success: boolean;
  message: string;
}

export interface LoginFormData {
  email: string;
}

export interface Profile {
  id: string;
  full_name: string;
  email: string;
  avatar_url: string;
  updated_at?: string;
  provider?: string;
}

export type Subscription = Database["public"]["Tables"]["subscriptions"]["Row"];

export type ThemeColors = "Zinc" | "Rose" | "Blue" | "Green" | "Orange";

export interface ThemeColorStateParams {
  themeColor: ThemeColors;
  setThemeColor: React.Dispatch<React.SetStateAction<ThemeColors>>;
}
