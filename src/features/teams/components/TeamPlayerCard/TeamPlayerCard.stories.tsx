import type { Meta, StoryObj } from "@storybook/react";
import { teamPlayersMockData } from "../../data";
import { TeamPlayerCard } from "./TeamPlayerCard";

const ederson = teamPlayersMockData["bra"][0];

const meta = {
  title: "Teams/TeamPlayerCard",
  component: TeamPlayerCard,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof TeamPlayerCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Goalkeeper: Story = { args: { player: ederson } };
export const Forward: Story = { args: { player: teamPlayersMockData["bra"][4] } };
export const NoImage: Story = { args: { player: { ...ederson, thumb: undefined } } };
