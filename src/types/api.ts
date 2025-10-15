/**
 * @fileoverview API-related type definitions
 *
 * @author Reading Club Team
 * @version 1.0.0
 */

/**
 * Generic API response wrapper that standardizes the structure of API responses.
 *
 * @template T - The type of data contained in the response
 * @interface ApiResponse
 * @property {T} data - The actual data payload returned by the API
 * @property {number} status - HTTP status code of the response (e.g., 200, 404, 500)
 */
export interface ApiResponse<T> {
  /** The actual data payload returned by the API */
  data: T;
  /** HTTP status code of the response (e.g., 200, 404, 500) */
  status: number;
}

/**
 * Parameters used for pagination in API requests.
 *
 * This type defines the standard pagination parameters that can be sent
 * to API endpoints to control which page of results to retrieve and how
 * many items to include per page.
 *
 * @typedef {Object} PaginationParams
 * @property {number} page - The page number to retrieve (1-indexed)
 * @property {number} limit - The maximum number of items to return per page
 */
export type PaginationParams = {
  page: number;
  limit: number;
};

/**
 * Response structure for paginated API endpoints.
 *
 * This type extends the basic API response structure to include pagination
 * metadata, making it easy to implement pagination controls in the UI.
 *
 * @template T - The type of individual items in the paginated data array
 * @interface PaginatedResponse
 * @extends ApiResponse<T[]>
 * @property {number} total - Total number of items available across all pages
 * @property {number} page - Current page number (1-indexed)
 * @property {number} limit - Number of items per page
 * @property {boolean} hasMore - Indicates if there are more pages available after the current page
 */
export type PaginatedResponse<T> = {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
};
