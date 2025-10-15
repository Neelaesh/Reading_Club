/**
 * @fileoverview Styled components for the MemberForm dialog component
 *
 * @description Contains all styled component definitions used in the member
 * form dialog, including the dialog container, form layout, book chip display,
 * and loading states.
 *
 * @version 1.0.0
 * @since 1.0.0
 */

import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { styled } from "@mui/material/styles";

/**
 * Styled Dialog component with custom paper styling
 * @description Provides a modal dialog with rounded corners, fixed dimensions,
 */
export const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    borderRadius: theme.spacing(2),
    minWidth: "500px",
    maxWidth: "600px",
    backgroundColor: theme.palette.background.paper,
    backgroundImage: "none",
  },
}));

/**
 * Styled DialogTitle component with enhanced layout and styling
 * @description Creates a dialog header with flex layout for title and action elements,
 * includes proper spacing and a bottom border for visual separation.
 * Typically contains the dialog title and close button.
 */
export const DialogTitleStyled = styled(DialogTitle)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: theme.spacing(2, 3),
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

/**
 * Form container with vertical layout and consistent spacing
 * @description Provides a flex column layout for form elements with proper spacing between fields.
 */
export const FormContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(3),
  paddingTop: theme.spacing(2),
}));

/**
 * Scrollable container for displaying book chips
 * @description Creates a flex-wrap container for book selection chips with
 * scroll capability when content exceeds the maximum height.
 */
export const BookChipContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  gap: theme.spacing(1),
  marginTop: theme.spacing(1),
  maxHeight: "120px",
  overflowY: "auto",
  padding: theme.spacing(1),
  borderRadius: theme.spacing(1),
  backgroundColor: theme.palette.action.hover,
}));

/**
 * Animated chip component with hover effects
 * @description Extends the Chip component with smooth scale transition and shadow effects on hover.
 * Used for interactive book selection within the member form to provide visual feedback.
 */
export const AnimatedChip = styled(Chip)(({ theme }) => ({
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: theme.shadows[2],
  },
}));

/**
 * Centered loading state container
 * @description Creates a flex container for displaying loading indicators and
 * related content with proper centering and spacing.
 */
export const LoadingContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: theme.spacing(3),
  flexDirection: "column",
  gap: theme.spacing(2),
}));
