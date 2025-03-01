import { LangOption } from "@/constants";
import getLanguage from "@/lib/language";

type LoadingProps = {
  language: LangOption;
};
const Loading = ({ language }: LoadingProps) => {
  return (
    <div className="flex justify-center items-center h-screen text-lg font-semibold size">
      {getLanguage("page.loading", language as LangOption)}
    </div>
  );
};

export default Loading;
