import React, { FC } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";

import { BooksListDialogProps, BookCardProps } from "./BooksListDialog.types";

/**
 * @component BookCard
 * @description Individual book card component for displaying book information
 * @param props - BookCardProps containing book data and optional handlers
 * @returns JSX element representing a single book card
 */
const BookCard: FC<BookCardProps> = ({ book, onClick, showHover = true }) => {
  return (
    <Box
      onClick={() => onClick?.(book)}
      sx={{
        p: 2,
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 1,
        backgroundColor: "background.paper",
        cursor: onClick ? "pointer" : "default",
        ...(showHover && {
          "&:hover": {
            backgroundColor: "action.hover",
          },
        }),
      }}
    >
      <Typography variant="subtitle1" fontWeight="bold" color="primary">
        {book.title}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
        by {book.author}
      </Typography>
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ mt: 0.5, display: "block" }}
      >
        Genre: {book.genre}
      </Typography>
    </Box>
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
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography variant="h6" component="h2">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ({books.length} {books.length === 1 ? "book" : "books"})
          </Typography>
        </Box>
      </DialogTitle>

      <DialogContent id="books-dialog-description">
        {books.length > 0 ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              mt: 1,
            }}
          >
            {books.map((book) => (
              <BookCard key={book.bookId} book={book} showHover={true} />
            ))}
          </Box>
        ) : (
          <Box
            sx={{
              textAlign: "center",
              py: 4,
              color: "text.secondary",
            }}
          >
            <Typography variant="body1" color="inherit">
              No books found for this member.
            </Typography>
            <Typography variant="body2" color="inherit" sx={{ mt: 1 }}>
              Books will appear here once they are added to the member&apos;s
              collection.
            </Typography>
          </Box>
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
