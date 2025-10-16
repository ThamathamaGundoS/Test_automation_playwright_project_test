// @ts-check
import { test, expect } from '@playwright/test';
import { LoginPage } from "../pages/UI/ui_login.js";
const users = require('./users.json');

test.describe('SauceDemo Login Tests', () => {
  for (const user of users) {
    test(`Login test for ${user.id}`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.goto();
      await loginPage.login(user.username, user.password);

      if (user.id === 'locked out user') {
        // Expect error message for locked out user
        await expect(loginPage.page.locator(loginPage.errorMessage)).toHaveText('Epic sadface: Sorry, this user has been locked out.');
      } else {
        // For other users, check URL for successful login
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
      }
    });
  }
});