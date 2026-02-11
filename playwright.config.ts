import { defineConfig } from "@playwright/test";
import { ENV } from "./config/env";

export default defineConfig({
  testDir: "./tests",
  use: {
    baseURL: ENV.baseURL,
    headless: false,
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },
});
