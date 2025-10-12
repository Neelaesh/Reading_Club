/**
 * @fileoverview API utility functions and error handling for the Reading Club application
 * @description This module provides common utilities for API operations including
 * custom error classes and response handling functions. It standardizes error
 * handling and response processing across all service modules.
 *
 * @author Reading Club Development Team
 * @since 1.0.0
 */

/**
 * Custom error class for API-related errors
 * @class ApiError
 * @extends Error
 * @description Represents errors that occur during API operations. Provides additional
 * context including HTTP status codes and structured error information for better
 * error handling and debugging.
 */
export class ApiError extends Error {
  /**
   * HTTP status code associated with the error
   * @type {number}
   * @description The HTTP status code returned by the server (e.g., 404, 500, 401)
   */
  status: number;

  /**
   * Creates an instance of ApiError
   * @constructor
   * @param {string} message - Human-readable error message describing what went wrong
   * @param {number} status - HTTP status code associated with the error
   */
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    this.name = "ApiError";
  }
}

/**
 * Handles HTTP response objects and processes them into typed data
 * @template T - The expected type of the response data
 * @function handleResponse
 *
 * @description Processes fetch Response objects by checking for errors and parsing JSON.
 * Throws ApiError for non-successful responses and returns typed data for successful ones.
 * This function standardizes response handling across all API services.
 *
 * @param {Response} response - The fetch Response object to process
 *
 * @returns {Promise<T>} A promise that resolves to the parsed response data of type T
 *
 * @throws {ApiError} Throws ApiError with status code and message for non-successful responses
 * @throws {Error} May throw other errors for JSON parsing failures or network issues
 */
export const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    throw new ApiError(
      `HTTP Error: ${response.status} ${response.statusText}`,
      response.status
    );
  }
  return response.json();
};
