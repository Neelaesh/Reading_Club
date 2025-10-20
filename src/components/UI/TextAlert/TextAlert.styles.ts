import Alert from "@mui/material/Alert";
import { styled } from "@mui/material/styles";

/**
 * @styled Alert component with conditional bottom margin
 * @description Styled Alert with dynamic bottom margin based on mode prop
 * @features
 * - Conditional bottom margin: 0 for add/edit modes, theme.spacing(3) for other modes
 * - Maintains all original Alert functionality and styling
 * @param theme - Material-UI theme object for spacing consistency
 * @param mode - Component mode to determine margin behavior
 * @returns Styled Alert component with conditional margin
 */
export const StyledAlert = styled(Alert)<{ mode?: string }>(
  ({ theme, mode }) => ({
    marginBottom: mode === "add" || mode === "edit" ? 0 : theme.spacing(3),
  })
);
