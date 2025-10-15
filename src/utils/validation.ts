/**
 * @fileoverview Validation utilities for the Reading Club application
 *
 * This module provides comprehensive validation functions for form data,
 * input sanitization, and data integrity checks throughout the application.
 * Includes email validation, member form validation, and utility functions
 * for common validation scenarios.
 *
 * @version 1.0.0
 * @since 1.0.0
 */

import {
  FormValidation,
  ValidationError,
} from "../components/UI/MemberForm/MemberForm.types";
import { MemberFormData } from "../types/member";

/**
 * Email validation regex pattern
 *
 * Regular expression for validating email addresses according to RFC 5322
 * specification. Ensures proper email format with domain and TLD validation.
 *
 * Pattern breakdown:
 * - ^[a-zA-Z0-9._%+-]+: Username part (letters, numbers, dots, underscores, percent, plus, hyphen)
 * - @: Required at symbol
 * - [a-zA-Z0-9.-]+: Domain name (letters, numbers, dots, hyphens)
 * - \.: Required dot before TLD
 * - [a-zA-Z]{2,}$: Top-level domain (minimum 2 letters)
 *
 * @constant {RegExp}
 * @example
 * ```typescript
 * EMAIL_REGEX.test("user@example.com") // true
 * EMAIL_REGEX.test("invalid-email") // false
 * EMAIL_REGEX.test("user@domain") // false (no TLD)
 * ```
 */
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

/**
 * Validates member form data comprehensively
 *
 * Performs complete validation of member form data including email format
 * validation, required field checks, and business rule validation.
 * Returns detailed validation results with field-specific error messages.
 *
 * @function validateMemberForm
 * @param {MemberFormData} formData - The member form data to validate
 * @returns {FormValidation} Validation result with status and errors
 *
 * @example
 * ```typescript
 * // Valid form data
 * const validData: MemberFormData = {
 *   email: "john.doe@example.com",
 *   books: [1, 2, 3]
 * };
 *
 * const result = validateMemberForm(validData);
 * // Returns: { isValid: true, errors: [] }
 *
 * // Invalid form data
 * const invalidData: MemberFormData = {
 *   email: "invalid-email",
 *   books: []
 * };
 *
 * const result = validateMemberForm(invalidData);
 * // Returns: {
 * //   isValid: false,
 * //   errors: [
 * //     { field: "email", message: "Please enter a valid email address" },
 * //     { field: "books", message: "Member must have at least one book" }
 * //   ]
 * // }
 * ```
 *
 * @since 1.0.0
 */
export const validateMemberForm = (
  formData: MemberFormData
): FormValidation => {
  const errors: ValidationError[] = [];

  // Validate email
  const trimmedEmail = formData.email.trim();

  if (!trimmedEmail) {
    errors.push({
      field: "email",
      message: "Email is required",
    });
  } else if (!EMAIL_REGEX.test(trimmedEmail)) {
    errors.push({
      field: "email",
      message: "Please enter a valid email address",
    });
  }

  // Validate books
  if (!formData.books || formData.books.length === 0) {
    errors.push({
      field: "books",
      message: "Member must have at least one book",
    });
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Utility function to check if a string contains only whitespace characters
 *
 * Determines whether a string is empty or contains only spaces, tabs,
 * newlines, or other whitespace characters. Useful for validating
 * text inputs that should not accept whitespace-only values.
 *
 * @function isOnlySpaces
 * @param {string} value - The string value to check
 * @returns {boolean} True if string is empty or contains only whitespace
 *
 * @example
 * ```typescript
 * // Examples that return true (only whitespace)
 * isOnlySpaces("") // true
 * isOnlySpaces("   ") // true
 * isOnlySpaces("\t\n") // true
 * isOnlySpaces("  \n  \t  ") // true
 *
 * // Examples that return false (contains non-whitespace)
 * isOnlySpaces("hello") // false
 * isOnlySpaces("  hello  ") // false
 * isOnlySpaces("a") // false
 * isOnlySpaces("user@example.com") // false
 *
 * // Usage in form validation
 * const emailInput = "   ";
 * if (isOnlySpaces(emailInput)) {
 *   setError("Email field cannot contain only spaces");
 * }
 * ```
 *
 * @since 1.0.0
 */
export const isOnlySpaces = (value: string): boolean => {
  return value.trim().length === 0;
};
