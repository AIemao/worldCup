import type { Meta, StoryObj } from "@storybook/react";
import { Grid } from "./Grid";

const meta = {
  title: "Layout/Grid",
  component: Grid,
  parameters: { layout: "padded" },
  args: { children: null },
} satisfies Meta<typeof Grid>;

export default meta;
type Story = StoryObj<typeof meta>;

const Item = ({ children }: { children: React.ReactNode }) => (
  <div className="border-border bg-card rounded-xl border p-6 text-center">{children}</div>
);

export const TwoColumns: Story = {
  render: () => (
    <Grid cols="2" gap="md">
      {Array.from({ length: 4 }).map((_, i) => (
        <Item key={i}>Item {i + 1}</Item>
      ))}
    </Grid>
  ),
};

export const ThreeColumns: Story = {
  render: () => (
    <Grid cols="3" gap="md">
      {Array.from({ length: 6 }).map((_, i) => (
        <Item key={i}>Match {i + 1}</Item>
      ))}
    </Grid>
  ),
};

export const FourColumns: Story = {
  render: () => (
    <Grid cols="4" gap="sm">
      {Array.from({ length: 8 }).map((_, i) => (
        <Item key={i}>Team {i + 1}</Item>
      ))}
    </Grid>
  ),
};

export const AutoFill: Story = {
  render: () => (
    <Grid cols="auto" gap="md">
      {Array.from({ length: 5 }).map((_, i) => (
        <Item key={i}>Card {i + 1}</Item>
      ))}
    </Grid>
  ),
};

export const GapVariants: Story = {
  render: () => (
    <div className="space-y-8">
      {(["sm", "md", "lg", "xl"] as const).map((gap) => (
        <div key={gap}>
          <p className="text-muted-foreground mb-2 font-mono text-xs">gap="{gap}"</p>
          <Grid cols="3" gap={gap}>
            {Array.from({ length: 3 }).map((_, i) => (
              <Item key={i}>Item {i + 1}</Item>
            ))}
          </Grid>
        </div>
      ))}
    </div>
  ),
};
