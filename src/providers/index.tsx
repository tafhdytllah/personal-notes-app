import { ThemeEnum } from "@/constants";
import { LanguageProvider } from "@/providers/LanguageProvider";
import { NotesProvider } from "@/providers/NotesProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";

type ProvidersProps = {
  children: React.ReactNode;
};

const Providers = ({ children }: ProvidersProps) => {
  return (
    <ThemeProvider defaultTheme={ThemeEnum.Dark}>
      <NotesProvider>
        <LanguageProvider>{children}</LanguageProvider>
      </NotesProvider>
    </ThemeProvider>
  );
};

export default Providers;
