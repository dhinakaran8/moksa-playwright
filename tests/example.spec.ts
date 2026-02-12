// spec: specs/login-positive.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { LoginLocators } from '../locators/loginLocators';
import { ENV } from '../config/env';
import { logStep } from '../loggers/logger';

test.describe('Login Positive Flow Tests', () => {
  
  test('Valid Login with Email and Password', async ({ page }) => {
    logStep('Starting test', 'Valid Login with Email and Password');
    const loginPage = new LoginPage(page);

   
    await loginPage.navigate();
    await loginPage.verifyLoginPageElements();

    await loginPage.login(ENV.username, ENV.password);

    // Verify successful login
    await loginPage.verifySuccessfulLogin();
    
    logStep('Completed test', 'Valid Login with Email and Password');
  });

  


});