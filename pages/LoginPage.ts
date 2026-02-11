import { Page } from "@playwright/test";
import { LoginLocators } from "../locators/loginLocators";
import * as action from "../utils/actions";

export class LoginPage {
  constructor(private page: Page) {}

  async login(username: string, password: string) {
    await action.fill(
      this.page,
      LoginLocators.usernameInput,
      username,
      "Username Field",
    );
    await action.fill(
      this.page,
      LoginLocators.passwordInput,
      password,
      "Password Field",
    );
    await action.click(this.page, LoginLocators.loginButton, "Login Button");
  }
}
