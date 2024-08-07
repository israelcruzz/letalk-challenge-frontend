import { IUser } from "@/@types/user";
import { createContext } from "react";

export interface ILogin {
  email: string;
  password: string;
}

export interface IRegister {
  name: string;
  email: string;
  password: string;
  cpf: string;
  birthDate: Date;
}

export interface IAuthContext {
  register: (data: IRegister) => Promise<void>;
  login: (data: ILogin) => Promise<void>;
  signOut: () => void;
  user: IUser | null;
  token: string | null;
}

export const AuthContext = createContext({} as IAuthContext);
