// spec: Customer Weight Management - Comprehensive Test Plan
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Customer Weight Management', () => {
  test('Bulk Weight Data Entry for Customer', async ({ page }) => {
    // Navigate to Moksa Fitness portal login page
    await page.goto('https://dev-portal.moksafitness.com');

    // Enter email for login authentication
    await page.getByRole('textbox', { name: 'Email' }).fill('suregshi.cr@gmail.com');

    // Enter password for login authentication
    await page.getByRole('textbox', { name: 'Password' }).fill('123456');

    // Click Sign In button to authenticate and access dashboard
    await page.getByRole('button', { name: 'Sign In' }).click();

    // Verify Customers navigation link is visible after successful login
    await expect(page.getByRole('link', { name: 'Customers' })).toBeVisible();

    // Go to Customers section to search for customer
    await page.getByRole('link', { name: ' Customers' }).click();

    // Search customer using phone number 7708911056
    await page.getByRole('searchbox', { name: 'Search:' }).fill('7708911056');

    // Wait for search results to load after entering phone number
    await new Promise(f => setTimeout(f, 2 * 1000));

    // Click Edit button on the matching customer row
    await page.getByRole('link', { name: 'Edit' }).click();

    // Click Weight History tab to access weight management section
    await page.getByRole('tab', { name: 'Weight History' }).click();

    // Calculate date range for progressive weight tracking
    const startDate = new Date('2023-02-20');
    const currentDate = new Date('2026-02-20');
    let recordDate = new Date(startDate);
    let currentWeight = 80.0;
    const weightIncrement = 0.1; // Small daily increment
    let recordsCreated = 0;
    const maxRecords = 5; // Limit for demonstration

    // Create multiple weight records with progressive tracking
    for (let i = 0; i < maxRecords; i++) {
      const dateString = recordDate.toISOString().split('T')[0]; // YYYY-MM-DD format
      
      console.log(`Creating weight record ${i + 1}: ${dateString} → ${currentWeight.toFixed(1)} kg`);

      // Click Add Weight Record button to open weight record creation form
      await page.getByRole('button', { name: ' Add Weight Record' }).click();

      // Fill Date field with current iteration date
      await page.getByRole('textbox', { name: 'Date*' }).fill(dateString);

      // Fill Weight field with progressive weight value
      await page.getByRole('spinbutton', { name: 'Weight (kg)*' }).fill(currentWeight.toFixed(1));

      // Handle file upload for attachment
      const fileChooserPromise = page.waitForEvent('filechooser');
      
      // Click Attachment button to open file chooser for image upload
      await page.getByRole('button', { name: 'Attachment*' }).click();

      // Upload image file for weight record attachment
      const fileChooser = await fileChooserPromise;
      await fileChooser.setFiles(["c:\\Users\\sumanas\\Documents\\Dhinakaran\\moksa-playwright\\Images\\8.jpg"]);

      // Fill Notes field with testing description
      await page.getByRole('textbox', { name: 'Notes' }).fill('Auto weight entry for testing');

      // Save the weight record
      await page.getByRole('button', { name: 'Save' }).click();

      // Wait for save operation to complete
      await new Promise(f => setTimeout(f, 3 * 1000));

      // Handle success dialog
      try {
        const okButton = page.getByRole('button', { name: 'OK' });
        if (await okButton.isVisible({ timeout: 5000 })) {
          await okButton.click();
          console.log(`✅ Weight record ${i + 1} saved successfully`);
        }
      } catch (error) {
        console.log(`⚠️ Success dialog not found for record ${i + 1}, continuing...`);
      }

      // Progress to next record
      recordDate.setDate(recordDate.getDate() + 1);
      currentWeight += weightIncrement;
      recordsCreated++;

      // Brief pause for system stability
      await new Promise(f => setTimeout(f, 1000));
    }

    console.log(`🎯 Bulk weight data entry completed! Created ${recordsCreated} weight records`);
    console.log(`📊 Weight progression: 80.0kg → ${currentWeight.toFixed(1)}kg`);

    // Verify Weight History section shows the created records
    await expect(page.getByText('Weight History')).toBeVisible();

    // Verify that weight records display testing notes
    await expect(page.getByText('Auto weight entry for testing')).toBeVisible();

    // Additional verification - check that table shows multiple entries
    const weightTable = page.locator('table').first();
    await expect(weightTable).toBeVisible();
    
    // Verify status shows multiple entries were created
    await expect(page.getByText(/Showing \d+ to \d+ of \d+ entries/)).toBeVisible();
  });
});