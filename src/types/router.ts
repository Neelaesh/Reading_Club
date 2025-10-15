/**
 * @fileoverview Router type definitions
 *
 * @author Reading Club Team
 * @version 1.0.0
 */

import { JSX } from "react";

/**
 * Configuration object for defining application routes.
 *
 * @interface Router
 * @property {string} [title] - Optional title for the route, used for SEO and display purposes.
 * @property {string} path - The URL path pattern for the route (e.g., "/home", "/members/:id").
 * @property {JSX.Element} element - The React component to render when the route is matched.
 */
export type Router = {
  title?: string;
  path: string;
  element: JSX.Element;
};
