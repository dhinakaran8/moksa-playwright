import { test, expect } from "@playwright/test";

test("OTP API", async ({ page }) => {
  await page.goto("https://www.moksafitness.com/customers/login");

  const responsePromise = page.waitForResponse((res) =>
    res.url().includes("/customers/send-otp"),
  );

  await page.fill("#mobile", "7708911056");
  await page.click("#send-otp-button");

  const response = await responsePromise;

  const body = await response.json();
  console.log(body);
});
