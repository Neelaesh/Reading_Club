import React, { useState, useEffect, FC } from "react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Zoom from "@mui/material/Zoom";
import {
  Login as LoginIcon,
  Logout as LogoutIcon,
  MenuBook as BookIcon,
  PersonAdd as PersonAddIcon,
  People as PeopleIcon,
} from "@mui/icons-material";

import { HeaderProps } from "./Header.types";
import { memberService } from "../../../services/Members/Members";
import {
  StyledAppBar,
  StyledToolbar,
  LogoSection,
  ActionsSection,
  MemberCountBadge,
  AddMemberFab,
} from "./Header.styles";
import { useAuth } from "../../../contexts/AuthContext/AuthContext";

/**
 * Header component for the Reading Club application
 *
 * Renders the main navigation header with authentication controls, member count display,
 * and add member functionality. The component automatically loads and displays the current
 * member count and provides authentication state management through the auth context.
 *
 * @param props - Component props
 * @param props.onAddMember - Callback function triggered when add member button is clicked
 *
 * @returns JSX element containing the header with navigation and controls
 * @see {@link HeaderProps} - Props interface definition
 * @see {@link useAuth} - Authentication context hook
 * @see {@link memberService} - Member service for API operations
 *
 * @since 1.0.0
 * @version 1.2.0
 */
export const Header: FC<HeaderProps> = ({ onAddMember }) => {
  /** Authentication context providing login state and auth functions */
  const { isAuthenticated, login, logout } = useAuth();

  /** Current member count from the database */
  const [memberCount, setMemberCount] = useState<number>(0);

  /** Loading state for member count fetch operation */
  const [loading, setLoading] = useState(true);

  /**
   * Effect hook to load initial member count on component mount
   *
   * Fetches the current member count from the member service and updates
   * the component state. Handles loading states and error scenarios gracefully.
   */
  useEffect(() => {
    /**
     * Asynchronous function to load member count from the API
     *
     * @returns Promise that resolves when member count is loaded
     * @throws {Error} When member service fails to fetch count
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
   * Handles authentication button click events
   *
   * Toggles between login and logout based on current authentication state.
   * Uses the authentication context to manage session state persistence.
   *
   * @returns void
   */
  const handleAuthClick = () => {
    if (isAuthenticated) {
      logout();
    } else {
      login();
    }
  };

  /**
   * Updates the member count display with fresh data from the API
   *
   * This function can be called after member operations (add/delete) to ensure
   * the header displays the most current member count. It's exposed globally
   * via the window object for use by other components.
   *
   * @returns Promise that resolves when member count is updated
   * @throws {Error} When member service fails to fetch updated count
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
   * Effect hook to expose updateMemberCount function globally
   *
   * Makes the updateMemberCount function available on the window object
   * so other components can trigger member count updates after performing
   * member operations (add, delete, update).
   */
  // Expose update function to parent component
  useEffect(() => {
    // Store the update function to be called after member operations
    (
      window as typeof window & { updateMemberCount?: () => Promise<void> }
    ).updateMemberCount = updateMemberCount;
  }, []);

  /**
   * Renders the header component with navigation and authentication controls
   *
   * Structure:
   * - Main AppBar with toolbar containing logo and actions
   * - Logo section with book icon and "Reading Club" title
   * - Actions section with member count badge and auth button
   * - Floating action button for adding members (authenticated users only)
   *
   * @returns JSX.Element The complete header component
   */
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

      {/* Floating action button for adding members - authenticated users only */}
      {isAuthenticated && (
        <Zoom in={isAuthenticated} timeout={300}>
          <AddMemberFab onClick={onAddMember} aria-label="Add member">
            <PersonAddIcon />
          </AddMemberFab>
        </Zoom>
      )}
    </>
  );
};
