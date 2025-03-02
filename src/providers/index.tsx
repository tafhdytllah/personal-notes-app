import { ThemeEnum } from "@/constants";
import LanguageProvider from "@/providers/LanguageProvider";
import NotesProvider from "@/providers/NotesProvider";
import ThemeProvider from "@/providers/ThemeProvider";
import PropTypes from "prop-types";

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

Providers.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Providers;
