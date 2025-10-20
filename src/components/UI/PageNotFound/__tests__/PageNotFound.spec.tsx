import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

import { AuthProvider } from "../../../../contexts/AuthContext/AuthContext";
import { MemberCountProvider } from "../../../../contexts/MemberCountContext/MemberCountContext";
import PageNotFound from "../PageNotFound";

// Mock react-router-dom
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

// Mock the contexts
const mockUseAuth = jest.fn();

jest.mock("../../../../contexts/AuthContext/AuthContext", () => ({
  ...jest.requireActual("../../../../contexts/AuthContext/AuthContext"),
  useAuth: () => mockUseAuth(),
}));

const PageNotFoundWrapper = () => (
  <BrowserRouter>
    <AuthProvider>
      <MemberCountProvider>
        <PageNotFound />
      </MemberCountProvider>
    </AuthProvider>
  </BrowserRouter>
);

describe("PageNotFound Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Component rendering and structure", () => {
    test("Should render 404 and Page Not Found error text", () => {
      mockUseAuth.mockReturnValue({
        isAuthenticated: false,
        login: jest.fn(),
        logout: jest.fn(),
      });

      render(<PageNotFoundWrapper />);

      expect(screen.getByText("404")).toBeInTheDocument();
      expect(screen.getByText("Page Not Found")).toBeInTheDocument();
    });

    test("Should render descriptive error message", () => {
      mockUseAuth.mockReturnValue({
        isAuthenticated: false,
        login: jest.fn(),
        logout: jest.fn(),
      });

      render(<PageNotFoundWrapper />);

      expect(
        screen.getByText(
          /Oops! It looks like this page got lost in the library/
        )
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          /The page you're looking for doesn't exist or has been moved/
        )
      ).toBeInTheDocument();
    });

    test("Should render help text at the bottom of the page", () => {
      mockUseAuth.mockReturnValue({
        isAuthenticated: false,
        login: jest.fn(),
        logout: jest.fn(),
      });

      render(<PageNotFoundWrapper />);

      expect(
        screen.getByText(
          /If you believe this is an error, please check the URL or contact support/
        )
      ).toBeInTheDocument();
    });
  });

  describe("Navigation functionality - handleGoHome function", () => {
    test("Should navigate to /admin when user is authenticated", () => {
      mockUseAuth.mockReturnValue({
        isAuthenticated: true,
        login: jest.fn(),
        logout: jest.fn(),
      });

      render(<PageNotFoundWrapper />);

      const homeButton = screen.getByRole("button", { name: /take me home/i });
      fireEvent.click(homeButton);

      expect(mockNavigate).toHaveBeenCalledWith("/admin");
      expect(mockNavigate).toHaveBeenCalledTimes(1);
    });

    test("Should navigate to /members when user is not authenticated", () => {
      mockUseAuth.mockReturnValue({
        isAuthenticated: false,
        login: jest.fn(),
        logout: jest.fn(),
      });

      render(<PageNotFoundWrapper />);

      const homeButton = screen.getByRole("button", { name: /take me home/i });
      fireEvent.click(homeButton);

      expect(mockNavigate).toHaveBeenCalledWith("/members");
      expect(mockNavigate).toHaveBeenCalledTimes(1);
    });
  });
});
