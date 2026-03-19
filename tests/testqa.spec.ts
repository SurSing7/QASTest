import { test, expect } from '@playwright/test';

test.describe('login test', () => {
  test('1 login verification', async ({ page }) => {
    await page.goto('https://www.google.com/');
    console.log('login');
    await page.waitForTimeout(6000);
  });

  test('2 add to cart', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    expect(page).toHaveTitle('Swag Labs');
    await page.waitForTimeout(4000);
  });
});
