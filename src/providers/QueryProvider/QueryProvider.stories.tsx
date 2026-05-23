import type { Meta, StoryObj } from "@storybook/react";
import { QueryProvider } from "./QueryProvider";

const meta: Meta<typeof QueryProvider> = {
  title: "Providers/QueryProvider",
  component: QueryProvider,
  args: { children: <span className="text-foreground text-sm">QueryProvider is active</span> },
  parameters: { layout: "centered" },
};

export default meta;

type Story = StoryObj<typeof QueryProvider>;

export const Default: Story = {};
