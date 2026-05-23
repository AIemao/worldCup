import type { Meta, StoryObj } from "@storybook/react";
import { tickerMockData } from "../../data";
import { LiveTicker } from "./LiveTicker";

const meta: Meta<typeof LiveTicker> = {
  title: "Live/LiveTicker",
  component: LiveTicker,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Ticker horizontal de eventos ao vivo. Rotaciona automaticamente entre os itens. Pausa no hover/focus.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof LiveTicker>;

export const Default: Story = {
  args: { items: tickerMockData },
};

export const SingleItem: Story = {
  args: { items: [tickerMockData[0]] },
};

export const GoalEvent: Story = {
  args: {
    items: [
      {
        id: "goal-story",
        type: "goal",
        matchId: "wc26-live-01",
        homeTeam: tickerMockData[0].homeTeam,
        awayTeam: tickerMockData[0].awayTeam,
        score: { home: 1, away: 0 },
        minute: 34,
        text: "GOAL! Vinicius Jr. (BRA) — 34' — BRA 1–0 ARG",
      },
    ],
  },
};
