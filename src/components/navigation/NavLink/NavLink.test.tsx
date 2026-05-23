import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { NavLink } from "./NavLink";

function renderWithRouter(ui: React.ReactNode, initialPath = "/") {
  return render(<MemoryRouter initialEntries={[initialPath]}>{ui}</MemoryRouter>);
}

describe("NavLink", () => {
  it("renders as an anchor element", () => {
    renderWithRouter(<NavLink to="/">Home</NavLink>);
    expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
  });

  it("applies muted foreground when not active", () => {
    renderWithRouter(<NavLink to="/matches">Matches</NavLink>, "/");
    expect(screen.getByRole("link")).toHaveClass("text-muted-foreground");
  });

  it("applies foreground when active", () => {
    renderWithRouter(<NavLink to="/">Home</NavLink>, "/");
    expect(screen.getByRole("link")).toHaveClass("text-foreground");
  });

  it("renders children", () => {
    renderWithRouter(<NavLink to="/teams">Teams</NavLink>);
    expect(screen.getByText("Teams")).toBeInTheDocument();
  });

  it("merges custom className", () => {
    renderWithRouter(
      <NavLink to="/" className="uppercase">
        Home
      </NavLink>
    );
    expect(screen.getByRole("link")).toHaveClass("uppercase");
  });

  it("forwards aria attributes", () => {
    renderWithRouter(
      <NavLink to="/" aria-label="Go to home page">
        Home
      </NavLink>
    );
    expect(screen.getByRole("link", { name: "Go to home page" })).toBeInTheDocument();
  });
});
