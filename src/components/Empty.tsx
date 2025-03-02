import { LangOption } from "@/constants";
import { useLanguage } from "@/hooks/useLanguage";
import getLanguage from "@/lib/language";
import PropTypes from "prop-types";

type EmptyProps = {
  text: string;
};
const Empty = ({ text }: EmptyProps) => {
  const { language: lang } = useLanguage();
  return (
    <div className="flex justify-center items-start h-screen text-lg font-semibold size mt-8">
      {getLanguage(text, lang as LangOption)}
    </div>
  );
};

Empty.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Empty;
