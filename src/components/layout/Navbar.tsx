import LanguageSwitcher from "@/components/LanguageSwitcher";
import NavItem from "@/components/NavItem";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { LangOption } from "@/constants";
import { useLanguage } from "@/hooks/useLanguage";
import { fetchLanguages } from "@/lib/data";
import { Language } from "@/types/language";
import { useCallback, useEffect, useState } from "react";

const Navbar = () => {
  const [languages, setLanguages] = useState<Language[]>([]);
  const { language, setLanguage } = useLanguage();

  const currentLang: Language | undefined = languages.find(
    (lang) => lang?.code === language,
  );

  const handleLanguageChange = useCallback(
    (lang: LangOption) => setLanguage(lang),
    [setLanguage],
  );

  useEffect(() => {
    fetchLanguages().then((data) => setLanguages(data));
  }, []);

  return (
    <nav className="bg-background shadow-md">
      <div className="container max-w-[80%] mx-auto flex justify-between items-center py-4">
        <div className="flex gap-x-6">
          <NavItem
            route="notes"
            title="navbar.home"
            language={language as LangOption}
          />
          <NavItem
            route="notes-archives"
            title="navbar.archive"
            language={language as LangOption}
          />
        </div>
        <div className="flex items-center gap-x-6">
          <ThemeSwitcher />
          <LanguageSwitcher
            languages={languages}
            currentLang={currentLang}
            onLanguageChange={handleLanguageChange}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
