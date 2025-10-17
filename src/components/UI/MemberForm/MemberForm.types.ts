import { Member, MemberFormData } from "../../../types/member";

/**
 * @interface MemberFormProps
 * @description Props interface for MemberForm component
 */
export interface MemberFormProps {
  /** Whether the form dialog is open */
  open: boolean;
  /** Callback when the dialog is closed */
  onClose: () => void;
  /** Callback when form is submitted */
  onSubmit: (formData: MemberFormData) => Promise<void>;
  /** Member data for edit mode */
  member?: Member | null;
  /** Form operation mode (add or edit) */
  mode: "add" | "edit";
}

/**
 * @interface ValidationError
 * @description Interface for validation error
 */
export interface ValidationError {
  /** Form field with validation error */
  field: string;
  /** Validation error message */
  message: string;
}

/**
 * @interface FormValidation
 * @description Interface for form validation result
 */
export interface FormValidation {
  /** Whether validation passed */
  isValid: boolean;
  /** Array of validation errors */
  errors: ValidationError[];
}
