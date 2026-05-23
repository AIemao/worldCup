import type { Meta, StoryObj } from "@storybook/react";
import { matchesMockData } from "../../data";
import { MatchHero } from "./MatchHero";

const upcomingMatch = matchesMockData.find((m) => m.status === "upcoming")!;
const liveMatch = matchesMockData.find((m) => m.status === "live" && m.stage === "semi_final")!;
const finishedMatch = matchesMockData.find(
  (m) => m.status === "finished" && m.stage === "semi_final"
)!;
const finalMatch = matchesMockData.find((m) => m.stage === "final")!;

const meta: Meta<typeof MatchHero> = {
  title: "Matches/MatchHero",
  component: MatchHero,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Seção hero cinematográfica de partida. Design inspirado em broadcasts de futebol de alta qualidade com glow e gradient.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof MatchHero>;

export const Upcoming: Story = {
  args: { match: upcomingMatch },
};

export const Live: Story = {
  args: { match: liveMatch },
};

export const Finished: Story = {
  args: { match: finishedMatch },
};

export const Final: Story = {
  args: { match: finalMatch },
};
