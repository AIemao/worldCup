import type { Meta, StoryObj } from "@storybook/react";
import { Separator } from "./Separator";

const meta = {
  title: "UI/Separator",
  component: Separator,
  parameters: { layout: "padded" },
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  render: () => (
    <div className="w-64 space-y-4">
      <p className="text-foreground text-sm">Section A</p>
      <Separator />
      <p className="text-foreground text-sm">Section B</p>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className="flex h-12 items-center gap-4">
      <span className="text-foreground text-sm">Matches</span>
      <Separator orientation="vertical" />
      <span className="text-foreground text-sm">Teams</span>
      <Separator orientation="vertical" />
      <span className="text-foreground text-sm">Groups</span>
    </div>
  ),
};
