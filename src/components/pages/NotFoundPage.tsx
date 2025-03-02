import Empty from "@/components/Empty";
import { LangOption } from "@/constants";
import { useLanguage } from "@/hooks/useLanguage";

const NotFoundPage = () => {
  const { language } = useLanguage();

  return (
    <div className="max-w-[80%] mx-auto grid grid-rows-[auto,1fr] gap-4 py-4">
      <Empty text="page.notfound" language={language as LangOption} />;
    </div>
  );
};

export default NotFoundPage;
