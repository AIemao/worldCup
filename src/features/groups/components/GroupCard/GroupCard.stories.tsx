import type { Meta, StoryObj } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";
import { groupsMockData, groupStandingsMockData } from "../../data";
import { GroupCard } from "./GroupCard";

const meta: Meta<typeof GroupCard> = {
  title: "Groups/GroupCard",
  component: GroupCard,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof GroupCard>;

export const Default: Story = {
  args: { group: groupsMockData[0], standings: groupStandingsMockData["A"] },
};

export const GroupB: Story = {
  args: { group: groupsMockData[1], standings: groupStandingsMockData["B"] },
};

export const AllGroups: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {groupsMockData.map((g) => (
        <GroupCard key={g.id} group={g} standings={groupStandingsMockData[g.letter]} />
      ))}
    </div>
  ),
};
