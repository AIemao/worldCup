import type { Meta, StoryObj } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";
import { AppNav } from "./AppNav";

const meta: Meta<typeof AppNav> = {
  title: "Navigation/AppNav",
  component: AppNav,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof AppNav>;

export const Default: Story = {};

export const CustomSpacing: Story = {
  args: {
    className: "gap-10",
  },
};
