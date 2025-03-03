import { Switch } from "@/components/ui/switch";
import PropTypes from "prop-types";
import { FaRegMoon, FaSun } from "react-icons/fa";

type ThemeSwitcherProps = {
  isDarkMode: boolean;
  themeOnChangeHandler: (checked: boolean) => void;
};
const ThemeSwitcher = ({
  isDarkMode,
  themeOnChangeHandler,
}: ThemeSwitcherProps) => {
  return (
    <div className="flex items-center gap-x-2">
      {isDarkMode ? (
        <FaRegMoon className="h-5 w-5 text-foreground" />
      ) : (
        <FaSun className="h-5 w-5 text-foreground" />
      )}
      <Switch checked={isDarkMode} onCheckedChange={themeOnChangeHandler} />
    </div>
  );
};

ThemeSwitcher.protoTypes = {
  isDarkMode: PropTypes.bool.isRequired,
  themeOnChangeHandler: PropTypes.func.isRequired,
};

export default ThemeSwitcher;
