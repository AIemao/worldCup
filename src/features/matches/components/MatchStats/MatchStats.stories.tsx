import type { Meta, StoryObj } from "@storybook/react";
import type { MatchStats as MatchStatsData, TeamRef } from "../../types/match.types";
import { MatchStats } from "./MatchStats";

const homeTeam: TeamRef = {
  id: "bra",
  name: "Brazil",
  shortName: "BRA",
  flagEmoji: "🇧🇷",
  primaryColor: "#009C3B",
};

const awayTeam: TeamRef = {
  id: "ned",
  name: "Netherlands",
  shortName: "NED",
  flagEmoji: "🇳🇱",
  primaryColor: "#FF4F00",
};

const stats: MatchStatsData = {
  possession: { home: 55, away: 45 },
  shots: { home: 11, away: 9 },
  shotsOnTarget: { home: 5, away: 3 },
  corners: { home: 6, away: 4 },
  fouls: { home: 9, away: 10 },
  yellowCards: { home: 1, away: 1 },
  redCards: { home: 0, away: 0 },
};

const dominantStats: MatchStatsData = {
  possession: { home: 70, away: 30 },
  shots: { home: 22, away: 5 },
  shotsOnTarget: { home: 10, away: 1 },
  corners: { home: 11, away: 2 },
  fouls: { home: 7, away: 18 },
  yellowCards: { home: 0, away: 3 },
  redCards: { home: 0, away: 1 },
};

const meta: Meta<typeof MatchStats> = {
  title: "Matches/MatchStats",
  component: MatchStats,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Painel de estatísticas comparativas. Exibe barras de posse, chutes, escanteios, faltas e cartões.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof MatchStats>;

export const Balanced: Story = {
  args: { stats, homeTeam, awayTeam },
};

export const Dominant: Story = {
  args: { stats: dominantStats, homeTeam, awayTeam },
};
