import type { Meta, StoryObj } from "@storybook/react";
import { SlideIn } from "./SlideIn";

const meta = {
  title: "Motion/SlideIn",
  component: SlideIn,
  parameters: { layout: "centered" },
  args: { children: null },
  argTypes: {
    direction: { control: "select", options: ["up", "down", "left", "right"] },
    duration: { control: { type: "range", min: 0.1, max: 2, step: 0.1 } },
    distance: { control: { type: "range", min: 4, max: 64, step: 4 } },
  },
} satisfies Meta<typeof SlideIn>;

export default meta;
type Story = StoryObj<typeof meta>;

const Card = ({ label }: { label: string }) => (
  <div className="border-border bg-card rounded-xl border p-8 text-center">
    <p className="text-lg font-semibold">{label}</p>
  </div>
);

export const Up: Story = {
  args: { children: <Card label="Slide up" />, direction: "up" },
};

export const Left: Story = {
  args: { children: <Card label="Slide left" />, direction: "left" },
};

export const AllDirections: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4">
      {(["up", "down", "left", "right"] as const).map((direction) => (
        <SlideIn key={direction} direction={direction} delay={0.1}>
          <div className="border-border bg-card rounded-xl border p-6 text-center">
            <p className="text-sm font-semibold capitalize">{direction}</p>
          </div>
        </SlideIn>
      ))}
    </div>
  ),
};
