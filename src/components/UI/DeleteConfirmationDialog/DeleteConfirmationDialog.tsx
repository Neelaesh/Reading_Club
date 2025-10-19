import React, { FC } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

import { DeleteConfirmationDialogProps } from "./DeleteConfirmationDialog.types";

/**
 * @component DeleteConfirmationDialog
 * @description Reusable confirmation dialog component for deletion action
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
  /**
   * @function handleConfirm
   * @description Handle confirmation action with loading state protection
   * Prevents multiple confirmations while an operation is in progress
   */
  const handleConfirm = () => {
    if (!loading) {
      onConfirm();
    }
  };

  /**
   * @function handleClose
   * @description Handle dialog close with loading state protection
   * Prevents closing dialog while an operation is in progress
   */
  const handleClose = () => {
    if (!loading) {
      onClose();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth={maxWidth}
      fullWidth
      aria-labelledby="delete-confirmation-dialog-title"
      aria-describedby="delete-confirmation-dialog-description"
      disableEscapeKeyDown={loading}
    >
      <DialogTitle id="delete-confirmation-dialog-title">
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <WarningAmberIcon
            color="warning"
            fontSize="small"
            aria-hidden="true"
          />
          <Typography variant="h6" component="h2">
            {title}
          </Typography>
        </Box>
      </DialogTitle>

      <DialogContent id="delete-confirmation-dialog-description">
        <Typography variant="body1" color="text.primary">
          {message}
        </Typography>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button
          onClick={handleClose}
          color="inherit"
          variant="outlined"
          disabled={loading}
          aria-label="Cancel action"
        >
          {cancelText}
        </Button>
        <Button
          onClick={handleConfirm}
          color={confirmColor}
          variant={confirmVariant}
          disabled={loading}
          startIcon={loading ? <CircularProgress size={16} /> : undefined}
          aria-label={`${confirmText} action`}
          sx={{
            minWidth: 100, // Prevent button size changes during loading
          }}
        >
          {loading ? "Processing..." : confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmationDialog;
