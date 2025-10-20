import React, { FC } from "react";
import Typography from "@mui/material/Typography";

import CustomDialog from "../CustomDialog";
import { BooksListDialogProps, BookCardProps } from "./BooksListDialog.types";
import {
  StyledBookCard,
  BooksContainer,
  EmptyStateContainer,
  BookAuthor,
  BookGenre,
  EmptyStateSubtext,
} from "./BooksListDialog.styles";

/**
 * @component BookCard
 * @description Individual book card component for displaying book information
 * @param props - BookCardProps containing book data and optional handlers
 * @returns JSX element representing a single book card
 */
const BookCard: FC<BookCardProps> = ({ book, onClick, showHover = true }) => {
  return (
    <StyledBookCard
      onClick={() => onClick?.(book)}
      hasOnClick={!!onClick}
      showHover={showHover}
    >
      <Typography variant="subtitle1" fontWeight="bold" color="primary">
        {book.title}
      </Typography>
      <BookAuthor variant="body2" color="text.secondary">
        by {book.author}
      </BookAuthor>
      <BookGenre variant="caption" color="text.secondary">
        Genre: {book.genre}
      </BookGenre>
    </StyledBookCard>
  );
};

/**
 * @component BooksListDialog
 * @description Dialog component for displaying a list of books with detailed information
 * Uses the unified CustomDialog component with content variant
 * @param props - BooksListDialogProps containing dialog state and book data
 * @returns JSX element representing the books list dialog
 */
const BooksListDialog: FC<BooksListDialogProps> = ({
  open,
  onClose,
  books,
  title = "Books",
  maxWidth = "sm",
  fullWidth = true,
}) => {
  const subtitle = `${books.length} ${books.length === 1 ? "book" : "books"}`;

  const content =
    books.length > 0 ? (
      <BooksContainer>
        {books.map((book) => (
          <BookCard key={book.bookId} book={book} showHover={true} />
        ))}
      </BooksContainer>
    ) : (
      <EmptyStateContainer>
        <Typography variant="body1" color="inherit">
          No books found for this member.
        </Typography>
        <EmptyStateSubtext variant="body2" color="inherit">
          Books will appear here once they are added to the member&apos;s
          collection.
        </EmptyStateSubtext>
      </EmptyStateContainer>
    );

  return (
    <CustomDialog
      open={open}
      onClose={onClose}
      title={title}
      subtitle={subtitle}
      maxWidth={maxWidth === false ? "sm" : maxWidth}
      fullWidth={fullWidth}
      variant="content"
      showCloseButton={true}
      showCloseInFooter={true}
      closeText="Close"
    >
      {content}
    </CustomDialog>
  );
};

export default BooksListDialog;
