import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import TextInput from "../TextInput";

// Mock functions
const mockOnChange = jest.fn();
const mockOnValidationChange = jest.fn();

describe("Text Input Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Validation", () => {
    test("Should allow valid characters in email input", async () => {
      const user = userEvent.setup();

      render(
        <TextInput
          label="Email"
          type="email"
          value=""
          onChange={mockOnChange}
          onValidationChange={mockOnValidationChange}
        />
      );

      const input = screen.getByLabelText("Email");

      // Type valid email characters
      await user.type(input, "test@example.com");

      // onChange should be called for each valid character
      expect(mockOnChange).toHaveBeenCalled();
    });

    test("Should call onValidationChange with false for incomplete email", async () => {
      const user = userEvent.setup();

      render(
        <TextInput
          label="Email"
          type="email"
          value=""
          onChange={mockOnChange}
          onValidationChange={mockOnValidationChange}
        />
      );

      const input = screen.getByLabelText("Email");

      // Type an incomplete email
      await user.type(input, "test@");

      // onValidationChange should be called with false for incomplete email
      await waitFor(() => {
        expect(mockOnValidationChange).toHaveBeenCalledWith(false);
      });
    });

    test("Should allow all characters for non-email input types", async () => {
      const user = userEvent.setup();

      render(
        <TextInput
          label="Text Input"
          type="text"
          value=""
          onChange={mockOnChange}
        />
      );

      const input = screen.getByLabelText("Text Input");

      // Type various characters including spaces and special chars
      await user.type(input, "Hello World! @#$%");

      // All characters should be allowed for non-email inputs
      expect(mockOnChange).toHaveBeenCalled();
    });

    test("Should not call onValidationChange when callback is not provided", async () => {
      const user = userEvent.setup();

      render(
        <TextInput
          label="Email"
          type="email"
          value=""
          onChange={mockOnChange}
        />
      );

      const input = screen.getByLabelText("Email");

      // Type a valid email without onValidationChange prop
      await user.type(input, "test@example.com");

      // Should not throw error and should still call onChange
      expect(mockOnChange).toHaveBeenCalled();
      expect(mockOnValidationChange).not.toHaveBeenCalled();
    });
  });

  describe("Props and Styling", () => {
    test("Should disable input when disabled prop is set to true", () => {
      render(
        <TextInput
          label="Disabled Test"
          value=""
          onChange={mockOnChange}
          disabled={true}
        />
      );

      const input = screen.getByLabelText("Disabled Test");
      expect(input).toBeDisabled();
    });

    test("Should render with Text Input with required set to true", () => {
      render(
        <TextInput
          autoFocus={true}
          disabled={true}
          error={true}
          fullWidth={false}
          helperText="Custom helper text"
          label="Custom Label"
          onChange={mockOnChange}
          placeholder="Custom placeholder"
          required={true}
          type="password"
          value="test value"
          variant="filled"
        />
      );

      const input = screen.getByLabelText("Custom Label *");
      expect(input).toHaveAttribute("type", "password");
      expect(input).toHaveValue("test value");
      expect(input).toBeDisabled();
      expect(input).toHaveAttribute("placeholder", "Custom placeholder");
      expect(input).toBeRequired();
      expect(screen.getByText("Custom helper text")).toBeInTheDocument();
    });
  });
});
