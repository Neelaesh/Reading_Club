import React from "react";

import { createRoot } from "react-dom/client";

import "@fontsource/inter/300.css"; // Light
import "@fontsource/inter/400.css"; // Regular
import "@fontsource/inter/500.css"; // Medium
import "@fontsource/inter/700.css"; // Bold

import App from "./App/App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement!);

root.render(<App />);
