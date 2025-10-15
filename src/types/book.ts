/**
 * @fileoverview Book-related type definitions for the Reading Club application
 *
 * @version 1.0.0
 * @since 1.0.0
 */

/**
 * Book entity type definition
 *
 * @typedef {Object} Book
 * @property {number} bookId - Unique identifier for the book
 * @property {string} title - The title of the book
 * @property {string} author - The author of the book
 * @property {string} genre - The genre/category of the book
 *
 * @since 1.0.0
 */
export type Book = {
  bookId: number;
  title: string;
  author: string;
  genre: string;
};
