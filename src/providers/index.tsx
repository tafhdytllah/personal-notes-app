import { ThemeEnum } from "@/constants";
import { LanguageProvider } from "@/providers/LanguageProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";

type ProvidersProps = {
  children: React.ReactNode;
};

const Providers = ({ children }: ProvidersProps) => {
  return (
    <ThemeProvider defaultTheme={ThemeEnum.Dark}>
      <LanguageProvider>{children}</LanguageProvider>
    </ThemeProvider>
  );
};

export default Providers;
