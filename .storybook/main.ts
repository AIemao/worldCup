import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
    // glob para encontrar todas as stories do projeto
    stories: ["../src/**/*.stories.@(ts|tsx|mdx)"],

    addons: [
        "@storybook/addon-a11y", // validação de acessibilidade no browser
    ],

    framework: {
        name: "@storybook/react-vite",
        options: {},
    },

    // Storybook 10 — docs são incluídos por padrão no core
    docs: {},
};

export default config;
