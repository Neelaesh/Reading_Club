import { TextFieldProps } from "@mui/material/TextField";

/**
 * @interface TextInputProps
 * @description Props interface for TextInput component
 */
export interface TextInputProps extends Omit<TextFieldProps, "variant"> {
  /** Label text for the input field */
  label: string;
  /** Input type (e.g. text, email, password) */
  type?: string;
  /** Current value of the input field */
  value: string;
  /** Callback when input value changes */
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /** Whether the input is disabled */
  disabled?: boolean;
  /** Whether the input should take full width */
  fullWidth?: boolean;
  /** Variant style for the TextField */
  variant?: "outlined" | "filled" | "standard";
  /** Helper text displayed below the input */
  helperText?: string;
  /** Whether the input should auto-focus on mount */
  autoFocus?: boolean;
  /** Whether the input has an error state */
  error?: boolean;
  /** Whether the input is required */
  required?: boolean;
  /** Placeholder text shown when input is empty */
  placeholder?: string;
  /** Callback when validation status changes */
  onValidationChange?: (isValid: boolean) => void;
}
