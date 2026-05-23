import type { Meta, StoryObj } from "@storybook/react";
import { teamResultsMockData } from "../../data";
import { TeamResults } from "./TeamResults";

const matches = teamResultsMockData["bra"];

const meta = {
  title: "Teams/TeamResults",
  component: TeamResults,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
} satisfies Meta<typeof TeamResults>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { matches } };
export const Loading: Story = { args: { matches: [], isLoading: true } };
export const Empty: Story = { args: { matches: [] } };
