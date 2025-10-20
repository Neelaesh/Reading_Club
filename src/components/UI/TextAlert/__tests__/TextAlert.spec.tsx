import React, { createRef } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import TextAlert from "../TextAlert";

describe("Text Alert Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Should render alert when show prop is set to true", () => {
    render(<TextAlert severity="Info" show={true} text="Test alert message" />);

    const alert = screen.getByTestId("text-alert-info");
    expect(alert).toBeInTheDocument();
    expect(alert).toHaveTextContent("Test alert message");
  });

  test("Should return null when show prop is set to false", () => {
    const { container } = render(
      <TextAlert severity="Info" show={false} text="Test alert message" />
    );

    expect(container.firstChild).toBeNull();
  });

  test("Should close the Text Alert on click of Close button", () => {
    const mockOnClose = jest.fn();

    render(
      <TextAlert
        severity="Info"
        show={true}
        text="Test alert message"
        onClose={mockOnClose}
      />
    );

    const closeButton = screen.getByRole("button", { name: /close/i });
    fireEvent.click(closeButton);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test("Should apply correct margin bottom styling for add mode", () => {
    render(
      <TextAlert
        severity="Info"
        show={true}
        text="Test alert message"
        mode="add"
      />
    );

    const alert = screen.getByTestId("text-alert-info");
    // Check for margin-bottom: 0 (mb: 0 in MUI)
    expect(alert).toHaveStyle({ marginBottom: "0px" });
  });

  test("Should apply correct margin bottom styling for edit mode", () => {
    render(
      <TextAlert
        severity="Info"
        show={true}
        text="Test alert message"
        mode="edit"
      />
    );

    const alert = screen.getByTestId("text-alert-info");
    // Check for margin-bottom: 0 (mb: 0 in MUI)
    expect(alert).toHaveStyle({ marginBottom: "0px" });
  });

  test("Should apply default margin bottom styling when the mode is not add or edit", () => {
    render(<TextAlert severity="Info" show={true} text="Test alert message" />);

    const alert = screen.getByTestId("text-alert-info");
    // Check for margin-bottom: 24px (mb: 3 in MUI, which is 3 * 8px = 24px)
    expect(alert).toHaveStyle({ marginBottom: "24px" });
  });

  test("Should forward ref to Alert component", () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <TextAlert
        severity="Info"
        show={true}
        text="Test alert message"
        ref={ref}
      />
    );
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe("DIV");
  });
});
