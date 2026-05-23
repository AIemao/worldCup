import type { Meta, StoryObj } from "@storybook/react";
import { teamPlayersMockData } from "../../data";
import { TeamRoster } from "./TeamRoster";

const players = teamPlayersMockData["bra"];

const meta = {
  title: "Teams/TeamRoster",
  component: TeamRoster,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
} satisfies Meta<typeof TeamRoster>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { players } };
export const Loading: Story = { args: { players: [], isLoading: true } };
export const Empty: Story = { args: { players: [] } };
