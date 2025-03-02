import { Button } from "@/components/ui/button";
import { LangOption } from "@/constants";
import getLanguage from "@/lib/language";
import { Plus } from "lucide-react";
type ActionButtonProps = {
  isAction?: boolean;
  language: LangOption;
  text: string;
};

const ActionButton = ({
  isAction = false,
  language,
  text,
}: ActionButtonProps) => {
  return (
    <Button>
      {isAction && <Plus className="mr-1 h-4 w-4" />}
      <p className="mr-2">{getLanguage(text, language as LangOption)}</p>
    </Button>
  );
};

export default ActionButton;
