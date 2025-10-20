import React, { useState, useEffect, FC, ChangeEvent } from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import CloseIcon from "@mui/icons-material/Close";
import Fade from "@mui/material/Fade";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import PersonIcon from "@mui/icons-material/Person";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import ActionButton from "../Button/Action";
import CustomChip from "../CustomChip";
import {
  BookChipContainer,
  DialogTitleStyled,
  FormContainer,
  LoadingContainer,
  SectionLabel,
  StyledDialog,
  StyledDialogActions,
  StyledDialogContent,
} from "./MemberForm.styles";
import { Book } from "../../../types/book";
import { bookService } from "../../../services/Books/Books";
import { MemberFormData } from "../../../types/member";
import { MemberFormProps } from "./MemberForm.types";
import TextAlert from "../TextAlert/TextAlert";
import TextInput from "../TextInput/TextInput";
import { validateMemberForm, isOnlySpaces } from "../../../utils/validation";

/**
 * @component
 * @description MemberForm component for creating and editing members
 * @param props - Component props as defined in MemberFormProps
 * @returns JSX element representing the member form dialog
 */
const MemberForm: FC<MemberFormProps> = ({
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
   * @function loadBooks
   * @description Fetches all books from the service when the dialog is opened,
   * providing options for book selection in the member form.
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
   * @function initializeFormData
   * @description Initialize form data based on mode and member prop.
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
   * @function handleEmailChange
   * @description Handle email input changes with touch tracking.
   * Updates the email field value and tracks when the user first
   * interacts with the field.
   * @param event - The change event from the email input
   */
  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
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
   * @function handleEmailValidationChange
   * @description Handle email validation state based on real-time validation
   * from the TextInput component. Used to conditionally show/hide
   * helper text based on email validity.
   * @param isValid - Whether the current email input is valid
   */
  const handleEmailValidationChange = (isValid: boolean) => {
    setIsEmailValid(isValid);
  };

  /**
   * @function handleBooksChange
   * @description Handle book selection changes.
   * Updates the selected books array when user makes selections
   * from the multi-select dropdown.
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
   * @function handleRemoveBook
   * @description Removes a specific book from the member's book selection
   * when the user clicks the delete button on a book chip.
   * @param bookId - The ID of the book to remove
   */
  const handleRemoveBook = (bookId: number) => {
    setFormData((prev) => ({
      ...prev,
      books: prev.books.filter((id) => id !== bookId),
    }));
  };

  /**
   * @function handleSubmit
   * @description Validates the form data, handles submission to the parent component,
   * and manages loading states and error handling. Performs client-side
   * validation before attempting submission.
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
   * @function getSelectedBookTitles
   * @description Filters the available books array to return only the books
   * that are currently selected in the form.
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

      <StyledDialogContent>
        <FormContainer>
          {errors.length > 0 && (
            <Fade in={errors.length > 0}>
              <TextAlert
                mode="add"
                show={errors.length > 0}
                severity="Error"
                text={errors.join(". ")}
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
              <SectionLabel shrink>Selected Books:</SectionLabel>
              <BookChipContainer>
                {getSelectedBookTitles().map((book) => (
                  <CustomChip
                    key={book.bookId}
                    label={book.title}
                    onDelete={() => handleRemoveBook(book.bookId)}
                    color="primary"
                    variant="outlined"
                    size="medium"
                    chipVariant="animated"
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
      </StyledDialogContent>

      <StyledDialogActions>
        <ActionButton
          onClick={onClose}
          disabled={loading}
          color="inherit"
          size="large"
        >
          Cancel
        </ActionButton>
        <ActionButton
          onClick={handleSubmit}
          loading={loading || booksLoading}
          loadingText={mode === "add" ? "Adding..." : "Updating..."}
          variant="contained"
          color="primary"
          size="large"
        >
          {mode === "add" ? "Add Member" : "Update Member"}
        </ActionButton>
      </StyledDialogActions>
    </StyledDialog>
  );
};

export default MemberForm;
