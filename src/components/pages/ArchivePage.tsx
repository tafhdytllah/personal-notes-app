import { LangOption } from "@/constants";
import { useLanguage } from "@/hooks/useLanguage";
import getLanguage from "@/lib/language";

const ArchivePage = () => {
  const { language } = useLanguage();
  return <div>{getLanguage("page.archive", language as LangOption)}</div>;
};

export default ArchivePage;
