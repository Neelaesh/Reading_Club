import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import { styled } from "@mui/material/styles";

/**
 * @styled Scrollable container for displaying book chips
 * @description Creates a flex-wrap container for book selection chips with scroll capability
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
 * @styled DialogTitle component with enhanced layout and styling
 * @description Creates a dialog header with dialog title and close button
 */
export const DialogTitleStyled = styled(DialogTitle)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: theme.spacing(2, 3),
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

/**
 * @styled Form container with vertical layout and consistent spacing
 * @description Provides a flex column layout for form elements with proper spacing between fields.
 */
export const FormContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(3),
  paddingTop: theme.spacing(2),
}));

/**
 * @styled Centered loading state container
 * @description Creates a flex container for displaying loading indicators and related content
 */
export const LoadingContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: theme.spacing(3),
  flexDirection: "column",
  gap: theme.spacing(2),
}));

/**
 * @styled CircularProgress component with margin for loading states
 * @description Styled CircularProgress with right margin for inline loading indicators
 */
export const LoadingProgress = styled(CircularProgress)(({ theme }) => ({
  marginRight: theme.spacing(1),
}));

/**
 * @styled InputLabel component for selected books section
 * @description Styled InputLabel with bottom margin and primary text color
 */
export const SectionLabel = styled(InputLabel)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  color: theme.palette.text.primary,
}));

/**
 * @styled Dialog component with custom paper styling
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
 * @styled DialogActions component with custom padding and border
 * @description Styled DialogActions with padding and top border for form actions
 */
export const StyledDialogActions = styled(DialogActions)(({ theme }) => ({
  padding: theme.spacing(3),
  borderTop: `1px solid ${theme.palette.divider}`,
}));

/**
 * @styled DialogContent component with custom padding
 * @description Styled DialogContent with consistent padding for form content
 */
export const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  padding: theme.spacing(3),
}));
