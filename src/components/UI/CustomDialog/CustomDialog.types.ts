import { ReactNode } from "react";
import { Breakpoint } from "@mui/material/styles";

/**
 * @interface CustomDialogProps
 * @description Props interface for the unified CustomDialog component
 * Supports different dialog variants: confirmation, content, and custom
 */
export interface CustomDialogProps {
  /** Main content of the dialog */
  children?: ReactNode;
  /** Text for the close button */
  closeText?: string;
  /** Whether to disable escape key down when in loading state */
  disableEscapeKeyDown?: boolean;
  /** Custom footer content */
  footerContent?: ReactNode;
  /** Whether the dialog should use full width */
  fullWidth?: boolean;
  /** Custom header content (overrides default header) */
  headerContent?: ReactNode;
  /** Loading state for the dialog */
  loading?: boolean;
  /** Maximum width of the dialog (Material-UI breakpoints) */
  maxWidth?: Breakpoint;
  /** Callback function called when the dialog should be closed */
  onClose: () => void;
  /** Controls whether the dialog is open or closed */
  open: boolean;
  /** Whether to show close button in header */
  showCloseButton?: boolean;
  /** Whether to show default close button in footer */
  showCloseInFooter?: boolean;
  /** Title to display in the dialog header */
  title?: string;
  /** Dialog variant type */
  variant?: "confirmation" | "content" | "custom";
}

/**
 * @interface ConfirmationDialogProps
 * @description Extended props for confirmation dialog variant
 */
export interface ConfirmationDialogProps extends CustomDialogProps {
  variant: "confirmation";
  /** Text for the cancel button */
  cancelText?: string;
  /** Color of the confirmation button */
  confirmColor?:
    | "inherit"
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning";
  /** Text for the confirmation button */
  confirmText?: string;
  /** Variant of the confirmation button */
  confirmVariant?: "text" | "outlined" | "contained";
  /** Icon to display in the header */
  headerIcon?: ReactNode;
  /** Main message or question to display in the dialog content */
  message: string;
  /** Callback function called when the user confirms the action */
  onConfirm: () => void;
}

/**
 * @interface ContentDialogProps
 * @description Extended props for content dialog variant
 */
export interface ContentDialogProps extends CustomDialogProps {
  variant: "content";
  /** Subtitle or additional header information */
  subtitle?: string;
}

export type UnifiedDialogProps =
  | CustomDialogProps
  | ConfirmationDialogProps
  | ContentDialogProps;
