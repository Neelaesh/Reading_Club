import { Box, Typography, Card, CardContent } from "@mui/material";
import BookIcon from "@mui/icons-material/MenuBook";
import { styled, keyframes } from "@mui/material/styles";

/**
 * @keyframe Floating animation for decorative book icons
 * @description Creates a smooth up-and-down floating motion for decorative book elements
 */
const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-15px);
  }
`;

/**
 * @keyframe Pulse animation for the main book icon
 * @description Creates a gentle scaling effect that draws attention to the main book icon
 */
const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
`;

/**
 * @styled Card component for navigation action options
 * @description Provides interactive cards with hover effects for navigation buttons and links
 */
export const ActionCard = styled(Card)(({ theme }) => ({
  height: "100%",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: "16px",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: `0 8px 32px rgba(0, 168, 225, 0.15)`,
    borderColor: theme.palette.primary.main,
  },
}));

/**
 * @styled Box component for action section container
 * @description Centers the action buttons and provides top margin spacing
 */
export const ActionSection = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  marginTop: theme.spacing(4),
}));

/**
 * @styled Box component with animated main book icon
 * @description Provides a pulsing animation effect for the central book icon display
 */
export const AnimatedBookIcon = styled(Box)(() => ({
  display: "inline-block",
  animation: `${pulse} 3s ease-in-out infinite`,
  marginBottom: "24px",
}));

/**
 * @styled Box component for centered content wrapper
 * @description Provides text alignment center for the main content
 */
export const CenteredContent = styled(Box)(() => ({
  textAlign: "center",
}));

/**
 * @styled CardContent component with centered content
 * @description Card content with center alignment and padding
 */
export const CenteredCardContent = styled(CardContent)(({ theme }) => ({
  textAlign: "center",
  padding: theme.spacing(3),
}));

/**
 * @styled Box component for floating decorative book elements
 * @description Creates positioned floating book icons with customizable animation delays and placement
 */
export const FloatingBook = styled(Box)<{
  delay?: number;
  size?: number;
  top?: string;
  left?: string;
}>(({ delay = 0, size = 24, top = "20%", left = "10%" }) => ({
  position: "absolute",
  top,
  left,
  fontSize: `${size}px`,
  color: "rgba(0, 168, 225, 0.15)",
  animation: `${float} 4s ease-in-out infinite`,
  animationDelay: `${delay}s`,
  zIndex: 1,
  userSelect: "none",
  pointerEvents: "none",
}));

/**
 * @styled Typography component with gradient text for the 404 number
 * @description Creates large responsive text with gradient color effect for the error code display
 */
export const GradientText = styled(Typography)(({ theme }) => ({
  fontSize: "clamp(4rem, 15vw, 8rem)",
  fontWeight: "bold",
  background: `linear-gradient(135deg, 
    ${theme.palette.primary.main} 0%, 
    ${theme.palette.secondary.main} 50%, 
    ${theme.palette.primary.main} 100%)`,
  backgroundClip: "text",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  textAlign: "center",
  lineHeight: 1,
  marginBottom: theme.spacing(2),
}));

/**
 * @styled Typography component for help text
 * @description Help text with top margin and opacity
 */
export const HelpText = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(4),
  opacity: 0.7,
}));

/**
 * @styled Box component for icon container with margin
 * @description Adds top margin for icon spacing
 */
export const IconContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

/**
 * @styled Box component for large icon display
 * @description Styles large icons used in action cards with size and color
 */
export const IconLarge = styled(Box)(({ theme }) => ({
  fontSize: 48,
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(2),
}));

/**
 * @styled BookIcon component with large size and primary color
 * @description Styled book icon with large font size and primary color
 */
export const LargeBookIcon = styled(BookIcon)(({ theme }) => ({
  fontSize: 120,
  color: theme.palette.primary.main,
}));

/**
 * @styled Box component for main illustration container
 * @description Provides a positioned container for the central illustration elements with proper z-index layering
 */
export const MainIllustration = styled(Box)(({ theme }) => ({
  position: "relative",
  zIndex: 2,
  marginBottom: theme.spacing(2),
}));

/**
 * @styled Typography component for main title
 * @description Styles the main title text with margin and font weight
 */
export const MainTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  fontWeight: 600,
}));

/**
 * @styled Card component with max width constraint
 * @description Action card with maximum width for better layout
 */
export const MaxWidthActionCard = styled(ActionCard)(() => ({
  maxWidth: 600,
}));

/**
 * @styled Container component for the 404 page
 * @description Main container with full viewport height, centered content, and gradient background
 */
export const NotFoundContainer = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  background: `linear-gradient(135deg, 
    ${theme.palette.background.default} 0%, 
    rgba(0, 168, 225, 0.03) 50%, 
    ${theme.palette.background.default} 100%)`,
  overflow: "hidden",
  padding: theme.spacing(4, 2),
}));

/**
 * @styled Typography component with bottom margin
 * @description Typography with margin bottom spacing
 */
export const SpacedTypography = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

/**
 * @styled Typography component for subtitle text
 * @description Styles the subtitle text with margin, max width, and line height for readability
 */
export const Subtitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  maxWidth: 600,
  marginLeft: "auto",
  marginRight: "auto",
  lineHeight: 1.6,
}));
