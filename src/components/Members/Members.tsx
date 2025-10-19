import React, { useState, useEffect, useCallback, FC } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import EditIcon from "@mui/icons-material/Edit";
import Grow from "@mui/material/Grow";
import Fade from "@mui/material/Fade";
import Tooltip from "@mui/material/Tooltip";
import VisibilityIcon from "@mui/icons-material/Visibility";

import AddMemberButton from "../UI/Button/AddMember/AddMember";
import {
  ActionButton,
  BooksContainer,
  LoadingContainer,
  LoadMoreContainer,
  MainContainer,
  MemberActions,
  MemberCard,
  MemberImage,
  MemberInfo,
  MemberOverlay,
} from "./Members.styles";
import { Banner } from "../UI/Banner/Banner";
import { formatDateOfJoining, sortMembersByDateDesc } from "../../utils/member";
import {
  INITIAL_MEMBERS_COUNT,
  LOAD_MORE_INCREMENT,
} from "../../constants/pagination";
import { Member, MemberFormData } from "../../types/member";
import { MemberForm } from "../UI/MemberForm";
import { memberService } from "../../services/Members/Members";
import { PaginatedResponse } from "../../types/api";
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

      // Load all members from the server
      const membersResponse = await memberService.getAllMembers();
      let members: Member[];

      if ("data" in membersResponse) {
        const paginatedResponse = membersResponse as PaginatedResponse<Member>;
        members = paginatedResponse.data;
      } else {
        members = membersResponse as Member[];
      }

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

  useEffect(() => {
    loadInitialData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * @function handleAddMember
   * @description Initialize the member form for adding a new member.
   * Sets the form mode to "add", clears any existing member data,
   * and opens the member form dialog for user input.
   */
  const handleAddMember = useCallback(() => {
    setFormMode("add");
    setEditingMember(null);
    setMemberFormOpen(true);
  }, []);

  /**
   * @function loadMoreMembers
   * @description Load additional members when the "Load More" button is clicked.
   * Calculates the next batch of members to display, simulates loading delay
   * for better UX, and updates the displayed members with pagination state.
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
   * @function handleEditMember
   * @description Initialize the member form for editing an existing member.
   * Checks authentication status, sets form mode to "edit", populates
   * the form with existing member data, and opens the member form dialog.
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
   * @description Initiate the member deletion process by opening confirmation dialog.
   * Checks authentication status, sets the member to be deleted,
   * and displays the delete confirmation dialog for user confirmation.
   * @param member - The member object to be deleted
   */
  const handleDeleteClick = (member: Member) => {
    if (!isAuthenticated) return;
    setMemberToDelete(member);
    setDeleteConfirmOpen(true);
  };

  /**
   * @function handleDeleteConfirm
   * @description Execute the member deletion after user confirmation.
   * Calls the member service to delete the member, updates both state arrays,
   * maintains pagination consistency, and triggers member count updates.
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
   * Handles member creation or updates based on form mode, maintains proper
   * sorting and pagination, and triggers member count updates upon completion.
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

      {/** Page header with title and actions */}
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
      <Grid container spacing={3}>
        {displayedMembers.map((member: Member, index: number) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={member.id || index}>
            <Grow in={true} timeout={500 + index * 100}>
              <MemberCard>
                <MemberImage
                  image={
                    member.avatar ||
                    `https://i.pravatar.cc/400?img=${(0 % 70) + 1}`
                  }
                  //title={member.email}
                >
                  <MemberOverlay className="member-overlay" />
                  {isAuthenticated && (
                    <MemberActions className="member-actions">
                      <Tooltip title="Edit Member">
                        <ActionButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditMember(member);
                          }}
                        >
                          <EditIcon fontSize="small" />
                        </ActionButton>
                      </Tooltip>
                      <Tooltip title="Delete Member">
                        <ActionButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteClick(member);
                          }}
                        >
                          <DeleteIcon fontSize="small" />
                        </ActionButton>
                      </Tooltip>
                    </MemberActions>
                  )}
                  <BooksContainer className="member-books">
                    <Typography
                      variant="body1"
                      component="span"
                      sx={{
                        color: "#00A8E1",
                        fontWeight: "bold",
                        fontSize: "14px",
                      }}
                    >
                      {member.books.length}{" "}
                      {member.books.length === 1 ? "Book" : "Books"}
                    </Typography>
                  </BooksContainer>
                </MemberImage>

                <MemberInfo>
                  <Box>
                    <Typography variant="h6" component="h3" noWrap>
                      {member.email}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Member since {formatDateOfJoining(member.dateOfJoining)}
                    </Typography>
                  </Box>
                </MemberInfo>
              </MemberCard>
            </Grow>
          </Grid>
        ))}
      </Grid>
      {/** No members found message */}
      {displayedMembers.length === 0 && !loading && (
        <Box textAlign="center" py={8}>
          <Typography variant="h5" color="textSecondary" gutterBottom>
            No members found
          </Typography>
          <Typography variant="body1" color="textSecondary">
            {isAuthenticated
              ? "Click the + button to add your first member"
              : "Login to manage club members"}
          </Typography>
        </Box>
      )}
      {/** Load more button */}
      {hasMore && displayedMembers.length > 0 && (
        <LoadMoreContainer>
          <Button
            variant="outlined"
            size="large"
            onClick={loadMoreMembers}
            disabled={loadingMore}
            startIcon={
              loadingMore ? <CircularProgress size={20} /> : <VisibilityIcon />
            }
          >
            {loadingMore ? "Loading..." : "Load More Members"}
          </Button>
        </LoadMoreContainer>
      )}

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
      <Dialog
        open={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete member &quot;
            {memberToDelete?.email}&quot;? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmOpen(false)} color="inherit">
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </MainContainer>
  );
};

export default Members;
