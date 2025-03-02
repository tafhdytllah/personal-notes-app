import ActionButton from "@/components/ActionButton";
import SearchItem from "@/components/SearchItem";
import { ROUTES } from "@/constants/route";
import useNavigateTo from "@/hooks/useNavigateTo";
import PropTypes from "prop-types";

type ActionbarProps = {
  keyword: string;
  isAddNote: boolean;
  onKeywordChange: (keyword: string) => void;
};
const Actionbar = ({ keyword, isAddNote, onKeywordChange }: ActionbarProps) => {
  const navigate = useNavigateTo();
  const redirectUrl = ROUTES["notes-create"];
  return (
    <div className="container flex justify-between mx-auto px-4 py-1 mt-4">
      <SearchItem keyword={keyword} onKeywordChange={onKeywordChange} />
      {isAddNote && (
        <ActionButton
          isAction={true}
          text="button.create"
          onClick={() => navigate(redirectUrl, false)}
        />
      )}
    </div>
  );
};

Actionbar.propTypes = {
  keyword: PropTypes.string.isRequired,
  isAddNote: PropTypes.bool.isRequired,
  onKeywordChange: PropTypes.func.isRequired,
};

export default Actionbar;
