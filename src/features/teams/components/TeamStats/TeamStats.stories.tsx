import type { Meta, StoryObj } from "@storybook/react";
import { teamsMockData } from "../../data";
import { TeamStats } from "./TeamStats";

const brazil = teamsMockData.find((t) => t.id === "bra")!;

const meta = {
  title: "Teams/TeamStats",
  component: TeamStats,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
} satisfies Meta<typeof TeamStats>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { stats: brazil.stats! } };
export const NoForm: Story = {
  args: { stats: { ...brazil.stats!, form: [] } },
};
