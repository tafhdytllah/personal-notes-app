import { Switch } from "@/components/ui/switch";
import { ThemeEnum } from "@/constants";
import { useTheme } from "@/hooks/useTheme";
import { FaRegMoon, FaSun } from "react-icons/fa";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const isDarkMode = theme === ThemeEnum.Dark;

  return (
    <div className="flex items-center gap-x-2">
      {isDarkMode ? (
        <FaRegMoon className="h-5 w-5 text-foreground" />
      ) : (
        <FaSun className="h-5 w-5 text-foreground" />
      )}
      <Switch
        checked={isDarkMode}
        onCheckedChange={(checked: boolean) =>
          setTheme(checked ? ThemeEnum.Dark : ThemeEnum.Light)
        }
      />
    </div>
  );
};

export default ThemeSwitcher;
