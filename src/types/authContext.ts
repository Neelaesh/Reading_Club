/**
 * @type {AuthContextType}
 * @description AuthContext entity type definition
 * @typedef {Object} AuthContextType
 * @property {boolean} isAuthenticated - Indicates if the user is authenticated
 * @property {function} login - Function to log in the user
 * @property {function} logout - Function to log out the user
 */
export type AuthContextType = {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
};
