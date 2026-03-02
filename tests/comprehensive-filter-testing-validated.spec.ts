// spec: Comprehensive Filter Testing - All Modules Validated via MCP Server
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Comprehensive Filter Testing - All Modules', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to Moksa fitness application to validate filter XPaths
    await page.goto('https://dev-portal.moksafitness.com/');
    
    // Test emailInput XPath: //input[@placeholder='Enter Email']
    await page.getByRole('textbox', { name: 'Email' }).fill('suregshi.cr@gmail.com');
    
    // Test passwordInput XPath: //input[@placeholder='Enter Password']
    await page.getByRole('textbox', { name: 'Password' }).fill('Moksa123&');
    
    // Test loginButton XPath: //button[contains(text(),'Sign In')]
    await page.getByRole('button', { name: 'Sign In' }).click();
    
    // Wait for successful login and dashboard load
    await expect(page).toHaveURL(/.*dashboard/);
  });

  test('Basic Module Navigation and Filter Presence', async ({ page }) => {
    // Test employeesMenu XPath: //a[contains(@href,'/employees')]
    await page.getByRole('link', { name: ' Employees' }).click();
    await expect(page).toHaveURL(/.*employees/);
    await expect(page.getByRole('heading', { name: 'Employees' })).toBeVisible();

    // Navigate to Customers module to test filter functionality
    await page.getByRole('link', { name: ' Customers' }).click();
    await expect(page).toHaveURL(/.*customer/);
    await expect(page.getByRole('heading', { name: 'Customers' })).toBeVisible();

    // Navigate to Payments module to check for advanced filter options
    await page.getByRole('link', { name: ' Payments' }).click();
    await expect(page).toHaveURL(/.*payments/);
    await expect(page.getByRole('heading', { name: 'Payments' })).toBeVisible();
    
    // Verify Advanced Filters section is present
    await expect(page.getByRole('heading', { name: 'Advanced Filters' })).toBeVisible();
    await expect(page.getByRole('button', { name: ' Toggle Filters' })).toBeVisible();
  });

  test('Payments Module - Complete Filter Functionality', async ({ page }) => {
    // Navigate to payments module
    await page.getByRole('link', { name: ' Payments' }).click();
    
    // Record initial total amount for comparison
    const initialTotalElement = page.locator('h5:has-text("Total Amount:")');
    const initialTotal = await initialTotalElement.textContent();
    
    // Click Toggle Filters to reveal the advanced filter options panel
    await page.getByRole('button', { name: ' Toggle Filters' }).click();
    
    // Verify all filter elements are visible
    await expect(page.getByText('Payment Date Range')).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'From Date' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'To Date' })).toBeVisible();
    await expect(page.getByText('Program Type')).toBeVisible();
    await expect(page.getByText('Payment Type')).toBeVisible();
    await expect(page.getByText('Branch')).toBeVisible();
    
    // Test date filtering by changing the from date
    await page.getByRole('textbox', { name: 'From Date' }).fill('2026-03-15');
    
    // Test selecting UPI payment type filter
    await page.locator('#payment_method').selectOption(['UPI']);
    await expect(page.locator('#payment_method')).toHaveValue('UPI');
    
    // Test selecting Special Program type filter
    await page.locator('#program_type').selectOption(['Special Program']);
    await expect(page.locator('#program_type')).toHaveValue('Special Program');
    
    // Apply the selected filters to see the filtered results
    await page.getByRole('button', { name: 'Apply Filters' }).click();
    
    // Verify date range updated in summary
    await expect(page.getByText('Date: 15 Mar 2026 to')).toBeVisible();
    
    // Verify filtered results (may be empty for Special Program + UPI combination)
    await expect(page.locator('table')).toBeVisible();
    
    // Test the Reset button to clear all applied filters
    await page.getByRole('button', { name: 'Reset' }).click();
    
    // Verify reset worked - check for "All Dates" in summary
    await expect(page.getByText('Date: All Dates')).toBeVisible();
    
    // Verify dropdowns reset to default values
    await expect(page.locator('#program_type')).toHaveValue('');
    await expect(page.locator('#payment_method')).toHaveValue('');
  });

  test('Sessions Module - Advanced Filter Testing', async ({ page }) => {
    // Navigate to Sessions module to test session-specific filter functionality
    await page.getByRole('link', { name: ' Sessions' }).click();
    await expect(page).toHaveURL(/.*session/);
    
    // Verify Group tab is selected by default
    await expect(page.getByRole('tab', { name: 'Group' })).toHaveAttribute('aria-selected', 'true');
    
    // Click Toggle Filters to reveal the session-specific advanced filter options
    await page.getByRole('button', { name: ' Toggle Filters' }).click();
    
    // Verify session-specific filter elements
    await expect(page.getByText('Program Type')).toBeVisible();
    await expect(page.getByText('Program')).toBeVisible();
    await expect(page.getByText('Time Slot')).toBeVisible();
    await expect(page.getByText('Trainer')).toBeVisible();
    
    // Test Select2 trainer dropdown functionality
    const trainerDropdown = page.getByRole('combobox', { name: 'Select a trainer' });
    await expect(trainerDropdown).toBeVisible();
    
    // Click the Select2 trainer dropdown to open the option list
    await trainerDropdown.click();
    await expect(page.getByRole('listbox')).toBeVisible();
    
    // Verify trainer options are available
    await expect(page.getByRole('option').first()).toBeVisible();
    
    // Test Select2 search functionality by searching for 'Roobini' trainer
    await page.getByRole('searchbox', { name: 'Search' }).fill('Roobini');
    
    // Press Escape to close any open dropdowns or clear current state
    await page.keyboard.press('Escape');
    
    // Test Program Type filter
    await page.locator('select:near(:text("Program Type"))').selectOption('Group Online');
    
    // Test Apply Filters functionality
    await page.getByRole('button', { name: 'Apply Filters' }).click();
    await expect(page.locator('table')).toBeVisible();
    
    // Test Reset functionality
    await page.getByRole('button', { name: 'Reset' }).click();
  });

  test('Tab Functionality in Payments Module', async ({ page }) => {
    // Navigate to payments
    await page.getByRole('link', { name: ' Payments' }).click();
    
    // Test Regular Program tab
    await page.getByRole('tab', { name: 'Regular Program' }).click();
    await expect(page.getByRole('tab', { name: 'Regular Program' })).toHaveAttribute('aria-selected', 'true');
    
    // Test Special Program tab
    await page.getByRole('tab', { name: 'Special Program' }).click();
    await expect(page.getByRole('tab', { name: 'Special Program' })).toHaveAttribute('aria-selected', 'true');
  });

  test('Export Functionality Validation', async ({ page }) => {
    // Navigate to payments
    await page.getByRole('link', { name: ' Payments' }).click();
    
    // Verify Export Data button is present
    await expect(page.getByRole('button', { name: ' Export Data' })).toBeVisible();
    
    // Toggle filters to apply specific filters before export
    await page.getByRole('button', { name: ' Toggle Filters' }).click();
    
    // Apply a date filter
    await page.getByRole('textbox', { name: 'From Date' }).fill('2026-03-01');
    await page.getByRole('textbox', { name: 'To Date' }).fill('2026-03-31');
    await page.getByRole('button', { name: 'Apply Filters' }).click();
    
    // Verify export button remains functional after filtering
    await expect(page.getByRole('button', { name: ' Export Data' })).toBeVisible();
    await expect(page.getByRole('button', { name: ' Export Data' })).toBeEnabled();
  });

  test('Cross-Module Filter Consistency', async ({ page }) => {
    // Test that filter patterns work consistently across modules
    const modules = [
      { name: ' Payments', url: /.*payments/, hasAdvancedFilters: true },
      { name: ' Sessions', url: /.*session/, hasAdvancedFilters: true },
      { name: ' Employees', url: /.*employees/, hasAdvancedFilters: false },
      { name: ' Customers', url: /.*customer/, hasAdvancedFilters: false }
    ];
    
    for (const module of modules) {
      await page.getByRole('link', { name: module.name }).click();
      await expect(page).toHaveURL(module.url);
      
      // All modules should have basic search functionality
      await expect(page.getByRole('searchbox', { name: 'Search:' })).toBeVisible();
      await expect(page.getByRole('combobox', { name: 'Show entries' })).toBeVisible();
      
      if (module.hasAdvancedFilters) {
        // Modules with advanced filters should have Toggle Filters button
        await expect(page.getByRole('button', { name: ' Toggle Filters' })).toBeVisible();
        await expect(page.getByRole('heading', { name: 'Advanced Filters' })).toBeVisible();
      }
    }
  });

  test('DataTable Pagination and Sorting Validation', async ({ page }) => {
    // Test on Employees module (basic table functionality)
    await page.getByRole('link', { name: ' Employees' }).click();
    
    // Test show entries dropdown
    await page.getByRole('combobox', { name: 'Show entries' }).selectOption('25');
    await expect(page.getByRole('combobox', { name: 'Show entries' })).toHaveValue('25');
    
    // Test search functionality
    await page.getByRole('searchbox', { name: 'Search:' }).fill('Trainer');
    await expect(page.locator('table tbody tr')).toContainText('Trainer');
    
    // Clear search
    await page.getByRole('searchbox', { name: 'Search:' }).clear();
    
    // Test column sorting (click on Name column)
    await page.getByRole('columnheader', { name: 'Name: activate to sort column descending' }).click();
    await expect(page.getByRole('columnheader', { name: /Name.*ascending/ })).toBeVisible();
  });
});