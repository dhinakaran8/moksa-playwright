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
    await page.locator("//input[@type='search']").fill("9500730392");

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

  test("Weekly Twice Weight Entry with 0.50 Decrease", async ({ page }) => {
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

    // Search customer using phone number
    await page.locator("//input[@type='search']").fill("9591198000");

    // Wait for search results to load after entering phone number
    await new Promise((f) => setTimeout(f, 2 * 1000));

    // Click Edit on the matching customer row
    await page.locator("//a[@title='Edit']").click();

    // Click Weight History tab
    await page.locator("//button[@id='weight-tab']").click();

    // Calculate date range for weekly twice entries
    const currentDate = new Date("2026-02-15");
    const startDate = new Date("2026-01-01");

    // Weight progression configuration - 0.50 decrease per entry
    const startWeight = 80;
    const minWeight = 60;
    const weightIncrement = -0.5;

    let currentWeight = startWeight;
    let recordsCreated = 0;
    const maxRecords = 100; // Limit records for testing

    // Generate weight records twice per week (every 3-4 days)
    // Days: Monday and Thursday pattern (3 days gap, then 4 days gap)
    let dayCounter = 0;
    for (
      let date = new Date(startDate);
      date <= currentDate && recordsCreated < maxRecords;
      date.setDate(date.getDate() + 1)
    ) {
      dayCounter++;

      // Create entry on day 1, 4, 8, 11, 15, 18... (twice per week pattern)
      // This creates entries every 3 days, then 4 days (Monday/Thursday pattern)
      const dayOfWeek = date.getDay();
      const isEntryDay = dayOfWeek === 1 || dayOfWeek === 4; // Monday (1) or Thursday (4)

      if (!isEntryDay) {
        continue;
      }

      const dateString = date.toISOString().split("T")[0]; // YYYY-MM-DD format

      console.log(
        `Creating weekly weight record for ${dateString} → ${currentWeight.toFixed(2)} kg`,
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

      // Fill Notes: "Weekly twice weight entry for testing"
      await page
        .locator("#weightNotes")
        .fill("Weekly twice weight entry for testing");

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

      // Decrement weight by 0.50
      currentWeight += weightIncrement;

      // Ensure weight doesn't go below minimum
      if (currentWeight < minWeight) {
        currentWeight = minWeight;
      }

      recordsCreated++;

      // Log progress every 10 records
      if (recordsCreated % 10 === 0) {
        console.log(`Progress: ${recordsCreated} records created`);
      }

      // Wait briefly for Livewire stabilization
      await new Promise((f) => setTimeout(f, 500));
    }

    console.log(
      `✅ Weekly twice weight data entry completed! Created ${recordsCreated} weight records`,
    );
    console.log(
      `📊 Weight progression: ${startWeight}kg → ${currentWeight.toFixed(2)}kg`,
    );

    // Verify final state - Weight History tab should still be selected
    await expect(page.locator("//button[@id='weight-tab']")).toBeVisible();

    // Check that weight records are displayed in the table
    await expect(
      page
        .locator(
          "//*[contains(text(), 'Weekly twice weight entry for testing')]",
        )
        .first(),
    ).toBeVisible({ timeout: 10000 });
  });

  test("Weekly Once Weight Entry with 1.0 kg Decrease", async ({ page }) => {
    test.setTimeout(300000);
    await page.goto("https://dev-portal.moksafitness.com");
    await page.locator("//input[@id='email'] ").fill("suregshi.cr@gmail.com");
    await page.locator("//input[@id='password']").fill("123456");
    await page.locator("//button[@type='submit']").click();
    await page
      .waitForSelector("//div[contains(@class, 'preloader')]", {
        state: "hidden",
        timeout: 30000,
      })
      .catch(() => {});
    await page
      .locator("//a[@href='https://dev-portal.moksafitness.com/customer']")
      .click();
    await page
      .waitForSelector("//div[contains(@class, 'preloader')]", {
        state: "hidden",
        timeout: 30000,
      })
      .catch(() => {});
    await page.locator("//input[@type='search']").fill("1108911056");
    await new Promise((f) => setTimeout(f, 2000));
    await page.locator("//a[@title='Edit']").click();
    await page.locator("//button[@id='weight-tab']").click();

    const currentDate = new Date("2026-02-15");
    const startDate = new Date("2026-01-01");
    const startWeight = 80;
    const minWeight = 60;
    const weightIncrement = -1.0; // 1 kg decrease per week

    let currentWeight = startWeight;
    let recordsCreated = 0;
    const maxRecords = 100;

    // Weekly once - every Monday
    for (
      let date = new Date(startDate);
      date <= currentDate && recordsCreated < maxRecords;
      date.setDate(date.getDate() + 1)
    ) {
      if (date.getDay() !== 1) continue; // Only Monday

      const dateString = date.toISOString().split("T")[0];
      console.log(
        `Creating weekly once record for ${dateString} → ${currentWeight.toFixed(2)} kg`,
      );

      await page
        .waitForSelector(
          "//div[@id='weightModal' and contains(@class, 'show')]",
          { state: "hidden", timeout: 5000 },
        )
        .catch(() => {});
      await page.locator("//button[contains(., 'Add Weight Record')]").click();
      await page.waitForSelector(
        "//div[@id='weightModal' and contains(@class, 'show')]",
        { state: "visible", timeout: 10000 },
      );
      await page.locator("//input[@id='weightDate']").fill(dateString);
      await page
        .locator("//input[@id='weightValue']")
        .fill(currentWeight.toFixed(2));

      const fileChooserPromise = page.waitForEvent("filechooser");
      await page
        .locator(
          "//input[@id='weightAttachment'] | //button[@id='weightAttachment']",
        )
        .click();
      const fileChooser = await fileChooserPromise;
      await fileChooser.setFiles([
        "c:\\Users\\sumanas\\Documents\\Dhinakaran\\moksa-playwright\\Images\\8.jpg",
      ]);
      await new Promise((f) => setTimeout(f, 3000));

      const errorMessage = page.locator(
        "//*[contains(text(), 'Attachment is required')]",
      );
      if (await errorMessage.isVisible()) {
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

      await page
        .locator("#weightNotes")
        .fill("Weekly once weight entry - 1kg decrease");
      await page
        .locator("//div[@id='weightModal']//button[contains(., 'Save')]")
        .click();
      await new Promise((f) => setTimeout(f, 3000));

      try {
        const okButton = page.locator("//button[contains(., 'OK')]");
        if (await okButton.isVisible({ timeout: 5000 })) {
          await okButton.click();
          console.log(`✅ Record ${recordsCreated + 1} saved successfully`);
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

      const modalVisible = await page
        .locator("//div[@id='weightModal' and contains(@class, 'show')]")
        .isVisible()
        .catch(() => false);
      if (modalVisible) {
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

      await page
        .locator("//button[contains(., 'Add Weight Record')]")
        .waitFor({ state: "visible", timeout: 10000 });
      currentWeight += weightIncrement;
      if (currentWeight < minWeight) currentWeight = minWeight;
      recordsCreated++;
      await new Promise((f) => setTimeout(f, 500));
    }

    console.log(
      `✅ Weekly once weight entry completed! Created ${recordsCreated} records`,
    );
    console.log(
      `📊 Weight progression: ${startWeight}kg → ${currentWeight.toFixed(2)}kg`,
    );
    await expect(page.locator("//button[@id='weight-tab']")).toBeVisible();
  });

  test("Weekly Thrice Weight Entry with 0.3 kg Decrease (Mon/Wed/Fri)", async ({
    page,
  }) => {
    test.setTimeout(300000);
    await page.goto("https://portal.moksafitness.com/");
    await page.locator("//input[@id='email'] ").fill("suregshi.cr@gmail.com");
    await page.locator("//input[@id='password']").fill("123456");
    await page.locator("//button[@type='submit']").click();
    await page
      .waitForSelector("//div[contains(@class, 'preloader')]", {
        state: "hidden",
        timeout: 30000,
      })
      .catch(() => {});
    await page
      .locator("//a[@href='https://portal.moksafitness.com/customer']")
      .click();
    await page
      .waitForSelector("//div[contains(@class, 'preloader')]", {
        state: "hidden",
        timeout: 30000,
      })
      .catch(() => {});
    await page.locator("//input[@type='search']").fill("9444954210");
    await new Promise((f) => setTimeout(f, 2000));
    await page.locator("//a[@title='Edit']").click();
    await page.locator("//button[@id='weight-tab']").click();

    const currentDate = new Date("2026-02-15");
    const startDate = new Date("2026-01-01");
    const startWeight = 80;
    const minWeight = 60;
    const weightIncrement = -0.3; // 0.3 kg decrease per entry

    let currentWeight = startWeight;
    let recordsCreated = 0;
    const maxRecords = 100;

    // Weekly thrice - Monday (1), Wednesday (3), Friday (5)
    for (
      let date = new Date(startDate);
      date <= currentDate && recordsCreated < maxRecords;
      date.setDate(date.getDate() + 1)
    ) {
      const dayOfWeek = date.getDay();
      if (dayOfWeek !== 1 && dayOfWeek !== 3 && dayOfWeek !== 5) continue;

      const dateString = date.toISOString().split("T")[0];
      console.log(
        `Creating weekly thrice record for ${dateString} → ${currentWeight.toFixed(2)} kg`,
      );

      await page
        .waitForSelector(
          "//div[@id='weightModal' and contains(@class, 'show')]",
          { state: "hidden", timeout: 5000 },
        )
        .catch(() => {});
      await page.locator("//button[contains(., 'Add Weight Record')]").click();
      await page.waitForSelector(
        "//div[@id='weightModal' and contains(@class, 'show')]",
        { state: "visible", timeout: 10000 },
      );
      await page.locator("//input[@id='weightDate']").fill(dateString);
      await page
        .locator("//input[@id='weightValue']")
        .fill(currentWeight.toFixed(2));

      const fileChooserPromise = page.waitForEvent("filechooser");
      await page
        .locator(
          "//input[@id='weightAttachment'] | //button[@id='weightAttachment']",
        )
        .click();
      const fileChooser = await fileChooserPromise;
      await fileChooser.setFiles([
        "c:\\Users\\sumanas\\Documents\\Dhinakaran\\moksa-playwright\\Images\\8.jpg",
      ]);
      await new Promise((f) => setTimeout(f, 3000));

      const errorMessage = page.locator(
        "//*[contains(text(), 'Attachment is required')]",
      );
      if (await errorMessage.isVisible()) {
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

      await page
        .locator("#weightNotes")
        .fill("Weekly thrice weight entry - 0.3kg decrease");
      await page
        .locator("//div[@id='weightModal']//button[contains(., 'Save')]")
        .click();
      await new Promise((f) => setTimeout(f, 3000));

      try {
        const okButton = page.locator("//button[contains(., 'OK')]");
        if (await okButton.isVisible({ timeout: 5000 })) {
          await okButton.click();
          console.log(`✅ Record ${recordsCreated + 1} saved successfully`);
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

      const modalVisible = await page
        .locator("//div[@id='weightModal' and contains(@class, 'show')]")
        .isVisible()
        .catch(() => false);
      if (modalVisible) {
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

      await page
        .locator("//button[contains(., 'Add Weight Record')]")
        .waitFor({ state: "visible", timeout: 10000 });
      currentWeight += weightIncrement;
      if (currentWeight < minWeight) currentWeight = minWeight;
      recordsCreated++;
      await new Promise((f) => setTimeout(f, 500));
    }

    console.log(
      `✅ Weekly thrice weight entry completed! Created ${recordsCreated} records`,
    );
    console.log(
      `📊 Weight progression: ${startWeight}kg → ${currentWeight.toFixed(2)}kg`,
    );
    await expect(page.locator("//button[@id='weight-tab']")).toBeVisible();
  });

  test.only("Monthly Weight Entry with 2.0 kg Decrease", async ({ page }) => {
    test.setTimeout(300000);
    await page.goto("https://portal.moksafitness.com");
    await page.locator("//input[@id='email'] ").fill("suregshi.cr@gmail.com");
    await page.locator("//input[@id='password']").fill("123456");
    await page.locator("//button[@type='submit']").click();
    await page
      .waitForSelector("//div[contains(@class, 'preloader')]", {
        state: "hidden",
        timeout: 30000,
      })
      .catch(() => {});
    await page
      .locator("//a[@href='https://portal.moksafitness.com/customer']")
      .click();
    await page
      .waitForSelector("//div[contains(@class, 'preloader')]", {
        state: "hidden",
        timeout: 30000,
      })
      .catch(() => {});
    await page.locator("//input[@type='search']").fill("7708911056");
    await new Promise((f) => setTimeout(f, 2000));
    await page.locator("//a[@title='Edit']").click();
    await page.locator("//button[@id='weight-tab']").click();

    const startWeight = 80;
    const minWeight = 60;
    const weightIncrement = -2.0; // 2 kg decrease per month

    let currentWeight = startWeight;
    let recordsCreated = 0;

    // Monthly entries - 1st of each month
    const monthlyDates = [
      "2025-01-01",
      "2025-02-01",
      "2025-03-01",
      "2025-04-01",
      "2025-05-01",
      "2025-06-01",
      "2025-07-01",
      "2025-08-01",
      "2025-09-01",
      "2025-10-01",
      "2025-11-01",
      "2025-12-01",
      "2026-01-01",
      "2026-02-01",
    ];

    for (const dateString of monthlyDates) {
      console.log(
        `Creating monthly record for ${dateString} → ${currentWeight.toFixed(2)} kg`,
      );

      await page
        .waitForSelector(
          "//div[@id='weightModal' and contains(@class, 'show')]",
          { state: "hidden", timeout: 5000 },
        )
        .catch(() => {});
      await page.locator("//button[contains(., 'Add Weight Record')]").click();
      await page.waitForSelector(
        "//div[@id='weightModal' and contains(@class, 'show')]",
        { state: "visible", timeout: 10000 },
      );
      await page.locator("//input[@id='weightDate']").fill(dateString);
      await page
        .locator("//input[@id='weightValue']")
        .fill(currentWeight.toFixed(2));

      const fileChooserPromise = page.waitForEvent("filechooser");
      await page
        .locator(
          "//input[@id='weightAttachment'] | //button[@id='weightAttachment']",
        )
        .click();
      const fileChooser = await fileChooserPromise;
      await fileChooser.setFiles([
        "c:\\Users\\sumanas\\Documents\\Dhinakaran\\moksa-playwright\\Images\\8.jpg",
      ]);
      await new Promise((f) => setTimeout(f, 3000));

      const errorMessage = page.locator(
        "//*[contains(text(), 'Attachment is required')]",
      );
      if (await errorMessage.isVisible()) {
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

      await page
        .locator("#weightNotes")
        .fill("Monthly weight entry - 2kg decrease");
      await page
        .locator("//div[@id='weightModal']//button[contains(., 'Save')]")
        .click();
      await new Promise((f) => setTimeout(f, 3000));

      try {
        const okButton = page.locator("//button[contains(., 'OK')]");
        if (await okButton.isVisible({ timeout: 5000 })) {
          await okButton.click();
          console.log(`✅ Record ${recordsCreated + 1} saved successfully`);
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

      const modalVisible = await page
        .locator("//div[@id='weightModal' and contains(@class, 'show')]")
        .isVisible()
        .catch(() => false);
      if (modalVisible) {
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

      await page
        .locator("//button[contains(., 'Add Weight Record')]")
        .waitFor({ state: "visible", timeout: 10000 });
      currentWeight += weightIncrement;
      if (currentWeight < minWeight) currentWeight = minWeight;
      recordsCreated++;
      await new Promise((f) => setTimeout(f, 500));
    }

    console.log(
      `✅ Monthly weight entry completed! Created ${recordsCreated} records`,
    );
    console.log(
      `📊 Weight progression: ${startWeight}kg → ${currentWeight.toFixed(2)}kg`,
    );
    await expect(page.locator("//button[@id='weight-tab']")).toBeVisible();
  });

  test("Weight Gain Entry with 0.5 kg Increase (Twice Weekly)", async ({
    page,
  }) => {
    test.setTimeout(300000);
    await page.goto("https://dev-portal.moksafitness.com");
    await page.locator("//input[@id='email'] ").fill("suregshi.cr@gmail.com");
    await page.locator("//input[@id='password']").fill("123456");
    await page.locator("//button[@type='submit']").click();
    await page
      .waitForSelector("//div[contains(@class, 'preloader')]", {
        state: "hidden",
        timeout: 30000,
      })
      .catch(() => {});
    await page
      .locator("//a[@href='https://dev-portal.moksafitness.com/customer']")
      .click();
    await page
      .waitForSelector("//div[contains(@class, 'preloader')]", {
        state: "hidden",
        timeout: 30000,
      })
      .catch(() => {});
    await page.locator("//input[@type='search']").fill("9500730392");
    await new Promise((f) => setTimeout(f, 2000));
    await page.locator("//a[@title='Edit']").click();
    await page.locator("//button[@id='weight-tab']").click();

    const currentDate = new Date("2026-02-15");
    const startDate = new Date("2026-01-01");
    const startWeight = 55; // Starting underweight
    const maxWeight = 70; // Target weight
    const weightIncrement = 0.5; // 0.5 kg increase per entry

    let currentWeight = startWeight;
    let recordsCreated = 0;
    const maxRecords = 100;

    // Twice weekly - Tuesday (2) and Saturday (6)
    for (
      let date = new Date(startDate);
      date <= currentDate && recordsCreated < maxRecords;
      date.setDate(date.getDate() + 1)
    ) {
      const dayOfWeek = date.getDay();
      if (dayOfWeek !== 2 && dayOfWeek !== 6) continue;

      const dateString = date.toISOString().split("T")[0];
      console.log(
        `Creating weight gain record for ${dateString} → ${currentWeight.toFixed(2)} kg`,
      );

      await page
        .waitForSelector(
          "//div[@id='weightModal' and contains(@class, 'show')]",
          { state: "hidden", timeout: 5000 },
        )
        .catch(() => {});
      await page.locator("//button[contains(., 'Add Weight Record')]").click();
      await page.waitForSelector(
        "//div[@id='weightModal' and contains(@class, 'show')]",
        { state: "visible", timeout: 10000 },
      );
      await page.locator("//input[@id='weightDate']").fill(dateString);
      await page
        .locator("//input[@id='weightValue']")
        .fill(currentWeight.toFixed(2));

      const fileChooserPromise = page.waitForEvent("filechooser");
      await page
        .locator(
          "//input[@id='weightAttachment'] | //button[@id='weightAttachment']",
        )
        .click();
      const fileChooser = await fileChooserPromise;
      await fileChooser.setFiles([
        "c:\\Users\\sumanas\\Documents\\Dhinakaran\\moksa-playwright\\Images\\8.jpg",
      ]);
      await new Promise((f) => setTimeout(f, 3000));

      const errorMessage = page.locator(
        "//*[contains(text(), 'Attachment is required')]",
      );
      if (await errorMessage.isVisible()) {
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

      await page
        .locator("#weightNotes")
        .fill("Weight gain entry - 0.5kg increase");
      await page
        .locator("//div[@id='weightModal']//button[contains(., 'Save')]")
        .click();
      await new Promise((f) => setTimeout(f, 3000));

      try {
        const okButton = page.locator("//button[contains(., 'OK')]");
        if (await okButton.isVisible({ timeout: 5000 })) {
          await okButton.click();
          console.log(`✅ Record ${recordsCreated + 1} saved successfully`);
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

      const modalVisible = await page
        .locator("//div[@id='weightModal' and contains(@class, 'show')]")
        .isVisible()
        .catch(() => false);
      if (modalVisible) {
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

      await page
        .locator("//button[contains(., 'Add Weight Record')]")
        .waitFor({ state: "visible", timeout: 10000 });
      currentWeight += weightIncrement;
      if (currentWeight > maxWeight) currentWeight = maxWeight;
      recordsCreated++;
      await new Promise((f) => setTimeout(f, 500));
    }

    console.log(
      `✅ Weight gain entry completed! Created ${recordsCreated} records`,
    );
    console.log(
      `📊 Weight progression: ${startWeight}kg → ${currentWeight.toFixed(2)}kg`,
    );
    await expect(page.locator("//button[@id='weight-tab']")).toBeVisible();
  });

  test("Weight Fluctuation Entry (Realistic Pattern)", async ({ page }) => {
    test.setTimeout(300000);
    await page.goto("https://dev-portal.moksafitness.com");
    await page.locator("//input[@id='email'] ").fill("suregshi.cr@gmail.com");
    await page.locator("//input[@id='password']").fill("123456");
    await page.locator("//button[@type='submit']").click();
    await page
      .waitForSelector("//div[contains(@class, 'preloader')]", {
        state: "hidden",
        timeout: 30000,
      })
      .catch(() => {});
    await page
      .locator("//a[@href='https://dev-portal.moksafitness.com/customer']")
      .click();
    await page
      .waitForSelector("//div[contains(@class, 'preloader')]", {
        state: "hidden",
        timeout: 30000,
      })
      .catch(() => {});
    await page.locator("//input[@type='search']").fill("9500730392");
    await new Promise((f) => setTimeout(f, 2000));
    await page.locator("//a[@title='Edit']").click();
    await page.locator("//button[@id='weight-tab']").click();

    const currentDate = new Date("2026-02-15");
    const startDate = new Date("2026-01-01");
    const baseWeight = 75;

    // Realistic fluctuation pattern (overall trend: slight decrease)
    const fluctuations = [
      0, -0.2, 0.3, -0.1, -0.4, 0.2, -0.3, 0.1, -0.5, 0.2, -0.3, -0.2, 0.4,
      -0.1, -0.3, 0.1, -0.4, 0.2, -0.2, -0.3,
    ];

    let currentWeight = baseWeight;
    let recordsCreated = 0;
    const maxRecords = 100;
    let fluctuationIndex = 0;

    // Alternate days pattern
    for (
      let date = new Date(startDate);
      date <= currentDate && recordsCreated < maxRecords;
      date.setDate(date.getDate() + 2)
    ) {
      // Apply fluctuation
      const fluctuation = fluctuations[fluctuationIndex % fluctuations.length];
      currentWeight = baseWeight + fluctuation - recordsCreated * 0.1; // Slight overall decrease trend
      fluctuationIndex++;

      const dateString = date.toISOString().split("T")[0];
      console.log(
        `Creating fluctuation record for ${dateString} → ${currentWeight.toFixed(2)} kg`,
      );

      await page
        .waitForSelector(
          "//div[@id='weightModal' and contains(@class, 'show')]",
          { state: "hidden", timeout: 5000 },
        )
        .catch(() => {});
      await page.locator("//button[contains(., 'Add Weight Record')]").click();
      await page.waitForSelector(
        "//div[@id='weightModal' and contains(@class, 'show')]",
        { state: "visible", timeout: 10000 },
      );
      await page.locator("//input[@id='weightDate']").fill(dateString);
      await page
        .locator("//input[@id='weightValue']")
        .fill(currentWeight.toFixed(2));

      const fileChooserPromise = page.waitForEvent("filechooser");
      await page
        .locator(
          "//input[@id='weightAttachment'] | //button[@id='weightAttachment']",
        )
        .click();
      const fileChooser = await fileChooserPromise;
      await fileChooser.setFiles([
        "c:\\Users\\sumanas\\Documents\\Dhinakaran\\moksa-playwright\\Images\\8.jpg",
      ]);
      await new Promise((f) => setTimeout(f, 3000));

      const errorMessage = page.locator(
        "//*[contains(text(), 'Attachment is required')]",
      );
      if (await errorMessage.isVisible()) {
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

      await page
        .locator("#weightNotes")
        .fill("Realistic weight fluctuation entry");
      await page
        .locator("//div[@id='weightModal']//button[contains(., 'Save')]")
        .click();
      await new Promise((f) => setTimeout(f, 3000));

      try {
        const okButton = page.locator("//button[contains(., 'OK')]");
        if (await okButton.isVisible({ timeout: 5000 })) {
          await okButton.click();
          console.log(`✅ Record ${recordsCreated + 1} saved successfully`);
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

      const modalVisible = await page
        .locator("//div[@id='weightModal' and contains(@class, 'show')]")
        .isVisible()
        .catch(() => false);
      if (modalVisible) {
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

      await page
        .locator("//button[contains(., 'Add Weight Record')]")
        .waitFor({ state: "visible", timeout: 10000 });
      recordsCreated++;
      await new Promise((f) => setTimeout(f, 500));
    }

    console.log(
      `✅ Fluctuation weight entry completed! Created ${recordsCreated} records`,
    );
    console.log(
      `📊 Weight: Started at ${baseWeight}kg with realistic fluctuations`,
    );
    await expect(page.locator("//button[@id='weight-tab']")).toBeVisible();
  });

  test("Custom Weight Entry - Oct-Nov 2025 Data", async ({ page }) => {
    test.setTimeout(300000);
    await page.goto("https://dev-portal.moksafitness.com");
    await page.locator("//input[@id='email'] ").fill("suregshi.cr@gmail.com");
    await page.locator("//input[@id='password']").fill("123456");
    await page.locator("//button[@type='submit']").click();
    await page
      .waitForSelector("//div[contains(@class, 'preloader')]", {
        state: "hidden",
        timeout: 30000,
      })
      .catch(() => {});
    await page
      .locator("//a[@href='https://dev-portal.moksafitness.com/customer']")
      .click();
    await page
      .waitForSelector("//div[contains(@class, 'preloader')]", {
        state: "hidden",
        timeout: 30000,
      })
      .catch(() => {});
    await page.locator("//input[@type='search']").fill("9677046812");
    await new Promise((f) => setTimeout(f, 2000));
    await page.locator("//a[@title='Edit']").click();
    await page.locator("//button[@id='weight-tab']").click();

    // Specific weight data for Oct 28 - Nov 7, 2025
    const weightData = [
      { date: "2025-03-01", weight: 60 },
      { date: "2025-03-08", weight: 62 },
      { date: "2025-03-15", weight: 59 },
      { date: "2025-03-22", weight: 75 },
      // { date: "2025-11-01", weight: 68 },
      // { date: "2025-11-02", weight: 56 },
      // { date: "2025-11-03", weight: 72 },
      // { date: "2025-11-04", weight: 64 },
      // { date: "2025-11-05", weight: 74 },
      // { date: "2025-11-06", weight: 60 },
      // { date: "2025-11-07", weight: 68 },
    ];

    let recordsCreated = 0;

    for (const entry of weightData) {
      console.log(
        `Creating weight record for ${entry.date} → ${entry.weight} kg`,
      );

      await page
        .waitForSelector(
          "//div[@id='weightModal' and contains(@class, 'show')]",
          { state: "hidden", timeout: 5000 },
        )
        .catch(() => {});
      await page.locator("//button[contains(., 'Add Weight Record')]").click();
      await page.waitForSelector(
        "//div[@id='weightModal' and contains(@class, 'show')]",
        { state: "visible", timeout: 10000 },
      );
      await page.locator("//input[@id='weightDate']").fill(entry.date);
      await page
        .locator("//input[@id='weightValue']")
        .fill(entry.weight.toString());

      const fileChooserPromise = page.waitForEvent("filechooser");
      await page
        .locator(
          "//input[@id='weightAttachment'] | //button[@id='weightAttachment']",
        )
        .click();
      const fileChooser = await fileChooserPromise;
      await fileChooser.setFiles([
        "c:\\Users\\sumanas\\Documents\\Dhinakaran\\moksa-playwright\\Images\\8.jpg",
      ]);
      await new Promise((f) => setTimeout(f, 3000));

      const errorMessage = page.locator(
        "//*[contains(text(), 'Attachment is required')]",
      );
      if (await errorMessage.isVisible()) {
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

      await page
        .locator("#weightNotes")
        .fill("Custom weight entry - Oct-Nov 2025");
      await page
        .locator("//div[@id='weightModal']//button[contains(., 'Save')]")
        .click();
      await new Promise((f) => setTimeout(f, 3000));

      try {
        const okButton = page.locator("//button[contains(., 'OK')]");
        if (await okButton.isVisible({ timeout: 5000 })) {
          await okButton.click();
          console.log(`✅ Record ${recordsCreated + 1} saved successfully`);
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

      const modalVisible = await page
        .locator("//div[@id='weightModal' and contains(@class, 'show')]")
        .isVisible()
        .catch(() => false);
      if (modalVisible) {
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

      await page
        .locator("//button[contains(., 'Add Weight Record')]")
        .waitFor({ state: "visible", timeout: 10000 });
      recordsCreated++;
      await new Promise((f) => setTimeout(f, 500));
    }

    console.log(
      `✅ Custom weight entry completed! Created ${recordsCreated} records`,
    );
    console.log(`📊 Weight data: Oct 28 - Nov 7, 2025 (11 entries)`);
    await expect(page.locator("//button[@id='weight-tab']")).toBeVisible();
  });
});
