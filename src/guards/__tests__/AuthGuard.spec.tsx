import React, { FC, ReactNode } from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";

import AuthGuard from "../AuthGuard";
import { AuthProvider } from "../../contexts/AuthContext/AuthContext";
import { MemberCountProvider } from "../../contexts/MemberCountContext/MemberCountContext";

// Mock the contexts
const mockUseAuth = jest.fn();

jest.mock("../../contexts/AuthContext/AuthContext", () => ({
  ...jest.requireActual("../../contexts/AuthContext/AuthContext"),
  useAuth: () => mockUseAuth(),
}));

const AuthGuardWrapper: FC<{
  children: ReactNode;
  initialEntries?: string[];
}> = ({ children, initialEntries = ["/"] }) => (
  <MemoryRouter initialEntries={initialEntries}>
    <AuthProvider>
      <MemberCountProvider>{children}</MemberCountProvider>
    </AuthProvider>
  </MemoryRouter>
);

const MockProtectedComponent: FC = () => <div>Protected Content</div>;

describe("Auth Guard", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Authentication state changes", () => {
    test("Should redirect to custom path when redirectTo prop is provided", () => {
      mockUseAuth.mockReturnValue({
        isAuthenticated: false,
        login: jest.fn(),
        logout: jest.fn(),
      });

      render(
        <AuthGuardWrapper initialEntries={["/admin"]}>
          <AuthGuard redirectTo="/login">
            <MockProtectedComponent />
          </AuthGuard>
        </AuthGuardWrapper>
      );

      // Protected content should not be rendered
      expect(screen.queryByText("Protected Content")).not.toBeInTheDocument();
    });
    test("Should render content when authentication state changes from false to true", () => {
      // Start with unauthenticated state
      mockUseAuth.mockReturnValue({
        isAuthenticated: false,
        login: jest.fn(),
        logout: jest.fn(),
      });

      const { rerender } = render(
        <AuthGuardWrapper>
          <AuthGuard>
            <MockProtectedComponent />
          </AuthGuard>
        </AuthGuardWrapper>
      );

      // Initially should not render protected content
      expect(screen.queryByText("Protected Content")).not.toBeInTheDocument();

      // Change to authenticated state
      mockUseAuth.mockReturnValue({
        isAuthenticated: true,
        login: jest.fn(),
        logout: jest.fn(),
      });

      // Re-render with new authentication state
      rerender(
        <AuthGuardWrapper>
          <AuthGuard>
            <MockProtectedComponent />
          </AuthGuard>
        </AuthGuardWrapper>
      );

      // Now should render protected content
      expect(screen.getByText("Protected Content")).toBeInTheDocument();
    });

    test("Should not render content when authentication state changes from true to false", () => {
      // Start with authenticated state
      mockUseAuth.mockReturnValue({
        isAuthenticated: true,
        login: jest.fn(),
        logout: jest.fn(),
      });

      const { rerender } = render(
        <AuthGuardWrapper>
          <AuthGuard>
            <MockProtectedComponent />
          </AuthGuard>
        </AuthGuardWrapper>
      );

      // Initially should render protected content
      expect(screen.getByText("Protected Content")).toBeInTheDocument();

      // Change to unauthenticated state
      mockUseAuth.mockReturnValue({
        isAuthenticated: false,
        login: jest.fn(),
        logout: jest.fn(),
      });

      // Re-render with new authentication state
      rerender(
        <AuthGuardWrapper>
          <AuthGuard>
            <MockProtectedComponent />
          </AuthGuard>
        </AuthGuardWrapper>
      );

      // Now should not render protected content
      expect(screen.queryByText("Protected Content")).not.toBeInTheDocument();
    });
  });
});
