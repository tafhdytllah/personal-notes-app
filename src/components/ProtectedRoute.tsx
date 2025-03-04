import Loading from "@/components/Loading";
import { ROUTES } from "@/constants/route";
import { useAuth } from "@/hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const redirectUrl = ROUTES["login"];
  const { user, loading } = useAuth();

  if (loading) return <Loading />;
  return user ? <Outlet /> : <Navigate to={redirectUrl} replace />;
};

export default ProtectedRoute;
