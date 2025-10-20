import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
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
