import { useNavigate } from "react-router-dom";

const useNavigateTo = () => {
  const navigate = useNavigate();

  return (path: string, withRedirect = false) => {
    if (withRedirect) {
      navigate(`${path}?redirect_url=${path.replace("/", "")}`);
    } else {
      navigate(path);
    }
  };
};
export default useNavigateTo;