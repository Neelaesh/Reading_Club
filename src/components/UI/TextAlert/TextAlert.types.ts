/**
 * @fileoverview Type definitions for TextAlert component
 *
 * This file contains TypeScript type definitions for the TextAlert component
 * and related exports.
 *
 * @author Reading Club Development Team
 * @since 1.0.0
 * @version 1.1.0
 */

import { ReactNode } from "react";

/**
 * Union type defining the available alert severity levels
 *
 * @typedef {string} SeverityType
 */
type SeverityType = "Info" | "Error" | "Success" | "Warning";

/**
 * Props interface for the TextAlert component
 *
 * Defines the required properties for displaying contextual alert messages
 * with different severity levels.
 *
 * @interface TextAlertProps
 */
export interface TextAlertProps {
  /** Controls the visibility of the alert component */
  show: boolean;
  /** The message text to display in the alert */
  text: string;
  /** The severity level of the alert */
  severity: SeverityType;
  /** Optional React children elements */
  children?: ReactNode;
}
