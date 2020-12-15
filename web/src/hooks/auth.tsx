import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from "react";

import api, { setAuthorization } from "services/api";

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  token: string | null;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [token, setToken] = useState(() => {
    const storagedToken = localStorage.getItem("@Crypto:token");

    if (storagedToken) {
      return storagedToken;
    }
    return null;
  });

  const signIn = useCallback(async ({ email, password }) => {
    const reseponse = await api.post(`login`, { email, password });
    const { token: responseToken } = reseponse.data;

    localStorage.setItem("@Crypto:token", responseToken);

    setToken(responseToken);
  }, []);

  useEffect(() => {
    setAuthorization(token);
  }, [token]);

  const signOut = useCallback(() => {
    localStorage.removeItem("@Crypto:token");

    setToken(null);
  }, []);

  return (
    <AuthContext.Provider value={{ token, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}

export { AuthProvider, useAuth };
