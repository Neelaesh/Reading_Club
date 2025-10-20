import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";

/**
 * @styled Button component for action buttons
 * @description Button with minimum width to prevent layout shifts
 */
export const ActionButtonStyled = styled(Button)(() => ({
  minWidth: 100,
}));

/**
 * @styled IconButton component for close button
 * @description Close button with consistent sizing and hover effects
 */
export const CloseButton = styled(IconButton)(({ theme }) => ({
  padding: theme.spacing(0.5),
  color: theme.palette.text.secondary,
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));

/**
 * @styled Enhanced Dialog component with custom styling
 * @description Base dialog with consistent theming and layout
 */
export const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    borderRadius: theme.spacing(2),
    backgroundImage: "none",
  },
}));

/**
 * @styled DialogActions component with consistent padding and border
 * @description Styled dialog actions for button layout consistency
 */
export const StyledDialogActions = styled(DialogActions)(({ theme }) => ({
  padding: theme.spacing(2, 3, 3, 3),
  borderTop: `1px solid ${theme.palette.divider}`,
  gap: theme.spacing(1),
}));

/**
 * @styled DialogContent component with consistent padding
 * @description Provides consistent content area styling
 */
export const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  padding: theme.spacing(3),
}));

/**
 * @styled DialogTitle component with enhanced layout and styling
 * @description Creates a dialog header with flexible content arrangement
 */
export const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: theme.spacing(2, 3),
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

/**
 * @styled Box component for header subtitle
 * @description Container for subtitle text with proper spacing
 */
export const SubtitleContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  marginLeft: theme.spacing(0.5),
}));

/**
 * @styled Box component for dialog title content layout
 * @description Container for title content with icon and text alignment
 */
export const TitleContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  flex: 1,
}));
