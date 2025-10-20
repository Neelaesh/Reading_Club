import React, { FC } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";

import { BooksListDialogProps, BookCardProps } from "./BooksListDialog.types";
import {
  StyledBookCard,
  DialogTitleHeader,
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
 * including title, author, and genre.
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
  /**
   * @function handleClose
   * @description Handle dialog close with proper cleanup
   */
  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
      aria-labelledby="books-dialog-title"
      aria-describedby="books-dialog-description"
    >
      <DialogTitle id="books-dialog-title">
        <DialogTitleHeader>
          <Typography variant="h6" component="h2">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ({books.length} {books.length === 1 ? "book" : "books"})
          </Typography>
        </DialogTitleHeader>
      </DialogTitle>

      <DialogContent id="books-dialog-description">
        {books.length > 0 ? (
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
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} variant="outlined" color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BooksListDialog;
