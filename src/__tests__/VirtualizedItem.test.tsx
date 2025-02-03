import { render, screen, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { VirtualizedItem } from "../components/VirtualizedItem";

describe("VirtualizedItem component", () => {
  it("does not render children until visible", () => {
    render(
      <VirtualizedItem placeholderHeight={200}>
        <div data-testid="child">Content</div>
      </VirtualizedItem>
    );
    expect(screen.queryByTestId("child")).toBeNull();
  });

  it("renders children once visible", async () => {
    render(
      <VirtualizedItem placeholderHeight={200}>
        <div data-testid="child">Content</div>
      </VirtualizedItem>
    );

    act(() => {
      global.__INTERSECTION_OBSERVERS__.forEach((observer) =>
        observer.trigger(true)
      );
    });

    await waitFor(() => {
      expect(screen.getByTestId("child")).toBeInTheDocument();
    });
  });
});
