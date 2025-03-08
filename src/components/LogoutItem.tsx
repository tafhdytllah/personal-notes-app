import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LangOption } from "@/constants";
import { useLanguage } from "@/hooks/useLanguage";
import getLanguage from "@/lib/language";
import PropTypes from "prop-types";
import { FaChevronDown, FaRegUser } from "react-icons/fa";

type LogoutItemProps = {
  onLogout: () => void;
  name: string;
};

const LogoutItem = ({ onLogout, name }: LogoutItemProps) => {
  const { language: lang } = useLanguage();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center gap-2 p-2 rounded-md"
        >
          <FaRegUser />
          <span>{name}</span>
          <FaChevronDown className="ml-auto" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="top">
        <DropdownMenuItem asChild>
          <Button
            variant="outline"
            onClick={onLogout}
            className="w-full text-left text-sm text-red-500"
          >
            {getLanguage("navbar.logout", lang as LangOption)}
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

LogoutItem.propTypes = {
  onLogout: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

export default LogoutItem;
