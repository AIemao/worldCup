import type { Meta, StoryObj } from "@storybook/react";
import { TeamFormBadge } from "./TeamFormBadge";

const meta = {
  title: "Teams/TeamFormBadge",
  component: TeamFormBadge,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof TeamFormBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllWins: Story = { args: { form: ["W", "W", "W"] } };
export const Mixed: Story = { args: { form: ["W", "D", "L", "W", "W"] } };
export const Losses: Story = { args: { form: ["L", "L", "D"] } };
export const Empty: Story = { args: { form: [] } };
