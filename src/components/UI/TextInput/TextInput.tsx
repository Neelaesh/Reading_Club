/**
 * @fileoverview Reusable TextInput component with Material-UI TextField
 *
 * A standardized text input component that wraps Material-UI TextField
 * with consistent styling and common functionality for form inputs
 * throughout the Reading Club application.
 *
 * @version 1.0.0
 * @since 1.0.0
 */

import React, { FC } from "react";
import TextField from "@mui/material/TextField";
import { TextInputProps } from "./TextInput.types";

/**
 * TextInput component for consistent form inputs
 *
 * Provides a standardized text input with Material-UI TextField as the base,
 * including common props and styling patterns used across the application.
 * Helper text is automatically styled in red when error state is true.
 * For email type inputs, validates against allowed characters to prevent
 * invalid characters from being typed.
 *
 * @component
 * @example
 * ```tsx
 * <TextInput
 *   label="Email"
 *   type="email"
 *   value={email}
 *   onChange={handleEmailChange}
 *   disabled={isLoading}
 *   helperText="Enter a valid email address"
 *   error={hasError}
 *   autoFocus
 * />
 * ```
 *
 * @param props - TextInput component props
 * @returns JSX element representing the text input field
 *
 * @since 1.0.0
 */
export const TextInput: FC<TextInputProps> = ({
  label,
  type = "text",
  value,
  onChange,
  disabled = false,
  fullWidth = true,
  variant = "outlined",
  helperText,
  autoFocus = false,
  error = false,
  required = false,
  placeholder,
  onValidationChange,
  ...otherProps
}) => {
  /**
   * Handle input change with validation for email type
   *
   * For email inputs, validates against regex pattern to prevent
   * invalid characters from being typed. Only allows characters
   * that are valid for email addresses.
   *
   * @param event - The change event from the input element
   */
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;

    // Email validation regex - only allow valid email characters
    const emailRegex = /^[a-zA-Z0-9@._-]*$/;

    // If it's an email type input, validate against regex
    if (type === "email") {
      if (emailRegex.test(inputValue)) {
        // Valid characters, call the original onChange
        onChange(event);

        // Check if it's a complete valid email format
        const fullEmailRegex =
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const isValidEmail = fullEmailRegex.test(inputValue);

        // Call validation callback if provided
        if (onValidationChange) {
          // Pass validation status to parent
          onValidationChange(isValidEmail);
        }
      }
      // If invalid characters, don't call onChange (prevents typing)
      return;
    }

    // For non-email inputs, call onChange normally
    onChange(event);
  };

  return (
    <TextField
      label={label}
      type={type}
      value={value}
      onChange={handleInputChange}
      disabled={disabled}
      fullWidth={fullWidth}
      variant={variant}
      helperText={helperText}
      autoFocus={autoFocus}
      error={error}
      required={required}
      placeholder={placeholder}
      slotProps={{
        formHelperText: {
          sx: {
            color: error ? "error.main" : "text.secondary",
            fontSize: "0.75rem",
            marginTop: 1,
            marginLeft: 0,
          },
        },
      }}
      {...otherProps}
    />
  );
};

export default TextInput;
