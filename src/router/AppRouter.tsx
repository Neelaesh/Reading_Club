import React, { FC } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import AuthGuard from "../guards/AuthGuard";
import { Members } from "../components/Members";
import { PageNotFound } from "../components/UI/PageNotFound";
import { useAuth } from "../contexts/AuthContext/AuthContext";
//import CircularProgress from "@mui/material/CircularProgress";

/**
 * @component Handle root route redirection based on authentication status
 */
const RootRedirect: FC = () => {
  const { isAuthenticated } = useAuth();

  // If authenticated, redirect to admin; otherwise redirect to members
  return <Navigate to={isAuthenticated ? "/admin" : "/members"} replace />;
};

/**
 * @component
 * @description Defines all application routes with proper authentication guards and fallback routes
 */
const AppRouter: FC = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/members" element={<Members />} />

      {/* Protected admin routes */}
      <Route
        path="/admin"
        element={
          <AuthGuard redirectTo="/members">
            {/* For now, render Members component with admin features */}
            <Members />
          </AuthGuard>
        }
      />

      {/* Root route - redirect based on authentication status */}
      <Route path="/" element={<RootRedirect />} />

      {/* Catch all - show 404 page for invalid routes */}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default AppRouter;
