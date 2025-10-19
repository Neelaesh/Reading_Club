import React, { createContext, FC, useContext, useState, useMemo } from "react";

import { MemberCountContextType } from "../../types/memberCountContext";
import { memberService } from "../../services/Members/Members";
import { MemberCountProviderProps } from "./MemberCountContext.types";

/**
 * @constant MemberCountContext
 * @description React context for managing member count state throughout the application.
 * Provides centralized member count state management with real-time updates and optimistic
 * UI feedback for member CRUD operations. Supports both API-based refreshes and immediate
 * local state updates for optimal user experience.
 */
const MemberCountContext = createContext<MemberCountContextType | null>(null);

/**
 * @component MemberCountProvider
 * @description Provider component that manages member count state and provides member count
 * actions to child components. Handles initial data loading, API synchronization, and
 * optimistic updates for immediate UI feedback. Supports both server-side refreshes
 * and client-side increment/decrement operations for optimal user experience.
 * @param children - Child components that will have access to the member count context
 */
export const MemberCountProvider: FC<MemberCountProviderProps> = ({
  children,
}) => {
  /** Current number of members in the reading club */
  const [memberCount, setMemberCountState] = useState<number>(0);
  /** Loading state for member count operations and API calls */
  const [loading, setLoading] = useState<boolean>(false);

  /**
   * @function setMemberCount
   * @description Directly sets the member count from an external source (like Members component).
   * Used when the count is already known from another API call to avoid duplicate requests.
   * Provides efficient state updates without additional network overhead.
   * @param count - The exact member count to set
   */
  const setMemberCount = (count: number) => {
    setMemberCountState(count);
  };

  /**
   * @function updateMemberCount
   * @description Refreshes the member count from the API when needed.
   * Used for synchronizing the count when external data source is not available.
   * Provides fallback updates for data consistency.
   */
  const updateMemberCount = async () => {
    try {
      setLoading(true);
      const count = await memberService.getMemberCount();
      setMemberCountState(count);
    } catch (error) {
      console.error("Failed to update member count:", error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * @function incrementMemberCount
   * @description Increments the member count by 1 without API call for immediate UI update.
   * Provides optimistic updates for better user experience when adding new members.
   * Should be called after successful member creation to reflect changes instantly.
   */
  const incrementMemberCount = () => {
    setMemberCountState((prev: number) => prev + 1);
  };

  /**
   * @function decrementMemberCount
   * @description Decrements the member count by 1 without API call for immediate UI update.
   * Provides optimistic updates for better user experience when removing members.
   * Includes safety check to prevent negative counts. Should be called after successful
   * member deletion to reflect changes instantly.
   */
  const decrementMemberCount = () => {
    setMemberCountState((prev: number) => Math.max(0, prev - 1));
  };

  /**
   * @constant memoizedMemberCountContextValue
   * @description Memoized context value to prevent unnecessary re-renders of child components.
   * Only updates when member count or loading state changes, optimizing performance by
   * avoiding context value recreation on every render when dependencies haven't changed.
   * Includes all member count state and action functions for comprehensive access.
   */
  const memoizedMemberCountContextValue = useMemo(
    () => ({
      memberCount,
      loading,
      setMemberCount,
      updateMemberCount,
      incrementMemberCount,
      decrementMemberCount,
    }),
    [memberCount, loading]
  );

  return (
    <MemberCountContext.Provider value={memoizedMemberCountContextValue}>
      {children}
    </MemberCountContext.Provider>
  );
};

/**
 * @hook useMemberCount
 * @description Custom hook for accessing member count context throughout the application.
 * Provides member count state, loading indicators, and count manipulation functions
 * (increment, decrement, update) to components. Includes safety check to ensure
 * hook is used within MemberCountProvider component tree.
 * @returns {MemberCountContextType} Member count context containing count state, loading state, and action functions
 * @throws {Error} Throws error if used outside of MemberCountProvider component tree
 */
export const useMemberCount = (): MemberCountContextType => {
  const context = useContext(MemberCountContext);
  if (!context) {
    throw new Error("useMemberCount must be used within a MemberCountProvider");
  }
  return context;
};
