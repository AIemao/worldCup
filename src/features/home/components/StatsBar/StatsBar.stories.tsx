import type { Meta, StoryObj } from "@storybook/react";
import type { TournamentStat } from "../../types/home.types";
import { StatsBar } from "./StatsBar";

const defaultStats: TournamentStat[] = [
  { id: "teams", label: "Teams", value: 48 },
  { id: "nations", label: "Host Nations", value: 3 },
  { id: "matches", label: "Matches", value: 104 },
  { id: "venues", label: "Venues", value: 16 },
];

const meta: Meta<typeof StatsBar> = {
  title: "Home/StatsBar",
  component: StatsBar,
  args: { stats: defaultStats },
  parameters: { layout: "fullscreen" },
};

export default meta;

type Story = StoryObj<typeof StatsBar>;

export const Default: Story = {};

export const WithSuffix: Story = {
  args: {
    stats: [
      { id: "teams", label: "Teams", value: 48 },
      { id: "nations", label: "Nations", value: 3 },
      { id: "days", label: "Days of Football", value: 100, suffix: "+" },
      { id: "billion", label: "Global Viewers", value: "1B", suffix: "+" },
    ],
  },
};
