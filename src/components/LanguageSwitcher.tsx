import FlagItem from "@/components/FlagItem";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LangOption } from "@/constants";
import { useLanguage } from "@/hooks/useLanguage";
import { Language } from "@/types/language";
import { useCallback } from "react";

type LanguageSwitcherProps = {
  languages: Language[];
};

const LanguageSwitcher = ({ languages }: LanguageSwitcherProps) => {
  const { language, setLanguage } = useLanguage();

  const handleLanguageChange = useCallback(
    (lang: LangOption) => setLanguage(lang),
    [setLanguage],
  );

  const currentLang: Language | undefined = languages.find(
    (lang) => lang?.code === language,
  );

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
                  onClick={() => handleLanguageChange(lang.code as LangOption)}
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

export default LanguageSwitcher;
