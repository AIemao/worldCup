import type { Meta, StoryObj } from "@storybook/react";
import { teamsMockData } from "../../data";
import { TeamHero } from "./TeamHero";

const brazil = teamsMockData.find((t) => t.id === "bra")!;

const meta = {
  title: "Teams/TeamHero",
  component: TeamHero,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
} satisfies Meta<typeof TeamHero>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Brazil: Story = { args: { team: brazil } };
export const WithBanner: Story = {
  args: {
    team: { ...brazil, banner: "https://www.thesportsdb.com/images/media/team/banner/bra.jpg" },
  },
};
