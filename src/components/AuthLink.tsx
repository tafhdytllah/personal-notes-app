import { Button } from "@/components/ui/button";
import { FormAuthType, LangOption } from "@/constants";
import { ROUTES } from "@/constants/route";
import { useLanguage } from "@/hooks/useLanguage";
import useNavigateTo from "@/hooks/useNavigateTo";
import getLanguage from "@/lib/language";
import PropTypes from "prop-types";

type AuthLinkProps = {
  type: FormAuthType;
};
const AuthLink = ({ type }: AuthLinkProps) => {
  const { language: lang } = useLanguage();
  const navigate = useNavigateTo();
  const redirecRegisterUrl = ROUTES["register"];
  const redirecLoginUrl = ROUTES["login"];
  const isLogin = type === "LOGIN";
  const authType = !isLogin ? "login" : "register";

  return (
    <p className="mt-4 text-center">
      <span>
        {getLanguage(`page.login.${authType}-link`, lang as LangOption)}
      </span>
      <Button
        variant="link"
        onClick={() => navigate(isLogin ? redirecRegisterUrl : redirecLoginUrl)}
        className="text-blue-500 hover:underline p-0"
      >
        {getLanguage(`page.login.${authType}-link.button`, lang as LangOption)}
      </Button>
    </p>
  );
};

AuthLink.propTypes = {
  type: PropTypes.oneOf(["LOGIN", "REGISTER"]).isRequired,
};

export default AuthLink;
