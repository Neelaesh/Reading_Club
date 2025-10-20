import React, { FC } from "react";

import CustomDialog from "../CustomDialog";
import { DeleteConfirmationDialogProps } from "./DeleteConfirmationDialog.types";

/**
 * @component DeleteConfirmationDialog
 * @description Reusable confirmation dialog component for deletion action
 * Uses the unified CustomDialog component with confirmation variant
 * @param props - DeleteConfirmationDialogProps containing dialog configuration
 * @returns JSX element representing the confirmation dialog
 */
const DeleteConfirmationDialog: FC<DeleteConfirmationDialogProps> = ({
  open,
  onClose,
  onConfirm,
  title = "Confirm Action",
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmColor = "error",
  confirmVariant = "contained",
  loading = false,
  maxWidth = "xs",
}) => {
  return (
    <CustomDialog
      open={open}
      onClose={onClose}
      onConfirm={onConfirm}
      title={title}
      message={message}
      confirmText={confirmText}
      cancelText={cancelText}
      confirmColor={confirmColor}
      confirmVariant={confirmVariant}
      loading={loading}
      maxWidth={maxWidth === false ? "xs" : maxWidth}
      variant="confirmation"
      disableEscapeKeyDown={loading}
      showCloseButton={false}
      showCloseInFooter={false}
    />
  );
};

export default DeleteConfirmationDialog;
