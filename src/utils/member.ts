import { Member } from "../types/member";

/**
 * @function sortMembersByDateDesc
 * @description Utility function to sort members by date of joining (newest first).
 * Creates a new array sorted in descending order based on the dateOfJoining field,
 * ensuring the most recently joined members appear first.
 * @param members - Array of Member objects to sort
 * @returns {Member[]} New array of members sorted by joining date (newest first)
 */
export const sortMembersByDateDesc = (members: Member[]): Member[] => {
  return [...members].sort((a, b) => {
    const dateA = new Date(a.dateOfJoining).getTime();
    const dateB = new Date(b.dateOfJoining).getTime();
    return dateB - dateA; // Descending order (newest first)
  });
};

/**
 * @function formatDateOfJoining
 * @description Formats a date string into a human-readable format for display.
 * Converts the dateOfJoining string into a localized date format with
 * abbreviated month name for better user experience.
 * @param dateString - The date string to format
 * @returns {string} Formatted date string in "MMM dd, yyyy" format
 */
export const formatDateOfJoining = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
