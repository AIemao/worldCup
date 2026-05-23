import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./Badge";

const meta = {
  title: "UI/Badge",
  component: Badge,
  parameters: { layout: "centered" },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "primary", "brand", "success", "warning", "destructive", "outline"],
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: "Default", variant: "default" },
};

export const Brand: Story = {
  args: { children: "WC2026", variant: "brand" },
};

export const Success: Story = {
  args: { children: "Active", variant: "success" },
};

export const Warning: Story = {
  args: { children: "Upcoming", variant: "warning" },
};

export const Destructive: Story = {
  args: { children: "Cancelled", variant: "destructive" },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="default">Default</Badge>
      <Badge variant="primary">Primary</Badge>
      <Badge variant="brand">Brand</Badge>
      <Badge variant="success">Live</Badge>
      <Badge variant="warning">Upcoming</Badge>
      <Badge variant="destructive">Cancelled</Badge>
      <Badge variant="outline">Draft</Badge>
    </div>
  ),
};

export const StatusBadges: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="success">● Live</Badge>
      <Badge variant="warning">◐ Halftime</Badge>
      <Badge variant="brand">★ Featured</Badge>
      <Badge variant="outline">Group A</Badge>
    </div>
  ),
};
