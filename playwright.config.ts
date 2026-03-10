import { defineConfig } from "@playwright/test";
import { ENV } from "./config/env";

export default defineConfig({
  testDir: "./tests",
  retries: 1,
  use: {
    baseURL: ENV.baseURL,
    headless: true,
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    viewport: { width: 1536, height: 703 },
  },
});
