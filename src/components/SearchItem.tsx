import { Input } from "@/components/ui/input";
import { LangOption } from "@/constants";
import getLanguage from "@/lib/language";

type SearchItemProps = {
  keyword: string;
  onKeywordChange: (keyword: string) => void;
  language: LangOption;
};
const SearchItem = ({
  keyword,
  onKeywordChange,
  language,
}: SearchItemProps) => {
  return (
    <div>
      <Input
        className="border p-2 rounded w-full sm:w-44 md:w-60 lg:w-76"
        type="text"
        placeholder={getLanguage("page.search", language as LangOption)}
        value={keyword}
        onChange={(e) => onKeywordChange(e.target.value)}
      />
    </div>
  );
};

export default SearchItem;
