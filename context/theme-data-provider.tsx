"use client";
import setGlobalColorTheme from "@/lib/theme-colors";
import { ThemeColorStateParams, ThemeColors } from "@/types/types";
import { useTheme, ThemeProviderProps } from "next-themes";
import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext<ThemeColorStateParams>(
  {} as ThemeColorStateParams
);

export default function ThemeDataProvider({ children }: ThemeProviderProps) {
  const [themeColor, setThemeColor] = useState<ThemeColors>("Rose");
  const [isMounted, setIsMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    // Initialize theme color from localStorage when component mounts
    const savedThemeColor = (() => {
      try {
        return (localStorage.getItem("themeColor") as ThemeColors) || "Rose";
      } catch (error) {
        console.error(error);
        return "Rose" as ThemeColors;
      }
    })();

    setThemeColor(savedThemeColor);
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("themeColor", themeColor);
      setGlobalColorTheme(
        theme as "light" | "dark",
        themeColor as "Rose" | "Blue" | "Green" | "Orange"
      );
    }
  }, [themeColor, theme, isMounted]);

  if (!isMounted) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ themeColor, setThemeColor }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  return useContext(ThemeContext);
}
