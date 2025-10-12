/**
 * @fileoverview Book service module for the Reading Club application
 * @description This module provides book management functionality including
 * fetching individual books, collections of books, and batch operations.
 * It serves as the primary interface for all book-related API operations.
 *
 * @author Reading Club Development Team
 * @since 1.0.0
 */

import { Book } from "../../types/book";
import endPoints from "../../api/endPoints";
import { handleResponse } from "../Utility/ApiUtility";

/**
 * Book service object containing all book-related API operations
 * @namespace bookService
 * @description Provides a centralized interface for managing Reading Club books.
 * Supports fetching individual books, all books, and batch operations for multiple books.
 */
export const bookService = {
  /**
   * Retrieves all books from the database
   *
   * @description Fetches the complete collection of books available in the Reading Club.
   * This method returns all books without pagination and is useful for populating
   * dropdown lists, search operations, or displaying the complete book catalog.
   *
   * @returns {Promise<Book[]>} A promise that resolves to an array of all books
   *
   * @throws {ApiError} Throws ApiError if the request fails or response is invalid
   * @throws {Error} May throw other errors for network issues or parsing failures
   */
  async getAllBooks(): Promise<Book[]> {
    const response = await fetch(`${endPoints.booksEndpoint}`);
    return handleResponse<Book[]>(response);
  },

  /**
   * Retrieves a specific book by its unique identifier
   *
   * @description Fetches detailed information for a single book using its ID.
   * Useful for displaying book details, populating edit forms, or showing
   * comprehensive book information in the UI.
   *
   * @param {number} id - The unique identifier of the book to retrieve
   *
   * @returns {Promise<Book>} A promise that resolves to the book object
   *
   * @throws {ApiError} Throws ApiError if book is not found (404) or request fails
   * @throws {Error} May throw other errors for network issues or parsing failures
   */
  async getBookById(id: number): Promise<Book> {
    const response = await fetch(`${endPoints.bookDetailsEndpoint(id)}`);
    return handleResponse<Book>(response);
  },

  /**
   * Retrieves multiple books by their unique identifiers
   *
   * @description Fetches a collection of books based on an array of book IDs.
   * This method is optimized for batch operations and is particularly useful
   * for displaying books associated with a member or showing selected books.
   * It filters the complete book collection to return only matching books.
   *
   * @param {number[]} ids - Array of book IDs to retrieve
   *
   * @returns {Promise<Book[]>} A promise that resolves to an array of matching books
   *
   * @throws {ApiError} Throws ApiError if the request fails or response is invalid
   * @throws {Error} May throw other errors for network issues or parsing failures
   */
  async getBooksByIds(ids: number[]): Promise<Book[]> {
    const allBooks = await this.getAllBooks();
    return allBooks.filter((book) => ids.includes(book.bookId));
  },
};
