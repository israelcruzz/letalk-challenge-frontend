import { useAuth } from "@/hooks/useAuth";
import { AuthRouter } from "./auth-routes";
import { LogoutRoutes } from "./logout-routes";

export const Router = () => {
  const { user } = useAuth();

  return <main>{user ? <AuthRouter /> : <LogoutRoutes />}</main>;
};
