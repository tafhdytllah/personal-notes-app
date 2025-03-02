import { Button } from "@/components/ui/button";
import { LangOption } from "@/constants";
import getLanguage from "@/lib/language";
import { FaPlus } from "react-icons/fa";
type ActionButtonProps = {
  isAction?: boolean;
  language: LangOption;
  text: string;
  onClick?: () => void;
};

const ActionButton = ({
  isAction = false,
  language,
  text,
  onClick,
}: ActionButtonProps) => {
  return (
    <Button onClick={onClick}>
      {isAction && <FaPlus className="mr-1 h-4 w-4" />}
      <p className="mr-2">{getLanguage(text, language as LangOption)}</p>
    </Button>
  );
};

export default ActionButton;
