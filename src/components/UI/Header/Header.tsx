import React, { useState, useEffect, FC } from "react";
import BookIcon from "@mui/icons-material/MenuBook";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import PeopleIcon from "@mui/icons-material/People";
import Typography from "@mui/material/Typography";

import AddMemberButton from "../Button/AddMember/AddMember";
import { HeaderProps } from "./Header.types";
import { memberService } from "../../../services/Members/Members";
import {
  StyledAppBar,
  StyledToolbar,
  LogoSection,
  ActionsSection,
  MemberCountBadge,
} from "./Header.styles";
import { useAuth } from "../../../contexts/AuthContext/AuthContext";

/**
 * @component
 * @description Header component for navigation and member management
 * @param props - Component props as defined in HeaderProps
 * @returns JSX element representing the application header
 */
const Header: FC<HeaderProps> = ({ onAddMember }) => {
  /** Current member count from the database */
  const [memberCount, setMemberCount] = useState<number>(0);

  /** Loading state for member count fetch operation */
  const [loading, setLoading] = useState(true);

  /** Authentication state and actions */
  const { isAuthenticated, login, logout } = useAuth();

  /**
   * @function loadMemberCount
   * @description Fetches the current member count from the member service
   * and updates the component state. Handles loading states and error scenarios.
   */
  useEffect(() => {
    /**
     * @function loadMemberCount
     * @description Asynchronous function to load member count from the API
     * and handle loading states with error management.
     */
    const loadMemberCount = async () => {
      try {
        setLoading(true);
        const count = await memberService.getMemberCount();
        setMemberCount(count);
      } catch (error) {
        console.error("Failed to load member count:", error);
      } finally {
        setLoading(false);
      }
    };

    loadMemberCount();
  }, []);

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

  /**
   * @function updateMemberCount
   * @description Updates the member count display with fresh data from the API.
   * Can be called after member operations to ensure the header displays
   * the most current member count with proper error handling.
   */
  const updateMemberCount = async () => {
    try {
      const count = await memberService.getMemberCount();
      setMemberCount(count);
    } catch (error) {
      console.error("Failed to update member count:", error);
    }
  };

  /**
   * @function exposeUpdateFunction
   * @description Exposes updateMemberCount function globally via window object.
   * Makes the function available for other components to trigger member count
   * updates after performing member operations.
   */
  useEffect(() => {
    // Store the update function to be called after member operations
    (
      window as typeof window & { updateMemberCount?: () => Promise<void> }
    ).updateMemberCount = updateMemberCount;
  }, []);

  return (
    <>
      <StyledAppBar>
        <StyledToolbar>
          <LogoSection>
            <IconButton edge="start" color="primary" size="large">
              <BookIcon fontSize="large" />
            </IconButton>
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
              <MemberCountBadge
                icon={<PeopleIcon />}
                label={`Total Members: ${memberCount}`}
                size="small"
              />
            )}
            <Button
              variant={isAuthenticated ? "outlined" : "contained"}
              color="primary"
              onClick={handleAuthClick}
              startIcon={isAuthenticated ? <LogoutIcon /> : <LoginIcon />}
              size="large"
            >
              {isAuthenticated ? "Logout" : "Login"}
            </Button>
          </ActionsSection>
        </StyledToolbar>
      </StyledAppBar>

      <AddMemberButton onAddMember={onAddMember} />
    </>
  );
};

export default Header;
