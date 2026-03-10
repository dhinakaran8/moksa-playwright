// spec: Customer Creation - Mandatory Fields Only Test Plan
// seed: tests/seed.spec.ts

import { test, expect } from "@playwright/test";
import { CustomerPage } from "../pages/CustomerPage";
import { LoginPage } from "../pages/LoginPage";
import { CustomerLocators } from "../locators/CustomerLocators";
import { generateCustomerData } from "../utils/testData";
import { ENV } from "../config/env";
import { logStep } from "../loggers/logger";
import * as fs from "fs";
import * as path from "path";

test.describe("Customer Creation - Mandatory Fields Tests", () => {
  // Create JSON storage directory if it doesn't exist
  const jsonDir = path.join(__dirname, "..", "data");
  const customersFile = path.join(jsonDir, "customers.json");
  const outputFile = path.join(jsonDir, "customer_output.txt");

  // Ensure data directory exists
  if (!fs.existsSync(jsonDir)) {
    fs.mkdirSync(jsonDir, { recursive: true });
  }

  // Function to write display data to file (last run only)
  const writeOutputToFile = (
    content: string,
    isFirstWrite: boolean = false,
  ) => {
    const timestamp = new Date().toLocaleString();
    const formattedContent = `[${timestamp}] ${content}\n\n`;

    if (isFirstWrite) {
      fs.writeFileSync(outputFile, formattedContent);
    } else {
      fs.appendFileSync(outputFile, formattedContent);
    }
  };

  // Function to store customer data in JSON (last run only)
  const storeCustomerData = (
    customerData: any,
    isFirstCustomer: boolean = false,
  ) => {
    let existingCustomers = [];

    // Only read existing customers if not the first customer of a new test run
    if (!isFirstCustomer && fs.existsSync(customersFile)) {
      const fileContent = fs.readFileSync(customersFile, "utf-8");
      existingCustomers = JSON.parse(fileContent);
    }

    // Add new customer data
    const customerRecord = {
      id: existingCustomers.length + 1,
      name: customerData.name,
      mobile: customerData.mobile,
      created_at: new Date().toISOString(),
      test_run: new Date().toLocaleString(),
    };

    existingCustomers.push(customerRecord);

    // Save to JSON file
    fs.writeFileSync(customersFile, JSON.stringify(existingCustomers, null, 2));

    logStep(
      "Stored JSON",
      `Customer data saved: ${JSON.stringify(customerRecord, null, 2)}`,
    );
    return customerRecord;
  };

  // Function to get customer data from JSON
  const getStoredCustomers = () => {
    if (fs.existsSync(customersFile)) {
      const fileContent = fs.readFileSync(customersFile, "utf-8");
      return JSON.parse(fileContent);
    }
    return [];
  };
  test("Create Customer with Mandatory Fields Only → Verify", async ({
    page,
  }) => {
    logStep("Starting test", "Create Customer with Mandatory Fields Only");

    const loginPage = new LoginPage(page);
    const customerPage = new CustomerPage(page);

    // ✅ Login first
    await loginPage.navigate();
    await loginPage.login(ENV.username, ENV.password);

    // Generate customer data with mandatory fields only
    const customerData = generateCustomerData();
    logStep(
      "Generated customer data",
      `Name: ${customerData.name}, Mobile: ${customerData.mobile}`,
    );

    // ✅ Store customer data in JSON for reuse
    const storedCustomer = storeCustomerData(customerData, true);
    const customerOutput = `📋 Customer JSON for reuse:\n${JSON.stringify(storedCustomer, null, 2)}`;
    writeOutputToFile(customerOutput, true);

    // ✅ Navigate to customer creation
    await customerPage.navigate();
    await customerPage.openCreateCustomer();

    // ✅ Fill mandatory fields only
    await customerPage.fillMandatoryFields(customerData);
    await customerPage.submitCustomer();

    // ✅ Verify customer creation
    await customerPage.searchCustomer(customerData.mobile);
    await customerPage.verifyCustomerInList(customerData.name);

    logStep("Completed test", "Customer created with mandatory fields only");
  });

  test("Reuse Stored Customer Data from JSON", async ({ page }) => {
    logStep("Starting test", "Reuse Stored Customer Data from JSON");

    // ✅ Get stored customers from JSON
    const storedCustomers = getStoredCustomers();

    if (storedCustomers.length === 0) {
      throw new Error(
        "No stored customers found. Run the first test to create customers.",
      );
    }

    // Use the last stored customer
    const lastCustomer = storedCustomers[storedCustomers.length - 1];
    const reuseOutput = `🔄 Reusing customer from JSON:\n${JSON.stringify(lastCustomer, null, 2)}`;
    writeOutputToFile(reuseOutput, true);

    const loginPage = new LoginPage(page);
    const customerPage = new CustomerPage(page);

    // ✅ Login first
    await loginPage.navigate();
    await loginPage.login(ENV.username, ENV.password);

    // ✅ Search for the stored customer
    await customerPage.navigate();
    await customerPage.searchCustomer(lastCustomer.mobile);
    await customerPage.verifyCustomerInList(lastCustomer.name);

    logStep("Completed test", "Successfully reused customer data from JSON");
  });

  test("Display All Stored Customers JSON", async ({ page }) => {
    logStep("Starting test", "Display All Stored Customers JSON");

    // ✅ Get all stored customers
    const allCustomers = getStoredCustomers();

    let allCustomersOutput = "📊 All Stored Customers JSON:\n";
    allCustomersOutput += JSON.stringify(allCustomers, null, 2);
    allCustomersOutput += `\n\n📈 Total customers stored: ${allCustomers.length}`;

    if (allCustomers.length > 0) {
      allCustomersOutput += "\n\n📋 Customer List:";
      allCustomers.forEach((customer: any, index: number) => {
        allCustomersOutput += `\n${index + 1}. Name: ${customer.name}, Mobile: ${customer.mobile}`;
      });
    }

    writeOutputToFile(allCustomersOutput, true);

    logStep("Completed test", "Displayed all stored customer JSON data");
  });
});
