import { useEffect, useState } from "react";

import { AuthContext } from "../contexts/AuthContext";

import {
  unsubscribeSession,
  signOut,
  sigIn as signInUser,
  register as registerUser,
} from "../network/services/authService";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = unsubscribeSession((userSession) => {
      setUser(userSession);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const register = async (name, email, password) => {
    await registerUser(name, email, password);
  };

  const sigIn = async (email, password) => {
    await signInUser(email, password);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signOut,
        register,
        sigIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
