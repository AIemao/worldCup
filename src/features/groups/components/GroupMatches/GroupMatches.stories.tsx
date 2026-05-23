import type { Meta, StoryObj } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";
import { groupMatchesMockData } from "../../data";
import { GroupMatches } from "./GroupMatches";

const meta: Meta<typeof GroupMatches> = {
  title: "Groups/GroupMatches",
  component: GroupMatches,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof GroupMatches>;

export const Default: Story = { args: { matches: groupMatchesMockData["A"] } };
export const Loading: Story = { args: { matches: [], isLoading: true } };
export const Empty: Story = { args: { matches: [] } };
export const WithUpcoming: Story = { args: { matches: groupMatchesMockData["H"] } };
