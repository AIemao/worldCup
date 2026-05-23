import type { Meta, StoryObj } from "@storybook/react";
import { ScaleIn } from "./ScaleIn";

const meta = {
  title: "Motion/ScaleIn",
  component: ScaleIn,
  parameters: { layout: "centered" },
  args: { children: null },
  argTypes: {
    initialScale: { control: { type: "range", min: 0.5, max: 1, step: 0.05 } },
    duration: { control: { type: "range", min: 0.1, max: 1.5, step: 0.1 } },
  },
} satisfies Meta<typeof ScaleIn>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <div className="border-border bg-card rounded-xl border p-8 text-center">
        <p className="text-lg font-semibold">Scale in</p>
        <p className="text-muted-foreground text-sm">scale 0.95 → 1</p>
      </div>
    ),
    initialScale: 0.95,
  },
};

export const CardGrid: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <ScaleIn key={i} delay={i * 0.05}>
          <div className="border-border bg-card rounded-xl border p-6 text-center">
            <p className="text-sm font-medium">Match {i + 1}</p>
          </div>
        </ScaleIn>
      ))}
    </div>
  ),
};
