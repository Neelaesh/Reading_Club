import React, { FC } from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { AuthProvider, useAuth } from "../AuthContext";

// Test component that uses the auth context
const ComponentWithProvider: FC = () => {
  const { isAuthenticated, login, logout } = useAuth();

  return (
    <div>
      <span data-testid="auth-status">
        {isAuthenticated ? "authenticated" : "not-authenticated"}
      </span>
      <button data-testid="login-btn" onClick={login}>
        Login
      </button>
      <button data-testid="logout-btn" onClick={logout}>
        Logout
      </button>
    </div>
  );
};

// Test component without provider to test error case
const ComponentWithoutProvider: FC = () => {
  const context = useAuth();
  return <div>{context.isAuthenticated}</div>;
};

describe("Auth Context", () => {
  // Mock sessionStorage
  const mockSessionStorage = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
  };

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
    // Mock sessionStorage
    Object.defineProperty(window, "sessionStorage", {
      value: mockSessionStorage,
      writable: true,
    });
    // Suppress console.error for error handling tests
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  /* afterEach(() => {
    jest.restoreAllMocks();
  }); */

  describe("useAuth hook", () => {
    test("Should throw error when used outside provider", () => {
      // Suppress React error boundary warnings for this test
      const originalError = console.error;
      console.error = jest.fn();

      expect(() => {
        render(<ComponentWithoutProvider />);
      }).toThrow("useAuth must be used within an AuthProvider");

      console.error = originalError;
    });
  });

  describe("Authentication operations", () => {
    describe("Login and Logout sequence", () => {
      test("Should handle Login -> Logout -> Login sequence", () => {
        mockSessionStorage.getItem.mockReturnValue(null);

        render(
          <AuthProvider>
            <ComponentWithProvider />
          </AuthProvider>
        );

        // Initial state
        expect(screen.getByTestId("auth-status")).toHaveTextContent(
          "not-authenticated"
        );

        // Login
        act(() => {
          fireEvent.click(screen.getByTestId("login-btn"));
        });

        expect(screen.getByTestId("auth-status")).toHaveTextContent(
          "authenticated"
        );
        expect(mockSessionStorage.setItem).toHaveBeenCalledWith(
          "reading-club-auth",
          "true"
        );

        // Logout
        act(() => {
          fireEvent.click(screen.getByTestId("logout-btn"));
        });

        expect(screen.getByTestId("auth-status")).toHaveTextContent(
          "not-authenticated"
        );
        expect(mockSessionStorage.removeItem).toHaveBeenCalledWith(
          "reading-club-auth"
        );

        // Login again
        act(() => {
          fireEvent.click(screen.getByTestId("login-btn"));
        });

        expect(screen.getByTestId("auth-status")).toHaveTextContent(
          "authenticated"
        );
        expect(mockSessionStorage.setItem).toHaveBeenCalledTimes(2);
      });

      test("Should handle Logout -> Login -> Logout sequence", () => {
        mockSessionStorage.getItem.mockReturnValue("true");

        render(
          <AuthProvider>
            <ComponentWithProvider />
          </AuthProvider>
        );

        // Initial state (authenticated from sessionStorage)
        expect(screen.getByTestId("auth-status")).toHaveTextContent(
          "authenticated"
        );

        // Logout
        act(() => {
          fireEvent.click(screen.getByTestId("logout-btn"));
        });

        expect(screen.getByTestId("auth-status")).toHaveTextContent(
          "not-authenticated"
        );
        expect(mockSessionStorage.removeItem).toHaveBeenCalledWith(
          "reading-club-auth"
        );

        // Login
        act(() => {
          fireEvent.click(screen.getByTestId("login-btn"));
        });

        expect(screen.getByTestId("auth-status")).toHaveTextContent(
          "authenticated"
        );
        expect(mockSessionStorage.setItem).toHaveBeenCalledWith(
          "reading-club-auth",
          "true"
        );

        // Logout again
        act(() => {
          fireEvent.click(screen.getByTestId("logout-btn"));
        });

        expect(screen.getByTestId("auth-status")).toHaveTextContent(
          "not-authenticated"
        );
        expect(mockSessionStorage.removeItem).toHaveBeenCalledTimes(2);
      });
    });
  });
});
