import { LangEnum, LangOption, LANGUAGE_KEY } from "@/constants";
import {
  LanguageContext,
  LanguageProviderState,
} from "@/context/LanguageContext";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

type LanguageProviderProps = {
  children: React.ReactNode;
  defaultLang?: LangOption;
  storageKey?: string;
};

const LanguageProvider = ({
  children,
  defaultLang = LangEnum.Id,
  storageKey = LANGUAGE_KEY,
}: LanguageProviderProps) => {
  const getInitialLanguage = (): LangOption => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem(storageKey) as LangOption) || defaultLang;
    }
    return defaultLang;
  };

  const [language, setLanguage] = useState<LangOption>(getInitialLanguage);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove(LangEnum.En, LangEnum.Id);
    if (language) {
      root.classList.add(language);
      localStorage.setItem(storageKey, language);
    }
  }, [language, storageKey]);

  const value: LanguageProviderState = { language, setLanguage };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

LanguageProvider.propTypes = {
  children: PropTypes.node.isRequired,
  defaultLang: PropTypes.oneOf(Object.values(LangEnum)),
  storageKey: PropTypes.string,
};

export default LanguageProvider;
