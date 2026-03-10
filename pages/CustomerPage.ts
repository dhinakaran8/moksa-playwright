import { Page, expect } from "@playwright/test";
import { CustomerLocators } from "../locators/CustomerLocators";
import * as action from "../utils/actions";
import { logStep } from "../loggers/logger";
import { ENV } from "../config/env";

export class CustomerPage {
  constructor(private page: Page) {}

  // Navigation methods
  async navigate() {
    logStep("Navigating", "Customer Page");
    await this.page.goto(`${ENV.baseURL}/customer`);
    // Wait for page load instead of specific table
    await this.page.waitForLoadState("networkidle");
    await this.waitForCustomerListLoad();
  }

  async waitForCustomerListLoad() {
    logStep("Waiting", "Customer List Load");
    // Wait for any table to be visible, more flexible
    await expect(this.page.locator("table").first()).toBeVisible({
      timeout: 10000,
    });
  }

  async openCreateCustomer() {
    logStep("Opening", "Create Customer Form");
    await action.click(
      this.page,
      CustomerLocators.createCustomerButton,
      "Create Customer Button",
    );
    await expect(
      this.page.locator(CustomerLocators.createCustomerForm).first(),
    ).toBeVisible();
  }

  // ✅ Fill mandatory fields only (Customer Name* and Mobile Number*)
  async fillMandatoryFields(customerData: any) {
    logStep("Filling", `Mandatory Fields Only for ${customerData.name}`);

    // Fill Customer Name (mandatory)
    await action.fill(
      this.page,
      CustomerLocators.nameInput,
      customerData.name,
      "Customer Name",
    );

    // Fill Mobile Number (mandatory)
    await action.fill(
      this.page,
      CustomerLocators.mobileInput,
      customerData.mobile,
      "Mobile Number",
    );

    logStep("Completed", "Mandatory fields filled successfully");
  }

  // ✅ Fill complete customer form (for comprehensive tests)
  async fillCustomerForm(customerData: any) {
    logStep("Filling", `Customer Form for ${customerData.name}`);

    // Fill mandatory fields
    await this.fillMandatoryFields(customerData);

    // Fill optional fields if provided
    if (customerData.firstName) {
      await action.fill(
        this.page,
        CustomerLocators.firstNameInput,
        customerData.firstName,
        "First Name",
      );
    }
    if (customerData.lastName) {
      await action.fill(
        this.page,
        CustomerLocators.lastNameInput,
        customerData.lastName,
        "Last Name",
      );
    }
    if (customerData.email) {
      await action.fill(
        this.page,
        CustomerLocators.emailInput,
        customerData.email,
        "Email",
      );
    }
    if (customerData.dateOfBirth) {
      await action.fill(
        this.page,
        CustomerLocators.dobInput,
        customerData.dateOfBirth,
        "Date of Birth",
      );
    }
  }

  async submitCustomer() {
    logStep("Submitting", "Customer Form");
    await action.click(
      this.page,
      CustomerLocators.submitButton,
      "Submit Button",
    );
    await this.waitForSubmissionSuccess();
  }

  async waitForSubmissionSuccess() {
    logStep("Waiting", "Submission Success");
    try {
      await expect(
        this.page.locator(CustomerLocators.successMessage).first(),
      ).toBeVisible({ timeout: 5000 });
    } catch {
      // If no success message, check if we're back to customer list
      await expect(
        this.page.locator(CustomerLocators.customerTable).first(),
      ).toBeVisible();
    }
  }

  // Search and Verification Methods
  async searchCustomer(searchTerm: string) {
    logStep("Searching", `Customer: ${searchTerm}`);
    await action.fill(
      this.page,
      CustomerLocators.searchCustomer,
      searchTerm,
      "Search Field",
    );
    await this.page.waitForTimeout(2000); // Wait for search results
  }

  async verifyCustomerInList(customerName: string) {
    logStep("Verifying", `Customer in list: ${customerName}`);
    const customerRow = this.page
      .locator(CustomerLocators.customerRows)
      .filter({ hasText: customerName });
    await expect(customerRow.first()).toBeVisible();
  }

  async clickEditCustomer(customerName: string) {
    logStep("Clicking", `Edit Customer: ${customerName}`);
    const customerRow = this.page
      .locator(CustomerLocators.customerRows)
      .filter({ hasText: customerName });
    await customerRow.locator(CustomerLocators.editButton).first().click();
    await expect(
      this.page.locator(CustomerLocators.createCustomerForm).first(),
    ).toBeVisible();
  }

  async updateCustomerName(newName: string) {
    logStep("Updating", `Customer Name to: ${newName}`);
    // await action.clear(this.page, CustomerLocators.nameInput, "Name Field");
    await action.fill(
      this.page,
      CustomerLocators.nameInput,
      newName,
      "Name Field",
    );
  }

  async verifyCustomerUpdated(updatedName: string) {
    logStep("Verifying", `Customer Updated: ${updatedName}`);
    await this.waitForSubmissionSuccess();
    await this.searchCustomer(updatedName);
    await this.verifyCustomerInList(updatedName);
  }
}
