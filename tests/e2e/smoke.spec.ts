import { expect, test } from "@playwright/test";

test("página carrega com título correto", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/World Cup/i);
});
