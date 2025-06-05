import { test, expect } from '@playwright/test';

test('login', async ({ page }) => {
  await page.goto('/login');

  await page.getByTestId('login-link').click();
  await page.getByTestId('login-email-input').fill('kindl.m@icloud.com');
  await page.getByTestId('login-password-input').fill('123456');
  await page.getByTestId('login-submit').click();

  await expect(page).toHaveURL('/dashboard');
});
