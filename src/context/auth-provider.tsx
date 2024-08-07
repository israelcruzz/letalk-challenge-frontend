import { ReactNode, useEffect, useState } from "react";
import { AuthContext, ILogin, IRegister } from "./auth-context";
import { IUser } from "@/@types/user";
import { api } from "@/services/api";

interface AuthProviderProps {
  children: ReactNode;
}

interface IResponseLogin {
  data: {
    token: string;
  };
}

interface IResponseFindUser {
  data: IUser;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const user = localStorage.getItem("@user");
    const token = localStorage.getItem("@token");

    if (user && token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      setToken(token);
      setUser(JSON.parse(user));
    }
  }, []);

  const login = async (data: ILogin) => {
    try {
      const response = (await api.post("/auth", data)) as IResponseLogin;

      localStorage.setItem("@token", response.data.token);

      api.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.token}`;

      setToken(token);

      findUser();
    } catch (error) {
      console.log(error);
    }
  };

  const register = async (data: IRegister) => {
    try {
      const newUser = await api.post("/users/signup", data);

      console.log(newUser);
    } catch (error) {
      console.log(error);
    }
  };

  const signOut = () => {
    localStorage.removeItem("@user");
    localStorage.removeItem("@token");

    setUser(null);
    setToken(null);
  };

  const findUser = async () => {
    try {
      const user = (await api.get("/users")) as IResponseFindUser;

      localStorage.setItem("@user", JSON.stringify(user.data));

      setUser(user.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
