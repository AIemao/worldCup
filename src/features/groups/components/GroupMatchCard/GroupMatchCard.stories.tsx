import type { Meta, StoryObj } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";
import { groupMatchesMockData } from "../../data";
import { GroupMatchCard } from "./GroupMatchCard";

const meta: Meta<typeof GroupMatchCard> = {
  title: "Groups/GroupMatchCard",
  component: GroupMatchCard,
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
type Story = StoryObj<typeof GroupMatchCard>;

export const Finished: Story = { args: { match: groupMatchesMockData["A"][0] } };
export const Upcoming: Story = { args: { match: groupMatchesMockData["H"][0] } };
export const Live: Story = {
  args: {
    match: {
      ...groupMatchesMockData["A"][0],
      status: "live",
      isLive: true,
      currentMinute: 67,
      score: { home: 1, away: 0 },
    },
  },
};
