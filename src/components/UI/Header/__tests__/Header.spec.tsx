import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import Header from "../Header";
import { AuthProvider } from "../../../../contexts/AuthContext/AuthContext";
import { MemberCountProvider } from "../../../../contexts/MemberCountContext/MemberCountContext";

// Mock the contexts
const mockLogin = jest.fn();
const mockLogout = jest.fn();
const mockUseAuth = jest.fn();
const mockUseMemberCount = jest.fn();

jest.mock("../../../../contexts/AuthContext/AuthContext", () => ({
  ...jest.requireActual("../../../../contexts/AuthContext/AuthContext"),
  useAuth: () => mockUseAuth(),
}));

jest.mock("../../../../contexts/MemberCountContext/MemberCountContext", () => ({
  ...jest.requireActual(
    "../../../../contexts/MemberCountContext/MemberCountContext"
  ),
  useMemberCount: () => mockUseMemberCount(),
}));

const HeaderWrapper = () => (
  <AuthProvider>
    <MemberCountProvider>
      <Header />
    </MemberCountProvider>
  </AuthProvider>
);

describe("Header Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Set default mock return values
    mockUseMemberCount.mockReturnValue({
      memberCount: 5,
      loading: false,
    });
  });

  test("Should call logout function when authenticated user clicks on logout button", () => {
    // Mock authenticated state
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      login: mockLogin,
      logout: mockLogout,
    });

    render(<HeaderWrapper />);

    // Find and click the auth button (should show "Logout" when authenticated)
    const authButton = screen.getByRole("button", { name: /logout/i });
    fireEvent.click(authButton);

    // Verify logout was called
    expect(mockLogout).toHaveBeenCalledTimes(1);
    expect(mockLogin).not.toHaveBeenCalled();
  });

  test("Should call login function when user clicks on login button", () => {
    // Mock unauthenticated state
    mockUseAuth.mockReturnValue({
      isAuthenticated: false,
      login: mockLogin,
      logout: mockLogout,
    });

    render(<HeaderWrapper />);

    // Find and click the auth button (should show "Login" when not authenticated)
    const authButton = screen.getByRole("button", { name: /login/i });
    fireEvent.click(authButton);

    // Verify login was called
    expect(mockLogin).toHaveBeenCalledTimes(1);
    expect(mockLogout).not.toHaveBeenCalled();
  });
});
