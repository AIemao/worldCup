import type { Meta, StoryObj } from "@storybook/react";
import { DEFAULT_MATCH_FILTERS } from "../../types/match.types";
import { MatchFilters } from "./MatchFilters";

const noop = () => undefined;

const meta: Meta<typeof MatchFilters> = {
  title: "Matches/MatchFilters",
  component: MatchFilters,
  tags: ["autodocs"],
  args: {
    onChange: noop,
    onReset: noop,
  },
  parameters: {
    docs: {
      description: {
        component:
          "Painel de filtros para partidas. Suporta busca livre, status e stage. Botão de reset aparece apenas com filtros ativos.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof MatchFilters>;

export const Default: Story = {
  args: { filters: DEFAULT_MATCH_FILTERS },
};

export const WithActiveStatus: Story = {
  args: { filters: { ...DEFAULT_MATCH_FILTERS, status: "live" } },
};

export const WithSearch: Story = {
  args: { filters: { ...DEFAULT_MATCH_FILTERS, search: "Brazil" } },
};

export const WithMultipleFilters: Story = {
  args: {
    filters: { ...DEFAULT_MATCH_FILTERS, status: "finished", stage: "semi_final" },
  },
};
