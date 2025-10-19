import React, { useState, useEffect, useCallback, FC } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Fade from "@mui/material/Fade";

import AddMemberButton from "../UI/Button/AddMember/AddMember";
import { Banner } from "../UI/Banner/Banner";
import { Book } from "../../types/book";
import { bookService } from "../../services/Books/Books";
import BooksListDialog from "../UI/BooksListDialog";
import DeleteConfirmationDialog from "../UI/DeleteConfirmationDialog";
import {
  INITIAL_MEMBERS_COUNT,
  LOAD_MORE_INCREMENT,
} from "../../constants/pagination";
import { LoadingContainer, MainContainer } from "./Members.styles";
import { Member, MemberFormData } from "../../types/member";
import { MemberForm } from "../UI/MemberForm";
import MembersGrid from "../UI/MembersGrid";
import { memberService } from "../../services/Members/Members";
import { PaginatedResponse } from "../../types/api";
import { sortMembersByDateDesc } from "../../utils/member";
import { TextAlert } from "../UI/TextAlert";
import { useAuth } from "../../contexts/AuthContext/AuthContext";
import { useMemberCount } from "../../contexts/MemberCountContext";

/**
 * @component Members
 * @description Members component for displaying and managing reading club members
 * with pagination, CRUD operations, and responsive grid layout
 * @returns JSX element representing the members management page
 */
const Members: FC = () => {
  const { isAuthenticated } = useAuth();
  const { setMemberCount, decrementMemberCount, incrementMemberCount } =
    useMemberCount();

  const [allMembers, setAllMembers] = useState<Member[]>([]);
  const [displayedMembers, setDisplayedMembers] = useState<Member[]>([]);
  const [allBooks, setAllBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [memberFormOpen, setMemberFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<"add" | "edit">("add");
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState<Member | null>(null);
  const [viewBooksDialogOpen, setViewBooksDialogOpen] = useState(false);
  const [selectedMemberBooks, setSelectedMemberBooks] = useState<Book[]>([]);

  /**
   * @function loadInitialData
   * @description Load initial members data from the server and set up pagination.
   * Fetches all members, sorts them by date descending, and displays the initial
   * count while determining if more members are available for pagination.
   */
  const loadInitialData = useCallback(async () => {
    try {
      setLoading(true);
      setShowError(false);
      setError(null);

      // Load both members and books in parallel
      const [membersResponse, booksResponse] = await Promise.all([
        memberService.getAllMembers(),
        bookService.getAllBooks(),
      ]);

      // Process members response
      let members: Member[];
      if ("data" in membersResponse) {
        const paginatedResponse = membersResponse as PaginatedResponse<Member>;
        members = paginatedResponse.data;
      } else {
        members = membersResponse as Member[];
      }

      // Store all books for title lookup
      setAllBooks(booksResponse);

      // Store all members and display first 12
      const sortedMembers = sortMembersByDateDesc(members);
      setAllMembers(sortedMembers);
      setDisplayedMembers(sortedMembers.slice(0, INITIAL_MEMBERS_COUNT));
      setHasMore(sortedMembers.length > INITIAL_MEMBERS_COUNT);

      // Update member count context with the total count
      setMemberCount(sortedMembers.length);
    } catch (err) {
      console.error("Failed to load data:", err);
      setShowError(true);
      setError("Failed to load data. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [setMemberCount]);

  /**
   * @function handleViewAllBooks
   * @description Open modal to show all books for a member
   * @param bookIds - Array of book IDs
   */
  const handleViewAllBooks = useCallback(
    (bookIds: number[]) => {
      const books = bookIds
        .map((id) => allBooks.find((book) => book.bookId === id))
        .filter((book): book is Book => book !== undefined);
      setSelectedMemberBooks(books);
      setViewBooksDialogOpen(true);
    },
    [allBooks]
  );

  useEffect(() => {
    loadInitialData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * @function loadMoreMembers
   * @description Load additional members when the "Load More" button is clicked
   */
  const loadMoreMembers = async () => {
    if (!hasMore || loadingMore) return;

    try {
      setLoadingMore(true);

      // Calculate how many members to show next
      const currentCount = displayedMembers.length;
      const nextCount = Math.min(
        currentCount + LOAD_MORE_INCREMENT,
        allMembers.length
      );

      // Simulate loading delay for better UX
      await new Promise((resolve) => setTimeout(resolve, 500));

      setDisplayedMembers(allMembers.slice(0, nextCount));
      setHasMore(nextCount < allMembers.length);
    } catch (err) {
      console.error("Failed to load more members:", err);
      setShowError(true);
      setError("Failed to load more members. Please try again.");
    } finally {
      setLoadingMore(false);
    }
  };

  /**
   * @function handleAddMember
   * @description Initialize the member form for adding a new member
   */
  const handleAddMember = useCallback(() => {
    setFormMode("add");
    setEditingMember(null);
    setMemberFormOpen(true);
  }, []);

  /**
   * @function handleEditMember
   * @description Initialize the member form for editing an existing member.
   * @param member - The member object to be edited
   */
  const handleEditMember = (member: Member) => {
    if (!isAuthenticated) return;
    setFormMode("edit");
    setEditingMember(member);
    setMemberFormOpen(true);
  };

  /**
   * @function handleDeleteClick
   * @description Initiate the member deletion process by opening confirmation dialog
   * @param member - The member object to be deleted
   */
  const handleDeleteClick = (member: Member) => {
    if (!isAuthenticated) return;
    setMemberToDelete(member);
    setDeleteConfirmOpen(true);
  };

  /**
   * @function handleDeleteConfirm
   * @description Execute the member deletion after user confirmation
   */
  const handleDeleteConfirm = async () => {
    if (!memberToDelete?.id) return;

    try {
      await memberService.deleteMember(memberToDelete.id);

      // Update allMembers first
      const updatedAllMembers = allMembers.filter(
        (m: Member) => m.id !== memberToDelete.id
      );
      setAllMembers(updatedAllMembers);

      // Maintain the same display count by backfilling from remaining members
      const currentDisplayCount = displayedMembers.length;
      const updatedDisplayedMembers = updatedAllMembers.slice(
        0,
        currentDisplayCount
      );
      setDisplayedMembers(updatedDisplayedMembers);

      // Update hasMore status
      setHasMore(updatedAllMembers.length > currentDisplayCount);

      setDeleteConfirmOpen(false);
      setMemberToDelete(null);

      // Update member count
      decrementMemberCount();
    } catch (err) {
      console.error("Failed to delete member:", err);
      setShowError(true);
      setError("Failed to delete member. Please try again.");
    }
  };

  /**
   * @function handleFormSubmit
   * @description Process member form submission for both add and edit operations.
   * @param formData - The member form data containing email and books information
   */
  const handleFormSubmit = async (formData: MemberFormData) => {
    try {
      if (formMode === "add") {
        const newMember = await memberService.createMember(formData);
        // Add to allMembers and re-sort to maintain descending order
        const updatedAllMembers = sortMembersByDateDesc([
          ...allMembers,
          newMember,
        ]);
        setAllMembers(updatedAllMembers);

        // Update displayed members with the same count, maintaining sort order
        const currentDisplayCount = displayedMembers.length;
        setDisplayedMembers(updatedAllMembers.slice(0, currentDisplayCount));

        // Update hasMore status
        setHasMore(updatedAllMembers.length > currentDisplayCount);

        // Update member count
        incrementMemberCount();
      } else if (editingMember?.id) {
        const updatedMember = await memberService.updateMember(
          editingMember.id,
          formData
        );
        // Update both state arrays
        setAllMembers((prev: Member[]) =>
          prev.map((m: Member) =>
            m.id === editingMember.id ? updatedMember : m
          )
        );
        setDisplayedMembers((prev: Member[]) =>
          prev.map((m: Member) =>
            m.id === editingMember.id ? updatedMember : m
          )
        );
      }
      setMemberFormOpen(false);
      setEditingMember(null);
    } catch (err) {
      throw err; // Let the form handle the error
    }
  };

  if (loading) {
    return (
      <MainContainer>
        <LoadingContainer>
          <CircularProgress size={48} />
          <Typography variant="h6" color="textSecondary">
            Loading members...
          </Typography>
        </LoadingContainer>
      </MainContainer>
    );
  }
  return (
    <MainContainer maxWidth="xl">
      <Banner />

      {/** Page header actions */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
          mt: 2,
        }}
      >
        {isAuthenticated && <AddMemberButton onAddMember={handleAddMember} />}
      </Box>

      {/** Error alert */}
      {showError && (
        <Fade in={!!error}>
          <TextAlert
            show={showError}
            severity="Error"
            text={error}
            onClose={() => {
              setShowError(false);
              setError(null);
            }}
          />
        </Fade>
      )}

      {/** Members grid */}
      <MembersGrid
        members={displayedMembers}
        allBooks={allBooks}
        isAuthenticated={isAuthenticated}
        loading={loading}
        onEditMember={handleEditMember}
        onDeleteMember={handleDeleteClick}
        onViewAllBooks={handleViewAllBooks}
        hasMore={hasMore}
        loadingMore={loadingMore}
        onLoadMore={loadMoreMembers}
      />

      {/* Member form dialog */}
      <MemberForm
        open={memberFormOpen}
        onClose={() => {
          setMemberFormOpen(false);
          setEditingMember(null);
        }}
        onSubmit={handleFormSubmit}
        member={editingMember}
        mode={formMode}
      />

      {/* Member deletion confirmation dialog */}
      <DeleteConfirmationDialog
        cancelText="Cancel"
        confirmColor="error"
        confirmText="Delete"
        message={`Are you sure you want to delete member "${memberToDelete?.email}"? This action cannot be undone.`}
        open={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Confirm Delete"
      />

      {/* Books list dialog */}
      <BooksListDialog
        books={selectedMemberBooks}
        onClose={() => setViewBooksDialogOpen(false)}
        open={viewBooksDialogOpen}
        title="Member's Books"
      />
    </MainContainer>
  );
};

export default Members;
