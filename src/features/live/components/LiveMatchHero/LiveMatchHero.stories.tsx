import type { Meta, StoryObj } from "@storybook/react";
import { liveMatchesMockData } from "../../data";
import { LiveMatchHero } from "./LiveMatchHero";

const meta: Meta<typeof LiveMatchHero> = {
  title: "Live/LiveMatchHero",
  component: LiveMatchHero,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Hero cinematográfico para partidas ao vivo. Badge LIVE pulsante, placar em tempo real, barra de momentum.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof LiveMatchHero>;

export const Default: Story = {
  args: { match: liveMatchesMockData[0] },
};

export const WithMomentum: Story = {
  args: {
    match: liveMatchesMockData[0],
    momentum: { home: 65, away: 35, trend: "rising_home" },
  },
};

export const EarlyGame: Story = {
  args: {
    match: liveMatchesMockData[1],
    momentum: { home: 52, away: 48, trend: "neutral" },
  },
};
