/**
 * @fileoverview Type definitions for MemberForm component
 *
 * This module provides TypeScript interfaces for the MemberForm dialog component,
 * including props for form handling, validation error structures, and form
 * validation results.
 *
 * @version 1.0.0
 * @since 1.0.0
 */
import { Member, MemberFormData } from "../../../types/member";

/**
 * Props interface for MemberForm component
 *
 * Defines the properties required for the member form dialog,
 * supporting both add and edit modes with proper form handling
 * and submission callbacks.
 *
 * @interface MemberFormProps
 */
export interface MemberFormProps {
  /**
   * Controls whether the form dialog is open or closed
   */
  open: boolean;

  /**
   * Callback function called when the dialog should be closed
   *
   * Triggered by close button, backdrop click, or escape key.
   * Should update the parent component's state to close the dialog.
   */
  onClose: () => void;

  /**
   * Async callback function called when form is submitted
   *
   * Receives the validated form data and should handle the creation
   * or update of the member
   *
   * @param formData - Validated member form data
   * @returns Promise that resolves when submission is complete
   */
  onSubmit: (formData: MemberFormData) => Promise<void>;

  /**
   * Optional member data for edit mode
   *
   * When provided, the form will be pre-filled with the member's
   * existing data for editing. Should be null or undefined for
   * add mode.
   *
   * @default null
   */
  member?: Member | null;

  /**
   * Form operation mode
   *
   * Determines whether the form is being used to add a new member
   * or edit an existing one.
   *
   * @example "add" for creating new member, "edit" for updating existing
   */
  mode: "add" | "edit";
}

/**
 * Validation error structure for form fields
 *
 * Represents a single validation error for a specific form field,
 * providing both the field identifier and human-readable error message.
 * Used to display field-specific validation feedback to users.
 *
 * @interface ValidationError
 *
 * @since 1.0.0
 */
export interface ValidationError {
  /**
   * The form field that has the validation error
   */
  field: string;

  /**
   * Human-readable error message
   *
   * Descriptive message explaining the validation failure
   */
  message: string;
}

/**
 * Form validation result structure
 *
 * Contains the overall validation status and any validation errors
 * found during form validation. Used to determine if form submission
 * should proceed and what error messages to display.
 *
 * @interface FormValidation
 */
export interface FormValidation {
  /**
   * Overall validation status
   *
   * True if all form fields pass validation and form can be submitted,
   * false if any validation errors exist.
   */
  isValid: boolean;

  /**
   * Array of validation errors
   *
   * Contains all validation errors found during form validation.
   * Empty array if no errors exist.
   *
   */
  errors: ValidationError[];
}
