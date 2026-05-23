import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
    testDir: "./tests/e2e",
    fullyParallel: true,

    // falha o build de CI se testes com .only forem commitados por acidente
    forbidOnly: !!process.env.CI,

    // retries apenas em CI (flaky tests em pipeline)
    retries: process.env.CI ? 2 : 0,

    // workers em CI = 1 para evitar race conditions em ambientes limitados
    workers: process.env.CI ? 1 : undefined,

    reporter: [["html", { open: "never" }]],

    use: {
        baseURL: "http://localhost:5173",
        trace: "on-first-retry",
    },

    projects: [
        {
            name: "chromium",
            use: { ...devices["Desktop Chrome"] },
        },
    ],

    webServer: {
        command: "npm run dev",
        url: "http://localhost:5173",
        // reutiliza server já rodando em dev local; em CI sempre sobe um novo
        reuseExistingServer: !process.env.CI,
    },
});
