import { test } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { ENV } from "../config/env";

test("Login Test", async ({ page }) => {
  const loginPage = new LoginPage(page);

  // Base URL comes from playwright.config.ts
  await page.goto("");

  // Username & Password from .env
  await loginPage.login(ENV.username, ENV.password);
});
