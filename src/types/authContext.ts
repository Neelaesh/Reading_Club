/**
 * @fileoverview Authentication-related type definitions
 *
 * @version 1.0.0
 * @since 1.0.0
 */

/**
 * AuthContext entity type definition
 *
 * @typedef {Object} AuthContext
 * @property {boolean} isAuthenticated - Indicates if the user is authenticated
 * @property {function} login - Function to log in the user
 * @property {function} logout - Function to log out the user
 */
export type AuthContextType = {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
};
