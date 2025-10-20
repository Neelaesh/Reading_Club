import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";

/**
 * @component StyledTextField
 * @description Styled TextField with custom form helper text styling
 * Features:
 * - Custom helper text color based on error state
 * - Custom font size for helper text (0.75rem)
 * - Custom margins for helper text positioning
 * - Conditional color based on error prop
 */
export const StyledTextField = styled(TextField, {
  shouldForwardProp: (prop) => prop !== "error",
})<{ error?: boolean }>(({ theme, error }) => ({
  "& .MuiFormHelperText-root": {
    color: error ? theme.palette.error.main : theme.palette.text.secondary,
    fontSize: "0.75rem",
    marginTop: theme.spacing(1),
    marginLeft: 0,
  },
}));
