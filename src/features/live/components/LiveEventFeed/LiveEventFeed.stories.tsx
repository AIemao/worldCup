import type { Meta, StoryObj } from "@storybook/react";
import { liveMatchesMockData } from "../../data";
import { LiveEventFeed } from "./LiveEventFeed";

const match = liveMatchesMockData[0];

const meta: Meta<typeof LiveEventFeed> = {
  title: "Live/LiveEventFeed",
  component: LiveEventFeed,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Feed de eventos ao vivo: gols, cartões, substituições, VAR. Eventos do time da casa ficam à esquerda.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof LiveEventFeed>;

export const Default: Story = {
  args: {
    events: match.events ?? [],
    homeTeamId: match.homeTeam.id,
  },
};

export const EmptyState: Story = {
  args: {
    events: [],
    homeTeamId: "bra",
  },
};
