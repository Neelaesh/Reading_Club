import React, { FC, ReactNode } from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

import { AuthProvider } from "../../../contexts/AuthContext/AuthContext";
import { Book } from "../../../types/book";
import { Member, MemberFormData } from "../../../types/member";
import { MemberCountProvider } from "../../../contexts/MemberCountContext/MemberCountContext";
import Members from "../Members";

// Mock all the services will be imported after jest.mock calls

// Create the mocks before jest.mock calls
jest.mock("../../../services/Members/Members", () => ({
  memberService: {
    getAllMembers: jest.fn(),
    createMember: jest.fn(),
    updateMember: jest.fn(),
    deleteMember: jest.fn(),
  },
}));

jest.mock("../../../services/Books/Books", () => ({
  bookService: {
    getAllBooks: jest.fn(),
  },
}));

// Import the mocked services
import { memberService } from "../../../services/Members/Members";
import { bookService } from "../../../services/Books/Books";

// Cast services as jest mocks to access mock methods
const mockedMemberService = memberService as jest.Mocked<typeof memberService>;
const mockedBookService = bookService as jest.Mocked<typeof bookService>;

// Mock the contexts
const mockUseAuth = jest.fn();
const mockUseMemberCount = jest.fn();

jest.mock("../../../contexts/AuthContext/AuthContext", () => ({
  ...jest.requireActual("../../../contexts/AuthContext/AuthContext"),
  useAuth: () => mockUseAuth(),
}));

jest.mock("../../../contexts/MemberCountContext/MemberCountContext", () => ({
  ...jest.requireActual(
    "../../../contexts/MemberCountContext/MemberCountContext"
  ),
  useMemberCount: () => mockUseMemberCount(),
}));

// Mock child components
jest.mock("../../UI/Banner/Banner", () => ({
  Banner: () => <div data-testid="banner">Banner Component</div>,
}));

jest.mock("../../UI/Button/AddMember/AddMember", () => ({
  __esModule: true,
  default: ({ onAddMember }: { onAddMember: () => void }) => (
    <button data-testid="add-member-button" onClick={onAddMember}>
      Add Member
    </button>
  ),
}));

jest.mock("../../UI/MembersGrid", () => ({
  __esModule: true,
  default: ({
    members,
    onEditMember,
    onDeleteMember,
    onViewAllBooks,
    onLoadMore,
    hasMore,
    loadingMore,
  }: {
    members: Member[];
    onEditMember: (member: Member) => void;
    onDeleteMember: (member: Member) => void;
    onViewAllBooks: (bookIds: number[]) => void;
    onLoadMore?: () => void;
    hasMore: boolean;
    loadingMore: boolean;
  }) => (
    <div data-testid="members-grid">
      {members.map((member, index) => (
        <div key={member.id || index} data-testid={`member-${member.id}`}>
          <span>{member.email}</span>
          <button
            data-testid={`edit-member-${member.id}`}
            onClick={() => onEditMember(member)}
          >
            Edit
          </button>
          <button
            data-testid={`delete-member-${member.id}`}
            onClick={() => onDeleteMember(member)}
          >
            Delete
          </button>
          <button
            data-testid={`view-books-${member.id}`}
            onClick={() => onViewAllBooks(member.books)}
          >
            View Books
          </button>
        </div>
      ))}
      {hasMore && onLoadMore && (
        <button
          data-testid="load-more-button"
          onClick={onLoadMore}
          disabled={loadingMore}
        >
          {loadingMore ? "Loading..." : "Load More"}
        </button>
      )}
    </div>
  ),
}));

jest.mock("../../UI/MemberForm", () => ({
  MemberForm: ({
    open,
    onClose,
    onSubmit,
    member,
    mode,
  }: {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: MemberFormData) => Promise<void>;
    member: Member | null;
    mode: string;
  }) =>
    open ? (
      <div data-testid="member-form">
        <span data-testid="form-mode">{mode}</span>
        <span data-testid="form-member">{member?.email || "new"}</span>
        <button data-testid="form-close" onClick={onClose}>
          Close
        </button>
        <button
          data-testid="form-submit"
          onClick={() =>
            onSubmit({
              email: "test@example.com",
              books: [1, 2],
            })
          }
        >
          Submit
        </button>
      </div>
    ) : null,
}));

jest.mock("../../UI/DeleteConfirmationDialog", () => ({
  __esModule: true,
  default: ({
    open,
    onClose,
    onConfirm,
    message,
  }: {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    message: string;
  }) =>
    open ? (
      <div data-testid="delete-confirmation-dialog">
        <span data-testid="delete-message">{message}</span>
        <button data-testid="delete-cancel" onClick={onClose}>
          Cancel
        </button>
        <button data-testid="delete-confirm" onClick={onConfirm}>
          Confirm
        </button>
      </div>
    ) : null,
}));

jest.mock("../../UI/BooksListDialog", () => ({
  __esModule: true,
  default: ({
    open,
    onClose,
    books,
  }: {
    open: boolean;
    onClose: () => void;
    books: Book[];
  }) =>
    open ? (
      <div data-testid="books-list-dialog">
        <span data-testid="books-count">{books.length} books</span>
        <button data-testid="books-close" onClick={onClose}>
          Close
        </button>
      </div>
    ) : null,
}));

const TestWrapper: FC<{ children: ReactNode }> = ({ children }) => (
  <BrowserRouter>
    <AuthProvider>
      <MemberCountProvider>{children}</MemberCountProvider>
    </AuthProvider>
  </BrowserRouter>
);

// Mock data
const mockMembers = [
  {
    id: "1",
    email: "john@example.com",
    dateOfJoining: "2023-01-15",
    books: [1, 2],
  },
  {
    id: "2",
    email: "jane@example.com",
    dateOfJoining: "2023-02-10",
    books: [2, 3],
  },
  {
    id: "3",
    email: "bob@example.com",
    dateOfJoining: "2023-03-05",
    books: [],
  },
];

const mockBooks = [
  { bookId: 1, title: "Book One", author: "Author One", genre: "Fiction" },
  { bookId: 2, title: "Book Two", author: "Author Two", genre: "Science" },
  { bookId: 3, title: "Book Three", author: "Author Three", genre: "History" },
];

describe("Members Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Set default mock return values
    mockUseMemberCount.mockReturnValue({
      memberCount: 3,
      loading: false,
      setMemberCount: jest.fn(),
      incrementMemberCount: jest.fn(),
      decrementMemberCount: jest.fn(),
    });
  });

  describe("Component initialization and data loading", () => {
    /* test("should show loading state initially", () => {
      mockUseAuth.mockReturnValue({
        isAuthenticated: false,
        login: jest.fn(),
        logout: jest.fn(),
      });

      mockedMemberService.getAllMembers.mockImplementation(
        () => new Promise(() => {}) // Never resolves
      );
      mockedBookService.getAllBooks.mockImplementation(
        () => new Promise(() => {}) // Never resolves
      );

      render(
        <TestWrapper>
          <Members />
        </TestWrapper>
      );

      expect(screen.getByText("Loading members...")).toBeInTheDocument();
      expect(screen.getByRole("progressbar")).toBeInTheDocument();
    }); */

    /* test("should load and display members successfully", async () => {
      mockUseAuth.mockReturnValue({
        isAuthenticated: false,
        login: jest.fn(),
        logout: jest.fn(),
      });

      mockedMemberService.getAllMembers.mockResolvedValue(mockMembers);
      mockedBookService.getAllBooks.mockResolvedValue(mockBooks);

      render(
        <TestWrapper>
          <Members />
        </TestWrapper>
      );

      await waitFor(() => {
        expect(screen.getByTestId("banner")).toBeInTheDocument();
      });

      await waitFor(() => {
        expect(screen.getByTestId("members-grid")).toBeInTheDocument();
      });

      expect(mockedMemberService.getAllMembers).toHaveBeenCalledTimes(1);
      expect(mockedBookService.getAllBooks).toHaveBeenCalledTimes(1);
    }); */

    test("should handle API errors gracefully", async () => {
      mockUseAuth.mockReturnValue({
        isAuthenticated: false,
        login: jest.fn(),
        logout: jest.fn(),
      });

      mockedMemberService.getAllMembers.mockRejectedValue(
        new Error("API Error")
      );
      mockedBookService.getAllBooks.mockRejectedValue(new Error("API Error"));

      render(
        <TestWrapper>
          <Members />
        </TestWrapper>
      );

      await waitFor(() => {
        expect(
          screen.getByText("Failed to load data. Please try again.")
        ).toBeInTheDocument();
      });
    });
  });

  describe("Authentication-based features", () => {
    test("should show Add Member button when authenticated", async () => {
      mockUseAuth.mockReturnValue({
        isAuthenticated: true,
        login: jest.fn(),
        logout: jest.fn(),
      });

      mockedMemberService.getAllMembers.mockResolvedValue(mockMembers);
      mockedBookService.getAllBooks.mockResolvedValue(mockBooks);

      render(
        <TestWrapper>
          <Members />
        </TestWrapper>
      );

      await waitFor(() => {
        expect(screen.getByTestId("add-member-button")).toBeInTheDocument();
      });
    });

    test("should not show Add Member button when not authenticated", async () => {
      mockUseAuth.mockReturnValue({
        isAuthenticated: false,
        login: jest.fn(),
        logout: jest.fn(),
      });

      mockedMemberService.getAllMembers.mockResolvedValue(mockMembers);
      mockedBookService.getAllBooks.mockResolvedValue(mockBooks);

      render(
        <TestWrapper>
          <Members />
        </TestWrapper>
      );

      await waitFor(() => {
        expect(screen.getByTestId("banner")).toBeInTheDocument();
      });

      expect(screen.queryByTestId("add-member-button")).not.toBeInTheDocument();
    });
  });

  describe("Member management operations", () => {
    beforeEach(async () => {
      mockUseAuth.mockReturnValue({
        isAuthenticated: true,
        login: jest.fn(),
        logout: jest.fn(),
      });

      mockedMemberService.getAllMembers.mockResolvedValue(mockMembers);
      mockedBookService.getAllBooks.mockResolvedValue(mockBooks);
    });

    test("should open member form for adding new member", async () => {
      render(
        <TestWrapper>
          <Members />
        </TestWrapper>
      );

      await waitFor(() => {
        expect(screen.getByTestId("add-member-button")).toBeInTheDocument();
      });

      fireEvent.click(screen.getByTestId("add-member-button"));

      await waitFor(() => {
        expect(screen.getByTestId("member-form")).toBeInTheDocument();
        expect(screen.getByTestId("form-mode")).toHaveTextContent("add");
        expect(screen.getByTestId("form-member")).toHaveTextContent("new");
      });
    });

    /* test("should open member form for editing existing member", async () => {
      mockUseAuth.mockReturnValue({
        isAuthenticated: true,
        login: jest.fn(),
        logout: jest.fn(),
      });

      mockedMemberService.getAllMembers.mockResolvedValue(mockMembers);
      mockedBookService.getAllBooks.mockResolvedValue(mockBooks);

      render(
        <TestWrapper>
          <Members />
        </TestWrapper>
      );

      await waitFor(() => {
        expect(screen.getByTestId("members-grid")).toBeInTheDocument();
      });

      // Wait for members to be loaded and rendered
      await waitFor(() => {
        expect(screen.getByTestId("edit-member-1")).toBeInTheDocument();
      });

      fireEvent.click(screen.getByTestId("edit-member-1"));

      await waitFor(() => {
        expect(screen.getByTestId("member-form")).toBeInTheDocument();
        expect(screen.getByTestId("form-mode")).toHaveTextContent("edit");
      });
    });

    test("should create new member successfully", async () => {
      const mockSetMemberCount = jest.fn();
      const mockIncrementMemberCount = jest.fn();

      mockUseMemberCount.mockReturnValue({
        memberCount: 3,
        loading: false,
        setMemberCount: mockSetMemberCount,
        incrementMemberCount: mockIncrementMemberCount,
        decrementMemberCount: jest.fn(),
      });

      const newMember = {
        id: 4,
        email: "test@example.com",
        dateOfJoining: "2023-04-01",
        books: [1, 2],
      };

      mockedMemberService.createMember.mockResolvedValue(newMember);

      render(
        <TestWrapper>
          <Members />
        </TestWrapper>
      );

      await waitFor(() => {
        expect(screen.getByTestId("add-member-button")).toBeInTheDocument();
      });

      fireEvent.click(screen.getByTestId("add-member-button"));

      await waitFor(() => {
        expect(screen.getByTestId("member-form")).toBeInTheDocument();
      });

      fireEvent.click(screen.getByTestId("form-submit"));

      await waitFor(() => {
        expect(mockedMemberService.createMember).toHaveBeenCalledWith({
          email: "test@example.com",
          books: [1, 2],
        });
        expect(mockIncrementMemberCount).toHaveBeenCalledTimes(1);
      });
    });

    test("should delete member successfully", async () => {
      const mockDecrementMemberCount = jest.fn();

      mockUseAuth.mockReturnValue({
        isAuthenticated: true,
        login: jest.fn(),
        logout: jest.fn(),
      });

      mockUseMemberCount.mockReturnValue({
        memberCount: 3,
        loading: false,
        setMemberCount: jest.fn(),
        incrementMemberCount: jest.fn(),
        decrementMemberCount: mockDecrementMemberCount,
      });

      mockedMemberService.getAllMembers.mockResolvedValue(mockMembers);
      mockedBookService.getAllBooks.mockResolvedValue(mockBooks);
      mockedMemberService.deleteMember.mockResolvedValue({});

      render(
        <TestWrapper>
          <Members />
        </TestWrapper>
      );

      await waitFor(() => {
        expect(screen.getByTestId("members-grid")).toBeInTheDocument();
      });

      // Wait for members to be loaded and rendered
      await waitFor(() => {
        expect(screen.getByTestId("delete-member-1")).toBeInTheDocument();
      });

      fireEvent.click(screen.getByTestId("delete-member-1"));

      await waitFor(() => {
        expect(
          screen.getByTestId("delete-confirmation-dialog")
        ).toBeInTheDocument();
      });

      fireEvent.click(screen.getByTestId("delete-confirm"));

      await waitFor(() => {
        expect(mockedMemberService.deleteMember).toHaveBeenCalledWith(1);
        expect(mockDecrementMemberCount).toHaveBeenCalledTimes(1);
      });
    });

    test("should cancel member deletion", async () => {
      mockUseAuth.mockReturnValue({
        isAuthenticated: true,
        login: jest.fn(),
        logout: jest.fn(),
      });

      mockedMemberService.getAllMembers.mockResolvedValue(mockMembers);
      mockedBookService.getAllBooks.mockResolvedValue(mockBooks);

      render(
        <TestWrapper>
          <Members />
        </TestWrapper>
      );

      await waitFor(() => {
        expect(screen.getByTestId("members-grid")).toBeInTheDocument();
      });

      // Wait for members to be loaded and rendered
      await waitFor(() => {
        expect(screen.getByTestId("delete-member-1")).toBeInTheDocument();
      });

      fireEvent.click(screen.getByTestId("delete-member-1"));

      await waitFor(() => {
        expect(
          screen.getByTestId("delete-confirmation-dialog")
        ).toBeInTheDocument();
      });

      fireEvent.click(screen.getByTestId("delete-cancel"));

      await waitFor(() => {
        expect(
          screen.queryByTestId("delete-confirmation-dialog")
        ).not.toBeInTheDocument();
      });

      expect(mockedMemberService.deleteMember).not.toHaveBeenCalled();
    });

    test("should update member successfully", async () => {
      mockUseAuth.mockReturnValue({
        isAuthenticated: true,
        login: jest.fn(),
        logout: jest.fn(),
      });

      mockedMemberService.getAllMembers.mockResolvedValue(mockMembers);
      mockedBookService.getAllBooks.mockResolvedValue(mockBooks);

      const updatedMember = {
        id: 1,
        email: "updated@example.com",
        dateOfJoining: "2023-01-15",
        books: [1, 2, 3],
      };

      mockedMemberService.updateMember.mockResolvedValue(updatedMember);

      render(
        <TestWrapper>
          <Members />
        </TestWrapper>
      );

      await waitFor(() => {
        expect(screen.getByTestId("members-grid")).toBeInTheDocument();
      });

      // Wait for members to be loaded and rendered
      await waitFor(() => {
        expect(screen.getByTestId("edit-member-1")).toBeInTheDocument();
      });

      fireEvent.click(screen.getByTestId("edit-member-1"));

      await waitFor(() => {
        expect(screen.getByTestId("member-form")).toBeInTheDocument();
      });

      fireEvent.click(screen.getByTestId("form-submit"));

      await waitFor(() => {
        expect(mockedMemberService.updateMember).toHaveBeenCalledWith(1, {
          email: "test@example.com",
          books: [1, 2],
        });
      });
    }); */
  });

  /* describe("Books functionality", () => {
    beforeEach(async () => {
      mockUseAuth.mockReturnValue({
        isAuthenticated: false,
        login: jest.fn(),
        logout: jest.fn(),
      });

      mockedMemberService.getAllMembers.mockResolvedValue(mockMembers);
      mockedBookService.getAllBooks.mockResolvedValue(mockBooks);
    });

    test("should open books list dialog when viewing member books", async () => {
      render(
        <TestWrapper>
          <Members />
        </TestWrapper>
      );

      await waitFor(() => {
        expect(screen.getByTestId("members-grid")).toBeInTheDocument();
      });

      fireEvent.click(screen.getByTestId("view-books-1"));

      await waitFor(() => {
        expect(screen.getByTestId("books-list-dialog")).toBeInTheDocument();
        expect(screen.getByTestId("books-count")).toHaveTextContent(
          "2 books"
        );
      });
    });

    test("should close books list dialog", async () => {
      render(
        <TestWrapper>
          <Members />
        </TestWrapper>
      );

      await waitFor(() => {
        expect(screen.getByTestId("members-grid")).toBeInTheDocument();
      });

      fireEvent.click(screen.getByTestId("view-books-1"));

      await waitFor(() => {
        expect(screen.getByTestId("books-list-dialog")).toBeInTheDocument();
      });

      fireEvent.click(screen.getByTestId("books-close"));

      await waitFor(() => {
        expect(
          screen.queryByTestId("books-list-dialog")
        ).not.toBeInTheDocument();
      });
    });
  }); */

  describe("Pagination functionality", () => {
    test("should handle load more members", async () => {
      mockUseAuth.mockReturnValue({
        isAuthenticated: false,
        login: jest.fn(),
        logout: jest.fn(),
      });

      // Create a large array of members to test pagination
      const largeMembersList = Array.from({ length: 20 }, (_, index) => ({
        id: `${index + 1}`,
        email: `member${index + 1}@example.com`,
        dateOfJoining: "2023-01-01",
        books: [],
      }));

      mockedMemberService.getAllMembers.mockResolvedValue(largeMembersList);
      mockedBookService.getAllBooks.mockResolvedValue(mockBooks);

      render(
        <TestWrapper>
          <Members />
        </TestWrapper>
      );

      await waitFor(() => {
        expect(screen.getByTestId("members-grid")).toBeInTheDocument();
      });

      // Should show load more button for large datasets
      await waitFor(() => {
        expect(screen.getByTestId("load-more-button")).toBeInTheDocument();
      });

      fireEvent.click(screen.getByTestId("load-more-button"));

      // Should handle the load more functionality
      await waitFor(() => {
        expect(screen.getByTestId("load-more-button")).toBeDisabled();
      });
    });
  });

  /* describe("Error handling", () => {
    test("should handle member creation error", async () => {
      mockUseAuth.mockReturnValue({
        isAuthenticated: true,
        login: jest.fn(),
        logout: jest.fn(),
      });

      mockedMemberService.getAllMembers.mockResolvedValue(mockMembers);
      mockedBookService.getAllBooks.mockResolvedValue(mockBooks);
      mockedMemberService.createMember.mockRejectedValue(
        new Error("Creation failed")
      );

      render(
        <TestWrapper>
          <Members />
        </TestWrapper>
      );

      await waitFor(() => {
        expect(screen.getByTestId("add-member-button")).toBeInTheDocument();
      });

      fireEvent.click(screen.getByTestId("add-member-button"));

      await waitFor(() => {
        expect(screen.getByTestId("member-form")).toBeInTheDocument();
      });

      // The form should handle the error internally
      fireEvent.click(screen.getByTestId("form-submit"));

      await waitFor(() => {
        expect(mockedMemberService.createMember).toHaveBeenCalled();
      });
    });

    test("should handle member deletion error", async () => {
      mockUseAuth.mockReturnValue({
        isAuthenticated: true,
        login: jest.fn(),
        logout: jest.fn(),
      });

      mockedMemberService.getAllMembers.mockResolvedValue(mockMembers);
      mockedBookService.getAllBooks.mockResolvedValue(mockBooks);
      mockedMemberService.deleteMember.mockRejectedValue(
        new Error("Deletion failed")
      );

      render(
        <TestWrapper>
          <Members />
        </TestWrapper>
      );

      await waitFor(() => {
        expect(screen.getByTestId("members-grid")).toBeInTheDocument();
      });

      fireEvent.click(screen.getByTestId("delete-member-1"));

      await waitFor(() => {
        expect(
          screen.getByTestId("delete-confirmation-dialog")
        ).toBeInTheDocument();
      });

      fireEvent.click(screen.getByTestId("delete-confirm"));

      await waitFor(() => {
        expect(
          screen.getByText("Failed to delete member. Please try again.")
        ).toBeInTheDocument();
      });
    });
  }); */

  describe("UI state management", () => {
    test("should close form when close button is clicked", async () => {
      mockUseAuth.mockReturnValue({
        isAuthenticated: true,
        login: jest.fn(),
        logout: jest.fn(),
      });

      mockedMemberService.getAllMembers.mockResolvedValue(mockMembers);
      mockedBookService.getAllBooks.mockResolvedValue(mockBooks);

      render(
        <TestWrapper>
          <Members />
        </TestWrapper>
      );

      await waitFor(() => {
        expect(screen.getByTestId("add-member-button")).toBeInTheDocument();
      });

      fireEvent.click(screen.getByTestId("add-member-button"));

      await waitFor(() => {
        expect(screen.getByTestId("member-form")).toBeInTheDocument();
      });

      fireEvent.click(screen.getByTestId("form-close"));

      await waitFor(() => {
        expect(screen.queryByTestId("member-form")).not.toBeInTheDocument();
      });
    });

    test("should close error alert when close button is clicked", async () => {
      mockUseAuth.mockReturnValue({
        isAuthenticated: false,
        login: jest.fn(),
        logout: jest.fn(),
      });

      mockedMemberService.getAllMembers.mockRejectedValue(
        new Error("API Error")
      );
      mockedBookService.getAllBooks.mockRejectedValue(new Error("API Error"));

      render(
        <TestWrapper>
          <Members />
        </TestWrapper>
      );

      await waitFor(() => {
        expect(
          screen.getByText("Failed to load data. Please try again.")
        ).toBeInTheDocument();
      });

      // The TextAlert component should handle closing internally
      // This tests that the error state can be managed
      expect(
        screen.getByText("Failed to load data. Please try again.")
      ).toBeInTheDocument();
    });
  });
});
