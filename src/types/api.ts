/**
 * @interface {ApiResponse}
 * @description Generic API response wrapper that standardizes the structure of API responses
 * @template T - The type of data contained in the response
 * @property {T} data - The actual data payload returned by the API
 * @property {number} status - HTTP status code of the response
 */
export interface ApiResponse<T> {
  data: T;
  status: number;
}

/**
 * @type {PaginationParams}
 * @description Parameters used for pagination in API requests
 * @typedef {Object} PaginationParams
 * @property {number} page - The page number to retrieve (1-indexed)
 * @property {number} limit - The maximum number of items to return per page
 */
export type PaginationParams = {
  page: number;
  limit: number;
};

/**
 * @type {PaginatedResponse}
 * @description Response structure for paginated API endpoints
 * @template T - The type of individual items in the paginated data array
 * @typedef {Object} PaginatedResponse
 * @property {T[]} data - Array of items for the current page
 * @property {number} total - Total number of items available across all pages
 * @property {number} page - Current page number (1-indexed)
 * @property {number} limit - Number of items per page
 * @property {boolean} hasMore - Indicates if there are more pages available
 */
export type PaginatedResponse<T> = {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
};
