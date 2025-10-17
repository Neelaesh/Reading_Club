import React, {
  createContext,
  FC,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";

import { AuthContextType } from "../../types/authContext";
import { AuthProviderProps } from "./AuthContext.types";

/**
 * @constant AuthContext
 * @description React context for managing authentication state throughout the application.
 * Provides centralized authentication state management and actions for login/logout operations.
 */
const AuthContext = createContext<AuthContextType | null>(null);

/**
 * @component AuthProvider
 * @description Provider component that manages authentication state and provides authentication
 * actions to child components. Handles session persistence using sessionStorage and provides
 * login/logout functionality with automatic state restoration on app initialization.
 * @param children - Child components that will have access to the authentication context
 */
export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  /** Authentication state indicating if user is currently logged in */
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  /**
   * @effect initializeAuthState
   * @description Initializes authentication state on component mount by checking
   * for previously saved authentication state in sessionStorage. Automatically
   * restores user session if they were previously logged in.
   */
  useEffect(() => {
    // Check if user was previously logged in
    const savedAuthState = sessionStorage.getItem("reading-club-auth");
    if (savedAuthState === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  /**
   * @function login
   * @description Authenticates the user and updates the authentication state.
   * Sets the user as authenticated and persists the session state to sessionStorage
   * for automatic restoration on subsequent app visits.
   */
  const login = () => {
    setIsAuthenticated(true);
    sessionStorage.setItem("reading-club-auth", "true");
  };

  /**
   * @function logout
   * @description Logs out the user and clears authentication state.
   * Sets the user as unauthenticated and removes the session data from
   * sessionStorage to ensure clean logout state.
   */
  const logout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("reading-club-auth");
  };

  /**
   * @constant memoizedAuthContextValue
   * @description Memoized context value to prevent unnecessary re-renders of child components.
   * Only updates when authentication state changes, optimizing performance by avoiding
   * context value recreation on every render when dependencies haven't changed.
   */
  const memoizedAuthContextValue = useMemo(
    () => ({
      isAuthenticated,
      login,
      logout,
    }),
    [isAuthenticated]
  );

  return (
    <AuthContext.Provider value={memoizedAuthContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * @hook useAuth
 * @description Custom hook for accessing authentication context throughout the application.
 * Provides authentication state and actions (login/logout) to components. Includes
 * safety check to ensure hook is used within AuthProvider component tree.
 * @returns {AuthContextType} Authentication context containing isAuthenticated state and login/logout functions
 * @throws {Error} Throws error if used outside of AuthProvider component tree
 */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
