// spec: Customer Weight Management - Comprehensive Test Plan
// seed: tests/seed.spec.ts

import { test, expect } from "@playwright/test";

test.describe("Customer Weight Management", () => {
  test("Bulk Weight Data Entry for Customer", async ({ page }) => {
    test.setTimeout(300000); // 5 minutes timeout for bulk operations
    // Navigate to BASE_URL for login
    await page.goto("https://dev-portal.moksafitness.com");

    // Enter email for login
    await page.locator("//input[@id='email'] ").fill("suregshi.cr@gmail.com");

    // Enter password for login
    await page.locator("//input[@id='password']").fill("123456");

    // Click Sign In button to login
    await page.locator("//button[@type='submit']").click();

    // Wait for preloader to disappear before continuing
    await page
      .waitForSelector("//div[contains(@class, 'preloader')]", {
        state: "hidden",
        timeout: 30000,
      })
      .catch(() => {});

    // Go to Customers section
    await page
      .locator("//a[@href='https://dev-portal.moksafitness.com/customer']")
      .click();

    // Wait for preloader to disappear after navigation
    await page
      .waitForSelector("//div[contains(@class, 'preloader')]", {
        state: "hidden",
        timeout: 30000,
      })
      .catch(() => {});

    // Search customer using phone number 7708911056
    // Create multiple weight records with progressive tracking
    await page.locator("//input[@type='search']").fill("7397788113");

    // Wait for search results to load after entering phone number
    await new Promise((f) => setTimeout(f, 2 * 1000));

    // Click Edit on the matching customer row
    await page.locator("//a[@title='Edit']").click();

    // Click Weight History tab
    await page.locator("//button[@id='weight-tab']").click();

    // Calculate date range: 3 years back from today to current date
    const currentDate = new Date("2026-02-15");
    const startDate = new Date("2026-01-01");

    // Weight progression configuration
    const startWeight = 80;
    const minWeight = 60;
    const weightIncrement = -0.2;

    let currentWeight = startWeight;
    let recordsCreated = 0;
    const maxRecords = 100; // Limit to 10 records for testing to prevent browser timeout

    // Generate daily weight records
    for (
      let date = new Date(startDate);
      date <= currentDate && recordsCreated < maxRecords;
      date.setDate(date.getDate() + 1)
    ) {
      const dateString = date.toISOString().split("T")[0]; // YYYY-MM-DD format

      console.log(
        `Creating weight record for ${dateString} → ${currentWeight.toFixed(2)} kg`,
      );

      // Wait for any existing modal to close before proceeding
      await page
        .waitForSelector(
          "//div[@id='weightModal' and contains(@class, 'show')]",
          { state: "hidden", timeout: 5000 },
        )
        .catch(() => {});

      // Click Add Weight Record button
      await page.locator("//button[contains(., 'Add Weight Record')]").click();

      // Wait for modal to appear and be ready
      await page.waitForSelector(
        "//div[@id='weightModal' and contains(@class, 'show')]",
        { state: "visible", timeout: 10000 },
      );

      // Fill Date field with loop date
      await page.locator("//input[@id='weightDate']").fill(dateString);

      // Fill Weight field with calculated weight
      await page
        .locator("//input[@id='weightValue']")
        .fill(currentWeight.toFixed(2));

      // Set up file chooser listener BEFORE clicking the button
      const fileChooserPromise = page.waitForEvent("filechooser");

      // Click Attachment button to open file chooser
      await page
        .locator(
          "//input[@id='weightAttachment'] | //button[@id='weightAttachment']",
        )
        .click();

      // Handle the file chooser
      const fileChooser = await fileChooserPromise;
      await fileChooser.setFiles([
        "c:\\Users\\sumanas\\Documents\\Dhinakaran\\moksa-playwright\\Images\\8.jpg",
      ]);

      // Wait for Livewire to process the file upload
      await new Promise((f) => setTimeout(f, 3000));

      // Verify the error message is gone (if it was there)
      const errorMessage = page.locator(
        "//*[contains(text(), 'Attachment is required')]",
      );
      if (await errorMessage.isVisible()) {
        console.log("⚠️  File upload validation error detected, retrying...");
        // Retry file upload
        await page
          .locator(
            "//input[@id='weightAttachment'] | //button[@id='weightAttachment']",
          )
          .click();
        const fileChooser2 = await page.waitForEvent("filechooser");
        await fileChooser2.setFiles([
          "c:\\Users\\sumanas\\Documents\\Dhinakaran\\moksa-playwright\\Images\\8.jpg",
        ]);
        await new Promise((f) => setTimeout(f, 3000));
      }

      // Fill Notes: "Auto weight entry for testing"
      await page.locator("#weightNotes").fill("Auto weight entry for testing");

      // Click Save button inside the weight modal
      await page
        .locator("//div[@id='weightModal']//button[contains(., 'Save')]")
        .click();

      // Wait for save operation to complete
      await new Promise((f) => setTimeout(f, 3 * 1000));

      // Handle success dialog (may or may not appear)
      try {
        const okButton = page.locator("//button[contains(., 'OK')]");
        if (await okButton.isVisible({ timeout: 5000 })) {
          await okButton.click();
          console.log(`✅ Record ${recordsCreated + 1} saved successfully`);
          // Wait for SweetAlert dialog to fully close
          await page
            .waitForSelector(".swal2-container", {
              state: "hidden",
              timeout: 5000,
            })
            .catch(() => {});
          await new Promise((f) => setTimeout(f, 1000));
        }
      } catch (error) {
        console.log(`⚠️ Success dialog not found, continuing...`);
      }

      // Ensure weight modal is closed before next iteration
      const modalVisible = await page
        .locator("//div[@id='weightModal' and contains(@class, 'show')]")
        .isVisible()
        .catch(() => false);
      if (modalVisible) {
        // If modal is still visible, try clicking Close button inside the modal
        await page
          .locator("//div[@id='weightModal']//button[contains(., 'Close')]")
          .click()
          .catch(() => {});
        await page
          .waitForSelector(
            "//div[@id='weightModal' and contains(@class, 'show')]",
            { state: "hidden", timeout: 10000 },
          )
          .catch(() => {});
      }

      // Wait for page to stabilize and Add Weight Record button to be clickable
      await page
        .locator("//button[contains(., 'Add Weight Record')]")
        .waitFor({ state: "visible", timeout: 10000 });

      // Decrement weight gradually
      currentWeight += weightIncrement;

      // Ensure weight doesn't go below minimum
      if (currentWeight < minWeight) {
        currentWeight = minWeight;
      }

      recordsCreated++;

      // Log progress every 100 records
      if (recordsCreated % 100 === 0) {
        console.log(`Progress: ${recordsCreated} records created`);
      }

      // Wait briefly for Livewire stabilization
      await new Promise((f) => setTimeout(f, 500));
    }

    console.log(
      `✅ Bulk weight data entry completed! Created ${recordsCreated} daily weight records`,
    );
    console.log(
      `📊 Weight progression: ${startWeight}kg → ${currentWeight.toFixed(2)}kg`,
    );

    // Verify final state - Weight History tab should still be selected
    await expect(page.locator("//button[@id='weight-tab']")).toBeVisible();

    // Check that weight records are displayed in the table (at least one entry with our notes)
    await expect(
      page
        .locator("//*[contains(text(), 'Auto weight entry for testing')]")
        .first(),
    ).toBeVisible({ timeout: 10000 });
  });
});
