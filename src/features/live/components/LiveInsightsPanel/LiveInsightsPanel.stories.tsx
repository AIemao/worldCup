import type { Meta, StoryObj } from "@storybook/react";
import { liveInsightsMockData } from "../../data";
import { LiveInsightsPanel } from "./LiveInsightsPanel";

const meta: Meta<typeof LiveInsightsPanel> = {
  title: "Live/LiveInsightsPanel",
  component: LiveInsightsPanel,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Painel de insights de IA gerados em tempo real durante a partida. Exibe previsões, análises táticas e momentum.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof LiveInsightsPanel>;

export const Default: Story = {
  args: { insights: liveInsightsMockData.insights },
};

export const EmptyState: Story = {
  args: { insights: [] },
};

export const SingleInsight: Story = {
  args: { insights: [liveInsightsMockData.insights[0]] },
};
