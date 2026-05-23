import type { Meta, StoryObj } from "@storybook/react";
import { Download, Play, Plus } from "lucide-react";
import { Button } from "./Button";

const meta = {
  title: "UI/Button",
  component: Button,
  parameters: { layout: "centered" },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "outline", "ghost", "glow", "destructive", "link"],
    },
    size: { control: "select", options: ["sm", "md", "lg", "icon"] },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { children: "Get Started", variant: "primary" },
};

export const Outline: Story = {
  args: { children: "Learn More", variant: "outline" },
};

export const Ghost: Story = {
  args: { children: "Cancel", variant: "ghost" },
};

export const Glow: Story = {
  args: { children: "Watch Live", variant: "glow" },
};

export const Destructive: Story = {
  args: { children: "Delete Match", variant: "destructive" },
};

export const LinkVariant: Story = {
  args: { children: "View all matches", variant: "link" },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Button variant="primary">
        <Play />
        Watch Live
      </Button>
      <Button variant="outline">
        <Download />
        Export
      </Button>
      <Button size="icon" variant="ghost" aria-label="Add">
        <Plus />
      </Button>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Button disabled>Disabled Primary</Button>
      <Button variant="outline" disabled>
        Disabled Outline
      </Button>
      <Button variant="glow" disabled>
        Disabled Glow
      </Button>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      {(["primary", "outline", "ghost", "glow", "destructive", "link"] as const).map((variant) => (
        <Button key={variant} variant={variant}>
          {variant.charAt(0).toUpperCase() + variant.slice(1)}
        </Button>
      ))}
    </div>
  ),
};
