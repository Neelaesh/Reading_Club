/**
 * @type {Book}
 * @description Book entity type definition
 * @typedef {Object} Book
 * @property {number} bookId - Unique identifier for the book
 * @property {string} title - The title of the book
 * @property {string} author - The author of the book
 * @property {string} genre - The genre/category of the book
 */
export type Book = {
  bookId: number;
  title: string;
  author: string;
  genre: string;
};
