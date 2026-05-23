import type { Meta, StoryObj } from "@storybook/react";
import { MomentumBar } from "./MomentumBar";

const meta: Meta<typeof MomentumBar> = {
  title: "Live/MomentumBar",
  component: MomentumBar,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Barra de momentum entre as duas equipes. Mostra domínio proporcional com animação suave.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof MomentumBar>;

export const Balanced: Story = {
  args: {
    momentum: { home: 50, away: 50, trend: "neutral" },
    homeLabel: "Brazil",
    awayLabel: "Argentina",
    homeColor: "#009C3B",
    awayColor: "#74ACDF",
  },
};

export const HomeLeading: Story = {
  args: {
    momentum: { home: 68, away: 32, trend: "rising_home" },
    homeLabel: "BRA",
    awayLabel: "ARG",
    homeColor: "#009C3B",
    awayColor: "#74ACDF",
  },
};

export const AwayLeading: Story = {
  args: {
    momentum: { home: 35, away: 65, trend: "rising_away" },
    homeLabel: "FRA",
    awayLabel: "ENG",
    homeColor: "#002395",
    awayColor: "#CF081F",
  },
};
