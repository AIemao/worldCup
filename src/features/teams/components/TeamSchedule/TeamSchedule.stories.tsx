import type { Meta, StoryObj } from "@storybook/react";
import { teamScheduleMockData } from "../../data";
import { TeamSchedule } from "./TeamSchedule";

const matches = teamScheduleMockData["bra"];

const meta = {
  title: "Teams/TeamSchedule",
  component: TeamSchedule,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
} satisfies Meta<typeof TeamSchedule>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { matches } };
export const Loading: Story = { args: { matches: [], isLoading: true } };
export const Empty: Story = { args: { matches: [] } };
