import type { Meta, StoryObj } from "@storybook/react";
import { Text } from "./Text";

const meta = {
  title: "Typography/Text",
  component: Text,
  parameters: { layout: "padded" },
  args: { children: null },
  argTypes: {
    as: { control: "select", options: ["p", "span", "div", "label", "strong", "em", "small"] },
    size: { control: "select", options: ["xs", "sm", "base", "lg", "xl"] },
    intent: { control: "select", options: ["default", "muted", "brand", "destructive"] },
    weight: { control: "select", options: ["normal", "medium", "semibold", "bold"] },
  },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: "48 teams, 3 host countries, 104 matches." },
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-3">
      {(["xl", "lg", "base", "sm", "xs"] as const).map((size) => (
        <Text key={size} size={size}>
          {size} — The greatest football spectacle on Earth.
        </Text>
      ))}
    </div>
  ),
};

export const Intents: Story = {
  render: () => (
    <div className="space-y-2">
      <Text intent="default">Default — Match details</Text>
      <Text intent="muted">Muted — Supporting information</Text>
      <Text intent="brand">Brand — Live coverage</Text>
      <Text intent="destructive">Destructive — Match cancelled</Text>
    </div>
  ),
};
