import type { Meta, StoryObj } from "@storybook/react";
import { FadeIn } from "./FadeIn";

const meta = {
  title: "Motion/FadeIn",
  component: FadeIn,
  parameters: { layout: "centered" },
  args: { children: null },
  argTypes: {
    duration: { control: { type: "range", min: 0.1, max: 2, step: 0.1 } },
    delay: { control: { type: "range", min: 0, max: 1, step: 0.05 } },
  },
} satisfies Meta<typeof FadeIn>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <div className="border-border bg-card rounded-xl border p-8 text-center">
        <p className="text-lg font-semibold">Faded in</p>
        <p className="text-muted-foreground text-sm">opacity 0 → 1</p>
      </div>
    ),
    duration: 0.4,
  },
};

export const WithDelay: Story = {
  args: {
    children: (
      <div className="border-border bg-card rounded-xl border p-8 text-center">
        <p className="text-lg font-semibold">Delayed fade</p>
        <p className="text-muted-foreground text-sm">0.4s delay</p>
      </div>
    ),
    duration: 0.4,
    delay: 0.4,
  },
};

export const Stacked: Story = {
  render: () => (
    <div className="space-y-4">
      {[0, 0.1, 0.2, 0.3].map((delay, i) => (
        <FadeIn key={i} delay={delay}>
          <div className="border-border bg-card rounded-lg border px-4 py-3">
            <p className="text-sm">
              Item {i + 1} — delay {delay}s
            </p>
          </div>
        </FadeIn>
      ))}
    </div>
  ),
};
