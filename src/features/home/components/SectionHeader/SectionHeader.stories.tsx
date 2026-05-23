import type { Meta, StoryObj } from "@storybook/react";
import { SectionHeader } from "./SectionHeader";

const meta: Meta<typeof SectionHeader> = {
  title: "Home/SectionHeader",
  component: SectionHeader,
  args: { title: "Featured Matches" },
  parameters: { layout: "padded" },
};

export default meta;

type Story = StoryObj<typeof SectionHeader>;

export const Default: Story = {};

export const WithLabel: Story = {
  args: { label: "Schedule", title: "Upcoming Matches" },
};

export const WithDescription: Story = {
  args: {
    label: "Tournament",
    title: "Group Stage",
    description: "48 teams compete across 3 host nations for the ultimate prize in football.",
  },
};

export const WithAction: Story = {
  args: {
    label: "Highlights",
    title: "Featured Matches",
    action: <button className="text-brand text-sm font-medium">View All →</button>,
  },
};

export const Centered: Story = {
  args: {
    label: "World Cup 2026",
    title: "The Greatest Show on Earth",
    description: "32 nations. 48 matches. One world champion.",
    align: "center",
  },
};
