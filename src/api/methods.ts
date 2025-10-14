/**
 * @fileoverview HTTP API methods module for the Reading Club application
 *
 * This module provides a centralized collection of HTTP utility functions for making
 * API requests using the native Fetch API. It includes methods for all standard
 * HTTP verbs (GET, POST, PUT, DELETE) with consistent error handling and JSON
 * content-type headers where appropriate.
 *
 * @author Reading Club Development Team
 * @since 1.0.0
 * @version 1.1.0
 *
 */
/**
 * Performs an HTTP GET request using the native Fetch API
 *
 * @description This function makes an asynchronous GET request to the specified endpoint.
 *
 * @param {string} path - The URL path or endpoint to make the GET request to
 *
 * @returns {Promise<Response>} A promise that resolves to the native Fetch Response object
 *
 * @throws {TypeError} Throws a TypeError if the request fails (network error, invalid URL, etc.)
 * @throws {Error} May throw other errors depending on the fetch implementation
 */
export const get = async (path: string) => {
  return await fetch(path);
};

/**
 * Performs an HTTP POST request using the native Fetch API
 *
 * @description This function makes an asynchronous POST request to the specified endpoint
 * with the provided body data. It automatically sets the Content-Type header to application/json.
 *
 * @param {string} path - The URL path or endpoint to make the POST request to
 * @param {string} body - The request body as a JSON string
 *
 * @returns {Promise<Response>} A promise that resolves to the native Fetch Response object
 *
 * @throws {TypeError} Throws a TypeError if the request fails (network error, invalid URL, etc.)
 * @throws {Error} May throw other errors depending on the fetch implementation
 */
export const post = async (path: string, body: string) => {
  return await fetch(path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });
};

/**
 * Performs an HTTP PUT request using the native Fetch API
 *
 * @description This function makes an asynchronous PUT request to the specified endpoint
 * with the provided body data. It automatically sets the Content-Type header to application/json.
 *
 * @param {string} path - The URL path or endpoint to make the PUT request to
 * @param {string} body - The request body as a JSON string containing the updated data
 *
 * @returns {Promise<Response>} A promise that resolves to the native Fetch Response object
 *
 * @throws {TypeError} Throws a TypeError if the request fails (network error, invalid URL, etc.)
 * @throws {Error} May throw other errors depending on the fetch implementation
 *
 * @author Reading Club Development Team
 * @since 1.0.0
 * @version 1.1.0
 */
export const put = async (path: string, body: string) => {
  return await fetch(path, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });
};

/**
 * Performs an HTTP DELETE request using the native Fetch API
 *
 * @description This function makes an asynchronous DELETE request to the specified endpoint.
 * It's typically used to remove resources from the server by their identifier.
 *
 * @param {string} path - The URL path or endpoint to make the DELETE request to
 *
 * @returns {Promise<Response>} A promise that resolves to the native Fetch Response object
 *
 * @throws {TypeError} Throws a TypeError if the request fails (network error, invalid URL, etc.)
 * @throws {Error} May throw other errors depending on the fetch implementation
 */
export const deleteRequest = async (path: string) => {
  return await fetch(path, {
    method: "DELETE",
  });
};
