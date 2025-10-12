/**
 * @fileoverview API endpoint configuration for the Reading Club application
 * @description This module centralizes all API endpoint definitions used throughout the application.
 * It provides a single source of truth for API URLs and endpoint generators with support for
 * pagination, sorting, and CRUD operations.
 *
 * @author Reading Club Development Team
 * @since 1.0.0
 */

import { PaginationParams } from "../types/api";

/**
 * Base URL for all API requests
 * @constant {string}
 * @description The root URL of the JSON Server API used for development and testing
 */
const basePath = "http://localhost:5000";

/**
 * Collection of API endpoint configurations
 * @namespace endPoints
 * @description Contains all API endpoints used in the Reading Club application.
 * Includes both static endpoints and dynamic endpoint generators for books and members.
 */
const endPoints = {
  /**
   * Endpoint for books collection operations
   * @type {string}
   * @description Used for fetching all books, creating new books, and bulk operations
   */
  booksEndpoint: basePath + "/books",

  /**
   * Generates endpoint URL for specific book operations
   * @function
   * @param {number} id - The unique identifier of the book
   * @returns {string} Complete URL for the specific book endpoint
   * @description Used for fetching, updating, or deleting a specific book by ID
   */
  bookDetailsEndpoint: (id: number) => `${basePath}/books/${id}`,

  /**
   * Endpoint for members collection operations
   * @type {string}
   * @description Used for fetching all members, creating new members, and bulk operations
   */
  memberEndpoint: basePath + "/members",

  /**
   * Generates paginated endpoint URL for fetching members with sorting
   * @function
   * @param {PaginationParams} pagination - Pagination parameters
   * @param {number} pagination.page - The page number to retrieve (1-based)
   * @param {number} pagination.limit - The number of members per page
   * @returns {string} Complete URL with pagination and sorting parameters
   * @description Creates a paginated endpoint with ascending date sorting for member fetching.
   */
  fetchMemberDetailsEndpoint: (pagination: PaginationParams) =>
    `${basePath}/members?_sort=dateOfJoining&_order=asc&_page=${pagination.page}&_limit=${pagination.limit}`,

  /**
   * Generates endpoint URL for specific member read operations
   * @function
   * @param {string} id - The unique identifier of the member
   * @returns {string} Complete URL for the specific member endpoint
   * @description Used for fetching detailed information about a specific member by ID
   */
  memberDetailsEndpoint: (id: string) => `${basePath}/members/${id}`,

  /**
   * Generates endpoint URL for updating a specific member
   * @function
   * @param {string} id - The unique identifier of the member to update
   * @returns {string} Complete URL for updating the specific member
   * @description Used for PUT/PATCH operations to update member information.
   */
  updateMemberDetailsEndpoint: (id: string) => `${basePath}/members/${id}`,

  /**
   * Generates endpoint URL for deleting a specific member
   * @function
   * @param {string} id - The unique identifier of the member to delete
   * @returns {string} Complete URL for deleting the specific member
   * @description Used for DELETE operations to remove a member from the system.
   */
  deleteMemberEndpoint: (id: string) => `${basePath}/members/${id}`,
};

export default endPoints;
