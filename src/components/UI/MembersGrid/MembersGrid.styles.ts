import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";

/**
 * @styled IconButton component for member action buttons
 * @description Creates styled action buttons with primary theme colors and
 * hover effects for member card interactions like edit and delete.
 * @features
 * - Primary theme background and contrast text colors
 * - Border styling matching theme primary color
 * - Rounded corners (8px border radius) for modern appearance
 * - Hover effects with darker background and scale transformation
 * @param theme - Material-UI theme object for color and hover styling
 * @returns Styled IconButton component for member actions
 */
export const ActionButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  border: `1px solid ${theme.palette.primary.main}`,
  borderRadius: "8px",
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.primary.contrastText,
    transform: "scale(1.1)",
  },
}));

/**
 * @styled Box component for member books count display
 * @description Creates a floating badge showing book count with glassmorphism effect
 * and smooth animations that appear on hover at the bottom of member cards.
 * @features
 * - Absolute positioning at bottom center with transform centering
 * - Glassmorphism styling with backdrop blur and semi-transparent background
 * - Rounded corners (24px) for pill-shaped appearance
 * - Smooth opacity and transform animations (0.4s cubic-bezier)
 * - Border styling with theme accent color and transparency
 * @param theme - Material-UI theme object for spacing and positioning
 * @returns Styled Box component for books count badge
 */
export const BooksContainer = styled(Box)(({ theme }) => ({
  position: "absolute",
  bottom: theme.spacing(2),
  left: "50%",
  transform: "translateX(-50%) translateY(40px)",
  backgroundColor: "rgba(0, 0, 0, 0.9)",
  borderRadius: "24px",
  padding: theme.spacing(1, 2.5),
  opacity: 0,
  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minWidth: "80px",
  height: "48px",
  border: "2px solid rgba(0, 168, 225, 0.4)",
  backdropFilter: "blur(10px)",
  zIndex: 10,
}));

/**
 * @styled Box component for load more button container
 * @description Centers the load more button with proper spacing for pagination
 * functionality in the members list.
 * @features
 * - Flexbox centering for button alignment
 * - Theme-based padding for consistent spacing
 * @param theme - Material-UI theme object for padding consistency
 * @returns Styled Box component for load more button
 */
export const LoadMoreContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  padding: theme.spacing(4),
}));

/**
 * @styled Box component for member action buttons container
 * @description Positions action buttons in the top-right corner of member cards
 * with hover-triggered visibility and smooth animations.
 * @features
 * - Absolute positioning in top-right corner with theme spacing
 * - Flexbox layout with gap spacing for multiple buttons
 * - Opacity and transform animations on hover (0.3s ease-in-out)
 * - Initial hidden state with upward transform offset
 * @param theme - Material-UI theme object for positioning and spacing
 * @returns Styled Box component for action buttons
 */
export const MemberActions = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: theme.spacing(1),
  right: theme.spacing(1),
  display: "flex",
  gap: theme.spacing(1),
  opacity: 0,
  transform: "translateY(-10px)",
  transition: "all 0.3s ease-in-out",
}));

/**
 * @styled Card component for individual member display
 * @description Creates interactive member cards with hover effects, animations,
 * and overlay functionality for member actions and book information.
 * @features
 * - Fixed height (350px) for consistent card sizing
 * - Rounded corners (16px border radius) for modern appearance
 * - Smooth hover animations with transform and shadow effects
 * - Overlay and action visibility toggles on hover
 * - Cursor pointer for interactive feedback
 * @param theme - Material-UI theme object for background and transition timing
 * @returns Styled Card component for member display
 */
export const MemberCard = styled(Card)(({ theme }) => ({
  position: "relative",
  height: "350px",
  backgroundColor: theme.palette.background.paper,
  borderRadius: "16px",
  overflow: "hidden",
  cursor: "pointer",
  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
  "&:hover": {
    transform: "translateY(-8px) scale(1.02)",
    boxShadow: `0 16px 40px rgba(0, 168, 225, 0.2)`,
    "& .member-overlay": {
      opacity: 1,
    },
    "& .member-actions": {
      opacity: 1,
      transform: "translateY(0)",
    },
    "& .member-books": {
      opacity: 1,
      transform: "translateX(-50%) translateY(0)",
    },
  },
}));

/**
 * @styled CardMedia component for member profile image display
 * @description Provides consistent image display with cover sizing and centering
 * for member profile pictures within the card layout.
 * @features
 * - Fixed height (240px) for uniform image display
 * - Background cover sizing for proper image scaling
 * - Center positioning for optimal image placement
 * - Relative positioning for overlay elements
 * @returns Styled CardMedia component for member images
 */
export const MemberImage = styled(CardMedia)(() => ({
  height: "240px",
  backgroundSize: "cover",
  backgroundPosition: "center",
  position: "relative",
}));

/**
 * @styled CardContent component for member information display
 * @description Provides structured layout for member details with consistent
 * height and spacing, using flexbox for content distribution.
 * @features
 * - Fixed height (110px) for uniform card content area
 * - Theme-based padding for consistent spacing
 * - Flexbox column layout with space-between distribution
 * - Proper content separation and alignment
 * @param theme - Material-UI theme object for padding consistency
 * @returns Styled CardContent component for member information
 */
export const MemberInfo = styled(CardContent)(({ theme }) => ({
  padding: theme.spacing(2),
  height: "110px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
}));

/**
 * @styled Box component for member card overlay effect
 * @description Creates a gradient overlay that appears on hover to enhance
 * readability of overlay content and provide visual depth.
 * @features
 * - Absolute positioning covering entire card area
 * - Linear gradient from transparent to dark overlay
 * - Opacity transition animation (0.3s ease-in-out)
 * - Flexbox layout for content positioning at bottom
 * - Theme-based padding for consistent spacing
 * @param theme - Material-UI theme object for spacing consistency
 * @returns Styled Box component for card overlay
 */
export const MemberOverlay = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background:
    "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.8) 100%)",
  opacity: 0,
  transition: "opacity 0.3s ease-in-out",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
  padding: theme.spacing(2),
}));
