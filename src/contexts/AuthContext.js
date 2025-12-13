import { createContext } from "react";
import { User } from "firebase/auth";

export const AuthContext = createContext({
  user: null,
  loading: true,
  signOut: async () => {},
  register: async (name, email, password) => {},
  sigIn: async (email, password) => {},
});
