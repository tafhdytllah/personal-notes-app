import { LangOption } from "@/constants";
import getLanguage from "@/lib/language";

type LoadingProps = {
  language: LangOption;
};
const Loading = ({ language }: LoadingProps) => {
  return (
    <div className="flex justify-center items-start h-screen text-lg font-semibold size mt-8">
      {getLanguage("page.loading", language as LangOption)}
    </div>
  );
};

export default Loading;
