import React, { FC } from "react";
import { Navigate } from "react-router-dom";

import { AuthGuardProps } from "./AuthGuard.types";
import { useAuth } from "../contexts/AuthContext/AuthContext";

/**
 * @component
 * @description Authentication guard component for protected routes
 */
const AuthGuard: FC<AuthGuardProps> = ({
  children,
  redirectTo = "/members",
}) => {
  const { isAuthenticated } = useAuth();

  // Redirect to specified path if not authenticated
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  // Render protected content if authenticated
  return <>{children}</>;
};

export default AuthGuard;
