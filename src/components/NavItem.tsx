import { LangOption } from "@/constants";
import { ROUTES } from "@/constants/route";
import { useLanguage } from "@/hooks/useLanguage";
import getLanguage from "@/lib/language";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

type NavItemProps = {
  route: keyof typeof ROUTES;
  title: string;
};

const NavItem = ({ route, title }: NavItemProps) => {
  const { language: lang } = useLanguage();
  const routePath = ROUTES[route];

  if (!routePath) {
    console.error(`Route "${route}" not found in ROUTES.`);
    return null;
  }

  return (
    <Link to={routePath} className="text-foreground hover:underline">
      {getLanguage(title, lang as LangOption)}
    </Link>
  );
};

const ROUTE_KEYS = Object.keys(ROUTES) as (keyof typeof ROUTES)[];

NavItem.propTypes = {
  route: PropTypes.oneOf(ROUTE_KEYS).isRequired,
  title: PropTypes.string.isRequired,
};

export default NavItem;
