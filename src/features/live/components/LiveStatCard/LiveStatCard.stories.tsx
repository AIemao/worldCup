import type { Meta, StoryObj } from "@storybook/react";
import { LiveStatCard } from "./LiveStatCard";

const meta: Meta<typeof LiveStatCard> = {
  title: "Live/LiveStatCard",
  component: LiveStatCard,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Card de estatística individual para partidas ao vivo.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof LiveStatCard>;

export const Shots: Story = {
  args: { label: "Shots", homeValue: 12, awayValue: 7 },
};

export const Possession: Story = {
  args: {
    label: "Possession",
    homeValue: "58%",
    awayValue: "42%",
    homePercent: 58,
    awayPercent: 42,
  },
};

export const AllStats: Story = {
  render: () => (
    <div className="flex w-64 flex-col gap-2">
      <LiveStatCard
        label="Possession"
        homeValue="58%"
        awayValue="42%"
        homePercent={58}
        awayPercent={42}
      />
      <LiveStatCard label="Shots" homeValue={12} awayValue={7} />
      <LiveStatCard label="On Target" homeValue={5} awayValue={3} />
      <LiveStatCard label="Corners" homeValue={6} awayValue={3} />
    </div>
  ),
};
