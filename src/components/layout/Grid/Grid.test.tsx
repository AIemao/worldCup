import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Grid } from "./Grid";

describe("Grid", () => {
  it("renders children", () => {
    render(
      <Grid>
        <div>Item 1</div>
        <div>Item 2</div>
      </Grid>
    );
    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
  });

  it("applies base grid class", () => {
    const { container } = render(<Grid>Content</Grid>);
    expect(container.firstChild).toHaveClass("grid");
  });

  it("applies 3-column layout", () => {
    const { container } = render(<Grid cols="3">Content</Grid>);
    expect(container.firstChild).toHaveClass("lg:grid-cols-3");
  });

  it("applies 4-column layout", () => {
    const { container } = render(<Grid cols="4">Content</Grid>);
    expect(container.firstChild).toHaveClass("lg:grid-cols-4");
  });

  it("applies auto layout", () => {
    const { container } = render(<Grid cols="auto">Content</Grid>);
    expect(container.firstChild).toHaveClass("grid-cols-[repeat(auto-fill,minmax(280px,1fr))]");
  });

  it("applies gap variant", () => {
    const { container } = render(<Grid gap="lg">Content</Grid>);
    expect(container.firstChild).toHaveClass("gap-6");
  });

  it("renders as ul when as='ul'", () => {
    const { container } = render(<Grid as="ul">Content</Grid>);
    expect(container.firstChild?.nodeName).toBe("UL");
  });

  it("merges custom className", () => {
    const { container } = render(<Grid className="custom">Content</Grid>);
    expect(container.firstChild).toHaveClass("custom");
  });
});
