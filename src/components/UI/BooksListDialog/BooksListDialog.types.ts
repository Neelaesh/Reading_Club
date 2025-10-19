import { Book } from "../../../types/book";

/**
 * @interface BooksListDialogProps
 * @description Props interface to display a list of books in the BooksListDialog component
 */
export interface BooksListDialogProps {
  /** Array of books to display in the dialog */
  books: Book[];
  /** Whether the dialog should use full width */
  fullWidth?: boolean;
  /** Maximum width of the dialog (Material-UI breakpoints) */
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl" | false;
  /** Controls whether the dialog is open or closed */
  open: boolean;
  /** Callback function called when the dialog should be closed */
  onClose: () => void;
  /** Title to display in the dialog header */
  title: string;
}

/**
 * @interface BookCardProps
 * @description Props interface to display each book in a card component
 */
export interface BookCardProps {
  /** Book data to display */
  book: Book;
  /** Optional click handler for book selection */
  onClick?: (book: Book) => void;
  /** Whether to show hover effects */
  showHover?: boolean;
}
