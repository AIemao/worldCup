import type { Meta, StoryObj } from "@storybook/react";
import { TeamBadge } from "./TeamBadge";

const team = {
  badge: "https://www.thesportsdb.com/images/media/team/badge/bra.png",
  name: "Brazil",
  flagEmoji: "🇧🇷",
};

const meta = {
  title: "Teams/TeamBadge",
  component: TeamBadge,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["xs", "sm", "md", "lg", "xl"] },
  },
} satisfies Meta<typeof TeamBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { team, size: "md" } };
export const Small: Story = { args: { team, size: "sm" } };
export const Large: Story = { args: { team, size: "lg" } };
export const ExtraLarge: Story = { args: { team, size: "xl" } };
export const FallbackEmoji: Story = {
  args: { team: { ...team, badge: "https://invalid.url/badge.png" }, size: "md" },
};
