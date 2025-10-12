/**
 * @fileoverview Styled components for the Header component
 * @description Contains all styled component definitions for the Reading Club header,
 * including AppBar, Toolbar, sections, badges, and floating action button styles.
 *
 * @author Reading Club Development Team
 * @since 1.0.0
 */

import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Fab from "@mui/material/Fab";
import Toolbar from "@mui/material/Toolbar";

/**
 * Styled AppBar component with custom theming
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
 * Styled Toolbar component with flex layout
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
 * Logo section container with flex layout
 * @description Container for the logo icon and Reading Club title
 */
export const LogoSection = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(2),
}));

/**
 * Actions section container for right-side header elements
 * @description Container for member count badge and login/logout button
 */
export const ActionsSection = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(2),
}));

/**
 * Styled member count badge with custom styling
 * @description White background chip displaying total member count with proper spacing
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

/**
 * Floating action button for adding new members
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
