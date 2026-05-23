import type { Meta, StoryObj } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";
import { teamsMockData } from "../../data";
import { TeamCard } from "./TeamCard";

const brazil = teamsMockData.find((t) => t.id === "bra")!;

const meta = {
  title: "Teams/TeamCard",
  component: TeamCard,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof TeamCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Brazil: Story = { args: { team: brazil } };
export const England: Story = { args: { team: teamsMockData.find((t) => t.id === "eng")! } };
