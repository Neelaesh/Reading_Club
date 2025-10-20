import React, { ChangeEvent, FC } from "react";
import { TextInputProps } from "./TextInput.types";
import { StyledTextField } from "./TextInput.styles";

/**
 * @component
 * @description TextInput component for handling user text input with validation
 * @param props - Component props as defined in TextInputProps
 * @returns JSX element representing a Material-UI TextField with custom validation
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
   * @function handleInputChange
   * @description Handle input change with validation for email type.
   * For email inputs, validates against regex pattern to prevent
   * invalid characters from being typed and provides real-time validation feedback.
   * @param event - The change event from the input element
   */
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
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
    <StyledTextField
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
      {...otherProps}
    />
  );
};

export default TextInput;
