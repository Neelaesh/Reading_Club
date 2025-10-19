/**
 * @interface DeleteConfirmationDialogProps
 * @description Props interface for the DeleteConfirmationDialog component
 */
export interface DeleteConfirmationDialogProps {
  /** Controls whether the dialog is open or closed */
  open: boolean;
  /** Callback function called when the dialog should be closed */
  onClose: () => void;
  /** Callback function called when the user confirms the deletion */
  onConfirm: () => void;
  /** Title to display in the dialog header */
  title: string;
  /** Main message or question to display in the dialog content */
  message: string;
  /** Text for the confirm button */
  confirmText: string;
  /** Text for the cancel button */
  cancelText: string;
  /** Color variant for the confirm button */
  confirmColor?:
    | "primary"
    | "secondary"
    | "error"
    | "warning"
    | "info"
    | "success";
  /** Whether the confirm button should have a filled variant */
  confirmVariant?: "text" | "outlined" | "contained";
  /** Loading state for the confirm action */
  loading?: boolean;
  /** Maximum width of the dialog (Material-UI breakpoints) */
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl" | false;
}
