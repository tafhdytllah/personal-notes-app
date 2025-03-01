import { LangOption } from "@/constants";
import { useLanguage } from "@/hooks/useLanguage";
import getLanguage from "@/lib/language";

const CreatePage = () => {
  const { language } = useLanguage();
  return <div>{getLanguage("page.create", language as LangOption)}</div>;
};

export default CreatePage;
