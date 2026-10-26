import { type Locator, type Page } from '@playwright/test';

export class RegistrationModal {
  readonly page: Page;
  readonly title: Locator;
  readonly nameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly repeatPasswordInput: Locator;
  readonly nameError: Locator;
  readonly lastNameError: Locator;
  readonly emailError: Locator;
  readonly passwordError: Locator;
  readonly repeatPasswordError: Locator;
  readonly registerButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.getByRole('heading', { name: 'Registration' });
    this.nameInput = page.locator('#signupName');
    this.lastNameInput = page.locator('#signupLastName');
    this.emailInput = page.locator('#signupEmail');
    this.passwordInput = page.locator('#signupPassword');
    this.repeatPasswordInput = page.locator('#signupRepeatPassword');
    this.nameError = page.locator('#signupName ~ .invalid-feedback');
    this.lastNameError = page.locator('#signupLastName ~ .invalid-feedback');
    this.emailError = page.locator('#signupEmail ~ .invalid-feedback');
    this.passwordError = page.locator('#signupPassword ~ .invalid-feedback');
    this.repeatPasswordError = page.locator('#signupRepeatPassword ~ .invalid-feedback');
    this.registerButton = page.getByRole('button', { name: 'Register' });
  }

  async fillForm(name: string, lastName: string, email: string, password: string, repeatPassword: string) {
    await this.nameInput.fill(name);
    await this.lastNameInput.fill(lastName);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.repeatPasswordInput.fill(repeatPassword);
  }

  async signUp(name: string, lastName: string, email: string, password: string, repeatPassword: string) {
    await this.fillForm(name, lastName, email, password, repeatPassword);
    await this.registerButton.click();
  }
}
