import FlagItem from "@/components/FlagItem";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LangOption } from "@/constants";
import { Language } from "@/types/language";
import PropTypes from "prop-types";

type LanguageSwitcherProps = {
  languages: Language[];
  currentLang: Language | undefined;
  onLanguageChange: (lang: LangOption) => void;
};

const LanguageSwitcher = ({
  languages,
  currentLang,
  onLanguageChange,
}: LanguageSwitcherProps) => {
  return (
    <div className="flex items-center space-x-2">
      {currentLang && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <FlagItem
                flag={currentLang?.flag ?? ""}
                content={(currentLang?.code ?? "").toUpperCase()}
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {languages.length > 0 ? (
              languages.map((lang: Language) => (
                <DropdownMenuItem
                  key={lang.code}
                  className="flex items-center space-x-2"
                  onClick={() => onLanguageChange(lang.code as LangOption)}
                >
                  <FlagItem
                    flag={lang?.flag ?? ""}
                    content={lang?.label ?? ""}
                  />
                </DropdownMenuItem>
              ))
            ) : (
              <DropdownMenuItem disabled>No languages found</DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};

LanguageSwitcher.propTypes = {
  languages: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string.isRequired,
      label: PropTypes.string,
      flag: PropTypes.string,
    }),
  ).isRequired,
  currentLang: PropTypes.shape({
    code: PropTypes.string.isRequired,
    label: PropTypes.string,
    flag: PropTypes.string,
  }),
  onLanguageChange: PropTypes.func.isRequired,
};

export default LanguageSwitcher;
