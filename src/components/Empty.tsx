import { LangOption } from "@/constants";
import getLanguage from "@/lib/language";

type EmptyProps = {
  language: LangOption;
};
const Empty = ({ language }: EmptyProps) => {
  return (
    <div className="flex justify-center items-center h-screen text-lg font-semibold size">
      {getLanguage("page.empty", language as LangOption)}
    </div>
  );
};

export default Empty;
