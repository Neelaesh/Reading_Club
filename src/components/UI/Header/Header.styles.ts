import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import { styled } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";

/**
 * @styled AppBar component with custom theming
 * @description Creates a fixed header with custom background, no shadow, and border styling
 */
export const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  backgroundImage: "none",
  boxShadow: "none",
  borderBottom: `1px solid ${theme.palette.divider}`,
  position: "fixed",
  top: 0,
  zIndex: theme.zIndex.appBar,
}));

/**
 * @styled Toolbar component with flex layout
 * @description Creates a toolbar with space-between layout and custom padding
 */
export const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: theme.spacing(0, 3),
  minHeight: "70px",
}));

/**
 * @styled Box component for logo section container
 * @description Container for the logo icon and Reading Club title with flex layout
 */
export const LogoSection = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(2),
}));

/**
 * @styled Box component for actions section container
 * @description Container for member count badge and login/logout button with flex layout
 */
export const ActionsSection = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(2),
}));

/**
 * @styled Chip component for member count badge
 * @description White background chip displaying total member count with custom styling and spacing
 */
export const MemberCountBadge = styled(Chip)(({ theme }) => ({
  backgroundColor: "white",
  color: "black",
  fontWeight: "bold",
  fontSize: "0.875rem",
  borderRadius: "16px",
  border: `1px solid ${theme.palette.divider}`,
  padding: theme.spacing(0.5, 1.5),
  height: "auto",
  minHeight: "36px",
  "& .MuiChip-label": {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  "& .MuiChip-icon": {
    color: "black",
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(0.5),
  },
}));
