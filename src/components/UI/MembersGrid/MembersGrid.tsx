import React, { FC, useCallback } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import Grow from "@mui/material/Grow";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";

import {
  ActionButton,
  BookTooltip,
  BooksContainer,
  LoadMoreContainer,
  MemberActions,
  MemberCard,
  MemberImage,
  MemberInfo,
  MemberOverlay,
  TooltipText,
  ClickableTooltipText,
  BookCountText,
  EmptyStateContainer,
} from "./MembersGrid.styles";
import { Book } from "../../../types/book";
import { formatDateOfJoining } from "../../../utils/member";
import { MembersGridProps, MemberCardProps } from "./MembersGrid.types";

/**
 * @component MemberCardComponent
 * @description Individual member card component for displaying member information
 * with interactive features like edit, delete, and view books functionality
 * @param props - MemberCardProps containing member data and handlers
 * @returns JSX element representing a single member card
 */
const MemberCardComponent: FC<MemberCardProps> = ({
  member,
  index,
  allBooks,
  isAuthenticated,
  onEdit,
  onDelete,
  onViewAllBooks,
  animationDelay = 100,
}) => {
  /**
   * @function getMemberBooks
   * @description Get full book objects from book IDs
   * @param bookIds - Array of book IDs
   * @returns Array of Book objects
   */
  const getMemberBooks = useCallback(
    (bookIds: number[]): Book[] => {
      return bookIds
        .map((id) => allBooks.find((book) => book.bookId === id))
        .filter((book): book is Book => book !== undefined);
    },
    [allBooks]
  );

  /**
   * @function getBookTitlesForTooltip
   * @description Get book titles for tooltip with smart truncation
   * @param bookIds - Array of book IDs
   * @returns Object with display text and whether truncated
   */
  const getBookTitlesForTooltip = useCallback(
    (bookIds: number[]) => {
      if (bookIds.length === 0)
        return { text: "No books added yet", truncated: false };

      const books = getMemberBooks(bookIds);
      const titles = books.map((book) => book.title);

      if (titles.length === 0)
        return { text: "No books found", truncated: false };

      // Smart truncation based on content length and count
      const MAX_TOOLTIP_LENGTH = 120;
      const MAX_BOOKS_IN_TOOLTIP = 3;

      if (titles.length <= MAX_BOOKS_IN_TOOLTIP) {
        const fullText = titles.join(", ");
        if (fullText.length <= MAX_TOOLTIP_LENGTH) {
          return { text: fullText, truncated: false };
        }
      }

      // Show first few books + count
      const visibleTitles = titles.slice(0, MAX_BOOKS_IN_TOOLTIP);
      const remainingCount = titles.length - MAX_BOOKS_IN_TOOLTIP;
      const text =
        visibleTitles.join(", ") +
        (remainingCount > 0 ? ` and ${remainingCount} more...` : "");

      return { text, truncated: remainingCount > 0 };
    },
    [getMemberBooks]
  );

  const tooltipData = getBookTitlesForTooltip(member.books);

  return (
    <Grow in={true} timeout={500 + index * animationDelay}>
      <MemberCard>
        <MemberImage
          image={
            member.avatar || `https://i.pravatar.cc/400?img=${(index % 70) + 1}`
          }
        >
          <MemberOverlay className="member-overlay" />
          {isAuthenticated && (
            <MemberActions className="member-actions">
              <Tooltip title="Edit Member">
                <ActionButton
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(member);
                  }}
                >
                  <EditIcon fontSize="small" />
                </ActionButton>
              </Tooltip>
              <Tooltip title="Delete Member">
                <ActionButton
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(member);
                  }}
                >
                  <DeleteIcon fontSize="small" />
                </ActionButton>
              </Tooltip>
            </MemberActions>
          )}
          <BooksContainer className="member-books">
            <BookTooltip
              title={
                <Box>
                  <TooltipText
                    variant="body2"
                    hasTruncated={tooltipData.truncated}
                  >
                    {tooltipData.text}
                  </TooltipText>
                  {tooltipData.truncated && (
                    <ClickableTooltipText
                      variant="caption"
                      onClick={(e) => {
                        e.stopPropagation();
                        onViewAllBooks(member.books);
                      }}
                    >
                      Click to view all books
                    </ClickableTooltipText>
                  )}
                </Box>
              }
              placement="top"
              arrow
            >
              <BookCountText
                variant="body1"
                component="span"
                onClick={(e) => {
                  if (member.books.length > 3) {
                    e.stopPropagation();
                    onViewAllBooks(member.books);
                  }
                }}
              >
                {member.books.length}{" "}
                {member.books.length === 1 ? "Book" : "Books"}
              </BookCountText>
            </BookTooltip>
          </BooksContainer>
        </MemberImage>

        <MemberInfo>
          <Box>
            <Typography variant="h6" component="h3" noWrap>
              {member.email}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Member since {formatDateOfJoining(member.dateOfJoining)}
            </Typography>
          </Box>
        </MemberInfo>
      </MemberCard>
    </Grow>
  );
};

/**
 * @component MembersGrid
 * @description Grid component for displaying a collection of member cards
 * with responsive layout, loading states, and pagination support.
 * Provides a clean, organized view of all reading club members.
 *
 * @features
 * - Responsive grid layout with customizable spacing
 * - Individual member cards with hover effects and actions
 * - Smart book display with tooltips and modal integration
 * - Staggered animation entrance effects
 * - Load more functionality with loading states
 * - Empty state handling
 * - Authentication-aware action buttons
 *
 * @param props - MembersGridProps containing grid configuration and data
 * @returns JSX element representing the members grid
 */
const MembersGrid: FC<MembersGridProps> = ({
  members,
  allBooks,
  isAuthenticated,
  loading = false,
  onEditMember,
  onDeleteMember,
  onViewAllBooks,
  hasMore = false,
  loadingMore = false,
  onLoadMore,
  spacing = 3,
  animationDelay = 100,
}) => {
  /**
   * @function handleLoadMore
   * @description Handle load more button click with safety checks
   * Ensures callback exists and loading state is appropriate
   */
  const handleLoadMore = () => {
    if (onLoadMore && !loadingMore && hasMore) {
      onLoadMore();
    }
  };

  // Show empty state when no members and not loading
  if (members.length === 0 && !loading) {
    return (
      <EmptyStateContainer>
        <Typography variant="h5" color="textSecondary" gutterBottom>
          No members found
        </Typography>
        <Typography variant="body1" color="textSecondary">
          {isAuthenticated
            ? "Click the + button to add your first member"
            : "Login to manage club members"}
        </Typography>
      </EmptyStateContainer>
    );
  }

  return (
    <>
      {/* Members grid */}
      <Grid container spacing={spacing}>
        {members.map((member, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={member.id || index}>
            <MemberCardComponent
              member={member}
              index={index}
              allBooks={allBooks}
              isAuthenticated={isAuthenticated}
              onEdit={onEditMember}
              onDelete={onDeleteMember}
              onViewAllBooks={onViewAllBooks}
              animationDelay={animationDelay}
            />
          </Grid>
        ))}
      </Grid>

      {/* Load more button */}
      {hasMore && members.length > 0 && onLoadMore && (
        <LoadMoreContainer>
          <Button
            variant="outlined"
            size="large"
            onClick={handleLoadMore}
            disabled={loadingMore}
            startIcon={
              loadingMore ? <CircularProgress size={20} /> : <VisibilityIcon />
            }
          >
            {loadingMore ? "Loading..." : "Load More Members"}
          </Button>
        </LoadMoreContainer>
      )}
    </>
  );
};

export default MembersGrid;
