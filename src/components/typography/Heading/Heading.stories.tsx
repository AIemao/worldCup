import type { Meta, StoryObj } from "@storybook/react";
import { Heading } from "./Heading";

const meta = {
  title: "Typography/Heading",
  component: Heading,
  parameters: { layout: "padded" },
  args: { children: null },
  argTypes: {
    as: { control: "select", options: ["h1", "h2", "h3", "h4", "h5", "h6"] },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl", "2xl", "3xl"],
    },
    intent: {
      control: "select",
      options: ["default", "muted", "brand", "gradient"],
    },
  },
} satisfies Meta<typeof Heading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: "World Cup 2026", as: "h1", size: "xl" },
};

export const Gradient: Story = {
  args: { children: "48 Teams. 3 Nations. One Trophy.", as: "h1", size: "3xl", intent: "gradient" },
};

export const Scale: Story = {
  render: () => (
    <div className="space-y-4">
      {(["3xl", "2xl", "xl", "lg", "md", "sm", "xs"] as const).map((size) => (
        <Heading key={size} as="h2" size={size}>
          {size} — Group Stage Preview
        </Heading>
      ))}
    </div>
  ),
};

export const Intents: Story = {
  render: () => (
    <div className="space-y-4">
      <Heading intent="default" size="lg">
        Default — Match Preview
      </Heading>
      <Heading intent="muted" size="lg">
        Muted — Supporting text
      </Heading>
      <Heading intent="brand" size="lg">
        Brand — Live Now
      </Heading>
      <Heading intent="gradient" size="lg">
        Gradient — World Cup 2026
      </Heading>
    </div>
  ),
};
