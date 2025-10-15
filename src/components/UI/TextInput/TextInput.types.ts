/**
 * @fileoverview Type definitions for TextInput component
 *
 * Defines the props interface for the TextInput component,
 * extending Material-UI TextField props for consistency.
 *
 * @version 1.0.0
 * @since 1.0.0
 */

import { TextFieldProps } from "@mui/material/TextField";

/**
 * Props interface for TextInput component
 *
 * Extends Material-UI TextFieldProps to ensure compatibility
 * while providing specific customizations for the Reading Club application.
 *
 * @interface TextInputProps
 * @extends Omit<TextFieldProps, 'variant'>
 *
 * @example
 * ```tsx
 * const textInputProps: TextInputProps = {
 *   label: "Email",
 *   type: "email",
 *   value: email,
 *   onChange: handleEmailChange,
 *   disabled: isLoading,
 *   helperText: "Enter a valid email address"
 * };
 * ```
 *
 * @since 1.0.0
 */
export interface TextInputProps extends Omit<TextFieldProps, "variant"> {
  /**
   * The label text for the input field
   *
   * @example "Email Address", "Full Name", "Phone Number"
   */
  label: string;

  /**
   * The input type (text, email, password, etc.)
   *
   * @default "text"
   * @example "email", "password", "tel", "url"
   */
  type?: string;

  /**
   * Current value of the input field
   *
   * @example "john.doe@example.com"
   */
  value: string;

  /**
   * Callback function called when input value changes
   *
   * @param event - The change event from the input element
   * @example (event) => setEmail(event.target.value)
   */
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;

  /**
   * Whether the input is disabled
   *
   * @default false
   * @example true when form is submitting or in read-only mode
   */
  disabled?: boolean;

  /**
   * Whether the input should take full width of container
   *
   * @default true
   * @example false for inline inputs
   */
  fullWidth?: boolean;

  /**
   * The variant style for the TextField
   *
   * @default "outlined"
   * @example "filled", "standard"
   */
  variant?: "outlined" | "filled" | "standard";

  /**
   * Helper text displayed below the input
   *
   * @example "This field is required", "Enter a valid email"
   */
  helperText?: string;

  /**
   * Whether the input should auto-focus on mount
   *
   * @default false
   * @example true for first input in a form
   */
  autoFocus?: boolean;

  /**
   * Whether the input has an error state
   *
   * @default false
   * @example true when validation fails
   */
  error?: boolean;

  /**
   * Whether the input is required
   *
   * @default false
   * @example true for mandatory fields
   */
  required?: boolean;

  /**
   * Placeholder text shown when input is empty
   *
   * @example "Enter your email address"
   */
  placeholder?: string;

  /**
   * Callback function called when validation status changes (for email inputs)
   *
   * @param isValid - Whether the current input passes validation
   * @example (isValid) => setEmailValid(isValid)
   */
  onValidationChange?: (isValid: boolean) => void;
}
