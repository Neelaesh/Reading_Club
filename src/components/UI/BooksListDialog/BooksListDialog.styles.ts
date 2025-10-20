import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

/**
 * @styled BookAuthor
 * @description Styled Typography component for book author with top margin
 */
export const BookAuthor = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(0.5),
}));

/**
 * @styled BookGenre
 * @description Styled Typography component for book genre with top margin and block display
 */
export const BookGenre = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(0.5),
  display: "block",
}));

/**
 * @styled BooksContainer
 * @description Styled component for books list container with flex column layout
 */
export const BooksContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
  marginTop: theme.spacing(1),
}));

/**
 * @styled DialogTitleHeader
 * @description Styled component for dialog title header with flex layout
 */
export const DialogTitleHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
}));

/**
 * @styled EmptyStateContainer
 * @description Styled component for empty state display with centered content
 */
export const EmptyStateContainer = styled(Box)(({ theme }) => ({
  textAlign: "center",
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
  color: theme.palette.text.secondary,
}));

/**
 * @styled EmptyStateSubtext
 * @description Styled Typography component for empty state subtext with top margin
 */
export const EmptyStateSubtext = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(1),
}));

/**
 * @styled StyledBookCard
 * @description Styled component for individual book card with conditional styling
 * @param hasOnClick - Whether the card has a click handler (affects cursor styling)
 * @param showHover - Whether to show hover effects
 */
export const StyledBookCard = styled(Box, {
  shouldForwardProp: (prop) => prop !== "hasOnClick" && prop !== "showHover",
})<{
  hasOnClick?: boolean;
  showHover?: boolean;
}>(({ theme, hasOnClick = false, showHover = true }) => ({
  padding: theme.spacing(2),
  border: "1px solid",
  borderColor: theme.palette.divider,
  borderRadius: theme.spacing(1),
  backgroundColor: theme.palette.background.paper,
  cursor: hasOnClick ? "pointer" : "default",
  ...(showHover && {
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
  }),
}));
