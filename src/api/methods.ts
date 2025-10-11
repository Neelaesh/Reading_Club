import axios, { RawAxiosRequestHeaders } from "axios";

/**
 * @description This function makes an asynchronous GET request to the specified endpoint.
 * It supports optional custom headers and provides consistent error handling across the application.
 *
 * @param {string} path - The URL path or endpoint to make the GET request to
 * @param {RawAxiosRequestHeaders | null} [headers] - Optional HTTP headers to include with the request
 *
 * @returns {Promise<import('axios').AxiosResponse>} A promise that resolves to the Axios response object
 * @throws {Error} Throws the original error from Axios if the request fails
 */
export const get = async (
  path: string,
  headers?: RawAxiosRequestHeaders | null
) => {
  return axios
    .get(path, { headers: headers ?? undefined })
    .then((res) => res)
    .catch((error) => {
      throw error;
    });
};
