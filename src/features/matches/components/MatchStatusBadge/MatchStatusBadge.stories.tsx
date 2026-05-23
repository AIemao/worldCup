import type { Meta, StoryObj } from "@storybook/react";
import { MatchStatusBadge } from "./MatchStatusBadge";

const meta: Meta<typeof MatchStatusBadge> = {
  title: "Matches/MatchStatusBadge",
  component: MatchStatusBadge,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Badge de status da partida. Live pulsa com indicador verde. Upcoming é azul/brand. Final é cinza neutro.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof MatchStatusBadge>;

export const Upcoming: Story = {
  args: { status: "upcoming" },
};

export const Live: Story = {
  args: { status: "live" },
};

export const Finished: Story = {
  args: { status: "finished" },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <MatchStatusBadge status="upcoming" />
      <MatchStatusBadge status="live" />
      <MatchStatusBadge status="finished" />
    </div>
  ),
};
