import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import { styled } from "@mui/material/styles";

/**
 * @styled Button component for confirmation actions
 * @description Styled button with consistent minimum width to prevent size changes during loading
 * @features
 * - Fixed minimum width (100px) to prevent layout shifts during loading states
 * - Maintains button size consistency across different text lengths
 */
export const ConfirmButton = styled(Button)(() => ({
  minWidth: 100,
}));

/**
 * @styled DialogActions component for dialog action buttons container
 * @description Styled dialog actions with consistent padding for button layout
 * @features
 * - Horizontal padding (theme.spacing(3)) for proper button spacing
 * - Bottom padding (theme.spacing(2)) for dialog layout consistency
 * @param theme - Material-UI theme object for spacing consistency
 * @returns Styled DialogActions component for button container
 */
export const StyledDialogActions = styled(DialogActions)(({ theme }) => ({
  paddingLeft: theme.spacing(3),
  paddingRight: theme.spacing(3),
  paddingBottom: theme.spacing(2),
}));

/**
 * @styled Box component for dialog title content layout
 * @description Styled box for title content with icon and text alignment
 * @features
 * - Flexbox layout for horizontal alignment
 * - Center alignment for icon and text
 * - Consistent gap spacing between elements
 * @param theme - Material-UI theme object for spacing consistency
 * @returns Styled Box component for title layout
 */
export const TitleBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
}));
