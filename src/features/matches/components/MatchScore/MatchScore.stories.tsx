import type { Meta, StoryObj } from "@storybook/react";
import { MatchScore } from "./MatchScore";

const meta: Meta<typeof MatchScore> = {
  title: "Matches/MatchScore",
  component: MatchScore,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Placar ou 'vs' dependendo do status. Exibe minuto para partidas ao vivo e pênaltis quando aplicável.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof MatchScore>;

export const Upcoming: Story = {
  args: {
    status: "upcoming",
    scheduledAt: "2026-06-18T18:00:00Z",
  },
};

export const Live: Story = {
  args: {
    status: "live",
    score: { home: 1, away: 0 },
    scheduledAt: "2026-06-12T22:00:00Z",
    currentMinute: 73,
  },
};

export const Finished: Story = {
  args: {
    status: "finished",
    score: { home: 2, away: 1 },
    scheduledAt: "2026-06-11T20:00:00Z",
  },
};

export const FinishedWithPenalties: Story = {
  args: {
    status: "finished",
    score: { home: 1, away: 1, homePenalties: 4, awayPenalties: 3 },
    scheduledAt: "2026-07-05T20:00:00Z",
  },
};
