import { Button } from "@/components/ui/button";
import { LangOption } from "@/constants";
import { useLanguage } from "@/hooks/useLanguage";
import getLanguage from "@/lib/language";
import PropTypes from "prop-types";
import { FaPlus } from "react-icons/fa";

type ActionButtonProps = {
  isAction?: boolean;
  text: string;
  onClick?: () => void;
};

const ActionButton = ({
  isAction = false,
  text,
  onClick,
}: ActionButtonProps) => {
  const { language: lang } = useLanguage();
  return (
    <Button onClick={onClick}>
      {isAction && <FaPlus className="mr-1 h-4 w-4" />}
      <p className="mr-2">{getLanguage(text, lang as LangOption)}</p>
    </Button>
  );
};

ActionButton.propTypes = {
  isAction: PropTypes.bool,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default ActionButton;
