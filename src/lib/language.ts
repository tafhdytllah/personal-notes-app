import { LangEnum, LangOption } from "@/constants";
import enLanguage from "@/locales/en.json";
import idLanguage from "@/locales/id.json";

const languages: Record<LangOption, Record<string, string>> = {
  id: idLanguage,
  en: enLanguage,
};

const getLanguage = (key: string, lang: LangOption = LangEnum.Id): string => {
  const translations = languages[lang] ?? languages.id;

  if (key in translations) {
    return translations[key];
  }

  console.warn(`Missing translation key: ${key} in language: ${lang}`);
  return `Missing translation: ${key}`;
};

export default getLanguage;