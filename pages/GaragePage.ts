import { type Locator, type Page } from '@playwright/test';

export class GaragePage {
  readonly page: Page;
  readonly title: Locator;
  readonly addCarButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.getByRole('heading', { name: 'Garage' });
    this.addCarButton = page.getByRole('button', { name: 'Add car' });
  }

  async open() {
    await this.page.goto('/panel/garage');
  }
}
