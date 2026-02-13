import { Page, expect } from "@playwright/test";
import * as action from "../utils/actions";
import { logStep } from "../loggers/logger";
import { generateTrainerSlots } from "../utils/timeSlots";

export class EmployeePage {
  constructor(private page: Page) {}

  // ✅ Select2 containers
  private createEmployeeBtn =
    "//a[@href='https://portal.moksafitness.com/employees/create']";
  private branchDropdown = "//span[@id='select2-branch_id-container']";
  private roleDropdown = "//span[@id='select2-role-container']";

  // ✅ form fields
  private employeeNameInput = "//input[@placeholder='Enter the Employee Name']";
  private employeeMobileInput =
    "//input[@placeholder='Enter the Employee Mobile Number']";
  private employeeEmailInput = "//input[@type='email']";
  private passwordInput = "//input[@type='password']";

  private startTimeInputs = "//input[contains(@name,'[from_time]')]";
  private endTimeInputs = "//input[contains(@name,'[to_time]')]";

  private addTimeSlotBtn = "//button[.='Add Time Slot']";
  private submitBtn = "//button[.='Create Employee']";

  private searchInput = "//input[@type='search']";

  // =========================
  // 🔹 Select2 helpers
  // =========================

  async selectSelect2Option(containerXpath: string, value: string) {
    await logStep("Select dropdown", value);

    await this.page.click(containerXpath);

    const searchBox = this.page.locator(
      "//input[contains(@class,'select2-search__field')]",
    );
    await expect(searchBox).toBeVisible();

    await searchBox.fill(value);

    const option = this.page.locator(
      `//li[contains(@class,'select2-results__option') and normalize-space()='${value}']`,
    );

    await expect(option).toBeVisible();
    await option.click();

    // ✅ assertion
    await expect(this.page.locator(containerXpath)).toContainText(value);
  }

  async getAllSelect2Options(containerXpath: string) {
    await this.page.click(containerXpath);

    const options = await this.page
      .locator("//li[contains(@class,'select2-results__option')]")
      .allTextContents();

    await this.page.keyboard.press("Escape");

    return options
      .map((o) => o.trim())
      .filter((o) => o && !o.toLowerCase().includes("select"));
  }

  // =========================
  // 🔹 main actions
  // =========================

  async openCreateEmployee() {
    await logStep("Open create employee", "button");
    await action.click(
      this.page,
      this.createEmployeeBtn,
      "Create Employee button",
    );
  }

  async fillEmployeeForm(data: any) {
    await logStep("Fill employee form", "form fields");

    await this.selectSelect2Option(this.branchDropdown, data.branch);
    await this.selectSelect2Option(this.roleDropdown, data.role);

    await action.fill(
      this.page,
      this.employeeNameInput,
      data.name,
      "Employee Name",
    );
    await action.fill(
      this.page,
      this.employeeMobileInput,
      data.mobile,
      "Employee Mobile",
    );
    await action.fill(
      this.page,
      this.employeeEmailInput,
      data.email,
      "Employee Email",
    );
    await action.fill(this.page, this.passwordInput, data.password, "Password");

    // ✅ trainer conditional
    if (data.role.toLowerCase().includes("trainer")) {
      await this.handleTrainerTimings();
    }
  }

  // =========================
  // 🔹 Trainer slots
  // =========================

  async handleTrainerTimings() {
    await logStep("Handle trainer time slots", "time inputs");

    const slots = generateTrainerSlots();

    for (let i = 0; i < slots.length; i++) {
      const slot = slots[i];

      // ➕ add new row except first
      if (i > 0) {
        await action.click(
          this.page,
          this.addTimeSlotBtn,
          "Add Time Slot button",
        );
      }

      const startInputs = this.page.locator(this.startTimeInputs);
      const endInputs = this.page.locator(this.endTimeInputs);

      const index = (await startInputs.count()) - 1;

      await startInputs.nth(index).fill(slot.start);
      await endInputs.nth(index).fill(slot.end);

      // ✅ assertion (VERY IMPORTANT)
      await expect(startInputs.nth(index)).toHaveValue(slot.start);
      await expect(endInputs.nth(index)).toHaveValue(slot.end);
    }
  }

  async submitEmployee() {
    await logStep("Submit employee", "form");

    await Promise.all([
      this.page.waitForLoadState("networkidle"),
      action.click(this.page, this.submitBtn, "Submit button"),
    ]);
  }

  // =========================
  // 🔹 verification
  // =========================

  async searchEmployee(name: string) {
    await action.fill(this.page, this.searchInput, name, "Search input");
    await this.page.waitForLoadState("networkidle");
  }

  async verifyEmployeeInList(name: string) {
    await expect(
      this.page.locator(`//table//*[normalize-space()='${name}']`),
    ).toBeVisible();
  }

  async clickEditEmployee(name: string) {
    const row = this.page.locator(`//tr[.//*[normalize-space()='${name}']]`);

    await row.locator("//button[contains(@class,'edit')]").click();
  }

  async updateEmployeeName(newName: string) {
    await action.fill(
      this.page,
      this.employeeNameInput,
      newName,
      "Employee Name update",
    );
  }

  async verifyEmployeeUpdated(newName: string) {
    await this.searchEmployee(newName);

    await expect(
      this.page.locator(`//table//*[normalize-space()='${newName}']`),
    ).toBeVisible();
  }
}
