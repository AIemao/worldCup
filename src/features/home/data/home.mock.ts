import type { HomeData } from "../types/home.types";

export const homeMockData: HomeData = {
  featuredMatch: {
    id: "wc26-opening-match",
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
  },
  stats: [
    { id: "teams", label: "Teams", value: 48, suffix: "" },
    { id: "host-nations", label: "Host Nations", value: 3, suffix: "" },
    { id: "matches", label: "Matches", value: 104, suffix: "" },
    { id: "venues", label: "Venues", value: 16, suffix: "" },
  ],
};
