import { LangOption } from "@/constants";
import { useLanguage } from "@/hooks/useLanguage";
import getLanguage from "@/lib/language";

const DetailPage = () => {
  const { language } = useLanguage();
  return <div>{getLanguage("page.*.detail", language as LangOption)}</div>;
};

export default DetailPage;
