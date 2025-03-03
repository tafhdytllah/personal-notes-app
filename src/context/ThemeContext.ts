import { ThemeOption } from "@/constants";
import { createContext } from "react";

export type ThemeProviderState = {
  theme: ThemeOption;
  setTheme: (theme: ThemeOption) => void;
};

export const ThemeContext = createContext<ThemeProviderState | undefined>(
  undefined
);
