import React, { FC } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

import ActionButton from "../Button/Action";
import {
  ActionButtonStyled,
  CloseButton,
  StyledDialog,
  StyledDialogActions,
  StyledDialogContent,
  StyledDialogTitle,
  SubtitleContainer,
  TitleContainer,
} from "./CustomDialog.styles";
import {
  ConfirmationDialogProps,
  ContentDialogProps,
  UnifiedDialogProps,
} from "./CustomDialog.types";

/**
 * @component CustomDialog
 * @description Unified dialog component that supports multiple variants:
 * - confirmation: For delete/confirmation dialogs with confirm/cancel actions
 * - content: For displaying content with optional subtitle
 * - custom: For fully customized dialog content
 * @param props - UnifiedDialogProps containing dialog configuration
 * @returns JSX element representing the dialog
 */
const CustomDialog: FC<UnifiedDialogProps> = (props) => {
  const {
    open,
    onClose,
    title = "Dialog",
    maxWidth = "sm",
    fullWidth = true,
    variant = "custom",
    disableEscapeKeyDown = false,
    showCloseButton = true,
    headerContent,
    children,
    footerContent,
    showCloseInFooter = true,
    closeText = "Close",
    loading = false,
  } = props;

  /**
   * @function handleClose
   * @description Handle dialog close with loading state protection
   */
  const handleClose = () => {
    if (!loading) {
      onClose();
    }
  };

  /**
   * @function renderHeader
   * @description Renders the dialog header based on variant and props
   */
  const renderHeader = () => {
    if (headerContent) {
      return headerContent;
    }

    if (variant === "confirmation") {
      const confirmationProps = props as ConfirmationDialogProps;
      const icon = confirmationProps.headerIcon || (
        <WarningAmberIcon color="warning" fontSize="small" />
      );

      return (
        <TitleContainer>
          {icon}
          <Typography variant="h6" component="h2">
            {title}
          </Typography>
        </TitleContainer>
      );
    }

    if (variant === "content") {
      const contentProps = props as ContentDialogProps;
      return (
        <TitleContainer>
          <div>
            <Typography variant="h6" component="h2">
              {title}
            </Typography>
            {contentProps.subtitle && (
              <SubtitleContainer>
                <Typography variant="body2" color="text.secondary">
                  {contentProps.subtitle}
                </Typography>
              </SubtitleContainer>
            )}
          </div>
        </TitleContainer>
      );
    }

    return (
      <TitleContainer>
        <Typography variant="h6" component="h2">
          {title}
        </Typography>
      </TitleContainer>
    );
  };

  /**
   * @function renderContent
   * @description Renders the dialog content based on variant
   */
  const renderContent = () => {
    if (variant === "confirmation") {
      const confirmationProps = props as ConfirmationDialogProps;
      return (
        <Typography variant="body1" color="text.primary">
          {confirmationProps.message}
        </Typography>
      );
    }

    return children;
  };

  /**
   * @function renderFooter
   * @description Renders the dialog footer based on variant and props
   */
  const renderFooter = () => {
    if (footerContent) {
      return footerContent;
    }

    if (variant === "confirmation") {
      const confirmationProps = props as ConfirmationDialogProps;
      const {
        onConfirm,
        confirmText = "Confirm",
        cancelText = "Cancel",
        confirmColor = "error",
        confirmVariant = "contained",
      } = confirmationProps;

      const handleConfirm = () => {
        if (!loading) {
          onConfirm();
        }
      };

      return (
        <>
          <ActionButton
            onClick={handleClose}
            color="inherit"
            variant="outlined"
            disabled={loading}
          >
            {cancelText}
          </ActionButton>
          <ActionButtonStyled
            onClick={handleConfirm}
            color={confirmColor}
            variant={confirmVariant}
            disabled={loading}
            startIcon={loading ? <CircularProgress size={16} /> : undefined}
          >
            {loading ? "Processing..." : confirmText}
          </ActionButtonStyled>
        </>
      );
    }

    if (showCloseInFooter) {
      return (
        <ActionButton
          onClick={handleClose}
          variant="outlined"
          color="primary"
          disabled={loading}
        >
          {closeText}
        </ActionButton>
      );
    }

    return null;
  };

  const shouldShowFooter =
    footerContent || variant === "confirmation" || showCloseInFooter;

  return (
    <StyledDialog
      open={open}
      onClose={handleClose}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
      disableEscapeKeyDown={disableEscapeKeyDown || loading}
      aria-labelledby="custom-dialog-title"
      aria-describedby="custom-dialog-description"
    >
      <StyledDialogTitle id="custom-dialog-title">
        {renderHeader()}
        {showCloseButton && (
          <CloseButton onClick={handleClose} disabled={loading} size="small">
            <CloseIcon />
          </CloseButton>
        )}
      </StyledDialogTitle>

      <StyledDialogContent id="custom-dialog-description">
        {renderContent()}
      </StyledDialogContent>

      {shouldShowFooter && (
        <StyledDialogActions>{renderFooter()}</StyledDialogActions>
      )}
    </StyledDialog>
  );
};

export default CustomDialog;
