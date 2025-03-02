import { Input } from "@/components/ui/input";
import { LangOption } from "@/constants";
import { useLanguage } from "@/hooks/useLanguage";
import getLanguage from "@/lib/language";
import PropTypes from "prop-types";

type SearchItemProps = {
  keyword: string;
  onKeywordChange: (keyword: string) => void;
};
const SearchItem = ({ keyword, onKeywordChange }: SearchItemProps) => {
  const { language: lang } = useLanguage();
  return (
    <div>
      <Input
        className="border p-2 rounded w-full sm:w-44 md:w-60 lg:w-76"
        type="text"
        placeholder={getLanguage("page.search", lang as LangOption)}
        value={keyword}
        onChange={(e) => onKeywordChange(e.target.value)}
      />
    </div>
  );
};

SearchItem.propTypes = {
  keyword: PropTypes.string.isRequired,
  onKeywordChange: PropTypes.func.isRequired,
};

export default SearchItem;
