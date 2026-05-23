import type { Meta, StoryObj } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";
import { CTABlock } from "./CTABlock";

const meta: Meta<typeof CTABlock> = {
  title: "Home/CTABlock",
  component: CTABlock,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  parameters: { layout: "fullscreen" },
};

export default meta;

type Story = StoryObj<typeof CTABlock>;

export const Default: Story = {};

export const CustomContent: Story = {
  args: {
    title: "Don't Miss a Single Match",
    description: "Get notified for every kick-off and live update throughout the tournament.",
  },
};
