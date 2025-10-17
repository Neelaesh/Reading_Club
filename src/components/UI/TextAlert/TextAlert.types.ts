import { ReactNode } from "react";

/**
 * @type Severity levels
 * @typedef {("Info" | "Error" | "Success" | "Warning")} SeverityType
 * @description Defines the severity levels for alerts
 */
type SeverityType = "Info" | "Error" | "Success" | "Warning";

/**
 * @interface TextAlertProps
 * @description Props interface for TextAlert component
 */
export interface TextAlertProps {
  /** Optional React children elements */
  children?: ReactNode;
  /** Callback when the alert is closed */
  onClose?: () => void;
  /** Operation mode (add or edit) */
  mode?: "add" | "edit";
  /** Alert severity level */
  severity: SeverityType;
  /** Whether the alert is visible */
  show: boolean;
  /** Alert message text */
  text: string | null;
}
