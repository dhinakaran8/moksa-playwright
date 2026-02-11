import { Page, Locator } from "@playwright/test";
import { logStep } from "../loggers/logger";

export async function click(page: Page, locator: string, name: string) {
  logStep("Clicking", name);
  await page.click(locator);
}

export async function fill(
  page: Page,
  locator: string,
  value: string,
  name: string,
) {
  logStep("Filling", name);
  await page.fill(locator, value);
}
