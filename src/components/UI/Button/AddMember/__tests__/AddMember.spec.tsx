import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import AddMember from "../AddMember";
import { applicationTheme } from "../../../../../theme/applicationTheme";

// Mock the auth context
const mockUseAuth = jest.fn();
jest.mock("../../../../../contexts/AuthContext/AuthContext", () => ({
  useAuth: () => mockUseAuth(),
}));

describe("Add Member", () => {
  const mockOnAddMember = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = () => {
    return render(
      <ThemeProvider theme={applicationTheme}>
        <AddMember onAddMember={mockOnAddMember} />
      </ThemeProvider>
    );
  };

  describe("User Authentication", () => {
    beforeEach(() => {
      mockUseAuth.mockReturnValue({ isAuthenticated: true });
    });

    test("Should render the add member button", () => {
      renderComponent();
      const button = screen.getByLabelText("Add member");
      expect(button).toBeInTheDocument();
    });

    test("Should call onAddMember when button is clicked", () => {
      renderComponent();
      const button = screen.getByLabelText("Add member");
      fireEvent.click(button);
      expect(mockOnAddMember).toHaveBeenCalledTimes(1);
    });
  });

  describe("User is not authenticated", () => {
    beforeEach(() => {
      mockUseAuth.mockReturnValue({ isAuthenticated: false });
    });

    test("Should not render the add member button", () => {
      renderComponent();
      const button = screen.queryByLabelText("Add member");
      expect(button).not.toBeInTheDocument();
    });
  });
});
