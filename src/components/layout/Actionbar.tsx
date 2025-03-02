import ActionButton from "@/components/ActionButton";
import SearchItem from "@/components/SearchItem";
import { LangOption } from "@/constants";
import { ROUTES } from "@/constants/route";
import useNavigateTo from "@/hooks/useNavigateTo";

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
  const navigate = useNavigateTo();
  const redirectUrl = ROUTES["notes-create"];
  return (
    <div className="container flex justify-between mx-auto px-4 py-1 mt-4">
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
          onClick={() => navigate(redirectUrl, false)}
        />
      )}
    </div>
  );
};

export default Actionbar;
