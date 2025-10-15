/**
 * @fileoverview MemberForm dialog component for adding and editing members
 *
 * This module provides a comprehensive dialog form for member management
 * in the Reading Club application. Supports both adding new members and
 * editing existing ones with real-time validation
 *
 * @version 1.0.0
 * @since 1.0.0
 */
import React, { useState, useEffect, FC } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import CloseIcon from "@mui/icons-material/Close";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Fade from "@mui/material/Fade";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import PersonIcon from "@mui/icons-material/Person";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import {
  AnimatedChip,
  BookChipContainer,
  DialogTitleStyled,
  FormContainer,
  LoadingContainer,
  StyledDialog,
} from "./MemberForm.styles";
import { Book } from "../../../types/book";
import { bookService } from "../../../services/Books/Books";
import { MemberFormData } from "../../../types/member";
import { MemberFormProps } from "./MemberForm.types";
import TextAlert from "../TextAlert/TextAlert";
import TextInput from "../TextInput/TextInput";
import { validateMemberForm, isOnlySpaces } from "../../../utils/validation";

/**
 * MemberForm component for creating and editing members
 *
 * A comprehensive dialog form that handles both member creation and editing
 * operations. Features include real-time email validation, book selection with
 * visual chips, smart helper text that appears only when needed, and full
 * error handling with user-friendly feedback.
 *
 * @component
 * @example
 * ```tsx
 * // Adding a new member
 * <MemberForm
 *   open={isDialogOpen}
 *   onClose={() => setIsDialogOpen(false)}
 *   onSubmit={handleCreateMember}
 *   mode="add"
 * />
 *
 * // Editing an existing member
 * <MemberForm
 *   open={isDialogOpen}
 *   onClose={() => setIsDialogOpen(false)}
 *   onSubmit={handleUpdateMember}
 *   member={selectedMember}
 *   mode="edit"
 * />
 * ```
 *
 * @param props - Component props as defined in MemberFormProps
 * @returns JSX element representing the member form dialog
 *
 * @since 1.0.0
 */
export const MemberForm: FC<MemberFormProps> = ({
  open,
  onClose,
  onSubmit,
  member,
  mode,
}) => {
  // State management for form data and UI state
  const [books, setBooks] = useState<Book[]>([]);
  const [formData, setFormData] = useState<MemberFormData>({
    email: "",
    books: [],
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [booksLoading, setBooksLoading] = useState(true);
  const [emailTouched, setEmailTouched] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);

  /**
   * Fetches all books from the service when the dialog is opened,
   * providing options for book selection in the member form.
   *
   * @async
   * @function loadBooks
   */
  useEffect(() => {
    const loadBooks = async () => {
      try {
        setBooksLoading(true);
        const booksData = await bookService.getAllBooks();
        setBooks(booksData);
      } catch (error) {
        console.error("Failed to load books:", error);
        setErrors(["Failed to load books. Please try again."]);
      } finally {
        setBooksLoading(false);
      }
    };

    if (open) {
      loadBooks();
    }
  }, [open]);

  /**
   * Initialize form data based on mode and member prop
   *
   * Sets up the form with either empty data for add mode or
   * existing member data for edit mode. Resets all form state
   * when dialog opens or mode changes.
   */
  useEffect(() => {
    if (member && mode === "edit") {
      setFormData({
        email: member.email,
        books: member.books,
      });
    } else {
      setFormData({
        email: "",
        books: [],
      });
    }
    setErrors([]);
    setEmailTouched(false); // Reset email touched state when dialog opens
    setIsEmailValid(false); // Reset email validation state when dialog opens
  }, [member, mode, open]);

  /**
   * Handle email input changes with touch tracking
   *
   * Updates the email field value and tracks when the user first
   * interacts with the field.
   *
   * @param event - The change event from the email input
   */
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    // Mark email as touched when user starts typing
    if (!emailTouched) {
      setEmailTouched(true);
    }

    setFormData((prev) => ({
      ...prev,
      email: value,
    }));

    // Clear errors when user starts typing
    if (errors.length > 0) {
      setErrors([]);
    }
  };

  /**
   * Handle email validation status changes
   *
   * Updates the email validation state based on real-time validation
   * from the TextInput component. Used to conditionally show/hide
   * helper text based on email validity.
   *
   * @param isValid - Whether the current email input is valid
   */
  const handleEmailValidationChange = (isValid: boolean) => {
    setIsEmailValid(isValid);
  };

  /**
   * Handle book selection changes
   *
   * Updates the selected books array when user makes selections
   * from the multi-select dropdown.
   *
   * @param event - The change event from the books select component
   */
  const handleBooksChange = (event: SelectChangeEvent<number[]>) => {
    const value = event.target.value;
    setFormData((prev) => ({
      ...prev,
      books: typeof value === "string" ? [] : value,
    }));

    // Clear errors when user makes selection
    if (errors.length > 0) {
      setErrors([]);
    }
  };

  /**
   * Removes a specific book from the member's book selection
   * when the user clicks the delete button on a book chip.
   *
   * @param bookId - The ID of the book to remove
   */
  const handleRemoveBook = (bookId: number) => {
    setFormData((prev) => ({
      ...prev,
      books: prev.books.filter((id) => id !== bookId),
    }));
  };

  /**
   * Validates the form data, handles submission to the parent component,
   * and manages loading states and error handling. Performs client-side
   * validation before attempting submission.
   *
   * @async
   * @function handleSubmit
   */
  const handleSubmit = async () => {
    // Trim email before validation
    const trimmedFormData = {
      ...formData,
      email: formData.email.trim(),
    };

    // Check for spaces-only email
    if (isOnlySpaces(formData.email)) {
      setErrors(["Email field cannot contain only spaces"]);
      return;
    }

    // Validate form
    const validation = validateMemberForm(trimmedFormData);
    if (!validation.isValid) {
      setErrors(validation.errors.map((error) => error.message));
      return;
    }

    setLoading(true);
    setErrors([]);

    try {
      await onSubmit(trimmedFormData);
      onClose();
    } catch (error) {
      console.error("Failed to submit form:", error);
      setErrors(["Failed to save member. Please try again."]);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Filters the available books array to return only the books
   * that are currently selected in the form. Used for displaying
   * selected books as chips.
   *
   * @returns Array of Book objects that are currently selected
   */
  const getSelectedBookTitles = () => {
    return books.filter((book) => formData.books.includes(book.bookId));
  };

  return (
    <StyledDialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      transitionDuration={300}
    >
      <DialogTitleStyled>
        <Box display="flex" alignItems="center" gap={2}>
          {mode === "add" ? (
            <PersonAddIcon color="primary" />
          ) : (
            <PersonIcon color="primary" />
          )}
          {mode === "add" ? "Add New Member" : "Edit Member"}
        </Box>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitleStyled>

      <DialogContent sx={{ padding: 3 }}>
        <FormContainer>
          {errors.length > 0 && (
            <Fade in={errors.length > 0}>
              <TextAlert
                show={errors.length > 0}
                text={errors.join(". ")}
                severity="Error"
              />
            </Fade>
          )}

          <TextInput
            label="Email"
            type="email"
            value={formData.email}
            onChange={handleEmailChange}
            onValidationChange={handleEmailValidationChange}
            disabled={mode === "edit" || loading}
            error={errors.some((err) => err.toLowerCase().includes("email"))}
            helperText={
              mode === "edit"
                ? "Email cannot be changed"
                : emailTouched || formData.email.length > 0
                ? isEmailValid
                  ? "" // Hide helper text when email is valid
                  : "Enter a valid email address"
                : ""
            }
            autoFocus={mode === "add"}
          />

          <FormControl fullWidth disabled={booksLoading || loading}>
            <InputLabel>Books</InputLabel>
            <Select
              multiple
              value={formData.books}
              onChange={handleBooksChange}
              label="Books"
              renderValue={() => `${formData.books.length} book(s) selected`}
            >
              {books.map((book) => (
                <MenuItem key={book.bookId} value={book.bookId}>
                  <Box>
                    <Box fontWeight="bold">{book.title}</Box>
                    <Box color="text.secondary" fontSize="0.875rem">
                      by {book.author} • {book.genre}
                    </Box>
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {formData.books.length > 0 && (
            <Box>
              <InputLabel shrink sx={{ mb: 1, color: "text.primary" }}>
                Selected Books:
              </InputLabel>
              <BookChipContainer>
                {getSelectedBookTitles().map((book) => (
                  <AnimatedChip
                    key={book.bookId}
                    label={book.title}
                    onDelete={() => handleRemoveBook(book.bookId)}
                    color="primary"
                    variant="outlined"
                    size="medium"
                  />
                ))}
              </BookChipContainer>
            </Box>
          )}

          {booksLoading && (
            <LoadingContainer>
              <CircularProgress size={24} />
              <Box>Loading books...</Box>
            </LoadingContainer>
          )}
        </FormContainer>
      </DialogContent>

      <DialogActions
        sx={{ padding: 3, borderTop: "1px solid", borderColor: "divider" }}
      >
        <Button
          onClick={onClose}
          disabled={loading}
          color="inherit"
          size="large"
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={loading || booksLoading}
          variant="contained"
          color="primary"
          size="large"
        >
          {loading ? (
            <>
              <CircularProgress size={20} sx={{ mr: 1 }} />
              {mode === "add" ? "Adding..." : "Updating..."}
            </>
          ) : mode === "add" ? (
            "Add Member"
          ) : (
            "Update Member"
          )}
        </Button>
      </DialogActions>
    </StyledDialog>
  );
};
