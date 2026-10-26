import { test, expect } from '@playwright/test';

const RED = 'rgb(220, 53, 69)';

test.describe('Registration', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Sign up' }).click();
    await expect(page.getByRole('heading', { name: 'Registration' })).toBeVisible();
  });

  test('User can register with valid data', async ({ page }) => {
    const email = `aqa-cherevko-${Date.now()}@test.com`;

    await page.locator('#signupName').fill('John');
    await page.locator('#signupLastName').fill('Smith');
    await page.locator('#signupEmail').fill(email);
    await page.locator('#signupPassword').fill('Qwerty12');
    await page.locator('#signupRepeatPassword').fill('Qwerty12');
    await page.getByRole('button', { name: 'Register' }).click();

    await expect(page).toHaveURL(/panel\/garage/);
  });

  test('Empty Name shows error', async ({ page }) => {
    await page.locator('#signupName').focus();
    await page.locator('#signupName').blur();

    await expect(page.getByText('Name is required')).toBeVisible();
    await expect(page.locator('#signupName')).toHaveCSS('border-color', RED);
  });

  test('Name with cyrillic letters shows error', async ({ page }) => {
    await page.locator('#signupName').fill('Іван');
    await page.locator('#signupName').blur();

    await expect(page.getByText('Name is invalid')).toBeVisible();
    await expect(page.locator('#signupName')).toHaveCSS('border-color', RED);
  });

  test('Name with 1 letter shows length error', async ({ page }) => {
    await page.locator('#signupName').fill('J');
    await page.locator('#signupName').blur();

    await expect(page.getByText('Name has to be from 2 to 20 characters long')).toBeVisible();
    await expect(page.locator('#signupName')).toHaveCSS('border-color', RED);
  });

  test('Name with 1 letter and spaces around shows length error', async ({ page }) => {
    await page.locator('#signupName').fill('  J  ');
    await page.locator('#signupName').blur();

    await expect(page.getByText('Name has to be from 2 to 20 characters long')).toBeVisible();
    await expect(page.locator('#signupName')).toHaveCSS('border-color', RED);
  });

  test('Empty Last name shows error', async ({ page }) => {
    await page.locator('#signupLastName').focus();
    await page.locator('#signupLastName').blur();

    await expect(page.getByText('Last name is required')).toBeVisible();
    await expect(page.locator('#signupLastName')).toHaveCSS('border-color', RED);
  });

  test('Last name with digit shows error', async ({ page }) => {
    await page.locator('#signupLastName').fill('Smith1');
    await page.locator('#signupLastName').blur();

    await expect(page.getByText('Last name is invalid')).toBeVisible();
    await expect(page.locator('#signupLastName')).toHaveCSS('border-color', RED);
  });

  test('Last name with 21 letters shows length error', async ({ page }) => {
    await page.locator('#signupLastName').fill('Abcdefghijklmnopqrstu');
    await page.locator('#signupLastName').blur();

    await expect(page.getByText('Last name has to be from 2 to 20 characters long')).toBeVisible();
    await expect(page.locator('#signupLastName')).toHaveCSS('border-color', RED);
  });

  test('Last name with 1 letter and spaces around shows length error', async ({ page }) => {
    await page.locator('#signupLastName').fill('  S  ');
    await page.locator('#signupLastName').blur();

    await expect(page.getByText('Last name has to be from 2 to 20 characters long')).toBeVisible();
    await expect(page.locator('#signupLastName')).toHaveCSS('border-color', RED);
  });

  test('Empty Email shows error', async ({ page }) => {
    await page.locator('#signupEmail').focus();
    await page.locator('#signupEmail').blur();

    await expect(page.getByText('Email required')).toBeVisible();
    await expect(page.locator('#signupEmail')).toHaveCSS('border-color', RED);
  });

  test('Email without @ shows error', async ({ page }) => {
    await page.locator('#signupEmail').fill('aqa-test.com');
    await page.locator('#signupEmail').blur();

    await expect(page.getByText('Email is incorrect')).toBeVisible();
    await expect(page.locator('#signupEmail')).toHaveCSS('border-color', RED);
  });

  test('Empty Password shows error', async ({ page }) => {
    await page.locator('#signupPassword').focus();
    await page.locator('#signupPassword').blur();

    await expect(page.getByText('Password required')).toBeVisible();
    await expect(page.locator('#signupPassword')).toHaveCSS('border-color', RED);
  });

  test('Password without capital letter shows error', async ({ page }) => {
    await page.locator('#signupPassword').fill('qwerty12');
    await page.locator('#signupPassword').blur();

    await expect(
      page.getByText(
        'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter',
      ),
    ).toBeVisible();
    await expect(page.locator('#signupPassword')).toHaveCSS('border-color', RED);
  });

  test('Empty Re-enter password shows error', async ({ page }) => {
    await page.locator('#signupRepeatPassword').focus();
    await page.locator('#signupRepeatPassword').blur();

    await expect(page.getByText('Re-enter password required')).toBeVisible();
    await expect(page.locator('#signupRepeatPassword')).toHaveCSS('border-color', RED);
  });

  test('Different passwords show error', async ({ page }) => {
    await page.locator('#signupPassword').fill('Qwerty12');
    await page.locator('#signupRepeatPassword').fill('Qwerty13');
    await page.locator('#signupRepeatPassword').blur();

    await expect(page.getByText('Passwords do not match')).toBeVisible();
    await expect(page.locator('#signupRepeatPassword')).toHaveCSS('border-color', RED);
  });

  test('Register button is disabled when data is incorrect', async ({ page }) => {
    await page.locator('#signupName').fill('John');
    await page.locator('#signupLastName').fill('Smith');
    await page.locator('#signupEmail').fill('aqa-test.com');
    await page.locator('#signupPassword').fill('Qwerty12');
    await page.locator('#signupRepeatPassword').fill('Qwerty12');

    await expect(page.getByRole('button', { name: 'Register' })).toBeDisabled();
  });
});
