import { Switch } from "@/components/ui/switch";
import { ThemeEnum } from "@/constants";
import { useTheme } from "@/hooks/useTheme";
import { Moon, Sun } from "lucide-react";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const isDarkMode = theme === ThemeEnum.Dark;

  return (
    <div className="flex items-center gap-x-2">
      {isDarkMode ? (
        <Moon className="h-5 w-5 text-foreground" />
      ) : (
        <Sun className="h-5 w-5 text-foreground" />
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
