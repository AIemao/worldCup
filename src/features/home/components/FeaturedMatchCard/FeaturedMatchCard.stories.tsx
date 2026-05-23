import type { Meta, StoryObj } from "@storybook/react";
import type { FeaturedMatch } from "../../types/home.types";
import { FeaturedMatchCard } from "./FeaturedMatchCard";

const upcomingMatch: FeaturedMatch = {
  id: "wc26-opening",
  homeTeam: {
    id: "mex",
    name: "Mexico",
    shortName: "MEX",
    flagEmoji: "🇲🇽",
    primaryColor: "#006847",
  },
  awayTeam: {
    id: "usa",
    name: "United States",
    shortName: "USA",
    flagEmoji: "🇺🇸",
    primaryColor: "#B22234",
  },
  scheduledAt: "2026-06-11T20:00:00Z",
  venue: "Estadio Azteca",
  city: "Mexico City",
  status: "upcoming",
  round: "Group Stage — Group A",
};

const meta: Meta<typeof FeaturedMatchCard> = {
  title: "Home/FeaturedMatchCard",
  component: FeaturedMatchCard,
  args: { match: upcomingMatch },
  parameters: { layout: "centered" },
};

export default meta;

type Story = StoryObj<typeof FeaturedMatchCard>;

export const Upcoming: Story = {};

export const Live: Story = {
  args: {
    match: { ...upcomingMatch, id: "live", status: "live", score: { home: 1, away: 0 } },
  },
};

export const Finished: Story = {
  args: {
    match: { ...upcomingMatch, id: "finished", status: "finished", score: { home: 2, away: 1 } },
  },
};
