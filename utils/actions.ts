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

export async function waitForElement(
  page: Page,
  locator: string,
  name: string,
  timeout: number = 30000
) {
  logStep("Waiting for element", name);
  await page.waitForSelector(locator, { timeout });
}

export async function isVisible(page: Page, locator: string, name: string): Promise<boolean> {
  logStep("Checking visibility", name);
  return await page.isVisible(locator);
}

export async function getText(page: Page, locator: string, name: string): Promise<string> {
  logStep("Getting text", name);
  const text = await page.textContent(locator);
  return text || '';
}