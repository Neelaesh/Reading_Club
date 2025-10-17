import React, {
  createContext,
  FC,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";

import { AuthContextType } from "../../types/authContext";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    // Check if user was previously logged in
    const savedAuthState = sessionStorage.getItem("reading-club-auth");
    if (savedAuthState === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const login = () => {
    setIsAuthenticated(true);
    sessionStorage.setItem("reading-club-auth", "true");
  };

  const logout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("reading-club-auth");
  };

  const value: AuthContextType = {
    isAuthenticated,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
