import { ProgressBar } from "@/components/ProgressBar";
import { LangOption } from "@/constants";
import { useLanguage } from "@/hooks/useLanguage";
import getLanguage from "@/lib/language";

type Props = {
  isLoading: boolean;
};
const Loading = ({ isLoading }: Props) => {
  const { language: lang } = useLanguage();
  return (
    <>
      <ProgressBar isLoading={isLoading} />
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="flex justify-center items-center h-screen text-lg font-semibold">
          {getLanguage("page.loading", lang as LangOption)}
        </div>
      </div>
    </>
  );
};

export default Loading;
