import React, { FC, ReactNode } from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import MembersGrid from "../MembersGrid";
import { Member } from "../../../../types/member";
import { Book } from "../../../../types/book";

// Mock the member utility functions
jest.mock("../../../../utils/member", () => ({
  formatDateOfJoining: jest.fn((date: string) => `Formatted ${date}`),
}));

// Create a test theme
const testTheme = createTheme();

// Test data
const mockBooks: Book[] = [
  {
    bookId: 1,
    title: "Book One",
    author: "Author One",
    genre: "Fiction",
  },
  {
    bookId: 2,
    title: "Book Two",
    author: "Author Two",
    genre: "Non-Fiction",
  },
  {
    bookId: 3,
    title: "Book Three",
    author: "Author Three",
    genre: "Science",
  },
  {
    bookId: 4,
    title: "Very Long Book Title That Should Be Truncated in Tooltips",
    author: "Author Four",
    genre: "Fiction",
  },
];

const mockMembers: Member[] = [
  {
    id: "1",
    email: "john@example.com",
    dateOfJoining: "2023-01-15",
    books: [1, 2],
    avatar: "https://example.com/avatar1.jpg",
  },
  {
    id: "2",
    email: "jane@example.com",
    dateOfJoining: "2023-02-20",
    books: [1, 2, 3, 4],
    avatar: "",
  },
  {
    id: "3",
    email: "bob@example.com",
    dateOfJoining: "2023-03-10",
    books: [],
  },
];

const WrapperWithProvider: FC<{ children: ReactNode }> = ({ children }) => (
  <ThemeProvider theme={testTheme}>{children}</ThemeProvider>
);

describe("Members Grid", () => {
  const defaultProps = {
    members: mockMembers,
    allBooks: mockBooks,
    isAuthenticated: true,
    onEditMember: jest.fn(),
    onDeleteMember: jest.fn(),
    onViewAllBooks: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Component rendering", () => {
    test("Should show No members found and Login to manage club members text when members list is empty", () => {
      render(
        <WrapperWithProvider>
          <MembersGrid
            {...defaultProps}
            members={[]}
            loading={false}
            isAuthenticated={false}
          />
        </WrapperWithProvider>
      );

      expect(screen.getByText("No members found")).toBeInTheDocument();
      expect(
        screen.getByText("Login to manage club members")
      ).toBeInTheDocument();
    });

    test("Should render Grids with custom spacing", () => {
      render(
        <WrapperWithProvider>
          <MembersGrid {...defaultProps} spacing={5} />
        </WrapperWithProvider>
      );

      expect(screen.getByText("john@example.com")).toBeInTheDocument();
    });

    test("Should handle members without ID using index as key", () => {
      const membersWithoutIds: Member[] = [
        {
          email: "test@example.com",
          dateOfJoining: "2023-01-01",
          books: [1],
        },
      ];

      render(
        <WrapperWithProvider>
          <MembersGrid {...defaultProps} members={membersWithoutIds} />
        </WrapperWithProvider>
      );

      expect(screen.getByText("test@example.com")).toBeInTheDocument();
    });
  });

  describe("Authentication-based features", () => {
    test("should show action buttons when authenticated", () => {
      render(
        <WrapperWithProvider>
          <MembersGrid {...defaultProps} isAuthenticated={true} />
        </WrapperWithProvider>
      );

      // Check for edit and delete buttons (tooltips)
      const editButtons = screen.getAllByLabelText(/edit member/i);
      const deleteButtons = screen.getAllByLabelText(/delete member/i);

      expect(editButtons).toHaveLength(3); // One for each member
      expect(deleteButtons).toHaveLength(3);
    });

    test("should hide action buttons when not authenticated", () => {
      render(
        <WrapperWithProvider>
          <MembersGrid {...defaultProps} isAuthenticated={false} />
        </WrapperWithProvider>
      );

      // Should not have edit or delete buttons
      expect(screen.queryByLabelText(/edit member/i)).not.toBeInTheDocument();
      expect(screen.queryByLabelText(/delete member/i)).not.toBeInTheDocument();
    });
  });

  describe("Books display and interaction", () => {
    test("Should display singular 'Book' for single book", () => {
      const singleBookMember: Member[] = [
        {
          id: "1",
          email: "single@example.com",
          dateOfJoining: "2023-01-01",
          books: [1],
        },
      ];

      render(
        <WrapperWithProvider>
          <MembersGrid {...defaultProps} members={singleBookMember} />
        </WrapperWithProvider>
      );

      expect(screen.getByText("1 Book")).toBeInTheDocument();
    });

    test("Should call onViewAllBooks when clicking on books with more than 3 books", () => {
      render(
        <WrapperWithProvider>
          <MembersGrid {...defaultProps} />
        </WrapperWithProvider>
      );

      // Find jane's books (4 books) and click
      const janeBooks = screen.getByText("4 Books");
      fireEvent.click(janeBooks);

      expect(defaultProps.onViewAllBooks).toHaveBeenCalledWith([1, 2, 3, 4]);
    });

    test("Should not call onViewAllBooks when clicking on books with 3 or fewer books", () => {
      render(
        <WrapperWithProvider>
          <MembersGrid {...defaultProps} />
        </WrapperWithProvider>
      );

      // Find john's books (2 books) and click
      const johnBooks = screen.getByText("2 Books");
      fireEvent.click(johnBooks);

      expect(defaultProps.onViewAllBooks).not.toHaveBeenCalled();
    });
  });

  describe("Member actions", () => {
    test("Should call onEditMember when edit button is clicked", () => {
      render(
        <WrapperWithProvider>
          <MembersGrid {...defaultProps} />
        </WrapperWithProvider>
      );

      const editButtons = screen.getAllByLabelText(/edit member/i);
      fireEvent.click(editButtons[0]);

      expect(defaultProps.onEditMember).toHaveBeenCalledWith(mockMembers[0]);
    });

    test("Should call onDeleteMember when delete button is clicked", () => {
      render(
        <WrapperWithProvider>
          <MembersGrid {...defaultProps} />
        </WrapperWithProvider>
      );

      const deleteButtons = screen.getAllByLabelText(/delete member/i);
      fireEvent.click(deleteButtons[0]);

      expect(defaultProps.onDeleteMember).toHaveBeenCalledWith(mockMembers[0]);
    });
  });

  describe("Load more functionality", () => {
    test("Should show load more button when hasMore is true", () => {
      render(
        <WrapperWithProvider>
          <MembersGrid
            {...defaultProps}
            hasMore={true}
            onLoadMore={jest.fn()}
          />
        </WrapperWithProvider>
      );

      expect(screen.getByText("Load More Members")).toBeInTheDocument();
    });

    test("Should not show load more button when hasMore is false", () => {
      render(
        <WrapperWithProvider>
          <MembersGrid
            {...defaultProps}
            hasMore={false}
            onLoadMore={jest.fn()}
          />
        </WrapperWithProvider>
      );

      expect(screen.queryByText("Load More Members")).not.toBeInTheDocument();
    });

    test("Should not show load more button when no members are present", () => {
      render(
        <WrapperWithProvider>
          <MembersGrid
            {...defaultProps}
            members={[]}
            hasMore={true}
            onLoadMore={jest.fn()}
          />
        </WrapperWithProvider>
      );

      expect(screen.queryByText("Load More Members")).not.toBeInTheDocument();
    });

    test("Should call onLoadMore when load more button is clicked", () => {
      const mockOnLoadMore = jest.fn();

      render(
        <WrapperWithProvider>
          <MembersGrid
            {...defaultProps}
            hasMore={true}
            onLoadMore={mockOnLoadMore}
          />
        </WrapperWithProvider>
      );

      const loadMoreButton = screen.getByText("Load More Members");
      fireEvent.click(loadMoreButton);

      expect(mockOnLoadMore).toHaveBeenCalledTimes(1);
    });

    test("Should show loading state on load more button", () => {
      render(
        <WrapperWithProvider>
          <MembersGrid
            {...defaultProps}
            hasMore={true}
            loadingMore={true}
            onLoadMore={jest.fn()}
          />
        </WrapperWithProvider>
      );

      expect(screen.getByText("Loading...")).toBeInTheDocument();
    });
  });

  describe("Book tooltip functionality", () => {
    test("Should show 'No books added yet' for members with no books", async () => {
      render(
        <WrapperWithProvider>
          <MembersGrid {...defaultProps} />
        </WrapperWithProvider>
      );

      // Find member with no books (bob@example.com)
      const bobBooks = screen.getByText("0 Books");

      // Hover to show tooltip
      fireEvent.mouseEnter(bobBooks);

      await waitFor(() => {
        expect(screen.getByText("No books added yet")).toBeInTheDocument();
      });
    });

    test("Should handle books not found in allBooks array", () => {
      const memberWithInvalidBooks: Member[] = [
        {
          id: "1",
          email: "invalid@example.com",
          dateOfJoining: "2023-01-01",
          books: [999], // Book ID that doesn't exist
        },
      ];

      render(
        <WrapperWithProvider>
          <MembersGrid {...defaultProps} members={memberWithInvalidBooks} />
        </WrapperWithProvider>
      );

      expect(screen.getByText("1 Book")).toBeInTheDocument();
    });

    test("Should show truncated tooltip for members with many books", async () => {
      render(
        <WrapperWithProvider>
          <MembersGrid {...defaultProps} />
        </WrapperWithProvider>
      );

      // Find member with 4 books (jane@example.com)
      const janeBooks = screen.getByText("4 Books");

      // Hover to show tooltip
      fireEvent.mouseEnter(janeBooks);

      await waitFor(() => {
        // Should show first 3 books + "and 1 more..."
        expect(
          screen.getByText(/Book One, Book Two, Book Three and 1 more.../)
        ).toBeInTheDocument();
      });
    });

    test("Should call onViewAllBooks when clicked on 'Click to view all books' in truncated tooltip", async () => {
      render(
        <WrapperWithProvider>
          <MembersGrid {...defaultProps} />
        </WrapperWithProvider>
      );

      // Find member with 4 books (jane@example.com) - this will have truncated tooltip
      const janeBooks = screen.getByText("4 Books");

      // Hover to show tooltip with truncated content
      fireEvent.mouseEnter(janeBooks);

      await waitFor(() => {
        expect(screen.getByText("Click to view all books")).toBeInTheDocument();
      });

      // Click on "Click to view all books" text in tooltip
      const clickToViewAllBooks = screen.getByText("Click to view all books");
      fireEvent.click(clickToViewAllBooks);

      // Should call onViewAllBooks with jane's book IDs
      expect(defaultProps.onViewAllBooks).toHaveBeenCalledWith([1, 2, 3, 4]);
    });
  });

  describe("Animation and styling", () => {
    test("Should use custom animation delay", () => {
      render(
        <WrapperWithProvider>
          <MembersGrid {...defaultProps} animationDelay={200} />
        </WrapperWithProvider>
      );

      // Component should render with custom animation delay
      expect(screen.getByText("john@example.com")).toBeInTheDocument();
    });

    test("Should use default animation delay when not provided", () => {
      render(
        <WrapperWithProvider>
          <MembersGrid {...defaultProps} />
        </WrapperWithProvider>
      );

      expect(screen.getByText("john@example.com")).toBeInTheDocument();
    });
  });
});
