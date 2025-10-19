import { Member } from "../../../types/member";
import { Book } from "../../../types/book";

/**
 * @interface MembersGridProps
 * @description Props interface for the MembersGrid component
 */
export interface MembersGridProps {
  /** Array of all books for title lookup */
  allBooks: Book[];
  /** Animation delay multiplier for staggered animations */
  animationDelay?: number;
  /** Whether there are more members available for loading */
  hasMore?: boolean;
  /** Whether the user is authenticated (affects action buttons visibility) */
  isAuthenticated: boolean;
  /** Loading state for the grid */
  loading?: boolean;
  /** Loading state for the "Load More" functionality */
  loadingMore?: boolean;
  /** Array of members to display in the grid */
  members: Member[];
  /** Callback function called when a member should be edited */
  onEditMember: (member: Member) => void;
  /** Callback function called when a member should be deleted */
  onDeleteMember: (member: Member) => void;
  /** Callback function called when "Load More" button is clicked */
  onLoadMore?: () => void;
  /** Callback function called when viewing all books for a member */
  onViewAllBooks: (bookIds: number[]) => void;
  /** Custom spacing between grid items */
  spacing?: number;
}

/**
 * @interface MemberCardProps
 * @description Props interface for individual member card component
 */
export interface MemberCardProps {
  /** Array of all books for title lookup */
  allBooks: Book[];
  /** Animation delay multiplier */
  animationDelay?: number;
  /** Index of the member in the array (for animation timing) */
  index: number;
  /** Whether the user is authenticated */
  isAuthenticated: boolean;
  /** Member data to display */
  member: Member;
  /** Callback function called when member should be deleted */
  onDelete: (member: Member) => void;
  /** Callback function called when member should be edited */
  onEdit: (member: Member) => void;
  /** Callback function called when viewing all books */
  onViewAllBooks: (bookIds: number[]) => void;
}
