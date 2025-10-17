/**
 * @type {MemberCountContextType}
 * @description MemberCountContext entity type definition
 * @typedef {Object} MemberCountContextType
 * @property {number} memberCount - Current number of members
 * @property {boolean} loading - Loading state for member count operations
 * @property {function} setMemberCount - Function to directly set member count from external source
 * @property {function} updateMemberCount - Function to refresh member count from API
 * @property {function} incrementMemberCount - Function to increment member count by 1
 * @property {function} decrementMemberCount - Function to decrement member count by 1
 */
export type MemberCountContextType = {
  memberCount: number;
  loading: boolean;
  setMemberCount: (count: number) => void;
  updateMemberCount: () => Promise<void>;
  incrementMemberCount: () => void;
  decrementMemberCount: () => void;
};
