import type { Meta, StoryObj } from "@storybook/react";
import { groupStandingsMockData } from "../../data";
import { GroupTableRow } from "./GroupTableRow";

const meta: Meta<typeof GroupTableRow> = {
  title: "Groups/GroupTableRow",
  component: GroupTableRow,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  decorators: [
    (Story) => (
      <table className="w-full min-w-[500px]">
        <tbody>
          <Story />
        </tbody>
      </table>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof GroupTableRow>;

export const Qualified: Story = { args: { standing: groupStandingsMockData["A"][0] } };
export const Playoff: Story = { args: { standing: groupStandingsMockData["A"][2] } };
export const Eliminated: Story = { args: { standing: groupStandingsMockData["A"][3] } };
export const Highlighted: Story = {
  args: { standing: groupStandingsMockData["A"][1], isHighlighted: true },
};
