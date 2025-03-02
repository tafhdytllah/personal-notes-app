import ActionButton from "@/components/ActionButton";
import SearchItem from "@/components/SearchItem";
import { LangOption } from "@/constants";

type ActionbarProps = {
  language: LangOption;
  keyword: string;
  isAddNote: boolean;
  onKeywordChange: (keyword: string) => void;
};
const Actionbar = ({
  keyword,
  isAddNote,
  onKeywordChange,
  language,
}: ActionbarProps) => {
  return (
    <div className="container flex justify-between mx-auto px-4 py-1">
      <SearchItem
        keyword={keyword}
        onKeywordChange={onKeywordChange}
        language={language as LangOption}
      />
      {isAddNote && (
        <ActionButton
          isAction={true}
          text="button.create"
          language={language as LangOption}
        />
      )}
    </div>
  );
};

export default Actionbar;
