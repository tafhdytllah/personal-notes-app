import { LangOption } from "@/constants";
import { useLanguage } from "@/hooks/useLanguage";
import getLanguage from "@/lib/language";

const HomePage = () => {
  const { language } = useLanguage();
  return <div>{getLanguage("page.home", language as LangOption)}</div>;
};

export default HomePage;
