import type { Meta, StoryObj } from "@storybook/react";
import { LiveBadge } from "./LiveBadge";

const meta: Meta<typeof LiveBadge> = {
  title: "Live/LiveBadge",
  component: LiveBadge,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Indicador visual de partida ao vivo. Pulsa em vermelho. Pode exibir o minuto atual.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof LiveBadge>;

export const Default: Story = {};

export const WithMinute: Story = {
  args: { minute: 67 },
};

export const Bright: Story = {
  args: { variant: "bright", minute: 45 },
};

export const Subtle: Story = {
  args: { variant: "subtle" },
};

export const Small: Story = {
  args: { size: "sm", minute: 23 },
};

export const Large: Story = {
  args: { size: "lg", variant: "bright", minute: 88 },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <LiveBadge />
      <LiveBadge variant="bright" />
      <LiveBadge variant="subtle" />
      <LiveBadge minute={67} />
      <LiveBadge variant="bright" minute={88} />
    </div>
  ),
};
