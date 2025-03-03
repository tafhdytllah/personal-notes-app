import { LangOption } from "@/constants";
import { createContext } from "react";

export type LanguageProviderState = {
  language: string;
  setLanguage: (language: LangOption) => void;
}

export const LanguageContext = createContext<LanguageProviderState | undefined>(undefined);