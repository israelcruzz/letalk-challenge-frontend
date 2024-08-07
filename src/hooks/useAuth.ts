import { AuthContext, IAuthContext } from "@/context/auth-context";
import { useContext } from "react";

export const useAuth = () => useContext(AuthContext) as IAuthContext;