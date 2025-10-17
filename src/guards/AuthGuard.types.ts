import { ReactNode } from "react";

/**
 * Props interface for AuthGuard component
 * @interface AuthGuardProps
 */
export interface AuthGuardProps {
  /** Child components to render if authenticated */
  children: ReactNode;
  /** Optional redirect path for unauthorized users */
  redirectTo?: string;
}
