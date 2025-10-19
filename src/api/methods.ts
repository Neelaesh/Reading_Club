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
 * Performs an HTTP PATCH request using the native Fetch API
 *
 * @description This function makes an asynchronous PATCH request to the specified endpoint
 * with the provided body data. PATCH is used for partial updates of existing resources,
 * sending only the fields that need to be modified. It automatically sets the Content-Type
 * header to application/json.
 *
 * @param {string} path - The URL path or endpoint to make the PATCH request to
 * @param {string} body - The request body as a JSON string containing only the fields to update
 *
 * @returns {Promise<Response>} A promise that resolves to the native Fetch Response object
 *
 * @throws {TypeError} Throws a TypeError if the request fails (network error, invalid URL, etc.)
 * @throws {Error} May throw other errors depending on the fetch implementation
 */
export const patch = async (path: string, body: string) => {
  return await fetch(path, {
    method: "PATCH",
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
