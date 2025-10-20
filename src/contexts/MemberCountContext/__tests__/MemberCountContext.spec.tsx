import React, { FC } from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";

// Mock the member service before importing the context
jest.mock("../../../services/Members/Members", () => ({
  memberService: {
    getMemberCount: jest.fn(),
  },
}));

import { MemberCountProvider, useMemberCount } from "../MemberCountContext";
import { memberService } from "../../../services/Members/Members";

// Get the mocked service
const mockMemberService = memberService as jest.Mocked<typeof memberService>;

// Test component that uses the context provider
const ComponentWithProvider: FC = () => {
  const {
    memberCount,
    loading,
    setMemberCount,
    updateMemberCount,
    incrementMemberCount,
    decrementMemberCount,
  } = useMemberCount();

  return (
    <div>
      <span data-testid="member-count">{memberCount}</span>
      <span data-testid="loading">{loading ? "loading" : "not-loading"}</span>
      <button data-testid="set-count" onClick={() => setMemberCount(10)}>
        Set Count to 10
      </button>
      <button data-testid="update-count" onClick={() => updateMemberCount()}>
        Update Count
      </button>
      <button
        data-testid="increment-count"
        onClick={() => incrementMemberCount()}
      >
        Increment
      </button>
      <button
        data-testid="decrement-count"
        onClick={() => decrementMemberCount()}
      >
        Decrement
      </button>
    </div>
  );
};

// Test component without the context provider
const ComponentWithoutProvider: FC = () => {
  const context = useMemberCount();
  return <div>{context.memberCount}</div>;
};

describe("MemberCountContext", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Suppress console.error for error handling tests
    jest.spyOn(console, "error").mockImplementation(() => {});
  });
  /* afterEach(() => {
    jest.restoreAllMocks();
  }); */
  describe("useMemberCount hook", () => {
    test("Should throw error when used outside provider", () => {
      // Suppress React error boundary warnings for this test
      const originalError = console.error;
      console.error = jest.fn();

      expect(() => {
        render(<ComponentWithoutProvider />);
      }).toThrow("useMemberCount must be used within a MemberCountProvider");

      console.error = originalError;
    });
  });

  describe("Member count operations", () => {
    describe("Increment Member Count function", () => {
      test("should increment member count by 1", () => {
        render(
          <MemberCountProvider>
            <ComponentWithProvider />
          </MemberCountProvider>
        );

        expect(screen.getByTestId("member-count")).toHaveTextContent("0");

        fireEvent.click(screen.getByTestId("increment-count"));
        expect(screen.getByTestId("member-count")).toHaveTextContent("1");

        fireEvent.click(screen.getByTestId("increment-count"));
        expect(screen.getByTestId("member-count")).toHaveTextContent("2");

        fireEvent.click(screen.getByTestId("increment-count"));
        expect(screen.getByTestId("member-count")).toHaveTextContent("3");
      });
    });

    describe("Decrement Member Count function", () => {
      test("Should decrement member count by 1", () => {
        render(
          <MemberCountProvider>
            <ComponentWithProvider />
          </MemberCountProvider>
        );

        // Set initial value to 5
        fireEvent.click(screen.getByTestId("set-count")); // Sets to 10
        expect(screen.getByTestId("member-count")).toHaveTextContent("10");

        // Decrement
        fireEvent.click(screen.getByTestId("decrement-count"));
        expect(screen.getByTestId("member-count")).toHaveTextContent("9");

        fireEvent.click(screen.getByTestId("decrement-count"));
        expect(screen.getByTestId("member-count")).toHaveTextContent("8");
      });

      test("Should handle decrementing the member count from 0 to negative number", () => {
        render(
          <MemberCountProvider>
            <ComponentWithProvider />
          </MemberCountProvider>
        );

        // Increment to 1
        fireEvent.click(screen.getByTestId("increment-count"));
        expect(screen.getByTestId("member-count")).toHaveTextContent("1");

        // Decrement to 0
        fireEvent.click(screen.getByTestId("decrement-count"));
        expect(screen.getByTestId("member-count")).toHaveTextContent("0");

        // Try to decrement further - should stay at 0
        fireEvent.click(screen.getByTestId("decrement-count"));
        expect(screen.getByTestId("member-count")).toHaveTextContent("0");
      });
    });

    describe("Update Member Count function", () => {
      test("Should fetch member count from API successfully", async () => {
        mockMemberService.getMemberCount.mockResolvedValue(25);

        render(
          <MemberCountProvider>
            <ComponentWithProvider />
          </MemberCountProvider>
        );

        expect(screen.getByTestId("member-count")).toHaveTextContent("0");
        expect(screen.getByTestId("loading")).toHaveTextContent("not-loading");

        fireEvent.click(screen.getByTestId("update-count"));

        // Wait for the API call to complete and state to update
        await waitFor(
          () => {
            expect(mockMemberService.getMemberCount).toHaveBeenCalledTimes(1);
          },
          { timeout: 3000 }
        );

        await waitFor(
          () => {
            expect(screen.getByTestId("member-count")).toHaveTextContent("25");
          },
          { timeout: 3000 }
        );

        expect(screen.getByTestId("loading")).toHaveTextContent("not-loading");
      });

      test("Should handle any API errors while fetching member count", async () => {
        const consoleErrorSpy = jest
          .spyOn(console, "error")
          .mockImplementation(() => {});

        mockMemberService.getMemberCount.mockRejectedValue(
          new Error("API Error")
        );

        render(
          <MemberCountProvider>
            <ComponentWithProvider />
          </MemberCountProvider>
        );

        expect(screen.getByTestId("member-count")).toHaveTextContent("0");

        fireEvent.click(screen.getByTestId("update-count"));

        await waitFor(() => {
          expect(screen.getByTestId("loading")).toHaveTextContent(
            "not-loading"
          );
        });

        // Count should remain unchanged on error
        expect(screen.getByTestId("member-count")).toHaveTextContent("0");
        expect(consoleErrorSpy).toHaveBeenCalledWith(
          "Failed to update member count:",
          expect.any(Error)
        );
        expect(mockMemberService.getMemberCount).toHaveBeenCalledTimes(1);

        consoleErrorSpy.mockRestore();
      });
    });
  });
});
