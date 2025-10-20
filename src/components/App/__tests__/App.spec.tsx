import React from "react";
import { render } from "@testing-library/react";

import App from "../App";

describe("App Component", () => {
  test("App component has proper structure", () => {
    const { container } = render(<App />);

    // Should render without throwing errors
    expect(container).toBeTruthy();

    // Should contain some content (the theme provider and router structure)
    expect(container.firstChild).not.toBeNull();

    // Renders without crashing
    expect(() => render(<App />)).not.toThrow();
  });
});
