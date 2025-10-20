import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { keyframes, styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

/**
 * @keyframe Keyframes animation for floating book icons
 * @description Creates a smooth up-and-down floating motion that gives life to the
 * decorative book icons scattered throughout the banner background
 */
const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
`;

/**
 * @styled Container component for the banner section
 * @description Creates the primary banner layout with sophisticated gradient backgrounds,
 * radial overlays, and floating book icon positioning. Features multi-layered gradients
 * and rounded corners for visual appeal.
 * @features
 * - Multi-layered gradient background using theme colors
 * - Rounded corners (24px border radius)
 * - Subtle border with theme integration
 * - Pseudo-element overlay with multiple radial gradients
 * - Proper z-index stacking for layered effects
 * @param theme - Material-UI theme object for consistent styling
 * @returns Styled Box component with banner container styles
 */
export const BannerContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  background: `linear-gradient(135deg, 
    ${theme.palette.background.paper} 0%, 
    rgba(0, 168, 225, 0.05) 50%, 
    ${theme.palette.background.paper} 100%)`,
  padding: theme.spacing(8, 0),
  margin: theme.spacing(0, 0, 0, 0),
  overflow: "hidden",
  borderRadius: "24px",
  border: `1px solid rgba(0, 168, 225, 0.1)`,
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `
      radial-gradient(circle at 20% 20%, rgba(0, 168, 225, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(0, 168, 225, 0.05) 0%, transparent 50%),
      radial-gradient(circle at 40% 60%, rgba(0, 168, 225, 0.03) 0%, transparent 50%)
    `,
    zIndex: 1,
  },
}));

/**
 * @styled Container component for banner content
 * @description Centers the banner content and provides proper spacing and layout
 * for the main title and subtitle. Uses flexbox for vertical alignment
 * and ensures content appears above background elements with proper z-index.
 * @features
 * - Centered text alignment
 * - Flexbox column layout with gap spacing
 * - Higher z-index (2) to appear above background elements
 * - Material-UI Container integration for responsive width
 * @param theme - Material-UI theme object for spacing consistency
 * @returns Styled Container component for banner content
 */
export const ContentContainer = styled(Container)(({ theme }) => ({
  position: "relative",
  zIndex: 2,
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: theme.spacing(2),
}));

/**
 * @styled Box component for animated floating book icons
 * @description Creates decorative book emoji icons that float around the banner background.
 * Each icon can be customized with different positions, sizes, and animation delays
 * to create a dynamic, engaging visual effect without interfering with content.
 * @features
 * - Floating animation with customizable delay
 * - Absolute positioning for flexible placement
 * - Non-interactive (pointer-events: none, user-select: none)
 * - Themed color with transparency for subtle effect
 * - Z-index 1 to appear behind content but above background
 * @param delay - Animation delay in seconds (default: 0)
 * @param size - Font size for the emoji in pixels (default: 24)
 * @param top - CSS top position as percentage string (default: '20%')
 * @param left - CSS left position as percentage string (default: '10%')
 * @returns Styled Box component for floating book icons
 */
export const BookIcon = styled(Box)<{
  delay?: number;
  size?: number;
  top?: string;
  left?: string;
}>(({ delay = 0, size = 24, top = "20%", left = "10%" }) => ({
  position: "absolute",
  top,
  left,
  fontSize: `${size}px`,
  color: "rgba(0, 168, 225, 0.2)",
  animation: `${float} 3s ease-in-out infinite`,
  animationDelay: `${delay}s`,
  zIndex: 1,
  userSelect: "none",
  pointerEvents: "none",
}));

/**
 * @styled Typography component for main banner title
 * @description Creates the primary banner heading with a sophisticated gradient text effect
 * that transitions from text color to primary theme color and back. Uses
 * responsive typography with clamp() for optimal display across all devices.
 * @features
 * - Responsive font size using clamp() (2.5rem to 4rem)
 * - Gradient text effect with theme color integration
 * - WebKit text fill for cross-browser gradient text support
 * - Bold font weight for strong visual impact
 * - Centered text alignment
 * - Theme spacing for consistent bottom margin
 * @param theme - Material-UI theme object for color and spacing
 * @returns Styled Typography component for main banner title
 */
export const MainTitle = styled(Typography)(({ theme }) => ({
  fontSize: "clamp(2.5rem, 5vw, 4rem)",
  fontWeight: "bold",
  background: `linear-gradient(135deg, 
    ${theme.palette.text.primary} 0%, 
    ${theme.palette.primary.main} 50%, 
    ${theme.palette.text.primary} 100%)`,
  backgroundClip: "text",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  textAlign: "center",
  marginBottom: theme.spacing(1),
}));

/**
 * @styled Typography component for banner subtitle
 * @description Provides the supporting text below the main banner title with softer
 * styling and responsive typography. Uses secondary text color for
 * proper visual hierarchy and subtle opacity for refined appearance.
 * @features
 * - Responsive font size using clamp() (1.2rem to 1.8rem)
 * - Secondary text color for visual hierarchy
 * - Normal font weight (400) for readability
 * - Centered text alignment
 * - Subtle opacity (0.9) for refined appearance
 * @param theme - Material-UI theme object for color consistency
 * @returns Styled Typography component for banner subtitle
 */
export const SubTitle = styled(Typography)(({ theme }) => ({
  fontSize: "clamp(1.2rem, 3vw, 1.8rem)",
  color: theme.palette.text.secondary,
  fontWeight: 400,
  textAlign: "center",
  opacity: 0.9,
}));
