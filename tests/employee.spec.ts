import { test } from "@playwright/test";
import { EmployeePage } from "../pages/EmployeePage";
import { LoginPage } from "../pages/LoginPage";
import { generateEmployeeData } from "../utils/testData";
import { ENV } from "../config/env";

test.describe("Create Employee - All Branches & Roles", () => {
  test("Create → Search → Edit employee", async ({ page }) => {
    // ✅ Login first
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login(ENV.username, ENV.password);

    const empPage = new EmployeePage(page);

    await empPage.openCreateEmployee();

    const branches = await empPage.getAllSelect2Options(
      "//span[@id='select2-branch_id-container']",
    );

    const roles = await empPage.getAllSelect2Options(
      "//span[@id='select2-role-container']",
    );

    for (const branch of branches) {
      for (const role of roles) {
        const data = generateEmployeeData(branch, role);

        await empPage.openCreateEmployee();
        await empPage.fillEmployeeForm(data);
        await empPage.submitEmployee();

        // ✅ verify create
        await empPage.searchEmployee(data.name);
        await empPage.verifyEmployeeInList(data.name);

        // ✅ edit flow
        const updatedName = data.name + "_EDIT";

        await empPage.clickEditEmployee(data.name);
        await empPage.updateEmployeeName(updatedName);
        await empPage.submitEmployee();

        // ✅ verify edit
        await empPage.verifyEmployeeUpdated(updatedName);
      }
    }
  });
});
