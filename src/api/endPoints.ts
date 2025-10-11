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
 * Includes both static endpoints and dynamic endpoint generators.
 */
const endPoints = {
  booksEndpoint: basePath + "/books",
  bookDetailsEndpoint: (id: number) => `${basePath}/books/${id}`,
  membersEndpoint: basePath + "/members",
  memberDetailsEndpoint: (id: number) => `${basePath}/members/${id}`,
};

export default endPoints;
