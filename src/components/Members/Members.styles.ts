import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { styled } from "@mui/material/styles";

/**
 * @styled Container component for the main members page layout
 * @description Provides the primary container for the members page with proper spacing
 * and minimum height to ensure full viewport coverage.
 * @features
 * - Top padding adjusted for reduced spacing (theme.spacing(10))
 * - Bottom padding for content separation (theme.spacing(10))
 * - Minimum height set to full viewport height
 * @param theme - Material-UI theme object for consistent spacing
 * @returns Styled Container component for main layout
 */
export const MainContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(10), // Reduced padding since member count is now in header
  paddingBottom: theme.spacing(10),
  minHeight: "100vh",
}));

/**
 * @styled Box component for loading state display
 * @description Creates a centered loading container with proper spacing and
 * layout for loading indicators and messages.
 * @features
 * - Flexbox centering for both horizontal and vertical alignment
 * - Minimum height (300px) for adequate loading area
 * - Column layout with gap spacing for multiple elements
 * - Theme-based gap spacing for consistent element separation
 * @param theme - Material-UI theme object for spacing consistency
 * @returns Styled Box component for loading states
 */
export const LoadingContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "300px",
  flexDirection: "column",
  gap: theme.spacing(2),
}));
