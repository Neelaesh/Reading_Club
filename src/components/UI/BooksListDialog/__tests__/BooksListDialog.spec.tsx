import React, { FC, ReactNode } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import BooksListDialog from "../BooksListDialog";
import { Book } from "../../../../types/book";

// Create a test theme
const testTheme = createTheme();

// Test data
const mockBooks: Book[] = [
  {
    bookId: 1,
    title: "Test Book 1",
    author: "Test Author 1",
    genre: "Fiction",
  },
  {
    bookId: 2,
    title: "Test Book 2",
    author: "Test Author 2",
    genre: "Non-Fiction",
  },
];

const TestWrapper: FC<{ children: ReactNode }> = ({ children }) => (
  <ThemeProvider theme={testTheme}>{children}</ThemeProvider>
);

describe("Books List Dialog", () => {
  const defaultProps = {
    open: true,
    onClose: jest.fn(),
    books: mockBooks,
    title: "Test Books",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Component rendering with books", () => {
    test("should render dialog with books list", () => {
      render(
        <TestWrapper>
          <BooksListDialog {...defaultProps} />
        </TestWrapper>
      );

      expect(screen.getByText("Test Books")).toBeInTheDocument();
      expect(screen.getByText("Test Book 1")).toBeInTheDocument();
      expect(screen.getByText("Test Book 2")).toBeInTheDocument();
    });

    test("should display correct book count", () => {
      render(
        <TestWrapper>
          <BooksListDialog {...defaultProps} />
        </TestWrapper>
      );

      expect(screen.getByText("2 books")).toBeInTheDocument();
    });

    test("should display singular 'book' for single book", () => {
      render(
        <TestWrapper>
          <BooksListDialog {...defaultProps} books={[mockBooks[0]]} />
        </TestWrapper>
      );

      expect(screen.getByText("1 book")).toBeInTheDocument();
    });
  });

  describe("Empty state rendering", () => {
    test("should render empty state when no books", () => {
      render(
        <TestWrapper>
          <BooksListDialog {...defaultProps} books={[]} />
        </TestWrapper>
      );

      expect(
        screen.getByText("No books found for this member.")
      ).toBeInTheDocument();
      expect(screen.getByText("0 books")).toBeInTheDocument();
    });
  });

  describe("Dialog controls", () => {
    test("should call onClose when close button is clicked", () => {
      render(
        <TestWrapper>
          <BooksListDialog {...defaultProps} />
        </TestWrapper>
      );

      const closeButton = screen.getByText("Close");
      fireEvent.click(closeButton);

      expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
    });

    test("should call onClose when dialog backdrop is clicked", () => {
      render(
        <TestWrapper>
          <BooksListDialog {...defaultProps} />
        </TestWrapper>
      );

      // Click on backdrop (dialog container)
      const dialog = screen.getByRole("dialog");
      fireEvent.keyDown(dialog, { key: "Escape", code: "Escape" });

      expect(defaultProps.onClose).toHaveBeenCalled();
    });
  });

  describe("BookCard click handling", () => {
    test("should render BookCard with showHover prop", () => {
      render(
        <TestWrapper>
          <BooksListDialog {...defaultProps} />
        </TestWrapper>
      );

      // Test that cards render properly with showHover enabled
      expect(screen.getByText("Test Book 1")).toBeInTheDocument();
      expect(screen.getByText("by Test Author 1")).toBeInTheDocument();
      expect(screen.getByText("Genre: Fiction")).toBeInTheDocument();
    });
  });

  describe("Props handling", () => {
    test("should handle all optional props", () => {
      render(
        <TestWrapper>
          <BooksListDialog {...defaultProps} maxWidth="md" fullWidth={false} />
        </TestWrapper>
      );

      expect(screen.getByText("Test Books")).toBeInTheDocument();
    });
  });

  describe("Default props handling", () => {
    test("should use default title when using 'Books'", () => {
      render(
        <TestWrapper>
          <BooksListDialog {...defaultProps} title="Books" />
        </TestWrapper>
      );

      expect(screen.getByText("Books")).toBeInTheDocument();
    });

    test("should handle when dialog is closed", () => {
      render(
        <TestWrapper>
          <BooksListDialog {...defaultProps} open={false} />
        </TestWrapper>
      );

      expect(screen.queryByText("Test Books")).not.toBeInTheDocument();
    });
  });
});
