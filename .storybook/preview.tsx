import type { Preview } from "@storybook/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "../src/index.css";

/**
 * QueryClient de Storybook — isolado por story para evitar
 * contaminação de cache entre stories diferentes.
 */
function makeStorybookQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: { retry: false, staleTime: Infinity },
    },
  });
}

const preview: Preview = {
  parameters: {
    // configura os backgrounds do Storybook para refletir dark mode first
    backgrounds: {
      default: "dark",
      values: [
        { name: "dark", value: "oklch(0.141 0.005 285.82)" },
        { name: "light", value: "oklch(1 0 0)" },
      ],
    },

    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },

  decorators: [
    (Story) => {
      // aplica dark mode por padrão em todas as stories
      document.documentElement.classList.add("dark");
      return Story();
    },
    (Story) => {
      // fornece QueryClient para stories que usam React Query hooks
      const qc = makeStorybookQueryClient();
      return (
        <QueryClientProvider client={qc}>
          <Story />
        </QueryClientProvider>
      );
    },
  ],
};

export default preview;
