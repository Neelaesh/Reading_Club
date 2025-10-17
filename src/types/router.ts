import { JSX } from "react";

/**
 * @type {Router}
 * @description Configuration object for defining application routes
 * @typedef {Object} Router
 * @property {string} title - Optional title for the route
 * @property {string} path - The URL path pattern for the route
 * @property {JSX.Element} element - The React component to render when the route is matched
 */
export type Router = {
  title?: string;
  path: string;
  element: JSX.Element;
};
