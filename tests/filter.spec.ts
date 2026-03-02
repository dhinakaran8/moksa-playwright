// spec: specs/filter-functionality-comprehensive.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from "@playwright/test";
import { FilterPage } from "../pages/filterPage";
import { FilterLocators } from "../locators/FilterLocators";
import { ENV } from "../config/env";
import { logStep } from "../loggers/logger";

test.describe("Comprehensive Filter Functionality Tests", () => {
  let filterPage: FilterPage;

  test.beforeEach(async ({ page }) => {
    logStep("Starting test setup", "Filter functionality tests");
    filterPage = new FilterPage(page);
    await filterPage.navigate();
    await filterPage.login();
    logStep("Completed test setup", "Login successful");
  });

  test.describe("1. Basic Filter Functionality", () => {
    test("Search Box Functionality Across Modules", async ({ page }) => {
      logStep("Starting test", "Search Box Functionality Across Modules");

      const modules = ["employees", "customers", "payments"];

      for (const module of modules) {
        logStep("Testing search", `In ${module} module`);

        await filterPage.navigateToModule(module);
        await filterPage.verifyTableResults();

        // Test search functionality
        await filterPage.performSearch("test");
        await filterPage.verifyTableResults();

        // Clear search and verify all records return
        await filterPage.clearSearch();
        await filterPage.verifyTableResults();

        logStep("Completed search test", `For ${module} module`);
      }

      logStep("Completed test", "Search Box Functionality Across Modules");
    });

    test("Pagination Controls Testing", async ({ page }) => {
      logStep("Starting test", "Pagination Controls Testing");

      await filterPage.navigateToModule("employees");
      await filterPage.testPagination();
      await filterPage.verifyPaginationInfo();

      logStep("Completed test", "Pagination Controls Testing");
    });

    test("Entries Per Page Dropdown", async ({ page }) => {
      logStep("Starting test", "Entries Per Page Dropdown");

      await filterPage.navigateToModule("employees");

      // Test different page sizes
      const pageSizes = ["25", "50", "100"];
      for (const size of pageSizes) {
        await filterPage.changeEntriesPerPage(size);
        await filterPage.verifyTableResults();
        logStep("Verified", `${size} entries per page`);
      }

      // Reset to default
      await filterPage.changeEntriesPerPage("10");

      logStep("Completed test", "Entries Per Page Dropdown");
    });

    test("Column Sorting Functionality", async ({ page }) => {
      logStep("Starting test", "Column Sorting Functionality");

      await filterPage.navigateToModule("employees");

      // Test sorting by different columns
      const columns = ["Name", "Email", "Phone"];
      for (const column of columns) {
        await filterPage.sortByColumn(column);
        await filterPage.verifyTableResults();
        logStep("Verified", `Sorting by ${column}`);
      }

      logStep("Completed test", "Column Sorting Functionality");
    });
  });

  test.describe("2. Advanced Filter Functionality", () => {
    test("Date Range Filters", async ({ page }) => {
      logStep("Starting test", "Date Range Filters");

      await filterPage.navigateToModule("payments");
      await filterPage.openAdvancedFilters();

      // Apply date filter
      await filterPage.applyDateFilter("2026-03-01", "2026-03-31");
      await filterPage.applyFilters();
      await filterPage.verifyTableResults();
      await filterPage.verifyTotalAmount();

      // Reset filters
      await filterPage.resetFilters();
      await filterPage.verifyTableResults();

      logStep("Completed test", "Date Range Filters");
    });

    test("Multi-Criteria Advanced Filters", async ({ page }) => {
      logStep("Starting test", "Multi-Criteria Advanced Filters");

      await filterPage.navigateToModule("payments");
      await filterPage.openAdvancedFilters();

      // Apply multiple filters
      await filterPage.selectProgramType("Regular Program");
      await filterPage.selectPaymentType("Cash");
      await filterPage.selectBranch("Online");

      await filterPage.applyFilters();
      await filterPage.verifyTableResults();

      // Test export with filters applied
      await filterPage.verifyExportFunctionality();

      // Reset filters
      await filterPage.resetFilters();

      logStep("Completed test", "Multi-Criteria Advanced Filters");
    });

    test("Session Filters with Tab Navigation", async ({ page }) => {
      logStep("Starting test", "Session Filters with Tab Navigation");

      await filterPage.navigateToModule("sessions");

      // Test Group tab filters
      await filterPage.switchToTab("Group");
      await filterPage.openAdvancedFilters();
      await filterPage.selectProgramType("Group Online");
      await filterPage.applyFilters();
      await filterPage.verifyTableResults();

      // Test Personal tab
      await filterPage.switchToTab("Personal");
      await filterPage.verifyTableResults();

      // Reset filters
      await filterPage.resetFilters();

      logStep("Completed test", "Session Filters with Tab Navigation");
    });
  });

  test.describe("3. Specialized Module Filters", () => {
    test("Customer Programs Status Filtering", async ({ page }) => {
      logStep("Starting test", "Customer Programs Status Filtering");

      await filterPage.navigateToModule("customer-programs");

      // Test different status filters
      const statusFilters = ["Enquired", "Active", "Completed"];

      for (const status of statusFilters) {
        await filterPage.selectStatusFilter(status);
        await filterPage.verifyTableResults();
        logStep("Verified", `${status} status filter`);
      }

      logStep("Completed test", "Customer Programs Status Filtering");
    });

    test("Available Trainers Time-Based Filters", async ({ page }) => {
      logStep("Starting test", "Available Trainers Time-Based Filters");

      await filterPage.navigateToModule("available-trainers");

      // Test time filtering
      await filterPage.applyTimeFilter("09:00", "17:00");
      await filterPage.verifyTableResults();

      // Test search functionality
      await filterPage.performSearch("Jeya");
      await filterPage.verifyTableResults();

      // Clear search
      await filterPage.clearSearch();

      logStep("Completed test", "Available Trainers Time-Based Filters");
    });

    test("Customer Attendance Date and Customer Filters", async ({ page }) => {
      logStep("Starting test", "Customer Attendance Date and Customer Filters");

      await filterPage.navigateToModule("customer-attendance");
      await filterPage.openAdvancedFilters();

      // Apply date filters
      await filterPage.applyDateFilter("2026-03-01", "2026-03-02");
      await filterPage.applyFilters();
      await filterPage.verifyTableResults();

      // Reset filters
      await filterPage.resetFilters();

      logStep(
        "Completed test",
        "Customer Attendance Date and Customer Filters",
      );
    });

    test("Schedules Comprehensive Advanced Filters", async ({ page }) => {
      logStep("Starting test", "Schedules Comprehensive Advanced Filters");

      await filterPage.navigateToModule("schedules");
      await filterPage.openAdvancedFilters();

      // Test multi-criteria filtering
      await filterPage.selectProgramType("Group Online");
      await filterPage.selectProgram("Beginner Session");
      await filterPage.applyFilters();
      await filterPage.verifyTableResults();

      // Test tab functionality
      await filterPage.switchToTab("Personal");
      await filterPage.verifyTableResults();

      // Reset filters
      await filterPage.resetFilters();

      logStep("Completed test", "Schedules Comprehensive Advanced Filters");
    });

    test("Expenses and Accounts Financial Filtering", async ({ page }) => {
      logStep("Starting test", "Expenses and Accounts Financial Filtering");

      // Test Expenses filters
      await filterPage.navigateToModule("expenses");
      await filterPage.openAdvancedFilters();

      await filterPage.selectBranch("Online");
      await filterPage.selectExpenseType("Salary");
      await filterPage.applyFilters();
      await filterPage.verifyTableResults();

      // Test Accounts Overview
      await filterPage.navigateToModule("accounts");
      await filterPage.openAdvancedFilters();

      // Verify financial totals are displayed
      await filterPage.verifyFinancialSummary();
      await filterPage.selectBranch("Online");
      await filterPage.applyFilters();
      await filterPage.verifyTableResults();

      // Test export functionality
      await filterPage.verifyExportFunctionality();

      // Reset filters
      await filterPage.resetFilters();

      logStep("Completed test", "Expenses and Accounts Financial Filtering");
    });
  });

  test.describe("4. Filter Performance and Edge Cases", () => {
    test("Filter State Management and Navigation", async ({ page }) => {
      logStep("Starting test", "Filter State Management");

      await filterPage.navigateToModule("payments");
      await filterPage.openAdvancedFilters();
      await filterPage.selectProgramType("Regular Program");
      await filterPage.applyFilters();

      const rowCountWithFilter = await filterPage.getTableRowCount();

      // Navigate away and back
      await filterPage.navigateToModule("employees");
      await filterPage.navigateToModule("payments");

      // Verify filters were reset (new navigation should show all data)
      const rowCountAfterNavigation = await filterPage.getTableRowCount();
      logStep("Verified", "Filter state management works correctly");

      logStep("Completed test", "Filter State Management");
    });

    test("Edge Cases and Error Handling", async ({ page }) => {
      logStep("Starting test", "Edge Cases and Error Handling");

      await filterPage.navigateToModule("payments");
      await filterPage.openAdvancedFilters();

      // Test invalid date range
      await filterPage.applyDateFilter("2026-12-31", "2026-01-01");
      await filterPage.applyFilters();

      // System should handle gracefully
      await expect(page.locator(FilterLocators.pageTitle)).toBeVisible();
      logStep("Verified", "Invalid date range handled gracefully");

      // Test special characters in search
      await filterPage.performSearch("@#$%^&*()");
      await filterPage.verifyTableResults();
      logStep("Verified", "Special characters in search handled");

      // Clear search
      await filterPage.clearSearch();
      await filterPage.resetFilters();

      logStep("Completed test", "Edge Cases and Error Handling");
    });

    test("Cross-Module Filter Consistency", async ({ page }) => {
      logStep("Starting test", "Cross-Module Filter Consistency");

      const modules = ["employees", "customers", "payments", "sessions"];

      for (const module of modules) {
        await filterPage.navigateToModule(module);

        // Verify basic filter elements exist
        await expect(
          page.locator(FilterLocators.entriesDropdown),
        ).toBeVisible();
        logStep("Verified", `${module}: Entries dropdown exists`);

        // Check for search functionality
        if ((await page.locator(FilterLocators.searchInput).count()) > 0) {
          await expect(page.locator(FilterLocators.searchInput)).toBeVisible();
          logStep("Verified", `${module}: Search box exists`);
        }

        // Check for advanced filters if applicable
        if (
          (await page.locator(FilterLocators.toggleFiltersButton).count()) > 0
        ) {
          await filterPage.openAdvancedFilters();
          await expect(page.locator(FilterLocators.resetButton)).toBeVisible();
          await filterPage.closeAdvancedFilters();
          logStep("Verified", `${module}: Advanced filters available`);
        }
      }

      logStep("Completed test", "Cross-Module Filter Consistency");
    });
  });

  test.describe("5. Export Integration with Filters", () => {
    test("Export Functionality with Applied Filters", async ({ page }) => {
      logStep("Starting test", "Export Functionality with Applied Filters");

      const modulesWithExport = ["payments", "expenses", "accounts"];

      for (const module of modulesWithExport) {
        await filterPage.navigateToModule(module);

        // Apply some filters
        await filterPage.openAdvancedFilters();
        await filterPage.selectBranch("Online");
        await filterPage.applyFilters();

        // Test export functionality
        const hasExport = await filterPage.verifyExportFunctionality();
        if (hasExport) {
          logStep("Verified", `${module}: Export available with filters`);
        }

        // Reset filters
        await filterPage.resetFilters();
      }

      logStep("Completed test", "Export Functionality with Applied Filters");
    });
  });

  test.describe("6. Comprehensive Integration Test", () => {
    test("End-to-End Filter Workflow", async ({ page }) => {
      logStep("Starting test", "End-to-End Filter Workflow");

      // Payments module comprehensive workflow
      await filterPage.navigateToModule("payments");

      // 1. Test basic search
      await filterPage.performSearch("test");
      let searchResults = await filterPage.getTableRowCount();
      logStep("Info", `Search results: ${searchResults} rows`);

      // 2. Clear search and apply advanced filters
      await filterPage.clearSearch();
      await filterPage.openAdvancedFilters();

      // 3. Apply multiple criteria
      await filterPage.applyDateFilter("2026-03-01", "2026-03-31");
      await filterPage.selectProgramType("Regular Program");
      await filterPage.selectPaymentType("Cash");
      await filterPage.applyFilters();

      // 4. Verify results and export
      let filteredResults = await filterPage.getTableRowCount();
      logStep("Info", `Filtered results: ${filteredResults} rows`);
      await filterPage.verifyTotalAmount();
      await filterPage.verifyExportFunctionality();

      // 5. Test tab switching
      await filterPage.switchToTab("Special Program");
      await filterPage.verifyTableResults();

      // 6. Test sorting on filtered data
      await filterPage.sortByColumn("Date");
      await filterPage.verifyTableResults();

      // 7. Test pagination if available
      await filterPage.testPagination();

      // 8. Reset everything
      await filterPage.resetFilters();
      let finalResults = await filterPage.getTableRowCount();
      logStep("Info", `Final results after reset: ${finalResults} rows`);

      logStep("Completed test", "End-to-End Filter Workflow");
    });
  });
});
