import React, { FC } from "react";
import BookIcon from "@mui/icons-material/MenuBook";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import PeopleIcon from "@mui/icons-material/People";
import Typography from "@mui/material/Typography";

import ActionButton from "../Button/Action";
import CustomChip from "../CustomChip";
import {
  StyledAppBar,
  StyledToolbar,
  LogoSection,
  ActionsSection,
} from "./Header.styles";
import { useAuth } from "../../../contexts/AuthContext/AuthContext";
import { useMemberCount } from "../../../contexts/MemberCountContext";

/**
 * @component Header
 * @description Header component for navigation and member management
 * @returns JSX element representing the application header
 */
const Header: FC = () => {
  /** Authentication state and actions */
  const { isAuthenticated, login, logout } = useAuth();

  /** Member count state and actions from context */
  const { memberCount, loading } = useMemberCount();

  /**
   * @function handleAuthClick
   * @description Handles authentication button click events.
   * Toggles between login and logout based on current authentication state
   * using the authentication context for session management.
   */
  const handleAuthClick = () => {
    if (isAuthenticated) {
      logout();
    } else {
      login();
    }
  };

  return (
    <>
      <StyledAppBar>
        <StyledToolbar>
          <LogoSection>
            <BookIcon fontSize="large" />
            <Typography
              variant="h5"
              component="h1"
              fontWeight="bold"
              color="primary"
            >
              Reading Club
            </Typography>
          </LogoSection>

          <ActionsSection>
            {!loading && (
              <CustomChip
                chipVariant="badge"
                icon={<PeopleIcon />}
                label={`Total Members: ${memberCount}`}
                size="small"
              />
            )}
            <ActionButton
              variant={isAuthenticated ? "outlined" : "contained"}
              color="primary"
              onClick={handleAuthClick}
              startIcon={isAuthenticated ? <LogoutIcon /> : <LoginIcon />}
              size="large"
            >
              {isAuthenticated ? "Logout" : "Login"}
            </ActionButton>
          </ActionsSection>
        </StyledToolbar>
      </StyledAppBar>
    </>
  );
};

export default Header;
