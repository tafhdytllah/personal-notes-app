import LanguageSwitcher from "@/components/LanguageSwitcher";
import LogoutItem from "@/components/LogoutItem";
import NavItem from "@/components/NavItem";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { LangOption, ThemeEnum } from "@/constants";
import { ROUTES } from "@/constants/route";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/hooks/useLanguage";
import { useTheme } from "@/hooks/useTheme";
import { fetchLanguages } from "@/lib/data";
import { Language } from "@/types";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { logout, user } = useAuth();
  const [languages, setLanguages] = useState<Language[]>([]);
  const { language, setLanguage } = useLanguage();
  const { theme, setTheme } = useTheme();
  const isDarkMode = theme === ThemeEnum.Dark;
  const navigate = useNavigate();

  const currentLang: Language | undefined = languages.find(
    (lang) => lang?.code === language,
  );

  useEffect(() => {
    fetchLanguages().then((data) => setLanguages(data));
  }, []);

  const themeOnChangeHandler = (checked: boolean) => {
    setTheme(checked ? ThemeEnum.Dark : ThemeEnum.Light);
  };

  const handleLanguageChange = useCallback(
    (lang: LangOption) => setLanguage(lang),
    [setLanguage],
  );

  const handleLogout = async () => {
    logout();
    navigate(ROUTES["login"]);
  };

  return (
    <nav className="bg-background shadow-md">
      <div className="container max-w-[80%] mx-auto flex justify-between items-center py-4">
        <div className="flex gap-x-6">
          <NavItem route="notes" title="navbar.home" />
          <NavItem route="notes-archives" title="navbar.archive" />
        </div>
        <div className="flex items-center gap-x-6">
          <ThemeSwitcher
            isDarkMode={isDarkMode}
            themeOnChangeHandler={themeOnChangeHandler}
          />
          <LanguageSwitcher
            languages={languages}
            currentLang={currentLang}
            onLanguageChange={handleLanguageChange}
          />
          {user && <LogoutItem onLogout={handleLogout} name={user?.name} />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
