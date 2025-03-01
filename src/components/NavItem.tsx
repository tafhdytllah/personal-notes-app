import { LangOption } from "@/constants";
import { ROUTES } from "@/constants/route";
import getLanguage from "@/lib/language";
import { Link } from "react-router-dom";

type NavItemProps = {
  route: keyof typeof ROUTES;
  title: string;
  language: LangOption;
};

const NavItem = ({ route, title, language }: NavItemProps) => {
  const routePath = ROUTES[route];

  if (!routePath) {
    console.error(`Route "${route}" not found in ROUTES.`);
    return null;
  }

  return (
    <Link to={routePath} className="text-foreground hover:underline">
      {getLanguage(title, language as LangOption)}
    </Link>
  );
};

export default NavItem;
