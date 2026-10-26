import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { RegistrationModal } from '../pages/RegistrationModal';

const RED = 'rgb(220, 53, 69)';
const PASSWORD_ERROR =
  'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter';

test.describe('Registration', () => {
  let homePage: HomePage;
  let registrationModal: RegistrationModal;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    registrationModal = new RegistrationModal(page);

    await homePage.open();
    await homePage.openRegistrationModal();
    await expect(registrationModal.title).toBeVisible();
  });

  test('User can register with valid data', async ({ page }) => {
    const email = `aqa-cherevko-${Date.now()}@test.com`;

    await registrationModal.signUp('John', 'Smith', email, 'Qwerty12', 'Qwerty12');

    await expect(page).toHaveURL(/panel\/garage/);
  });

  test('Empty Name shows error', async () => {
    await registrationModal.nameInput.focus();
    await registrationModal.nameInput.blur();

    await expect(registrationModal.nameError).toHaveText('Name is required');
    await expect(registrationModal.nameInput).toHaveCSS('border-color', RED);
  });

  test('Name with cyrillic letters shows error', async () => {
    await registrationModal.nameInput.fill('Іван');
    await registrationModal.nameInput.blur();

    await expect(registrationModal.nameError).toHaveText('Name is invalid');
    await expect(registrationModal.nameInput).toHaveCSS('border-color', RED);
  });

  test('Name with 1 letter shows length error', async () => {
    await registrationModal.nameInput.fill('J');
    await registrationModal.nameInput.blur();

    await expect(registrationModal.nameError).toHaveText('Name has to be from 2 to 20 characters long');
    await expect(registrationModal.nameInput).toHaveCSS('border-color', RED);
  });

  test('Name with 1 letter and spaces around shows length error', async () => {
    await registrationModal.nameInput.fill('  J  ');
    await registrationModal.nameInput.blur();

    await expect(registrationModal.nameError).toHaveText('Name has to be from 2 to 20 characters long');
    await expect(registrationModal.nameInput).toHaveCSS('border-color', RED);
  });

  test('Empty Last name shows error', async () => {
    await registrationModal.lastNameInput.focus();
    await registrationModal.lastNameInput.blur();

    await expect(registrationModal.lastNameError).toHaveText('Last name is required');
    await expect(registrationModal.lastNameInput).toHaveCSS('border-color', RED);
  });

  test('Last name with digit shows error', async () => {
    await registrationModal.lastNameInput.fill('Smith1');
    await registrationModal.lastNameInput.blur();

    await expect(registrationModal.lastNameError).toHaveText('Last name is invalid');
    await expect(registrationModal.lastNameInput).toHaveCSS('border-color', RED);
  });

  test('Last name with 21 letters shows length error', async () => {
    await registrationModal.lastNameInput.fill('Abcdefghijklmnopqrstu');
    await registrationModal.lastNameInput.blur();

    await expect(registrationModal.lastNameError).toHaveText('Last name has to be from 2 to 20 characters long');
    await expect(registrationModal.lastNameInput).toHaveCSS('border-color', RED);
  });

  test('Last name with 1 letter and spaces around shows length error', async () => {
    await registrationModal.lastNameInput.fill('  S  ');
    await registrationModal.lastNameInput.blur();

    await expect(registrationModal.lastNameError).toHaveText('Last name has to be from 2 to 20 characters long');
    await expect(registrationModal.lastNameInput).toHaveCSS('border-color', RED);
  });

  test('Empty Email shows error', async () => {
    await registrationModal.emailInput.focus();
    await registrationModal.emailInput.blur();

    await expect(registrationModal.emailError).toHaveText('Email required');
    await expect(registrationModal.emailInput).toHaveCSS('border-color', RED);
  });

  test('Email without @ shows error', async () => {
    await registrationModal.emailInput.fill('aqa-test.com');
    await registrationModal.emailInput.blur();

    await expect(registrationModal.emailError).toHaveText('Email is incorrect');
    await expect(registrationModal.emailInput).toHaveCSS('border-color', RED);
  });

  test('Empty Password shows error', async () => {
    await registrationModal.passwordInput.focus();
    await registrationModal.passwordInput.blur();

    await expect(registrationModal.passwordError).toHaveText('Password required');
    await expect(registrationModal.passwordInput).toHaveCSS('border-color', RED);
  });

  test('Password without capital letter shows error', async () => {
    await registrationModal.passwordInput.fill('qwerty12');
    await registrationModal.passwordInput.blur();

    await expect(registrationModal.passwordError).toHaveText(PASSWORD_ERROR);
    await expect(registrationModal.passwordInput).toHaveCSS('border-color', RED);
  });

  test('Empty Re-enter password shows error', async () => {
    await registrationModal.repeatPasswordInput.focus();
    await registrationModal.repeatPasswordInput.blur();

    await expect(registrationModal.repeatPasswordError).toHaveText('Re-enter password required');
    await expect(registrationModal.repeatPasswordInput).toHaveCSS('border-color', RED);
  });

  test('Different passwords show error', async () => {
    await registrationModal.passwordInput.fill('Qwerty12');
    await registrationModal.repeatPasswordInput.fill('Qwerty13');
    await registrationModal.repeatPasswordInput.blur();

    await expect(registrationModal.repeatPasswordError).toHaveText('Passwords do not match');
    await expect(registrationModal.repeatPasswordInput).toHaveCSS('border-color', RED);
  });

  test('Register button is disabled when data is incorrect', async () => {
    await registrationModal.fillForm('John', 'Smith', 'aqa-test.com', 'Qwerty12', 'Qwerty12');

    await expect(registrationModal.registerButton).toBeDisabled();
  });
});
