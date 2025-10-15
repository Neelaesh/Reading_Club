/**
 * @fileoverview Type definitions for AddMember component
 *
 * This file contains TypeScript interface definitions for the AddMember component
 * and related type exports.
 *
 * @author Reading Club Development Team
 * @since 1.0.0
 * @version 1.2.0
 */

/**
 * Props interface for the AddMember component
 *
 * @interface AddMemberProps
 */
export interface AddMemberProps {
  /**
   * Callback function triggered when the add member button is clicked
   *
   * @returns void - No return value expected
   *
   */
  onAddMember: () => void;
}
