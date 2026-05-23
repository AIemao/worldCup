import type { Meta, StoryObj } from "@storybook/react";
import { StaggerList } from "./StaggerList";

const meta = {
  title: "Motion/StaggerList",
  component: StaggerList,
  parameters: { layout: "padded" },
  args: { children: null },
  argTypes: {
    staggerDelay: { control: { type: "range", min: 0.02, max: 0.2, step: 0.01 } },
  },
} satisfies Meta<typeof StaggerList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <StaggerList className="space-y-3">
      {["Brazil", "Argentina", "France", "Germany", "Spain"].map((team) => (
        <div
          key={team}
          className="border-border bg-card flex items-center justify-between rounded-lg border px-4 py-3"
        >
          <span className="font-medium">{team}</span>
          <span className="text-muted-foreground text-xs">Group Stage</span>
        </div>
      ))}
    </StaggerList>
  ),
};

export const CardGrid: Story = {
  render: () => (
    <StaggerList className="grid grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="border-border bg-card rounded-xl border p-6 text-center">
          <p className="text-muted-foreground/30 text-2xl font-bold">{i + 1}</p>
          <p className="mt-1 text-sm font-medium">Match {i + 1}</p>
        </div>
      ))}
    </StaggerList>
  ),
};

export const FastStagger: Story = {
  render: () => (
    <StaggerList className="space-y-2" staggerDelay={0.03}>
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="border-border bg-card flex h-10 items-center rounded-md border px-3"
        >
          <span className="text-muted-foreground text-sm">Row {i + 1}</span>
        </div>
      ))}
    </StaggerList>
  ),
};
