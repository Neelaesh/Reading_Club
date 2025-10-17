import Fab from "@mui/material/Fab";
import { styled } from "@mui/material/styles";

/**
 * @styled Floating action button for adding new members
 * @description Fixed position FAB in bottom-right corner, visible only when authenticated
 */
export const AddMemberFab = styled(Fab)(({ theme }) => ({
  position: "fixed",
  bottom: theme.spacing(3),
  right: theme.spacing(3),
  zIndex: theme.zIndex.fab,
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.secondary.contrastText,
  "&:hover": {
    backgroundColor: theme.palette.secondary.dark,
    transform: "scale(1.1)",
  },
}));
