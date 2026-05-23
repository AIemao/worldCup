import type { Meta, StoryObj } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";
import { NavLink } from "./NavLink";

const meta = {
  title: "Navigation/NavLink",
  component: NavLink,
  parameters: { layout: "centered" },
  args: { to: "/" },
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={["/matches"]}>
        <Story />
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof NavLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Active: Story = {
  args: { to: "/matches", children: "Matches" },
};

export const Inactive: Story = {
  args: { to: "/teams", children: "Teams" },
};

export const Navigation: Story = {
  args: {},
  render: () => (
    <nav className="flex items-center gap-6">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/matches">Matches</NavLink>
      <NavLink to="/groups">Groups</NavLink>
      <NavLink to="/teams">Teams</NavLink>
      <NavLink to="/standings">Standings</NavLink>
    </nav>
  ),
};

export const VerticalNav: Story = {
  args: {},
  render: () => (
    <nav className="flex w-48 flex-col gap-1">
      {[
        { to: "/", label: "Home" },
        { to: "/matches", label: "Matches" },
        { to: "/groups", label: "Groups" },
        { to: "/teams", label: "Teams" },
        { to: "/standings", label: "Standings" },
      ].map(({ to, label }) => (
        <NavLink key={to} to={to} className="hover:bg-accent rounded-md px-3 py-2">
          {label}
        </NavLink>
      ))}
    </nav>
  ),
};
