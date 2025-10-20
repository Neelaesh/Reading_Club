import "@testing-library/jest-dom";

// Suppress React Router future flag warnings in tests
const originalConsoleWarn = console.warn;
console.warn = (...args: unknown[]) => {
  // Suppress React Router v7 future flag warnings
  if (
    typeof args[0] === "string" &&
    args[0].includes("React Router Future Flag Warning")
  ) {
    return;
  }
  // Suppress relative splat path warnings
  if (typeof args[0] === "string" && args[0].includes("v7_relativeSplatPath")) {
    return;
  }
  // Allow other warnings through
  originalConsoleWarn(...args);
};

// Mock React Router hooks globally to prevent warnings
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
  useLocation: () => ({
    pathname: "/test",
    search: "",
    hash: "",
    state: null,
    key: "test",
  }),
  useParams: () => ({}),
  useSearchParams: () => [new URLSearchParams(), jest.fn()],
}));
