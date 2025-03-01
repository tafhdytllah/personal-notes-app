import { THEME_KEY, ThemeEnum, ThemeOption } from "@/constants";
import { ThemeContext, ThemeProviderState } from "@/context/ThemeContext";
import { useEffect, useState } from "react";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: ThemeOption;
  storageKey?: string;
};

export function ThemeProvider({
  children,
  defaultTheme = ThemeEnum.Dark,
  storageKey = THEME_KEY,
}: ThemeProviderProps) {
  const getInitialTheme = (): ThemeOption => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem(storageKey) as ThemeOption) || defaultTheme;
    }
    return defaultTheme;
  };

  const [theme, setTheme] = useState<ThemeOption>(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove(ThemeEnum.Light, ThemeEnum.Dark);

    if (theme) {
      root.classList.add(theme);
      localStorage.setItem(storageKey, theme);
    }
  }, [theme, storageKey]);

  const value: ThemeProviderState = { theme, setTheme };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
