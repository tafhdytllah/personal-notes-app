import LanguageSwitcher from "@/components/LanguageSwitcher";
import { Switch } from "@/components/ui/switch";
import { LangOption, ThemeEnum } from "@/constants";
import { ROUTES } from "@/constants/route";
import { useLanguage } from "@/hooks/useLanguage";
import { useTheme } from "@/hooks/useTheme";
import { fetchLanguages } from "@/lib/data";
import getLanguage from "@/lib/language";
import { Language } from "@/types/language";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const { language } = useLanguage();
  const [languages, setLanguages] = useState<Language[]>([]);
  const isDarkMode = theme === ThemeEnum.Dark;

  useEffect(() => {
    fetchLanguages().then((data) => setLanguages(data));
  }, []);

  return (
    <nav className="flex justify-between items-center p-4 bg-background shadow-md">
      <div className="flex space-x-4">
        <Link to={ROUTES["notes"]} className="text-foreground hover:underline">
          {getLanguage("navbar.home", language as LangOption)}
        </Link>
        <Link
          to={ROUTES["notes-archives"]}
          className="text-foreground hover:underline"
        >
          {getLanguage("navbar.archive", language as LangOption)}
        </Link>
      </div>
      <div className="flex flex-row gap-4">
        <div className="flex items-center space-x-2">
          {isDarkMode ? (
            <Moon className="h-5 w-5 text-gray-500" />
          ) : (
            <Sun className="h-5 w-5 text-yellow-500" />
          )}
          <Switch
            checked={isDarkMode}
            onCheckedChange={(checked) =>
              setTheme(checked ? ThemeEnum.Dark : ThemeEnum.Light)
            }
          />
        </div>
        <LanguageSwitcher languages={languages} />
      </div>
    </nav>
  );
};

export default Navbar;
