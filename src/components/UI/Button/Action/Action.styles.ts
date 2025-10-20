import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { styled } from "@mui/material/styles";

/**
 * @styled Enhanced action button with loading state support
 * @description Extends Material-UI Button with loading indicator functionality,
 * reduces opacity and disables interaction when loading is active
 */
export const StyledButton = styled(Button)<{ loading?: boolean }>(
  ({ loading }) => ({
    position: "relative",
    opacity: loading ? 0.7 : 1,
    pointerEvents: loading ? "none" : "auto",
  })
);

/**
 * @styled Loading indicator icon for action buttons
 * @description Circular progress component with consistent spacing,
 * positioned to the left of button text with theme-based margin
 */
export const LoadingIcon = styled(CircularProgress)(({ theme }) => ({
  marginRight: theme.spacing(1),
}));
