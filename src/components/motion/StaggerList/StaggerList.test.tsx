import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { StaggerList } from "./StaggerList";

describe("StaggerList", () => {
  it("renders all children", () => {
    render(
      <StaggerList>
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
      </StaggerList>
    );
    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
    expect(screen.getByText("Item 3")).toBeInTheDocument();
  });

  it("applies className to container", () => {
    const { container } = render(
      <StaggerList className="grid gap-4">
        <div>Item</div>
      </StaggerList>
    );
    expect(container.firstChild).toHaveClass("grid", "gap-4");
  });

  it("renders interactive children", () => {
    render(
      <StaggerList>
        <button>Action 1</button>
        <button>Action 2</button>
      </StaggerList>
    );
    expect(screen.getAllByRole("button")).toHaveLength(2);
  });
});
