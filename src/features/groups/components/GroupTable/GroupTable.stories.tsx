import type { Meta, StoryObj } from "@storybook/react";
import { groupStandingsMockData } from "../../data";
import { GroupTable } from "./GroupTable";

const meta: Meta<typeof GroupTable> = {
  title: "Groups/GroupTable",
  component: GroupTable,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof GroupTable>;

export const Default: Story = {
  args: { standings: groupStandingsMockData["A"], groupLetter: "A" },
};

export const Loading: Story = {
  args: { standings: [], groupLetter: "A", isLoading: true },
};

export const GroupB: Story = {
  args: { standings: groupStandingsMockData["B"], groupLetter: "B" },
};
