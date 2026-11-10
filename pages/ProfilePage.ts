import { type Locator, type Page } from '@playwright/test';

export class ProfilePage {
  readonly page: Page;
  readonly title: Locator;
  readonly userName: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.getByRole('heading', { name: 'Profile' });
    this.userName = page.locator('.profile_name');
  }

  async open() {
    await this.page.goto('/panel/profile');
  }
}
