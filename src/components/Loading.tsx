import { LangOption } from "@/constants";
import { useLanguage } from "@/hooks/useLanguage";
import getLanguage from "@/lib/language";

const Loading = () => {
  const { language: lang } = useLanguage();
  return (
    <div className="flex justify-center items-start h-screen text-lg font-semibold size mt-8">
      {getLanguage("page.loading", lang as LangOption)}
    </div>
  );
};

export default Loading;
