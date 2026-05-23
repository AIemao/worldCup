import type { Meta, StoryObj } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";
import { matchesMockData } from "../../data";
import { MatchCard } from "./MatchCard";

const upcomingMatch = matchesMockData.find((m) => m.status === "upcoming")!;
const liveMatch = matchesMockData.find((m) => m.status === "live")!;
const finishedMatch = matchesMockData.find((m) => m.status === "finished")!;

const meta: Meta<typeof MatchCard> = {
  title: "Matches/MatchCard",
  component: MatchCard,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <MemoryRouter>
        <div className="w-72">
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component:
          "Card compacto de partida. Inclui equipes, placar/vs, badge de status, venue e link de detalhe.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof MatchCard>;

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
  args: { match: matchesMockData.find((m) => m.stage === "final")! },
};
